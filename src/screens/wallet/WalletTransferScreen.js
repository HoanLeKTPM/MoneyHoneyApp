import React, { Component } from "react";
import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import {
    String,
    ScreenView,
    Row,
    HomoTextInput,
    Button1,
    ChooseWalletList,
} from "../../components/Basic";
import {
    colors,
    sizeFactor,
    styles,
    windowWidth,
    windowHeight,
} from "../../constants"
import {
    Icon,
    Overlay,
} from "react-native-elements";
import { connect } from "react-redux";

import { userRef } from "../../components/DataConnect";

import { UpdateWalletAction, SelectWallet } from "../../redux/actions/index";
import { Alert } from "react-native";
import toMoneyString from "../../components/toMoneyString";
import { getAuth } from "firebase/auth";
import { child, onValue, update } from "firebase/database";

const data1 = [
    {
        name: "Ví 1",
        color: colors.purple,
    },
    {
        name: "Ví 2",
        color: colors.blue,
    },
];

const ModalOverlay = ({
    isVisible = false,
    onBackdropPress = () => {},
    overlayStyle = {},
    children,
    ...rest
}) => (
    <Overlay
        isVisible={isVisible}
        onBackdropPress={onBackdropPress}
        overlayStyle={{
            borderRadius: sizeFactor,
            width: windowWidth - sizeFactor * 4,
            height: windowHeight - sizeFactor * 20,
            paddingHorizontal: sizeFactor * 1.5,
            paddingVertical: sizeFactor * 1,
            alignContent: "center",
            alignItems: "stretch",
            ...overlayStyle
        }}
        animationType="fade"
        transparent={true}
        backdropStyle={{
            backgroundColor: 'rgba(0,0,0,0.5)'
        }}
        {...rest}
    >
        {children}
    </Overlay>
);

export class WalletTransferScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            select: 1,
            nguon: "",
            dich: "",
            newSoDu: "",
        }
    }
    componentDidMount() {
        let uid = 'none';
        if (getAuth().currentUser) {
            uid = getAuth().currentUser.uid;
        }
        const userWalletRef = child(userRef, `${uid}/Wallet`);
        onValue(userWalletRef, (snap) => {
            this.props.Update(snap);
        });

        this.props.walletData.forEach((element) => {
            if (element.isDefault == "true") {
                if (this.props.selectedWallet != element)
                    this.props.SelectWallet(element)
                this.setState({
                    nguon: element,
                    dich: element,
                })
            }
            else {
                this.setState({
                    dich: element,
                })
            }
        })
    }
    chuyentien() {
        if (this.state.nguon.key == this.state.dich.key) {
            Alert.alert("Thông báo", "Hãy chọn hai ví khác nhau để chuyển",
                [
                    {
                        text: "OK",
                    }
                ], { cancelable: false }

            );
            return;
        }
        let uid = 'none';
        if (getAuth().currentUser) {
            uid = getAuth().currentUser.uid;
        }
        const userWalletRef = child(userRef, `${uid}/Wallet/${this.state.nguon.key}`);
        update(userWalletRef, {
            money: parseInt(this.state.nguon.money) - parseInt(this.state.newSoDu),
        });
        const userWalletRef2 = child(userRef, `${uid}/Wallet/${this.state.dich.key}`);
        update(userWalletRef2, {
            money: parseInt(this.state.dich.money) + parseInt(this.state.newSoDu),
        });
        Alert.alert("Thông báo", "Bạn đã chuyển tiền giữa các ví thành công",
            [
                {
                    text: "OK",
                    onPress: () => {
                        this.props.navigation.goBack();
                    }
                }
            ], { cancelable: false }
        );
    }
    render() {
        const Item = ({ name, color, money }) =>
            <View
                style={{
                    alignContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    marginVertical: sizeFactor * 0.5,
                }}
            >
                <Icon
                    style={{ marginRight: sizeFactor }}
                    name="wallet"
                    size={sizeFactor * 2.5}
                    type="material-community"
                    color={color}
                />
                <String style={{ marginBottom: 0, fontSize: sizeFactor * 1.5 }}>
                    {name}
                </String>
                <String style={{ marginBottom: 0, fontSize: sizeFactor * 1.5 }}>
                    {" (" + toMoneyString(money) + ")"}
                </String>
            </View>;
        const data = [];
        this.props.walletData.forEach(
            element => {
                var info = {
                    ...element,
                    onPress: () => {
                        this.setState({ visible: false });
                        if (this.state.select == 1) {
                            this.setState({ nguon: element });
                        }
                        else {
                            this.setState({ dich: element })
                        }
                    }
                }
                data.push(info)
            }
        )
        return (
            <ScreenView style={{ backgroundColor: "white" }}>
                <ModalOverlay
                    isVisible={this.state.visible}
                    onBackdropPress={() => this.setState({ visible: false })}
                >
                    <View style={{ right: sizeFactor, top: sizeFactor, position: "absolute" }}>
                        <TouchableOpacity onPress={() => { this.setState({ visible: false }) }}>
                            <Icon name="clear" color={colors.gray} size={sizeFactor * 2} />
                        </TouchableOpacity>
                    </View>

                    <String
                        style={{
                            fontSize: sizeFactor * 1.5,
                            fontWeight: "bold",
                            marginBottom: sizeFactor * 1.5,
                        }}
                    >
                        {"Chọn ví " + (this.state.select == 1 ? "nguồn" : "đích")}
                    </String>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => `wallet-${index}`}
                            renderItem={({ item, index }) => (
                                <View 
                                    style={{ 
                                        paddingHorizontal: sizeFactor / 2,
                                        marginBottom: sizeFactor 
                                    }}
                                >
                                    <ChooseWalletList data={[item]} />
                                </View>
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </ModalOverlay>

                <View
                    style={{ margin: sizeFactor, marginTop: sizeFactor * 4, alignItems: "center" }}
                >
                    <Image
                        source={require("../../assets/others/transfer.png")}
                        style={[
                            styles.hugeCategory,
                            {
                                opacity: 1,
                                width: styles.hugeCategory.height - sizeFactor * 1.25,
                                height: styles.hugeCategory.height - sizeFactor * 1.25,
                                marginBottom: sizeFactor,
                            },
                        ]}
                    />

                    <String style={{ fontWeight: "bold", fontSize: sizeFactor * 1.5 }}>
                        Chuyển tiền giữa các ví
                    </String>
                </View>

                <View
                    style={{
                        alignItems: "stretch",
                        marginTop: sizeFactor,
                        marginHorizontal: sizeFactor * 2,
                    }}
                >
                    <View style={{ alignSelf: "flex-start" }}>
                        <String
                            style={{
                                fontWeight: "bold",
                                fontSize: sizeFactor,
                                color: colors.gray,
                            }}
                        >
                            Ví nguồn
                        </String>
                    </View>
                    <TouchableOpacity onPress={() => { this.setState({ visible: true, select: 1 }) }}>
                        <Row style={{ marginBottom: 0 }}>
                            <Item name={this.state.nguon.name} color={this.state.nguon.color} money={this.state.nguon.money} />
                            <Icon
                                name="chevron-right"
                                type="material-community"
                                size={sizeFactor * 2}
                                color={colors.gray}
                            />
                        </Row>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        alignItems: "stretch",
                        marginTop: sizeFactor,
                        marginHorizontal: sizeFactor * 2,
                    }}
                >
                    <View style={{ alignSelf: "flex-start" }}>
                        <String
                            style={{
                                fontWeight: "bold",
                                fontSize: sizeFactor,
                                color: colors.gray,
                            }}
                        >
                            Ví đích
                        </String>
                    </View>
                    <TouchableOpacity onPress={() => { this.setState({ visible: true, select: 2 }) }}>
                        <Row style={{ marginBottom: 0 }}>
                            <Item name={this.state.dich.name} color={this.state.dich.color} money={this.state.dich.money} />
                            <Icon
                                name="chevron-right"
                                type="material-community"
                                size={sizeFactor * 2}
                                color={colors.gray}
                            />
                        </Row>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        alignItems: "stretch",
                        margin: sizeFactor,
                        marginHorizontal: sizeFactor * 1.5,
                    }}
                >
                    <HomoTextInput
                        value={this.state.newSoDu}
                        label="Số tiền"
                        placeholder="000,000 VNĐ"
                        leftIcon={{
                            type: "material-community",
                            name: "cash",
                            color: colors.gray,
                        }}
                        onChangeText={(text) => {
                            const numericValue = text.replace(/[^0-9]/g, '');
                            this.setState({ newSoDu: numericValue });
                        }}
                        keyboardType="numeric"
                        errorMessage={
                            this.state.newSoDu && isNaN(parseFloat(this.state.newSoDu)) 
                                ? "Vui lòng nhập số tiền hợp lệ"
                                : ""
                        }
                        style={{ width: windowWidth - sizeFactor * 4, margin: 0 }}
                    />
                </View>
                <View
                    style={{
                        alignItems: "stretch",
                        marginHorizontal: sizeFactor * 3,
                        marginVertical: sizeFactor,
                    }}
                >
                    <Button1 onPress={() => { this.chuyentien() }}>Xác nhận</Button1>
                </View>
            </ScreenView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        walletData: state.WalletReducer,
        selectedWallet: state.selectedWalletReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        Update: (snap) => {
            dispatch(UpdateWalletAction(snap));
        },
        SelectWallet: (value) => {
            dispatch(SelectWallet(value));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(WalletTransferScreen);

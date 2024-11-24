// react
import React, { useEffect } from "react";
import { LogBox } from "react-native";

// firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { firebase, firebaseConfig } from "./src/database";

// redux
import { Provider } from "react-redux";
import configureStore from "./src/redux/store";

// other packages
import { NavigationContainer } from "@react-navigation/native";

// navigators
import { AuthenticationNavigator, MainNavigator } from "./src/navigators";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

console.disableYellowBox = true;

function DisplayedScreens() {
  const [user, loading, error] = useAuthState(firebase.auth());

  //const user = true;
  if (user) {
    return (
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <AuthenticationNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  //ignore all warning
  LogBox.ignoreAllLogs(true);

  return (
    <Provider store={configureStore}>
      <DisplayedScreens />
    </Provider>
  );
}

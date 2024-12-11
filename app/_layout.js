import React from 'react';
import { Text, LogBox } from 'react-native';
import { Provider } from "react-redux";
import storeApp from "../src/redux/store"
import { getAuth } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp, getApps, getApp } from 'firebase/app';
import { firebaseConfig } from '../src/database/firebase/firebase';
import { AuthenticationNavigator, MainNavigator } from "../src/navigators";
import { NavigationContainer } from '@react-navigation/native';


if (!getApps().length) {
    initializeApp(firebaseConfig);
} else {
    getApp();
}

export default function RootLayout() {
    LogBox.ignoreAllLogs(true);
    const [user, loading, error] = useAuthState(getAuth());
    if (user) {
        return (
            <Provider store={storeApp}>
                <MainNavigator />
            </Provider>
        );
    } else {
        return (
            <Provider store={storeApp}>
                <AuthenticationNavigator />
            </Provider>
        );
    }
}

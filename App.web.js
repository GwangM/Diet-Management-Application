import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { statusBarHeight } from "./src/util/WH";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./src/components/redux/store/store";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import Navigation from "./Navigation";

const queryClient = new QueryClient();

export default function App() {

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 500);
    }
    prepare();
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <View style={styles.statusPadding} />
        <Navigation/>
        <StatusBar />
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  statusPadding: { paddingTop: statusBarHeight },
});

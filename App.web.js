import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { statusBarHeight } from "./src/util/WH";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./src/components/redux/store/store";
import { Provider } from "react-redux";
import Navigation from "./Navigation";

const queryClient = new QueryClient();

export default function App() {

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <View style={styles.statusPadding} />
        <Navigation/>
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  statusPadding: { paddingTop: statusBarHeight },
});

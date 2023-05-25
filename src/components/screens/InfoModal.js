import React from "react";
import { StyleSheet, Modal, View, Pressable, Text } from "react-native";

export default function InfoModal({visible, onClose, location, info}) {
    return (
    <View style={styles.container}>
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}>
          <View style={styles.whiteBox}>
            <Text style={styles.actionText}>{info}</Text>
          </View>
      </Modal></View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "transparent",
      height:'20%',
      width:'20%',
      justifyContent: "center",
      alignItems: "center",
    },
    whiteBox: {
      width: 300,
      backgroundColor: "white",
      borderRadius: 4,
      elevation: 2,
      justifyContent: "center",
    alignItems: "center",
    },
    actionButton: {
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      marginRight: 8,
    },
    text: {
      fontSize: 26,
    },
  });
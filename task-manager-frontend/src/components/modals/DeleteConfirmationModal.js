import React from "react";
import { View, Text, Modal } from "react-native";
import { Button, useTheme } from "react-native-paper";

const DeleteConfirmationModal = ({ visible, onDismiss, onConfirm }) => {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            Are you sure you want to delete this task?
          </Text>
          <Button mode="contained" onPress={onConfirm}>
            Confirm
          </Button>
          <Button onPress={onDismiss}>Cancel</Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    padding: 20,
    width: "80%",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
};

export default DeleteConfirmationModal;
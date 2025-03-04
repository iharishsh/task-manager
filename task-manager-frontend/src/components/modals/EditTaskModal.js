import React from "react";
import { View, Text, Modal } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";

const EditTaskModal = ({
  visible,
  onDismiss,
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  error,
  loading,
  onSubmit,
}) => {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
          <Text style={[styles.modalTitle, { color: colors.text }]}>Edit Task</Text>
          <TextInput
            label="Title"
            value={editTitle}
            onChangeText={setEditTitle}
            mode="outlined"
            theme={{ colors: { primary: colors.primary } }}
          />
          <TextInput
            label="Description"
            value={editDescription}
            onChangeText={setEditDescription}
            mode="outlined"
            multiline
            style={styles.textArea}
            theme={{ colors: { primary: colors.primary } }}
          />
          {error && <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>}
          <Button mode="contained" onPress={onSubmit} loading={loading}>
            {loading ? "Updating..." : "Update Task"}
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
  textArea: {
    height: 100,
    marginBottom: 10,
  },
  errorText: {
    textAlign: "center",
    marginBottom: 10,
  },
};

export default EditTaskModal;
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  SafeAreaView,
  TextInput,
} from "react-native";
import { AnimatedFAB, useTheme, IconButton, Text } from "react-native-paper";
import axiosInstance from "../api/axiosInstance";
import CreateTaskModal from "./modals/CreateTaskModal";
import EditTaskModal from "./modals/EditTaskModal";
import DeleteConfirmationModal from "./modals/DeleteConfirmationModal";
import { TaskContext } from "../context/TaskContext";

const TaskList = ({ tasks, refreshing, onRefresh }) => {
  const [isExtended, setIsExtended] = useState(true);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false); 
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const { createTask, updateTask, deleteTask  } = useContext(TaskContext);

  const { colors, dark } = useTheme(); 

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  // Handle Create Task
  const handleCreateTask = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Title and Description are required");
      return;
    }
    if (title.length > 30) {
      setError("Title must be 30 characters or less");
      return;
    }
    if (description.length > 50) {
      setError("Description must be 50 characters or less");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createTask(title, description);
      setTitle("");
      setDescription("");
      setCreateModalVisible(false);
      onRefresh();
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit Task - CHeck if task id exists
  const handleEditTask = async (taskId) => {
    try {
      const response = await axiosInstance.get(`/api/tasks/${taskId}`);
      setEditTitle(response.data.title);
      setEditDescription(response.data.description);
      setSelectedTaskId(taskId);
      setEditModalVisible(true);
    } catch (error) {
      console.error("Error fetching task details:", error);
      setError("Failed to fetch task details");
    }
  };

  // Handle Update Task
  const handleUpdateTask = async () => {
    if (!editTitle.trim() || !editDescription.trim()) {
      setError("Title and Description are required");
      return;
    }
    if (editTitle.length > 30) {
      setError("Title must be 30 characters or less");
      return;
    }
    if (editDescription.length > 50) {
      setError("Description must be 50 characters or less");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateTask(selectedTaskId, {
        title: editTitle,
        description: editDescription,
      });
      setEditModalVisible(false);
      onRefresh();
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete Task
  const handleDeleteTask = (taskId) => {
    setSelectedTaskId(taskId);
    setDeleteModalVisible(true);
  };

  // Confirm Delete Task
  const confirmDeleteTask = async () => {
    try {
      await deleteTask(selectedTaskId);
      setDeleteModalVisible(false);
      onRefresh();
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task");
    }
  };

  // Handle Search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredTasks(tasks); 
      return;
    }

    // Filter tasks based on title or description
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Search Input */}
      {showSearchInput && (
        <View
          style={[styles.searchContainer, { backgroundColor: colors.surface }]}
        >
          <TextInput
            placeholder="Search Task"
            placeholderTextColor={dark ? "#666" : "#999"} 
            value={searchQuery}
            onChangeText={handleSearch}
            style={[styles.searchInput, { color: colors.text }]}
            theme={{ colors: { primary: colors.primary } }}
            autoFocus={true}
          />
          <IconButton
            icon="close"
            iconColor={colors.text}
            onPress={() => {
              setShowSearchInput(false);
              setSearchQuery("");
              setFilteredTasks(tasks); 
            }}
          />
        </View>
      )}

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={[styles.taskItem, { backgroundColor: colors.surface }]}>
            <View style={styles.taskContent}>
              <Text style={[styles.taskText, { color: colors.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.taskdesc, { color: colors.text }]}>
                {item.description}
              </Text>
            </View>
            <View style={styles.taskActions}>
              <IconButton
                icon="pencil"
                iconColor={colors.primary}
                onPress={() =>
                  handleEditTask(item._id, item.title, item.description)
                }
              />
              <IconButton
                icon="delete"
                iconColor={colors.error}
                onPress={() => handleDeleteTask(item._id)}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Create new task!</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={[
          tasks.length === 0 ? styles.centeredList : {},
          { paddingBottom: 80 },
        ]}
        onScroll={onScroll}
      />

      {/* Floating Action Buttons (FABs) */}
      <AnimatedFAB
        icon={"plus"}
        label={"Create Task  "}
        extended={isExtended}
        onPress={() => setCreateModalVisible(true)}
        visible={true}
        animateFrom={"right"}
        iconMode={"static"}
        style={[
          styles.fabStyle,
          { backgroundColor: colors.primary, right: 16 },
        ]}
      />

      <AnimatedFAB
        icon={"magnify"}
        label={"  Search Task"}
        extended={isExtended}
        onPress={() => setShowSearchInput(!showSearchInput)}
        visible={true}
        animateFrom={"left"}
        iconMode={"static"}
        style={[styles.fabStyle, { backgroundColor: colors.primary, left: 16 }]}
      />

      {/* Modals */}
      <CreateTaskModal
        visible={createModalVisible}
        onDismiss={() => setCreateModalVisible(false)}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        error={error}
        loading={loading}
        onSubmit={handleCreateTask}
      />

      <EditTaskModal
        visible={editModalVisible}
        onDismiss={() => setEditModalVisible(false)}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        error={error}
        loading={loading}
        onSubmit={handleUpdateTask}
      />

      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onDismiss={() => setDeleteModalVisible(false)}
        onConfirm={confirmDeleteTask}
      />
    </SafeAreaView>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
  },
  fabStyle: {
    position: "absolute",
    bottom: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
  taskContent: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
  },
  taskdesc: {
    fontSize: 12,
    paddingTop: 5,
  },
  taskActions: {
    flexDirection: "row",
  },
  centeredList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

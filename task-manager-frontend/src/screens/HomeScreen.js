import React, { useEffect, useState, useCallback, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import { TaskContext } from "../context/TaskContext";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { tasks, loading, error, fetchTasks } = useContext(TaskContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTasks();
    setRefreshing(false);
  }, []);

  if (loading) return <ActivityIndicator animating={true} size="large" style={styles.loader} />;

  return (
    <View style={styles.container}>
      <Header />
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <TaskList tasks={tasks} refreshing={refreshing} onRefresh={onRefresh} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 70, 
  },
  loader: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  errorText: { 
    color: "red", 
    textAlign: "center", 
    marginTop: 20 
  },
  taskItem: { 
    padding: 15, 
    backgroundColor: "#ddd", 
    marginVertical: 5, 
    borderRadius: 5 
  },
  taskText: { 
    fontSize: 16 
  },
  centeredList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;

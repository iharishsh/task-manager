import React, { createContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  // Create a new task
  const createTask = async (title, description) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/api/tasks", { title, description });
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  // Update a task
  const updateTask = async (taskId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/api/tasks/${taskId}`, updatedData);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? response.data : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/api/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
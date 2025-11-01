import {todoApi} from "../services/todoApi"
import { useState, useEffect } from "react";
export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getTodos();
      setTodos(data);
    } catch (err) {
        console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text) => {
    try {
      const newTodo = await todoApi.createTodos(text);
      setTodos(prev => [...prev, {
        id: newTodo.id,
        text: text
      }]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return { todos, loading, addTodo, refetch: fetchTodos };
}
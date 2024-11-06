import React, { useState } from 'react';
import { CheckSquare, Trash2 } from 'lucide-react';
import Modal from './Modal';

interface TodoItem {
  id: string;
  text: string;
  details: string;
  completed: boolean;
}

interface TodoSectionProps {
  isModalOpen: boolean;
  onModalClose: () => void;
}

export default function TodoSection({ isModalOpen, onModalClose }: TodoSectionProps) {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState({
    text: '',
    details: ''
  });

  const addTodo = () => {
    if (newTodo.text.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo.text.trim(),
          details: newTodo.details.trim(),
          completed: false,
        },
      ]);
      setNewTodo({ text: '', details: '' });
      onModalClose();
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <CheckSquare className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">Todo List</h2>
          </div>
        </div>

        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-3 flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <span
                    className={`block ${
                      todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                    }`}
                  >
                    {todo.text}
                  </span>
                  {todo.details && (
                    <span className="text-sm text-gray-500">{todo.details}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-600 ml-4"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={onModalClose}
        title="Add New Todo"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={newTodo.text}
            onChange={(e) => setNewTodo({ ...newTodo, text: e.target.value })}
            placeholder="Task Title"
            className="w-full p-2 border rounded-md"
          />
          <textarea
            value={newTodo.details}
            onChange={(e) => setNewTodo({ ...newTodo, details: e.target.value })}
            placeholder="Task Details"
            className="w-full p-2 border rounded-md"
            rows={3}
          />
          <button
            onClick={addTodo}
            className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors"
          >
            Add Todo
          </button>
        </div>
      </Modal>
    </>
  );
}
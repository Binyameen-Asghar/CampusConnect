import React, { useState } from 'react';
import { BookOpen, Plus, ListTodo, Menu, X } from 'lucide-react';

interface NavbarProps {
  onNewReminder: () => void;
  onNewTodo: () => void;
}

export default function Navbar({ onNewReminder, onNewTodo }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8" />
            <span className="text-xl font-bold">CampusConnect</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <button
              onClick={onNewReminder}
              className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Reminder</span>
            </button>
            <button
              onClick={onNewTodo}
              className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 transition-colors"
            >
              <ListTodo className="h-4 w-4" />
              <span>Todo</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-indigo-500 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <button
              onClick={() => {
                onNewReminder();
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Reminder</span>
            </button>
            <button
              onClick={() => {
                onNewTodo();
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 transition-colors"
            >
              <ListTodo className="h-4 w-4" />
              <span>Todo</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
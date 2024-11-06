import React, { useState } from 'react';
import Navbar from './components/Navbar';
import IconSection from './components/IconSection';
import ReminderSection from './components/ReminderSection';
import TodoSection from './components/TodoSection';

function App() {
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [todoModalOpen, setTodoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onNewReminder={() => setReminderModalOpen(true)}
        onNewTodo={() => setTodoModalOpen(true)}
      />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <IconSection />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReminderSection 
            isModalOpen={reminderModalOpen} 
            onModalClose={() => setReminderModalOpen(false)} 
          />
          <TodoSection 
            isModalOpen={todoModalOpen} 
            onModalClose={() => setTodoModalOpen(false)} 
          />
        </div>
      </main>
    </div>
  );
}

export default App;
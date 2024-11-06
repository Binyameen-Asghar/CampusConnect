import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Clock, Trash2 } from 'lucide-react';
import Modal from './Modal';

interface Reminder {
  id: string;
  title: string;
  details: string;
  datetime: string;
}

interface ReminderSectionProps {
  isModalOpen: boolean;
  onModalClose: () => void;
}

export default function ReminderSection({ isModalOpen, onModalClose }: ReminderSectionProps) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState({
    title: '',
    details: '',
    datetime: '',
  });

  const addReminder = () => {
    if (newReminder.title && newReminder.datetime) {
      setReminders([
        ...reminders,
        {
          id: Date.now().toString(),
          ...newReminder,
        },
      ]);
      setNewReminder({ title: '', details: '', datetime: '' });
      onModalClose();
    }
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Bell className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">Reminders</h2>
          </div>
        </div>

        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="border rounded-lg p-4 relative">
              <h3 className="font-semibold text-lg">{reminder.title}</h3>
              <p className="text-gray-600 mt-1">{reminder.details}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(reminder.datetime).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(reminder.datetime).toLocaleTimeString()}</span>
                </div>
              </div>
              <button
                onClick={() => deleteReminder(reminder.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-600"
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
        title="Add New Reminder"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={newReminder.title}
            onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
          <textarea
            placeholder="Task Details"
            value={newReminder.details}
            onChange={(e) => setNewReminder({ ...newReminder, details: e.target.value })}
            className="w-full p-2 border rounded-md"
            rows={3}
          />
          <input
            type="datetime-local"
            value={newReminder.datetime}
            onChange={(e) => setNewReminder({ ...newReminder, datetime: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={addReminder}
            className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors"
          >
            Add Reminder
          </button>
        </div>
      </Modal>
    </>
  );
}
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../moodjr/Customcal.css";
import { Dialog } from "@headlessui/react";

const MoodJournal = () => {
  const [date, setDate] = useState(new Date());
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const emojis = [
    { symbol: '😄', label: 'Happy' },
    { symbol: '😐', label: 'Neutral' },
    { symbol: '😢', label: 'Sad' },
    { symbol: '😠', label: 'Angry' },
    { symbol: '😨', label: 'Anxious' },
  ];

  useEffect(() => {
    const storedEntries = localStorage.getItem('moodJournalEntries');
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    const entry = entries[selectedDate.toDateString()];
    if (entry) {
      setMood(entry.mood);
      setNote(entry.note);
    } else {
      setMood('');
      setNote('');
    }
  };

  const handleSave = () => {
    const newEntries = {
      ...entries,
      [date.toDateString()]: { mood, note },
    };
    setEntries(newEntries);
    localStorage.setItem('moodJournalEntries', JSON.stringify(newEntries));
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#e0fff2] flex flex-col items-center gap-8 p-4">
      <h1 className="text-2xl font-bold text-[#148e5b] mb-4">Mood Journal</h1>
      <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileClassName={({ date }) => {
              const entry = entries[date.toDateString()];
              return entry ? "highlight-day" : "";
            }}
            className="rounded-lg text-xl custom-calendar"
          />
        </div>
        <div className="md:w-1/2 p-2">
          <div className="mb-4 mt-10">
            <h2 className="text-lg font-semibold mb-2">Select Your Mood</h2>
            <div className="flex justify-between">
              {emojis.map((emoji) => (
                <div className="group relative" key={emoji.label}>
                  <button
                    onClick={() => setMood(emoji.symbol)}
                    className={`text-3xl ${
                      mood === emoji.symbol ? 'bg-orange-400 p-1 rounded-lg' : ''
                    }`}
                  >
                    {emoji.symbol}
                  </button>
                  <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
                    {emoji.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Add a Note</h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
              placeholder="Write your note here..."
            ></textarea>
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-[#148e5b] text-white py-2 rounded hover:bg-[#52cc99]"
          >
            Save Entry
          </button>
        </div>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Dialog.Panel className="bg-white p-6 rounded-lg shadow-md w-80">
            <Dialog.Title className="text-lg font-bold">Entry Saved!</Dialog.Title>
            <p className="text-gray-600 mt-2">
              Your mood and note have been saved successfully.
            </p>
            <button
              className="mt-4 w-full bg-[#148e5b] text-white py-2 rounded hover:bg-[#52cc99]"
              onClick={() => setIsOpen(false)}
            >
              OK
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default MoodJournal;

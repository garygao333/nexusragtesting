import { useState } from 'react';

export default function SearchBar({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSubmit(input);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl">
      <input
        type="text"
        placeholder="Ask a question or search for a clinical trial..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none"
      />
      <button type="submit" className="bg-purple-600 text-white px-4 rounded-r-full">
        ➔
      </button>
    </form>
  );
}

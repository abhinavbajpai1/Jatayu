import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface CommentInputProps {
  onSubmit: (content: string) => void;
}

export function CommentInput({ onSubmit }: CommentInputProps) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3 p-4">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add an anonymous comment..."
        className="flex-1 bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
      />
      <button
        type="submit"
        disabled={!comment.trim()}
        className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}
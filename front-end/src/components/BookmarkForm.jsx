import React, { useState } from 'react';
import API from '../api';

const BookmarkForm = ({ onAdd }) => {
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidUrl(url)) {
      alert('Invalid URL');
      return;
    }
    try {
      setLoading(true);

      const tagArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
      const res = await API.post('/bookmarks', { url, tags: tagArray });

      onAdd(res.data);
      setUrl('');
      setTags('');
    } catch (error) {
      alert('Failed to save bookmark');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-wrap gap-2">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        className="border p-2 flex-1 min-w-[200px]"
        required
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Enter tag"
        className="border p-2 flex-1 min-w-[200px]"
      />
      <button
        className="bg-blue-600 text-white py-1 px-4 rounded text-xl cursor-pointer"
        disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default BookmarkForm;
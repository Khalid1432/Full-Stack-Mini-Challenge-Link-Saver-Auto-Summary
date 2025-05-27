import React from 'react';
import API from '../api';

const BookmarkCard = ({ data, onDelete }) => {
  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this bookmark?');
    if (!confirm) return;
    await API.delete(`/bookmarks/${data._id}`);
    onDelete(data._id);
  };

  return (
    <div className="p-4 border m-2 rounded bg-white dark:bg-gray-800 dark:text-white shadow overflow-y-auto h-[400px]">
      <div className="flex items-center">
        <img
          src={data.favicon ? data.favicon : '/default-icon.png'}
          alt="favicon"
          className="w-6 h-6 mr-2"
          onError={(e) => {
            if (!e.target.src.includes('default-icon.png')) {
              e.target.src = '/default-icon.png';
            }
          }}

        />
        <a
          href={data.url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-700 font-bold dark:text-blue-300">
          {data.title}
        </a>
      </div>

      <p className="mt-2 whitespace-pre-wrap">{data.summary}</p>

      <div className="text-sm text-gray-500 mt-1 dark:text-gray-300">Tags: {data.tags}</div>

      <button
        onClick={handleDelete}
        className="mt-2 bg-red-500 text-white px-3 py-1 rounded cursor-pointer">
        Delete
      </button>
    </div>
  );
};

export default BookmarkCard;
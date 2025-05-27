import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import BookmarkForm from '../components/BookmarkForm';
import BookmarkCard from '../components/BookmarkCard';

const Home = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [filterTag, setFilterTag] = useState('');
  const [loading, setLoading] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await API.get('/bookmarks');
      setBookmarks(res.data.bookmarks);
    } catch (err) {
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const addBookmark = (bm) => setBookmarks(prev => [...prev, bm]);
  const deleteBookmark = (id) => setBookmarks(prev => prev.filter(b => b._id !== id));

  const filtered = filterTag ? bookmarks.filter(b => b.tags.includes(filterTag)) : bookmarks;
  const tagOptions = Array.isArray(bookmarks)
    ? [...new Set(bookmarks.flatMap(b => Array.isArray(b.tags) ? b.tags : []))]
    : [];



  const handleDragStart = (index) => setDraggedIndex(index);

  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const newBookmarks = [...bookmarks];

    const moved = newBookmarks.splice(draggedIndex, 1)[0];

    newBookmarks.splice(index, 0, moved);

    setBookmarks(newBookmarks);

    setDraggedIndex(null);
  };

  return (
    <div className="p-4">
      <BookmarkForm onAdd={addBookmark} />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold select-none">Bookmarks</h2>

        <div className="flex items-center gap-2">
          <label htmlFor="filter">Filter by tag:</label>
          <select
            id="filter"
            onChange={(e) => setFilterTag(e.target.value)}
            value={filterTag}
            className="border p-1 rounded cursor-pointer bg-blue-600"
          >
            <option value="">All</option>
            {
              tagOptions.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))
            }
          </select>
        </div>
      </div>

      {
        loading ?
          (
            <p className="text-center">Loading bookmarks...</p>
          ) :
          (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {
                filtered.map((bm, index) => (
                  <div
                    key={bm._id || index} // ✅ Always give a key
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(index)}
                  >
                    <BookmarkCard data={bm} onDelete={deleteBookmark} />
                  </div>
                ))
              }
            </div>
          )
      }
    </div>
  );
};

export default Home;

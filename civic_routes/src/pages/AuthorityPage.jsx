import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthorityUpdates from '../components_authority/AuthorityUpdates';
import NewAnnouncement from '../components_authority/NewAnnouncement';

const API_URL = 'https://civicroutes-2c58b-default-rtdb.firebaseio.com';

const AuthorityPage = () => {
  const [updates, setUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState({ details: '', area: '', announcedBy: '', label: 'yellow' });

  useEffect(() => {
    const fetchUpdates = async () => {
      const response = await axios.get(`${API_URL}/authorityUpdates.json`);
      const data = response.data ? Object.values(response.data) : [];

      const sortedUpdates = data.map(update => ({
        ...update,
        dateObj: update.date ? new Date(update.date.year, update.date.month - 1, update.date.day) : new Date()
      })).sort((a, b) => b.dateObj - a.dateObj);

      setUpdates(sortedUpdates);
    };

    fetchUpdates();
  }, []);

  const handleUpdateSubmit = async () => {
    if (newUpdate.details && newUpdate.area && newUpdate.announcedBy && newUpdate.label) {
      const today = new Date();
      const updateToPost = {
        ...newUpdate,
        date: {
          day: today.getDate(),
          month: today.getMonth() + 1,
          year: today.getFullYear()
        },
        id: updates.length + 1
      };

      try {
        await axios.post(`${API_URL}/authorityUpdates.json`, updateToPost);
        setUpdates(prev => [updateToPost, ...prev]);
        setNewUpdate({ details: '', area: '', announcedBy: '', label: 'yellow' });
      } catch (err) {
        console.error('Error posting update:', err);
      }
    }
  };

  return (
    <>
      <NewAnnouncement newUpdate={newUpdate} setNewUpdate={setNewUpdate} handleUpdateSubmit={handleUpdateSubmit} />
      <AuthorityUpdates updates={updates} />
    </>
  );
};

export default AuthorityPage;
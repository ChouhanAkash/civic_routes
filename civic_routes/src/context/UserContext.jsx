import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);
  const [authorityUpdates, setAuthorityUpdates] = useState([]);

  const baseURL = "https://civicroutes-2c58b-default-rtdb.firebaseio.com";

  // GET: Fetch local issues
  const fetchIssues = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/localIssues.json`);
      if (data) {
        const issuesArray = Object.entries(data).map(([id, issue]) => ({
          id,
          ...issue,
        }));
        setIssues(issuesArray);
      } else {
        setIssues([]);
      }
    } catch (err) {
      console.error("Error fetching local issues:", err);
    }
  };

  // POST: Add new issue with current date
  const addIssue = async (newIssue) => {
    try {
      const issueWithDate = {
        ...newIssue,
        createdAt: new Date().toISOString(), // Add current date
      };

      const res = await axios.post(`${baseURL}/localIssues.json`, issueWithDate);
      if (res.status === 200) {
        fetchIssues(); // Refresh list after adding
      }
    } catch (err) {
      console.error("Error adding issue:", err);
    }
  };

  // Fetch issues and authority updates on load
  useEffect(() => {
    fetchIssues();
    axios
      .get(`${baseURL}/authorityUpdates.json`)
      .then(({ data }) => {
        if (data) {
          const updatesArray = Object.values(data);
          setAuthorityUpdates(updatesArray);
        }
      })
      .catch((err) => console.error("Error fetching updates:", err));
  }, []);

  return (
    <UserContext.Provider value={{ issues, authorityUpdates, addIssue }}>
      {children}
    </UserContext.Provider>
  );
};
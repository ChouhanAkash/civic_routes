import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IssuesList from '../components_authority/issueList';

const API_URL = 'https://civicroutes-2c58b-default-rtdb.firebaseio.com';

const IssuesPage = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${API_URL}/localIssues.json`);
        const data = response.data;

        if (data) {
          const issuesArray = Object.entries(data).map(([key, value]) => ({
            ...value,
            firebaseKey: key,
            dateObj: value.date
              ? new Date(value.date.year, value.date.month - 1, value.date.day)
              : new Date()
          }));

          const sortedIssues = issuesArray.sort((a, b) => b.dateObj - a.dateObj);
          setIssues(sortedIssues);
        }
      } catch (error) {
        console.error('Error fetching local issues:', error);
      }
    };

    fetchIssues();
  }, []);

  const handleStatusChange = async (firebaseKey, newStatus) => {
    try {
      await axios.patch(`${API_URL}/localIssues/${firebaseKey}.json`, {
        status: newStatus,
      });

      // Update state locally as well
      setIssues(prev =>
        prev.map(issue =>
          issue.firebaseKey === firebaseKey ? { ...issue, status: newStatus } : issue
        )
      );

      console.log(`Issue ${firebaseKey} marked as ${newStatus}`);
    } catch (error) {
      console.error("Failed to update issue status:", error);
    }
  };

  return <IssuesList issues={issues} handleStatusChange={handleStatusChange} />;
};

export default IssuesPage;
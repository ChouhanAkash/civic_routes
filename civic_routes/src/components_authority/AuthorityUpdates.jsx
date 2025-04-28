// src/components_authority/AuthorityUpdates.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components_authority/AuthorityDashboard.css"; // or your correct css path

const AuthorityUpdates = () => {
  const [authorityUpdates, setAuthorityUpdates] = useState([]);

  const labelPriority = {
    red: 3,
    orange: 2,
    yellow: 1
  };

  const fetchUpdates = async () => {
    try {
      const res = await axios.get(
        "https://civicroutes-2c58b-default-rtdb.firebaseio.com/authorityUpdates.json"
      );
      const data = res.data;

      if (data) {
        const updatesArray = Object.values(data)
          .map(update => {
            let dateObj;

      
            if (typeof update.date === "string") {
              dateObj = new Date(update.date);
            } else if (typeof update.date === "object" && update.date.year && update.date.month && update.date.day) {
              dateObj = new Date(update.date.year, update.date.month - 1, update.date.day);
            } else {
              dateObj = new Date(); // fallback to today
            }

            return {
              ...update,
              dateObj,
            };
          })
          .sort((a, b) => {
            if (b.dateObj - a.dateObj !== 0) return b.dateObj - a.dateObj;
            return (labelPriority[b.label] || 0) - (labelPriority[a.label] || 0);
          });

        setAuthorityUpdates(updatesArray);
      }
    } catch (error) {
      console.error("Error fetching authority updates:", error);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  return (
    <div className="authority-grid">
      {authorityUpdates.map((update, idx) => (
        <div className="authority-card" key={idx}>
          <p className="area"><strong>Area:</strong> {update.area}</p>
          <p><strong>Details:</strong> {update.details}</p>
          <p><strong>Announced By:</strong> {update.announcedBy}</p>
          <p><strong>Announcement Date:</strong> {update.dateObj.toDateString()}</p>
          <span className={`announcement-label label-${update.label}`}>
            {update.label?.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AuthorityUpdates;

import React, { useState } from 'react';
 

const IssuesList = ({ issues, handleStatusChange }) => {
  const [filter, setFilter] = useState('open');
  const [popup, setPopup] = useState({ show: false, firebaseKey: null });

  const filteredIssues = issues.filter(i => i.status === filter);

  const confirmFix = (key) => setPopup({ show: true, firebaseKey: key });
  const confirmChange = () => {
    handleStatusChange(popup.firebaseKey, 'fixed');
    setPopup({ show: false, firebaseKey: null });
  };

  return (
    <div>
      <h2 className="section-title">Local Issues</h2>

      <div className="issue-tabs">
        {['open','inprogress','fixed'].map(s => (
          <button
            key={s}
            className={`tab-button ${filter===s ? 'active' : ''}`}
            onClick={()=>setFilter(s)}
          >
            {s.charAt(0).toUpperCase()+s.slice(1)}
          </button>
        ))}
      </div>

      {filteredIssues.length===0 && <p style={{textAlign:'center'}}>No {filter} issues found.</p>}

      {filteredIssues.map(issue=>(
        <div className="card" key={issue.firebaseKey}>
          <div className="card-content">
            <img src={issue.image} className="issue-image" alt="issue"/>
            <p><strong>Type:</strong> {issue.type}</p>
            <p><strong>Detail:</strong> {issue.detail}</p>
            <p><strong>Location:</strong> {issue.location}</p>
            <p><strong>Status:</strong> {issue.status}</p>
            {issue.status!=='fixed' && (
              <div className="button-group">
                {issue.status==='open' && (
                  <button className="button secondary"
                          onClick={()=>handleStatusChange(issue.firebaseKey,'inprogress')}>
                    In Progress
                  </button>
                )}
                <button className="button primary"
                        onClick={()=>confirmFix(issue.firebaseKey)}>
                  Mark as Fixed
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {popup.show && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>Are you sure you want to mark this issue as fixed?</p>
            <div className="button-group">
              <button className="button primary" onClick={confirmChange}>
                Yes, Confirm
              </button>
              <button className="button secondary"
                      onClick={()=>setPopup({show:false,firebaseKey:null})}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssuesList;
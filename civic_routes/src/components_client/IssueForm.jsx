import React, { useState } from "react";
import axios from "axios";
import "../styles/IssueForm.css";

const IssueForm = ({ onIssueAdded }) => {
  const [formData, setFormData] = useState({
    type: "",
    detail: "",
    location: "",
    image: "",
    status: "open",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.type.trim()) newErrors.type = "Issue type is required.";
    if (!formData.detail.trim()) newErrors.detail = "Description is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (newErrors.type) alert("Please enter the issue type.");
      else if (newErrors.detail) alert("Please enter the issue description.");
      else if (newErrors.location) alert("Please enter the issue location.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const payload = {
        ...formData,
        image:
          formData.image.trim() ||
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
      };

      await axios.post(
        "https://civicroutes-2c58b-default-rtdb.firebaseio.com/localIssues.json",
        payload
      );

      setFormData({
        type: "",
        detail: "",
        location: "",
        image: "",
        status: "open",
      });

      setErrors({});
      alert("Issue submitted successfully!"); // Success alert
      onIssueAdded?.();
    } catch (error) {
      console.error("Error submitting issue:", error);
      alert("Something went wrong while submitting the issue."); // Error alert
    }
  };

  const isFormValid = formData.type && formData.detail && formData.location;

  return (
    <form onSubmit={handleSubmit} className="issue-form">
      <h2 className="section-title">Report an Issue</h2>

      <input
        type="text"
        name="type"
        placeholder="Issue Type (e.g., Water, Road)"
        value={formData.type}
        onChange={handleChange}
      />
      {errors.type && <span className="error-text">{errors.type}</span>}

      <textarea
        name="detail"
        placeholder="Describe the issue in detail"
        value={formData.detail}
        onChange={handleChange}
      />
      {errors.detail && <span className="error-text">{errors.detail}</span>}

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />
      {errors.location && <span className="error-text">{errors.location}</span>}

      <input
        type="text"
        name="image"
        placeholder="Image URL (optional)"
        value={formData.image}
        onChange={handleChange}
      />

      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
};

export default IssueForm;
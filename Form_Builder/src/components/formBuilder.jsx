// src/components/FormBuilder.js
import React, { useState, useCallback, useMemo } from "react";
import { z } from "zod";
import DisplayDetails from "./DisplayDetails"; // Import the DisplayDetails component

const initialFields = [
  { id: "1", type: "text", label: "Full Name" },
  {
    id: "2",
    type: "select",
    label: "Country",
    options: ["USA", "India", "Nepal"],
  },
];

const FormBuilder = () => {
  const [fields, setFields] = useState(initialFields);
  const [formData, setFormData] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [newFieldTitle, setNewFieldTitle] = useState("");
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission
  const [previewMode, setPreviewMode] = useState(false); // Track preview mode

  // Schema validation using Zod
  const schema = useMemo(
    () =>
      z.object({
        1: z.string().min(1, "Name is required"),
        2: z.string().min(1, "Country is required"),
      }),
    []
  );

  // Handle field change
  const handleFieldChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      try {
        schema.parse(formData); // Validate form data
        setErrorMessages({});
        setFormSubmitted(true); // Mark form as submitted
        setPreviewMode(false); // Disable preview mode after submission
      } catch (error) {
        setErrorMessages(
          error.errors.reduce((acc, curr) => {
            acc[curr.path[0]] = curr.message;
            return acc;
          }, {})
        );
      }
    },
    [formData, schema]
  );

  // Handle adding a new field
  const handleAddField = () => {
    if (!newFieldTitle.trim()) {
      alert("Please provide a title for the new field.");
      return;
    }

    const newField = {
      id: `${fields.length + 1}`,
      type: "text",
      label: newFieldTitle,
    };
    setFields([...fields, newField]);
    setNewFieldTitle("");
    setShowTitleInput(false);
  };

  // Handle removing a field
  const handleRemoveField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  // Toggle Preview Mode
  const togglePreviewMode = () => {
    setPreviewMode((prev) => !prev);
  };

  // Show form details after submission
  if (formSubmitted) {
    return <DisplayDetails formData={formData} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Interactive Form Builder
      </h2>

      <div className="mb-4 text-center">
        {/* Toggle Preview Mode Button */}
        <button
          onClick={togglePreviewMode}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {previewMode ? "Edit Form" : "Preview Form"}
        </button>
      </div>

      {!previewMode ? (
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.id} className="mb-4">
              <label className="block text-gray-700 font-medium">
                {field.label}
              </label>
              {field.type === "text" && (
                <input
                  type="text"
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  value={formData[field.id] || ""}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              {field.type === "select" && field.options && (
                <select
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  value={formData[field.id] || ""}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Country</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {errorMessages[field.id] && (
                <p className="text-red-500 text-sm mt-1">
                  {errorMessages[field.id]}
                </p>
              )}
              <button
                type="button"
                onClick={() => handleRemoveField(field.id)}
                className="text-red-500 text-sm mt-2"
              >
                Remove this field
              </button>
            </div>
          ))}

          {!showTitleInput ? (
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setShowTitleInput(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add New Field
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  New Field Title
                </label>
                <input
                  type="text"
                  value={newFieldTitle}
                  onChange={(e) => setNewFieldTitle(e.target.value)}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter field title"
                />
              </div>
              <div className="mb-4">
                <button
                  type="button"
                  onClick={handleAddField}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Confirm Add Field
                </button>
              </div>
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setShowTitleInput(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          <div className="mb-4">
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Submit Form
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Form Preview</h3>
          <div>
            {fields.map((field) => (
              <div key={field.id} className="mb-2">
                <strong>{field.label}: </strong>
                <span>{formData[field.id]}</span>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Confirm Submission
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;

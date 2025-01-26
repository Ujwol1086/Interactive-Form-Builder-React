// Import necessary dependencies and components
import { useState, useCallback, useMemo } from "react";
import { z } from "zod";
import DisplayDetails from "./DisplayDetails"; // Import the DisplayDetails component

// Initial fields for the form with types and labels
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
  // State variables for managing form fields, data, errors, and form status
  const [fields, setFields] = useState(initialFields);
  const [formData, setFormData] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [newFieldTitle, setNewFieldTitle] = useState("");
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission
  const [previewMode, setPreviewMode] = useState(false); // Track preview mode status

  // Schema validation using Zod to validate form data
  const schema = useMemo(
    () =>
      z.object({
        1: z.string().min(1, "Name is required"),
        2: z.string().min(1, "Country is required"),
      }),
    []
  );

  // Handle changes in field values
  const handleFieldChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      try {
        schema.parse(formData); // Validate form data using Zod schema
        setErrorMessages({});
        setFormSubmitted(true); // Mark form as submitted
        setPreviewMode(false); // Disable preview mode after submission
      } catch (error) {
        // Store error messages for invalid fields
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

  // Handle adding a new field to the form
  const handleAddField = () => {
    if (!newFieldTitle.trim()) {
      alert("Please provide a title for the new field.");
      return;
    }

    // Create new field with a unique ID and specified title
    const newField = {
      id: `${fields.length + 1}`,
      type: "text",
      label: newFieldTitle,
    };

    setFields([...fields, newField]); // Add new field to the list
    setNewFieldTitle(""); // Reset the new field title input
    setShowTitleInput(false); // Hide the new field input
  };

  // Handle removing a field from the form
  const handleRemoveField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  // Toggle between preview and edit mode
  const togglePreviewMode = () => {
    setPreviewMode((prev) => !prev);
  };

  // If form is submitted, display form data using DisplayDetails component
  if (formSubmitted) {
    return <DisplayDetails formData={formData} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Interactive Form Builder
      </h2>

      <div className="mb-4 text-center">
        {/* Button to toggle between preview and edit modes */}
        <button
          onClick={togglePreviewMode}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {previewMode ? "Edit Form" : "Preview Form"}
        </button>
      </div>

      {!previewMode ? ( // Render form in edit mode if preview is not enabled
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.id} className="mb-4">
              <label className="block text-gray-700 font-medium">
                {field.label}
              </label>

              {/* Render text input field */}
              {field.type === "text" && (
                <input
                  type="text"
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  value={formData[field.id] || ""}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}

              {/* Render select dropdown field */}
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

              {/* Display validation error message for each field */}
              {errorMessages[field.id] && (
                <p className="text-red-500 text-sm mt-1">
                  {errorMessages[field.id]}
                </p>
              )}

              {/* Button to remove a field */}
              <button
                type="button"
                onClick={() => handleRemoveField(field.id)}
                className="text-red-500 text-sm mt-2"
              >
                Remove this field
              </button>
            </div>
          ))}

          {!showTitleInput ? ( // Show button to add new field if title input is not shown
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
              {/* Input field for new field title */}
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

              {/* Confirm and Cancel buttons for adding new field */}
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

          {/* Submit button to submit the form */}
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
            {/* Display form data in preview mode */}
            {fields.map((field) => (
              <div key={field.id} className="mb-2">
                <strong>{field.label}: </strong>
                <span>{formData[field.id]}</span>
              </div>
            ))}
          </div>
          <div className="mb-4">
            {/* Button to confirm form submission */}
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

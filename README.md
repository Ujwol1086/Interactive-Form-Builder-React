Interactive Form Builder
An interactive and dynamic form builder built with React, JavaScript, and TailwindCSS. This tool allows users to create custom forms by adding and removing form fields dynamically. It also supports form validation, preview mode, and form submission.

Features
Drag-and-Drop Form Builder: Add, remove, and customize form fields with ease.
Dynamic Form Fields: Users can create text, select, and radio input fields.
Field Validation: Form fields are validated before submission using Zod.
Form Preview: View the form in preview mode to test its functionality before submitting.
Display Submitted Data: After form submission, the entered data is displayed in a formatted table.
Responsive UI: Fully responsive design powered by TailwindCSS for mobile and desktop views.

Installation
Clone the repository:
git clone https://github.com/your-username/form-builder.git

Navigate to the project directory:
cd form-builder

Install the required dependencies:
npm install

Start the development server:
npm start

The application will run on http://localhost:3000.

Usage

Create a Custom Form:

Click the Add New Field button to add a new form field.
For each field, provide a title, type (text, select, radio), and options (for select/radio fields).
Click Submit Form to validate and submit the form.

View Submitted Data:
After form submission, the submitted form data will be displayed in a table format under the "Submitted Details" section.

Remove a Field:
You can remove a field by clicking the Remove this field button next to each field.

Form Field Types:
Text: Standard text input field.
Select: Dropdown menu with predefined options.
Radio: Set of radio buttons for single choice selection.

Folder Structure

src/

├── components/

│   ├── DisplayDetails.js        # Displays the submitted form data
│   ├── FormBuilder.js           # Main form builder component
│   └── FormField.js             # Individual form field component
├── App.js                       # Main entry point for the app
├── index.js                     # Application initialization
└── styles.css                   # Custom CSS file (if needed)

Technologies Used
React: A JavaScript library for building user interfaces.
TailwindCSS: A utility-first CSS framework for rapidly building custom designs.
Zod: TypeScript-first schema declaration and validation library.
JavaScript: The main programming language used for this application.

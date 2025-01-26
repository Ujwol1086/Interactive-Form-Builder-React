const DisplayDetails = ({ formData }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Submitted Form Details
      </h2>
      <table className="w-full table-auto border-collapse text-center">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Field</th>
            <th className="px-4 py-2 border-b">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(formData).map((key) => (
            <tr key={key}>
              <td className="px-4 py-2 border-b font-semibold">{key}</td>
              <td className="px-4 py-2 border-b">{formData[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayDetails;

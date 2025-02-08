import React, { useState } from "react";

const StatusCheck = ({ onStatusFetched }) => {
  const [requestId, setRequestId] = useState(""); // Stores the current request ID
  const [status, setStatus] = useState(null); // Stores the API response
  const [error, setError] = useState(null); // Error handling

  // Fetch status from the backend
  const fetchStatus = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setStatus(null); // Reset status state to avoid accumulation

    try {
      const res = await fetch(
        `http://localhost:5000/api/emails/status/${requestId}`
      );
      const data = await res.json();

      if (res.ok) {
        setStatus(data); // Update UI with the latest requestId data
        onStatusFetched && onStatusFetched(data); // Pass to parent if needed
      } else {
        setError(data.message || "Failed to fetch status.");
      }
    } catch (error) {
      console.error("Error fetching status:", error);
      setError("An error occurred while fetching the status.");
    }
  };

  return (
    <div className="p-4">
      {/* Input form to enter the request ID */}
      <form onSubmit={fetchStatus} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Request ID"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Check Status
        </button>
      </form>

      {/* Error Handling */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Display fetched status */}
      {status && (
        <div className="mt-4 p-4 bg-gray-100 text-gray-800 rounded">
          <p>
            <strong>Request ID:</strong> {status.requestId}
          </p>
          <p>
            <strong>Entries:</strong> {status.totalEntries}
          </p>
          <p>
            <strong>Processed:</strong> {status.totalProcessed}
          </p>
          <p>
            <strong>Pending:</strong> {status.totalPending}
          </p>
          <p>
            <strong>Status:</strong> {status.status}
          </p>
          <p>
            <strong>Personal Emails:</strong> {status.personalEmails}
          </p>
          <p>
            <strong>Work Emails:</strong> {status.workEmails}
          </p>
          <p>
            <strong>Status:</strong> {status.status}
          </p>
        </div>
      )}
    </div>
  );
};

export default StatusCheck;

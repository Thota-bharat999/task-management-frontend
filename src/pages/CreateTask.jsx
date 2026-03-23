import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/apiClient";
import BASE_URL from "../api/baseUrl";
import toast from "react-hot-toast";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bugType, setBugType] = useState("Bug");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleCreateTask = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      await apiRequest("/tasks/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          bugType,
          priority,
          assignedTo,
          dueDate,
        }),
      });

      toast.success("Task created successfully");
      navigate("/tasks");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Create New Task
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border rounded-md"
          />

          <select
            value={bugType}
            onChange={(e) => setBugType(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Bug">Bug</option>
            <option value="Feature">Feature</option>
            <option value="Improvement">Improvement</option>
            <option value="Research">Research</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>

          <input
            type="text"
            placeholder="Assign to (User ID)"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />

          <button
            onClick={handleCreateTask}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
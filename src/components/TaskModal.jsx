import { useState, useEffect } from "react";
import BASE_URL from "../api/baseUrl";
import { apiRequest } from "../api/apiClient";
import toast from "react-hot-toast";

function TaskModal({ task, mode, onClose, onUpdated }) {
  const [formData, setFormData] = useState(task);

  useEffect(() => {
    setFormData(task);
  }, [task]);

  if (!task) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await apiRequest(
        `${BASE_URL}/tasks/${task._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      toast.success("Task updated successfully");
      onUpdated(data.data ?? data);
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>

        {mode === "view" ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {task.title}
            </h2>
            <p className="mb-2"><strong>Description:</strong> {task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Edit Task
            </h2>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>

            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskModal;
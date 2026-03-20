import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { apiRequest } from "../api/apiClient";

function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTask = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiRequest("/tasks/my"); // no BASE_URL / no .json()

      const payload = response?.data ?? response;
      const list = Array.isArray(payload) ? payload : payload.tasks ?? payload.items ?? [];

      setTasks(list);
    } catch (err) {
      setError(err.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const updateStatus = async (taskId, newStatus) => {
    const previousTasks = [...tasks];
    setTasks((prev) =>
      prev.map((task) => (task._id === taskId ? { ...task, status: newStatus } : task))
    );

    try {
      await apiRequest(`/tasks/${taskId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      setTasks(previousTasks);
      alert(err.message || "Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        My Tasks
      </h2>
      {/* <div className="text-center text-gray-500 py-10">
  🎉 No tasks assigned yet
</div> */}
      <div className="flex justify-center py-10">
  <Spinner size="large" />
</div>
      {error && (
         <p className="text-red-500 text-sm mb-4">{error}</p>
      )}
      {!loading && tasks.length ===0 &&(
        <p className="text-gray-600">
          No tasks assigned to you.
        </p>
      )}
      {!loading && tasks.length >0 &&(
         <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Priority</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Due Date</th>
              </tr>
            </thead>
           <tbody>
  {tasks.map((task) => (
    <tr key={task._id} className="border-t">
      <td className="p-3">{task.title}</td>
      <td className="p-3">{task.bugType}</td>
      <td className="p-3">{task.priority}</td>

      {/* STATUS UPDATE */}
      <td className="p-3">
  <div className="flex items-center gap-2">
    {/* Status Badge */}
    <span
      className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusClass(
        task.status
      )}`}
    >
      {task.status}
    </span>

    {/* Status Dropdown */}
    <select
      value={task.status}
      onChange={(e) =>
        updateStatus(task._id, e.target.value)
      }
      className="border px-2 py-1 rounded text-sm"
    >
      <option value="todo">Todo</option>
      <option value="in-progress">In Progress</option>
      <option value="on-hold">On Hold</option>
      <option value="completed">Completed</option>
    </select>
  </div>
</td>

      <td className="p-3">
        {new Date(task.dueDate).toLocaleDateString()}
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyTasks;

const getStatusClass = (status) => {
  switch (status) {
    case "todo":
      return "bg-gray-100 text-gray-700";
    case "in-progress":
      return "bg-blue-100 text-blue-700";
    case "on-hold":
      return "bg-yellow-100 text-yellow-700";
    case "completed":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

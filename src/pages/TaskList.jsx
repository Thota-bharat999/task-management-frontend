import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { apiRequest } from "../api/apiClient";
import { FiTrash2, FiEdit, FiEye } from "react-icons/fi";
import TaskModal from "../components/TaskModal";

function TaskList() {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase();

  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  // 🔎 Search + Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page,
        limit,
        search,
        status: statusFilter,
        priority: priorityFilter,
      });

      const res = await apiRequest(`/tasks/all?${query.toString()}`);
      const payload = res?.data ?? res;
      const list = Array.isArray(payload) ? payload : payload.tasks ?? payload.items ?? [];
      setTasks(list);
      setTotalPages(payload.totalPages ?? res.totalPages ?? 1);
    } catch (err) {
      toast.error(err.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, search, statusFilter, priorityFilter]);

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await apiRequest(`/tasks/${taskId}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      toast.success("Task deleted");
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  const handleView = (task) => {
    setModalMode("view");
    setSelectedTask(task);
  };

  const handleEdit = (task) => {
    setModalMode("edit");
    setSelectedTask(task);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Tasks</h2>

      {/* 🔎 Search & Filters */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white shadow-sm rounded-xl border overflow-x-auto w-full">
          <table className="min-w-full text-gray-900">
            <thead className="bg-gray-50 text-sm text-gray-600 uppercase">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Priority</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Due Date</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="border-t hover:bg-gray-50 text-gray-900">
                  <td className="p-4">{task.title}</td>

                  <td className="p-4 max-w-xs">
                    <p className="truncate text-gray-600 text-sm">
                      {task.description}
                    </p>
                  </td>

                  <td className="p-4">{task.bugType}</td>

                  <td className="p-4">{task.priority}</td>

                  <td className="p-4">{task.status}</td>

                  <td className="p-4">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      {(role === "admin" || role === "manager") && (
                        <>
                          <button onClick={() => handleView(task)}>
                            <FiEye size={18} />
                          </button>

                          <button onClick={() => handleEdit(task)}>
                            <FiEdit size={18} />
                          </button>

                          <button onClick={() => handleDeleteTask(task._id)}>
                            <FiTrash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          mode={modalMode}
          onClose={() => setSelectedTask(null)}
          onUpdated={(updatedTask) =>
            setTasks((prev) =>
              prev.map((t) =>
                t._id === updatedTask._id ? updatedTask : t
              )
            )
          }
        />
      )}
    </div>
  );
}

export default TaskList;
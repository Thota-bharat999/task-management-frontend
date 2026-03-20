import { useEffect, useState } from "react";
// remove BASE_URL usage from this file
import { apiRequest } from "../api/apiClient";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // no full BASE_URL concat here
        const data = await apiRequest("/tasks/statistics");
        // adjust if endpoint returns `data.data`
        setStats(data?.data ?? data);
      } catch (err) {
        console.error("Failed to fetch statistics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Total Tasks</h3>
          <p className="text-2xl font-bold">
            {loading ? "-" : stats?.totalTasks ?? "-"}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-green-600">
            {loading ? "-" : stats?.completedTasks ?? "-"}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {loading ? "-" : stats?.pendingTasks ?? "-"}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Overdue</h3>
          <p className="text-2xl font-bold text-red-600">
            {loading ? "-" : stats?.overDueTasks ?? "-"}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">
          Recent Activity
        </h2>
        <p className="text-gray-600">
          Task updates and activity logs will appear here.
        </p>
      </div>
    </>
  );
}

export default Dashboard;
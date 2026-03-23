import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import {
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiList
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { apiRequest } from "../api/apiClient";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await apiRequest("/tasks/statistics");
        setStats(data?.data ?? data);
      } catch (err) {
        console.error("Failed to fetch statistics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const chartData = [
    { name: "Completed", value: stats?.completedTasks || 0 },
    { name: "Pending", value: stats?.pendingTasks || 0 },
    { name: "Overdue", value: stats?.overDueTasks || 0 }
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="space-y-6">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 text-sm">
          Monitor task progress and performance insights
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow">
          <p className="text-sm opacity-90">Total Tasks</p>
          <h2 className="text-3xl font-bold">
            {loading ? "-" : stats?.totalTasks ?? "-"}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Completed</p>
          <h2 className="text-3xl font-bold text-green-600">
            {loading ? "-" : stats?.completedTasks ?? "-"}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-3xl font-bold text-yellow-500">
            {loading ? "-" : stats?.pendingTasks ?? "-"}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Overdue</p>
          <h2 className="text-3xl font-bold text-red-600">
            {loading ? "-" : stats?.overDueTasks ?? "-"}
          </h2>
        </div>

      </div>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Chart Card */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Task Distribution
          </h2>

          <div className="flex justify-center">
            <div className="w-[300px] h-[300px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Custom Legend */}
          <div className="flex justify-center gap-6 mt-4 text-sm font-medium">
            {chartData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* Activity Card */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Recent Activity
          </h2>

          <ul className="space-y-3 text-sm text-gray-600">
            <li>Task marked as completed</li>
            <li>Task assigned to user</li>
            <li>New task created</li>
            <li>Overdue task reminder</li>
          </ul>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
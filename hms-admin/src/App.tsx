import React from "react";
import {
  Activity,
  Users,
  Rows4,
  ArrowRight,
  Bed,
  ClipboardList,
  Package,
  AlertTriangle,
  Pill,
} from "lucide-react"; // example icons
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router";

const departmentData = [
  {
    name: "General",
    available: 3,
    occupied: 5,
  },
  { name: "ICU", available: 3, occupied: 17 },
  { name: "Emergency", available: 5, occupied: 15 },
  { name: "Private", available: 8, occupied: 12 },
];

const patientFlowData = [
  { time: "08:00", patients: 12 },
  { time: "10:00", patients: 28 },
  { time: "12:00", patients: 45 },
  { time: "14:00", patients: 38 },
  { time: "16:00", patients: 32 },
  { time: "18:00", patients: 25 },
];

// ✅ Reusable StatsCard component
const StatsCard = ({
  title,
  value,
  icon: Icon,
  subtext,
  gross,
  color = "blue",
}: {
  title: string;
  value: string;
  icon: React.ComponentType<{ size?: number }>;
  subtext: string;
  gross?: string;
  color?: string;
}) => {
  return (
    <div className="p-4 border rounded-2xl shadow-sm hover:shadow-md transition-all bg-white">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {/* Icon container */}
        <div className={`p-2 rounded-full bg-${color}-100 text-${color}-600`}>
          <Icon size={24} />
        </div>
      </div>

      <p className="mt-2 text-sm text-gray-600">{subtext}</p>

      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {gross && <p className="text-sm text-gray-500">Gross: {gross}</p>}
      </div>
    </div>
  );
};

// ✅ Example usage in App
const App = () => {
  const navigate = useNavigate();
  const stats = [
    {
      title: " Total Patients",
      value: "54 ",
      icon: Users,
      subtext: "Currently using the platform",
      gross: "35",
      color: "green",
    },
    {
      title: "Available Beds",
      value: "12",
      icon: Bed,
      subtext: "Total beds available",
      gross: "32",
      color: "yellow",
    },
    {
      title: " Queue Length",
      value: "45",
      icon: Rows4,
      subtext: " Patients in OPD queue",
      gross: "N/A",
      color: "blue",
    },
    {
      title: "Medicine Inventory",
      value: "30%",
      icon: Pill,
      subtext: " Stock remaining",
      gross: "Stable",
      color: "red",
    },
  ];
  const activities = [
    {
      action: "New patient registered in OPD queue",
      time: "5 minutes ago",
      type: "queue",
    },
    {
      action: `Low stock alert: "Paracetamol"`,
      time: "12 minutes ago",
      type: "alert",
    },
    {
      action: "Bed assignment updated",
      time: "18 minutes ago",
      type: "bed",
    },
    {
      action: "Patient consultation completed",
      time: "25 minutes ago",
      type: "queue",
    },
  ];

  // choose an icon based on activity type
  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "bed":
        return <Bed className="h-4 w-4 text-blue-600" />;
      case "queue":
        return <ClipboardList className="h-4 w-4 text-green-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Department Bed Availability */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">
                  Bed Availability by Department
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Current status across all wards
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar
                  dataKey="available"
                  fill="hsl(var(--chart-1))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="occupied"
                  fill="hsl(var(--chart-2))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Patient Flow */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Patient Flow Today</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  OPD registrations over time
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={patientFlowData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="time" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="patients"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                className="w-full justify-between"
                variant="outline"
                data-testid="button-register-patient"
              >
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Register New Patient
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                className="w-full justify-between"
                variant="outline"
                onClick={() => navigate("/beds")}
                data-testid="button-admit-patient"
              >
                <span className="flex items-center gap-2">
                  <Bed className="h-4 w-4" />
                  View Bed Availability
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                className="w-full justify-between"
                variant="outline"
                onClick={() => navigate("/opd-queue")}
                data-testid="button-view-queue"
              >
                <span className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  View OPD Queue
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                className="w-full justify-between"
                variant="outline"
                onClick={() => navigate("/inventory")}
                data-testid="button-check-inventory"
              >
                <span className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Check Inventory
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {activities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
                  data-testid={`activity-${idx}`}
                >
                  <div className="rounded-full p-2 bg-primary/10">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default App;

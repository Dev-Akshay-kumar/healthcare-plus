import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, Filter, RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QueueTokenCard } from "@/components/queue-token-card";

export default function OpdQueuePage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Mock Data (instead of useQuery)
  const allQueue = [
    {
      id: "1",
      tokenNumber: "T001",
      patientId: "P101",
      patientName: "Ravi Kumar",
      patientAge: 32,
      departmentId: "cardiology",
      departmentName: "Cardiology",
      doctorId: "D1",
      priority: "urgent",
      status: "waiting",
      registeredAt: "2025-11-04T06:30:00Z",
    },
    {
      id: "2",
      tokenNumber: "T002",
      patientId: "P102",
      patientName: "Anita Sharma",
      patientAge: 45,
      departmentId: "general",
      departmentName: "General Medicine",
      doctorId: "D2",
      priority: "normal",
      status: "in_consultation",
      registeredAt: "2025-11-04T06:00:00Z",
      consultationStartedAt: "2025-11-04T06:20:00Z",
    },
    {
      id: "3",
      tokenNumber: "T003",
      patientId: "P103",
      patientName: "Vijay Singh",
      patientAge: 29,
      departmentId: "ent",
      departmentName: "ENT",
      doctorId: "D3",
      priority: "emergency",
      status: "completed",
      registeredAt: "2025-11-04T05:20:00Z",
      completedAt: "2025-11-04T06:00:00Z",
    },
  ];

  const isLoading = false; // no async loading here

  // ✅ Mock stats
  const stats = {
    total: allQueue.length,
    completed: allQueue.filter((q) => q.status === "completed").length,
    waiting: allQueue.filter((q) => q.status === "waiting").length,
    inConsultation: allQueue.filter((q) => q.status === "in_consultation")
      .length,
  };

  // ✅ Filtering logic
  const filteredQueue =
    allQueue.filter((item) => {
      const matchesSearch =
        item.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.patientName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept =
        selectedDepartment === "all" ||
        item.departmentId === selectedDepartment;
      return matchesSearch && matchesDept;
    }) || [];

  const queueData = {
    waiting: filteredQueue.filter((q) => q.status === "waiting"),
    inConsultation: filteredQueue.filter((q) => q.status === "in_consultation"),
    completed: filteredQueue.filter((q) => q.status === "completed"),
  };

  const calculateWaitTime = (registeredAt: string) => {
    const now = new Date();
    const registered = new Date(registeredAt);
    const diff = Math.floor(
      (now.getTime() - registered.getTime()) / (1000 * 60)
    );
    return `${diff} mins`;
  };

  return (
    <div className="space-y-6 p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">OPD Queue Management</h1>
          <p className="text-muted-foreground mt-1">
            Real-time patient queue across all departments
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            data-testid="button-refresh-queue"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button data-testid="button-register-patient">
            <Plus className="h-4 w-4 mr-2" />
            Register Patient
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or token number..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-queue"
              />
            </div>
          </div>
          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger
              className="w-[200px]"
              data-testid="select-department-filter"
            >
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="general">General Medicine</SelectItem>
              <SelectItem value="orthopedics">Orthopedics</SelectItem>
              <SelectItem value="ent">ENT</SelectItem>
              <SelectItem value="dermatology">Dermatology</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" data-testid="button-more-filters">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Queue Board */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-64" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {/* Waiting */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Waiting</h2>
              <Badge variant="secondary" className="font-mono">
                {queueData.waiting.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {queueData.waiting.map((token) => (
                <QueueTokenCard
                  key={token.id}
                  tokenNumber={token.tokenNumber}
                  patientName={token.patientName}
                  patientAge={token.patientAge}
                  department={token.departmentName}
                  waitTime={calculateWaitTime(token.registeredAt)}
                  priority={token.priority}
                />
              ))}
              {queueData.waiting.length === 0 && (
                <Card className="p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No patients waiting
                  </p>
                </Card>
              )}
            </div>
          </div>

          {/* In Consultation */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">In Consultation</h2>
              <Badge variant="secondary" className="font-mono">
                {queueData.inConsultation.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {queueData.inConsultation.map((token) => (
                <QueueTokenCard
                  key={token.id}
                  tokenNumber={token.tokenNumber}
                  patientName={token.patientName}
                  patientAge={token.patientAge}
                  department={token.departmentName}
                  waitTime={`In progress - ${calculateWaitTime(
                    token.consultationStartedAt || token.registeredAt
                  )}`}
                  priority={token.priority}
                />
              ))}
              {queueData.inConsultation.length === 0 && (
                <Card className="p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No consultations active
                  </p>
                </Card>
              )}
            </div>
          </div>

          {/* Completed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Completed</h2>
              <Badge variant="secondary" className="font-mono">
                {queueData.completed.length}
              </Badge>
            </div>
            <div className="space-y-3 opacity-70">
              {queueData.completed.slice(0, 5).map((token) => (
                <QueueTokenCard
                  key={token.id}
                  tokenNumber={token.tokenNumber}
                  patientName={token.patientName}
                  patientAge={token.patientAge}
                  department={token.departmentName}
                  waitTime="Completed"
                  priority={token.priority}
                />
              ))}
              {queueData.completed.length === 0 && (
                <Card className="p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No completed consultations
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Today's Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{stats.total}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Total Registrations
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">
              {stats.completed}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">{stats.waiting}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Currently Waiting
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">
              {stats.inConsultation}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              In Consultation
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

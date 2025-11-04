import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // ✅ fixed import
import { Filter, Grid3x3, List, Search, BedDouble } from "lucide-react";

// ✅ Mock BedCard component (used in grid view)
const BedCard = ({
  bedNumber,
  status,
  ward,
  patientName,
}: {
  bedNumber: string;
  status: string;
  ward: string;
  patientName: string;
}) => {
  const color =
    status === "available"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <Card className="p-4 flex flex-col items-center text-center">
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 mb-2">
        <BedDouble className="h-5 w-5 text-primary" />
      </div>
      <p className="font-semibold">Bed {bedNumber}</p>
      <p className="text-sm text-muted-foreground">{ward}</p>
      <span
        className={`mt-2 px-2 py-1 rounded-full text-xs font-medium ${color}`}
      >
        {status}
      </span>
      {patientName && (
        <p className="mt-1 text-xs text-gray-500">{patientName}</p>
      )}
    </Card>
  );
};

export default function BedsPage() {
  // ✅ Mock data
  const allBeds = [
    {
      id: 1,
      bedNumber: "B-101",
      wardType: "general",
      floor: 1,
      status: "available",
      assignedPatientName: "",
    },
    {
      id: 2,
      bedNumber: "B-102",
      wardType: "icu",
      floor: 1,
      status: "occupied",
      assignedPatientName: "John Doe",
    },
    {
      id: 3,
      bedNumber: "B-103",
      wardType: "emergency",
      floor: 1,
      status: "available",
      assignedPatientName: "",
    },
    {
      id: 4,
      bedNumber: "B-104",
      wardType: "private",
      floor: 2,
      status: "occupied",
      assignedPatientName: "Jane Smith",
    },
  ];

  const stats = {
    total: allBeds.length,
    available: allBeds.filter((b) => b.status === "available").length,
    occupied: allBeds.filter((b) => b.status === "occupied").length,
  };

  const [selectedWard, setSelectedWard] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading] = useState(false);

  const filteredBeds =
    allBeds?.filter((bed) => {
      const matchesWard =
        selectedWard === "all" ||
        bed.wardType.toLowerCase().includes(selectedWard);
      const matchesSearch =
        bed.bedNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bed.assignedPatientName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesWard && matchesSearch;
    }) || [];

  return (
    <div className="space-y-6 p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bed Management</h1>
          <p className="text-muted-foreground mt-1">
            Real-time bed availability across all departments
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "secondary" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "secondary" : "outline"}
            size="icon"
            onClick={() => setViewMode("table")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-20" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Beds</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold mt-1 text-green-600">
                  {stats.available}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Occupied</p>
                <p className="text-2xl font-bold mt-1 text-red-600">
                  {stats.occupied}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                <p className="text-2xl font-bold mt-1">
                  {Math.round((stats.occupied / stats.total) * 100)}%
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by bed number or patient name..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Select value={selectedWard} onValueChange={setSelectedWard}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Wards" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Wards</SelectItem>
              <SelectItem value="general">General Ward</SelectItem>
              <SelectItem value="icu">ICU</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Status
          </Button>
        </div>
      </Card>

      {/* Beds Display */}
      {isLoading ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-24" />
            </Card>
          ))}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {filteredBeds.map((bed) => (
            <BedCard
              key={bed.id}
              bedNumber={bed.bedNumber}
              status={bed.status}
              ward={bed.wardType.toUpperCase()}
              patientName={bed.assignedPatientName}
            />
          ))}
          {filteredBeds.length === 0 && (
            <div className="col-span-full">
              <Card className="p-8 text-center">
                <p className="text-sm text-muted-foreground">No beds found</p>
              </Card>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Bed Number</TableHead>
                <TableHead className="font-semibold">Ward</TableHead>
                <TableHead className="font-semibold">Floor</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Patient</TableHead>
                <TableHead className="text-right font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBeds.map((bed) => (
                <TableRow key={bed.id}>
                  <TableCell className="font-mono font-medium">
                    {bed.bedNumber}
                  </TableCell>
                  <TableCell className="capitalize">{bed.wardType}</TableCell>
                  <TableCell>Floor {bed.floor}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        bed.status === "available" ? "secondary" : "outline"
                      }
                      className="capitalize"
                    >
                      {bed.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{bed.assignedPatientName || "—"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}

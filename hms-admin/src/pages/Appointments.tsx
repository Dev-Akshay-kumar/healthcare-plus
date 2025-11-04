import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Calendar, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

const Appointments = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filtered = appointments.filter((appt) =>
    appt.patientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-lg border border-gray-100">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-full">
              <Stethoscope className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight text-gray-800">
              Appointments Dashboard
            </CardTitle>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by patient name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-10 text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Loading appointments...
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No appointments found.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-100">
              <Table>
                <TableCaption className="text-sm text-gray-500">
                  Overview of all scheduled appointments
                </TableCaption>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="text-gray-600 font-semibold">
                      Patient
                    </TableHead>
                    <TableHead className="text-gray-600 font-semibold">
                      Issue
                    </TableHead>
                    <TableHead className="text-gray-600 font-semibold">
                      Date
                    </TableHead>
                    <TableHead className="text-gray-600 font-semibold">
                      Time
                    </TableHead>
                    <TableHead className="text-gray-600 font-semibold">
                      Mode
                    </TableHead>
                    <TableHead className="text-gray-600 font-semibold text-right">
                      Status
                    </TableHead>
                    <TableHead className="text-gray-600 font-semibold text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((appt, idx) => (
                    <motion.tr
                      key={appt._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-blue-50/40 transition-colors duration-150"
                    >
                      <TableCell className="font-medium text-gray-800">
                        {appt.patientName}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {appt.issue}
                      </TableCell>
                      <TableCell className="text-gray-700 flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        {formatDate(appt.date)}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {appt.timeSlot}
                      </TableCell>
                      <TableCell className="capitalize text-gray-700">
                        {appt.consultationMode}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          className={`px-3 py-1 text-sm font-medium rounded-full ${
                            appt.status === "scheduled"
                              ? "bg-blue-100 text-blue-700"
                              : appt.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {appt.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right flex justify-end gap-2 ">
                        <Badge className={"bg-green-500 text-white"}>
                          Accept
                        </Badge>
                        <Badge className={"bg-red-500 text-white"}>
                          Cancel
                        </Badge>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Appointments;

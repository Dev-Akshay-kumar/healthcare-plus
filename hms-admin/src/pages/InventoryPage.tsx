import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { AlertTriangle, Download, Filter, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InventoryAlertBanner } from "@/components/inventory-alert-banner";

export default function InventoryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAlert, setShowAlert] = useState(true);

  // ✅ Mock data
  const allInventory = [
    {
      id: "1",
      itemName: "Paracetamol 500mg",
      category: "Medicines",
      currentStock: 25,
      reorderLevel: 50,
      unitPrice: 5000, // ₹50.00
      expiryDate: "2025-11-20",
      supplier: "HealthCorp",
      batchNumber: "BATCH001",
    },
    {
      id: "2",
      itemName: "Syringe 5ml",
      category: "Consumables",
      currentStock: 200,
      reorderLevel: 100,
      unitPrice: 1000, // ₹10.00
      expiryDate: "2026-03-10",
      supplier: "MediSupply",
      batchNumber: "BATCH002",
    },
    {
      id: "3",
      itemName: "Amoxicillin 250mg",
      category: "Medicines",
      currentStock: 10,
      reorderLevel: 30,
      unitPrice: 12000, // ₹120.00
      expiryDate: "2025-11-18",
      supplier: "BioPharma",
      batchNumber: "BATCH003",
    },
    {
      id: "4",
      itemName: "Gloves (Medium)",
      category: "Consumables",
      currentStock: 150,
      reorderLevel: 100,
      unitPrice: 1500, // ₹15.00
      expiryDate: null,
      supplier: "SafeHands",
      batchNumber: "BATCH004",
    },
  ];

  const lowStock = allInventory.filter(
    (item) => item.currentStock < item.reorderLevel
  );

  const expiring = allInventory.filter((item) => {
    if (!item.expiryDate) return false;
    const expiry = new Date(item.expiryDate);
    const in30Days = new Date();
    in30Days.setDate(in30Days.getDate() + 30);
    return expiry <= in30Days;
  });

  const filteredInventory = allInventory.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.itemName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">
            Track medicines, consumables, and medical supplies
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" data-testid="button-export-inventory">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button data-testid="button-add-item">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Alert Banner */}
      {showAlert && (
        <InventoryAlertBanner
          lowStockCount={lowStock.length}
          expiringCount={expiring.length}
          onDismiss={() => setShowAlert(false)}
        />
      )}

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Items</p>
            <p className="text-2xl font-bold mt-1">{allInventory.length}</p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Low Stock</p>
              <p className="text-2xl font-bold mt-1 text-yellow-600">
                {lowStock.length}
              </p>
            </div>
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Expiring Soon</p>
              <p className="text-2xl font-bold mt-1 text-red-600">
                {expiring.length}
              </p>
            </div>
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div>
            <p className="text-sm text-muted-foreground">Categories</p>
            <p className="text-2xl font-bold mt-1">
              {new Set(allInventory.map((i) => i.category)).size}
            </p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Medicines">Medicines</SelectItem>
              <SelectItem value="Consumables">Consumables</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Stock Status
          </Button>
        </div>
      </Card>

      {/* Inventory Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Reorder Level</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredInventory.map((item) => {
              const isLowStock = item.currentStock < item.reorderLevel;
              const expiryDate = item.expiryDate
                ? new Date(item.expiryDate)
                : null;
              const thirtyDaysFromNow = new Date();
              thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
              const isExpiringSoon =
                expiryDate && expiryDate <= thirtyDaysFromNow;

              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.itemName}
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">
                      {item.batchNumber}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">{item.category}</Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{item.currentStock}</span>
                      {isLowStock && (
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="font-mono">
                    {item.reorderLevel}
                  </TableCell>

                  <TableCell className="font-mono">
                    ₹{(item.unitPrice / 100).toFixed(2)}
                  </TableCell>

                  <TableCell>
                    {expiryDate ? (
                      <span
                        className={
                          isExpiringSoon ? "text-red-600 font-medium" : ""
                        }
                      >
                        {expiryDate.toLocaleDateString()}
                      </span>
                    ) : (
                      "—"
                    )}
                  </TableCell>

                  <TableCell>{item.supplier || "—"}</TableCell>

                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

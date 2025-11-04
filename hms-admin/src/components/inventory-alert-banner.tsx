import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InventoryAlertBannerProps {
  lowStockCount: number;
  expiringCount: number;
  onDismiss?: () => void;
}

export function InventoryAlertBanner({
  lowStockCount,
  expiringCount,
  onDismiss,
}: InventoryAlertBannerProps) {
  if (lowStockCount === 0 && expiringCount === 0) return null;

  return (
    <Alert variant="destructive" className="mb-6" data-testid="alert-inventory-warning">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Inventory Alerts</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>
          {lowStockCount > 0 && (
            <span className="font-medium">{lowStockCount} items below reorder level</span>
          )}
          {lowStockCount > 0 && expiringCount > 0 && <span className="mx-2">•</span>}
          {expiringCount > 0 && (
            <span className="font-medium">{expiringCount} items expiring within 30 days</span>
          )}
        </span>
        {onDismiss && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 ml-4"
            onClick={onDismiss}
            data-testid="button-dismiss-alert"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
// type Priority = "normal" | "urgent" | "emergency";

interface QueueTokenCardProps {
  tokenNumber: string;
  patientName: string;
  patientAge: number;
  department: string;
  waitTime: string;
  priority: string;
  onClick?: () => void;
}

const priorityColors: Record<string, string> = {
  normal:
    "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  urgent:
    "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
  emergency:
    "bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
};

export function QueueTokenCard({
  tokenNumber,
  patientName,
  patientAge,
  department,
  waitTime,
  priority,
  onClick,
}: QueueTokenCardProps) {
  return (
    <Card
      className={cn(
        "p-4 hover-elevate active-elevate-2 cursor-pointer transition-all",
        priority === "emergency" && "border-red-500/50"
      )}
      onClick={onClick}
      data-testid={`card-queue-token-${tokenNumber}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="font-mono text-2xl font-bold"
          data-testid={`text-token-number-${tokenNumber}`}
        >
          {tokenNumber}
        </div>
        {priority !== "normal" && (
          <Badge
            variant="outline"
            className={cn("gap-1", priorityColors[priority])}
          >
            {priority === "emergency" && <AlertCircle className="h-3 w-3" />}
            {priority.toUpperCase()}
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        <div>
          <p
            className="font-medium"
            data-testid={`text-patient-name-${tokenNumber}`}
          >
            {patientName}
          </p>
          <p className="text-sm text-muted-foreground">Age: {patientAge}</p>
        </div>

        <Badge variant="secondary" className="text-xs">
          {department}
        </Badge>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-2 border-t">
          <Clock className="h-3.5 w-3.5" />
          <span>{waitTime}</span>
        </div>
      </div>
    </Card>
  );
}

import * as Icon from "@/components/icons";

function AlertSeverityIcon({ severity }: { severity: string }) {
  switch (severity) {
    case "CRITICAL":
      return <Icon.AlertCircle className="h-4 w-4 shrink-0 text-danger" />;
    case "MEDIUM":
      return <Icon.AlertTriangle className="h-4 w-4 shrink-0 text-warning" />;
    default:
      return <Icon.Info className="h-4 w-4 shrink-0 text-faint" />;
  }
}

export default AlertSeverityIcon
import Badge from "@/components/ui/badge/Badge";

const statusVariants = {
  Draft: "gray",
  Testing: "amber",
  Published: "green",
  Deprecated: "red",
};

const StatusBadge = ({ status }) => {
  return (
    <Badge variant={statusVariants[status] ?? "gray"}>{status}</Badge>
  );
};

export default StatusBadge;

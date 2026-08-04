import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Icon from "@/components/ui/Icon";
import Loading from "@/components/ui/Loading";
import { cn } from "@/utils/cn";
import StatusBadge from "./StatusBadge";
import ToolActionMenu from "./ToolActionMenu";

const getInitials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

const VisibilitySwitch = ({ checked, onChange, label, disabled }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      disabled={disabled}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1",
        disabled && "cursor-not-allowed opacity-40",
        checked ? "bg-indigo-600" : "bg-gray-300"
      )}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
};

const ToolsTable = ({
  tools,
  loading,
  actionLoading = {},
  onAdd,
  onView,
  onEdit,
  onDelete,
  onTest,
  onPublish,
  onUnpublish,
  onDeprecate,
  onRestore,
  onToggleVisibility,
}) => {
  const isBusy = (tool) => Boolean(actionLoading[tool.id]);
  if (loading && tools.length === 0) {
    return (
      <Card title="Tools" bodyClassName="p-0">
        <Loading label="Loading tools..." />
      </Card>
    );
  }

  if (tools.length === 0) {
    return (
      <Card title="Tools" bodyClassName="p-0">
        <div className="p-6">
          <EmptyState
            title="No tools found"
            description="Try adjusting your search or filters, or add a new tool."
            action={
              <Button onClick={onAdd}>
                <Icon name="plus" size={16} />
                Add Tool
              </Button>
            }
          />
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="Tools"
      description={`Showing ${tools.length} tools`}
      bodyClassName="p-0"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
              <th className="px-5 py-3 font-semibold">Tool Name</th>
              <th className="px-5 py-3 font-semibold">Category</th>
              <th className="px-5 py-3 font-semibold">Version</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Developer Visible</th>
              <th className="px-5 py-3 font-semibold">Coming Soon</th>
              <th className="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tools.map((tool) => {
              const showPublish =
                tool.status === "Draft" || tool.status === "Testing";
              const showUnpublish = tool.status === "Published";
              const busy = isBusy(tool);

              return (
                <tr key={tool.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-xs font-bold text-indigo-700">
                        {getInitials(tool.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-gray-900">
                          {tool.name}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {tool.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant="indigo">{tool.category}</Badge>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{tool.version}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={tool.status} />
                  </td>
                  <td className="px-5 py-3">
                    <VisibilitySwitch
                      checked={Boolean(tool.developerVisible)}
                      onChange={() => onToggleVisibility(tool)}
                      disabled={tool.status !== "Published" || busy}
                      label={`Toggle visibility for ${tool.name}`}
                    />
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={tool.comingSoon ? "amber" : "gray"}>
                      {tool.comingSoon ? "Yes" : "No"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {showPublish && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => onPublish(tool)}
                          disabled={busy}
                        >
                          <Icon name="rocket" size={14} />
                          Publish
                        </Button>
                      )}
                      {showUnpublish && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => onUnpublish(tool)}
                          disabled={busy}
                        >
                          <Icon name="eyeOff" size={14} />
                          Unpublish
                        </Button>
                      )}
                      <ToolActionMenu
                        tool={tool}
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onTest={onTest}
                        onDeprecate={onDeprecate}
                        onRestore={onRestore}
                        disabled={busy}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ToolsTable;

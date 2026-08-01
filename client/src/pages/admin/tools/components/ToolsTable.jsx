import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Icon from "@/components/ui/Icon";
import StatusBadge from "./StatusBadge";
import ToolActionMenu from "./ToolActionMenu";

const getInitials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

const ToolsTable = ({
  tools,
  total,
  onAdd,
  onView,
  onEdit,
  onDelete,
  onTest,
  onPublish,
}) => {
  return (
    <Card
      title="Tools"
      description={`Showing ${tools.length} of ${total} tools`}
      bodyClassName="p-0"
    >
      {tools.length === 0 ? (
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
      ) : (
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
              {tools.map((tool) => (
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
                    <Badge variant={tool.developerVisible ? "green" : "gray"}>
                      {tool.developerVisible ? "Yes" : "No"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={tool.comingSoon ? "amber" : "gray"}>
                      {tool.comingSoon ? "Yes" : "No"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <ToolActionMenu
                      tool={tool}
                      onView={onView}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onTest={onTest}
                      onPublish={onPublish}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default ToolsTable;

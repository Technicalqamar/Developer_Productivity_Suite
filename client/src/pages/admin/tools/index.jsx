import { useCallback, useEffect, useState } from "react";
import PageContainer from "@/components/ui/PageContainer";
import PageTitle from "@/components/ui/PageTitle";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ToolFilters from "./components/ToolFilters";
import ToolsTable from "./components/ToolsTable";
import AddToolModal from "./components/AddToolModal";
import Toast from "./components/Toast";
import { TOOL_STATUSES, TOOL_CATEGORIES } from "./data/constants";
import * as toolService from "@/services/tool.service";

const capitalizeStatus = (status) =>
  status ? status.charAt(0).toUpperCase() + status.slice(1) : status;

const toUiTool = (tool) => ({
  ...tool,
  id: tool._id,
  status: capitalizeStatus(tool.status),
});

const slugify = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const toApiTool = (tool) => ({
  name: tool.name,
  slug: slugify(tool.slug),
  category: tool.category,
  description: tool.description ?? "",
  icon: tool.icon ?? "",
  version: tool.version ?? "",
  status: tool.status.toLowerCase(),
  developerVisible: Boolean(tool.developerVisible),
  comingSoon: Boolean(tool.comingSoon),
  displayOrder: Number(tool.displayOrder) || 0,
  isActive: tool.isActive === undefined ? true : Boolean(tool.isActive),
});

const getErrorMessage = (error) =>
  error.response?.data?.message || "Something went wrong. Please try again.";

const CONFIRM_CONFIG = {
  publish: {
    title: "Publish tool?",
    confirmLabel: "Publish",
    variant: "primary",
    message: (tool) =>
      `"${tool.name}" will move to Published status and become eligible for developers.`,
  },
  unpublish: {
    title: "Unpublish tool?",
    confirmLabel: "Unpublish",
    variant: "primary",
    message: (tool) =>
      `"${tool.name}" will return to Testing status and be hidden from developers.`,
  },
  deprecate: {
    title: "Deprecate tool?",
    confirmLabel: "Deprecate",
    variant: "danger",
    message: (tool) =>
      `"${tool.name}" will be permanently retired and hidden from developers. You can restore it later.`,
  },
  delete: {
    title: "Delete tool?",
    confirmLabel: "Delete",
    variant: "danger",
    message: (tool) =>
      `"${tool.name}" will be permanently deleted. This cannot be undone.`,
  },
};

const ToolManagementPage = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [modal, setModal] = useState({ open: false, mode: "create", tool: null });
  const [confirm, setConfirm] = useState({ open: false, type: null, tool: null });
  const [confirming, setConfirming] = useState(false);
  const [actionLoading, setActionLoading] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
  }, []);

  const runAction = useCallback(
    async (toolId, task) => {
      setActionLoading((prev) => ({ ...prev, [toolId]: true }));

      try {
        await task();
      } catch (error) {
        showToast(getErrorMessage(error), "error");
      } finally {
        setActionLoading((prev) => {
          const next = { ...prev };
          delete next[toolId];
          return next;
        });
      }
    },
    [showToast]
  );

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const loadTools = useCallback(async () => {
    setLoading(true);

    try {
      const params = {};

      if (search.trim()) {
        params.search = search.trim();
      }

      if (statusFilter !== "all") {
        params.status = statusFilter.toLowerCase();
      }

      if (categoryFilter !== "all") {
        params.category = categoryFilter;
      }

      if (visibilityFilter !== "all") {
        params.developerVisible = visibilityFilter;
      }

      const data = await toolService.listTools(params);
      setTools(data.map(toUiTool));
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, categoryFilter, visibilityFilter, showToast]);

  useEffect(() => {
    loadTools();
  }, [loadTools]);

  const openModal = (mode, tool = null) => setModal({ open: true, mode, tool });

  const closeModal = () => setModal({ open: false, mode: "create", tool: null });

  const handleSave = async (data) => {
    try {
      if (modal.mode === "edit") {
        await toolService.updateTool(data.id, toApiTool(data));
        showToast(`"${data.name}" updated successfully.`, "success");
      } else {
        await toolService.createTool(toApiTool(data));
        showToast(`"${data.name}" added successfully.`, "success");
      }

      closeModal();
      loadTools();
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    }
  };

  const requestConfirm = (type, tool) =>
    setConfirm({ open: true, type, tool });

  const closeConfirm = () => {
    setConfirming(false);
    setConfirm({ open: false, type: null, tool: null });
  };

  const runConfirm = async () => {
    const { type, tool } = confirm;

    if (!type || !tool) {
      return;
    }

    setConfirming(true);

    try {
      if (type === "publish") {
        await toolService.publishTool(tool.id);
        showToast(`"${tool.name}" published successfully.`, "success");
      } else if (type === "unpublish") {
        await toolService.unpublishTool(tool.id);
        showToast(`"${tool.name}" unpublished successfully.`, "success");
      } else if (type === "deprecate") {
        await toolService.deprecateTool(tool.id);
        showToast(`"${tool.name}" deprecated successfully.`, "success");
      } else if (type === "delete") {
        await toolService.deleteTool(tool.id);
        showToast(`"${tool.name}" deleted successfully.`, "success");
      }

      closeConfirm();
      loadTools();
    } catch (error) {
      showToast(getErrorMessage(error), "error");
      closeConfirm();
    }
  };

  const handlePublish = (tool) => {
    if (tool.status === "Testing") {
      requestConfirm("publish", tool);
      return;
    }

    runAction(tool.id, async () => {
      await toolService.updateToolStatus(tool.id, "testing");
      showToast(`"${tool.name}" moved to Testing.`, "success");
      loadTools();
    });
  };

  const handleUnpublish = (tool) => requestConfirm("unpublish", tool);

  const handleDeprecate = (tool) => requestConfirm("deprecate", tool);

  const handleRestore = (tool) =>
    runAction(tool.id, async () => {
      await toolService.restoreTool(tool.id);
      showToast(`"${tool.name}" restored to Draft.`, "success");
      loadTools();
    });

  const handleToggleVisibility = (tool) => {
    const nextVisible = !tool.developerVisible;

    runAction(tool.id, async () => {
      await toolService.updateToolVisibility(tool.id, nextVisible);
      showToast(
        `"${tool.name}" is now ${nextVisible ? "visible" : "hidden"} to developers.`,
        "success"
      );
      loadTools();
    });
  };

  const handleTestTool = (tool) =>
    showToast(`Tool testing is not available yet for "${tool.name}".`);

  const handleReset = () => {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setVisibilityFilter("all");
  };

  return (
    <PageContainer>
      <PageTitle
        title="Tool Management"
        subtitle="Manage the developer tools available in the suite."
        actions={
          <Button onClick={() => openModal("create")}>
            <Icon name="plus" size={18} />
            Add Tool
          </Button>
        }
      />

      <div className="mt-6 space-y-4">
        <ToolFilters
          search={search}
          status={statusFilter}
          category={categoryFilter}
          developerVisible={visibilityFilter}
          statuses={TOOL_STATUSES}
          categories={TOOL_CATEGORIES}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onCategoryChange={setCategoryFilter}
          onDeveloperVisibleChange={setVisibilityFilter}
          onReset={handleReset}
        />

        <ToolsTable
          tools={tools}
          loading={loading}
          actionLoading={actionLoading}
          onAdd={() => openModal("create")}
          onView={(tool) => openModal("view", tool)}
          onEdit={(tool) => openModal("edit", tool)}
          onDelete={(tool) => requestConfirm("delete", tool)}
          onTest={handleTestTool}
          onPublish={handlePublish}
          onUnpublish={handleUnpublish}
          onDeprecate={handleDeprecate}
          onRestore={handleRestore}
          onToggleVisibility={handleToggleVisibility}
        />
      </div>

      <AddToolModal
        open={modal.open}
        mode={modal.mode}
        tool={modal.tool}
        categories={TOOL_CATEGORIES}
        statuses={TOOL_STATUSES}
        onClose={closeModal}
        onSubmit={handleSave}
      />

      <ConfirmDialog
        open={confirm.open}
        title={CONFIRM_CONFIG[confirm.type]?.title}
        message={CONFIRM_CONFIG[confirm.type]?.message?.(confirm.tool)}
        confirmLabel={CONFIRM_CONFIG[confirm.type]?.confirmLabel}
        variant={CONFIRM_CONFIG[confirm.type]?.variant}
        loading={confirming}
        onConfirm={runConfirm}
        onCancel={closeConfirm}
      />

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </PageContainer>
  );
};

export default ToolManagementPage;

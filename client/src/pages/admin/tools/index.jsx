import { useEffect, useMemo, useState } from "react";
import PageContainer from "@/components/ui/PageContainer";
import PageTitle from "@/components/ui/PageTitle";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import ToolFilters from "./components/ToolFilters";
import ToolsTable from "./components/ToolsTable";
import AddToolModal from "./components/AddToolModal";
import Toast from "./components/Toast";
import { mockTools, TOOL_STATUSES, TOOL_CATEGORIES } from "./data/mockTools";

const ToolManagementPage = () => {
  const [tools, setTools] = useState(mockTools);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [modal, setModal] = useState({ open: false, mode: "create", tool: null });
  const [toast, setToast] = useState(null);

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesSearch =
        !query ||
        tool.name.toLowerCase().includes(query) ||
        tool.slug.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || tool.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || tool.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [tools, search, statusFilter, categoryFilter]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message, type = "info") => setToast({ message, type });

  const openModal = (mode, tool = null) => setModal({ open: true, mode, tool });

  const closeModal = () => setModal({ open: false, mode: "create", tool: null });

  const handleSave = (data) => {
    if (modal.mode === "edit") {
      setTools((prev) =>
        prev.map((tool) => (tool.id === data.id ? { ...data } : tool))
      );
      showToast(`"${data.name}" updated. This is UI only.`, "success");
    } else {
      const nextId = tools.length
        ? Math.max(...tools.map((tool) => tool.id)) + 1
        : 1;
      setTools((prev) => [...prev, { ...data, id: nextId }]);
      showToast(`"${data.name}" added. This is UI only.`, "success");
    }

    closeModal();
  };

  const showPlaceholder = (action, tool) =>
    showToast(
      `${action} is a placeholder for "${tool.name}". API integration comes later.`
    );

  const handleReset = () => {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
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
          statuses={TOOL_STATUSES}
          categories={TOOL_CATEGORIES}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onCategoryChange={setCategoryFilter}
          onReset={handleReset}
        />

        <ToolsTable
          tools={filteredTools}
          total={tools.length}
          onAdd={() => openModal("create")}
          onView={(tool) => openModal("view", tool)}
          onEdit={(tool) => openModal("edit", tool)}
          onDelete={(tool) => showPlaceholder("Delete", tool)}
          onTest={(tool) => showPlaceholder("Test Tool", tool)}
          onPublish={(tool) => showPlaceholder("Publish", tool)}
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

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </PageContainer>
  );
};

export default ToolManagementPage;

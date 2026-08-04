import { useEffect, useState } from "react";
import Modal from "@/components/ui/modal/Modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import Select from "@/components/ui/select/Select";
import Textarea from "@/components/ui/textarea/Textarea";
import Toggle from "@/components/ui/toggle/Toggle";
import { ALLOWED_STATUS_TRANSITIONS } from "../../data/constants/constants";

const createEmptyForm = () => ({
  name: "",
  slug: "",
  category: "",
  version: "",
  description: "",
  icon: "",
  status: "Draft",
  developerVisible: false,
  comingSoon: false,
  displayOrder: 0,
});

const AddToolModal = ({
  open,
  mode = "create",
  tool = null,
  categories,
  statuses,
  onClose,
  onSubmit,
}) => {
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const [form, setForm] = useState(createEmptyForm);

  useEffect(() => {
    setForm(tool ? { ...tool } : createEmptyForm());
  }, [tool, open]);

  const slugify = (value) =>
    String(value)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const update = (field) => (event) => {
    const value = event.target.value;
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "name" && !isEdit && !prev.slug.trim()) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const updateToggle = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ...form });
  };

  const statusOptions = isEdit && tool
    ? [tool.status, ...(ALLOWED_STATUS_TRANSITIONS[tool.status] ?? [])]
    : statuses;

  const canManageVisibility = isEdit && form.status === "Published";

  const title = isView ? "View Tool" : isEdit ? "Edit Tool" : "Add Tool";
  const description = isView
    ? `Details for ${tool?.name ?? "this tool"}.`
    : isEdit
      ? "Update the tool details below."
      : "Fill in the details to create a new tool.";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="lg"
      footer={
        isView ? (
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        ) : (
          <>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" form="add-tool-form">
              {isEdit ? "Save Changes" : "Save Tool"}
            </Button>
          </>
        )
      }
    >
      <form id="add-tool-form" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Tool Name"
            placeholder="e.g. React Starter Kit"
            value={form.name}
            onChange={update("name")}
            disabled={isView}
            required
          />
          <Input
            label="Slug"
            placeholder="e.g. react-starter-kit"
            value={form.slug}
            onChange={update("slug")}
            disabled={isView}
            required
            hint="Used in URLs and identifiers"
          />
          <Select
            label="Category"
            value={form.category}
            onChange={update("category")}
            disabled={isView}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Input
            label="Version"
            placeholder="e.g. 1.0.0"
            value={form.version}
            onChange={update("version")}
            disabled={isView}
          />
        </div>

        <div className="mt-4">
          <Textarea
            label="Description"
            rows={3}
            placeholder="What does this tool do?"
            value={form.description}
            onChange={update("description")}
            disabled={isView}
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Input
            label="Icon"
            placeholder="e.g. react or an icon path"
            value={form.icon}
            onChange={update("icon")}
            disabled={isView}
            hint="Icon key or path"
          />
          <Select
            label="Status"
            value={form.status}
            onChange={update("status")}
            disabled={isView || !isEdit}
            hint={isEdit ? "Move through the release lifecycle" : "New tools start as Draft"}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
          <Input
            label="Display Order"
            type="number"
            min={0}
            value={form.displayOrder}
            onChange={update("displayOrder")}
            disabled={isView}
          />
        </div>

        <div className="mt-4 space-y-3">
          <Toggle
            label="Developer Visible"
            description="Show this tool to developers"
            checked={Boolean(form.developerVisible)}
            onChange={updateToggle("developerVisible")}
            disabled={isView || !canManageVisibility}
          />
          <Toggle
            label="Coming Soon"
            description="Mark this tool as coming soon"
            checked={Boolean(form.comingSoon)}
            onChange={updateToggle("comingSoon")}
            disabled={isView || !canManageVisibility}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddToolModal;

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Toggle from "@/components/ui/Toggle";

const createEmptyForm = () => ({
  name: "",
  slug: "",
  category: "",
  version: "",
  description: "",
  icon: "",
  status: "Draft",
  developerVisible: true,
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

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const updateToggle = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ...form });
  };

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
            disabled={isView}
          >
            {statuses.map((status) => (
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
            disabled={isView}
          />
          <Toggle
            label="Coming Soon"
            description="Mark this tool as coming soon"
            checked={Boolean(form.comingSoon)}
            onChange={updateToggle("comingSoon")}
            disabled={isView}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddToolModal;

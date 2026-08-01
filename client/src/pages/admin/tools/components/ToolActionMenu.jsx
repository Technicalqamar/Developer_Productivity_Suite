import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/utils/cn";

const ActionButton = ({ icon, label, danger, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors",
        danger ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-gray-50"
      )}
    >
      <Icon
        name={icon}
        size={16}
        className={danger ? "text-red-400" : "text-gray-400"}
      />
      {label}
    </button>
  );
};

const ToolActionMenu = ({ tool, onView, onEdit, onDelete, onTest, onPublish }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const run = (action) => () => {
    setOpen(false);
    action(tool);
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700",
          open && "bg-gray-100 text-gray-700"
        )}
        aria-label="Tool actions"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Icon name="moreHorizontal" size={18} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-1 w-44 rounded-md border border-gray-200 bg-white py-1 text-sm shadow-lg"
        >
          <ActionButton icon="eye" label="View" onClick={run(onView)} />
          <ActionButton icon="pencil" label="Edit" onClick={run(onEdit)} />
          <ActionButton icon="flask" label="Test Tool" onClick={run(onTest)} />
          <ActionButton icon="rocket" label="Publish" onClick={run(onPublish)} />
          <div className="my-1 border-t border-gray-100" />
          <ActionButton icon="trash" label="Delete" danger onClick={run(onDelete)} />
        </div>
      )}
    </div>
  );
};

export default ToolActionMenu;

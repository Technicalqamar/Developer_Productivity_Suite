import Icon from "@/components/ui/Icon";
import { cn } from "@/utils/cn";

const styles = {
  info: "bg-gray-900 text-white",
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
};

const Toast = ({ toast, onDismiss }) => {
  if (!toast) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg px-4 py-3 text-sm shadow-lg",
          styles[toast.type] ?? styles.info
        )}
        role="status"
      >
        <span>{toast.message}</span>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="rounded p-0.5 opacity-70 transition-opacity hover:opacity-100"
        >
          <Icon name="close" size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;

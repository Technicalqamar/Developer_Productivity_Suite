import { cn } from "@/utils/cn";

const Toggle = ({ label, description, checked, onChange, disabled }) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 px-4 py-3">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60",
          checked ? "bg-indigo-600" : "bg-gray-300"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    </div>
  );
};

export default Toggle;

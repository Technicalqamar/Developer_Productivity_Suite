import { cn } from "@/utils/cn";

const Input = ({ label, error, hint, className, id, ...props }) => {
  const inputId =
    id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {!error && hint && (
        <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
};

export default Input;

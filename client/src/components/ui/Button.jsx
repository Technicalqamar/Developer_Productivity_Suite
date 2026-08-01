import { cn } from "@/utils/cn";

const variants = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  secondary:
    "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm",
};

const Button = ({ variant = "primary", size = "md", className, ...props }) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};

export default Button;

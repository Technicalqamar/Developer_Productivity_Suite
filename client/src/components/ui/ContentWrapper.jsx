import { cn } from "@/utils/cn";

const ContentWrapper = ({ children, className }) => {
  return (
    <main className={cn("min-w-0 flex-1 overflow-y-auto bg-gray-50", className)}>
      {children}
    </main>
  );
};

export default ContentWrapper;

import { cn } from "@/utils/cn/cn";

const PageContainer = ({ children, className }) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageContainer;

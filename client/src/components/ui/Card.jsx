import { cn } from "@/utils/cn";

const Card = ({
  title,
  description,
  actions,
  children,
  footer,
  className,
  bodyClassName,
}) => {
  const hasHeader = Boolean(title || description || actions);

  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white shadow-sm",
        className
      )}
    >
      {hasHeader && (
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4">
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            )}
            {description && (
              <p className="mt-0.5 text-sm text-gray-500">{description}</p>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}
      <div className={cn("px-5 py-4", bodyClassName)}>{children}</div>
      {footer && (
        <div className="border-t border-gray-100 px-5 py-3">{footer}</div>
      )}
    </div>
  );
};

export default Card;

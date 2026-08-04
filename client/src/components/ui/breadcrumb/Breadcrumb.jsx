import { Fragment } from "react";
import { Link } from "react-router-dom";
import Icon from "../icon/Icon";

const Crumb = ({ crumb, isLast }) => {
  if (isLast || !crumb.to) {
    return (
      <span
        aria-current={isLast ? "page" : undefined}
        className={isLast ? "font-medium text-gray-900" : "text-gray-500"}
      >
        {crumb.label}
      </span>
    );
  }

  return (
    <Link to={crumb.to} className="text-gray-500 transition-colors hover:text-gray-900">
      {crumb.label}
    </Link>
  );
};

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 text-sm">
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={`${crumb.label}-${index}`}>
              {index > 0 && (
                <li aria-hidden="true" className="text-gray-400">
                  <Icon name="chevronRight" size={14} />
                </li>
              )}
              <li>
                <Crumb crumb={crumb} isLast={isLast} />
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

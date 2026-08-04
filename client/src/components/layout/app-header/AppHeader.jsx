import Icon from "@/components/ui/icon/Icon";
import Breadcrumb from "@/components/ui/breadcrumb/Breadcrumb";

const AppHeader = ({ crumbs, user, onLogout, onMenuClick }) => {
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("")
    : "U";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          aria-label="Open navigation"
        >
          <Icon name="menu" size={20} />
        </button>
        <div className="hidden sm:block">
          <Breadcrumb items={crumbs} />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-gray-900">
            {user?.fullName ?? "User"}
          </p>
          <p className="text-xs capitalize text-gray-500">
            {user?.role ?? "Guest"}
          </p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
          {initials}
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          aria-label="Logout"
          title="Logout"
        >
          <Icon name="logout" size={18} />
        </button>
      </div>
    </header>
  );
};

export default AppHeader;

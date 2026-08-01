import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import ContentWrapper from "@/components/ui/ContentWrapper";
import { getNavigationItemByPath } from "@/config/navigation";

const getDashboardPath = (navigation) => {
  for (const group of navigation) {
    const dashboard = group.items.find((item) => item.path.endsWith("/dashboard"));

    if (dashboard) {
      return dashboard.path;
    }
  }

  return null;
};

const buildCrumbs = (navigation, pathname) => {
  const dashboardPath = getDashboardPath(navigation);
  const match = getNavigationItemByPath(navigation, pathname);
  const crumbs = [{ label: "Home", to: dashboardPath }];

  if (match && match.item.path !== dashboardPath) {
    crumbs.push({ label: match.item.label });
  }

  return crumbs;
};

const AppShell = ({ navigation, user, onLogout, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const crumbs = useMemo(
    () => buildCrumbs(navigation, pathname),
    [navigation, pathname]
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AppSidebar
        navigation={navigation}
        user={user}
        onLogout={onLogout}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader
          crumbs={crumbs}
          user={user}
          onLogout={onLogout}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <ContentWrapper>{children}</ContentWrapper>
      </div>
    </div>
  );
};

export default AppShell;

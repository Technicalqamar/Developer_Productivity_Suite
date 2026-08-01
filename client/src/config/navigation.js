export const developerNavigation = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard", path: "/developer/dashboard", icon: "dashboard" },
    ],
  },
  {
    section: "Workspace",
    items: [
      { label: "My Projects", path: "/developer/projects", icon: "projects" },
      { label: "My Templates", path: "/developer/templates", icon: "templates" },
      { label: "Tools", path: "/developer/tools", icon: "tools" },
    ],
  },
  {
    section: "Account",
    items: [
      { label: "Profile", path: "/developer/profile", icon: "profile" },
      { label: "Settings", path: "/developer/settings", icon: "settings" },
    ],
  },
];

export const adminNavigation = [
  {
    section: "Overview",
    items: [{ label: "Dashboard", path: "/admin/dashboard", icon: "dashboard" }],
  },
  {
    section: "Management",
    items: [
      { label: "Tool Management", path: "/admin/tools", icon: "tools" },
      { label: "Developers", path: "/admin/developers", icon: "users" },
      { label: "Projects", path: "/admin/projects", icon: "projects" },
    ],
  },
  {
    section: "Insights",
    items: [{ label: "Analytics", path: "/admin/analytics", icon: "analytics" }],
  },
  {
    section: "Account",
    items: [{ label: "Settings", path: "/admin/settings", icon: "settings" }],
  },
];

export const getNavigationForRole = (role) =>
  role === "admin" ? adminNavigation : developerNavigation;

export const getNavigationItemByPath = (navigation, pathname) => {
  for (const group of navigation) {
    const item = group.items.find(
      (candidate) =>
        pathname === candidate.path ||
        pathname.startsWith(`${candidate.path}/`)
    );

    if (item) {
      return { group: group.section, item };
    }
  }

  return null;
};

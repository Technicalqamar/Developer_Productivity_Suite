import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-900">
          Developer Productivity Suite
        </h1>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

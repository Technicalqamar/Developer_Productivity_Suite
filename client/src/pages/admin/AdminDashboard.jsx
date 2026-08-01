import PageContainer from "@/components/ui/PageContainer";
import PageTitle from "@/components/ui/PageTitle";
import Card from "@/components/ui/Card";
import useAuth from "@/hooks/useAuth";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <PageContainer>
      <PageTitle
        title="Dashboard"
        subtitle={`Welcome back, ${user?.fullName ?? "admin"}`}
      />
      <div className="mt-6">
        <Card title="Getting started">
          <p className="text-sm text-gray-500">
            This is your admin dashboard. Sections for tool management,
            developers, projects, analytics and settings will appear here.
          </p>
        </Card>
      </div>
    </PageContainer>
  );
};

export default AdminDashboard;

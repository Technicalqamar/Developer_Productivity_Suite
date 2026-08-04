import PageContainer from "@/components/ui/page-container/PageContainer";
import PageTitle from "@/components/ui/page-title/PageTitle";
import Card from "@/components/ui/card/Card";
import useAuth from "@/hooks/use-auth/useAuth";

const DeveloperDashboard = () => {
  const { user } = useAuth();

  return (
    <PageContainer>
      <PageTitle
        title="Dashboard"
        subtitle={`Welcome back, ${user?.fullName ?? "developer"}`}
      />
      <div className="mt-6">
        <Card title="Getting started">
          <p className="text-sm text-gray-500">
            This is your developer dashboard. Your projects, templates and tools
            will appear here.
          </p>
        </Card>
      </div>
    </PageContainer>
  );
};

export default DeveloperDashboard;

import EmptyState from "@/components/ui/EmptyState";
import PageContainer from "@/components/ui/PageContainer";
import PageTitle from "@/components/ui/PageTitle";

const SectionPlaceholder = ({ title, description }) => {
  return (
    <PageContainer>
      <PageTitle title={title} />
      <div className="mt-6">
        <EmptyState
          icon="tools"
          title={`${title} is coming soon`}
          description={
            description ??
            "This section will be available in an upcoming release."
          }
        />
      </div>
    </PageContainer>
  );
};

export default SectionPlaceholder;

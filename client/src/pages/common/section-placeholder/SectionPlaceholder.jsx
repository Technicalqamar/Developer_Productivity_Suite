import EmptyState from "@/components/ui/empty-state/EmptyState";
import PageContainer from "@/components/ui/page-container/PageContainer";
import PageTitle from "@/components/ui/page-title/PageTitle";

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

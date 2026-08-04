import { Link } from "react-router-dom";
import EmptyState from "@/components/ui/empty-state/EmptyState";
import PageContainer from "@/components/ui/page-container/PageContainer";

const NotFound = () => {
  return (
    <PageContainer>
      <div className="flex min-h-screen items-center justify-center py-16">
        <EmptyState
          icon="alert"
          title="Page not found"
          description="The page you are looking for does not exist or has been moved."
          action={
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Go to Home
            </Link>
          }
        />
      </div>
    </PageContainer>
  );
};

export default NotFound;

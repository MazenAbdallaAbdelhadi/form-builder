import { GetFormById } from "@/actions/forms/form";
import FormLinkShare from "@/components/form-link-share";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import VisitButton from "@/components/visit-button";
import { BookCheck, MousePointerClick, Undo, View } from "lucide-react";

const FormPage = async ({
  params,
}: {
  params: {
    formId: string;
  };
}) => {
  const form = await GetFormById(params.formId);

  if (!form) {
    throw new Error("Form not found");
  }

  const { visits, submissions } = form;
  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitButton shareUrl={form.shareURL} />
        </div>
      </div>

      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <div className="container flex gap-2 items-center justify-between">
            <FormLinkShare shareUrl={form.shareURL} />
          </div>
        </div>
      </div>

      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
        <StatsCard
          title="Total visits"
          icon={<View className="text-blue-600" />}
          helperText="All time visits"
          value={visits.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-blue-600"
        />
        <StatsCard
          title="Total submissions"
          icon={<BookCheck className="text-yellow-600" />}
          helperText="All time form submissions"
          value={submissions.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-yellow-600"
        />
        <StatsCard
          title="Submission rate"
          icon={<MousePointerClick className="text-green-600" />}
          helperText="Visits that result in form submission"
          value={`${submissionRate.toLocaleString()} %` || ""}
          loading={false}
          className="shadow-md shadow-green-600"
        />
        <StatsCard
          title="Bounce rate"
          icon={<Undo className="text-red-600" />}
          helperText="Visits that leaves without interacting"
          value={`${bounceRate.toLocaleString()} %` || ""}
          loading={false}
          className="shadow-md shadow-red-600"
        />
      </div>

      <div className="container pt-10">
        <SubmissionTable id={form.id} />
      </div>
    </>
  );
};

export default FormPage;

interface StatsCardProps {
  title: string;
  icon: React.ReactNode;
  helperText: string;
  value: string;
  loading: boolean;
  className: string;
}

function StatsCard({
  title,
  icon,
  className,
  helperText,
  loading,
  value,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}

function SubmissionTable({ id }: { id: string }) {
  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
    </>
  );
}

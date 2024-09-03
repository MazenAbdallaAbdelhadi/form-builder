import { GetFormContentByUrl } from "@/actions/forms/form";
import { FormElementInstance } from "@/components/form-builder/form-elements";
import FormSubmitComponent from "@/components/form-submit-component";

const SubmitPage = async ({
  params,
}: {
  params: {
    formUrl: string;
  };
}) => {
  const form = await GetFormContentByUrl(params.formUrl);

  if (!form) {
    throw new Error("form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent formUrl={params.formUrl} content={formContent} />;
};

export default SubmitPage;

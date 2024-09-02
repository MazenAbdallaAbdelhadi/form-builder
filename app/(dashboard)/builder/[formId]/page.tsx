import { GetFormById } from "@/actions/forms/form";
import FormBuilder from "@/components/form-builder/form-builder";
import React from "react";

const BuilderPage = async ({
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

  return <FormBuilder form={form} />;
};

export default BuilderPage;

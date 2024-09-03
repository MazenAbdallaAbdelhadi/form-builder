"use client";

import { useCallback, useRef, useState, useTransition } from "react";
import {
  FormElementInstance,
  FormElements,
} from "./form-builder/form-elements";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { SubmitForm } from "@/actions/forms/form";

const FormSubmitComponent = ({
  formUrl,
  content,
}: {
  formUrl: string;
  content: FormElementInstance[];
}) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(Date.now());
  const [submitted, setSubmitted] = useState(false);

  const [loading, startTransition] = useTransition();

  const validateForm = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(Date.now());
      toast.error("Error", {
        description: "Invalid form Fields",
        richColors: true,
      });
      return;
    }

    try {
      const JsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, JsonContent);
      setSubmitted(true);

      toast.success("Success", {
        description: "form submitted",
        richColors: true,
      });
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong",
        richColors: true,
      });
    }
    console.log("FORM VALUES", formValues.current);
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close this page now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
      >
        {content.map((el) => {
          const FormElement = FormElements[el.type].formComponent;

          return (
            <FormElement
              key={el.id}
              elementInstance={el}
              submitValue={submitValue}
              isInvalid={formErrors.current[el.id]}
              defaultValue={formValues.current[el.id]}
            />
          );
        })}

        <Button
          className="mt-8 gap-2"
          disabled={loading}
          onClick={() => {
            startTransition(submitForm);
          }}
        >
          Submit
          {loading && <Loader2 className="size-4 animate-spin" />}
        </Button>
      </div>
    </div>
  );
};

export default FormSubmitComponent;

import { toast } from "sonner";
import { useTransition } from "react";
import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDesigner } from "@/components/providers/designer-provider";
import { UpdateFormContent } from "@/actions/forms/form";

const SaveFormButton = ({ formId }: { formId: string }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(formId, jsonElements);
      toast.success("Success", {
        description: "Your form has been saved ",
        richColors: true,
      });
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong",
        richColors: true,
      });
    }
  };

  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <Save className="size-6" /> Save
      {loading && <Loader2 className="size-5 animate-spin" />}
    </Button>
  );
};

export default SaveFormButton;

import { Button } from "@/components/ui/button";
import { ScanEye } from "lucide-react";

const PreviewDialogButton = () => {
  return (
    <Button variant={"outline"} className="gap-2">
      <ScanEye className="size-6" /> Preview
    </Button>
  );
};

export default PreviewDialogButton;

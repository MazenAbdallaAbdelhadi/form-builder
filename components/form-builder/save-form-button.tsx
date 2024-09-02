import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

const SaveFormButton = () => {
  return (
    <Button variant={"outline"} className="gap-2">
      <Save className="size-6" /> Save
    </Button>
  );
}

export default SaveFormButton
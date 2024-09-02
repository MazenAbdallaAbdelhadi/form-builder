import { Button } from "@/components/ui/button";
import { BookCheck } from "lucide-react";

const PublishFormButton = () => {
  return (
    <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
      <BookCheck className="size-6" /> Publish
    </Button>
  );
};

export default PublishFormButton;

import React from "react";
import { useDesigner } from "../providers/designer-provider";
import { FormElements } from "./form-elements";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { Separator } from "../ui/separator";

const PropertiesFormSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <XIcon className="size-4" />
        </Button>
      </div>

      <Separator className="mb-4" />

      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};

export default PropertiesFormSidebar;

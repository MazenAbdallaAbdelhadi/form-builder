import { Separator } from "../ui/separator";
import { FormElements } from "./form-elements";
import SidebarButtonElement from "./sidebar-button-element";

const FormElementSidebar = () => {
  return (
    <div>
      <p className="text-sm text-foreground/70">Drag and drop elements</p>
      <Separator className="my-2" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Layout elements
        </p>
        <SidebarButtonElement formElement={FormElements.TitledField} />
        <SidebarButtonElement formElement={FormElements.SubTitleField} />
        <SidebarButtonElement formElement={FormElements.ParagraphField} />
        <SidebarButtonElement formElement={FormElements.SeparatorField} />
        <SidebarButtonElement formElement={FormElements.SpacerField} />

        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Form elements
        </p>
        <SidebarButtonElement formElement={FormElements.TextField} />
      </div>
    </div>
  );
};

export default FormElementSidebar;

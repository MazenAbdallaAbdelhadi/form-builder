import { FormElements } from "./form-elements";
import SidebarButtonElement from "./sidebar-button-element";
import { useDesigner } from "../providers/designer-provider";
import FormElementSidebar from "./form-element-sidebar";
import PropertiesFormSidebar from "./properties-form-sidebar";

const DesignerSidebar = () => {
  const { selectedElement } = useDesigner();

  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {!selectedElement && <FormElementSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
};

export default DesignerSidebar;

import { FormElements } from "./form-elements";
import SidebarButtonElement from "./sidebar-button-element";

const FormElementSidebar = () => {
  return (
    <div>
      Elements
      <SidebarButtonElement formElement={FormElements.TextField} />
    </div>
  );
};

export default FormElementSidebar;

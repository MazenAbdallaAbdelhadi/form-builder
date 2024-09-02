"use client";

import { createContext, useContext, useState } from "react";
import { FormElementInstance } from "../form-builder/form-elements";

type DesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
};

const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((ele) => ele.id !== id));
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}

export const useDesigner = () => {
  const context = useContext(DesignerContext);

  if (context === null) {
    throw new Error(`useDesigner must be used in DesignerContext`);
  }

  if (!context) {
    throw new Error(`context is not defined`);
  }

  return context;
};

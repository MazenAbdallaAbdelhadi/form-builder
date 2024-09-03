"use client";

import { Form } from "@prisma/client";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import PreviewDialogButton from "./preview-dialog-button";
import SaveFormButton from "./save-form-button";
import PublishFormButton from "./publish-form-button";
import Designer from "./designer";
import DragOverlayWrapper from "./drag-overlay-wrapper";
import { useDesigner } from "../providers/designer-provider";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const FormBuilder = ({ form }: { form: Form }) => {
  const { setElements } = useDesigner();
  const [isReady, setIsReady] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;

    const elements = JSON.parse(form.content);

    setElements(elements);

    const readyTimeout = setTimeout(() => setIsReady(true), 500);

    return () => {
      clearTimeout(readyTimeout);
    };
  }, [form, setElements]);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Loader2 className="size-12 animate-spin" />
      </div>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!form.published && (
              <>
                <SaveFormButton formId={form.id} />
                <PublishFormButton />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url('/paper.svg')] dark:bg-[url('/paper-dark.svg')]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;

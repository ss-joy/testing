import DragAndDrop from "@/components/dnd-kit/DragAndDrop";
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import React from "react";

const index = () => {
  function handleDragEnd(e: DragEndEvent) {
    console.log("dine");
    console.log(e);
  }
  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <DragAndDrop />
      </DndContext>
    </div>
  );
};

export default index;

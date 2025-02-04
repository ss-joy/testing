import React from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DragAndDrop = () => {
  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id: "drop-1",
  });

  const {
    listeners,
    setNodeRef: setDraggableNodeRef,
    transform,
    attributes,
    isDragging,
  } = useDraggable({
    id: "drag-1",
  });
  //   console.log(transform);

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div>
      {" "}
      <section>
        <div
          ref={setDroppableNodeRef}
          className="droppable size-[300px] bg-yellow-300 rounded-md"
        ></div>
        <div
          style={style}
          ref={setDraggableNodeRef}
          {...listeners}
          {...attributes}
          className={`draggable ${
            isDragging ? " border-2 border-black " : " "
          } rounded-full size-[100px] bg-teal-400`}
        ></div>
      </section>
    </div>
  );
};

export default DragAndDrop;

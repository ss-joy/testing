import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react"; // Corrected import
import { Button } from "@/components/ui/button";

const Index = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "todo",
    },
    {
      id: 2,
      text: "todo 2",
    },
    {
      id: 3,
      text: "todo 3",
    },
    {
      id: 4,
      text: "todo 4",
    },
  ]);
  function addTodo() {
    setTodos((prev) => {
      const nts = prev.map((td) => ({ ...td }));
      nts.push({ id: nts.length, text: `todo ${nts.length}` });
      return nts;
    });
  }
  function removeTodo(id: number) {
    setTodos((prev) => {
      const ntds = prev.filter((tds) => tds.id !== id);
      return ntds;
    });
  }

  return (
    <div>
      <hr />
      <section>
        <motion.h2
          whileHover={{
            backgroundColor: "#008080",
            translateX: "13px",
          }}
          transition={{
            type: "spring",
            bounce: 12,
          }}
        >
          todo list
        </motion.h2>
        <Button onClick={addTodo}>add todo</Button>
        <motion.ol
          animate={{}}
          className="border-2 border-slate-500 rounded-lg mx-auto w-[400px]"
        >
          <AnimatePresence>
            {todos.map((td, index) => {
              return (
                <motion.li
                  className="flex justify-between w-full border border-slate-400 text-white"
                  key={index}
                  initial={{
                    opacity: 0,
                    y: -13,
                    scale: 0.3,
                    backgroundColor: "#000000",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    backgroundColor: "#6a5acd",
                  }}
                  exit={{
                    opacity: 0,
                    y: -13,
                    scale: 0.3,
                    backgroundColor: "#bf2d2d",
                    transition: {
                      duration: 20,
                    },
                  }}
                  transition={{
                    duration: 1,
                  }}
                >
                  {td.text}
                  <button onClick={() => removeTodo(td.id)}>delete</button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ol>
      </section>
    </div>
  );
};

export default Index;

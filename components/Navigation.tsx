import * as React from "react";
import Link from "next/link";

const components: { title: string; href: string }[] = [
  {
    title: "Counter",
    href: "/counters",
  },
  {
    title: "rich",
    href: "/rich",
  },
  {
    title: "DnD kit",
    href: "/drag-and-drop/dnd-kit",
  },
  {
    title: "vanilla form",
    href: "/vanilla-form",
  },
  {
    title: "Framer",
    href: "/framer",
  },
  {
    title: "Posts",
    href: "/posts",
  },
  {
    title: "Audio recorder",
    href: "/audio-recorder",
  },
];

export function NavigationMenuDemo() {
  return (
    <div>
      {components.map((c, id) => {
        return (
          <Link
            key={id}
            href={c.href}
            className="p-3 inline-block bg-teal-300 rounded-md m-2 hover:cursor-pointer"
          >
            {c.title}
          </Link>
        );
      })}
    </div>
  );
}

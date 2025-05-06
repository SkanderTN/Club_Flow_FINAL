import { Guide } from "@/types/Guide";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      target="_blank"
      href={guide.link}
      className=" group flex flex-col gap-2 p-4 rounded-2xl border border-primary"
    >
      <h3 className="font-bold text-lg text-primary">{guide.title}</h3>
      <p className="text-sm text-grey">{guide.description}</p>
      <div className="flex justify-between gap-2">
        <span className="bg-grey/10 px-2 py-1 rounded-lg text-xs text-grey w-fit truncate">
          {guide.pole}
        </span>
        <MoveRight
          strokeWidth={2.5}
          className="text-primary group-hover:translate-x-2 app_transition  "
        />
      </div>
    </Link>
  );
}

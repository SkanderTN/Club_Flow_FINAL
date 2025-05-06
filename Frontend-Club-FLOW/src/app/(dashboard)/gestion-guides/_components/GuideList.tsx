import { Guide } from "@/types/Guide";
import { Link as LinkIcon, Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function GuideList({ guides }: { guides: Guide[] }) {
  return (
    <div className=" w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {guides.map((guide, index) => (
        <Link
          key={index}
          target="_blank"
          href={guide.link}
          className=" flex flex-col gap-2 p-4 rounded-2xl border border-primary"
        >
          <h3 className="font-bold text-lg text-primary">{guide.title}</h3>
          <p className="text-sm text-grey">{guide.description}</p>
          <span className="bg-grey/10 px-2 py-1 rounded-lg text-xs text-grey w-fit truncate">
            {guide.club}
          </span>
          <div className="flex flex-row justify-end gap-2">
            <div className="group bg-red-200 hover:bg-red-500 p-2 rounded-full app_transition">
              <Trash2
                size={18}
                className="text-red-500 group-hover:text-red-100 app_transition  "
              />
            </div>

            <div className="group bg-green-200 hover:bg-green-500 p-2 rounded-full app_transition">
              <LinkIcon
                size={18}
                className="text-green-500 group-hover:text-green-100 app_transition  "
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

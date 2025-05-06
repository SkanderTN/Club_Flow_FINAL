import { Event } from "@/types/Event";
import { Calendar, Clock, MapPin } from "lucide-react";
import React from "react";

export default function EventCard({ event }: { event: Event }) {
  return (
    <div
      key={event.id}
      className="border border-grey rounded-xl p-4 space-y-2"
    >
      <h3 className="text-lg font-medium text-primary">
        <span className="font-bold">{event.type}</span>: {event.title}
      </h3>
      <p className="text-sm text-gray-700">{event.description}</p>

      {event.club && (
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Club :</span> {event.club}
        </p>
      )}

      <div className="flex flex-row gap-2 justify-start items-center">
        <Calendar size={18} className="text-primary" />
        {event.date}
      </div>

      <div className="flex flex-row gap-2 justify-start items-center">
        <Clock size={18} className="text-primary" />
        {event.time}
      </div>

      <div className="flex flex-row gap-2 justify-start items-center">
        <MapPin size={18} className="text-primary" />
        {event.location}
      </div>
    </div>
  );
}

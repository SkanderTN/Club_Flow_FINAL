/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { workshopRequests } from "@/dump";
import { WorkshopRequest } from "@/types/WorkshopRequest";
import { workshopRequests as workshopRequestsList } from "@/dump";

workshopRequests;

const WorkshopRequestTable: React.FC = () => {
  const [workshopRequests, setWorkshopRequests] =
    useState<WorkshopRequest[]>(workshopRequestsList);

  return (
    <>
      {/* Members Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr className="bg-grey/5">
              <th className="px-4 py-2 whitespace-nowrap text-start">
                Nom du Formation
              </th>
              <th className="px-4 py-2 whitespace-nowrap text-start">Raison</th>
              <th className="px-4 py-2 whitespace-nowrap text-start">Membre</th>
              <th className="px-4 py-2 whitespace-nowrap text-start">Date</th>
            </tr>
          </thead>
          <tbody>
            {workshopRequests.map((request) => (
              <tr
                key={request._id}
                className="hover:bg-grey/5 border-b last:border-0"
              >
                <td className="px-4 py-2 text-sm font-medium">
                  {request.title}
                </td>
                <td className="px-4 py-2 text-xs">{request.reason}</td>
                <td className="px-4 py-2 truncate">{request.member}</td>
                <td className="px-4 py-2 text-xs truncate">
                  {request._updatedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WorkshopRequestTable;

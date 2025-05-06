export interface PresenceList {
  _id: string;
  eventId: string;
  attendance: {
    memberId: string;
    status: "Present" | "Absent" | "Justified Absent";
  }[];
}

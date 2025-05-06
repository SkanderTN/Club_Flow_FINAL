export interface Event {
  id: number;
  title: string;
  description: string;
  type: string;
  club?: string;
  date: string;
  time: string;
  location: string;
}

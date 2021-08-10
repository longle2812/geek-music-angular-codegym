export interface Notification {
  id?: number;
  sender?: number;
  recieverId?: number;
  content?: string;
  link?: string;
  status?: boolean;
  createDate?: any;
}

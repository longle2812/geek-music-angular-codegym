export interface Notification {
  id?: number;
  senderId?: number;
  recieverId?: number;
  content?: string;
  link?: string;
  status?: boolean;
  createDate?: any;
}

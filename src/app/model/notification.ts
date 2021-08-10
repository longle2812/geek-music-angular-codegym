export interface Notification {
  id?: number;
  senderId?: number;
  recieverId?: number;
  content?: string;
  link?: string;
  isRead?: boolean;
  createDate?: any;
}

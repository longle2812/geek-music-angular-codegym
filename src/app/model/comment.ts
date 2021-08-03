import {User} from './user';

export interface Comment {
  id?: number;
  createdAt?: string;
  user?: User;
}

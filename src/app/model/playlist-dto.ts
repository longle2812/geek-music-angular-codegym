import {Genre} from './genre';
import {User} from './user';

export interface PlaylistDTO {
  id?: number;
  name?: string;
  description?: string;
  genres?: any;
  user?: any;
  imgUrl?: string;
}

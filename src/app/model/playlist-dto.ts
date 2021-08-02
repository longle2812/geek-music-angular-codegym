import {Genre} from './genre';
import {User} from './user';

export interface PlaylistDTO {
  name?: string;
  description?: string;
  genres?: any;
  user?: any;
}

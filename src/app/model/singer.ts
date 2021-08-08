import {Genres} from './genres';
import {Comment} from './comment';

export interface Singer {
  id?: number;
  name?: string;
  gender?: string;
  genres?: any;
  dateOfBirth?: string;
  biography?: string;
  band?: string;
  popularSong?: string;
  additionalInfo?: string;
  imageUrl?: string;
  user?: any;
}

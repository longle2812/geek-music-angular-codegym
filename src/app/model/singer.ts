import {Genres} from './genres';
import {Comment} from './comment';

export interface Singer {
  id?: number;
  name?: string;
  gender?: string;
  genres?: Genres[];
  dOB?: string;
  biography?: string;
  band?: string;
  popularSong?: string;
  additionalInfo?: string;
  imageUrl?: string;
}

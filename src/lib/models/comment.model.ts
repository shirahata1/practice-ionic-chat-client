import { User } from './user.model';

export interface Comment {
  id?: number;
  body: string;
  user?: User;
}

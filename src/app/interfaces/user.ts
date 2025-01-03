import { Role } from './role';

export interface User {
  id: string;
  name: string;
  email: string;
  about: string;
  role: Role;
}

export const enum LoginFields {
  NAME = 'name',
  ROOM = 'room',
}

export type LoginData = Record<LoginFields, string>;

export const enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface Message {
  id: string;
  message: string;
  user: User;
}

export interface User {
  name: string;
  role: UserRole;
  userId: string;
  room?: string;
}

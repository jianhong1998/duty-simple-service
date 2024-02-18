import { IUser } from './user.type';

export interface IUserCreation extends Omit<IUser, 'id'> {}
export interface IUserCreationResponse extends Omit<IUser, 'password'> {}

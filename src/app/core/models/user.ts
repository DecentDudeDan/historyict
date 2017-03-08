import { permissionType } from './permissionType';

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    permissionLevel: permissionType;
    created: Date;
    lastUpdated: Date;
    deleted: Boolean
}
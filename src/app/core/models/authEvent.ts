import { permissionType } from './permissionType';

export class AuthEvent {
    loggedIn?: boolean;
    permissionLevel?: permissionType;
}
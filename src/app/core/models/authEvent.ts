import { PermissionType } from './permissionType';

export class AuthEvent {
    loggedIn?: boolean;
    permissionLevel?: PermissionType;
}
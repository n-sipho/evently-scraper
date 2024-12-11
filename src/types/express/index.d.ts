import { UserType } from '../user';

declare global {
    namespace Express {
        interface User extends UserType { }
    }
}

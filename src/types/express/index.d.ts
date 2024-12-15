import { User as Person } from "../user";

declare global {
    namespace Express {
        interface User extends Person { }
    }
}


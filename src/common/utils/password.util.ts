import { compareSync } from 'bcrypt';

export class PasswordUtil {
    public static comparePassword({
        password,
        hashedPassword,
    }: {
        password: string;
        hashedPassword: string;
    }): boolean {
        return compareSync(password, hashedPassword);
    }
}

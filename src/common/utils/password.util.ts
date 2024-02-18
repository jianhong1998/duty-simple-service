import { compareSync, hashSync } from 'bcrypt';
import { randomBytes } from 'crypto';

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

    public static generateHashedPassword(passwordLength: number): string {
        const password = this.generateNewPassword(passwordLength);

        return this.encodePassword(password);
    }

    private static generateNewPassword(passwordLength: number): string {
        const charset =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let password = '';
        const randomByteArray = randomBytes(passwordLength);

        for (let i = 0; i < randomByteArray.length; i++) {
            const chosenIndex = randomByteArray[i] % charset.length;
            password += charset[chosenIndex];
        }

        return password;
    }

    private static encodePassword(password: string) {
        return hashSync(password, 10);
    }
}

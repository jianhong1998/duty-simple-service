import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../types/user.type';
import { UserAccountType } from '../enums/user-account-type.type';
import { UserAccountStatus } from '../enums/user-account-status.type';

@Entity('user')
export class UserModel implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 70,
        nullable: false,
        unique: true,
        name: 'email_address',
    })
    emailAddress: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    password: string;

    @Column({
        type: 'enum',
        enum: UserAccountType,
        enumName: 'enum_user_account_type',
        nullable: false,
        name: 'account_type',
    })
    accountType: UserAccountType;

    @Column({
        type: 'enum',
        enum: UserAccountStatus,
        enumName: 'enum_user_account_type',
        name: 'account_status',
    })
    accountStatus: UserAccountStatus;
}

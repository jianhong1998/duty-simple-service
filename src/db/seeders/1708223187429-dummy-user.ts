import { hashSync } from 'bcrypt';
import { UserAccountStatus } from 'src/user/enums/user-account-status.type';
import { UserAccountType } from 'src/user/enums/user-account-type.type';
import { UserModel } from 'src/user/models/user.model';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class User1708223187429 implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const repository = dataSource.getRepository(UserModel);

        await repository.insert([
            {
                emailAddress: 'jianhong1998.work@gmail.com',
                password: hashSync('password', 10),
                accountStatus: UserAccountStatus.ACTIVE,
                accountType: UserAccountType.MANAGER,
            },
            {
                emailAddress: 'user@test.com',
                password: hashSync('password', 10),
                accountStatus: UserAccountStatus.ACTIVE,
                accountType: UserAccountType.SERVICE_CREW,
            },
        ]);

        const userFactory = factoryManager.get(UserModel);

        await userFactory.saveMany(10);
    }
}

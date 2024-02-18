import { hashSync } from 'bcrypt';
import { UserAccountStatus } from 'src/user/enums/user-account-status.type';
import { UserAccountType } from 'src/user/enums/user-account-type.type';
import { UserModel } from 'src/user/models/user.model';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(UserModel, (faker) => {
    const user = new UserModel();

    user.emailAddress = faker.internet.email().toLowerCase();
    user.password = hashSync('password', 10);
    user.accountType = UserAccountType.SERVICE_CREW;
    user.accountStatus = UserAccountStatus.ACTIVE;

    return user;
});

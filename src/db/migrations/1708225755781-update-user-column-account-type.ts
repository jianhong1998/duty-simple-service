import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserColumnAccountType1708225755781
    implements MigrationInterface
{
    name = 'UpdateUserColumnAccountType1708225755781';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."enum_user_account_status" AS ENUM(
                'active',
                'disabled',
                'pending initialise',
                'resetting password'
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "account_status" TYPE "public"."enum_user_account_status" USING "account_status"::"text"::"public"."enum_user_account_status"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "account_status" TYPE "public"."enum_user_account_type" USING "account_status"::"text"::"public"."enum_user_account_type"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."enum_user_account_status"
        `);
    }
}

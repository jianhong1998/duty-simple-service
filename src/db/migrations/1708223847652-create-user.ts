import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1708223847652 implements MigrationInterface {
    name = 'CreateUser1708223847652';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."enum_user_account_type" AS ENUM('manager', 'service crew')
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "email_address" character varying(70) NOT NULL,
                "password" text NOT NULL,
                "account_type" "public"."enum_user_account_type" NOT NULL,
                "account_status" "public"."enum_user_account_type" NOT NULL,
                CONSTRAINT "UQ_a8979f71f59cb66a8b03bde38c1" UNIQUE ("email_address"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."enum_user_account_type"
        `);
    }
}

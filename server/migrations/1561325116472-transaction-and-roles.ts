import {MigrationInterface, QueryRunner} from "typeorm";

export class transaction21561325116472 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TYPE "user_house_role_enum" RENAME TO "user_house_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "user_house_role_enum" AS ENUM('ROLE_OWNER', 'ROLE_CHILD', 'ROLE_GUEST')`);
        await queryRunner.query(`ALTER TABLE "user_house" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_house" ALTER COLUMN "role" TYPE "user_house_role_enum" USING "role"::"text"::"user_house_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user_house" ALTER COLUMN "role" SET DEFAULT 'ROLE_OWNER'`);
        await queryRunner.query(`DROP TYPE "user_house_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TYPE "voucher_role_enum" RENAME TO "voucher_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "voucher_role_enum" AS ENUM('ROLE_OWNER', 'ROLE_CHILD', 'ROLE_GUEST')`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "role" TYPE "voucher_role_enum" USING "role"::"text"::"voucher_role_enum"`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "role" SET DEFAULT 'ROLE_OWNER'`);
        await queryRunner.query(`DROP TYPE "voucher_role_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "voucher_role_enum_old" AS ENUM('ROLE_OWNER', 'ROLE_GUEST')`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "role" TYPE "voucher_role_enum_old" USING "role"::"text"::"voucher_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "role" SET DEFAULT 'ROLE_OWNER'`);
        await queryRunner.query(`DROP TYPE "voucher_role_enum"`);
        await queryRunner.query(`ALTER TYPE "voucher_role_enum_old" RENAME TO "voucher_role_enum"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "createdAt" date NOT NULL DEFAULT CURRENT_DATE`);
        await queryRunner.query(`CREATE TYPE "user_house_role_enum_old" AS ENUM('ROLE_OWNER', 'ROLE_GUEST')`);
        await queryRunner.query(`ALTER TABLE "user_house" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_house" ALTER COLUMN "role" TYPE "user_house_role_enum_old" USING "role"::"text"::"user_house_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user_house" ALTER COLUMN "role" SET DEFAULT 'ROLE_OWNER'`);
        await queryRunner.query(`DROP TYPE "user_house_role_enum"`);
        await queryRunner.query(`ALTER TYPE "user_house_role_enum_old" RENAME TO "user_house_role_enum"`);
    }

}

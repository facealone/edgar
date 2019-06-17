import {MigrationInterface, QueryRunner} from "typeorm";

export class removeVoucherEmail1560783916254 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "voucher" RENAME COLUMN "email" TO "createdAt"`);
        await queryRunner.query(`ALTER TABLE "voucher" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "voucher" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "voucher" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "voucher" ADD "createdAt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "voucher" RENAME COLUMN "createdAt" TO "email"`);
    }

}

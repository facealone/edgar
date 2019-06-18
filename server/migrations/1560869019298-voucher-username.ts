import {MigrationInterface, QueryRunner} from "typeorm";

export class voucherUsername1560869019298 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "voucher" ADD "username" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "voucher" DROP COLUMN "username"`);
    }

}

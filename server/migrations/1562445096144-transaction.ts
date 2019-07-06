import {MigrationInterface, QueryRunner} from "typeorm";

export class transaction1562445096144 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "transaction_type_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "transaction_type_enum" AS ENUM('cash_outlay', 'cash_inflow')`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "type" "transaction_type_enum" NOT NULL DEFAULT 'cash_outlay'`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class apiToken1560023256494 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "apiToken" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "apiToken"`);
    }

}

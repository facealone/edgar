import {MigrationInterface, QueryRunner} from "typeorm";

export class userHouseTimestampable1560715279372 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_house" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_house" DROP COLUMN "createdAt"`);
    }

}

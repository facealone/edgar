import {MigrationInterface, QueryRunner} from "typeorm";

export class cardHouse1561193182457 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "card" ADD "houseId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_e34be3b4f93eb4fd6e48a1a1d79" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_e34be3b4f93eb4fd6e48a1a1d79"`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "houseId"`);
    }

}

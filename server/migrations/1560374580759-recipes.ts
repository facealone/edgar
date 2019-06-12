import {MigrationInterface, QueryRunner} from "typeorm";

export class recipes1560374580759 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "recipe" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "houseId" uuid NOT NULL, "ownerId" uuid NOT NULL, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_d188495c49581d19ee95b1a6c2c" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_847023409bb058bb2cc9a325bd0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_847023409bb058bb2cc9a325bd0"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_d188495c49581d19ee95b1a6c2c"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
    }

}

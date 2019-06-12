import {MigrationInterface, QueryRunner} from "typeorm";

export class recipesUri1560375254592 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "recipe" ADD "uri" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "uri"`);
    }

}

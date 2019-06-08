import {MigrationInterface, QueryRunner} from "typeorm";

export class apiTokenIndice1560023896202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE INDEX "api-token" ON "user" ("apiToken") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "api-token"`);
    }

}

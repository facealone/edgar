import { MigrationInterface, QueryRunner } from 'typeorm';

export class recipesCategory1560541200247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "recipe_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_c1b4e81bf69aa6e8f3a14c4c2f6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe" ADD "categoryId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe" ADD CONSTRAINT "FK_991484dd8189182dafe91e44413" FOREIGN KEY ("categoryId") REFERENCES "recipe_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `INSERT INTO recipe_category (name) VALUES ('Entrées'), ('Plats'), ('Desserts'), ('Autres');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "recipe" DROP CONSTRAINT "FK_991484dd8189182dafe91e44413"`,
    );
    await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "categoryId"`);
    await queryRunner.query(`DROP TABLE "recipe_category"`);
  }
}

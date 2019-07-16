import { MigrationInterface, QueryRunner } from 'typeorm';

export class shoppingList1563283807922 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "shopping_list_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "position" integer NOT NULL DEFAULT 1, CONSTRAINT "PK_e885857d1891ef5ec1a0bef31ad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shopping_list_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "information" character varying, "quantity" integer NOT NULL DEFAULT 1, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" uuid NOT NULL, "shoppingListCategoryId" uuid, "shopId" uuid NOT NULL, CONSTRAINT "PK_49653e92ab95247ceaea6700e2c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shopping_list_suggestion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "shoppingListCategoryId" uuid, CONSTRAINT "PK_adb3c0985531d9316968ef7d20e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_list_item" ADD CONSTRAINT "FK_2008acb82eb4fbc2249533c2fed" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_list_item" ADD CONSTRAINT "FK_c5ac0eebf4a370f72952ccf64b0" FOREIGN KEY ("shoppingListCategoryId") REFERENCES "shopping_list_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_list_item" ADD CONSTRAINT "FK_814e59237cb506ba75bd10dcfe8" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_list_suggestion" ADD CONSTRAINT "FK_821b66d87f678df676e0ec6f19b" FOREIGN KEY ("shoppingListCategoryId") REFERENCES "shopping_list_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "shopping_list_suggestion" DROP CONSTRAINT "FK_821b66d87f678df676e0ec6f19b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_list_item" DROP CONSTRAINT "FK_814e59237cb506ba75bd10dcfe8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_list_item" DROP CONSTRAINT "FK_c5ac0eebf4a370f72952ccf64b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_list_item" DROP CONSTRAINT "FK_2008acb82eb4fbc2249533c2fed"`,
    );
    await queryRunner.query(`DROP TABLE "shopping_list_suggestion"`);
    await queryRunner.query(`DROP TABLE "shopping_list_item"`);
    await queryRunner.query(`DROP TABLE "shopping_list_category"`);
  }
}

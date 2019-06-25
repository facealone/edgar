import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1561468890793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TYPE "user_house_role_enum" AS ENUM('ROLE_OWNER', 'ROLE_CHILD', 'ROLE_GUEST')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_house" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "user_house_role_enum" NOT NULL DEFAULT 'ROLE_OWNER', "emailNotification" boolean NOT NULL DEFAULT true, "pushNotification" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "houseId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_377ac48e9144269163aaeeba389" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "house" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_8c9220195fd0a289745855fe908" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "pushNotificationToken" text, "apiToken" text, "password" character varying NOT NULL, "currentHouseId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "api-token" ON "user" ("apiToken") `);
    await queryRunner.query(
      `CREATE TABLE "budget" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "amount" integer NOT NULL DEFAULT 0, "shared" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" uuid NOT NULL, "houseId" uuid NOT NULL, CONSTRAINT "PK_9af87bcfd2de21bd9630dddaa0e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_abbe63b71ee4193f61c322ab497" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "transaction_type_enum" AS ENUM('cash_outlay', 'cash_inflow')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "note" character varying, "amount" integer NOT NULL DEFAULT 0, "type" "transaction_type_enum" NOT NULL DEFAULT 'cash_outlay', "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" uuid NOT NULL, "budgetId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "barCode" character varying NOT NULL, "userId" uuid NOT NULL, "houseId" uuid NOT NULL, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "voucher_role_enum" AS ENUM('ROLE_OWNER', 'ROLE_CHILD', 'ROLE_GUEST')`,
    );
    await queryRunner.query(
      `CREATE TABLE "voucher" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "username" character varying NOT NULL, "role" "voucher_role_enum" NOT NULL DEFAULT 'ROLE_OWNER', "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "houseId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_677ae75f380e81c2f103a57ffaf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipe_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_c1b4e81bf69aa6e8f3a14c4c2f6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipe" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "uri" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "houseId" uuid NOT NULL, "ownerId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shop" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "houseId" uuid NOT NULL, "ownerId" uuid NOT NULL, CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "house_user_houses_user_house" ("houseId" uuid NOT NULL, "userHouseId" uuid NOT NULL, CONSTRAINT "PK_e1606a92832315afe18c00dabdc" PRIMARY KEY ("houseId", "userHouseId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fc60b3741e6ff88dc671e4526e" ON "house_user_houses_user_house" ("houseId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8179cb5f171c034e2212228fdb" ON "house_user_houses_user_house" ("userHouseId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_user_houses_user_house" ("userId" uuid NOT NULL, "userHouseId" uuid NOT NULL, CONSTRAINT "PK_129e954b62efffe7b4aaee0774c" PRIMARY KEY ("userId", "userHouseId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c40cbf354a77e5efeb313c4501" ON "user_user_houses_user_house" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_13dfd9b38a999af26515d7de23" ON "user_user_houses_user_house" ("userHouseId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_house" ADD CONSTRAINT "FK_db876abe7acfa9c963593a96d50" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_house" ADD CONSTRAINT "FK_782c389a1831c1ccf38e4453acb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_9193429e70a5168bbbeb54c1e69" FOREIGN KEY ("currentHouseId") REFERENCES "house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "budget" ADD CONSTRAINT "FK_8ed65c868c97a5fb471d85efb01" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "budget" ADD CONSTRAINT "FK_e6e065c4bcff6d9353f60e312f0" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_6710c0ffac783e02b960c24bb61" FOREIGN KEY ("budgetId") REFERENCES "budget"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_d3951864751c5812e70d033978d" FOREIGN KEY ("categoryId") REFERENCES "transaction_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_77d7cc9d95dccd574d71ba221b0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_e34be3b4f93eb4fd6e48a1a1d79" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "voucher" ADD CONSTRAINT "FK_956ccbb4a7127de91aaf131ea88" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "voucher" ADD CONSTRAINT "FK_80a57d757e0be8225f261c7994f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe" ADD CONSTRAINT "FK_d188495c49581d19ee95b1a6c2c" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe" ADD CONSTRAINT "FK_847023409bb058bb2cc9a325bd0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe" ADD CONSTRAINT "FK_991484dd8189182dafe91e44413" FOREIGN KEY ("categoryId") REFERENCES "recipe_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" ADD CONSTRAINT "FK_21ba2c53a6ce3158481286204a0" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" ADD CONSTRAINT "FK_28fb7269a26c4e112e151e46f50" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "house_user_houses_user_house" ADD CONSTRAINT "FK_fc60b3741e6ff88dc671e4526ed" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "house_user_houses_user_house" ADD CONSTRAINT "FK_8179cb5f171c034e2212228fdbc" FOREIGN KEY ("userHouseId") REFERENCES "user_house"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_user_houses_user_house" ADD CONSTRAINT "FK_c40cbf354a77e5efeb313c45019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_user_houses_user_house" ADD CONSTRAINT "FK_13dfd9b38a999af26515d7de23a" FOREIGN KEY ("userHouseId") REFERENCES "user_house"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `INSERT INTO transaction_category (name) VALUES ('Alimentation / Supermarché'), ('Habillement / Chaussures'), ('Animaux'), ('Internet / TV / Téléphone'), ('Sports / Loisirs / Culture'), ('Education'), ('Enfants'), ('Impôts'), ('Transports'), ('Restauration / Hôtel'), ('Santé'), ('Logement / immobilier'), ('Services'), ('Autres');`,
    );
    await queryRunner.query(
      `INSERT INTO recipe_category (name) VALUES ('Entrées'), ('Plats'), ('Desserts'), ('Accompagnements'), ('Végétarien'), ('Brunch et Ptit Dej'), ('Autres');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user_user_houses_user_house" DROP CONSTRAINT "FK_13dfd9b38a999af26515d7de23a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_user_houses_user_house" DROP CONSTRAINT "FK_c40cbf354a77e5efeb313c45019"`,
    );
    await queryRunner.query(
      `ALTER TABLE "house_user_houses_user_house" DROP CONSTRAINT "FK_8179cb5f171c034e2212228fdbc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "house_user_houses_user_house" DROP CONSTRAINT "FK_fc60b3741e6ff88dc671e4526ed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" DROP CONSTRAINT "FK_28fb7269a26c4e112e151e46f50"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" DROP CONSTRAINT "FK_21ba2c53a6ce3158481286204a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe" DROP CONSTRAINT "FK_991484dd8189182dafe91e44413"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe" DROP CONSTRAINT "FK_847023409bb058bb2cc9a325bd0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe" DROP CONSTRAINT "FK_d188495c49581d19ee95b1a6c2c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "voucher" DROP CONSTRAINT "FK_80a57d757e0be8225f261c7994f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "voucher" DROP CONSTRAINT "FK_956ccbb4a7127de91aaf131ea88"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_e34be3b4f93eb4fd6e48a1a1d79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_77d7cc9d95dccd574d71ba221b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_d3951864751c5812e70d033978d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_6710c0ffac783e02b960c24bb61"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "budget" DROP CONSTRAINT "FK_e6e065c4bcff6d9353f60e312f0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "budget" DROP CONSTRAINT "FK_8ed65c868c97a5fb471d85efb01"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_9193429e70a5168bbbeb54c1e69"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_house" DROP CONSTRAINT "FK_782c389a1831c1ccf38e4453acb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_house" DROP CONSTRAINT "FK_db876abe7acfa9c963593a96d50"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_13dfd9b38a999af26515d7de23"`);
    await queryRunner.query(`DROP INDEX "IDX_c40cbf354a77e5efeb313c4501"`);
    await queryRunner.query(`DROP TABLE "user_user_houses_user_house"`);
    await queryRunner.query(`DROP INDEX "IDX_8179cb5f171c034e2212228fdb"`);
    await queryRunner.query(`DROP INDEX "IDX_fc60b3741e6ff88dc671e4526e"`);
    await queryRunner.query(`DROP TABLE "house_user_houses_user_house"`);
    await queryRunner.query(`DROP TABLE "shop"`);
    await queryRunner.query(`DROP TABLE "recipe"`);
    await queryRunner.query(`DROP TABLE "recipe_category"`);
    await queryRunner.query(`DROP TABLE "voucher"`);
    await queryRunner.query(`DROP TYPE "voucher_role_enum"`);
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(`DROP TABLE "transaction"`);
    await queryRunner.query(`DROP TYPE "transaction_type_enum"`);
    await queryRunner.query(`DROP TABLE "transaction_category"`);
    await queryRunner.query(`DROP TABLE "budget"`);
    await queryRunner.query(`DROP INDEX "api-token"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "house"`);
    await queryRunner.query(`DROP TABLE "user_house"`);
    await queryRunner.query(`DROP TYPE "user_house_role_enum"`);
  }
}

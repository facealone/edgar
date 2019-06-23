import { MigrationInterface, QueryRunner } from 'typeorm';

export class transaction1561312656872 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "transaction_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "icon" character varying, CONSTRAINT "PK_abbe63b71ee4193f61c322ab497" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "transaction_type_enum" AS ENUM('cash_outlay', 'cash_inflow')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "note" character varying, "amount" money NOT NULL DEFAULT 0, "type" "transaction_type_enum" NOT NULL DEFAULT 'cash_outlay', "createdAt" date NOT NULL DEFAULT CURRENT_DATE, "userId" uuid NOT NULL, "houseId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_62ee007543534a5e1b090074270" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_d3951864751c5812e70d033978d" FOREIGN KEY ("categoryId") REFERENCES "transaction_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `INSERT INTO transaction_category (name) VALUES ('Alimentation / Supermarché'), ('Habillement / Chaussures'), ('Animaux'), ('Internet / TV / Téléphone'), ('Sports / Loisirs / Culture'), ('Education'), ('Enfants'), ('Impôts'), ('Transports'), ('Restauration / Hôtel'), ('Santé'), ('Logement / immobilier'), ('Services'), ('Autres');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_d3951864751c5812e70d033978d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_62ee007543534a5e1b090074270"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`,
    );
    await queryRunner.query(`DROP TABLE "transaction"`);
    await queryRunner.query(`DROP TYPE "transaction_type_enum"`);
    await queryRunner.query(`DROP TABLE "transaction_category"`);
  }
}

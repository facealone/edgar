import {MigrationInterface, QueryRunner} from "typeorm";

export class init1554025857638 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "pushNotificationToken" text NOT NULL, "password" character varying NOT NULL, "currentHouseId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_house_role_enum" AS ENUM('ROLE_OWNER', 'ROLE_GUEST')`);
        await queryRunner.query(`CREATE TABLE "user_house" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "user_house_role_enum" NOT NULL DEFAULT 'ROLE_GUEST', "emailNotification" boolean NOT NULL DEFAULT true, "pushNotification" boolean NOT NULL DEFAULT true, "houseId" uuid, "userId" uuid, CONSTRAINT "PK_377ac48e9144269163aaeeba389" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "house" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_8c9220195fd0a289745855fe908" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "voucher_role_enum" AS ENUM('ROLE_OWNER', 'ROLE_GUEST')`);
        await queryRunner.query(`CREATE TABLE "voucher" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "email" character varying NOT NULL, "role" "voucher_role_enum" NOT NULL DEFAULT 'ROLE_GUEST', "houseId" uuid, "userId" uuid, CONSTRAINT "PK_677ae75f380e81c2f103a57ffaf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_user_houses_user_house" ("userId" uuid NOT NULL, "userHouseId" uuid NOT NULL, CONSTRAINT "PK_129e954b62efffe7b4aaee0774c" PRIMARY KEY ("userId", "userHouseId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c40cbf354a77e5efeb313c4501" ON "user_user_houses_user_house" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_13dfd9b38a999af26515d7de23" ON "user_user_houses_user_house" ("userHouseId") `);
        await queryRunner.query(`CREATE TABLE "house_user_houses_user_house" ("houseId" uuid NOT NULL, "userHouseId" uuid NOT NULL, CONSTRAINT "PK_e1606a92832315afe18c00dabdc" PRIMARY KEY ("houseId", "userHouseId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fc60b3741e6ff88dc671e4526e" ON "house_user_houses_user_house" ("houseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8179cb5f171c034e2212228fdb" ON "house_user_houses_user_house" ("userHouseId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9193429e70a5168bbbeb54c1e69" FOREIGN KEY ("currentHouseId") REFERENCES "house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_house" ADD CONSTRAINT "FK_db876abe7acfa9c963593a96d50" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_house" ADD CONSTRAINT "FK_782c389a1831c1ccf38e4453acb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "voucher" ADD CONSTRAINT "FK_956ccbb4a7127de91aaf131ea88" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "voucher" ADD CONSTRAINT "FK_80a57d757e0be8225f261c7994f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_user_houses_user_house" ADD CONSTRAINT "FK_c40cbf354a77e5efeb313c45019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_user_houses_user_house" ADD CONSTRAINT "FK_13dfd9b38a999af26515d7de23a" FOREIGN KEY ("userHouseId") REFERENCES "user_house"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "house_user_houses_user_house" ADD CONSTRAINT "FK_fc60b3741e6ff88dc671e4526ed" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "house_user_houses_user_house" ADD CONSTRAINT "FK_8179cb5f171c034e2212228fdbc" FOREIGN KEY ("userHouseId") REFERENCES "user_house"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "house_user_houses_user_house" DROP CONSTRAINT "FK_8179cb5f171c034e2212228fdbc"`);
        await queryRunner.query(`ALTER TABLE "house_user_houses_user_house" DROP CONSTRAINT "FK_fc60b3741e6ff88dc671e4526ed"`);
        await queryRunner.query(`ALTER TABLE "user_user_houses_user_house" DROP CONSTRAINT "FK_13dfd9b38a999af26515d7de23a"`);
        await queryRunner.query(`ALTER TABLE "user_user_houses_user_house" DROP CONSTRAINT "FK_c40cbf354a77e5efeb313c45019"`);
        await queryRunner.query(`ALTER TABLE "voucher" DROP CONSTRAINT "FK_80a57d757e0be8225f261c7994f"`);
        await queryRunner.query(`ALTER TABLE "voucher" DROP CONSTRAINT "FK_956ccbb4a7127de91aaf131ea88"`);
        await queryRunner.query(`ALTER TABLE "user_house" DROP CONSTRAINT "FK_782c389a1831c1ccf38e4453acb"`);
        await queryRunner.query(`ALTER TABLE "user_house" DROP CONSTRAINT "FK_db876abe7acfa9c963593a96d50"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9193429e70a5168bbbeb54c1e69"`);
        await queryRunner.query(`DROP INDEX "IDX_8179cb5f171c034e2212228fdb"`);
        await queryRunner.query(`DROP INDEX "IDX_fc60b3741e6ff88dc671e4526e"`);
        await queryRunner.query(`DROP TABLE "house_user_houses_user_house"`);
        await queryRunner.query(`DROP INDEX "IDX_13dfd9b38a999af26515d7de23"`);
        await queryRunner.query(`DROP INDEX "IDX_c40cbf354a77e5efeb313c4501"`);
        await queryRunner.query(`DROP TABLE "user_user_houses_user_house"`);
        await queryRunner.query(`DROP TABLE "voucher"`);
        await queryRunner.query(`DROP TYPE "voucher_role_enum"`);
        await queryRunner.query(`DROP TABLE "house"`);
        await queryRunner.query(`DROP TABLE "user_house"`);
        await queryRunner.query(`DROP TYPE "user_house_role_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class shop1557068145348 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "shop" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "houseId" uuid NOT NULL, "ownerId" uuid NOT NULL, CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pushNotificationToken" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_house" DROP CONSTRAINT "FK_db876abe7acfa9c963593a96d50"`);
        await queryRunner.query(`ALTER TABLE "user_house" DROP CONSTRAINT "FK_782c389a1831c1ccf38e4453acb"`);
        await queryRunner.query(`ALTER TABLE "user_house" ALTER COLUMN "role" SET DEFAULT 'ROLE_OWNER'`);
        await queryRunner.query(`ALTER TABLE "user_house" ALTER COLUMN "houseId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_house" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "voucher" DROP CONSTRAINT "FK_956ccbb4a7127de91aaf131ea88"`);
        await queryRunner.query(`ALTER TABLE "voucher" DROP CONSTRAINT "FK_80a57d757e0be8225f261c7994f"`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "role" SET DEFAULT 'ROLE_OWNER'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "houseId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_house" ADD CONSTRAINT "FK_db876abe7acfa9c963593a96d50" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_house" ADD CONSTRAINT "FK_782c389a1831c1ccf38e4453acb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "voucher" ADD CONSTRAINT "FK_956ccbb4a7127de91aaf131ea88" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "voucher" ADD CONSTRAINT "FK_80a57d757e0be8225f261c7994f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "FK_21ba2c53a6ce3158481286204a0" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "FK_28fb7269a26c4e112e151e46f50" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_28fb7269a26c4e112e151e46f50"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_21ba2c53a6ce3158481286204a0"`);
        await queryRunner.query(`ALTER TABLE "voucher" DROP CONSTRAINT "FK_80a57d757e0be8225f261c7994f"`);
        await queryRunner.query(`ALTER TABLE "voucher" DROP CONSTRAINT "FK_956ccbb4a7127de91aaf131ea88"`);
        await queryRunner.query(`ALTER TABLE "user_house" DROP CONSTRAINT "FK_782c389a1831c1ccf38e4453acb"`);
        await queryRunner.query(`ALTER TABLE "user_house" DROP CONSTRAINT "FK_db876abe7acfa9c963593a96d50"`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "houseId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "role" SET DEFAULT 'ROLE_GUEST'`);
        await queryRunner.query(`ALTER TABLE "voucher" ADD CONSTRAINT "FK_80a57d757e0be8225f261c7994f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "voucher" ADD CONSTRAINT "FK_956ccbb4a7127de91aaf131ea88" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_house" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_house" ALTER COLUMN "houseId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_house" ALTER COLUMN "role" SET DEFAULT 'ROLE_GUEST'`);
        await queryRunner.query(`ALTER TABLE "user_house" ADD CONSTRAINT "FK_782c389a1831c1ccf38e4453acb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_house" ADD CONSTRAINT "FK_db876abe7acfa9c963593a96d50" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pushNotificationToken" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "shop"`);
    }

}

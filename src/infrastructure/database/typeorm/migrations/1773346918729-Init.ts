import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1773346918729 implements MigrationInterface {
    name = 'Init1773346918729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_607de52438268ab19a406349427" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_607de52438268ab19a406349427"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1773286428565 implements MigrationInterface {
    name = 'Init1773286428565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "ownerId" uuid NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "ownerId"`);
    }

}

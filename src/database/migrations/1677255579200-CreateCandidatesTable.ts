import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCandidatesTable1677255579200 implements MigrationInterface {
    name = 'CreateCandidatesTable1677255579200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "candidates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_140681296bf033ab1eb95288abb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "candidates"`);
    }

}

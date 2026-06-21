import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserLocation1782049892869 implements MigrationInterface {
    name = 'addUserLocation1782049892869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`trips\` ADD \`userLocationId\` varchar(26) NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_8534a5e8426afe4a77593d7ad0\` ON \`trips\` (\`userLocationId\`)`);
        await queryRunner.query(`ALTER TABLE \`trips\` ADD CONSTRAINT \`FK_8534a5e8426afe4a77593d7ad08\` FOREIGN KEY (\`userLocationId\`) REFERENCES \`cities\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`trips\` DROP FOREIGN KEY \`FK_8534a5e8426afe4a77593d7ad08\``);
        await queryRunner.query(`DROP INDEX \`IDX_8534a5e8426afe4a77593d7ad0\` ON \`trips\``);
        await queryRunner.query(`ALTER TABLE \`trips\` DROP COLUMN \`userLocationId\``);
    }
}

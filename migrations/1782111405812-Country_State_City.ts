import { MigrationInterface, QueryRunner } from "typeorm";

export class countryStateCity1782111405812 implements MigrationInterface {
    name = 'countryStateCity1782111405812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE FULLTEXT INDEX \`IDX_fa1376321185575cf2226b1491\` ON \`countries\` (\`name\`)`);
        await queryRunner.query(`CREATE FULLTEXT INDEX \`IDX_fe52f02449eaf27be2b2cb7acd\` ON \`states\` (\`name\`)`);
        await queryRunner.query(`CREATE FULLTEXT INDEX \`IDX_a0ae8d83b7d32359578c486e7f\` ON \`cities\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a0ae8d83b7d32359578c486e7f\` ON \`cities\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe52f02449eaf27be2b2cb7acd\` ON \`states\``);
        await queryRunner.query(`DROP INDEX \`IDX_fa1376321185575cf2226b1491\` ON \`countries\``);
    }
}

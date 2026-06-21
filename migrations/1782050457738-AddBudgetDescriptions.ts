import { MigrationInterface, QueryRunner } from 'typeorm'

export class addBudgetDescriptions1782050457738 implements MigrationInterface {
    name = 'addBudgetDescriptions1782050457738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`budget_estimations\` ADD \`flightsDescription\` text NULL`)
        await queryRunner.query(`ALTER TABLE \`budget_estimations\` ADD \`accommodationDescription\` text NULL`)
        await queryRunner.query(`ALTER TABLE \`budget_estimations\` ADD \`foodDescription\` text NULL`)
        await queryRunner.query(`ALTER TABLE \`budget_estimations\` ADD \`activitiesDescription\` text NULL`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`budget_estimations\` DROP COLUMN \`activitiesDescription\``)
        await queryRunner.query(`ALTER TABLE \`budget_estimations\` DROP COLUMN \`foodDescription\``)
        await queryRunner.query(`ALTER TABLE \`budget_estimations\` DROP COLUMN \`accommodationDescription\``)
        await queryRunner.query(`ALTER TABLE \`budget_estimations\` DROP COLUMN \`flightsDescription\``)
    }
}

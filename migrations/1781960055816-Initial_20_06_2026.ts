import { MigrationInterface, QueryRunner } from "typeorm";

export class initial_20_06_20261781960055816 implements MigrationInterface {
    name = 'initial_20_06_20261781960055816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`name\` varchar(255) NOT NULL, PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(26) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`phone\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`dateOfBirth\` date NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`currencies\` (\`id\` varchar(26) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`code\` varchar(3) NOT NULL, \`name\` varchar(255) NOT NULL, \`symbol\` varchar(10) NOT NULL, UNIQUE INDEX \`IDX_9f8d0972aeeb5a2277e40332d2\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`countries\` (\`id\` varchar(26) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`code\` varchar(2) NOT NULL, UNIQUE INDEX \`IDX_b47cbb5311bad9c9ae17b8c1ed\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`states\` (\`id\` varchar(26) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NULL, \`countryId\` varchar(26) NOT NULL, INDEX \`IDX_76ac7edf8f44e80dff569db732\` (\`countryId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cities\` (\`id\` varchar(26) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`stateId\` varchar(26) NULL, \`countryId\` varchar(26) NOT NULL, INDEX \`IDX_ded8a17cd090922d5bac8a2361\` (\`stateId\`), INDEX \`IDX_b5f9bef6e3609b50aac3e103ab\` (\`countryId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`trips\` (\`id\` varchar(26) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`numberOfDays\` int NOT NULL, \`budgetType\` enum ('low', 'medium', 'high') NOT NULL, \`interests\` json NOT NULL, \`status\` enum ('draft', 'generating', 'active', 'archived') NOT NULL DEFAULT 'draft', \`userId\` varchar(26) NOT NULL, \`cityId\` varchar(26) NOT NULL, INDEX \`IDX_db768456df45322f8a74953432\` (\`userId\`), INDEX \`IDX_d8926932b8ea2aa8ea85db56d7\` (\`cityId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`itinerary_days\` (\`id\` varchar(26) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`dayNumber\` int NOT NULL, \`summary\` varchar(255) NULL, \`tripId\` varchar(26) NOT NULL, INDEX \`IDX_ea1a0f3420fd814548aab3a1d3\` (\`tripId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`activities\` (\`id\` varchar(26) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`type\` enum ('food', 'culture', 'adventure', 'shopping', 'sightseeing', 'other') NOT NULL, \`sortOrder\` int NOT NULL, \`isCustom\` tinyint NOT NULL DEFAULT 0, \`itineraryDayId\` varchar(26) NOT NULL, INDEX \`IDX_908de1348a25c16f3ef62283e7\` (\`itineraryDayId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`budget_estimations\` (\`id\` varchar(26) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`flights\` decimal(10,2) NULL, \`accommodation\` decimal(10,2) NULL, \`food\` decimal(10,2) NULL, \`activities\` decimal(10,2) NULL, \`total\` decimal(10,2) NOT NULL, \`tripId\` varchar(26) NOT NULL, \`currencyId\` varchar(26) NOT NULL, INDEX \`IDX_6235d5bffbc89d83675cd1d0cc\` (\`currencyId\`), UNIQUE INDEX \`IDX_40febc8d23ee8888138312c751\` (\`tripId\`), UNIQUE INDEX \`REL_40febc8d23ee8888138312c751\` (\`tripId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hotel_suggestions\` (\`id\` varchar(26) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`category\` enum ('budget', 'mid_range', 'luxury') NOT NULL, \`rating\` decimal(2,1) NULL, \`description\` text NULL, \`sortOrder\` int NOT NULL, \`tripId\` varchar(26) NOT NULL, INDEX \`IDX_7a40dbef6622afb69cf17d4e14\` (\`tripId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_roles_roles\` (\`usersId\` varchar(26) NOT NULL, \`rolesName\` varchar(255) NOT NULL, INDEX \`IDX_df951a64f09865171d2d7a502b\` (\`usersId\`), INDEX \`IDX_9fc16941d812c4d99e9eb6c279\` (\`rolesName\`), PRIMARY KEY (\`usersId\`, \`rolesName\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`states\` ADD CONSTRAINT \`FK_76ac7edf8f44e80dff569db7321\` FOREIGN KEY (\`countryId\`) REFERENCES \`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cities\` ADD CONSTRAINT \`FK_ded8a17cd090922d5bac8a2361f\` FOREIGN KEY (\`stateId\`) REFERENCES \`states\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cities\` ADD CONSTRAINT \`FK_b5f9bef6e3609b50aac3e103ab3\` FOREIGN KEY (\`countryId\`) REFERENCES \`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trips\` ADD CONSTRAINT \`FK_db768456df45322f8a749534322\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trips\` ADD CONSTRAINT \`FK_d8926932b8ea2aa8ea85db56d78\` FOREIGN KEY (\`cityId\`) REFERENCES \`cities\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`itinerary_days\` ADD CONSTRAINT \`FK_ea1a0f3420fd814548aab3a1d39\` FOREIGN KEY (\`tripId\`) REFERENCES \`trips\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activities\` ADD CONSTRAINT \`FK_908de1348a25c16f3ef62283e75\` FOREIGN KEY (\`itineraryDayId\`) REFERENCES \`itinerary_days\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`budget_estimations\` ADD CONSTRAINT \`FK_40febc8d23ee8888138312c7510\` FOREIGN KEY (\`tripId\`) REFERENCES \`trips\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`budget_estimations\` ADD CONSTRAINT \`FK_6235d5bffbc89d83675cd1d0cc9\` FOREIGN KEY (\`currencyId\`) REFERENCES \`currencies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hotel_suggestions\` ADD CONSTRAINT \`FK_7a40dbef6622afb69cf17d4e145\` FOREIGN KEY (\`tripId\`) REFERENCES \`trips\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_roles_roles\` ADD CONSTRAINT \`FK_df951a64f09865171d2d7a502b1\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_roles_roles\` ADD CONSTRAINT \`FK_9fc16941d812c4d99e9eb6c2798\` FOREIGN KEY (\`rolesName\`) REFERENCES \`roles\`(\`name\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_roles_roles\` DROP FOREIGN KEY \`FK_9fc16941d812c4d99e9eb6c2798\``);
        await queryRunner.query(`ALTER TABLE \`users_roles_roles\` DROP FOREIGN KEY \`FK_df951a64f09865171d2d7a502b1\``);
        await queryRunner.query(`ALTER TABLE \`hotel_suggestions\` DROP FOREIGN KEY \`FK_7a40dbef6622afb69cf17d4e145\``);
        await queryRunner.query(`ALTER TABLE \`budget_estimations\` DROP FOREIGN KEY \`FK_6235d5bffbc89d83675cd1d0cc9\``);
        await queryRunner.query(`ALTER TABLE \`budget_estimations\` DROP FOREIGN KEY \`FK_40febc8d23ee8888138312c7510\``);
        await queryRunner.query(`ALTER TABLE \`activities\` DROP FOREIGN KEY \`FK_908de1348a25c16f3ef62283e75\``);
        await queryRunner.query(`ALTER TABLE \`itinerary_days\` DROP FOREIGN KEY \`FK_ea1a0f3420fd814548aab3a1d39\``);
        await queryRunner.query(`ALTER TABLE \`trips\` DROP FOREIGN KEY \`FK_d8926932b8ea2aa8ea85db56d78\``);
        await queryRunner.query(`ALTER TABLE \`trips\` DROP FOREIGN KEY \`FK_db768456df45322f8a749534322\``);
        await queryRunner.query(`ALTER TABLE \`cities\` DROP FOREIGN KEY \`FK_b5f9bef6e3609b50aac3e103ab3\``);
        await queryRunner.query(`ALTER TABLE \`cities\` DROP FOREIGN KEY \`FK_ded8a17cd090922d5bac8a2361f\``);
        await queryRunner.query(`ALTER TABLE \`states\` DROP FOREIGN KEY \`FK_76ac7edf8f44e80dff569db7321\``);
        await queryRunner.query(`DROP INDEX \`IDX_9fc16941d812c4d99e9eb6c279\` ON \`users_roles_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_df951a64f09865171d2d7a502b\` ON \`users_roles_roles\``);
        await queryRunner.query(`DROP TABLE \`users_roles_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_7a40dbef6622afb69cf17d4e14\` ON \`hotel_suggestions\``);
        await queryRunner.query(`DROP TABLE \`hotel_suggestions\``);
        await queryRunner.query(`DROP INDEX \`REL_40febc8d23ee8888138312c751\` ON \`budget_estimations\``);
        await queryRunner.query(`DROP INDEX \`IDX_40febc8d23ee8888138312c751\` ON \`budget_estimations\``);
        await queryRunner.query(`DROP INDEX \`IDX_6235d5bffbc89d83675cd1d0cc\` ON \`budget_estimations\``);
        await queryRunner.query(`DROP TABLE \`budget_estimations\``);
        await queryRunner.query(`DROP INDEX \`IDX_908de1348a25c16f3ef62283e7\` ON \`activities\``);
        await queryRunner.query(`DROP TABLE \`activities\``);
        await queryRunner.query(`DROP INDEX \`IDX_ea1a0f3420fd814548aab3a1d3\` ON \`itinerary_days\``);
        await queryRunner.query(`DROP TABLE \`itinerary_days\``);
        await queryRunner.query(`DROP INDEX \`IDX_d8926932b8ea2aa8ea85db56d7\` ON \`trips\``);
        await queryRunner.query(`DROP INDEX \`IDX_db768456df45322f8a74953432\` ON \`trips\``);
        await queryRunner.query(`DROP TABLE \`trips\``);
        await queryRunner.query(`DROP INDEX \`IDX_b5f9bef6e3609b50aac3e103ab\` ON \`cities\``);
        await queryRunner.query(`DROP INDEX \`IDX_ded8a17cd090922d5bac8a2361\` ON \`cities\``);
        await queryRunner.query(`DROP TABLE \`cities\``);
        await queryRunner.query(`DROP INDEX \`IDX_76ac7edf8f44e80dff569db732\` ON \`states\``);
        await queryRunner.query(`DROP TABLE \`states\``);
        await queryRunner.query(`DROP INDEX \`IDX_b47cbb5311bad9c9ae17b8c1ed\` ON \`countries\``);
        await queryRunner.query(`DROP TABLE \`countries\``);
        await queryRunner.query(`DROP INDEX \`IDX_9f8d0972aeeb5a2277e40332d2\` ON \`currencies\``);
        await queryRunner.query(`DROP TABLE \`currencies\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }
}

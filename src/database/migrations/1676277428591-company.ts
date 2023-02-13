import {MigrationInterface, QueryRunner} from "typeorm";

export class company1676277428591 implements MigrationInterface {
    name = 'company1676277428591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` varchar(255) NULL, \`updatedBy\` varchar(255) NULL, \`deletedBy\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`disabled\` tinyint NOT NULL DEFAULT 0, \`type\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` varchar(255) NULL, \`updatedBy\` varchar(255) NULL, \`deletedBy\` varchar(255) NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`cnic_number\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`profile_picture_url\` varchar(255) NULL, \`force_logout\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`company\``);
    }

}

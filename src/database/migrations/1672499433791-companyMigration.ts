import {MigrationInterface, QueryRunner} from "typeorm";

export class companyMigration1672499433791 implements MigrationInterface {
    name = 'companyMigration1672499433791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`disabled\` tinyint NOT NULL DEFAULT 0, \`type\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` varchar(255) NULL, \`updatedBy\` varchar(255) NULL, \`deletedBy\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`feature\` CHANGE \`updated_by_id\` \`updated_by_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`feature\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`feature\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`feature\` CHANGE \`updated_by_id\` \`updated_by_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`company\``);
    }

}

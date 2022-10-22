import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateInitialTables1666428399746 implements MigrationInterface {
    name = 'CreateInitialTables1666428399746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`country\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`country_code\` int NOT NULL, \`country_phone_digits\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`state\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`country_id\` int NOT NULL, INDEX \`IDX_dd19065b0813dbffd8170ea675\` (\`country_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`city\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`state_id\` int NOT NULL, INDEX \`IDX_37ecd8addf395545dcb0242a59\` (\`state_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`feature\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`disabled\` tinyint NOT NULL DEFAULT 0, \`created_by_id\` int NOT NULL, \`updated_by_id\` int NULL, \`deleted_at\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`feature\``);
        await queryRunner.query(`DROP INDEX \`IDX_37ecd8addf395545dcb0242a59\` ON \`city\``);
        await queryRunner.query(`DROP TABLE \`city\``);
        await queryRunner.query(`DROP INDEX \`IDX_dd19065b0813dbffd8170ea675\` ON \`state\``);
        await queryRunner.query(`DROP TABLE \`state\``);
        await queryRunner.query(`DROP TABLE \`country\``);
    }

}

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Insurers1675400509564 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "insurers",
			columns: [
				{ name: "insurer_id", 	type: "uuid", 		isPrimary: true },
				{ name: "insurer_name",	type: "varchar",	isNullable: false },
			]
		}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("insurers");
    }

}

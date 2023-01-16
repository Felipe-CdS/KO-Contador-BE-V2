import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class TaxTables1673385408538 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.createTable(new Table({
			name: "tax_tables",
			columns: [
				{ name: "table_id", type: "uuid", isPrimary: true },
				{ name: "number_identifier", type: "int" },
				{ name: "tax_name", type: "varchar", isNullable: true },
				{ name: "rows", type: "jsonb" },
				{ name: "repartition_table", type: "jsonb"}
			]
		}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("tax_tables");
    }

}

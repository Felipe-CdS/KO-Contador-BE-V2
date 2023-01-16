import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class TransactionTables1673511974710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "transactions",
			columns: [
				{ name: "transaction_id", type: "uuid", isPrimary: true },
				{ name: "comission_total", type: "numeric" },
				{ name: "iss_total", type: "numeric" },
				{ name: "rbt_12", type: "numeric" },
				{ name: "effective_tax_percentage", type: "numeric" },
				{ name: "repartition_table_iss_percentage", type: "numeric" },
				{ name: "comission_entries", type: "jsonb" },
				{ name: "fk_user_id", type: "uuid" },
				{ name: "fk_tax_id", type: "uuid" },
				{ name: "transaction_date", type: "timestamp", default: "now()" },
			],
			foreignKeys: [
				{
					name: "FKTaxTableConnection",
					referencedTableName: "tax_tables",
					referencedColumnNames: ["table_id"],
					columnNames: ["fk_tax_id"],
					onDelete: "CASCADE",
					onUpdate: "CASCADE"
				},
				{
					name: "FKUserConnection",
					referencedTableName: "users",
					referencedColumnNames: ["user_id"],
					columnNames: ["fk_user_id"],
					onDelete: "CASCADE",
					onUpdate: "CASCADE"
				}
			]
		}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

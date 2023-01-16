import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UserJunctionTables1673512450804 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "users_tax_junction",
			columns: [
				{ name: "junction_id",		type: "uuid", isPrimary: true },
				{ name: "fk_tax_table_id",	type: "uuid"  },
				{ name: "fk_user_id",		type: "uuid"  }
			],
			foreignKeys: [
				{
					name: "FKFullTableConnection",
					referencedTableName: "tax_tables",
					referencedColumnNames: ["table_id"],
					columnNames: ["fk_tax_table_id"],
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
		await queryRunner.dropTable("users_tax_junction");	
    }

}

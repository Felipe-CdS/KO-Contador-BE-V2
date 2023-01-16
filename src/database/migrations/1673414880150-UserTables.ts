import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";
import dotenv from "dotenv";

export class UserTables1673414880150 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

		dotenv.config();

		await queryRunner.createTable(new Table({
			name: "users",
			columns: [
				{ name: "user_id",		type: "uuid",		isPrimary: true },
				{ name: "username",		type: "varchar",	isNullable: false },
				{ name: "password",		type: "varchar",	isNullable: false },
				{ name: "email",		type: "varchar",	isNullable: false },
				{ name: "updated_at",	type: "timestamp",	isNullable: true },
				{ name: "admin",		type: "boolean",	default: false }
			]
		}));

		let hashPassword = await hash(process.env.ADMIN_PASSWORD, 12);

		await queryRunner
				.manager
				.createQueryBuilder()
				.insert()
				.into("users")
				.values(
					{
						user_id: uuid(),
						username: "ADMIN",
						password: hashPassword,
						email: process.env.ADMIN_EMAIL,
						admin: true
					}
				)
				.execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users");		
    }
}

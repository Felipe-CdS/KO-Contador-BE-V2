import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { v4 as uuid } from "uuid";

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

		// let holder = [taxType1, taxType2, taxType3, taxType4, taxType5];

		// for(let i = 0; i < holder.length; i++)
		// {
		// 	let elem = holder[i];

		// 	await queryRunner
		// 		.manager
		// 		.createQueryBuilder()
		// 		.insert()
		// 		.into("tax_tables")
		// 		.values(
		// 			{
		// 				table_id: uuid(),
		// 				...elem
		// 			}
		// 		)
		// 		.execute();
		// }		
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("tax_tables");
    }

}

const taxType1 = {
	number_identifier: 1,
	tax_name: "Anexo 1 – Comércio",
	rows: [
		{ range: 1, min_value: 0,			max_value: 180000,	tax_percentage: 0.06,	discount_value: 0 },
		{ range: 2, min_value: 180000.01,	max_value: 360000,	tax_percentage: 0.112,	discount_value: 9360 },
		{ range: 3, min_value: 360000.01,	max_value: 720000,	tax_percentage: 0.135,	discount_value: 17640 },
		{ range: 4, min_value: 720000.01,	max_value: 1800000,	tax_percentage: 0.16,	discount_value: 35640 },
		{ range: 5, min_value: 1800000.01,	max_value: 3600000,	tax_percentage: 0.21,	discount_value: 125640 },
		{ range: 6, min_value: 3600000.01,	max_value: 4800000,	tax_percentage: 0.33,	discount_value: 648000 }
	],
	repartition_table: [
		{ range: 1, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1282, PIS_PASEP: 0.0278, CPP: 0.4340, ISS: 0.3350 },
		{ range: 2, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1405, PIS_PASEP: 0.0305, CPP: 0.4340, ISS: 0.3200 },
		{ range: 3, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1364, PIS_PASEP: 0.0296, CPP: 0.4340, ISS: 0.3250 },
		{ range: 4, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1364, PIS_PASEP: 0.0296, CPP: 0.4340, ISS: 0.3250 },
		{ range: 5, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1282, PIS_PASEP: 0.0278, CPP: 0.4340, ISS: 0.3350 },
		{ range: 6, IRPJ: 0.35, CSLL: 0.150, COFINS: 0.1603, PIS_PASEP: 0.0346, CPP: 0.3050, ISS: 0.0500 }
	]
}

const taxType2 = {
	number_identifier: 2,
	tax_name: "Anexo 2 – Indústria",
	rows: [
		{ range: 1, min_value: 0,			max_value: 180000,	tax_percentage: 0.06,	discount_value: 0 },
		{ range: 2, min_value: 180000.01,	max_value: 360000,	tax_percentage: 0.112,	discount_value: 9360 },
		{ range: 3, min_value: 360000.01,	max_value: 720000,	tax_percentage: 0.135,	discount_value: 17640 },
		{ range: 4, min_value: 720000.01,	max_value: 1800000,	tax_percentage: 0.16,	discount_value: 35640 },
		{ range: 5, min_value: 1800000.01,	max_value: 3600000,	tax_percentage: 0.21,	discount_value: 125640 },
		{ range: 6, min_value: 3600000.01,	max_value: 4800000,	tax_percentage: 0.33,	discount_value: 648000 }
	],
	repartition_table: [
		{ range: 1, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1282, PIS_PASEP: 0.0278, CPP: 0.4340, ISS: 0.3350 },
		{ range: 2, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1405, PIS_PASEP: 0.0305, CPP: 0.4340, ISS: 0.3200 },
		{ range: 3, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1364, PIS_PASEP: 0.0296, CPP: 0.4340, ISS: 0.3250 },
		{ range: 4, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1364, PIS_PASEP: 0.0296, CPP: 0.4340, ISS: 0.3250 },
		{ range: 5, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1282, PIS_PASEP: 0.0278, CPP: 0.4340, ISS: 0.3350 },
		{ range: 6, IRPJ: 0.35, CSLL: 0.150, COFINS: 0.1603, PIS_PASEP: 0.0346, CPP: 0.3050, ISS: null }
	]
}

const taxType3 = {
	number_identifier: 3,
	tax_name: "Anexo 3 – Prestadores de Serviço",
	rows: [
		{ range: 1, min_value: 0,			max_value: 180000,	tax_percentage: 0.06,	discount_value: 0 },
		{ range: 2, min_value: 180000.01,	max_value: 360000,	tax_percentage: 0.112,	discount_value: 9360 },
		{ range: 3, min_value: 360000.01,	max_value: 720000,	tax_percentage: 0.135,	discount_value: 17640 },
		{ range: 4, min_value: 720000.01,	max_value: 1800000,	tax_percentage: 0.16,	discount_value: 35640 },
		{ range: 5, min_value: 1800000.01,	max_value: 3600000,	tax_percentage: 0.21,	discount_value: 125640 },
		{ range: 6, min_value: 3600000.01,	max_value: 4800000,	tax_percentage: 0.33,	discount_value: 648000 }
	],
	repartition_table: [
		{ range: 1, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1282, PIS_PASEP: 0.0278, CPP: 0.4340, ISS: 0.3350 },
		{ range: 2, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1405, PIS_PASEP: 0.0305, CPP: 0.4340, ISS: 0.3200 },
		{ range: 3, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1364, PIS_PASEP: 0.0296, CPP: 0.4340, ISS: 0.3250 },
		{ range: 4, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1364, PIS_PASEP: 0.0296, CPP: 0.4340, ISS: 0.3250 },
		{ range: 5, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1282, PIS_PASEP: 0.0278, CPP: 0.4340, ISS: 0.3350 },
		{ range: 6, IRPJ: 0.35, CSLL: 0.150, COFINS: 0.1603, PIS_PASEP: 0.0346, CPP: 0.3050, ISS: null }
	]
}

const taxType4 = {
	number_identifier: 4,
	tax_name: "Anexo 4 – Prestadores de Serviço",
	rows: [
		{ range: 1, min_value: 0,			max_value: 180000,	tax_percentage: 0.06,	discount_value: 0 },
		{ range: 2, min_value: 180000.01,	max_value: 360000,	tax_percentage: 0.112,	discount_value: 9360 },
		{ range: 3, min_value: 360000.01,	max_value: 720000,	tax_percentage: 0.135,	discount_value: 17640 },
		{ range: 4, min_value: 720000.01,	max_value: 1800000,	tax_percentage: 0.16,	discount_value: 35640 },
		{ range: 5, min_value: 1800000.01,	max_value: 3600000,	tax_percentage: 0.21,	discount_value: 125640 },
		{ range: 6, min_value: 3600000.01,	max_value: 4800000,	tax_percentage: 0.33,	discount_value: 648000 }
	],
	repartition_table: [
		{ range: 1, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1282, PIS_PASEP: 0.0278, CPP: 0.4340, ISS: 0.3350 },
		{ range: 2, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1405, PIS_PASEP: 0.0305, CPP: 0.4340, ISS: 0.3200 },
		{ range: 3, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1364, PIS_PASEP: 0.0296, CPP: 0.4340, ISS: 0.3250 },
		{ range: 4, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1364, PIS_PASEP: 0.0296, CPP: 0.4340, ISS: 0.3250 },
		{ range: 5, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1282, PIS_PASEP: 0.0278, CPP: 0.4340, ISS: 0.3350 },
		{ range: 6, IRPJ: 0.35, CSLL: 0.150, COFINS: 0.1603, PIS_PASEP: 0.0346, CPP: 0.3050, ISS: null }
	]
}

const taxType5 = {
	number_identifier: 5,
	tax_name: "Anexo 5 – Prestadores de Serviço",
	rows: [
		{ range: 1, min_value: 0,			max_value: 180000,	tax_percentage: 0.06,	discount_value: 0 },
		{ range: 2, min_value: 180000.01,	max_value: 360000,	tax_percentage: 0.112,	discount_value: 9360 },
		{ range: 3, min_value: 360000.01,	max_value: 720000,	tax_percentage: 0.135,	discount_value: 17640 },
		{ range: 4, min_value: 720000.01,	max_value: 1800000,	tax_percentage: 0.16,	discount_value: 35640 },
		{ range: 5, min_value: 1800000.01,	max_value: 3600000,	tax_percentage: 0.21,	discount_value: 125640 },
		{ range: 6, min_value: 3600000.01,	max_value: 4800000,	tax_percentage: 0.33,	discount_value: 648000 }
	],
	repartition_table: [
		{ range: 1, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1282, PIS_PASEP: 0.0278, CPP: 0.4340, ISS: 0.3350 },
		{ range: 2, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1405, PIS_PASEP: 0.0305, CPP: 0.4340, ISS: 0.3200 },
		{ range: 3, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1364, PIS_PASEP: 0.0296, CPP: 0.4340, ISS: 0.3250 },
		{ range: 4, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1364, PIS_PASEP: 0.0296, CPP: 0.4340, ISS: 0.3250 },
		{ range: 5, IRPJ: 0.04, CSLL: 0.035, COFINS: 0.1282, PIS_PASEP: 0.0278, CPP: 0.4340, ISS: 0.3350 },
		{ range: 6, IRPJ: 0.35, CSLL: 0.150, COFINS: 0.1603, PIS_PASEP: 0.0346, CPP: 0.3050, ISS: null }
	]
}
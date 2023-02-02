import { getCustomRepository } from "typeorm";
import { ITaxTable } from "../../entities/TaxTable";
import { TaxTableRepositories } from "../../repositories/TaxTableRepositories";

class EditTaxTableService {

	async execute({ tax_name, number_identifier, rows, repartition_table }: ITaxTable){
		
		const taxTableRepository = getCustomRepository(TaxTableRepositories);

		const editedTaxTable = await taxTableRepository.findOne({ number_identifier });

		if(!editedTaxTable)
			throw new Error("Não existe um anexo com esse identificador.");

		if(!tax_name)
			tax_name = "Tabela sem nome";

		editedTaxTable.tax_name 			= tax_name;
		editedTaxTable.rows				= rows;
		editedTaxTable.repartition_table	= repartition_table;

		await taxTableRepository.save(editedTaxTable);

        return (editedTaxTable);
	}
}

export { EditTaxTableService }
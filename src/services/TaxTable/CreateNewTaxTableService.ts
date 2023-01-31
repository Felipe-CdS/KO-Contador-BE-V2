import { getCustomRepository } from "typeorm";
import { ITaxTable, ITaxRow } from "../../entities/TaxTable";
import { TaxTableRepositories } from "../../repositories/TaxTableRepositories";

class CreateNewTaxTableService {

	async execute({ tax_name, number_identifier, rows, repartition_table }: ITaxTable){
		
		const taxTableRepository = getCustomRepository(TaxTableRepositories);

		const identifierAlreadyExists = await taxTableRepository.findOne({ number_identifier });

		if(identifierAlreadyExists)
			throw new Error("Já existe um anexo com esse número.");

		if(!tax_name)
			tax_name = "Tabela sem nome";

		const newTable = taxTableRepository.create({ tax_name, number_identifier, rows, repartition_table });

		await taxTableRepository.save(newTable);

        return (newTable);
	}
}

export { CreateNewTaxTableService }
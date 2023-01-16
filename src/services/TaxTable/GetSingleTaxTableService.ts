import { getCustomRepository } from "typeorm";
import { TaxTableRepositories } from "../../repositories/TaxTableRepositories";

class GetSingleTaxTableService {

	async execute({  number_identifier }){
				
		const taxTableRepository = getCustomRepository(TaxTableRepositories);

		const taxTable = await taxTableRepository.findOne({ number_identifier });

		if(!taxTable)
			throw new Error("Table doesn't exists...");

        return (taxTable);
	}
}

export { GetSingleTaxTableService }
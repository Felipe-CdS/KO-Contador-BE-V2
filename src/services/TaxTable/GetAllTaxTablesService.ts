import { getCustomRepository } from "typeorm";
import { TaxTableRepositories } from "../../repositories/TaxTableRepositories";

class GetAllTaxTablesService {

	async execute(){
		
		const taxTableRepository = getCustomRepository(TaxTableRepositories);

		var found = await taxTableRepository.find();

        return (found);
	}
}

export { GetAllTaxTablesService }
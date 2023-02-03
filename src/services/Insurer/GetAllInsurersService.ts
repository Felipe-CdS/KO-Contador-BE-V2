import { getCustomRepository } from "typeorm";
import { InsurerRepositories } from "../../repositories/InsurerRepositories";

class GetAllInsurersService {

	async execute(){
		const repository = getCustomRepository(InsurerRepositories);

		const found = await repository.find();

        return (found);
	}
}

export { GetAllInsurersService }
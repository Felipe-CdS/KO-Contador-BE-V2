import { getCustomRepository } from "typeorm";
import { InsurerRepositories } from "../../repositories/InsurerRepositories";

class CreateNewInsurerService {

	async execute(insurer_name: string){
		
		const repository = getCustomRepository(InsurerRepositories);

		if(!insurer_name)
			throw new Error("Por favor insira um nome válido.");

		const identifierAlreadyExists = await repository.findOne({ insurer_name });

		if(identifierAlreadyExists)
			throw new Error("Essa seguradora já está cadastrada.");

		const newInsurer = repository.create({ insurer_name });

		await repository.save(newInsurer);

        return (newInsurer);
	}
}

export { CreateNewInsurerService }
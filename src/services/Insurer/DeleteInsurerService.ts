import { getCustomRepository } from "typeorm";
import { Insurer } from "../../entities/Insurer";
import { InsurerRepositories } from "../../repositories/InsurerRepositories";

class DeleteInsurerService {

	async execute(insurer_name: string){
		
		const repository = getCustomRepository(InsurerRepositories);

		if(!insurer_name)
			throw new Error("Por favor insira um nome válido.");

		const found = await repository.findOne({ insurer_name });

		if(!found)
			throw new Error("Seguradora não existe.");

		await repository.createQueryBuilder()
			.delete()
			.from(Insurer)
			.where("insurer_name = :x", { x: insurer_name })
			.execute();

        return (found);
	}
}

export { DeleteInsurerService }
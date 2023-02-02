import { getCustomRepository } from "typeorm"
import { TaxTableRepositories } from "../../repositories/TaxTableRepositories";
import { TaxUserJunctionRepositories } from "../../repositories/TaxUserJunctionRepositories";
import { UserRepositories } from "../../repositories/UserRepositories";

class AdminGetUserTaxTypesService {
    async execute(user_id: string){
        var taxTypes = [];
        const userRepository		= getCustomRepository(UserRepositories);
        const junctionRepository	= getCustomRepository(TaxUserJunctionRepositories);

        const user = await userRepository.findOne({ username: user_id });

        if(!user)
			throw new Error("Usuário não encontrado.");
        
        const userTaxJunctions = await junctionRepository.find({ fk_user_id: user });

        for(let i = 0; i < userTaxJunctions.length; i++)
            taxTypes.push(userTaxJunctions[i].fk_table_id.number_identifier);

        return(taxTypes);
    }
}

export { AdminGetUserTaxTypesService }
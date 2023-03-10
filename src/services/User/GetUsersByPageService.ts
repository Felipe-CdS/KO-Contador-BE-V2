import { getCustomRepository } from "typeorm"
import { TaxUserJunctionRepositories } from "../../repositories/TaxUserJunctionRepositories";
import { UserRepositories } from "../../repositories/UserRepositories";

class GetUsersByPageService {
    async execute({ page }){
        const userRepository = getCustomRepository(UserRepositories);
		const taxUserJunctionRepository	= getCustomRepository(TaxUserJunctionRepositories);
        var [users, total] = await userRepository.findAndCount({take: 11, skip: ((page - 1) * 11)});
		
		var users = users.filter((e) => {return e.admin == false});

		let responseArray = [];

		for(let i = 0; i < users.length; i++)
		{
			let elem = users[i];
			let elemJunctionsArray = [];
			let allJunctions = await taxUserJunctionRepository.find({fk_user_id: elem});

			for(let j = 0; j < allJunctions.length; j++)
			{
				elemJunctionsArray.push((allJunctions[j].fk_table_id).number_identifier);
			}
			responseArray.push({username: elem.username, email: elem.email, updated_at: elem.updated_at, tax_types: elemJunctionsArray});
		}

        return({users: responseArray, total});
    }
}

export { GetUsersByPageService }
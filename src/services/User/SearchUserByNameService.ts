import { getCustomRepository, Like } from "typeorm"
import { TaxUserJunctionRepositories } from "../../repositories/TaxUserJunctionRepositories";
import { UserRepositories } from "../../repositories/UserRepositories";

class SearchUserByNameService {
    async execute({ search_username }){
        const userRepository = getCustomRepository(UserRepositories);
		const taxUserJunctionRepository	= getCustomRepository(TaxUserJunctionRepositories);
        var users = await userRepository.find({ where: {username: Like(`%${search_username}%`) }});
		
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

        return({users: responseArray });
    }
}

export { SearchUserByNameService }
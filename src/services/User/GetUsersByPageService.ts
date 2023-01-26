import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../../repositories/UserRepositories";

class GetUsersByPageService {
    async execute({ page }){
        const userRepository = getCustomRepository(UserRepositories);
        var [users, total] = await userRepository.findAndCount({take: 11, skip: ((page - 1) * 11)});
		
		var users = users.filter((e) => {return e.admin == false});

        return({users, total});
    }
}

export { GetUsersByPageService }
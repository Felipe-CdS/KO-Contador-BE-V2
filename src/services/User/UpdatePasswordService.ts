import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import { UserRepositories } from "../../repositories/UserRepositories";

class UpdatePasswordService {
    async execute(user_id: string, password: string){
        const userRepository = getCustomRepository(UserRepositories);

        const user = await userRepository.findOne({ user_id });

		if(!password)
			throw new Error("Nova Senha Inválida...");

		user.password = await hash(password, 12);
		await userRepository.save(user);

		return (user);
    }
}

export { UpdatePasswordService }
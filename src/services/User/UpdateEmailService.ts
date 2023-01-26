import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../../repositories/UserRepositories";

class UpdateEmailService {
    async execute(user_id: string, email: string){
        const userRepository = getCustomRepository(UserRepositories);

        const user = await userRepository.findOne({ user_id });

		const duplicate = await userRepository.findOne({ email });

		if(duplicate)
			throw new Error("Esse e-mail já está sendo usado.");

		if(!email)
			throw new Error("Novo e-mail Inválido...");

		user.email = email;
		await userRepository.save(user);

		return (user);
    }
}

export { UpdateEmailService }
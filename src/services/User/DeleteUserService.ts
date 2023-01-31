import { getCustomRepository } from "typeorm";
import { User } from "../../entities/User";
import { UserRepositories } from "../../repositories/UserRepositories";

class DeleteUserService {

	async execute(user_id: string, admin_password: string, deleted_user_username: string){
        const userRepository            = getCustomRepository(UserRepositories);

		if(!admin_password || !deleted_user_username)
			throw new Error("Insira os dados corretamente.");

		const admin = await userRepository.findOne({ user_id });

        if(!admin || !admin.admin)
            throw new Error("Admin não encontrado...");

        const passwordMatch = await User.comparePassword(admin_password, admin.password);

		if(!passwordMatch)
            throw new Error("Senha inválida...");

        const deleted_user = await userRepository.findOne({ username: deleted_user_username });

		if(!deleted_user || deleted_user.admin)
		throw new Error("Usuario não encontrado ou o usuário é um Admin. Nenhuma ação foi feita.");

		await userRepository.createQueryBuilder()
										.delete()
										.from(User)
										.where("username = :x", { x: deleted_user_username })
										.execute();

        return(deleted_user_username);
    }
}

export { DeleteUserService }
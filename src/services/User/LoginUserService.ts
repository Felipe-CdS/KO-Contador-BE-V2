import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { UserRepositories } from "../../repositories/UserRepositories";
import { User } from "../../entities/User";
import { TaxUserJunctionRepositories } from "../../repositories/TaxUserJunctionRepositories";
import { TaxTableRepositories } from "../../repositories/TaxTableRepositories";

interface IAuthRequest {
    email: "string";
    password: "string";
}

class LoginUserService {
    async execute({ email, password }: IAuthRequest){
        const userRepository		= getCustomRepository(UserRepositories);
		const junctionRepository	= getCustomRepository(TaxUserJunctionRepositories);
		const taxTableRepository = getCustomRepository(TaxTableRepositories);

        const user = await userRepository.findOne({ email });

        if(!user)
            throw new Error("Invalid Email/Password!");

        const passwordMatch = await User.comparePassword(password, user.password);

        if(!passwordMatch)
            throw new Error("Invalid Email/Password!");

        const token = sign({ email: user.email }, process.env.HASH_SECRET, { subject: user.user_id, expiresIn: "1d" });

		const userTaxJunctions = await junctionRepository.find({ fk_user_id: user });

		var taxTypes = [];

        for(let i = 0; i < userTaxJunctions.length; i++)
            taxTypes.push(userTaxJunctions[i].fk_table_id.number_identifier);
		
		if(user.admin)
		{
			var holder = [];
			var allTaxTables = await taxTableRepository.find();
			
			allTaxTables.map(elem => {holder.push(elem.number_identifier)});
			return ({token, role: true, username: user.username, taxTypes: holder});
		}
			
		
		return ({token, username: user.username, taxTypes});
    }
}

export { LoginUserService }
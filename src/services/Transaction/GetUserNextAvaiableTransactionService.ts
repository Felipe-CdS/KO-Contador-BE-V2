import { Between, getCustomRepository } from "typeorm";
import { TransactionRepositories } from "../../repositories/TransactionRepositories";
import { UserRepositories } from "../../repositories/UserRepositories";

class GetUserNextAvaiableTransactionService {

	async execute({tax_type, username}){
		const transactionRepository = getCustomRepository(TransactionRepositories);
		const userRepository		= getCustomRepository(UserRepositories);

		const user_id = await userRepository.findOne({ username });

		if(!user_id || !tax_type)
			throw new Error("Usuário ou anexo não encontrado.");

		var ordered = await transactionRepository.find({
			where: { fk_user_id: user_id },
			order: { transaction_date: 'DESC' }
		});

		if(ordered.length == 0)
			return null;

		var mostRecentOnType = null;

		for(let i = 0; i < ordered.length; i++)
		{
			let elem = ordered[i];
			if(elem.fk_tax_id.number_identifier == tax_type)
			{
				mostRecentOnType = elem;
				break;
			}
		}

		if(mostRecentOnType == null)
			return null;

		var mostRecentTxDate = new Date(mostRecentOnType.transaction_date);

		if((mostRecentTxDate.getMonth() != 11))
		{
			if((mostRecentTxDate.getMonth() + 1) < 9)
				var formatMonth = "0" + ((mostRecentTxDate.getMonth() + 2).toString());
			else
				var formatMonth = ((mostRecentTxDate.getMonth() + 2).toString());
			var nextDateAvaiable = new Date(`${mostRecentTxDate.getFullYear()}-${formatMonth}-15T03:24:00`);
		}
		else
			var nextDateAvaiable = new Date(`${mostRecentTxDate.getFullYear() + 1}-01-15T03:24:00`);

		return ({mostRecentOnType, nextDateAvaiable});
	}
}

export { GetUserNextAvaiableTransactionService }
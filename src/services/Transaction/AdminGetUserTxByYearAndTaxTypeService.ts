import { Between, getCustomRepository, LessThan, MoreThan } from "typeorm";
import { TransactionRepositories } from "../../repositories/TransactionRepositories";
import { UserRepositories } from "../../repositories/UserRepositories";

class AdminGetUserTxByYearAndTaxTypeService {

    async execute({ year, tax_type, username }){
        const transactionRepository = getCustomRepository(TransactionRepositories);
		const userRepository		= getCustomRepository(UserRepositories);

		const user_id = await userRepository.findOne({ username });

		if(!user_id)
			throw new Error("Usuário não encontrado");

        var transactions_search = await transactionRepository.find({
				where: { 
					fk_user_id: user_id,
					transaction_date:  Between(`${year}-01-01  00:00:00.00000`, `${year}-12-31  23:59:59.99999`)
				}
		});

		for(let i = (transactions_search.length -1); i >= 0; i--)
		{
			let elem = transactions_search[i];			

			if((elem.fk_tax_id).number_identifier != tax_type)
				transactions_search.splice(i, 1);
		}

		var returnArray = {};

		for(let i = 1; i < 13; i++)
			returnArray[`month_${i}`] = {pending: true, blocked: true};

		(transactions_search).map((elem) => {
			let holder = {
						...elem,
						tax_identifier: elem.fk_tax_id.number_identifier,
						username:		elem.fk_user_id.username
					};
		
					delete holder.fk_tax_id;
					delete holder.fk_user_id;
					delete holder.transaction_id;
					
					let month_number = new Date(holder.transaction_date).getMonth();
					returnArray[`month_${month_number + 1}`] = holder;
		})

        return (returnArray);
    }
}

export { AdminGetUserTxByYearAndTaxTypeService }
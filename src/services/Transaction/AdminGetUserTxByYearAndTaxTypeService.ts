import { getCustomRepository, LessThan, MoreThan } from "typeorm"
import { Transaction } from "../../entities/Transaction";
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
					transaction_date:  MoreThan(`${year}-01-01  00:00:00.00000`)
				},
				take: 12
		});

		for(let i = (transactions_search.length -1); i >= 0; i--)
		{
			let elem = transactions_search[i];			

			if((elem.fk_tax_id).number_identifier != tax_type)
				transactions_search.splice(i, 1);
		}

		var returnArray = {};

		var mostRecentEntry = await transactionRepository.findOne({
			where: { fk_user_id: user_id },
			order: { transaction_date: 'DESC' }
		});

		for(let i = 1; i < 13; i++)
			returnArray[`month_${i}`] = {pending: true, blocked: true};

		
		// if(year == new Date(mostRecentEntry.transaction_date).getFullYear()))


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
		
					if(holder.transaction_date < (new Date(`${year}-12-31  23:59:59.0000`)))
						returnArray[`month_${month_number + 1}`] = holder;
		})


		// for(let i = 0; i < 12; i++){
		// 	if(transactions_search[i])
		// 	{
		// 		let holder = {
		// 			...transactions_search[i],
		// 			tax_identifier: transactions_search[i].fk_tax_id.number_identifier,
		// 			username:		transactions_search[i].fk_user_id.username
		// 		};
	
		// 		delete holder.fk_tax_id;
		// 		delete holder.fk_user_id;
		// 		delete holder.transaction_id;
				
		// 		let month_number = new Date(holder.transaction_date).getMonth();
	
		// 		if(holder.transaction_date < (new Date(`${year}-12-31  23:59:59.0000`)))
		// 			returnArray[`month_${month_number + 1}`] = holder;
		// 	}
		// 	else
		// 		returnArray[`month_${i + 1}`] = {pending: true, blocked: true};
		// }	

        return (returnArray);
    }
}

export { AdminGetUserTxByYearAndTaxTypeService }
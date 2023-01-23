import { getCustomRepository, LessThan, MoreThan } from "typeorm"
import { Transaction } from "../../entities/Transaction";
import { TransactionRepositories } from "../../repositories/TransactionRepositories";
import { UserRepositories } from "../../repositories/UserRepositories";

class GetTransactionsByYearService {

    async execute({ year }, user_id: string): Promise<Transaction[]> {
        const transactionRepository = getCustomRepository(TransactionRepositories);

        var transactions_search = await transactionRepository.find({
				where: { 
					fk_user_id: user_id,
					transaction_date:  MoreThan(`${year}-01-01  00:00:00.00000`)
				},
				take: 12
		});

		var returnArray = [];

		for(let i = 0; i < transactions_search.length; i++){
			let holder = {
				...transactions_search[i],
				tax_identifier: transactions_search[i].fk_tax_id.number_identifier,
				username:		transactions_search[i].fk_user_id.username
			};

			delete holder.fk_tax_id;
			delete holder.fk_user_id;
			delete holder.transaction_id;

			if(holder.transaction_date < (new Date(`${year}-12-31  23:59:59.0000`)))
				returnArray.push(holder);
		}

        return (returnArray);
    }
}

export { GetTransactionsByYearService }
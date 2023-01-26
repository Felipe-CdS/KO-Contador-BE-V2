import { Between, getCustomRepository } from "typeorm";
import { TransactionRepositories } from "../../repositories/TransactionRepositories";


class GetSingleTransactionService{

	async execute({month, year, tax_type}, user_id: string){
		const transactionRepository = getCustomRepository(TransactionRepositories);

        var search = await transactionRepository.find({
				where: { 
					fk_user_id: user_id,
					transaction_date: Between(new Date(year, (month-1), 1), new Date(year, (month-1), 31))
				}
		});

		for(let i = (search.length -1); i >= 0; i--)
		{
			if((search[i].fk_tax_id).number_identifier != tax_type)
				search.splice(i, 1);
		}

		return (search[0]);
	}
}

export { GetSingleTransactionService }
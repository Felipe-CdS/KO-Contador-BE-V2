import { Between, getCustomRepository, LessThan, MoreThan } from "typeorm"
import { Transaction } from "../../entities/Transaction";
import { TransactionRepositories } from "../../repositories/TransactionRepositories";

class GetTxByYearAndTaxTypeService {

    async execute({ year, tax_type }, user_id: string){
        const transactionRepository = getCustomRepository(TransactionRepositories);

        var transactions_search = await transactionRepository.find({
				where: { 
					fk_user_id: user_id,
					transaction_date:  Between(`${year}-01-01  00:00:00.00000`, `${year}-12-31  23:59:59.99999`)
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
		});

        return (returnArray);
    }
}

export { GetTxByYearAndTaxTypeService }
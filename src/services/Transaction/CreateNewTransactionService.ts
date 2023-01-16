import { getCustomRepository } from "typeorm";
import { TaxTable, ITaxRow, IRepartitionTable } from "../../entities/TaxTable";
import { ICommissionEntry } from "../../entities/Transaction";
import { TaxTableRepositories } from "../../repositories/TaxTableRepositories";
import { TransactionRepositories } from "../../repositories/TransactionRepositories";
import { UserRepositories } from "../../repositories/UserRepositories";

class CreateNewTransactionService {

	truncateDecimals = function (number: number, digits: number) {
		var multiplier = Math.pow(10, digits),
			adjustedNum = number * multiplier,
			truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
	
		return truncatedNum / multiplier;
	}

	private async getRBT12(user_id: string, thisMonthTotal: number, transactionRepository: TransactionRepositories): Promise<number>{
		var totalLastYearIncome = 0 as number;

		const userTransactions = await transactionRepository.find({ 
											where: { fk_user_id: user_id }, 
											order: { transaction_date: 'DESC' },
											take: 12
										});

		if(userTransactions.length == 0)
			return (thisMonthTotal * 12);

		if(userTransactions.length < 12)
		{
			userTransactions.map((elem) => { totalLastYearIncome += Number(elem.comission_total) });
			totalLastYearIncome /= userTransactions.length;
			return (this.truncateDecimals((totalLastYearIncome * 12), 2));
		}

		userTransactions.map((elem) => { totalLastYearIncome += Number(elem.comission_total) });		
		return (totalLastYearIncome);
	}

	private getThisMonthEntriesTotal(comission_entries: ICommissionEntry[]) {
		var thisMonthTotal = 0 as number;

		comission_entries.map((elem) => {
			thisMonthTotal += elem.comission_value;
		});

		return (thisMonthTotal);
	}

	private getThisMonthISSTotal(comission_entries: ICommissionEntry[]) {
		var thisMonthTotal = 0 as number;

		comission_entries.map((elem) => {
			thisMonthTotal += elem.iss_value;
		});

		return (thisMonthTotal);
	}

	private async getEffectiveTaxPercentage(taxTable: TaxTable, rbt_12: number){

		var rangeRow = null as ITaxRow;

		(taxTable.rows).map((elem) => {
			if(rbt_12 >= elem.min_value && rbt_12 < elem.max_value)
				rangeRow = elem;
		});

		if(!rangeRow)
			throw new Error("Desculpe, algo deu errado... Aparentemente a sua receita bruta dos ultimos 12 meses ultrapassou o limite de faturamento anual do Simples Nacional. Consulte o seu contador para mais detalhes.");
		
		var effectiveRate = ((rbt_12 * rangeRow.tax_percentage) - rangeRow.discount_value) / rbt_12;

		return (this.truncateDecimals(effectiveRate, 2));		
	}

	private async getRepartitionTablePercentage(taxTable: TaxTable, rbt_12: number){
		var rangeRow = null as ITaxRow;
		var repatitionRange = null as IRepartitionTable;

		(taxTable.rows).map((elem) => {
			if(rbt_12 >= elem.min_value && rbt_12 < elem.max_value)
				rangeRow = elem;
		});

		(taxTable.repartition_table).map((elem) => {
			if(elem.range == rangeRow.range)
				repatitionRange = elem;
		});

		return repatitionRange.ISS;
	}

	async execute({ comission_entries, number_identifier }, user_id: string){
		
		const transactionRepository = getCustomRepository(TransactionRepositories);
		const taxTableRepository 	= getCustomRepository(TaxTableRepositories);
		const userRepository		= getCustomRepository(UserRepositories);

		const user 								= await userRepository.findOne({ user_id });
		const taxTable 							= await taxTableRepository.findOne({ number_identifier });		
		const thisMonthTotal 					= this.getThisMonthEntriesTotal(comission_entries);
		const rbt_12							= await this.getRBT12(user_id, thisMonthTotal, transactionRepository);
		const effective_tax_percentage			= await this.getEffectiveTaxPercentage(taxTable, rbt_12);
		const repartition_table_iss_percentage	= await this.getRepartitionTablePercentage(taxTable, rbt_12);
	
		const tx = {
			fk_user_id: user,
			comission_total: thisMonthTotal,
			iss_total: this.getThisMonthISSTotal(comission_entries),
			rbt_12,
			fk_tax_id: taxTable,
			effective_tax_percentage,
			repartition_table_iss_percentage,
			comission_entries: comission_entries
		};

		const newTx = transactionRepository.create(tx);

		await transactionRepository.save(newTx);

        return (newTx);
	}
}

export { CreateNewTransactionService }
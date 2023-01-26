import { Request, Response } from "express";
import { GetSingleTransactionService } from "../../services/Transaction/GetSingleTransactionService";

class GetSingleTransactionController {
	async handle(request: Request, response: Response){

		const service = new GetSingleTransactionService();
        
        const found = await service.execute(
		{ 
			month: request.query.month,
			year: request.query.year, 
			tax_type: request.query.tax_type
		}, 
		request.user_id);

		var returnJSON = {...found, username: found.fk_user_id.username, tax_name: found.fk_tax_id.tax_name};

		delete returnJSON.transaction_id;
		delete returnJSON.fk_user_id;
		delete returnJSON.fk_tax_id;

        return response.json(returnJSON);
	}
}

export { GetSingleTransactionController }
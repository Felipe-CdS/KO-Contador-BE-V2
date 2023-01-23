import { Request, Response } from "express";
import { CreateNewTransactionService } from "../../services/Transaction/CreateNewTransactionService";

class CreateNewTransactionController {
	async handle(request: Request, response: Response){
		const { comission_entries, number_identifier, transaction_date } = request.body;

        const service = new CreateNewTransactionService();
        
        const newTx = await service.execute({ comission_entries, number_identifier, transaction_date }, request.user_id);

		var returnJSON = {...newTx, username: newTx.fk_user_id.username, tax_name: newTx.fk_tax_id.tax_name};

		delete returnJSON.transaction_id;
		delete returnJSON.fk_user_id;
		delete returnJSON.fk_tax_id;

        return response.json(returnJSON);
	}
}

export { CreateNewTransactionController }
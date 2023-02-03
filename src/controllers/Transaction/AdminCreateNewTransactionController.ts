import { Request, Response } from "express";
import { AdminCreateNewTransactionService } from "../../services/Transaction/AdminCreateNewTransactionService";

class AdminCreateNewTransactionController {
	async handle(request: Request, response: Response){
		const { username, comission_entries, number_identifier, transaction_date } = request.body;

        const service = new AdminCreateNewTransactionService();
        
        const newTx = await service.execute({ username, comission_entries, number_identifier, transaction_date });

		var returnJSON = {...newTx, username: newTx.fk_user_id.username, tax_name: newTx.fk_tax_id.tax_name};

		delete returnJSON.transaction_id;
		delete returnJSON.fk_user_id;
		delete returnJSON.fk_tax_id;

        return response.json(returnJSON);
	}
}

export { AdminCreateNewTransactionController }
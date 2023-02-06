import { Request, Response } from "express";
import { GetUserNextAvaiableTransactionService } from "../../services/Transaction/GetUserNextAvaiableTransactionService";

class GetUserNextAvaiableTransactionController {
	async handle(request: Request, response: Response){

		const service = new GetUserNextAvaiableTransactionService;
        
        const found = await service.execute(
		{ 
			username: request.query.username,
			tax_type: request.query.tax_type
		});

		if(!found)
			return response.json({mostRecentOnType: null, nextDateAvaiable: null});

		var txInfo = {...found.mostRecentOnType, username: found.mostRecentOnType.fk_user_id.username, tax_type: found.mostRecentOnType.fk_tax_id.number_identifier, tax_name: found.mostRecentOnType.fk_tax_id.tax_name};

		delete txInfo.transaction_id;
		delete txInfo.fk_user_id;
		delete txInfo.fk_tax_id;

        return response.json({mostRecentOnType: txInfo, nextDateAvaiable: found.nextDateAvaiable});
	}
}

export { GetUserNextAvaiableTransactionController }
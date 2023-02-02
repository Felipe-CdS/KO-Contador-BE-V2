import { Request, Response } from "express";
import { AdminGetUserTxByYearAndTaxTypeService } from "../../services/Transaction/AdminGetUserTxByYearAndTaxTypeService";

class AdminGetUserTxByYearAndTaxTypeController {
	async handle(request: Request, response: Response){
		
        const service = new AdminGetUserTxByYearAndTaxTypeService();
        
        const found = await service.execute(
		{ 
			year: 		request.query.year, 
			tax_type: 	request.query.tax_type,
			username: 	request.query.username
		});

        return response.json(found);
	}
}

export { AdminGetUserTxByYearAndTaxTypeController }
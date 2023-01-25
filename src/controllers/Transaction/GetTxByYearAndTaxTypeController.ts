import { Request, Response } from "express";
import { GetTxByYearAndTaxTypeService } from "../../services/Transaction/GetTxByYearAndTaxTypeService";

class GetTxByYearAndTaxTypeController {
	async handle(request: Request, response: Response){
		
        const service = new GetTxByYearAndTaxTypeService();
        
        const found = await service.execute(
		{ 
			year: request.query.year, 
			tax_type: request.query.tax_type
		}, 
		request.user_id);

        return response.json(found);
	}
}

export { GetTxByYearAndTaxTypeController }
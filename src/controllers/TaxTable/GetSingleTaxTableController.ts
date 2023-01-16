import { Request, Response } from "express";
import { GetSingleTaxTableService } from "../../services/TaxTable/GetSingleTaxTableService";

class GetSingleTaxTableController {
	async handle(request: Request, response: Response){
		const { number_identifier } = request.params;

        const service = new GetSingleTaxTableService();
        
        const taxTable = await service.execute({ number_identifier });

        return response.json(taxTable);
	}
}

export { GetSingleTaxTableController }
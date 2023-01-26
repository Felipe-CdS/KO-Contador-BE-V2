import { Request, Response } from "express";
import { GetAllTaxTablesService } from "../../services/TaxTable/GetAllTaxTablesService";

class GetAllTaxTablesController {
	async handle(request: Request, response: Response){

        const service = new GetAllTaxTablesService();
        
        const found = await service.execute();

        return response.json(found);
	}
}

export { GetAllTaxTablesController }
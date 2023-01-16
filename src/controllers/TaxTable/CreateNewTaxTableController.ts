import { Request, Response } from "express";
import { CreateNewTaxTableService } from "../../services/TaxTable/CreateNewTaxTableService";

class CreateNewTaxTableController {
	async handle(request: Request, response: Response){
		const { tax_name, number_identifier, rows, repartition_table } = request.body;

        const createNewTaxTableService = new CreateNewTaxTableService();
        
        const newFullTable = await createNewTaxTableService.execute({ tax_name, number_identifier, rows, repartition_table });

        return response.json(newFullTable);
	}
}

export { CreateNewTaxTableController }
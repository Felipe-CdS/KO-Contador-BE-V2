import { Request, Response } from "express";
import { EditTaxTableService } from "../../services/TaxTable/EditTaxTableService";

class EditTaxTableController {
	async handle(request: Request, response: Response){
		const { tax_name, number_identifier, rows, repartition_table } = request.body;

        const service = new EditTaxTableService();
        
        const edited = await service.execute({ tax_name, number_identifier, rows, repartition_table });

        return response.json(edited);
	}
}

export { EditTaxTableController }
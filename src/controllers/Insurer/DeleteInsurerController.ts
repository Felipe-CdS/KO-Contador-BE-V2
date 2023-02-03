import { Request, Response } from "express";
import { DeleteInsurerService } from "../../services/Insurer/DeleteInsurerService";

class DeleteInsurerController {
	async handle(request: Request, response: Response){
		
        const service = new DeleteInsurerService();
        
        const newInsurer = await service.execute(request.query.insurer_name as string);

        return response.status(200).json();
	}
}

export { DeleteInsurerController }
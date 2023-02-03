import { Request, Response } from "express";
import { CreateNewInsurerService } from "../../services/Insurer/CreateNewInsurerService";

class CreateNewInsurerController {
	async handle(request: Request, response: Response){
		
        const service = new CreateNewInsurerService();
        
        const newInsurer = await service.execute(request.query.insurer_name as string);

        return response.json({insurer_name: newInsurer.insurer_name});
	}
}

export { CreateNewInsurerController }
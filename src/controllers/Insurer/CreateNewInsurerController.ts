import { Request, Response } from "express";
import { CreateNewInsurerService } from "../../services/Insurer/CreateNewInsurerService";

class CreateNewInsurerController {
	async handle(request: Request, response: Response){
		
		const { insurer_name } = request.body;
		
        const service = new CreateNewInsurerService();
        
        const newInsurer = await service.execute(insurer_name);

        return response.json({insurer_name: newInsurer.insurer_name});
	}
}

export { CreateNewInsurerController }
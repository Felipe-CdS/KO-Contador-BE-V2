import { Request, Response } from "express";
import { GetAllInsurersService } from "../../services/Insurer/GetAllInsurersService";

class GetAllInsurersController {
	async handle(request: Request, response: Response){
		
        const service = new GetAllInsurersService();
        
        const found = await service.execute();

		let responseArray = [];

		found.map((elem) => {
			responseArray.push(elem.insurer_name);
		})

        return response.json(responseArray);
	}
}

export { GetAllInsurersController }
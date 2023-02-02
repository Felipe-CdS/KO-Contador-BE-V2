import { Request, Response } from "express";
import { AdminGetUserTaxTypesService } from "../../services/User/AdminGetUserTaxTypesService";

class AdminGetUserTaxTypesController {
    async handle(request: Request, response: Response){
		let { username } = request.params;

        const service = new AdminGetUserTaxTypesService();

        const userTaxTypes = await service.execute(username);

        return response.status(200).json({ userTaxTypes });
    }

}

export { AdminGetUserTaxTypesController }
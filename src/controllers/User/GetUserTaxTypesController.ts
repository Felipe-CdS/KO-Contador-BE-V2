import { Request, Response } from "express";
import { GetUserTaxTypesService } from "../../services/User/GetUserTaxTypesService";


class GetUserTaxTypesController {
    async handle(request: Request, response: Response){
        const service = new GetUserTaxTypesService();

        const userTaxTypes = await service.execute(request.user_id);

        return response.status(200).json({ userTaxTypes });
    }

}

export { GetUserTaxTypesController }
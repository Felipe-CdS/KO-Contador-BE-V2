import { Request, Response } from "express";
import { GetUsersByPageService } from "../../services/User/GetUsersByPageService";

class GetUsersByPageController {
	async handle(request: Request, response: Response){

        const service = new GetUsersByPageService();

        const data = await service.execute({ page: request.query.page });

        return response.json(data);
    }
}

export { GetUsersByPageController }
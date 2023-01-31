import { Request, Response } from "express";
import { SearchUserByNameService } from "../../services/User/SearchUserByNameService";

class SearchUserByNameController {
	async handle(request: Request, response: Response){

        const service = new SearchUserByNameService();

        const user = await service.execute({ search_username: request.query.search_username });

        return response.json(user);
    }
}

export { SearchUserByNameController }
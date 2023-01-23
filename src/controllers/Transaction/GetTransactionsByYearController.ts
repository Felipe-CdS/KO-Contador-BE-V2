import { Request, Response } from "express";
import { GetTransactionsByYearService } from "../../services/Transaction/GetTransactionsByYearService";

class GetTransactionsByYearController {
	async handle(request: Request, response: Response){
		const { year } =  request.params;

        const service = new GetTransactionsByYearService();
        
        const found = await service.execute({ year }, request.user_id);

        return response.json(found);
	}
}

export { GetTransactionsByYearController }
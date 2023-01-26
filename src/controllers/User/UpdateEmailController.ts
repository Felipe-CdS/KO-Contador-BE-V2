import { Request, Response } from "express";
import { UpdateEmailService } from "../../services/User/UpdateEmailService";

class UpdateEmailController {
    async handle(request: Request, response: Response){
		const { email } = request.body;

        const service = new UpdateEmailService();

      	await service.execute(request.user_id, email);

        return response.status(200).json();
    }

}

export { UpdateEmailController }
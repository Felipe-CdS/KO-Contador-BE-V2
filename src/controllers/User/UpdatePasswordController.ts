import { Request, Response } from "express";
import { UpdatePasswordService } from "../../services/User/UpdatePasswordService";

class UpdatePasswordController {
    async handle(request: Request, response: Response){
		const { password } = request.body;

        const service = new UpdatePasswordService();

      	await service.execute(request.user_id, password);

        return response.status(200).json();
    }

}

export { UpdatePasswordController }
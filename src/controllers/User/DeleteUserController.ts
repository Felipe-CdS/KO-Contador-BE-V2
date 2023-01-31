import { Request, Response } from "express";
import { DeleteUserService } from "../../services/User/DeleteUserService";

class DeleteUserController {
	async handle(request: Request, response: Response){
		const { admin_password, deleted_user_username } = request.body;

        const createUserService = new DeleteUserService();

        const user = await createUserService.execute(request.user_id, admin_password, deleted_user_username);

        return response.json(user);
    }
}

export { DeleteUserController }
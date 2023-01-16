import { Request, Response } from "express";
import { LoginUserService } from "../../services/User/LoginUserService";

class LoginUserController {
	async handle(request: Request, response: Response){
		const { email, password } = request.body;

        const loginUserService = new LoginUserService();

        const user = await loginUserService.execute({ email, password });

        return response.json(user);
    }
}

export { LoginUserController }
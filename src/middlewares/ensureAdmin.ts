import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";

interface IPayload {
    sub: string;
}

async function ensureAdmin(req: Request, res: Response, next: NextFunction){
	const authToken = req.headers.authorization;
	const userRepository = getCustomRepository(UserRepositories);

	if(!authToken)
		return res.status(401).end();

	const [, token] = authToken.split(" ");

	try
	{
		const { sub } = verify(token, process.env.HASH_SECRET) as IPayload;
		const user = await userRepository.findOne({user_id: sub});

		if(!user.admin)
			return res.status(401).end();

		req.user_id = sub;
		return next();
	}
	catch(err)
	{
		return res.status(401).end();
	}
}

export { ensureAdmin }
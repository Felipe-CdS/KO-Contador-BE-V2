import { Router, Request, Response } from "express";
import { CreateNewTaxTableController } from "./controllers/TaxTable/CreateNewTaxTableController";
import { GetSingleTaxTableController } from "./controllers/TaxTable/GetSingleTaxTableController";
import { CreateNewTransactionController } from "./controllers/Transaction/CreateNewTransactionController";
import { GetSingleTransactionController } from "./controllers/Transaction/GetSingleTransactionController";
import { GetTransactionsByYearController } from "./controllers/Transaction/GetTransactionsByYearController";
import { GetTxByYearAndTaxTypeController } from "./controllers/Transaction/GetTxByYearAndTaxTypeController";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { GetUserTaxTypesController } from "./controllers/User/GetUserTaxTypesController";
import { LoginUserController } from "./controllers/User/LoginUserController";
import { UpdateEmailController } from "./controllers/User/UpdateEmailController";
import { UpdatePasswordController } from "./controllers/User/UpdatePasswordController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuth } from "./middlewares/ensureAuth";

const router = Router();

const createNewTaxTableController		= new CreateNewTaxTableController();
const getSingleTaxTableController		= new GetSingleTaxTableController();

const createUserController				= new CreateUserController();
const loginUserController				= new LoginUserController();
const updatePasswordController 			= new UpdatePasswordController();
const updateEmailController				= new UpdateEmailController();
const getUserTaxTypesController			= new GetUserTaxTypesController();

const createNewTransactionController 	= new CreateNewTransactionController();
const getTransactionsByYearController	= new GetTransactionsByYearController();
const getSingleTransactionController	= new GetSingleTransactionController();
const getTxByYearAndTaxTypeController	= new GetTxByYearAndTaxTypeController();

router.post("/tax-tables",						ensureAdmin,	createNewTaxTableController.handle);
router.get("/tax-tables/:number_identifier",	ensureAdmin,	getSingleTaxTableController.handle);

router.post("/users/auth/signin",								loginUserController.handle);
router.put("/users/change-password",			ensureAuth,		updatePasswordController.handle);
router.put("/users/change-email",				ensureAuth,		updateEmailController.handle);
router.post("/users/auth/signup",				ensureAdmin,	createUserController.handle);
router.get("/users/tax-types",					ensureAuth,		getUserTaxTypesController.handle);

router.post("/transactions",					ensureAuth,		createNewTransactionController.handle);
router.get("/transactions/:year",				ensureAuth,		getTransactionsByYearController.handle);
router.get("/transactions",						ensureAuth,		getTxByYearAndTaxTypeController.handle);
router.get("/single-transaction",				ensureAuth,		getSingleTransactionController.handle);


router.get("/",	(req: Request, res: Response) => { res.status(200).json({ statusMessage: "OK" }) });

export { router }
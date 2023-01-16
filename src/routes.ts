import { Router, Request, Response } from "express";
import { CreateNewTaxTableController } from "./controllers/TaxTable/CreateNewTaxTableController";
import { GetSingleTaxTableController } from "./controllers/TaxTable/GetSingleTaxTableController";
import { CreateNewTransactionController } from "./controllers/Transaction/CreateNewTransactionController";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { LoginUserController } from "./controllers/User/LoginUserController";
import { UpdatePasswordController } from "./controllers/User/UpdatePasswordController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuth } from "./middlewares/ensureAuth";

const router = Router();

const createNewTaxTableController		= new CreateNewTaxTableController();
const getSingleTaxTableController		= new GetSingleTaxTableController();

const createUserController				= new CreateUserController();
const loginUserController				= new LoginUserController();
const updatePasswordController 			= new UpdatePasswordController();

const createNewTransactionController 	=	new CreateNewTransactionController();

router.post("/tax-tables",						ensureAdmin,	createNewTaxTableController.handle);
router.get("/tax-tables/:number_identifier",	ensureAdmin,	getSingleTaxTableController.handle);

router.put("/users/change-password",			ensureAuth,		updatePasswordController.handle );
router.post("/users/auth/signup",				ensureAdmin,	createUserController.handle );
router.post("/users/auth/signin",								loginUserController.handle );

router.post("/transactions",					ensureAuth,		createNewTransactionController.handle );


// const getFullTableController	=			new GetFullTableController();
// const getAllFullTablesController =		new GetAllFullTablesController();
// const createFullTableController =		new CreateFullTableController();
// const updateFullTableController =		new UpdateFullTableController();
// const deleteFullTableController =		new DeleteFullTableController();

// const getUserTaxTypesController =		new GetUserTaxTypesController();
// const getAllUsersController		=		new GetAllUsersController();
// const getUsersByPageController	=		new GetUsersByPageController();
// const getUsersByNameController	=		new GetUsersByNameController();


// const deleteUserController		=		new DeleteUserController();
// const editUserController		=			new EditUserController();

// const getTransactionsController = 		new GetTransactionsController();


// router.get("/tax-tables/:number_identifier",		ensureAdmin,	getFullTableController.handle );
// router.get("/tax-tables",						ensureAdmin,	getAllFullTablesController.handle );
// router.post("/tax-tables",						ensureAdmin,	createFullTableController.handle );
// router.put("/tax-tables",						ensureAdmin,	updateFullTableController.handle );
// router.delete("/tax-tables/:number_identifier",	ensureAdmin,	deleteFullTableController.handle );

// router.get("/users/tax-types",					ensureAuth,		getUserTaxTypesController.handle );
// router.get("/users/all",							ensureAdmin,	getAllUsersController.handle );
// router.get("/users/page/:page",					ensureAdmin,	getUsersByPageController.handle );
// router.get("/users/:username",					ensureAdmin,	getUsersByNameController.handle );
// router.put("/users",								ensureAdmin,	editUserController.handle );
// router.delete("/users",							ensureAdmin,	deleteUserController.handle );

// router.get("/transactions",						ensureAuth,		getTransactionsController.handle );


router.get("/",	(req: Request, res: Response) => { res.status(200).json({ statusMessage: "OK" }) });

export { router }
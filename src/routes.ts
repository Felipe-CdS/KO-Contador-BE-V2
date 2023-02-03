import { Router, Request, Response } from "express";
import { CreateNewInsurerController } from "./controllers/Insurer/CreateNewInsurerController";
import { DeleteInsurerController } from "./controllers/Insurer/DeleteInsurerController";
import { GetAllInsurersController } from "./controllers/Insurer/GetAllInsurersController";
import { CreateNewTaxTableController } from "./controllers/TaxTable/CreateNewTaxTableController";
import { EditTaxTableController } from "./controllers/TaxTable/EditTaxTableController";
import { GetAllTaxTablesController } from "./controllers/TaxTable/GetAllTaxTablesController";
import { GetSingleTaxTableController } from "./controllers/TaxTable/GetSingleTaxTableController";
import { AdminCreateNewTransactionController } from "./controllers/Transaction/AdminCreateNewTransactionController";
import { AdminGetSingleTransactionController } from "./controllers/Transaction/AdminGetSIngleTransactionController";
import { AdminGetUserTxByYearAndTaxTypeController } from "./controllers/Transaction/AdminGetUserTxByYearAndTaxTypeController";
import { CreateNewTransactionController } from "./controllers/Transaction/CreateNewTransactionController";
import { GetSingleTransactionController } from "./controllers/Transaction/GetSingleTransactionController";
import { GetTransactionsByYearController } from "./controllers/Transaction/GetTransactionsByYearController";
import { GetTxByYearAndTaxTypeController } from "./controllers/Transaction/GetTxByYearAndTaxTypeController";
import { AdminGetUserTaxTypesController } from "./controllers/User/AdminGetUserTaxTypes";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { DeleteUserController } from "./controllers/User/DeleteUserController";
import { GetUsersByPageController } from "./controllers/User/GetUsersByPageController";
import { GetUserTaxTypesController } from "./controllers/User/GetUserTaxTypesController";
import { LoginUserController } from "./controllers/User/LoginUserController";
import { SearchUserByNameController } from "./controllers/User/SearchUserByNameController";
import { UpdateEmailController } from "./controllers/User/UpdateEmailController";
import { UpdatePasswordController } from "./controllers/User/UpdatePasswordController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuth } from "./middlewares/ensureAuth";

const router = Router();

const createNewTaxTableController				= new CreateNewTaxTableController();
const editTaxTableController					= new EditTaxTableController();
const getAllTaxTablesController					= new GetAllTaxTablesController();
const getSingleTaxTableController				= new GetSingleTaxTableController();

const createUserController						= new CreateUserController();
const loginUserController						= new LoginUserController();
const updatePasswordController 					= new UpdatePasswordController();
const updateEmailController						= new UpdateEmailController();
const getUserTaxTypesController					= new GetUserTaxTypesController();
const getUsersByPageController					= new GetUsersByPageController();
const deleteUserController						= new DeleteUserController();
const searchUserByNameController				= new SearchUserByNameController();

const createNewTransactionController 			= new CreateNewTransactionController();
const getTransactionsByYearController			= new GetTransactionsByYearController();
const getSingleTransactionController			= new GetSingleTransactionController();
const getTxByYearAndTaxTypeController			= new GetTxByYearAndTaxTypeController();

const adminGetUserTaxTypesController			= new AdminGetUserTaxTypesController();
const adminCreateNewTransactionService			= new AdminCreateNewTransactionController();
const adminGetSingleTransactionController		= new AdminGetSingleTransactionController();
const adminGetUserTxByYearAndTaxTypeController	= new AdminGetUserTxByYearAndTaxTypeController();

const createNewInsurerController				= new CreateNewInsurerController();
const getAllInsurersController					= new GetAllInsurersController();
const deleteInsurerController					= new DeleteInsurerController();

router.post("/tax-tables",						ensureAdmin,	createNewTaxTableController.handle);
router.post("/tax-tables/edit",					ensureAdmin,	editTaxTableController.handle);
router.get("/tax-tables/all",					ensureAdmin,	getAllTaxTablesController.handle);
router.get("/tax-tables/:number_identifier",	ensureAdmin,	getSingleTaxTableController.handle);

router.post("/users/auth/signin",								loginUserController.handle);
router.put("/users/change-password",			ensureAuth,		updatePasswordController.handle);
router.put("/users/change-email",				ensureAuth,		updateEmailController.handle);
router.post("/users/auth/signup",				ensureAdmin,	createUserController.handle);
router.get("/users",							ensureAdmin,	getUsersByPageController.handle );
router.delete("/users",							ensureAdmin,	deleteUserController.handle );
router.get("/users/tax-types",					ensureAuth,		getUserTaxTypesController.handle);
router.get("/search-user",						ensureAdmin,	searchUserByNameController.handle);

router.post("/transactions",					ensureAuth,		createNewTransactionController.handle);
router.get("/transactions/:year",				ensureAuth,		getTransactionsByYearController.handle);
router.get("/transactions",						ensureAuth,		getTxByYearAndTaxTypeController.handle);
router.get("/single-transaction",				ensureAuth,		getSingleTransactionController.handle);

router.post("/admin/transactions",				ensureAdmin,	adminCreateNewTransactionService.handle);
router.get("/admin/user-transactions",			ensureAdmin,	adminGetUserTxByYearAndTaxTypeController.handle);
router.get("/admin/single-transaction",			ensureAdmin,	adminGetSingleTransactionController.handle);
router.get("/admin/tax-types/:username",		ensureAdmin,	adminGetUserTaxTypesController.handle);

router.post("/insurers",						ensureAuth,		createNewInsurerController.handle);
router.get("/insurers",							ensureAdmin,	getAllInsurersController.handle);
router.delete("/insurers",						ensureAdmin,	deleteInsurerController.handle);

router.get("/",	(req: Request, res: Response) => { res.status(200).json({ statusMessage: "OK OK" }) });

export { router }
import { EntityRepository, Repository } from "typeorm";
import { Transaction } from "../entities/Transaction";

@EntityRepository(Transaction)
class TransactionRepositories extends Repository<Transaction> { }

export { TransactionRepositories }
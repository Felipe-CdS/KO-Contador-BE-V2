import { EntityRepository, Repository } from "typeorm";
import { TaxUserJunction } from "../entities/TaxUserJunction";

@EntityRepository(TaxUserJunction)
class TaxUserJunctionRepositories extends Repository<TaxUserJunction> { }

export { TaxUserJunctionRepositories }
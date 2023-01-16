import { EntityRepository, Repository } from "typeorm";
import { TaxTable } from "../entities/TaxTable";

@EntityRepository(TaxTable)
class TaxTableRepositories extends Repository<TaxTable> { }

export { TaxTableRepositories }
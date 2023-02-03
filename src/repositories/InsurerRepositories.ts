import { EntityRepository, Repository } from "typeorm";
import { Insurer } from "../entities/Insurer";

@EntityRepository(Insurer)
class InsurerRepositories extends Repository<Insurer> { }

export { InsurerRepositories }
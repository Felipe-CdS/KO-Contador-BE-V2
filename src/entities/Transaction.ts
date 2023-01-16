import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { TaxTable } from "./TaxTable";
import { User } from "./User";
import { v4 as uuid } from "uuid";

@Entity("transactions")
class Transaction {

	@PrimaryColumn()
	@Exclude()
	readonly transaction_id: string;

	@JoinColumn({name: "fk_user_id"})
    @ManyToOne( () => User)
	fk_user_id: User;

	@Column()
	comission_total: number;

	@Column()
	iss_total: number;

	@Column()
	rbt_12: number;

	@JoinColumn({name: "fk_tax_id"})
    @ManyToOne( () => TaxTable)
	fk_tax_id: TaxTable;

	@Column()
	effective_tax_percentage: number;

	@Column()
	repartition_table_iss_percentage: number;

	@Column({type: 'jsonb' })
	comission_entries: ICommissionEntry[];

	@Column()
	transaction_date: Date;

	constructor(){
		if(!this.transaction_id)
			this.transaction_id = uuid();
	}
}

interface ICommissionEntry {
	insurer_name: String;
	comission_value: number;
	iss_value: number;
}

export { Transaction, ICommissionEntry }
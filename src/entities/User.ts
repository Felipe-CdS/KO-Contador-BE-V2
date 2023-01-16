import { Entity, PrimaryColumn, Column, BeforeInsert, UpdateDateColumn } from "typeorm";
import { Exclude, instanceToPlain } from "class-transformer";
import { v4 as uuid } from "uuid";
import { hash, compare } from "bcryptjs";

@Entity("users")
class User {

	@PrimaryColumn()
	@Exclude({ toPlainOnly: true })
	readonly user_id: string;

	@Column()
	username: string;

	@Column()
	@Exclude({ toPlainOnly: true })
	password: string;

	@Column()
	email: string;

	@Column()
	@Exclude({ toPlainOnly: true })
	admin: boolean;

	@UpdateDateColumn()
    updated_at: Date;

	@BeforeInsert()
	async hashPassword() {
		this.password = await hash(this.password, 12);
	}

	static async comparePassword(candidatePassword: string, hashedPassword: string){
		return await compare(candidatePassword, hashedPassword);
	}

	toJSON() {
		return instanceToPlain(this);
	}

	constructor(){
		if(!this.user_id){
			this.user_id = uuid();
		}
	}
}

interface IUser {
    username: string;
    email: string;
    admin?: boolean;
	tax_types: number[];
}

export { User, IUser }
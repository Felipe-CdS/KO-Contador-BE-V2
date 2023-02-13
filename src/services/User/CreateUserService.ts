import { getCustomRepository } from "typeorm"
import { generate } from "generate-password";
import { createTransport } from "nodemailer";
import { IUser } from "../../entities/User";
import { UserRepositories } from "../../repositories/UserRepositories";
import { TaxTableRepositories } from "../../repositories/TaxTableRepositories";
import { TaxUserJunctionRepositories } from "../../repositories/TaxUserJunctionRepositories";

class CreateUserService {

	async sendSucessEmail(email: string, generatedPassword){
		var transporter = createTransport({
			service: 'gmail',
			auth: {
			  user: 'test_test@gmail.com',
			  pass: 'scumzfhcqifykqow'
			}
		  });
		  
		  var mailOptions = {
			from: {
				name: 'KO Contador Testes',
				address: 'test_test@gmail.com'
			},
			to: email,
			subject: 'Conta cadastrada com sucesso no sistema de Simples Nacional!',
			text: ` Bem-vindo. Essas são suas credenciais para o primeiro login: email: ${email}, senha provisória: ${generatedPassword}`
		  };
		  
		  transporter.sendMail(mailOptions, function(error, info){
			if (error) {
			  console.log(error);
			} else {
			  console.log('Email sent: ' + info.response);
			}
		  }); 
	}

	async execute({ username, email, admin = false, tax_types }: IUser){
		
		const userRepository			= getCustomRepository(UserRepositories);
		const fullTableRepository		= getCustomRepository(TaxTableRepositories);
		const taxUserJunctionRepository	= getCustomRepository(TaxUserJunctionRepositories);
		
		if(!email)
			throw new Error("Email inválido.");

		const emailAlreadyExists = await userRepository.findOne({ email });

		if(emailAlreadyExists)
			throw new Error("Esse email já existe.");
		
		const nameAlreadyExists = await userRepository.findOne({ username });

		if(nameAlreadyExists)
			throw new Error("Esse nome de usuário já existe.");

		if(!tax_types || tax_types.length == 0)
			throw new Error("Selecione pelo menos 1 anexo.");


		for(let i = 0; i < tax_types.length; i++){
			tax_types[i] = Number(tax_types[i]);
			var checkTaxTableExists =  await fullTableRepository.findOne({ number_identifier: tax_types[i] });
			if(!checkTaxTableExists)
				throw new Error("Um ou mais anexos não existem.");
		}

		const generatedPassword = "audicent"; // generate({length: 8, numbers: true, excludeSimilarCharacters: true});

		const user = userRepository.create({
			username,
            email,
            password: generatedPassword,
            admin
        });

		await userRepository.save(user);

		for(let i = 0; i < tax_types.length; i++){
			var userId = await userRepository.findOne({ username });
			var taxTableId = await fullTableRepository.findOne({ number_identifier: tax_types[i] });

			var newJunction = taxUserJunctionRepository.create({ 
				fk_user_id: userId,
				fk_table_id: taxTableId
			});
			
			await taxUserJunctionRepository.save(newJunction);
		}
		// if(process.env.DB_SSL_ENV == "production")
		// 	await this.sendSucessEmail(email, generatedPassword);
		// else
		// 	console.log(">", email, generatedPassword);

		return(user);
	}
}

export { CreateUserService }
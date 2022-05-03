import  connection  from '../connection';
// import users from '../data/users.json';
import { createTables } from './createTables';

const printError = (error: any) => {  console.log(error), console.log(error.sqlMessage || error.message); };

// const insertUsers = () => connection('aula51_users')
// 	.insert(users)
// 	.then(() => { console.log('Usuários criados'); })
// 	.catch(printError);

const closeConnection = () => { connection.destroy(); };

createTables()
	// .then(insertUsers)
	.catch((errorMessage: any) => printError(errorMessage))
	.finally(closeConnection);
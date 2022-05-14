import connection from '../connection';
import  dummyClassesData from './data/dummyClassesData.json';
import { createTables } from './createTables';

const printError = (error: any) => console.log(error.sqlMessage || error.message || error);

const insertDummyClassesData = async () => {
	console.log('Populating "classes" table...');
	return await connection('classes')
		.insert(dummyClassesData)
		.then(() => console.log('Successful populated "classes" table.'));
};

const closeConnection = () => connection.destroy();

createTables()
	.then(insertDummyClassesData)
	.catch((errorMessage) => printError(errorMessage))
	.finally(closeConnection);
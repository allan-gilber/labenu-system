import connection from '../connection';
import  dummyClassesData from './data/dummyClassesData.json';
import { createTables } from './createTables';

const printError = (error: any) => console.log(error.sqlMessage || error.message || error || error);

const insertDummyClassesData = async () => {
	console.log('Populating "classes" table...');
	return await connection('classes')
		.insert(dummyClassesData)
		.then(() => console.log('Successful populated "classes" table.'));
};
const insertDummyStudentsData = async () => {
	console.log('Populating "students" table...');
	return await connection('students')
		.insert(insertDummyStudentsData)
		.then(() => console.log('Successful populated "students" table.'));
};
};
const insertDummyHobbiesData = async () => {
	console.log('Populating "hobbies" table...');
	return await connection('hobbies')
		.insert(insertDummyHobbiesData)
		.then(() => console.log('Successful populated "hobbies" table.'));
};

const closeConnection = () => connection.destroy();

createTables()
	.then(insertDummyClassesData).then(insertDummyStudentsData).then(insertDummyHobbiesData)
	.catch((errorMessage) => printError(errorMessage))
	.finally(closeConnection);
import connection from '../connection';
import dummyClassesData from './data/dummyClassesData.json';
import dummyHobbieData from './data/dummyHobbieData.json';
import dummySpecialtiesData from './data/dummySpecialtiesData.json';
import dummyStudentsData from './data/dummyStudentsData.json';
import dummyStudentsHobbiesData from './data/dummyStudentsHobbiesData.json';
import dummyTeachersSpecialtiesData from './data/dummyTeachersSpecialtiesData.json';
import dummyTeachersData from './data/dummyTeachersData.json';

import { createTables } from './createTables';

const printError = (error: any) => console.log(error.sqlMessage || error.message || error || error);

const insertDummydata = async (dataArray: any) => {
	return connection.transaction(async (transaction: any) => {
		for(let index = 0; index < dataArray.length; index++){
			console.log(`Populating "${dataArray[index][0]}" table...`);
			await transaction(dataArray[index][0])
				.insert(dataArray[index][1])
				.then(() => console.log(`Successful populated "${dataArray[index][0]}" table.`));
		}
	});
};

const closeConnection = () => connection.destroy();

createTables().then(() => insertDummydata([
	dummyHobbieData,
	dummyClassesData,
	dummySpecialtiesData,
	dummyTeachersData,
	dummyTeachersSpecialtiesData,
	dummyStudentsData,
	dummyStudentsHobbiesData
])).catch((errorMessage) => printError(errorMessage))
	.finally(closeConnection);
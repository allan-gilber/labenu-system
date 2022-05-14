import { Response } from 'express';
import connection from '../connection';
import errorMessages from '../utilities/errorMessages';

export default async function getActiveClasses (
	res: Response
): Promise<void> {
	try {
		const listOfActiveClasses = await connection('classes').select('*').where('class_module', '>', 0).orderBy('class_name', 'asc');
		if(listOfActiveClasses.length === 0) throw 'noActiveClassFound';
		res.status(200).send({message: 'successful', data: listOfActiveClasses });
	} catch (error){
		console.log('getActiveClasses error: ', error);
		if(error === 'noActiveClassFound') {
			res.status(404).send({message: `getActiveClasses error: ${errorMessages('noActiveClassFound')}`});
			return;
		}
		res.status(500).send({message: `getActiveClasses error: ${errorMessages('genericError')}`});
	}
}
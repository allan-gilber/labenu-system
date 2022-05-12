import { Request, Response } from 'express';
import connection from '../connection';

export default async function getActiveClasses (
	req: Request,
	res: Response
): Promise<void> {
	try {
		const listOfActiveClasses = await connection('classes').select('*').where('class_module', '>', 0).orderBy('class_name', 'asc');
		if(listOfActiveClasses.length === 0) throw 'empty answer';
		res.status(200).send({message: '', data: listOfActiveClasses });
	} catch (error){
		console.log('getActiveClasses error: ', error);
		if(error === 'empty answer') {
			res.status(400).send({message: 'getActiveClasses error: no active class has been found.'});
			return;
		}
		res.status(500).send({message: 'getActiveClasses error: something has gone wrong with your request'});
	}
}
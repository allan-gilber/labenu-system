import { Request, Response } from 'express';
import connection from '../../connection';
import errorMessages from '../../utilities/errorMessages';

export default async function getAllTeachers (
	req: Request,
	res: Response
): Promise<void> {
	try {
		await connection('teachers').select('*').then((response: any) => {
			if(!response[0]) throw 'emptyAnswer';
			res.status(200).send({
				message: 'Succesfull',
				data: response[0]
			});
		});
	} catch (error: any){
		console.log('getAllTeachers error: ', error.message || error);
		if(error === 'emptyAnswer') {
			res.status(404).send({message: `getAllTeachers error: ${errorMessages('emptyAnswerForGetAllTeachers')}`});
			return;
		}
		res.status(500).send({message: `getAllTeachers error:  ${errorMessages('genericError')}`});
	}
}
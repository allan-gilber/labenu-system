import { Request, Response } from 'express';
import connection from '../../connection';
import errorMessages from '../../utilities/errorMessages';

export default async function getStudentByName (
	req: Request,
	res: Response
): Promise<void> {
	try {
		const studentName = req.body.studentName;
		if(!studentName) throw 'missingParamtersForStudentName';
		await connection('students').select('*').where('student_name', 'LIKE', `%${studentName}%`)
			.then((response: any) => {
				if(response.length === 0) throw 'emptyAnswer';
				res.status(200).send({
					message: 'Succesfull',
					data: response
				});
			});
	} catch (error: any){
		console.log('getStudentByName error: ', error.message || error);
		if(error === 'missingParamtersForStudentName') {
			res.status(400).send({message: `getStudentByName error: ${errorMessages('emptyStudentName')}`});
			return;
		}
		if(error === 'emptyAnswer') {
			res.status(404).send({message: `getStudentByName error: ${errorMessages('emptyAnswerForSearchStudentByName')}`});
			return;
		}
		res.status(500).send({message: `getStudentByName error:  ${errorMessages('genericError')}`});
	}
}
import { Request, Response } from 'express';
import connection from '../../connection';
import errorMessages from '../../utilities/errorMessages';
import checkIfStudentAndClassIdsAreCorrect from './utility/checkIfStudentAndClassIdsAreCorrect';

export default async function changeStudentClass (
	req: Request,
	res: Response
): Promise<void> {
	try {
		const studentId = req.params.studentId;
		const classId = req.body.classId;

		if(!classId) throw 'invalidClassId';
		if(!studentId) throw 'invalidStudentId';

		await checkIfStudentAndClassIdsAreCorrect(studentId, classId)
			.then(async () =>{
				await connection('students').where({'student_id': studentId}).update({'class_id': classId});
			})
			.then(() => {
				res.status(200).send({message: `Class module successful changed to: ${studentId}`});
			});

	} catch (error: any){
		console.log('changeStudentClass error: ', error.message || error );
		if(error === 'invalidStudentId') {
			res.status(400).send({message: `changeStudentClass error: ${errorMessages(error)}`});
			return;
		}
		if(error === 'invalidClassId') {
			res.status(400).send({message: `changeStudentClass error: ${errorMessages(error)}`});
			return;
		}
		if(error === 'studentAlreadyInIndicatedClass'){
			res.status(400).send({message: `changeStudentClass error: ${errorMessages(error)}`});
			return;
		}
		res.status(500).send({message: 'changeStudentClass error: something has gone wrong with your request'});
	}
}
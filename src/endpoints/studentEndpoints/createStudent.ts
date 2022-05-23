import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { Student } from '../../classes';
import errorMessages from '../../utilities/errorMessages';
import transactionToCreateNewStudent from './utility/transactionToCreateNewStudent';

export default async function getStudentByName (
	req: Request,
	res: Response
): Promise<void> {
	try {
		const requisitionBody = req.body;

		if(!requisitionBody.name || !requisitionBody.email || !requisitionBody.hobbies || !requisitionBody.classId) throw 'missingParamtersForStudentForStudentCreation';

		const studentId = nanoid();
		const newStudent = new Student(studentId, requisitionBody.name,requisitionBody.email,requisitionBody.birthDate,requisitionBody.classId, requisitionBody.hobbies);

		await transactionToCreateNewStudent(newStudent, requisitionBody.hobbies, studentId)
			.then(() => {
				res.status(200).send({message: `Student ${newStudent.name} successful created`});
			});
	} catch (error: any){
		console.log('getStudentByName error: ', error.message || error);
		if(error.code === 'ER_DUP_ENTRY'){
			res.status(400).send({message: `getStudentByName error: ${errorMessages('studentEmailAlreadyRegistered')}`});
			return;
		}
		if(error === 'missingParamtersForStudentForStudentCreation') {
			res.status(400).send({message: `getStudentByName error: ${errorMessages('emptyClassName')}`});
			return;
		}
		res.status(500).send({message: `getStudentByName error:  ${errorMessages('genericError')}`});
	}
}
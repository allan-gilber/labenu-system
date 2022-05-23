import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { Student } from '../../classes';
import errorMessages from '../../utilities/errorMessages';
import transactionToCreateNewStudent from './utility/transactionToCreateNewStudent';

export default async function createStudent (
	req: Request,
	res: Response
): Promise<void> {
	try {
		const requisitionBody = req.body;

		if(!requisitionBody.name || !requisitionBody.email || !requisitionBody.hobbies || !requisitionBody.classId) throw 'missingParamtersForStudent';

		const studentId = nanoid();
		const newStudent = new Student(studentId, requisitionBody.name,requisitionBody.email,requisitionBody.birthDate,requisitionBody.classId, requisitionBody.hobbies);

		await transactionToCreateNewStudent(newStudent, requisitionBody.hobbies, studentId)
			.then(() => {
				res.status(200).send({message: `Student ${newStudent.name} successful created`});
			});
	} catch (error: any){
		console.log('createStudent error: ', error.message);
		if(error.code === 'ER_DUP_ENTRY'){
			res.status(400).send({message: `createStudent error: ${errorMessages('studentEmailAlreadyRegistered')}`});
			return;
		}
		if(error === 'missingParamtersForStudent') {
			res.status(400).send({message: `createStudent error: ${errorMessages('emptyClassName')}`});
			return;
		}
		res.status(500).send({message: `createStudent error:  ${errorMessages('genericError')}`});
	}
}
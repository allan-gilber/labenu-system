import { isValid } from 'date-fns';
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

		if(!requisitionBody.name || !requisitionBody.email || !isValid(new Date(requisitionBody.birthDate)) || !Array.isArray(requisitionBody.hobbies) || requisitionBody.hobbies.length === 0  || !requisitionBody.classId) throw 'missingOrInvalidParamtersForStudentForStudentCreation';

		const studentId = nanoid();
		const newStudent = new Student(studentId, requisitionBody.name,requisitionBody.email,requisitionBody.birthDate,requisitionBody.classId, requisitionBody.hobbies);

		await transactionToCreateNewStudent(newStudent.getStudentData())
			.then(() => {
				res.status(200).send({message: `Student ${newStudent.name} successful created with the following id: ${studentId}`});
			});
	} catch (error: any){
		console.log('createStudent error: ', error.message || error);
		if(error.code === 'ER_DUP_ENTRY'){
			res.status(400).send({message: `createStudent error: ${errorMessages('emailAlreadyRegistered')}`});
			return;
		}
		if(error === 'missingOrInvalidParamtersForStudentForStudentCreation') {
			res.status(400).send({message: `createStudent error: ${errorMessages('missingOrInvalidParamtersForStudentForStudentCreation')}`});
			return;
		}
		res.status(500).send({message: `createStudent error:  ${errorMessages('genericError')}`});
	}
}
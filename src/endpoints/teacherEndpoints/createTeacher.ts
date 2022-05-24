import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { Student, Teacher } from '../../classes';
import errorMessages from '../../utilities/errorMessages';
import transactionToCreateNewTeacher from './utility/transactionToCreateNewTeacher';

export default async function createTeacher (
	req: Request,
	res: Response
): Promise<void> {
	try {
		const requisitionBody = req.body;

		if(!requisitionBody.name || !requisitionBody.email || !requisitionBody.birthDate || !requisitionBody.classId || !requisitionBody.specialty) throw 'missingParamtersForStudentForTeacherCreation';

		const teacherId = nanoid();
		const teacherData = new Teacher(teacherId, requisitionBody.name, requisitionBody.email, requisitionBody.birthDate, requisitionBody.classId, requisitionBody.specialty);

		await transactionToCreateNewTeacher(teacherData)
			.then(() => {
				res.status(200).send({message: `Student ${teacherData.name} successful created`});
			});
	} catch (error: any){
		console.log('createTeacher error: ', error.message || error);
		if(error.code === 'ER_DUP_ENTRY'){
			res.status(400).send({message: `createTeacher error: ${errorMessages('studentEmailAlreadyRegistered')}`});
			return;
		}
		if(error === 'missingParamtersForStudentForTeacherCreation') {
			res.status(400).send({message: `createTeacher error: ${errorMessages('emptyClassName')}`});
			return;
		}
		res.status(500).send({message: `createTeacher error:  ${errorMessages('genericError')}`});
	}
}
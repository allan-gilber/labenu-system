import { isValid } from 'date-fns';
import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { Teacher } from '../../classes';
import errorMessages from '../../utilities/errorMessages';
import transactionToCreateNewTeacher from './utility/transactionToCreateNewTeacher';

export default async function createTeacher (
	req: Request,
	res: Response
): Promise<void> {
	try {
		const requisitionBody = req.body;

		if(!requisitionBody.name || !requisitionBody.email || !isValid(new Date(requisitionBody.birthDate)) || !requisitionBody.classId || requisitionBody.specialty.length === 0 || !Array.isArray(requisitionBody.specialty)) throw 'missingParamtersForTeacherForTeacherCreation';

		const teacherId = nanoid();
		const teacherData = new Teacher(teacherId, requisitionBody.name, requisitionBody.email, requisitionBody.birthDate, requisitionBody.classId, requisitionBody.specialty);

		await transactionToCreateNewTeacher(teacherData)
			.then(() => {
				res.status(200).send({message: `Teacher ${teacherData.name} successful created with the following id: ${teacherId}`});
			});
	} catch (error: any){
		console.log('createTeacher error: ', error.message || error);
		if(error.code === 'ER_DUP_ENTRY'){
			res.status(400).send({message: `createTeacher error: ${errorMessages('emailAlreadyRegistered')}`});
			return;
		}
		if(error === 'missingParamtersForTeacherForTeacherCreation') {
			res.status(400).send({message: `createTeacher error: ${errorMessages('missingParamtersForTeacherForTeacherCreation')}`});
			return;
		}
		res.status(500).send({message: `createTeacher error:  ${errorMessages('genericError')}`});
	}
}
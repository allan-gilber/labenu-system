import { nanoid } from 'nanoid';
import { Student } from '../../../classes';
import connection from '../../../connection';

async function transactionToCreateNewStudent (newStudent: Student, hobbies: string[], studentId: string) {
	await connection.transaction(async (transaction: any) => {

		await transaction('students').insert({
			student_id: newStudent.student_id, 
			student_name: newStudent.name, 
			student_email: newStudent.email, 
			student_birth_date: newStudent.birth_date, 
			class_id: newStudent.class_id
		});

		for(let index = 0; index < hobbies.length; index++){
			await connection('hobbies').select('*').where('hobby_name', '=',hobbies[index]).then(async (response: any) => {
				const studentToHobbiesId = nanoid();
				if(response[0].hobby_id){
					await transaction('student_hobbies').insert({
						student_hobbies_id: studentToHobbiesId,
						hobby_id: response[0].hobby_id,
						student_id: studentId
					});
					return;
				}
				const hobbyId = nanoid();
				await transaction('hobbies').insert({
					hobby_id: hobbyId,
					hobby_name: hobbies[index]
				}).then(
					() => 
						transaction('student_hobbies').insert({
							student_hobbies_id: studentToHobbiesId,
							hobby_id: hobbyId,
							student_id: studentId
						})
				);
			});
		}
	});
}

export default transactionToCreateNewStudent;
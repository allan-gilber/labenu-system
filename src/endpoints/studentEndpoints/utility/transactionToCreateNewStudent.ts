import { nanoid } from 'nanoid';
import connection from '../../../connection';

async function transactionToCreateNewStudent (newStudent: string[]) {
	await connection.transaction(async (transaction: any) => {

		await transaction('students').insert({
			student_id: newStudent[0],
			student_name: newStudent[1],
			student_email: newStudent[2],
			student_birth_date: newStudent[3],
			student_class_id: newStudent[4]
		});

		for(let index = 0; index < newStudent[5].length; index++){
			await connection('hobbies').select('*').where('hobby_name', '=',newStudent[5][index]).then(async (response: any) => {
				const studentToHobbiesId = nanoid();
				if(response[0].hobby_id){
					await transaction('student_hobbies').insert({
						student_hobbies_id: studentToHobbiesId,
						hobby_id: response[0].hobby_id,
						student_id: newStudent[0]
					});
					return;
				}
				const hobbyId = nanoid();
				await transaction('hobbies').insert({
					hobby_id: hobbyId,
					hobby_name: newStudent[5][index]
				}).then(
					() => 
						transaction('student_hobbies').insert({
							student_hobbies_id: studentToHobbiesId,
							hobby_id: hobbyId,
							student_id: newStudent[0]
						})
				);
			});
		}
	});
}

export default transactionToCreateNewStudent;
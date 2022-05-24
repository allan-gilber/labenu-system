import { nanoid } from 'nanoid';
import { Teacher } from '../../../classes';
import connection from '../../../connection';

async function transactionToCreateNewTeacher (teacherData: Teacher) {
	const teacherInfo = teacherData.getTeacherInformation();

	await connection.transaction(async (transaction: any) => {

		await transaction('teachers').insert({
			teacher_id: teacherInfo[0],
			teacher_name: teacherInfo[1],
			teacher_email: teacherInfo[2],
			teacher_birth_date: teacherInfo[3],
			teacher_class_id: teacherInfo[4]
		});

		const teacherSpecialties = teacherData.getSpecialtiesList();
		for(let index = 0; index < teacherSpecialties.length; index++){
			await connection('specialties').select('*').where({'specialty_name': teacherSpecialties[index]}).then(async (response: any) => {
				const teacherSpecialtyId = nanoid();
				if(response[0]?.specialty_id){
					await transaction('teacher_specialties').insert({
						teacher_specialties_id: teacherSpecialtyId,
						specialty_id: response[0].specialty_id,
						teacher_id: teacherInfo[0]
					});
					return;
				}
				const specialtyId = nanoid();
				await transaction('specialties').insert({
					specialty_id: specialtyId,
					specialty_name: teacherSpecialties[index]
				}).then(
					() => 
						transaction('teacher_specialties').insert({
							teacher_specialties_id: teacherSpecialtyId,
							specialty_id: specialtyId,
							teacher_id: teacherInfo[0]
						})
				);
			});}
	});
}

export default transactionToCreateNewTeacher;
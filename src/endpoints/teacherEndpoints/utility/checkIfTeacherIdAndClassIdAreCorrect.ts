import connection from '../../../connection';

async function checkIfTeacherIdAndClassIdAreCorrect (teacherId: string, classId: string) {

	const checkIfTheTeacherIdIsCorrect = connection('teachers').select('teacher_id').where({'teacher_id': teacherId}).then(async (response: any) => {
		if(!response[0]?.teacher_id){
			throw 'invalidTeacherId';
		}
		if(response[0]?.class_id === classId) throw 'teacherAlreadyInIndicatedClass';
		return;
	});

	const checkIfTheClassIdIsCorrect = connection('classes').select('class_id').where({'class_id': classId}).then(async (response: any) => {
		if(!response[0]?.class_id) throw 'invalidClassId';
		return;
	});

	return Promise.all([checkIfTheClassIdIsCorrect, checkIfTheTeacherIdIsCorrect]);
}

export default checkIfTeacherIdAndClassIdAreCorrect;
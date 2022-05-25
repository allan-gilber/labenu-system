import connection from '../../../connection';

async function checkIfTeacherIdAndClassIdAreCorrect (teacherId: string, classId: string) {
	let className: string;
	const checkIfTheTeacherIdIsCorrect = connection('teachers').select('teacher_id', 'teacher_class_id').where({'teacher_id': teacherId}).then(async (response: any) => {
		if(!response[0]?.teacher_id){
			throw 'invalidTeacherId';
		}
		console.log(response);
		if(response[0]?.teacher_class_id === classId) throw 'teacherAlreadyInIndicatedClass';
		return;
	});

	const checkIfTheClassIdIsCorrect = connection('classes').select('class_id', 'class_name').where({'class_id': classId}).then(async (response: any) => {
		if(!response[0]?.class_id) throw 'invalidClassId';
		className = response[0].class_name;
		return;
	});

	return Promise.all([checkIfTheClassIdIsCorrect, checkIfTheTeacherIdIsCorrect]).then(() => className);
}

export default checkIfTeacherIdAndClassIdAreCorrect;
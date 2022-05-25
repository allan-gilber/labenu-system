import connection from '../../../connection';

async function checkIfStudentAndClassIdsAreCorrect (studentId: string, classId: string) {
	let className: string;

	const checkIfTheStudentIdIsCorrect = connection('students').select('student_id', 'student_class_id').where({'student_id': studentId}).then(async (response: any) => {
		if(!response[0]?.student_id){
			throw 'invalidStudentId';
		}
		if(response[0]?.student_class_id === classId) throw 'studentAlreadyInIndicatedClass';
		return;
	});
	const checkIfTheClassIdIsCorrect = connection('classes').select('class_id', 'class_name').where({'class_id': classId}).then(async (response: any) => {
		if(!response[0]?.class_id) throw 'invalidClassId';
		className = response[0].class_name;
		return;
	});

	return Promise.all([checkIfTheClassIdIsCorrect, checkIfTheStudentIdIsCorrect]).then(() => className);
}

export default checkIfStudentAndClassIdsAreCorrect;
import connection from '../../../connection';

async function checkIfStudentAndClassIdsAreCorrect (studentId: string, classId: string) {

	const checkIfTheStudentIdIsCorrect = connection('students').select('student_id').where({'student_id': studentId}).then(async (response: any) => {
		if(!response[0]?.student_id){
			throw 'invalidStudentId';
		}
		if(response[0]?.class_id === classId) throw 'studentAlreadyInIndicatedClass';
		return;
	});

	const checkIfTheClassIdIsCorrect = connection('classes').select('class_id').where({'class_id': classId}).then(async (response: any) => {
		if(!response[0]?.class_id) throw 'invalidClassId';
		return;
	});

	return Promise.all([checkIfTheClassIdIsCorrect, checkIfTheStudentIdIsCorrect]);
}

export default checkIfStudentAndClassIdsAreCorrect;
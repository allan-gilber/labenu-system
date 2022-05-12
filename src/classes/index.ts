export class Class {
	classId: string;
	name: string;
	teachers: string;
	students: string;
	module: string;

	constructor(classId: string, name: string, teachers: string, students: string,  module: string){
		this.classId = classId;
		this.name = name;
		this.teachers = teachers;
		this.students = students;
		this.module = module;
	}
}

export class Student {
	studentId: string;
	name: string;
	email: string;
	turma_id: string;
	hobbies: string;

	constructor(studentId: string, name: string, email: string, turma_id: string,  hobbies: string){
		this.studentId = studentId;
		this.name = name;
		this.email = email;
		this.turma_id = turma_id;
		this.hobbies = hobbies;
	}
}

export class Teacher {
	teacherId: string;
	name: string;
	email: string;
	birthday: string;
	turma_id: string;
	specialty: string;

	constructor(teacherId: string, name: string, email: string, birthday: string, turma_id: string,  specialty: string){
		this.teacherId = teacherId;
		this.name = name;
		this.email = email;
		this.birthday = birthday;
		this.turma_id = turma_id;
		this.specialty = specialty;
	}
}
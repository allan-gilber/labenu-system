export class Class {
	class_id: string;
	name?: string;
	module = '0';

	constructor(class_id: string, name: string){
		this.class_id = class_id;
		this.name = name;
	}
}

export class Student {
	student_id: string;
	name: string;
	email: string;
	birth_date: string;
	class_id: string;
	hobbies: string;

	constructor(student_id: string, name: string, email: string,birth_date: string, class_id: string,  hobbies: string){
		this.student_id = student_id;
		this.name = name;
		this.email = email;
		this.class_id = class_id;
		this.hobbies = hobbies;
		this.birth_date = birth_date;
	}
}

export class Teacher {
	teacherId: string;
	name: string;
	email: string;
	birthday: string;
	class_id: string;
	specialty: string;

	constructor(teacherId: string, name: string, email: string, birthday: string, class_id: string,  specialty: string){
		this.teacherId = teacherId;
		this.name = name;
		this.email = email;
		this.birthday = birthday;
		this.class_id = class_id;
		this.specialty = specialty;
	}
}
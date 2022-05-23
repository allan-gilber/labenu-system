import connection from '../../connection';


function createHobbiesTable ():Promise<void> {
	return connection.schema.createTable('hobbies', (table) =>{
		table.string('hobby_id').primary();
		table.string('hobby_name').notNullable().unique();
	});
}

function createClassTable ():Promise<void> {
	return connection.schema.createTable('classes', (table) =>{
		table.string('class_id').primary();
		table.string('class_name').unique().notNullable();
		table.integer('class_module').notNullable().defaultTo(0).checkBetween([0,6]);
	});
}

function createSpecialtiesTable ():Promise<void> {
	return connection.schema.createTable('specialties', (table) =>{
		table.string('specialty_id').primary();
		table.string('specialty_name').unique().notNullable();
	});
}

function createTeachersTable ():Promise<void> {
	return connection.schema.createTable('teachers', (table) =>{
		table.string('teacher_id').primary();
		table.string('teacher_name').unique().notNullable();
		table.string('teacher_email').unique().notNullable();
		table.date('teacher_birth_date').notNullable();
		table.string('teacher_class_id').notNullable();
		table.foreign('teacher_class_id').references('class_id').inTable('classes');
	});
}

function createTeacherSpecialtiesTable ():Promise<void>{
	return connection.schema.createTable('teacher_specialties', (table) =>{
		table.string('teacher_specialties_id').primary();
		table.string('specialty_id').notNullable().unique();
		table.string('teacher_id').notNullable().unique();
		table.foreign('teacher_id').references('teacher_id').inTable('teachers');
	});
}

function createStudentsTable ():Promise<void>{
	return connection.schema.createTable('students', (table) =>{
		table.string('student_id').primary();
		table.string('student_name').notNullable().unique();
		table.string('student_email').notNullable().unique();
		table.string('student_birth_date').notNullable();
		table.string('class_id').notNullable();
		table.foreign('class_id').references('class_id').inTable('classes');
	});
}

function createStudentHobbiesTable ():Promise<void>{
	return connection.schema.createTable('student_hobbies', (table) =>{
		table.string('student_hobbies_id').primary();
		table.string('student_id').notNullable();
		table.string('hobby_id').notNullable();
		table.foreign('hobby_id').references('hobby_id').inTable('hobbies');
		table.foreign('student_id').references('student_id').inTable('students');
	});
}

export const createTables = async () => {
	console.clear();
	console.log('Starting migration of table schema...');
	await createHobbiesTable()
		.then(createClassTable)
		.then(createSpecialtiesTable)
		.then(createTeachersTable)
		.then(createTeacherSpecialtiesTable)
		.then(createStudentsTable)
		.then(createStudentHobbiesTable)
		.then(() => console.log('Tabelas criadas'));
};
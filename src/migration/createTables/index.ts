import connection from '../../connection';



export const createTables = () => connection.raw(`
	CREATE TABLE IF NOT EXISTS hobbies(
		hobby_id VARCHAR(255) PRIMARY KEY,
		hobby_name VARCHAR(255) NOT NULL UNIQUE
	);
	CREATE TABLE IF NOT EXISTS classes (
		class_id VARCHAR(255) PRIMARY KEY,
		class_name VARCHAR(255) NOT NULL,
		class_module INT NOT NULL
	);
	CREATE TABLE IF NOT EXISTS specialties (
		specialty_id VARCHAR(255) PRIMARY KEY,
		specialty_name VARCHAR(255) NOT NULL UNIQUE
	);
	CREATE TABLE IF NOT EXISTS teachers(
		teacher_id VARCHAR(255) PRIMARY KEY,
		teacher_name VARCHAR(255) NOT NULL,
		teacher_email VARCHAR(255) NOT NULL UNIQUE,
		teacher_birth_date DATE NOT NULL,
		teacher_class_id VARCHAR(255),
		FOREIGN KEY (teacher_class_id) REFERENCES classes (class_id)
	);

	CREATE TABLE IF NOT EXISTS teacher_specialties (
		teacher_specialties_id VARCHAR(255) PRIMARY KEY,
		specialty_id VARCHAR(255) NOT NULL,
		teacher_id VARCHAR(255) NOT NULL,
		FOREIGN KEY (teacher_id) REFERENCES teachers (teacher_id)
	);

	CREATE TABLE IF NOT EXISTS students (
		student_id VARCHAR(255) PRIMARY KEY,
		student_name VARCHAR(255) NOT NULL,
		student_email VARCHAR(255) NOT NULL UNIQUE,
		student_birth_date DATE NOT NULL,
		class_id VARCHAR(255),
		FOREIGN KEY (class_id) REFERENCES classes (class_id)
	);

	CREATE TABLE IF NOT EXISTS student_hobbies (
		student_hobbies_id VARCHAR(255) PRIMARY KEY,
		student_id VARCHAR(255) NOT NULL,
		hobby_id VARCHAR(255) NOT NULL,
		FOREIGN KEY (student_id) REFERENCES students (student_id),
		FOREIGN KEY (hobby_id) REFERENCES hobbies (hobby_id)
	);
`)
	.then(() => { console.log('Tabelas criadas'); });
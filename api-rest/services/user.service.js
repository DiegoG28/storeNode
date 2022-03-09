const faker = require('community-faker');

class UserService {

	constructor() {
		this.usuarios = [];
		this.respuesta = {};
	}

	//CRUD
	create(data) {
		const newUser = {
			id: faker.datatype.uuid(),
			...data
		}
		this.usuarios.push(newUser);
		return newUser;
	}

	find() {
		return this.usuarios;
	}

	findOne(id) {
		return this.usuarios.find(usuario => usuario.id === id);
	}

	update(id, changes) {
		const index = this.usuarios.findIndex(usuario => usuario.id === id);
		const user = this.usuarios[index];
		const changedUser = {
			...user,
			...changes
		};
		this.usuarios[index] = changedUser;
		return changedUser;
	}

	delete(id) {
		const index = this.usuarios.findIndex(usuario => usuario.id === id);
		const deletedUser = this.usuarios[index];
		this.usuarios.splice(index, 1);
		return deletedUser;
	}

	//Funciones de apoyo
	findName(nombre) {
		return this.usuarios.find(usuario => usuario.nombre === nombre);
	}

	findLast(apellido) {
		return this.usuarios.find(usuario => usuario.apellido === apellido);
	}

}

module.exports = UserService;

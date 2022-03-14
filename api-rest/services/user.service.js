const faker = require('community-faker');
const StatusCodeError = require('../modules/statusCodeError');

class UserService {

	constructor() {
		this.usuarios = [];
		this.respuesta = {};
	}

	//CRUD
	create(data) {
		if (this.findName(data.nombre) || this.findLast(data.apellido)) {
			throw new StatusCodeError(502, 'El usuario ya fue registrado');
		}
		const newUser = {
			id: faker.datatype.uuid(),
			...data
		}
		this.usuarios.push(newUser);
		return newUser;
	}

	find() {
		if (this.usuarios.length === 0) {
			throw new StatusCodeError(404, 'Datos no encontrados');
		}
		return this.usuarios;
	}

	update(id, changes) {
		this.findOne(id);
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
		this.findOne(id);
		const index = this.usuarios.findIndex(usuario => usuario.id === id);
		const deletedUser = this.usuarios[index];
		this.usuarios.splice(index, 1);
		return deletedUser;
	}

	//Funciones de apoyo
	findOne(id) {
		const user = this.usuarios.find(usuario => usuario.id === id);
		if (!user) {
			throw new StatusCodeError(404, 'Usuario no encontrado');
		}
		return user;
	}

	findName(nombre) {
		return this.usuarios.find(usuario => usuario.nombre === nombre);
	}

	findLast(apellido) {
		return this.usuarios.find(usuario => usuario.apellido === apellido);
	}

}

module.exports = UserService;

const faker = require('community-faker');

class UserService {

	constructor() {
		this.usuarios = [];
		this.respuesta = {};
	}

	//CRUD
	validate(data) {
		if (!data.nombre || !data.apellido) {
			return this.getMessage(400);
		} else {
			if (this.findName(data.nombre) || this.findLast(data.apellido)) {
				return this.getMessage(502);
			} else {
				this.create(data);
				return this.getMessage(200, data);
			}
		}
	}

	create(data) {
		const newUser = {
			id: faker.datatype.uuid(),
			...data
		}
		this.usuarios.push(newUser);
	}

	find() {
		return this.usuarios;
	}

	findOne(id) {
		return this.usuarios.find(usuario => usuario.id === id);
	}

	update(id, changes) {
		const index = this.usuarios.findIndex(usuario => usuario.id === id);
		if (index === -1) return this.getMessage(404);
		const usuario = this.usuarios[index];
		const usuarioActualizado = {
			...usuario,
			...changes
		};
		this.usuarios[index] = usuarioActualizado;
		return this.getMessage(200, usuarioActualizado);
	}

	delete(id) {
		const index = this.usuarios.findIndex(usuario => usuario.id === id);
		if (index === -1) return this.getMessage(404);
		this.usuarios.splice(index, 1);
	   return this.getMessage(200, id);
	}

	//Funciones de apoyo
	getMessage(code, data) {
		switch(code){
			case 400:
				this.respuesta = {
					error: true,
					codigo: 400,
					mensaje: 'El campo de nombre y apellido son necesarios'
				}
				break;
			case 502:
				this.respuesta = {
					error: true,
					codigo: 502,
					mensaje: 'El usuario ya fue registrado'
				}
				break;
			case 200:
				this.respuesta = {
					error: false,
					codigo: 200,
					mensaje: 'Operación exitosa',
					respuesta: data
				}
				break;
			case 404:
				this.respuesta = {
					error: true,
					codigo: 404,
					mensaje: 'Usuario no encontrado'
				}
				break;
		}
		return this.respuesta;
	}

	findName(nombre) {
		return this.usuarios.find(usuario => usuario.nombre === nombre);
	}

	findLast(apellido) {
		return this.usuarios.find(usuario => usuario.apellido === apellido);
	}
}

module.exports = UserService;
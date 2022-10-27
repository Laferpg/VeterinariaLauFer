import {Entity, model, property, hasMany} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Rol} from './rol.model';
import {Pedido} from './pedido.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  Telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @hasMany(() => Rol)
  rols: Rol[];

  @hasMany(() => Pedido)
  pedidos: Pedido[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;

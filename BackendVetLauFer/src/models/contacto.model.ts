import {Entity, model, property} from '@loopback/repository';

@model()
export class Contacto extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

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
  Mensaje: string;


  constructor(data?: Partial<Contacto>) {
    super(data);
  }
}

export interface ContactoRelations {
  // describe navigational properties here
}

export type ContactoWithRelations = Contacto & ContactoRelations;

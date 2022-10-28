import {Entity, model, property} from '@loopback/repository';

@model()
export class Contacto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;


  constructor(data?: Partial<Contacto>) {
    super(data);
  }
}

export interface ContactoRelations {
  // describe navigational properties here
}

export type ContactoWithRelations = Contacto & ContactoRelations;

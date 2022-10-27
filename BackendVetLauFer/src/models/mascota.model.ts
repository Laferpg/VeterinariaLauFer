import {Entity, model, property, hasOne} from '@loopback/repository';
import {HistoriaClinica} from './historia-clinica.model';

@model()
export class Mascota extends Entity {
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
  EstadoAfiliacion: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Especie: string;

  @property({
    type: 'string',
    required: true,
  })
  Sexo: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaNacimiento: string;

  @property({
    type: 'string',
  })
  usuarioId?: string;

  @hasOne(() => HistoriaClinica)
  historiaClinica: HistoriaClinica;

  @property({
    type: 'string',
  })
  planId?: string;

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;

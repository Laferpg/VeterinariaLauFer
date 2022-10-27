import {Entity, model, property} from '@loopback/repository';

@model()
export class HistoriaClinica extends Entity {
  @property({
    type: 'date',
    required: true,
  })
  FechaVisita: string;

  @property({
    type: 'string',
    required: true,
  })
  Temperatura: string;

  @property({
    type: 'number',
    required: true,
  })
  Peso: number;

  @property({
    type: 'number',
    required: true,
  })
  FrecRespiratoria: number;

  @property({
    type: 'number',
    required: true,
  })
  FrecCardiaca: number;


  constructor(data?: Partial<HistoriaClinica>) {
    super(data);
  }
}

export interface HistoriaClinicaRelations {
  // describe navigational properties here
}

export type HistoriaClinicaWithRelations = HistoriaClinica & HistoriaClinicaRelations;

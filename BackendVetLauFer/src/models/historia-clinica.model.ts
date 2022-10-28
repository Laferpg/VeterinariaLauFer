import {Entity, model, property} from '@loopback/repository';

@model()
export class HistoriaClinica extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaVisita: string;

  @property({
    type: 'string',
    required: true,
  })
  temperatura: string;

  @property({
    type: 'number',
    required: true,
  })
  peso: number;

  @property({
    type: 'string',
    required: true,
  })
  FrecRespiratoria: string;

  @property({
    type: 'string',
    required: true,
  })
  FrecCardiaca: string;


  constructor(data?: Partial<HistoriaClinica>) {
    super(data);
  }
}

export interface HistoriaClinicaRelations {
  // describe navigational properties here
}

export type HistoriaClinicaWithRelations = HistoriaClinica & HistoriaClinicaRelations;

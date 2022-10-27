import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, HistoriaClinica} from '../models';
import {HistoriaClinicaRepository} from './historia-clinica.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.Id,
  MascotaRelations
> {

  public readonly historiaClinica: HasOneRepositoryFactory<HistoriaClinica, typeof Mascota.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('HistoriaClinicaRepository') protected historiaClinicaRepositoryGetter: Getter<HistoriaClinicaRepository>,
  ) {
    super(Mascota, dataSource);
    this.historiaClinica = this.createHasOneRepositoryFactoryFor('historiaClinica', historiaClinicaRepositoryGetter);
    this.registerInclusionResolver('historiaClinica', this.historiaClinica.inclusionResolver);
  }
}

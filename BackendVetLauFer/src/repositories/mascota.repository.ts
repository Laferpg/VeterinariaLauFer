import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Usuario, Plan, HistoriaClinica} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {PlanRepository} from './plan.repository';
import {HistoriaClinicaRepository} from './historia-clinica.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Mascota.prototype.id>;

  public readonly plan: BelongsToAccessor<Plan, typeof Mascota.prototype.id>;

  public readonly historiaClinica: HasOneRepositoryFactory<HistoriaClinica, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('HistoriaClinicaRepository') protected historiaClinicaRepositoryGetter: Getter<HistoriaClinicaRepository>,
  ) {
    super(Mascota, dataSource);
    this.historiaClinica = this.createHasOneRepositoryFactoryFor('historiaClinica', historiaClinicaRepositoryGetter);
    this.registerInclusionResolver('historiaClinica', this.historiaClinica.inclusionResolver);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}

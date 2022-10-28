import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Mascota, ProductoServicio, Rol} from '../models';
import {MascotaRepository} from './mascota.repository';
import {ProductoServicioRepository} from './producto-servicio.repository';
import {RolRepository} from './rol.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Usuario.prototype.id>;

  public readonly productoServicios: HasManyRepositoryFactory<ProductoServicio, typeof Usuario.prototype.id>;

  public readonly rol: HasOneRepositoryFactory<Rol, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('ProductoServicioRepository') protected productoServicioRepositoryGetter: Getter<ProductoServicioRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Usuario, dataSource);
    this.rol = this.createHasOneRepositoryFactoryFor('rol', rolRepositoryGetter);
    this.registerInclusionResolver('rol', this.rol.inclusionResolver);
    this.productoServicios = this.createHasManyRepositoryFactoryFor('productoServicios', productoServicioRepositoryGetter,);
    this.registerInclusionResolver('productoServicios', this.productoServicios.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}

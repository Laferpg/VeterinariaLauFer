import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Mascota, Rol, Pedido} from '../models';
import {MascotaRepository} from './mascota.repository';
import {RolRepository} from './rol.repository';
import {PedidoRepository} from './pedido.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.Id,
  UsuarioRelations
> {

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Usuario.prototype.Id>;

  public readonly rols: HasManyRepositoryFactory<Rol, typeof Usuario.prototype.Id>;

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Usuario.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Usuario, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
    this.rols = this.createHasManyRepositoryFactoryFor('rols', rolRepositoryGetter,);
    this.registerInclusionResolver('rols', this.rols.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}

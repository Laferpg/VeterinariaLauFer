import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProductoServicio, ProductoServicioRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class ProductoServicioRepository extends DefaultCrudRepository<
  ProductoServicio,
  typeof ProductoServicio.prototype.id,
  ProductoServicioRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof ProductoServicio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(ProductoServicio, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Permisos, PermisosRelations} from '../models';

export class PermisosRepository extends DefaultCrudRepository<
  Permisos,
  typeof Permisos.prototype.Id,
  PermisosRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Permisos, dataSource);
  }
}

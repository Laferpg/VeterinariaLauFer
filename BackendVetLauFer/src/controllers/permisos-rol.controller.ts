import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Permisos,
  Rol,
} from '../models';
import {PermisosRepository} from '../repositories';

export class PermisosRolController {
  constructor(
    @repository(PermisosRepository)
    public permisosRepository: PermisosRepository,
  ) { }

  @get('/permisos/{id}/rol', {
    responses: {
      '200': {
        description: 'Rol belonging to Permisos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async getRol(
    @param.path.string('id') id: typeof Permisos.prototype.Id,
  ): Promise<Rol> {
    return this.permisosRepository.rol(id);
  }
}

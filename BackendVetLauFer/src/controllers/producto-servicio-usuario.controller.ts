import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProductoServicio,
  Usuario,
} from '../models';
import {ProductoServicioRepository} from '../repositories';

export class ProductoServicioUsuarioController {
  constructor(
    @repository(ProductoServicioRepository)
    public productoServicioRepository: ProductoServicioRepository,
  ) { }

  @get('/producto-servicios/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to ProductoServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof ProductoServicio.prototype.id,
  ): Promise<Usuario> {
    return this.productoServicioRepository.usuario(id);
  }
}

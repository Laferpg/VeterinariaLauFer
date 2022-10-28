import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  ProductoServicio,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioProductoServicioController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/producto-servicios', {
    responses: {
      '200': {
        description: 'Array of Usuario has many ProductoServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductoServicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProductoServicio>,
  ): Promise<ProductoServicio[]> {
    return this.usuarioRepository.productoServicios(id).find(filter);
  }

  @post('/usuarios/{id}/producto-servicios', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductoServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoServicio, {
            title: 'NewProductoServicioInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) productoServicio: Omit<ProductoServicio, 'id'>,
  ): Promise<ProductoServicio> {
    return this.usuarioRepository.productoServicios(id).create(productoServicio);
  }

  @patch('/usuarios/{id}/producto-servicios', {
    responses: {
      '200': {
        description: 'Usuario.ProductoServicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoServicio, {partial: true}),
        },
      },
    })
    productoServicio: Partial<ProductoServicio>,
    @param.query.object('where', getWhereSchemaFor(ProductoServicio)) where?: Where<ProductoServicio>,
  ): Promise<Count> {
    return this.usuarioRepository.productoServicios(id).patch(productoServicio, where);
  }

  @del('/usuarios/{id}/producto-servicios', {
    responses: {
      '200': {
        description: 'Usuario.ProductoServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductoServicio)) where?: Where<ProductoServicio>,
  ): Promise<Count> {
    return this.usuarioRepository.productoServicios(id).delete(where);
  }
}

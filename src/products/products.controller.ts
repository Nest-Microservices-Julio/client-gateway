import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from '../config';
import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'create_product' }, createProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'find_one' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );

    // try {
    //   const product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one' }, {id})
    //   );

    //   return product;
    // } catch (error) {
    //   throw new RpcException(error)
    // }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.productsClient.send({ cmd: 'remove_product' }, { id });
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() { ...updateProductDto}: UpdateProductDto,
  ) {
    console.log(id, updateProductDto);
    return this.productsClient.send({ cmd: 'update_product' }, { id, ...updateProductDto });
  }
}

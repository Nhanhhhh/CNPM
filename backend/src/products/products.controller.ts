import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService){}

    @Get('getAll')
    getAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get('types')
    getUniqueProductTypes(): Promise<string[]> {
        return this.productService.getUniqueProductTypes();
    }
    
    @Put('update')
    updateProduct(@Body() product: Product) {
        return this.productService.updateProduct(product);
    }

    @Delete(':id')
    deletePorduct(@Param() params) {
        return this.productService.deleteProduct(params.id);
    }

    @Post()
    createProduct(@Body() product: Product): Promise<Product> {
        return this.productService.createProduct(product);
    }

    @Get('get/:id') 
    getProductById(@Param() params) {
        return this.productService.getProductById(params.id);
    }

    @Get('getByName/:name') 
    getProductByName(@Param() params) {
        return this.productService.getProductByName(params.name);
    }
}

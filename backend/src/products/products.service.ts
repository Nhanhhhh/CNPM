import { BadRequestException, Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ) {}

    async findAll(): Promise<Product[]> {
        return await this.productRepo.find();
    }

    async updateProduct(product: Product): Promise<{updateResult: UpdateResult, dateTime: {createAt: Date, latestChange: Date}}> {
        const updateResult: UpdateResult = await this.productRepo.update(product.id, product);
        const date: Product = await this.productRepo.findOne({where: {id: product.id}, select: {createAt: true, latestChange: true}});
        const dateTime = {createAt: date.createAt, latestChange: date.latestChange};
        return {updateResult, dateTime};
    }

    async deleteProduct(id): Promise<DeleteResult> {
        return await this.productRepo.delete(id);
    }

    async getProductById(productId): Promise<Product> {
        return this.productRepo.findOneBy({id: productId});
    }

    async createProduct(product: Product): Promise<Product> {
        const findProductByName = await this.productRepo.findOneBy({name: product.name});

        if(findProductByName != null) {
            throw new BadRequestException("This product already exists.");
        }

        return await this.productRepo.save(product);
    }

    async getUniqueProductTypes(): Promise<string[]> {
        try {
            const uniqueTypes = await this.productRepo.createQueryBuilder('products')
            .select('DISTINCT type', 'type').getRawMany();

            return uniqueTypes.map(result => result.type);
        } catch (error) {
            console.error('Error retrieving unique product types:', error);
            throw new BadRequestException('Error retrieving unique product types');
        }
    }

}

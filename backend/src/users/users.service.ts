import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}
    
    async createUser(user: User): Promise<User> {
        const resultFindUserName = await this.findByUserName(user.userName);
        
        if(resultFindUserName != null) {
            throw new HttpException({ message: "This username has been used." }, HttpStatus.BAD_REQUEST);
        }

        if(user.userName == "admin") {
            user.role = 0;
        }

        const hashPassword = await hash(user.password, 10);
        user.password = hashPassword;
        user.role = 1;

        console.log(user);
        return await this.userRepo.save(user);
    }

    async findOrdersInUser(userId: number): Promise<User> {
        const res = await this.userRepo.createQueryBuilder("user")
            .leftJoin("user.order", "order")
            .select(["user", "order"])
            .where("user.id=:id", {id: userId})
            .getOne();

        console.log(res, userId);
        return res;
    }

    async findByUserName(username: any): Promise<User> {
        return this.userRepo.findOneBy({userName: username})
    }

    async findByUserId(userId): Promise<User> {
        return this.userRepo.findOneBy({id: userId});
    }

    async findAll(): Promise<User[]> {
        return await this.userRepo.find();
    }

    async updateUserInfor(user: User): Promise<UpdateResult> {
        return await this.userRepo.update(user.id, user);
    }

    async deleteUser(id): Promise<DeleteResult> {
        return await this.userRepo.delete(id);
    }

    async changePassWord(id: number, oldPassWord: string, newPassWord: string) {
        const user = await this.userRepo.findOneBy({id: id});
        if(user.password != oldPassWord) {
            throw new BadRequestException("The old password is incorrect.");
        }
        if(user.password == newPassWord) {
            throw new BadRequestException("New password can't be the same as your old password.");
        }
        return await this.userRepo.createQueryBuilder()
        .update(User)
        .set({ password: await hash(newPassWord, 10) })
        .where("user.id = :id", {id: id})
        .execute()
    }

    async findByOrderId(id): Promise<User> {
        const userFound = await this.userRepo.findOneBy({ order: id});
        if (userFound) {
            return userFound;
        } throw new BadRequestException("Not Found");
    }

    // async getSeller(): Promise<User[]> {
    //     const sellers = await this.userRepo.createQueryBuilder("user")
    //     .leftJoin("user.store", "store")
    //     .select(["user.name","store"])
    //     .where({role: 2})
    //     .getMany()
    //     return sellers;
    // }
}

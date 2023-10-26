import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}
    
    @Post()
    createUser(@Body() user: User): Promise<User> {
        return this.userService.createUser(user);
    }

    @Get()
    getAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id') 
    getUserById(@Param() params) {
        return this.userService.findByUserId(params.id);
    }

    @Put()
    updateUserInfor(@Body() user: User) {
        return this.userService.updateUserInfor(user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.userService.deleteUser(params.id);
    }

    @Put(':id')
    changePassWord(@Param('id', ParseIntPipe) id: number, @Body('oldPassWord') oldPassWord: string, @Body('newPassWord') newPassWord: string) {
        return this.userService.changePassWord(id, oldPassWord, newPassWord);
    }

    @Get('/order' + ':id')
    findByOrderId(@Param('id', ParseIntPipe) id: number ): Promise<User> {
        return this.userService.findByOrderId(id);
    }

    // @Get('/seller')
    // getSeller(): Promise<User[]> {
    //     return this.userService.getSeller();
    // }
}

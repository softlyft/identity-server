import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    const res = await createdUser.save();
    return res;
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async getUser(userId: string): Promise<User | undefined> {
    return this.userModel.findOne({ _id: userId });
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne( { email }).select('+hash +salt');
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne( { username });
  }
}

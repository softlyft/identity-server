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

  async updateUser(userId: string, payload: any): Promise<User | undefined> {
    const record = {};

    if (payload.firstName) record['firstName'] = payload.firstName;
    if (payload.lastName) record['lastName'] = payload.lastName;
    if (payload.gender) record['gender'] = payload.gender;
    if (payload.maritalStatus) record['maritalStatus'] = payload.maritalStatus;
    if (payload.birthDate) record['birthDate'] = new Date(payload.birthDate);
    // Check if telecom exists
   
    if (payload.telecom) {
      const telecom = {};

      if (payload.telecom.countryCode) telecom['countryCode'] = payload.telecom.countryCode;
      if (payload.telecom.number) telecom['number'] = payload.telecom.number;
      if (payload.telecom.use) telecom['use'] = payload.telecom.use;
     
      record['telecom'] = telecom;
    }

    // Check if address exists
    if (payload.address) {
      const address = {};
      if (payload.address.number) address['number'] = payload.address.number;
      if (payload.address.use) address['use'] = payload.address.use;
      if (payload.address.line) address['line'] = payload.address.line;
      if (payload.address.city) address['city'] = payload.address.city;
      if (payload.address.state) address['state'] = payload.address.state;
      if (payload.address.country) address['country'] = payload.address.country;
  
      record['address'] = address;
    }

    return this.userModel.findOneAndUpdate({ _id: userId }, record, { new: true });
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne( { email }).select('+hash +salt');
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne( { username });
  }
}

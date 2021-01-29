export class CreateUserDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly salt: string;
    readonly hash: string;
  }
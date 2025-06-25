export class User {
  id?: number;
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export interface UserDto {
  id?: number;
  firstName: string;
  username?: string;
  password?: string;
  lastName: string;
  gender: string;
  age: number;
  phone: string;
  dni: string;
  Bio: string;
  active?: boolean;
}

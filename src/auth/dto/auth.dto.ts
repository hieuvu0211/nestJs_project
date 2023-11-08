import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  userid: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  first_name: string;

  last_name: string;

  email: string;

  address: string;

  city: string;

  country: string;

  phone_number: string;

  created_at: string;

  updated_at: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  role: string;

  status: string;
}

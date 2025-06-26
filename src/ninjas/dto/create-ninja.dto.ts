import { IsEnum, MinLength } from "class-validator";

export class CreateNinjaDto {
    @MinLength(3)
    name:string;
    @IsEnum(['stars', 'Thunderbolt'], {message: 'Use proper weapon!'})
    weapon: 'stars' | 'Thunderbolt'
}

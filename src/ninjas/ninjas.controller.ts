import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { NotFoundError } from 'rxjs';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')

export class NinjasController {
    constructor(private readonly ninjasService: NinjasService){

    }

@Get()
getNinjas(@Query('weapon') weapon: 'stars'| 'Thunderbolt'){
    console.log(this.ninjasService.getNinjas(weapon))
    return this.ninjasService.getNinjas(weapon)
}
@Get(':id')
getNinja(@Param('id', ParseIntPipe) id:number){
    try{
        return this.ninjasService.getNinja(id)
    } catch (err) {
        throw new NotFoundException();
    }
    
}

@Post()
@UseGuards(BeltGuard)
createNinja( @Body( new ValidationPipe()) createNinjaDto: CreateNinjaDto){
    return this.ninjasService.createNinja(createNinjaDto)
}

@Put(':id')
updateNinja(@Param('id') id:string,@Body() updateNinjaDto: UpdateNinjaDto){
    return this.ninjasService.updateNinja(+id, updateNinjaDto)
}
@Delete(':id')
deleteNinja(@Param('id') id:string){
    return this.ninjasService.removeNinja(+id)
}
}



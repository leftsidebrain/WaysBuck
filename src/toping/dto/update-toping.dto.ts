import { PartialType } from '@nestjs/mapped-types';
import { CreateTopingDto } from './create-toping.dto';

export class UpdateTopingDto extends PartialType(CreateTopingDto) {}

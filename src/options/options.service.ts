import { Inject, Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { OptionRepository } from './option.repository';

@Injectable()
export class OptionsService {
  constructor(@Inject(OptionRepository) private repo: OptionRepository) {}
  create(createOptionDto: CreateOptionDto) {
    return this.repo.addOption(createOptionDto);
  }

  findAll() {
    return this.repo.getAllOptions();
  }

  findOne(id: string) {
    return this.repo.getOption(id);
  }

  update(id: string, updateOptionDto: UpdateOptionDto) {
    return this.repo.updateOption(id, updateOptionDto);
  }

  remove(id: string) {
    return this.repo.deleteOption(id);
  }
}

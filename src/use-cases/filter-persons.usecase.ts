import { IPersonRepository } from "../repositories/IPersonRespository";

type FilterPersonsUseCaseRequest = {
    documentNumber?: string;
    documentType?: string;
    filterText?: string;
}

export class FilterPersonsUseCase {
    constructor(private personRepository: IPersonRepository) { }

    async execute(filterOptions: FilterPersonsUseCaseRequest) {
        return await this.personRepository.filter(filterOptions);
    }
}

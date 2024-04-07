import { IPersonRepository } from "../repositories/IPersonRespository";

export class DeletePersonUseCase {
    constructor(private personRepository: IPersonRepository) { }

    async execute(id: number) {
        await this.personRepository.remove(id);
    }
}

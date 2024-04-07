import { IPersonRepository } from "../repositories/IPersonRespository";

type CreatePersonUseCaseRequest = {
    id?: number
    firstName?: string | null
    middleName?: string | null
    lastName: string
    secondLastName?: string | null
    birthDate: Date | string
    birthCountry: string
    gender: string
    maritalStatus: string
    documentType: string
    documentNumber: string
}

export class CreatePersonUseCase {
    constructor(private personRepository: IPersonRepository) {}



    async execute(person: CreatePersonUseCaseRequest) {

        const alreadExists = await this.personRepository.findByDocumentNumber(person.documentNumber);

        if(alreadExists){
            throw new Error("Person already exists");
        }
        
        await this.personRepository.save(person);
    }
}
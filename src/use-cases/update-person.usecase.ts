import { IPersonRepository } from "../repositories/IPersonRespository";

type UpdatePersonUseCaseRequest = {
    id: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    secondLastName?: string;
    birthDate?: Date | string;
    birthCountry?: string;
    gender?: string;
    maritalStatus?: string;
};

export class UpdatePersonUseCase {
    constructor(private personsRepository: IPersonRepository) {}

    async execute(data: UpdatePersonUseCaseRequest) {
        const person = await this.personsRepository.findOne(data.id);
        if (!person) {
            throw new Error("Person not found.");
        }
        await this.personsRepository.update(data.id, {
            birthCountry: data.birthCountry || person.birthCountry,
            birthDate: data.birthDate || person.birthDate,
            documentNumber: person.documentNumber,
            documentType: person.documentType,
            lastName: data.lastName || person.lastName,
            gender: data.gender || person.gender,
            maritalStatus: data.maritalStatus || person.maritalStatus,
            middleName: data.middleName || person.middleName,
            firstName: data.firstName || person.firstName,
            secondLastName: data.secondLastName || person.secondLastName,
            id: data.id,
        });
    }
}
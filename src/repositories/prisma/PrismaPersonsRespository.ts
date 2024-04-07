import { IPersonRepository } from "../IPersonRespository";
import { prisma } from "../../libs/prisma";
import { Prisma } from "@prisma/client";

export class PrismaPersonsRepository implements IPersonRepository{
    async findByDocumentNumber(documentNumber: string) {
        const person = await prisma.person.findUnique({
            where: {
                documentNumber: documentNumber
            }
        });

        return person;
    }
    async save(person: Prisma.PersonUncheckedCreateInput): Promise<void> {
        await prisma.person.create({
            data: person
        });
    }

    async findMany() {
        return await prisma.person.findMany();
    }
    async findOne(id: number) {
        const person =  await prisma.person.findUnique({
            where: {
                id: id
            }
        });

        if(!person){
            throw new Error("Person not found");
        }

        return person;
    }
    async update(id: number, person: Prisma.PersonUncheckedCreateInput): Promise<void> {

        await prisma.person.update({
            where: {
                id: id
            },
            data: person
        });


    }
    async remove(id: number): Promise<void> {
         await prisma.person.delete({
            where: {
                id: id
            }
        });
    }


    async filter(options: {
        documentNumber?: string;
        documentType?: string;
        filterText?: string;
    }) {
        const { documentNumber, documentType, filterText } = options;
        const personQuery = {
            where: {
                documentNumber: documentNumber || undefined,
                documentType: documentType || undefined,
                ...(filterText ? {
                    OR: [
                        { firstName: { contains: filterText, mode: 'insensitive' as const } },
                        { middleName: { contains: filterText, mode: 'insensitive' as const } },
                        { lastName: { contains: filterText, mode: 'insensitive' as const } },
                        { secondLastName: { contains: filterText, mode: 'insensitive' as const } },
                    ],
                } : {}),
            },
        };


        return await prisma.person.findMany(personQuery);
    }

}
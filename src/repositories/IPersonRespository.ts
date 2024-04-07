import { Person, Prisma } from "@prisma/client";

export interface IPersonRepository {
    save(person: Prisma.PersonUncheckedCreateInput): Promise<void>;
    findMany(): Promise<Person[]>;
    findOne(id: number): Promise<Person>;
    update(id: number, person: Prisma.PersonUncheckedCreateInput): Promise<void>;
    remove(id: number): Promise<void>;
    filter(options: {
        documentNumber?: string;
        documentType?: string;
        filterText?: string;
    }): Promise<Person[]>;
    findByDocumentNumber(documentNumber: string): Promise<Person | null>;
    }
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UpdatePersonUseCase } from "../use-cases/update-person.usecase";
import { PrismaPersonsRepository } from "../repositories/prisma/PrismaPersonsRespository";

export async function updatePersonController(request: FastifyRequest, reply:FastifyReply) {

    const createPersonParamSchema = z.object({
        id: z.coerce.number(),
    });

    const updatePersonBodySchema = z.object({
        id: z.number(),
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
        secondLastName: z.string().optional(),
        birthDate: z.union([z.date(), z.string()]).optional(),
        birthCountry: z.string().optional(),
    });

    try {
        const data = updatePersonBodySchema.parse(request.body);
        const { id } = createPersonParamSchema.parse(request.params);

        if (id !== data.id) {
            reply.code(400).send({ error: "Id in body does not match id in params." });
        }

        const updatePersonUseCase = new UpdatePersonUseCase(new PrismaPersonsRepository());
        await updatePersonUseCase.execute({
            id: data.id,
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            secondLastName: data.secondLastName,
            birthDate: data.birthDate,
            birthCountry: data.birthCountry,
        });
        reply.code(200).send({ message: "Person updated successfully." });
    } catch (error) {
        console.error(error);
        reply.code(400).send({ error: "Error updating person." });
    }

}


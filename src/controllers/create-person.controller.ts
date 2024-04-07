import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaPersonsRepository } from "../repositories/prisma/PrismaPersonsRespository";
import { CreatePersonUseCase } from "../use-cases/create-person.usecase";

export async function createPersonController(request: FastifyRequest, reply: FastifyReply) {

    const createPersonBodySchema = z.object({
        firstName: z.string(),
        middleName: z.string().optional(),
        lastName: z.string(),
        secondLastName: z.string().optional(),
        birthDate: z.union([z.date(), z.string()]),
        birthCountry: z.string(),
        gender: z.string(),
        maritalStatus: z.string(),
        documentType: z.string(),
        documentNumber: z.string(),
    });

    try {
        
        const data = createPersonBodySchema.parse(request.body);

        const createPersonUseCase = new CreatePersonUseCase(new PrismaPersonsRepository());
        await createPersonUseCase.execute(data);
        reply.code(201).send({ message: "Person created successfully." });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "Person already exists") {
                return reply.code(409).send({ error: "Person already exists." });
            }
            reply.code(400).send({
                error: error.message,
            });
        }

        if (error instanceof z.ZodError) {
            reply.code(400).send({
                error: error.errors,
            });
        }
    }
}

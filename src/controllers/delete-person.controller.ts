import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaPersonsRepository } from "../repositories/prisma/PrismaPersonsRespository";
import { DeletePersonUseCase } from "../use-cases/delete-person.usecase";

export function deletePersonController(request: FastifyRequest, reply: FastifyReply) {
    const deletePersonSchema = z.object({
        id: z.coerce.number(),
    });

    const { id } = deletePersonSchema.parse(request.params);

    const deletePersonUseCase = new DeletePersonUseCase(new PrismaPersonsRepository());

    deletePersonUseCase.execute(id)
        .then(() => {
            reply.code(200).send({ message: "Person successfully deleted." });
        })
        .catch(error => {
            console.error(error);
            reply.code(500).send({ error: "An error occurred while deleting the person." });
        });
}

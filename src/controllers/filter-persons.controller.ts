import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { FilterPersonsUseCase } from "../use-cases/filter-persons.usecase";
import { PrismaPersonsRepository } from "../repositories/prisma/PrismaPersonsRespository";

export function filterPersonsController(request: FastifyRequest, reply: FastifyReply) {
    const filterPersonsSchema = z.object({
        documentNumber: z.string().optional(),
        documentType: z.string().optional(),
        filterText: z.string().optional(),
    });

    let filterOptions;
    try {
        filterOptions = filterPersonsSchema.parse(request.query);
    } catch (error) {
        return reply.code(400).send(error);
    }

    const filterPersonsUseCase = new FilterPersonsUseCase(new PrismaPersonsRepository());

    filterPersonsUseCase.execute(filterOptions)
        .then(filteredPersons => {
            reply.code(200).send(filteredPersons);
        })
        .catch(error => {
            console.error(error);
            reply.code(500).send({ error: "An error occurred while filtering persons." });
        });
}

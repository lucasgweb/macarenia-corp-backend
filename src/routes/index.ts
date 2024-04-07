import { FastifyInstance } from "fastify";
import { createPersonController } from "../controllers/create-person.controller";
import { filterPersonsController } from "../controllers/filter-persons.controller";
import { updatePersonController } from "../controllers/update-person.controller";
import { deletePersonController } from "../controllers/delete-person.controller";

export async function routes(app: FastifyInstance) {
   app.post("/persons", createPersonController);
   app.get("/persons", filterPersonsController);
   app.put("/persons/:id", updatePersonController);
   app.delete("/persons/:id", deletePersonController);
}
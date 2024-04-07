import { app } from "./app";

const PORT = process.env.PORT || '4000';

app.listen({
    port: parseInt(PORT),
    host: '0.0.0.0'
}).then((address) => {
    console.log(`Server listening on ${address}`);
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
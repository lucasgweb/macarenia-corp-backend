import { app } from "./app";

app.listen({
    port: 3000,
    host: '0.0.0.0'
}).then((address) => {
    console.log(`Server listening on ${address}`);
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
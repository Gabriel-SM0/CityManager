import { KnexConection } from './server/database';
import { production } from './server/database/knex/Enviroment';
import { server } from './server/ServerFile';



const startServer = () => {
    server.listen(process.env.PORT  || 3333, () => {
        console.log(`Server is running on http://localhost: ${process.env.PORT || 3333}`);
    });
}


if(process.env.IS_LOCALHOST !== 'true') {
    KnexConection.migrate.latest().then(() => {

        KnexConection.seed.run().then(() => {
        startServer();
        }).catch(console.log);
    }).catch(console.log)
} else {
    startServer();
}


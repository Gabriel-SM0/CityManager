import { Knex } from './server/database';
import { production } from './server/database/knex/Enviroment';
import { server } from './server/ServerFile';



const startServer = () => {
    server.listen(process.env.PORT  || 3333, () => {
        console.log(`Server is running on http://localhost: ${process.env.PORT || 3333}`);
    });
}


if(process.env.IS_LOCALHOST !== 'true') {
    Knex.migrate.latest().then(() => {
        startServer();
    }).catch(console.log)
} else {
    startServer();
}


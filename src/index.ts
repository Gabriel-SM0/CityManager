import { server } from './server/ServerFile';

server.listen(process.env.PORT  || 3333, () => {
    console.log(`Server is running on http://localhost: ${process.env.PORT || 3333}`);
});


server.listen()
import { server } from './server/ServerFile';

server.listen(3333, () => {
    console.log('Server is running on http://localhost:3333');
});
import { copyFile } from 'node:fs';

copyFile('.env.example', '.env', (err) => {

    if(err) throw err;

    console.log('Archivo copiado exitosamente');

});

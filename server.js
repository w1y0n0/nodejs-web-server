// console.log('Halo, kita akan belajar membuat server');
const http = require('http');

/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 * 
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param response: objek yang digunakan untuk menanggapi permintaan
 */
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;
    // response.end('<h1>Halo HTTP Server!</h1>');
    // const method = request.method;
    const { method, url } = request;

    if (url === '/') {
        // TODO 2: logika respons bila url bernilai '/'
        if (method === 'GET') {
            // response bila client menggunakan GET
            response.end('<h1>Ini adalah homepage</h1>');
        } else {
            // response bila client tidak menggunakan GET
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
        }
    } else if (url === '/about') {
        // TODO 3: logika respons bila url bernilai '/about'
        if (method === 'GET') {
            // response bila client menggunakan GET
            response.end('<h1>Halo! Ini adalah halaman about</h1>');
        } else if (method === 'POST') {
            // response bila client menggunakan POST (dengan melampirkan data name pada body)
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
            });
        } else {
            // response bila client menggunakan selain GET dan POST
            response.end(`Halaman tidak dapat diakses menggunakan ${method} request`);
        }
    } else {
        // TODO 1: logika respons bila url bukan '/' atau '/about'
        response.end('<h1>Halaman tidak ditemukan!</h1>');
    }


    // if (method === 'GET') {
    //     response.end('<h1>Hello!</h1>');
    // }

    // if (method === 'POST') {
    //     // response.end('<h1>Hai!</h1>');
    //     let body = [];

    //     request.on('data', (chunk) => {
    //         body.push(chunk);
    //     });

    //     request.on('end', () => {
    //         body = Buffer.concat(body).toString();
    //         const { name } = JSON.parse(body);
    //         response.end(`<h1>Hai, ${name}!</h1>`);
    //     });
    // }

    // if (method === 'PUT') {
    //     response.end('<h1>Bonjour!</h1>');
    // }

    // if (method === 'DELETE') {
    //     response.end('<h1>Salam!</h1>');
    // }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});
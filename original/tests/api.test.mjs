import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../server.js';

describe('GET /health', () => {
    it('debería responder con estado 200 y status ok', async () => {
        const response = await request(app).get('/health');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: 'ok' });
    });
});

describe('GET /', () => {
    it('debería responder con estado 200 y contenido HTML', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/html/);
    });
});

describe('GET /producto/:slug', () => {

    it('debería mostrar un producto existente', async () => {
        // 👇 AQUÍ ESTÁ LA MAGIA: Cambiamos 'sofa-velvet-gris' por 'sala-concha'
        const response = await request(app)
            .get('/producto/sala-concha');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/html/);
    });

    it('debería responder 404 para un producto inexistente', async () => {
        const response = await request(app)
            .get('/producto/producto-que-no-existe');

        expect(response.status).toBe(404);
        expect(response.text).toBe('Producto no encontrado');
    });

});

describe('POST /api/prueba-validacion/:id', () => {

    it('debería aceptar datos válidos', async () => {
        const response = await request(app)
            .post('/api/prueba-validacion/1')
            .send({
                nombre: 'Sofa',
                cantidad: 2
            });

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            mensaje: 'Datos válidos.'
        });
    });

    it('debería rechazar datos inválidos', async () => {
        const response = await request(app)
            .post('/api/prueba-validacion/1')
            .send({
                nombre: '',
                cantidad: 0
            });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeInstanceOf(Array);
        expect(response.body.errors.length).toBeGreaterThan(0);
    });

    it('debería rechazar una cantidad negativa', async () => {
        const response = await request(app)
            .post('/api/prueba-validacion/1')
            .send({
                nombre: 'Sofa',
                cantidad: -1
            });

        expect(response.status).toBe(400);
    });

});
import {Router, Request, Response} from "express";
import { Pessoa, createPDF } from "../service/pdfCreator";

const routes = Router();

const olavo: Pessoa = {
    nome: 'Olavo',
    idade: 19,
    cpf: '785.568.158-65',
    amigos: [
        {
            nome: 'Julio'
        },
        {
            nome: 'Lara'
        }
    ],
    conta: {
        digV: 7,
        cod: 5465489496,
        value: 5000
    }
}

routes.get('/cliente', (request: Request, response: Response) => {
    return response.json(olavo);
});

routes.get('/report', (request: Request, response: Response) => {
    createPDF(olavo, response);
});


export { routes };
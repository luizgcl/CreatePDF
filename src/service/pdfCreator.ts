import { text } from "pdfkit";
import { Response } from "express";
import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

type Pessoa = {
    nome: string,
    cpf: string,
    idade: number,
    conta: {
        digV: number,
        cod: number,
        value: number
    }
}

export function createPDF( pessoaCliente: Pessoa, response: Response ) {
    const printer = new PDFPrinter({
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
        }
      });

      const docDef: TDocumentDefinitions = {
          defaultStyle: { font: 'Helvetica' },
          content: [
              {text: `Informações do Cliente:`, style: 'title'},
              {text: `Nome: ${pessoaCliente.nome}`},
              {text: `Idade: ${pessoaCliente.idade}`},
              {text: `CPF: ${pessoaCliente.cpf}`},
              {text: "\n\n"},
              {text: `Informações da conta bancária:`, style: 'title'},
              {text: `Núimero de conta: ${pessoaCliente.conta.cod}-${pessoaCliente.conta.digV}`},
              {text: `Saldo: R$ ${pessoaCliente.conta.value}`},
          ],
          styles: {
              title: {
                  bold: true,
                  fontSize: 14,
              }
          }
      }

      const pdfDoc = printer.createPdfKitDocument(docDef);

      const chunks:any[] = [];

      pdfDoc.on("data", (chunk) => {
        chunks.push(chunk);
      });
      pdfDoc.end();

      pdfDoc.on("end", () => {
        const result = Buffer.concat(chunks);
        response.end(result);
      });
}

export { Pessoa };
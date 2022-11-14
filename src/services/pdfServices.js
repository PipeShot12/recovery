import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { saveAs } from 'file-saver';
import myForm from '../assets/firmaCliente2.pdf'
import myCheck from '../assets/check.png'
import myFont from '../assets/font1.ttf'
import JSZip from 'jszip';
import {arrayEmail} from '../assets/arrayData'
import { decimales } from '../helpers/helpers';
const zip = new JSZip()
const folder = zip.folder('AFILIACIONES')

let pdfCreated = null
async function createDoc(obj) {
    const {
        direccion,
        celular,
        razonFinca,
        salario,
        fechaDeIngreso,
        ciudad,
        queFinca } = obj
        pdfCreated = await PDFDocument.create()
    const HelveticaBold = await pdfCreated.embedFont(StandardFonts.HelveticaBold)

    const page = pdfCreated.addPage()
    const { height } = page.getSize()

    const fontSize = 30
    page.drawText(`
    ${razonFinca}

    ${fechaDeIngreso}

    $${salario}

    ${ciudad}

    ${direccion}

    ${celular}
    \n\n\n\n\n\n\n\n\n
    ${queFinca}
    `, {
        x: 50,
        y: height - 4 * 50,
        size: fontSize,
        font: HelveticaBold,
        color: rgb(0, 0, 0),
    })

    const pdfBinary = await pdfCreated.save()
    folder.file(`PLANTILLA POSTERIOR.pdf`, pdfBinary)

}
async function generatePdf(obj, index, arrayLength) {
    const { primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        documento,
        direccion,
        dpto,
        celular,
        tipoDocu,
        direccionOf,
        dptoOf,
        ciudadOf,
        numeroOf,
        nitFinca,
        razonFinca,
        cargo,
        salario,
        fechaDeIngreso,
        ciudad,
        emailFinca } = obj
    const separarFecha = fechaDeIngreso.split('/')
    const check = myCheck
    const formUrl = myForm
    const font = myFont;
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
    const fontBytes = await fetch(font).then(res => res.arrayBuffer())
    const pngImageBytes = await fetch(check).then((res) => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(formPdfBytes)
    pdfDoc.registerFontkit(fontkit)
    const ArialMtBold = await pdfDoc.embedFont(fontBytes)
    const pngImage = await pdfDoc.embedPng(pngImageBytes)
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    const {width, height} = firstPage.getSize()   
    firstPage.drawImage(pngImage,{x: width - 463, y: height - 57,height:12, width: 12})
    firstPage.drawImage(pngImage,{x: width - 479, y: height - 97,height:12, width: 12})
    firstPage.drawImage(pngImage,{x: width - 269,y: height - 710,height:11, width: 11})
    firstPage.drawText(`${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}`,
    {
        x: width - 524,
        y: height - 167,
        size: 14,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })
    

    firstPage.drawText(`${tipoDocu === 'CC' && documento > 0 ? decimales(documento): documento }`,
    {
        x: width - 233,
        y: height - 142,
        size: 15,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })

    firstPage.drawText(`${direccion}`,
    {
        x: width - 532,
        y: height - 618,
        size: 13,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })
    firstPage.drawText(`${dpto}`,
    {
        x: width - 203,
        y: height - 618,
        size: 12,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })
    firstPage.drawText(`${ciudad}`,
    {
        x: width - 532,
        y: height - 641,
        size: 12,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })
    firstPage.drawText(`${celular}`,
    {
        x: width - 425,
        y: height - 641,
        size: 13,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })
    const email = arrayEmail.indexOf(emailFinca) < 0 ? undefined : emailFinca
  

    firstPage.drawText(`${email === undefined ? emailFinca : ''}`,
    {
        x: width - 311,
        y: height - 640,
        size: 8.2,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })
    firstPage.drawText(`${direccionOf}`,
    {
        x: width - 532,
        y: height - 664,
        size: 13,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })
    firstPage.drawText(`${ciudadOf}`,
    {
        x: width - 350,
        y: height - 664,
        size: 13,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })
    firstPage.drawText(`${dptoOf}`,
    {
        x: width - 261,
        y: height - 664,
        size: 13,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })
    firstPage.drawText(`${numeroOf}`,
    {
        x: width - 169,
        y: height - 664,
        size: 13,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })
    firstPage.drawText(`${cargo}`,
    {
        x: width - 532,
        y: height - 712,
        size: 13,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })
    firstPage.drawText(`${salario > 0 ? decimales(salario): ''}`,
    {
        x: width - 258,
        y: height - 712,
        size: 13,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })
    firstPage.drawText(`${separarFecha[2].slice(2)}`,
    {
        x: width - 162,
        y: height - 705,
        size: 10,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })
    firstPage.drawText(`${separarFecha[1]}`,
    {
        x: width - 134,
        y: height - 705,
        size: 10,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })
    firstPage.drawText(`${separarFecha[0]}`,
    {
        x: width - 107,
        y: height - 705,
        size: 10,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })
    firstPage.drawText(`${nitFinca}`,
    {
        x: width - 532,
        y: height - 736,
        size: 14,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })
    firstPage.drawText(`${razonFinca}`,
    {
        x: width - 354,
        y: height - 736,
        size: 14,
        font: ArialMtBold,
        color: rgb(0,0,0),
    })


    
    switch (tipoDocu) {
        case 'CC':
            firstPage.drawImage(pngImage,{x: width - 523, y: height - 134,height:13, width: 13})
            break;
        case 'CE':
            firstPage.drawImage(pngImage,{x: width - 496, y: height - 134, height:13, width: 13})
            break;
        case 'RCN':
            firstPage.drawImage(pngImage,{x: width - 469, y: height - 134, height:13, width: 13})
            break;
        case 'TI':
            firstPage.drawImage(pngImage,{x: width - 439, y: height - 134, height:13, width: 13})
            break;
        case 'PASAPORTE':
            firstPage.drawImage(pngImage,{x: width - 413, y: height - 134, height:13, width: 13})
            break;
        case 'PASAPORTE DP':
            firstPage.drawImage(pngImage,{x: width - 368, y: height - 134, height:13, width: 13})
            break;
        case 'PEP':
            firstPage.drawImage(pngImage,{x: width - 288, y: height - 134, height:13, width: 13})
            break;
        case 'PT':
            firstPage.drawImage(pngImage,{x: width - 261, y: height - 134, height:13, width: 13})
            break;
    
        default:
            break;
    }
    

    const pdfBytes = await pdfDoc.save()
    folder.file(`AFILIACION ${primerNombre} ${primerApellido}.pdf`, pdfBytes)
 
   if (index === (arrayLength - 1)) {
        await folder.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, "AFILIACIONES.zip");
            }).then(()=>{
                zip.remove('AFILIACIONES')
                pdfCreated = null
            })
    }
    
}


export {generatePdf, createDoc }
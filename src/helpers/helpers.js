import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { saveAs } from 'file-saver';
import myForm from '../form5.pdf'
import myFont from '../font1.ttf'
import JSZip from 'jszip';
const zip = new JSZip()



function reverseDate(str) {
    return str.split('/').reverse().join('/');
}
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
     zip.file(`PLANTILLA POSTERIOR.pdf`, pdfBinary)

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
        ciudad } = obj
    const separarFecha = fechaDeIngreso.split('/')
    const formUrl = myForm
    const font = myFont
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
    const fontBytes = await fetch(font).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(formPdfBytes)
    pdfDoc.registerFontkit(fontkit)
    const ArialMtBold = await pdfDoc.embedFont(fontBytes)
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    firstPage.setFont(ArialMtBold)
    const {width, height} = firstPage.getSize()
    const form = pdfDoc.getForm()
   

    const nombreCompleto = form.getTextField('NOMBRE COMPLETO')
    const checkbox1 = form.createCheckBox('CHECK')
    const nuemroDocumento = form.getTextField('NUMERO DOC')
    const dir = form.getTextField('DIRECCION')
    const ci = form.getTextField('CIUDAD')
    const dto = form.getTextField('DPTO')
    const numero = form.getTextField('CELULAR')
    const dirOf = form.getTextField('DIRECCION OF')
    const ciOf = form.getTextField('CIUDAD OF')
    const dtoOf = form.getTextField('DPTO OF')
    const telefonoOf = form.getTextField('TELEFONO OF')
    const cargoEmpleado = form.getTextField('CARGO')
    const salarioEmpleado = form.getTextField('SALARIO')
    const year = form.getTextField('YEAR')
    const mes = form.getTextField('MES')
    const dia = form.getTextField('DIA')
    const razon = form.getTextField('RAZON EMPRESA')
    const nit = form.getTextField('NIT EMPRESA')


    switch (tipoDocu) {
        case 'CC':
            checkbox1.addToPage(firstPage,({x: width - 513, y: height - 143, height:15, width: 15,borderWidth:undefined,backgroundColor:undefined,borderColor:undefined,}))
            checkbox1.check()
            checkbox1.enableReadOnly()
            break;
        case 'CE':
            checkbox1.addToPage(firstPage,({x: width - 488, y: height - 143, height:15, width: 15,borderWidth:undefined,backgroundColor:undefined,borderColor:undefined,}))
            checkbox1.check()
            break;
        case 'RCN':
            checkbox1.addToPage(firstPage,({x: width - 462, y: height - 143, height:15, width: 15,borderWidth:undefined,backgroundColor:undefined,borderColor:undefined,}))
            checkbox1.check()
            break;
        case 'TI':
            checkbox1.addToPage(firstPage,({x: width - 434, y: height - 143, height:15, width: 15,borderWidth:undefined,backgroundColor:undefined,borderColor:undefined,}))
            checkbox1.check()
            break;
        case 'PASAPORTE':
            checkbox1.addToPage(firstPage,({x: width - 410, y: height - 143, height:15, width: 15,borderWidth:undefined,backgroundColor:undefined,borderColor:undefined,}))
            checkbox1.check()
            break;
        case 'PASAPORTE DP':
            checkbox1.addToPage(firstPage,({x: width - 366, y: height - 143, height:15, width: 15,borderWidth:undefined,backgroundColor:undefined,borderColor:undefined,}))
            checkbox1.check()
            break;
        case 'PEP':
            checkbox1.addToPage(firstPage,({x: width - 290, y: height - 143, height:15, width: 15,borderWidth:undefined,backgroundColor:undefined,borderColor:undefined,}))
            checkbox1.check()
            break;
        case 'PT':
            checkbox1.addToPage(firstPage,({x: width - 266, y: height - 143, height:15, width: 15,borderWidth:undefined,backgroundColor:undefined,borderColor:undefined,}))
            checkbox1.check()
            break;
    
        default:
            break;
    }
    
    nombreCompleto.setText(`${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}`)
    nombreCompleto.updateAppearances(ArialMtBold)
    nuemroDocumento.setText(documento)
    nuemroDocumento.updateAppearances(ArialMtBold)
    dir.setText(direccion)
    dir.updateAppearances(ArialMtBold)
    ci.setText(ciudad)
    ci.updateAppearances(ArialMtBold)
    dto.setText(dpto)
    dto.updateAppearances(ArialMtBold)
    numero.setText(celular)
    numero.updateAppearances(ArialMtBold)
    dirOf.setText(direccionOf)
    dirOf.updateAppearances(ArialMtBold)
    ciOf.setText(ciudadOf)
    ciOf.updateAppearances(ArialMtBold)
    dtoOf.setText(dptoOf)
    dtoOf.updateAppearances(ArialMtBold)
    telefonoOf.setText(numeroOf)
    telefonoOf.updateAppearances(ArialMtBold)
    cargoEmpleado.setText(cargo)
    cargoEmpleado.updateAppearances(ArialMtBold)
    salarioEmpleado.setText(salario)
    salarioEmpleado.updateAppearances(ArialMtBold)
    year.setText(separarFecha[2].slice(2))
    year.updateAppearances(ArialMtBold)
    mes.setText(separarFecha[1])
    mes.updateAppearances(ArialMtBold)
    dia.setText(separarFecha[0])
    dia.updateAppearances(ArialMtBold)
    razon.setText(razonFinca)
    razon.updateAppearances(ArialMtBold)
    nit.setText(nitFinca)
    nit.updateAppearances(ArialMtBold)

    nombreCompleto.enableReadOnly()
    nuemroDocumento.enableReadOnly()
    dir.enableReadOnly()
    ci.enableReadOnly()
    dto.enableReadOnly()
    numero.enableReadOnly()
    dirOf.enableReadOnly()
    ciOf.enableReadOnly()
    dtoOf.enableReadOnly()
    telefonoOf.enableReadOnly()
    cargoEmpleado.enableReadOnly()
    salarioEmpleado.enableReadOnly()
    year.enableReadOnly()
    mes.enableReadOnly()
    dia.enableReadOnly()
    razon.enableReadOnly()
    nit.enableReadOnly()


    const pdfBytes = await pdfDoc.save()
    zip.file(`AFILIACION ${primerNombre} ${primerApellido}.pdf`, pdfBytes)
    if (index === (arrayLength - 1)) {
        await zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, "AFILIACIONES.zip");
            });
    }
}


export { reverseDate, generatePdf, createDoc }
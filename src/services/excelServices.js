import {decimales} from '../helpers/helpers'
import { saveAs } from 'file-saver';

const Excel = require('exceljs');
async function getAllLogsToExcel(array){
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("HOJA 1");
  worksheet.insertRow(1,{id:"pepe"})
const title = 'AFILIACIONES PROTECCION  MES DIA -------- #1CANTIDAD'
worksheet.getCell('A1').value = title;
// worksheet.getCell(`A1`).alignment = { horizontal: 'center' }
worksheet.getCell('A1').style = {font:{size:30,color:{argb:'0070C0'},bold:true},alignment:{horizontal:"center"}}
worksheet.mergeCells('A1:H1');
worksheet.addRow().values = ['ID','CEDULA','NOMBRE','EMPRESA','NIT','SALARIO','DIRECCION','TELEFONO','CORREO EMPRESA','FINCA','FECHA ING']
worksheet.columns = [
  { key: 'id', width: 8,style:{alignment:{horizontal:'left'}}},
  { key: 'documento', width: 20}, 
  { key: 'nombre', width: 32}, 
  { key: 'empresa', width: 25}, 
  { key: 'nit', width: 15}, 
  { key: 'salario', width: 15}, 
  { key: 'direccion', width: 32}, 
  { key: 'telefono', width: 12}, 
  { key: 'correo_empresa', width: 43}, 
  { key: 'finca', width: 15},
  { key: 'fecha_ing', width: 15}
];
const cell1 = worksheet.getCell('A2')
const cell2 = worksheet.getCell('B2')
const cell3 = worksheet.getCell('C2')
const cell4 = worksheet.getCell('D2')
const cell5 = worksheet.getCell('E2')
const cell6 = worksheet.getCell('F2')
const cell7 = worksheet.getCell('G2')
const cell8 = worksheet.getCell('H2')
const cell9 = worksheet.getCell('I2')
const cell10 = worksheet.getCell('J2')
const cell11 = worksheet.getCell('K2')
cell1.style = {font: {bold: true,color: {'argb': 'b81f1f'}}}
cell2.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
cell3.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
cell4.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
cell5.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
cell6.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
cell7.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
cell8.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
cell9.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
cell10.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
cell11.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
array.forEach(element => {
    const fechaRaw = element.fecha_ing
    const formatDate = fechaRaw.substr(0, fechaRaw.indexOf('T')).split("-").reverse().join('/')
    worksheet.addRow({id: element.id,
                    documento:element.documento,
                    nombre: element.nombre,
                    empresa:element.empresa,
                    nit:element.nit,
                    salario:decimales(element.salario),
                    direccion:element.direccion,
                    telefono:element.telefono,
                    'correo_empresa':element.correo_empresa,
                    finca:element.finca,
                    'fecha_ing':formatDate
                    });
});
const bla = await workbook.xlsx.writeBuffer()
saveAs(new Blob([bla]),'AFILIACIONES PROTECCION.xlsx')
};
async function getFilterLogsToExcel(array){
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("HOJA 1");
  worksheet.insertRow(1,{id:"pepe"})
const title = 'AFILIACIONES PROTECCION  MES DIA -------- #1CANTIDAD'
worksheet.getCell('A1').value = title;
// worksheet.getCell(`A1`).alignment = { horizontal: 'center' }
worksheet.getCell('A1').style = {font:{size:30,color:{argb:'0070C0'},bold:true},alignment:{horizontal:"center"}}
worksheet.mergeCells('A1:H1');
worksheet.addRow().values = ['CEDULA','NOMBRE','EMPRESA','NIT','SALARIO','DIRECCION','TELEFONO','CORREO EMPRESA','FINCA','FECHA ING']
worksheet.columns = [
  { key: 'documento', width: 20}, 
  { key: 'nombre', width: 32}, 
  { key: 'empresa', width: 25}, 
  { key: 'nit', width: 15}, 
  { key: 'salario', width: 15}, 
  { key: 'direccion', width: 32}, 
  { key: 'telefono', width: 12}, 
  { key: 'correo_empresa', width: 43}, 
  { key: 'finca', width: 15},
  { key: 'fecha_ing', width: 15}
];
const cell1 = worksheet.getCell('A2')
const cell2 = worksheet.getCell('B2')
const cell3 = worksheet.getCell('C2')
const cell4 = worksheet.getCell('D2')
const cell5 = worksheet.getCell('E2')
const cell6 = worksheet.getCell('F2')
const cell7 = worksheet.getCell('G2')
const cell8 = worksheet.getCell('H2')
const cell9 = worksheet.getCell('I2')
const cell10 = worksheet.getCell('J2')

cell1.style = {font: {bold: true,color: {'argb': 'b81f1f'}}}
cell2.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
cell3.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
cell4.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
cell5.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
cell6.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
cell7.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
cell8.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
cell9.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}
cell10.style = {font: {bold: true, color: {'argb': 'b81f1f'}}}

array.forEach(element => {
    const fechaRaw = element.fecha_ing
    const formatDate = fechaRaw.substr(0, fechaRaw.indexOf('T')).split("-").reverse().join('/')
    worksheet.addRow({
                    documento:element.documento,
                    nombre: element.nombre,
                    empresa:element.empresa,
                    nit:element.nit,
                    salario:decimales(element.salario),
                    direccion:element.direccion,
                    telefono:element.telefono,
                    'correo_empresa':element.correo_empresa,
                    finca:element.finca,
                    'fecha_ing':formatDate
                    });
});
const bla = await workbook.xlsx.writeBuffer()
saveAs(new Blob([bla]),'AFILIACIONES PROTECCION.xlsx')
};

export {getAllLogsToExcel,getFilterLogsToExcel}
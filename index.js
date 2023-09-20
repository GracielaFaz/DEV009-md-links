const path = require('node:path');
const fs = require('node:fs/promises');
const { checkExtention, checkAndConvertToAbsolute, readingFile} = require('./data');

const inputPath = 'C:\\Users\\graci\\OneDrive\\Documentos\\laboratoria-2023\\mdlinks\\DEV009-md-links\\READMEPRUEBA.md' // pa testear

const mdLinks = (path, options) => {
return new Promise((resolve, reject) =>{
 checkAndConvertToAbsolute(path)
 .then(absolutePath => {
    if(checkExtention(absolutePath)){
      console.log('el archivo es md')
      readingFile(absolutePath)
      .then(data => {
        console.log('se esta leyendo')
        resolve(data);
      })
    } else {
      reject('El archivo no es .md')
    }
 }) 
 .catch(err => {
    reject(err);
 })
})
};

mdLinks(inputPath) 
	.then((result) => {
		console.log(result);
	})
	.catch((error) => {
		console.error(error);
	})

module.exports = () => {
  // ...
};

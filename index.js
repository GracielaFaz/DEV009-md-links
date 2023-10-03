const path = require('node:path');
const fs = require('node:fs/promises');
const { checkExtention, checkAndConvertToAbsolute, readingFile, searchingForLinks, validateLinks} = require('./data');

const inputPath = 'C:\\Users\\graci\\OneDrive\\Documentos\\laboratoria-2023\\mdlinks\\DEV009-md-links\\README.md' // pa testear

const mdLinks = (path, validate) => {
return new Promise((resolve, reject) =>{
 checkAndConvertToAbsolute(path)
 .then(absolutePath => {
    if(checkExtention(absolutePath)){
      console.log('el archivo es md')
      readingFile(absolutePath)
      .then(data => {
        if(validate === true){
         searchingForLinks(data, absolutePath)
          .then((links) => {
            return validateLinks(links)
          })
          .then((validatedLinks) => {
            resolve(validatedLinks);
          }) 
          .catch((error) => {
            reject(error);
          })
          
        } else {
          resolve(searchingForLinks(data, absolutePath));
        }
        
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

mdLinks(inputPath, true) 
	.then((result) => {
		console.log(result);
	})
	.catch((error) => {
		console.error(error);
	})

module.exports = () => {
  // ...
};

const path = require('node:path');
const fs = require('node:fs/promises');
const { isAbsolute } = require('node:path')

const inputPath = 'README.js' // pa testear

const checkAndConvertToAbsolute = (inputPath) => {
  return fs.stat(inputPath)
		.then(() => {
			if(isAbsolute(inputPath)) {
				console.log('Tu ruta es absoluta')
				return inputPath;
			} else {
				console.log('Tu ruta era relativa pero se convirtio a absoluta')
				const absolutePath = path.resolve(inputPath);
				return absolutePath;
			}
		})
		.catch(() => {
			const err = 'ERROR' // agregar un if para los error.message de tipo ENOENT
			throw err;
		});
}

checkAndConvertToAbsolute(inputPath) // esto es solo para poder testear con node data.js
	.then((result) => {
		console.log(result);
	})
	.catch((error) => {
		console.error('ERROR');
	})

const checkExtention = (inputPath) => {
	if(path.extname(inputPath) === '.md'){
		return true;
	} else {
		return false;
	}
}


                                                                                                                                                                 

module.exports = { checkExtention, checkAndConvertToAbsolute };

// const isFileOrDir = (path) => {
//   return fs.stat(path)
//     .then((stats) => {
//       return stats.isFile();
//     })
//     .catch((err) => {
//       console.error('Error al validar la ruta', err)
//       return false
//     })
  
//   }; 
  
//   isFile(filePath)
//       .then((result) => {
//       console.log('La ruta ingresada es un archivo');
//     }); 

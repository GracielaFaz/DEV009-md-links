const path = require('node:path');
const fsPromise = require('node:fs/promises');
const fs = require('node:fs');
const { isAbsolute } = require('node:path')
const markdownIt = require('markdown-it');

const inputPath = 'C:\\Users\\graci\\OneDrive\\Documentos\\laboratoria-2023\\mdlinks\\DEV009-md-links\\READMEPRUEBA.md' // pa testear

const checkAndConvertToAbsolute = (inputPath) => {
	return new Promise((resolve, reject) => {
  fsPromise.stat(inputPath)
		.then(() => {
			if(isAbsolute(inputPath)) {
				console.log('Tu ruta es absoluta')
				resolve(inputPath);
			} else {
				console.log('Tu ruta era relativa pero se convirtio a absoluta')
				const absolutePath = path.resolve(inputPath);
				resolve(absolutePath);
			}
		})
		.catch(() => {
			const err = 'ERROR: la ruta no existe' // agregar un if para los error.message de tipo ENOENT
			reject(err);
		});
})
}

const checkExtention = (inputPath) => {
	if(path.extname(inputPath) === '.md'){
		return true;
	} else {
		return false;
	}
}

const readingFile = (inputPath) => {
	return new Promise((resolve, reject) => {
		fs.readFile(inputPath, 'utf8',(err, data) => {
			resolve(data);
		});
	})
}

const searchingForLinks = (inputPath) => {
	const fileContent = readingFile(inputPath)
	.then((fileContent) => {
		const md = new markdownIt();
		const tokens = md.parse(fileContent);
		console.log(tokens);
	})
	.catch((error) => {
		console.error('Error al encontrar los links', error)
	})
}

searchingForLinks(inputPath);

module.exports = { checkExtention, checkAndConvertToAbsolute, readingFile };

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

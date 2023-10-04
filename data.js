const path = require('node:path');
const fsPromise = require('node:fs/promises');
const fs = require('node:fs');
const { isAbsolute } = require('node:path')
const markdownIt = require('markdown-it');
const axios = require('axios');

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
			if(err){
				reject(err);
			} else {
				resolve(data);
			}
		});
	})
}

const searchingForLinks = (data, file) => {
		const md = new markdownIt();
		const tokens = md.parse(data, {});
		let iterador = false;
		const linksArray = [];
		for(const link of tokens){
			if(link.type === 'inline'){
				const inlineTokens = link.children;
				inlineTokens.forEach(token => {
					if(token.type === 'link_open'){
						iterador = true;
						linksArray.push({
							href: token.attrGet('href'),
							text: '',
							file: file,
						});
					} else if (iterador && token.type === 'text'){
						const pedacito = linksArray[linksArray.length -1]
						pedacito.text += token.content
					} else if (iterador && token.type === 'link_close') {
						iterador = false;
					}
				}) 
			}	
		}

		if (linksArray.length > 0) {
			console.log('Hay enlaces')
			return Promise.resolve(linksArray);
		} else {
			return Promise.reject(new Error("No hay enlaces en el documento."));
		}
}

const validateLinks = (linksArray) => {
		const result = linksArray.map((link) => {
			// console.log(link.href);
			return axios.get(link.href)
			.then((response) => {
				return {
					...link,
					status: response.status,
					statusText: response.statusText,
				};
				// console.log(response.status)
				// return(response.status);
				// if(response.status >= 400 && response.status <= 500 ){
				// 	return false;
				// } else {
				// 	return true;
				// }
			})
			.catch((error) => {
				return {
					...link,
					status: error.response ? error.response.status : 'No response',
					statusText: 'Fail',
				}
			});
		});

		return Promise.all(result);
}
 

module.exports = { checkExtention, checkAndConvertToAbsolute, readingFile, searchingForLinks, validateLinks };

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

const path = require('node:path');
const fs = require('node:fs/promises');



const checkAndConvertToAbsolute = (inputPath) => {
  return fs.stat(inputPath)
		.then(() => {
			if(path.isAbsolute(inputPath)) {
				return inputPath;
			} else {
				const absolutePath = path.resolve(inputPath);
				return absolutePath;
			}
		})
		.catch((error) => {
			throw error;
		});
}

const checkExstension = (inputPath) => {
	if(path.extname(inputPath) === '.md'){
		return true;
	}
}





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
  
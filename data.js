const path = require('node:path');
const fs = require('node:fs/promises');



// const pathExists = (path) => {
//   fs.stat(path)
// 		.then((result) => {
// 			console.log('The path exists');
// 		})
// 		.catch((error) => {
// 			if(error.code === 'ENOENT'){
// 				console.log('The path is not a file');
// 			} else {
// 				console.log('There was an error verifying the path')
// 			}
// 		})

// }

const checkAndConvertToAbsolute = (isnputPath) => {
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
  
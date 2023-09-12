path = require('node:fs');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if(fs.existsSync(path)){

    } else {
      reject('La ruta no existe')
    }
    
  });
};

const os = require('node:os')

console.log('uptime', os.uptime() / 60 / 60)

fs.stat(path, (err, stats) => {
    if (err) {
        console.error('Error al verificar el archivo o directorio:', err);
    } else {
      if (stats.isFile()) {
        console.log('Es un archivo.');
      } else if (stats.isDirectory()) {
        console.log('Es un directorio.');
      }
      // Puedes acceder a más información sobre el archivo/directorio en stats.
      console.log('Información detallada:', stats);
    }
  });
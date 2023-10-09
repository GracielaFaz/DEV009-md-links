const { mdLinks } = require('../');

const truePathExample = './READMEPRUEBA.md'
const inexistentPath = 'hola.txt'

const httpLinksArray = [
  {
    href: 'https://www.npmjs.com/package/markdown-it',
    text: 'Markdown-it',
    file: 'C:\\Users\\graci\\OneDrive\\Documentos\\laboratoria-2023\\mdlinks\\DEV009-md-links\\READMEPRUEBA.md',
    status: 200,
    statusText: 'OK'
  },
  {
    href: 'https://www.npmjs.com/package/jsdom',
    text: 'JSDOM',
    file: 'C:\\Users\\graci\\OneDrive\\Documentos\\laboratoria-2023\\mdlinks\\DEV009-md-links\\READMEPRUEBA.md',
    status: 200,
    statusText: 'OK'
  },
  {
    href: 'https://www.google.com/DEV009',
    text: '404',
    file: 'C:\\Users\\graci\\OneDrive\\Documentos\\laboratoria-2023\\mdlinks\\DEV009-md-links\\READMEPRUEBA.md',
    status: 404,
    statusText: 'Fail'
  }
]

const linksArray = [
    
  {
    href: 'https://www.npmjs.com/package/markdown-it',
    text: 'Markdown-it',
    file: 'C:\\Users\\graci\\OneDrive\\Documentos\\laboratoria-2023\\mdlinks\\DEV009-md-links\\READMEPRUEBA.md'
  },
  {
    href: 'https://www.npmjs.com/package/jsdom',
    text: 'JSDOM',
    file: 'C:\\Users\\graci\\OneDrive\\Documentos\\laboratoria-2023\\mdlinks\\DEV009-md-links\\READMEPRUEBA.md'
  },
  {
    href: 'https://www.google.com/DEV009',
    text: '404',
    file: 'C:\\Users\\graci\\OneDrive\\Documentos\\laboratoria-2023\\mdlinks\\DEV009-md-links\\READMEPRUEBA.md'
  },

]



describe('mdLinks', () => {

  it('Should return an array of links and its information', async () => {
    
    return mdLinks(truePathExample)
    .then(result => {
      expect(result).toEqual(linksArray);
    })
  })

  it('Should return an array of links with the http response when validate is true', async () => {
    return mdLinks(truePathExample, true)
    .then(result => {
      expect(result).toEqual(httpLinksArray);
    })
  })

  it('Should reject the promise when the file is not .md', async () => {
    try {
      await mdLinks(inexistentPath);
      fail('The promise should have been rejected')
    } catch (error) {
      expect(error).toBe('ERROR: la ruta no existe');
    }
       
  })

});
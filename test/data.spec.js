const { checkExtention, checkAndConvertToAbsolute} = require('../data');

const truePathExample = './README.md'
const falsePathExample = 'data.js'
const absolutePath = 'C:\\Users\\graci\\OneDrive\\Documentos\\laboratoria-2023\\mdlinks\\DEV009-md-links\\README.md'
const inexistentPath = 'hola.txt'


describe('checkExtention', () => {
    it('Should return true when the path extention is .md', () => {
      expect(checkExtention(truePathExample)).toBe(true);
    });
  
    it('Should return false when the path extention is not .md', () => {
       expect(checkExtention(falsePathExample)).toEqual(false);
    })
  
});

describe('checkAndConverToAbsolute', () => {
    it('Should return an absolute path when the inputPath is an absolute path', async () => {
        const result = await checkAndConvertToAbsolute(absolutePath);
        expect(result).toBe(absolutePath);
    })

    it('Should return an absolute path when the inputPath is relative', async () => {
        const result = await checkAndConvertToAbsolute(truePathExample);
        expect(result).toBe(absolutePath);
    })

    it('Should return an error when the path does not exist', async () => {
        try {
            await checkAndConvertToAbsolute(inexistentPath);
            throw new Error('It should throw an error');
        } catch (error) {
            expect(error).toBe('la ruta no existe');
        }
       
    })

})
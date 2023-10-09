const { checkExtention, checkAndConvertToAbsolute, readingFile, searchingForLinks, validateLinks} = require('../data');
const axios = require('axios');

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
    }, 10000);

    it('Should return an absolute path when the inputPath is relative', async () => {
        const result = await checkAndConvertToAbsolute(truePathExample);
        expect(result).toBe(absolutePath);
    }, 10000);

    it('Should return an error when the path does not exist', async () => {
        try {
            await checkAndConvertToAbsolute(inexistentPath);
            throw new Error('It should throw an error');
        } catch (err) {
            expect(err).toBe('ERROR: la ruta no existe');
        }
       
    }, 10000);

})

const unexistingFile = 'NOREADME.md'
const testFile = 'READMETEST.md';
const expectedContent = '[Markdown-it](https://www.npmjs.com/package/markdown-it)';

const testTextFile = 'READMETEXT.md';
const expectedTextContent = 'Plain text';


describe('readingFile', () => {
	it('Should return the file data when the inputPath exists', async () => {
		const data = await readingFile(testFile);
		expect(data).toEqual(expectedContent);
	});

	it('Should reject the promise when the inputPath does not exists', async () => {
		try {
			await readingFile(unexistingFile);
		} catch (err) {
			expect(err).toBe('Error reading the file');
		}
	});
})

describe('searchingForLinks', () => {
	it('Should return an array of links when the promise resolves', async () => {
		const result = await searchingForLinks(expectedContent, testFile);
	
		expect(result).toEqual([
			{
				href:'https://www.npmjs.com/package/markdown-it',
				text: 'Markdown-it',
				file: 'READMETEST.md',
			}
		]);
	});

	it('Should reject the promise when the function does not find links', async () => {
		try {
			await searchingForLinks(expectedTextContent, testTextFile);
			expect(true).toBe(false);
		} catch (error) {
			expect(error.message).toBe('No hay enlaces en el documento.');
		}
	});
})

jest.mock('axios');

const linksArray = [{
	href: 'https://google.com/',
	text: 'Google',
}]

const linksArray404 = [{
	href: 'https://google.com/DEV009',
	text: 'Google',
}]


describe('validateLinks', () => {
	it('Should resolve if the url is correct', async () =>{
		axios.get.mockResolvedValue({
			status: 200,
			statusText: 'OK',
		});

		const result = await validateLinks(linksArray);

		return expect(result).toEqual([{
			href: 'https://google.com/',
			text: 'Google',
			status: 200,
			statusText: 'OK',
		}])
	});

	it('Should reject when the url is not correct', async () => {
		axios.get.mockRejectedValue({
			status: 'No response',
			statusText: 'Fail',
		});

		await expect(validateLinks(linksArray404)).resolves.toEqual([{
			href: 'https://google.com/DEV009',
			text: 'Google',
			status: 'No response',
			statusText: 'Fail',
		}]);
	});
});

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
    })

    it('Should return an absolute path when the inputPath is relative', async () => {
        const result = await checkAndConvertToAbsolute(truePathExample);
        expect(result).toBe(absolutePath);
    })

    it('Should return an error when the path does not exist', async () => {
        try {
            await checkAndConvertToAbsolute(inexistentPath);
            throw new Error('It should throw an error');
        } catch (err) {
            expect(err).toBe('ERROR: la ruta no existe');
        }
       
    })

})

describe('readingFile', () => {
	
	const testFile = 'READMETEST.md';

	const expectedContent = '[Markdown-it](https://www.npmjs.com/package/markdown-it)';

	it('Should return the file data when the inputPath exists', async () => {
		const data = await readingFile(testFile)
		expect(data).toEqual(expectedContent);
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

describe('searchinForLinks')



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

// describe('searchingForLinks', () => {
// 	it('')
// })
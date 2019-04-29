let fs = require('fs');
let url = require('url');

describe('links file', () => {
    let fileName = './links.txt';

    test('exists', () => {
        let exists = fs.existsSync(fileName);
        expect(exists).toBe(true);
    });

    test('no duplicates', () => {
        let lines = fs.readFileSync(fileName).toString().split('\n');
        expect(new Set(lines).size).toBe(lines.length);
    });

    describe('links spec', () => {
        let lines = fs.readFileSync(fileName).toString().split('\n');
        lines.splice(lines.length - 1, 1);
        let links = lines.map(line => url.parse(line.trim()));

        test('all have a protocol', () => {
            let invalid = links.filter(link => link.protocol === null);
            for(let link of invalid) {
                console.log('invalid link:', link);
            }
            console.log('total invalid links:', invalid.length);

            expect(invalid.length).toBe(0);
        });
    });
});

describe('blacklist file', () => {
    let fileName = './blacklist.txt';

    test('exists', () => {
        let exists = fs.existsSync(fileName);
        expect(exists).toBe(true);
    });

    test('no duplicates', () => {
        let lines = fs.readFileSync(fileName).toString().split('\n');
        expect(new Set(lines).size).toBe(lines.length);
    });
});

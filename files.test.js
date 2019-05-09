let fs = require('fs');
let url = require('url');

let duplicates = (file, arr) => {
    let passed = true;
    let found = [];
    arr.forEach((line, i) => {
        if (!found.includes(line)) {
            arr.forEach((alt, j) => {
                if (alt === line && i !== j) {
                    console.log(`${file} > duplicate line: ${i} and ${j} (${line})`);
                    if (!found.includes(line)) {
                        found.push(line);
                    }
                    passed = false;
                }
            });
        }
    });
    return !passed;
}

let trim = (str) => {
    let result = str.trim();
    if (result.endsWith('/')) {
        result = result.substr(0, result.length - 1);
    }
    return result;
}

describe('links file', () => {
    let fileName = './links.txt';

    test('exists', () => {
        let exists = fs.existsSync(fileName);
        expect(exists).toBe(true);
    });

    test('no duplicates', () => {
        let lines = fs.readFileSync(fileName).toString().split('\n').map(trim);
        expect(duplicates(fileName, lines)).toBe(false);
    });

    describe('links spec', () => {
        let lines = fs.readFileSync(fileName).toString().split('\n').map(trim);
        lines.splice(lines.length - 1, 1);
        let links = lines.map(line => url.parse(line.trim()));

        test('all have a protocol', () => {
            let invalid = links.filter(link => link.protocol === null);
            for (let link of invalid) {
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
        let lines = fs.readFileSync(fileName).toString().split('\n').map(line => line.trim());
        expect(duplicates(fileName, lines)).toBe(false);
    });
});

import { convertToHTML, containsMarkdown } from './markdown-converter';

test('convertToHTML should convert markdown text to HTML - headers', () => {
    let markdownText = '# Heading 1';
    let expectedHTML = '<h1>Heading 1</h1>';

    let convertedHTML = convertToHTML(markdownText);

    expect(convertedHTML).toMatch(expectedHTML);

    markdownText = '## Heading 2';
    expectedHTML = '<h2>Heading 2</h2>';

    convertedHTML = convertToHTML(markdownText);

    expect(convertedHTML).toMatch(expectedHTML);

    markdownText = '### Heading 3';
    expectedHTML = '<h3>Heading 3</h3>';

    convertedHTML = convertToHTML(markdownText);

    expect(convertedHTML).toMatch(expectedHTML);

    markdownText = '#### Heading 4';
    expectedHTML = '<h4>Heading 4</h4>';

    convertedHTML = convertToHTML(markdownText);

    expect(convertedHTML).toMatch(expectedHTML);

    markdownText = '##### Heading 5';
    expectedHTML = '<h5>Heading 5</h5>';

    convertedHTML = convertToHTML(markdownText);

    expect(convertedHTML).toMatch(expectedHTML);

    markdownText = '###### Heading 6';
    expectedHTML = '<h6>Heading 6</h6>';

    convertedHTML = convertToHTML(markdownText);

    expect(convertedHTML).toMatch(expectedHTML);
});

test('convertToHTML should convert markdown text to HTML - invalid header', () => {
    let markdownText = '#Heading 1';
    let expectedHTML = '<p>#Heading 1</p>';

    let convertedHTML = convertToHTML(markdownText);

    expect(convertedHTML).toMatch(expectedHTML);
});

test('convertToHTML should convert markdown text to HTML - header larger than 6', () => {
    let markdownText = '################ Heading 1';
    let expectedHTML = '<h6>Heading 1</h6>';

    let convertedHTML = convertToHTML(markdownText);

    expect(convertedHTML).toMatch(expectedHTML);
});

test('convertToHTML should convert markdown text to HTML - blank line', () => {
    let markdownText = '';
    let expectedHTML = '\n';

    let convertedHTML = convertToHTML(markdownText);

    expect(convertedHTML).toMatch(expectedHTML);
});

test('convertToHTML should convert markdown text to HTML - links', () => {
    let markdownText = 'This is a [link](https://www.google.com)';
    let expectedHTML = '<p>This is a <a href="https://www.google.com">link</a></p>';

    let convertedHTML = convertToHTML(markdownText);

    expect(convertedHTML).toMatch(expectedHTML);
});

test('convertToHTML should convert markdown text to HTML - unhandled markdown', () => {
    let markdownText = '*This is italic*';
    let expectedHTML = '<p>*This is italic*</p>';

    let convertedHTML = convertToHTML(markdownText);

    expect(convertedHTML).toMatch(expectedHTML);
});

test('convertToHTML should convert markdown text to HTML - no markdown', () => {
    let markdownText = 'This is plain text';
    let expectedHTML = '<p>This is plain text</p>';

    let convertedHTML = convertToHTML(markdownText);

    expect(convertedHTML).toMatch(expectedHTML);
});
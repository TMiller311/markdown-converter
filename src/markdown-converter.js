export function convertToHTML(markdown) {
    const splitLines = markdown.split('\n');
    let convertedHTML = "";

    splitLines.forEach(element => {
        //ignore blank lines
        if (element === "") {
            convertedHTML += "\n";
            return;
        }
        
        if (containsMarkdown(element)) {
            if(isHeaderMarkdown(element)) {
                convertedHTML += convertHeaderMarkdown(element);    
            }
            else if (isLinkMarkdown(element)) {
                convertedHTML += "<p>" + convertLinkMarkdown(element) + "</p>";
            }
            else { //no match pattern found
                convertedHTML += "<p>" + element + "</p>";
            }
        }
        else {
            convertedHTML += "<p>" + element + "</p>";
        }

        convertedHTML += "\n";
    });
    
    return convertedHTML;
}

function containsMarkdown(line) {
    const markdownChars = ['#', '[', ']', '*'];
    return markdownChars.some(char => line.includes(char));
}

function isHeaderMarkdown(line) {
    return line.includes('#');
}

function isLinkMarkdown(line) {
    return line.includes('[') && line.includes(']') && line.includes('(') && line.includes(')');
}

function convertHeaderMarkdown(line) {
    //validate it is a proper header
    if (!line.toString().includes('# ')) {
        return "<p>" + line + "</p>";
    }

    let headerLevel = line.split(' ')[0].length;

    let headerText = line.substring(headerLevel + 1);
    
    if(headerLevel > 6) {
        headerText = line.substring(headerLevel + 1); //remove all extra #s
        headerLevel = 6;
    }
    
    return "<h" + headerLevel + ">" + headerText + "</h" + headerLevel + ">";
}

function convertLinkMarkdown(line) {
    const prependText = line.substring(0, line.indexOf('['));
    const appendText = line.substring(line.indexOf(')') + 1);
    const linkText = line.substring(line.indexOf('[') + 1, line.indexOf(']'));
    const linkURL = line.substring(line.indexOf('(') + 1, line.indexOf(')'));
    
    return prependText + "<a href=\"" + linkURL + "\">" + linkText + "</a>" + appendText;
}
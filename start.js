var babel = require('babel-core');
var createFile = require('create-file');
var pathToFile = './index.html'
var content = `
    <html>
    <body>
        <h1>Hello</h1>
    </body>
    </html>
`;

createFile(pathToFile, content, function(err){
    console.log(err);
});



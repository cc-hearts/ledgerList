const fs = require('fs');

const read = fs.readFileSync('/Users/heart/Desktop/i/react/umi-react-demo/distZip/dist.tgz');

fs.writeFileSync('./dist.tgz', read);

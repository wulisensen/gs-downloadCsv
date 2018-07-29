# gs-downloadCsv [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE)
make a csv file to download in browser

you can use it in ES6:

```javascript
import download from 'gs-downloadCsv';

const data = [{a:3,b:4,c:'1'},{a:1, b:2,c:'0'}];
const head = {
    a: 'name',
    b: 'status',
};
const enumobj = {
    c: {
        '0': 'on',
        '1': 'off',
    },
};
const filename = 'filename';

downloadCsv({ data: newData, head, enumobj, filename });
```

then you can download csv file

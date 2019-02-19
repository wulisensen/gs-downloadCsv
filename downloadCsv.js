/**
 *  生成表头
 * @param {object} param
 * @param {object} param.record
 * @param {object} param.head
 * @return {object} result
 * @return {object} result.keylist key的集合
 * @return {object} result.valueList 转义后的值，用来将表头转成其他语言
 */
function getHeader({ record, head }) {
    const keyList = [];
    const valueList = [];
    for (const key in head) {
        const ele = head[key];
        keyList.push(key);
        valueList.push(ele);
    }
    return {
        keyList,
        valueList,
    };
}
function format({ data, head, enumobj }) {
    const { keyList, valueList } = getHeader({ record: data[0], head });
    let str = valueList.join(',') + '\n';
    data.forEach(line => {
        const list = [];
        keyList.map(key => {
            if (key in line) {
                if (
                    typeof enumobj !== 'undefined' &&
                    typeof enumobj[key] !== 'undefined' &&
                    typeof enumobj[key][line[key]] !== 'undefined'
                ) {
                    list.push(enumobj[key][line[key]]);
                } else {
                    list.push(line[key]);
                }
            } else {
                list.push('');
            }
        });
        str += list.join(',');
        str += '\n';
    });
    return str;
}

/**
 * 将数组生成csv导出下载
 * @param {array} data 要生成csv的数组
 * @param {object} head 表头 require
 * @param {object} enumobj 内容的注解 not-require
 * @param {string} filename 文件名 not-require
 */
function download({ data, head, enumobj, filename }) {
    // 加Bom头兼容中文
    const formatData = '\ufeff' + format({ data, head, enumobj });

    const blob = new Blob([formatData], { type: 'text/csv,charset=UTF-8' });

    const csvUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = csvUrl;

    if (typeof filename !== 'undefined') {
        a.download = filename;
    }

    a.click();
}

module.exports = download;

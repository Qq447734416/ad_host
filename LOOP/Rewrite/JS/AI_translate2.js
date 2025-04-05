//AI翻译响应体修改

let body = JSON.parse($response.body);
let str = body.choices[0].message.content
let cleanedStr = str.replace(/[{}\n\\]/g， '');
body = {
    "翻译结果": cleanedStr
};
$done({body:JSON.stringify(body)});

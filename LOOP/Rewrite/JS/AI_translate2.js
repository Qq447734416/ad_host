//AI翻译响应体修改

let body = JSON.parse($response.body);
body = {
    "翻译结果": body.choices[0].message.content
};
$done({body:JSON.stringify(body)});

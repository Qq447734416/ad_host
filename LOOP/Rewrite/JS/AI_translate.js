// 翻译编程词汇


let body = JSON.parse($request.body);
let data = body.data;

// 使用模板字符串正确拼接内容
let new_body = {
    "model": "qwen-turbo",
    "messages": [
        {
            "role": "system",
            "content": "You are a helpful assistant."
        },
        {
            "role": "user",
            "content": `请输出严格的JSON字符串来解决以下问题：将以下内容翻译为中文，翻译语境为编程领域与计算机领域，你的回答仅有翻译结果，其他一概不要。以下为你要翻译的内容：${data}`
        }
    ],
    "response_format": {
        "type": "json_object"
    }
};

// 将新构建的 JSON 对象转换为字符串并返回
$done({body: JSON.stringify(new_body)});

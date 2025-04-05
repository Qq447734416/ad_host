// 翻译编程词汇


let body = JSON.parse($request.body);
let data = body.data;

// 使用模板字符串正确拼接内容
let new_body = {
    "model": "qwen-turbo",
    "messages": [
        {
            "role": "system",
            "content": "你是一个擅长翻译的翻译助手，在翻译时，你严格遵循以下规定：1.你的输出结果都为严格的JSON字符串，同时不要使用转义字符；2.你所翻译的所有词语的语境都与编程、计算机有关；3.你的回答要有词语的中文翻译和相关背景；4.你的回答应该简洁精炼。"
        },
        {
            "role": "user",
            "content": `以下为你要翻译的内容：${data}`
        }
    ],
    "response_format": {
        "type": "json_object"
    }
};

// 将新构建的 JSON 对象转换为字符串并返回
$done({body: JSON.stringify(new_body)});

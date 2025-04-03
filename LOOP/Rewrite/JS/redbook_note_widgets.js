//去除小红书笔记详情页面的小组件

let body = $response.body;
if(body){
    try{
        body = JSON.parse(body);
        body.data.widgets_ndb = {};
    }catch(e){
    //发送通知
    let title = "脚本运行错误";
    let content = "修改请求体失败，脚本：" + $script.name;
    $notification.post(title, "", content);
    console.log(`修改请求体失败, 时间： ${$script.startTime}, 错误：${e}`);
    //返回原始数据
    $done({});
    }
}else{
    //发送本地通知
    let title = "脚本运行错误";
    let content = "响应体为空，脚本：" + $script.name;
    $notification.post(title, "", content);
    console.log(`错误，响应体为空, 时间：${$script.startTime}`);
    //返回原始数据
    $done({});
}

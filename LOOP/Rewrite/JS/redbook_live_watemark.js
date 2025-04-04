//去除小红书live水印

let body = $response.body;
if(body){
    try{
        body = JSON.parse(body);
        let loop_index = 0;
        for(const item of body.data.datas){
            try{
                item.url = $persistentStore.read(`${item.file_id}`);
                console.log("替换URL成功，索引：" + loop_index);
            }catch(e){
                console.log("替换url失败，索引：" + loop_index);
                
            }
            loop_index = loop_index + 1;}
        $done({body:JSON.stringify(body)});
    }catch(e){
        console.log("修改响应体失败：" + e);
        //发送一个本地通知
        let title = "脚本运行错误";
        let subtitle = "";
        let content = "响应体不为json格式或修改响应体数时出现错误，脚本名称：" + $script.name;
        $notification.post(title ,subtitle, content);
        $done({});
    }
}else{
    //响应体为空
    console.log("响应体内容为空");
    //发送一个本地通知
    let title = "脚本运行错误";
    let subtitle = "";
    let content = "响应体为空，脚本名称：" + $script.name;
    $notification.post(title ,subtitle, content);
    $done({});
}

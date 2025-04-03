//去除小红书live水印

let body = $response.body;
if(body){
    try{
        body = JSON.parse(body);
        let live_index = 0;
        for(const item of body.data.datas)
            try{
                item.url = $persistentStore.read(`${live_index}`)
            }catch(e){
                console.log("读取url失败" + live_index);
                
            }
            live_index = live_index + 1;
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

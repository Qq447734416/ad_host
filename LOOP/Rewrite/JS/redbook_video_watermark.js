//强制保存小红书视频
//去除视频水印


let body = $response.body;
if(body){
    try{
        let new_dict = {
            "disable_save": false,
            "disable_weibo_cover": true,
            "disable_watermark": true
        };
        body = JSON.parse(body);
        for(const item of body.data){
            item.media_save_config = new_dict;
        }
        console.log("修改成功");
        $done({body:JSON.stringify(body)});
    }catch(e){
        console.log("修改请求体失败" + e );
        //发送通知
        let title = "脚本运行失败";
        let subtitle = "";
        let content = "修改请求体失败,脚本：" + $script.name;
        $notification.post(title, subtitle, content);
        //返回原始数据
        $done({});
    }
}else{
    console.log("响应体为空");
    let title = "脚本运行错误";
    let subtitle = "";
    let content = "响应体为空，脚本：" + $script.name;
    $notification.post(title, subtitle, content);
    //返回原始数据
    $done({});
}

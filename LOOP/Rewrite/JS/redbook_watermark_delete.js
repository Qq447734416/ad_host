//去除小红书笔记水印
//强制允许保存

body = $response.body;
if(body){
  //尝试修改
  try{
    //转换格式
    body = JSON.parse(body);
    //修改
    body.data.note_list.media_save_config.disable_save = false;
    body.data.note_list.media_save_config.disable_watermark = true;
    body.data.note_list.media_save_config.disable_weibo_cover = true;
    //转换格式
    body = JSON.stringify(body);
    console.log("修改成功");
    $done({body:body});
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

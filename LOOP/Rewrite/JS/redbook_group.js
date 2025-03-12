//删除小红书消息页面群聊文字 


body = $response.body;
//如果响应体存在
if(body){
  try{
    //转换格式
    body = JSON.parse(body);
    //赋值为一个空字符串
    body.data.plus_sign.entrance.desc = "";
    body.data.plus_sign.entrance.descCn = "";
    //返回修改后的数据
    body = JSON.stringify(body);
    console.log("修改成功");
    $done({body:body});
  }catch(e){
    console.log("修改响应体失败：", e);
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

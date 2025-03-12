//删除小红书消息页面群聊文字


body = $response.body;
//如果响应体存在
if(body){
  //转换格式
  try{
    body = JSON.parse(body);
    //赋值为一个空字符串
    body.data.plus_sign.entrance.desc = "";
    body.data.plus_sign.entrance.descCn = "";
    //转换格式
    body = JSON.stringify(body);

    $done({body:body});
  }catch(e){
    console.log("修改响应体失败：", e);
    $done({});
  }
  
  
}else{
  //响应体为空
  console.log("响应体内容为空");
  $done({});
}

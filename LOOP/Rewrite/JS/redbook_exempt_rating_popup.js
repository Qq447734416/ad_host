//屏蔽小红书app商店评分弹窗

let body = $response.body;

//如果响应体不为空
if(body){
  try{
    body = JSON.parse(body);
    body.data.exempt_rating_popup = true;
    body = JSON.stringify(body);
    done({body:body});
  }catch(e){
    console.log("修改失败：", e);
    let title = "脚本运行错误";
    let subtitle = "";
    let content = "响应体不为json格式或修改响应体数时出现错误，脚本名称：" + $script.name;
    $notification.post(title ,subtitle, content);
    $done({});
  }
}else{
  console.log("响应体内容为空");
    let title = "脚本运行错误";
    let subtitle = "";
    let content = "响应体为空，脚本名称：" + $script.name;
    $notification.post(title ,subtitle, content);
    $done({});
}

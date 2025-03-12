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
    $notification.post("修改响应体失败","脚本名称：","content")
    $done({});
  }
}else{
  console.log("响应体内容为空");
  $done({});
}

//屏蔽小红书app商店评分弹窗

let body = $response.body;

//如果响应体不为空
if(body){
  try{
    body = JSON.parse(body);
    body.data.exempt_rating_popup = true;
  }catch(e){
    console.error("修改失败：", e);
    $done();
  }
}else{
  console.error("响应体内容为空");
  $done();
}

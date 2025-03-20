//去除小红书搜索信息流推广


let body = $response.body;
//响应体存在
if(body){
  try{
  body = JSON.parse(body);
  body.data.items = body.data.items.filter(item => item.model_type === 'note');
  //若修改成功,返回修改后的数据
  if(body.data.items){
    body = JSON.stringify(body);
    console.log("修改成功");
    $done({body:body});
  }else{  //返回原始数据
    console.log("错误，修改后的数组为空");
    $notification.post("脚本运行错误", "", $script.name);
    $done({});
  }
}catch(e){  //返回原始数据
    console.log("修改数据时出现错误：" + e);
    $notification.post("脚本运行错误", "", $script.name);
    $done({});
}
}else{  //返回原始数据
  console.log("错误，响应体为空");
  $notification.post("脚本运行错误", "", $script.name);
  $done({});
}

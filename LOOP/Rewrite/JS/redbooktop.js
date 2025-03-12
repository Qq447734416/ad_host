//小红书顶栏精简


//获取原始响应体内容
let body = $response.body
//如果响应体存在则尝试转化为JS对象并修改
if(body){
  try{
    body = JSON.parse(body);
    //查找需要删除的项的索引
    let live_index = body.data.categories.findIndex(item => item.name === '直播');
    let playlet_index = body.data.categories.findIndex(item => item.name === '短剧');
    let man_index = body.data.categories.findIndex(item => item.name === '男士理容');
    
    //在成功找到索引时，删除原数组元素
    if(live_index !== -1){
      body.data.categories.splice(live_index, 1);
    }else{
      console.log("未找到“直播”tab，删除失败");
    }
    if(playlet_index !== -1){
      //数组变更，重新计算索引
      playlet_index = body.data.categories.findIndex(item => item.name === '短剧');
      body.data.categories.splice(playlet_index, 1);
    }else{
      console.log("未找到“短剧”tab，删除失败");
    }
    if(man_index !== -1){
      //数组变更，重新计算索引
      man_index = body.data.categories.findIndex(item => item.name === '男士理容');
      body.data.categories.splice(man_index, 1);
    }else{
      console.log("未找到“男士理容”tab，删除失败");
    }   
    //如果三个tab都未找到，则直接返回原始内容
    if((live_index == -1) && (playlet_index == -1) && (man_index == -1)){
      console.log("未成功修改任何一个tab，将返回原始内容");
      $done({body:$response.body});
    }
    //返回修改后的响应体
    body = JSON.stringify(body);
    $done({body:body});
  }catch(e){
    console.error("修改响应体失败：",e );
    //返回原始内容
    $done({});
  }
  
  
}else{
  console.log("错误，响应体内容为空");
  //返回原始内容
  $done({});
}






















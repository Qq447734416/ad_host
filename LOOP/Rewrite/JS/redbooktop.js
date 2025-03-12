//小红书顶栏精简


//获取原始响应体内容
let body = $response.body;
//如果响应体存在则尝试转化为JS对象并修改
if(body){
  try{
    body = JSON.parse(body);
    //查找需要删除的项的索引
    let live_index = body.data.categories.findIndex(item => item.name === '直播');
    let playlet_index = body.data.categories.findIndex(item => item.name === '短剧');
    let man_index = body.data.categories.findIndex(item => item.name === '男士理容');

    //将以上内容移动到折叠区
    body.data.categories[live_index].fixed = false;
    body.data.categories[playlet_index].fixed = false;
    body.data.categories[man_index].fixed = false;
    body.data.rec_categories.unshift(body.data.categories[live_index], body.data.categories[playlet_index], body.data.categories[man_index]);

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
      //发送一个本地通知
      let title = "脚本运行错误";
      let subtitle = "";
      let content = "未找到任何一个可以被修改的tab，脚本名称：" + $script.name;
      $notification.post({title, subtitle, content});
      $done({});
    }
    //返回修改后的响应体
    body = JSON.stringify(body);
    console.log("修改成功");
    $done({body:body});
  }catch(e){
    console.log("修改响应体失败：",e );
    //发送一个本地通知
    let title = "脚本运行错误";
    let subtitle = "";
    let content = "修改响应体失败，脚本名称：" + $script.name;
    $notification.post({title, subtitle, content });
    //返回原始内容
    $done({});
  }
  
  
}else{
  console.log("错误，响应体内容为空");
  //发送一个本地通知
  let title = "脚本运行错误";
  let subtitle = "";
  let content = "响应体内容为空，脚本名称：" + $script.name;
  //返回原始内容
  $done({});
}






















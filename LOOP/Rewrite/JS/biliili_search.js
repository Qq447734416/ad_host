let body = $response.body;
if(body){
  try{
    body = JSON.parse(body);

    // 寻找热搜索引
    let hot_search_index = body.data.findIndex(item => item.title === 'bilibili热搜');
    // 尝试删除热搜
    if(hot_search_index !== -1){
      try{
        body.data.splice(hot_search_index, 1);
      }catch(e){
        console.log("删除热搜榜单失败");
        // 发送通知
        $notification.post("脚本运行错误", "", "删除热搜失败，脚本名称：" + $script.name);
      }
    } else {
      console.log("未发现热搜榜单");
    }

    // 寻找“搜索发现索引”
    let find_index = body.data.findIndex(item => item.title === '搜索发现');
    // 尝试删除搜索发现
    if(find_index !== -1){
      try{
        body.data.splice(find_index, 1);
      }catch(e){
        console.log("删除搜索发现失败");
        $notification.post("脚本运行错误", "", "删除搜索发现失败，脚本名称：" + $script.name);
      }
    } else {
      console.log("未发现搜索发现模块榜单");
    }

    // 返回数据
    body = JSON.stringify(body);
    $done({body:body});
  } catch(e){
    console.log("脚本运行失败");
    $notification.post("脚本运行错误", "", e + $script.name);
    // 返回原始数据
    $done({});
  }
} else {
  console.log("未发现响应体！");
  $notification.post("脚本运行错误", "", "未发现响应体" + $script.name);
  // 返回原始数据
  $done({});
}

//去除小红书笔记水印
//强制允许保存

let body = $response.body;
if(body){
  //尝试修改
  try{
    //转换格式
    body = JSON.parse(body);
    //判断是否为live图类型笔记,若是则将liveur持久化存储，以配合对live图的去水印
    if(body.data[0].note_list[0].images_list.some((item) => 'live_photo' in item)){
        console.log('存在live图，尝试保存其url');
        let live_index = 0;
        let live_url = null;
        for(const item of body.data[0].note_list[0].images_list){
            //判断此数据是否为live，若不是则跳过本轮循环，索引序号不会增加
            if(!item.hasOwnProperty("live_photo")){
                continue;
            }
            //判断数据存储在那个数组，提取后存储，优先选择h265
            if(item.live_photo.media.stream.h265.length !== 0){
                live_url = item.live_photo.media.stream.h265[0].master_url;
            }else if(item.live_photo.media.stream.h266.length !== 0){
                live_url = item.live_photo.media.stream.h266[0].master_url;
            }else if(item.live_photo.media.stream.h264.length !== 0){
                live_url = item.live_photo.media.stream.h264[0].master_url;
            }else if(item.live_photo.media.stream.av1.length !== 0){
                live_url = item.live_photo.media.stream.av1[0].master_url;
            }else{
                console.log("错误，未找到需要存储的URL"+live_index)
            }
            //尝试存储
            if($persistentStore.write(live_url, `${live_index}`)){
                console.log("存储liveURL成功"+live_index)
            }else{
                console.log("存储liveURL失败"+live_index)
            }
            live_index = live_index + 1;
        }
    }else{
        console.log("此笔记无live图，存储步骤已跳过")
    }
    //修改数据
    body.data[0].note_list[0].media_save_config.disable_save = false;
    body.data[0].note_list[0].media_save_config.disable_watermark = true;
    body.data[0].note_list[0].media_save_config.disable_weibo_cover = true;
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

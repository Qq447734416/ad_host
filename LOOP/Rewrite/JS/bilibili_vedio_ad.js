//删除视频流推广



let body = $response.body;
if(body){
    try{
        body = JSON.parse(body);
        for(const item of body.data.items){
            if(item.hasOwnProperty('scroll_guide')){
                delete item.scroll_guide;
                console.log("咪咪删除了scroll_guide");
            }else{
                console.log("牛牛未找到scroll_guide");
            }
            if(item.hasOwnProperty('creative_entrance')){
                delete item.creative_entrance;
                console.log("咪咪删除了creative_entrance");
            }else{
                console.log("牛牛未找到creative_entrance");
            }}
        $done({body:JSON.stringify(body)});
    }catch(e){
        console.log("修改失败");
        $done({});
    }
}else{
    console.log("响应体为空");
    $done({});
}

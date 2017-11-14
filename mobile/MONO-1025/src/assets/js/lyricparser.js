// class parseLyric{ // 传进来整理好格式的歌词
//     constructor(lrc, hanlder = noop) {
//         this.lrc = lrc
//         this.tags = {}
//         this.lines = []
//         this.handler = hanlder
//         this.state = STATE_PAUSE
//         this.curLine = 0

//         this._init()
//     }
//     initLines(){
//         let lyrics = lrc.split("\n"); // 以换行符为基准，把歌词lrc转成数组lyrics
//         let timeReg = /^\[(\d{2}):(\d{2})\.(\d{2})\](.*)$/g; // 匹配歌词的时间：匹配规则：[数字（重复出现0次或多次） 冒号  数字（重复出现0次或多次） 点 数字 ]
//         // 遍历分解完的歌词数组lyrics
//         for(let i=0;i<lyrics.length;i++){
//             // console.log(lyrics[i],'每条歌词');
//             /*
//                 [ti:笑忘书]
//                 [ar:王菲] 
//                 [al:寓言] 
//                 [by:] 
//                 [offset:0] 
//                 [00:00.10]笑忘书 - 王菲 
//                 [00:00.20]词：林夕 
//                 [00:00.30]曲：C.Y. Kong 
//                 [00:00.40] 
//                 [00:12.36]没没有蜡烛就不用勉强庆祝 
//                 [00:17.79]没没想到答案就不要寻找题目 
//                 [00:23.62]没没有退路那我也不要散步 
//             */
//             // let lyric = decodeURIComponent(lyrics[i]);
            
//             let timeRegExpArr = lyrics[i].match(timeReg); // lyrics[i]里如果有timeReg规则匹配到的字符串，就把这条带时间的歌词字符串放在数组中
//             if(!timeRegExpArr)continue; // 如果没有，就跳过本次循环
//             // let clause = lyrics[i].replace(timeReg,''); // 如果有匹配到的歌词时间，就把该条歌词的匹配到的时间替换为空字符串，也就是把时间去掉，显示纯歌词
            
//             // for(let k = 0,h = timeRegExpArr.length;k < h;k++) { // 
//             //     let t = timeRegExpArr[k];
//             //     let min = Number(String(t.match(/\[\d*/i)).slice(1)),
//             //         sec = Number(String(t.match(/\:\d*/i)).slice(1));
//             //     let time = min * 60 + sec;
//             //     lrcObj[time] = clause;
//             // }
//             lyrics[i].replace(timeReg,function($0,$1,$2,$3,$4){	
//                 // console.log($4,'4444')			   
//                 if($4 !=''){
//                     var min = parseInt($1); //分
//                     var sec = parseInt($2) //秒
//                     var mmin = parseInt($3) // 毫秒
//                     var time = min*60*1000 + sec*1000 + mmin; //计算总秒数	
//                     // console.log(time,'clause')	
//                     lrcObj[time] = $4;
//                 }
//             });
//         }
//     }
//     let lyrics = lrc.split("\n"); // 以换行符为基准，把歌词lrc转成数组lyrics
//     // let lrcObj = {}; // key值存放歌词时间，value值存放对应的歌词
    
//     // let lrcArr =[];  // 歌词数组
//     // let lrcTimeArr = []; // 每句歌词对应的时间数组

//     // let timeReg = /\[(\d*):(\d*)((\.|\:)\d*)*\]/g; // 匹配歌词的时间：匹配规则：[数字（重复出现0次或多次） 冒号  数字（重复出现0次或多次）]
//     let timeReg = /^\[(\d{2}):(\d{2})\.(\d{2})\](.*)$/g; // 匹配歌词的时间：匹配规则：[数字（重复出现0次或多次） 冒号  数字（重复出现0次或多次） 点 数字 ]
//     // 遍历分解完的歌词数组lyrics
//     for(let i=0;i<lyrics.length;i++){
//         // console.log(lyrics[i],'每条歌词');
//         /*
//             [ti:笑忘书]
//             [ar:王菲] 
//             [al:寓言] 
//             [by:] 
//             [offset:0] 
//             [00:00.10]笑忘书 - 王菲 
//             [00:00.20]词：林夕 
//             [00:00.30]曲：C.Y. Kong 
//             [00:00.40] 
//             [00:12.36]没没有蜡烛就不用勉强庆祝 
//             [00:17.79]没没想到答案就不要寻找题目 
//             [00:23.62]没没有退路那我也不要散步 
//         */
//         // let lyric = decodeURIComponent(lyrics[i]);
        
//         let timeRegExpArr = lyrics[i].match(timeReg); // lyrics[i]里如果有timeReg规则匹配到的字符串，就把这条带时间的歌词字符串放在数组中
//         if(!timeRegExpArr)continue; // 如果没有，就跳过本次循环
//         // let clause = lyrics[i].replace(timeReg,''); // 如果有匹配到的歌词时间，就把该条歌词的匹配到的时间替换为空字符串，也就是把时间去掉，显示纯歌词
        
//         // for(let k = 0,h = timeRegExpArr.length;k < h;k++) { // 
//         //     let t = timeRegExpArr[k];
//         //     let min = Number(String(t.match(/\[\d*/i)).slice(1)),
//         //         sec = Number(String(t.match(/\:\d*/i)).slice(1));
//         //     let time = min * 60 + sec;
//         //     lrcObj[time] = clause;
//         // }
//         lyrics[i].replace(timeReg,function($0,$1,$2,$3,$4){	
//             // console.log($4,'4444')			   
//             if($4 !=''){
//                 var min = parseInt($1); //分
//                 var sec = parseInt($2) //秒
//                 var mmin = parseInt($3) // 毫秒
//                 var time = min*60*1000 + sec*1000 + mmin; //计算总秒数	
//                 // console.log(time,'clause')	
//                 lrcObj[time] = $4;
//             }
//         });
//     }
//     // lrcObj是一个对象
//     return lrcObj;
// }
// export default parseLyric


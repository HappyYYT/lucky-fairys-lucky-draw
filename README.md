# lucky-fairys-lucky-draw
The Final Task Of The YOUTH CAMP Of The ByteDance💎.
[OFFICIAL ADD](https://youthcamp.bytedance.com/)

![](https://img.shields.io/badge/MADE%20WITH-JAVASCRIPT-ef4041) ![](https://img.shields.io/badge/USE-HTML-success) ![](https://img.shields.io/badge/USE-SASS-bf4080) ![](https://img.shields.io/badge/BUILT%20WITH-%E2%9D%A4-orange) ![](https://img.shields.io/badge/DEPLOY%20WITH-%E8%BD%BB%E6%9C%8D%E5%8A%A1-027bea)

# :fire:手写一个抽奖程序
#### 第一届[字节青训营]-走进前端-基础班大作业

- :clapper:实现抽奖前端页面，用JS模拟出抽奖过程;

- :round_pushpin:可以手工设置奖品池，每个奖品的中奖概率，起始矿石数和每次抽奖耗费的矿石数;

- :slot_machine:完成抽奖后，给出中奖结果，多次抽奖，显示中奖列表;

##### 注意：本项目使用了ES6语法，暂不支持IE11等老旧浏览器
##### Notice：This project does not support legacy browsers such as IE 11.

# 线上Demo
:point_right:[Welcome to lucky-fairys-lucky-draw](https://lucky-fairys-lucky-draw.web.cloudendpoint.cn/)

![index.html(Suitable for mobile and PC terminals)](https://github.com/HappyYYT/lucky-fairys-lucky-draw/blob/main/img/1-900x780.png)
##### index.html适配移动和PC端。:iphone::computer:
##### index.html is suitable for mobile and PC terminals.:iphone::computer:

![play.html(Suitable for mobile and PC terminals)](https://github.com/HappyYYT/lucky-fairys-lucky-draw/blob/main/img/3-900x870.png)
##### player.html适配移动和PC端。:iphone::computer:
##### player.html is suitable for mobile and PC terminals.:iphone::computer:

![creator.html(PC only)](https://github.com/HappyYYT/lucky-fairys-lucky-draw/blob/main/img/4-1900x890.png)
##### creator.html只适配PC端。:computer:
##### creator.html is PC only.:computer:

# 部署平台
:point_right:[轻服务-5分钟快速构建应用](https://qingfuwu.cn/)

#### 接口设计
| 接口 | 参数 | 返回值 |
| ---- | ----  | ----  |
|   getRandomNum   |    belongTo:str   |    抽奖结果   |
|   findAllFromJackpotTable   |    belongTo:str  |   奖品名字、图片路径  |
|   findOneFromCurrencyTable   |    belongTo:str  |   总矿石数、单次消耗矿石数  |
|   findAll4CreatorFromJackpotTable   |    belongTo:str  |（针对creator配置页面）奖品名字、图片路径、中奖概率、单次消耗矿石数、总矿石数  |
|   updateMainInJackpotTable   |    belongTo:str, gifts:arr[obj], mineral:obj  | 是否更新成功，成功则返回true  |
#### 数据库设计
奖池：jackpot
| 参数 | 类型 | 
| ---- | ----  |
| id | Number | 
| name | String | 
| rate | String | 
| url | String | 
| belongTo | String | 

货币：currency
| 参数 | 类型 | 
| ---- | ----  |
| id | Number | 
| total | Number | 
| unit | Number | 
| belongTo | String | 

中奖历史：history
| 参数 | 类型 | 
| ---- | ----  |
| belongTo | String | 
| name | String | 
| createdAt(default) | Date | 

# 参考
[stevenjoezhang/live2d-widget-把萌萌哒的看板娘抱回家 (ノ≧∇≦)ノ | Live2D widget for web platform](https://github.com/stevenjoezhang/live2d-widget)

[bradtraversy/50projects50days/blurry-loading-50+ mini web projects using HTML, CSS & JS](https://github.com/bradtraversy/50projects50days/tree/master/blurry-loading)

[75team/raffle-奇舞团历年年会现场抽奖程序](https://github.com/75team/raffle)

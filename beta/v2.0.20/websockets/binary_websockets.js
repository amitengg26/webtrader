define(["jquery"],function(a){var b=null,c=null,d=new Promise(function(a){require(["js-cookie","token/token"],function(d,e){b=d,c=e,a()})});require(["js-cookie","token/token"]);var e=!1,f=null,g=function(){var b="wss://ws.binaryws.com/websockets/v3?l=EN",c=new WebSocket(b);return c.addEventListener("open",o),c.addEventListener("close",h),c.addEventListener("message",p),c.addEventListener("error",function(b){a(document).trigger("feedTypeNotification",["websocket-error","noconnection-feed"]),a.growl.error({message:"Connection error. Refresh page!"})}),c},h=function(){e=!1,w("logout"),setTimeout(function(){f=g(),require(["charts/chartingRequestMap"],function(a){Object.keys(a).forEach(function(b){var c=a[b];c&&c.symbol&&!c.timerHandler&&a.register({symbol:c.symbol,granularity:c.granularity,subscribe:1,count:1,style:c.granularity>0?"candles":"ticks"})["catch"](function(a){})})})},1e3)},i={},j=[],k=[],l={},m={},n=function(){return f&&1===f.readyState},o=function(){for(;k.length>0;){var a=k.shift();l[a.req_id]||f.send(JSON.stringify(a))}for(var b in l){var c=l[b];c&&(c.sent_before?c.reject({message:"connection closed"}):(c.sent_before=!0,f.send(JSON.stringify(c.data))))}for(;j.length>0;)j.shift()()},p=function(a){var b=JSON.parse(a.data);(i[b.msg_type]||[]).forEach(function(a){setTimeout(function(){a(b)},0)});var c=b.req_id,d=l[c];d&&(delete l[c],b.error?(b.error.echo_req=b.echo_req,b.error.req_id=b.req_id,d.reject(b.error)):d.resolve(b))};f=g(),require(["websockets/stream_handler"]);var q=function(a){for(var b in{balance:1,statement:1,profit_table:1,portfolio:1,proposal_open_contract:1,buy:1,sell:1})if(b in a)return!0;return!1},r=0,s=function(a){return a.req_id=++r,new Promise(function(b,c){l[a.req_id]={resolve:b,reject:c,data:a},n()?f.send(JSON.stringify(a)):k.push(a)})},t=function(a){var c=!1,d=JSON.stringify({authorize:a}),f=s({authorize:a});return f.then(function(g){return b.set("webtrader_token",a),e=!0,w("login",g),c=!0,m[d]=f,g})["catch"](function(a){throw c||(e=!1,w("logout"),b.remove("webtrader_token")),delete m[d],a})},u=function(){e&&(b.remove("webtrader_token"),f.close())},v=function(a){if(e)return s(a);var d=s.bind(null,a);return b.get("webtrader_token")?t(b.get("webtrader_token")).then(d):c.getTokenAsync().then(t)["catch"](function(a){throw require(["jquery","jquery-growl"],function(b){b.growl.error({message:a.message})}),a}).then(d)},w=function(a){var b=[].slice.call(arguments,1),c=i[a]||[];c.forEach(function(a){setTimeout(function(){a.apply(void 0,b)},0)})},x=function(a,b){setTimeout(function(){var b=l[a];b&&(delete l[a],b.reject({message:"timeout for websocket request"}))},b)},y={},z={events:{on:function(a,b){return(i[a]=i[a]||[]).push(b),b},off:function(a,b){if(i[a]){var c=i[a].indexOf(b);-1!==c&&i[a].splice(c,1)}}},execute:function(a){n()?setTimeout(a,0):j.push(a)},invalidate:u,cached:{send:function(a){var b=JSON.stringify(a);return m[b]?m[b]:m[b]=z.send(a).then(function(a){return a},function(a){throw delete m[b],a})},authorize:function(){return d.then(function(){var a=b.get("webtrader_token"),d=JSON.stringify({authorize:a});return e&&a&&m[d]?m[d]:a?t(a):c.getTokenAsync().then(t)["catch"](function(a){throw require(["jquery","jquery-growl"],function(b){b.growl.error({message:a.message})}),a})})}},send:function(a,b){if(a&&q(a))return d.then(function(){return v(a)});var c=s(a);return b&&x(a.req_id,b),c},is_authenticated:function(){return e},sell_expired:function(a){var b=(new Date).getTime()/1e3|0;!y[a]&&1*a>b&&(y[a]=setTimeout(function(){y[a]=void 0,z.send({sell_expired:1})["catch"](function(a){})},1e3*(a+2-b)))}};return z.events.on("login",function(){z.send({transaction:1,subscribe:1})["catch"](function(a){})}),z.events.on("login",function(){z.send({balance:1,subscribe:1})["catch"](function(a){})}),z});
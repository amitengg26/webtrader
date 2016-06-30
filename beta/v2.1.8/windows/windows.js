define(["jquery","lodash","navigation/navigation","windows/tracker","jquery.dialogextend","modernizr","common/util","css!windows/windows.css"],function(a,b,c,d){function e(b){b=a.extend({width:350,height:400},b);var c=Math.floor(a(window).height()/b.height)||1,d=Math.floor(a(window).width()/b.width)||1;return isSmallView()&&(c=d=1),c*d>4&&(c=1,d=4),{rows:c,cols:d,total:c*d}}function f(a){for(var b,c,d=a.length;d>0;)c=Math.floor(Math.random()*d),--d,b=a[d],a[d]=a[c],a[c]=b;return a}function g(){for(var c=a(".webtrader-dialog").filter(function(b,c){var d=a(c);return d.hasClass("ui-dialog-content")&&d.dialog("isOpen")&&!d.hasClass("ui-dialog-minimized")&&a(window).width()>=d.dialog("option","width")}),d=function(b,c){for(var d=0,e=a(window).width(),f=110,g=0;g<b.length;){for(var h=g,i=0,k=0;g!=b.length;){var l=a(b[g]),m=l.dialog("option","width"),n=l.dialog("option","height");if(i=Math.max(i,n),!(e>=k+m))break;k+=m,++g}var o=e>k?e-k:0,p=e>k?(e-k)/(g-h+1):0;g!=b.length&&(d+=o),0===k&&a(b[g]).dialog("option","width")>e&&(++g,p=0),k=0;for(var q=h;g>q;++q){k+=p;var l=a(b[q]),m=l.dialog("option","width"),n=l.dialog("option","height");c&&l.dialog("widget").animate({left:k+"px",top:f+"px"},1500,l.trigger.bind(l,"animated")),l.dialog("option","position",{my:k,at:f}),k+=m}f+=i+20}return c&&setTimeout(j,1600),d},e=null,g=1e6,h=0;100>h;++h){f(c);var i=d(c,!1);g>i&&(e=c.slice(),g=i)}var k=a(".webtrader-dialog").filter(function(b,c){var d=a(c);return d.hasClass("ui-dialog-content")&&d.dialog("isOpen")&&!d.hasClass("ui-dialog-minimized")&&a(window).width()<d.dialog("option","width")});b(k).forEach(function(a){e.push(a)}),d(e,!0),setTimeout(function(){p("tile")},1600)}function h(b){b=a.extend({title:"title",date:null,changed:function(){},cleared:function(){}},b);var c=this.parent().find(".ui-dialog-title").addClass("with-content"),d=function(b){function d(a,b){var c=a%4==0&&(a%100!=0||a%400==0);return[31,c?29:28,31,30,31,30,31,31,30,31,30,31][b]}function e(b,c){var d=c.render||function(a){return a+""};b.children().remove();for(var e=c.min;e<=c.max;++e)a("<option/>").val(e).text(d(e)).appendTo(b);return b.val(c.initial||c.min),b.selectmenu("refresh"),b.title=b.title||function(d){if(d)b._title=b._title||a("<option/>").val(-1).prependTo(b),b._title.text(d),b.updating=!0,b.val(-1).selectmenu("refresh"),b.updating=!1;else if(b._title){var e=-1===b.val()?c.initial:b.val();b._title.remove(),b.updating=!0,b.val(e).selectmenu("refresh"),b.updating=!1,this._title=null}},b}var f=b.date||new Date,g=a("<select />").insertAfter(c).selectmenu({width:"auto"}),h=a("<select />").insertAfter(c).selectmenu({width:"auto"}),i=a("<select />").insertAfter(c).selectmenu({width:"auto"});i.selectmenu("menuWidget").addClass("date-day"),g=e(g,{min:2010,max:f.getFullYear(),initial:f.getFullYear()}),h=e(h,{min:0,max:11,initial:f.getMonth(),render:function(a){return["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"][a]}}),i=e(i,{min:1,max:d(f.getFullYear(),f.getMonth()),initial:f.getDate()}),b.date||(g.title("Year"),h.title("Month"),i.title("Day"));var j=function(){var a=new Date(Date.UTC(g.val(),h.val(),i.val())).toISOString().slice(0,10);b.onchange(a)};i.on("selectmenuchange",function(){i.updating||(i.title(null),h.title(null),g.title(null),j())});var k=function(){var a={min:1,max:d(g.val(),h.val()),initial:i.val()};a.initial>a.max&&(a.initial=a.min),e(i,a)};return[g,h].forEach(function(a){a.on("selectmenuchange",function(){h.updating||g.updating||(i.title(null),h.title(null),g.title(null),k(),j())})}),{update:function(a){i.title(null),h.title(null),g.title(null);var b=a.split("-");g.val(0|b[0]),g.selectmenu("refresh"),h.val((0|b[1])-1),h.selectmenu("refresh"),i.val(0|b[2]),k()},clear:function(){g.title("Year"),h.title("Month"),i.title("Day")}}},e=function(b){var d=a("<input type='hidden' />").insertAfter(c),e=function(c){setTimeout(function(){var d=a(c).datepicker("widget").find(".ui-datepicker-buttonpane");a("<button/>",{text:"Clear",click:function(){b.onclear&&b.onclear(),a(c).datepicker("hide")}}).addClass("ui-datepicker-clear ui-state-default ui-priority-primary ui-corner-all").appendTo(d)},0)},f={showOn:"both",numberOfMonths:2,maxDate:0,minDate:new Date(2010,0,1),dateFormat:"yy-mm-dd",showAnim:"drop",showButtonPanel:!0,changeMonth:!0,changeYear:!0,onSelect:function(){a(this).change()},beforeShow:function(a,b){e(a),b.dpDiv.css({marginTop:"10px",marginLeft:"-220px"})},onChangeMonthYear:e},g=d.datepicker(f).datepicker("setDate",b.date.toISOString().slice(0,10));return a.datepicker._gotoToday=function(b){a(b).datepicker("setDate",new Date).change().datepicker("hide")},g.next("button").text("").button({icons:{primary:"ui-icon-calendar"}}),d.on("change",function(){var c=a(this).val();b.onchange&&b.onchange(c)}),d},f=e({date:b.date||new Date,onchange:function(a){g.update(a),b.changed(a)},onclear:function(){g.clear(),b.cleared()}}),g=d({date:b.date,onchange:function(a){f.datepicker("setDate",a),b.changed(a)}});return a('<span class="span-in-dialog-header">'+b.title+"</span>").insertAfter(c),{clear:function(){g.clear()}}}function i(b){var c=a(".ui-dialog").map(function(b,c){var d=a(c),e=d.find(".webtrader-dialog");if(e&&e.hasClass("ui-dialog-content")&&!e.hasClass("ui-dialog-minimized")){var f=d.offset();return f&&f.top+d.height()||0}return 0});return b||c.push(a("body").height()),Math.max.apply(null,c)}function j(b){a("body > .footer").width(a("body").width());var c=i(!0),d=a("body").height(),e=a(".addiction-warning").height(),f=a("body > .footer").height(),g=Math.max(c+e+15,d);f>g&&b===!0||a("body > .footer").css("margin-top",g-100)}function k(){var b=a(".addiction-warning").height(),c=a(document).height()-a(window).height()-a(window).scrollTop();a("#dialog-extend-fixed-container").css("bottom",Math.max(0,b-c))}var l=null,m=0,n=null,o={},p=function(a){var b=[].slice.call(arguments,1),c=o[a]||[];c.forEach(function(a){setTimeout(function(){a.apply(void 0,b)},0)})};return{init:function(b){var c=a.fn.dialog;a.fn.dialog=function(a){return"destroy"===a?(this.trigger("dialogdestroy"),c.call(this,"destroy")):c.apply(this,arguments)},n=b.find("ul");var f=n.find(".tile");return l=n.find(".closeAll"),l.click(function(){a(".webtrader-dialog").length>0&&a(".webtrader-dialog").dialog("close")}),f.click(g),require(["charts/chartWindow","websockets/binary_websockets","navigation/menu"],function(a,b,c){if(d.is_empty()){var f=e();b.cached.send({trading_times:(new Date).toISOString().slice(0,10)}).then(function(b){b=c.extractChartableMarkets(b);for(var d=function(a){return a[Math.floor(Math.random()*a.length)]},e=["2h","4h","8h","1d"],h=["candlestick","line","ohlc","spline"],i=0;i<f.total;++i){var j=d(b).submarkets,k=d(j).instruments,l=d(k),m=d(e),n=d(h);a.addNewWindow({instrumentCode:l.symbol,instrumentName:l.display_name,timePeriod:m,type:n,delayAmount:l.delay_amount})}g()})}else d.reopen(),setTimeout(j,200)}),require(["websockets/binary_websockets"],function(b){if(local_storage.get("oauth")){var c=local_storage.get("oauth");Promise.all(c.slice(1).map(function(a){return{authorize:a.token}}).map(b.send)).then(function(a){return b.cached.authorize().then(function(b){a.unshift(b);for(var d=0;d<a.length;++d)c[d].id=a[d].authorize.loginid,c[d].is_virtual=a[d].authorize.is_virtual;return local_storage.set("oauth",c),b})})["catch"](function(b){a.growl.error({message:b.message})})}}),a(window).resize(j),a(window).scroll(k),this},tile:g,closeAll:function(){l&&l.click()},fixFooterPosition:j,createBlankWindow:function(c,e){c=a(c);var f="windows-dialog-"+ ++m;e=a.extend({autoOpen:!1,resizable:!0,collapsable:!1,width:350,height:400,my:"center",at:"center",of:window,title:"blank window",hide:"fade",icons:{close:"ui-icon-close"}},e||{}),e.minWidth=e.minWidth||e.width,e.minHeight=e.minHeight||e.height,e.resize&&(e.maximize=e.minimize=e.restore=e.resize);var g=c.attr("id",f);e.ignoreTileAction||g.addClass("webtrader-dialog"),g.dialog(e).dialogExtend(e);var i=g.dialog("widget");i.draggable("option","containment",!1),i.draggable("option","scroll",!0),i.on("dragstop",function(){var a=i.offset().top;0>a&&i.animate({top:"0px"},300,i.trigger.bind(i,"animated"))}),i.on("dragstop",j),i.on("drag",function(){j(!0)}),g.on("dialogextendminimize",j),i.on("dialogresizestop",j),e.destroy&&g.on("dialogdestroy",e.destroy),g.moveToTop=function(){g.dialog("open"),g.dialogExtend("restore"),g.dialog("widget").effect("bounce",{times:2,distance:15},450)};var k=null,l=function(){var b=a("<a href='#'>"+e.title+"</a>");b.click(g.moveToTop),k=a("<li />").addClass(f+"LI").html(b),n.append(k)};e.ignoreTileAction||l(),g.on("dialogclose",function(){k&&k.remove(),k=null,j()}),g.on("dialogopen",function(){!k&&!e.ignoreTileAction&&l()}),g.on("dialogextendrestore",j),e.resize&&e.resize.call(c[0]),g.addDateToHeader=h;var o=Object.keys(e).filter(function(a){return b.startsWith(a,"data-")});if(o.forEach(function(a){return g.attr(a,e[a])}),e.refresh){var p=g.parent().find(".ui-dialog-title"),q=a("<span class='reload' style='position:absolute; right:85px' title='reload'/>").insertBefore(p);q.on("click",e.refresh)}return g.track=function(a){return d.track(a,g)},g.fixFooterPosition=j,g},makeSelectmenu:function(b,c){c=a.extend({list:["empty"],inx:0,changed:function(){}},c);var d=c.inx,e=c.list,f=function(c){b.children().remove();for(var d=0;d<c.length;++d)a("<option/>").val(c[d]).text(c[d]).appendTo(b)};return f(e),b.val(e[d]),b=b.selectmenu({width:c.width}),b.on("selectmenuchange",function(){var b=a(this).val();c.changed(b)}),b.update_list=function(a){f(a),b.val(a[0]),b.selectmenu("refresh")},b},event_on:function(a,b){return(o[a]=o[a]||[]).push(b),b},event_off:function(a,b){if(o[a]){var c=o[a].indexOf(b);-1!==c&&o[a].splice(c,1)}}}});
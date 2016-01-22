define(["jquery","charts/chartingRequestMap","websockets/binary_websockets","websockets/ohlc_handler","currentPriceIndicator","common/util","highstock","highcharts-exporting"],function(a,b,c,d,e){"use strict";function f(a){var c=a.containerIDWithHash,d=a.timePeriod,e=a.instrumentCode;if(d&&e){var f=b.keyFor(e,d);b.unregister(f,c)}}return a(function(){Highcharts.setOptions({global:{useUTC:!0}})}),{drawChart:function(f,g,h){var i=this;if(a(f).highcharts()){var j=b.keyFor(g.instrumentCode,g.timePeriod);b.removeChart(j,f),a(f).highcharts().destroy()}a(f).data({instrumentCode:g.instrumentCode,instrumentName:g.instrumentName,timePeriod:g.timePeriod,type:g.type,delayAmount:g.delayAmount}),a(f).highcharts("StockChart",{chart:{events:{load:function(){this.showLoading(),e.init(),c.execute(function(){d.retrieveChartDataAndRender({timePeriod:g.timePeriod,instrumentCode:g.instrumentCode,containerIDWithHash:f,type:g.type,instrumentName:g.instrumentName,series_compare:g.series_compare,delayAmount:g.delayAmount})}),a.isFunction(h)&&h(),this.credits.element.onclick=function(){window.open("http://www.binary.com","_blank")}}},spacingLeft:0,marginLeft:40},navigator:{enabled:!0,series:{id:"navigator"}},plotOptions:{candlestick:{lineColor:"black",color:"red",upColor:"green",upLineColor:"black",shadow:!0},series:{events:{afterAnimate:function(){if(this.options.isInstrument&&"navigator"!==this.options.id){this.addCurrentPrice();var b=this;require(["charts/draw/highcharts_custom/horizontal_line","charts/draw/highcharts_custom/vertical_line"],function(c,d){c.init(),d.init();var e=parseInt(getParameterByName("startTime")),g=parseInt(getParameterByName("endTime")),h=parseInt(getParameterByName("entrySpotTime")),j=parseFloat(getParameterByName("barrierPrice"));if(e>0&&b.addVerticalLine({value:1e3*e,name:"Start Time"}),g>0){b.addVerticalLine({value:1e3*g,name:"End Time"});var k=setInterval(function(){if(Date.now()>1e3*(g+1)){var c=a(b.chart.options.chart.renderTo).data();i.destroy({containerIDWithHash:f,timePeriod:c.timePeriod,instrumentCode:c.instrumentCode}),clearInterval(k)}},500)}h>0&&b.addVerticalLine({value:1e3*h,name:"Entry Spot"}),j&&b.addHorizontalLine({value:j,name:"Barrier"})})}this.chart.hideLoading()}}}},title:{text:"true"===getParameterByName("affiliates")?g.instrumentName+" ("+g.timePeriod+")":""},credits:{href:"http://www.binary.com",text:"Binary.com"},xAxis:{events:{afterSetExtremes:function(){}},labels:{formatter:function(){var a=this.axis.defaultLabelFormatter.call(this);return a.replace(".","")}}},yAxis:[{opposite:!1,labels:{formatter:function(){return a(f).data("overlayIndicator")?(this.value>0?" + ":"")+this.value+"%":this.value}}}],rangeSelector:{enabled:!1},tooltip:{crosshairs:[{width:2,color:"red",dashStyle:"dash"},{width:2,color:"red",dashStyle:"dash"}],enabled:!0,enabledIndicators:!0},exporting:{enabled:!1}})},destroy:f,triggerReflow:function(b){a(b).highcharts()&&a(b).highcharts().reflow()},refresh:function(b){var c=a(b).highcharts(),d=[],e=void 0;a(c.series).each(function(a,b){b.options.isInstrument&&(d.push(b.name),e=b.options.compare)}),this.drawChart(b,{instrumentCode:a(b).data("instrumentCode"),instrumentName:a(b).data("instrumentName"),timePeriod:a(b).data("timePeriod"),type:a(b).data("type"),series_compare:e,delayAmount:a(b).data("delayAmount")});var f=this;require(["instruments/instruments"],function(c){d.forEach(function(d){var e=c.getSpecificMarketData(d);void 0!=e.symbol&&a.trim(e.symbol)!=a(b).data("instrumentCode")&&f.overlay(b,e.symbol,d,e.delay_amount)})})},addIndicator:function(b,c){if(a(b).highcharts()){var d=a(b).highcharts(),e=d.series[0];e&&d.addIndicator(a.extend({id:e.options.id},c))}},overlay:function(b,f,g,h){if(a(b).highcharts()){var i=a(b).highcharts(),j=a(b).data("timePeriod"),k=a(b).data("type");i.showLoading();for(var l=0;l<i.series.length;l++){var m=i.series[l];if(m.options.isInstrument){var n=m.options.data;m.setData([]);for(var o=0;o<n.length;o++)n[o].x&&n[o].y&&(n[o]=[n[o].x,n[o].y]);m.update({compare:"percent"}),m.setData(n),m.options.isInstrument=!0}else a(m).data("onChartIndicator")&&m.update({compare:"percent"})}e.init(),c.execute(function(){d.retrieveChartDataAndRender({timePeriod:j,instrumentCode:f,containerIDWithHash:b,type:k,instrumentName:g,series_compare:"percent",delayAmount:h})})}}}});
!function(){var e;if(void 0===window.jQuery||"1.4.2"!==window.jQuery.fn.jquery){var t=document.createElement("script");t.setAttribute("type","text/javascript"),t.setAttribute("src","https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"),t.readyState?t.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||n()}:t.onload=n,(document.getElementsByTagName("head")[0]||document.documentElement).appendChild(t)}else e=window.jQuery,i();function n(){e=window.jQuery.noConflict(!0),i()}function i(){e(document).ready(function(e){e(".coinlore-widget").each(function(){e.get("https://nodemarketcap.com/api/"+e(this).attr("data-id"),function(t){e(".result").html(t),b="#009e73";[0].name<0&&(b="#d94040"),t[0].changep>0?e("#7dchange-99999").css("color","green"):0==t[0].changep?e("#7dchange-99999").css("color","black"):e("#7dchange-99999").css("color","red"),e(".nodemarketcap-widget").html('<div style="box-shadow: 0 1px 3px 0 #ccc;font-family: Helvetica,Arial,sans-serif;min-width:285px;">\n    <div>\n        <div style="float:right;width:67%;border: none;text-align:left;padding:5px 0px;line-height:25px;">\n            <span style="font-size: 17px;"><a href="https://nodemarketcap.com/coin/'+t[0].name+'" target="_blank" style="text-decoration: none; color: #333;font-weight: bold">'+t[0].name+'</a><span style="font-size: 10px;padding-left: 5px">'+t[0].tickerCap+'</span></span>\n            <div style="font-size: 16px;">'+t[0].usdvalue+' USD <span style="color:'+b+'">('+t[0].changep+'%)</span></div>\n            <div style="font-size: 12px; color:#959595">'+t[0].btcval+' BTC </div>\n        </div>\n        <div style="text-align:center;padding:5px 0px;width:33%;"><img src="https://nodemarketcap.com/api/getlogo/'+t[0].name+'" width="64px" height="64px" style="margin: 0 auto;"></div>\n    </div>\n    <div style="border-top: 1px solid #e1e5ea;clear:both;">\n        <div style="text-align:center;float:left;width:24%;font-size:12px;padding:12px 0;border-right:1px solid #ccc;line-height:1.25em;"><b>Ran</b>k<br><br> <span style="font-size: 17px; ">'+t[0].rank+'</span></div>\n        <div style="text-align:center;float:left;width:25%;font-size:12px;padding:12px 0 16px 0;border-right:1px solid #ccc;line-height:1.25em;"><b>Market Cap</b>p<br><br> <span style="font-size: 14px; ">$'+t[0].usdMarketCap+' <span style="font-size:9px">USD</span></span></div>\n        <div style="text-align:center;float:left;width:25%;font-size:12px;padding:12px 0 16px 0;line-height:1.25em;border-right:1px solid #ccc;"><b>Vol (24H)</b><br><br> <span style="font-size: 14px; ">$'+t[0].roi+' <span style="font-size:9px">USD</span></span></div>\n        <div style="text-align:center;float:left;width:25%;font-size:12px;padding:12px 0 16px 0;line-height:1.25em;"><b>7D Change</b><br><br></div>\n    </div>\n    <div style="box-shadow: 1px 0px 3px 0 #ccc;text-align:center;clear:both;font-size:11px;font-style:italic;padding:5px 0;"><a href="https://nodemarketcap.com/?widget" target="_blank" style="text-decoration: none; color: rgb(16, 112, 224);">Powered by NodeMarketCap</a></div>\n</div>')})})})}}();
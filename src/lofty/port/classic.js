/*
 Lofty, v0.1 http://lofty.fangdeng.org/ MIT
*/
(function(b){if(!b.lofty){var f={},c=function(a,d,e){if(!f[a]){e||(e=d,d=[]);a=f[a]={id:a,deps:d,factory:e};if("function"===typeof a.factory){d=[];e=a.deps;for(var b=0,g=e.length;b<g;b++)d.push(h(e[b]));a.exports=a.factory.apply(c,d)}else a.exports=a.factory;delete a.factory}},h=function(a){return(a=f[a])?a.exports:null};c.version="0.1";c.log=b.console?function(a,b){console[b||"log"](a)}:function(){};c.cache={kernel:f};c("global",b);c("cache",c.cache);b.lofty=c}})(this);
lofty("lang",function(){var g={}.hasOwnProperty,e=Array.prototype,f={slice:[].slice,now:Date.now||function(){return(new Date).getTime()},hasOwn:function(a,b){return g.call(a,b)},isFunction:function(a){return"[object Function]"===this.toString.call(a)},isArray:Array.isArray||function(a){return"[object Array]"===this.toString.call(a)},isString:function(a){return"string"===typeof a},forEach:e.forEach?function(a,b,c){a.forEach(b,c)}:function(a,b,c){for(var d=0,e=a.length;d<e;d++)b.call(c,a[d],d,a)},map:e.map?
function(a,b,c){return a.map(b,c)}:function(a,b,c){var d=[];f.forEach(a,function(a,e,f){d.push(b.call(c,a,e,f))});return d},indexOf:e.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1}};return f});
lofty("event",["lang","cache"],function(d,f){var b=f.events={};return{on:function(a,c){(b[a]||(b[a]=[])).push(c)},emit:function(a){var c=d.slice.call(arguments,1),e=b[a];e&&d.forEach(e,function(a){a.apply(null,c)})}}});
lofty("config",["global","cache","lang"],function(k,l,h){var j=!1;-1<k.location.search.indexOf("lofty.debug=")&&(j=!0);var g=l.config={debug:j},f={},e={config:function(a){for(var b in a)if(h.hasOwn(a,b)){var c=a[b];e.applyRules(g[b],b,c)||(g[b]=c)}},addRule:function(a,b,c){f[a]={rule:b,keys:[]};c&&e.addRuleKey(c,a);return this},addRuleKey:function(a,b){f[b]&&f[b].keys.push(a);return this},applyRules:function(a,b,c){var d=!1,e;for(e in f)if(d)break;else d=f[e],d=-1<h.indexOf(d.keys,b)&&d.rule(a,b,
c);return d}};e.addRule("object",function(a,b,c){if(a){for(var d in c)a[d]=c[d];return!0}return!1}).addRule("array",function(a,b,c){a?a.push(c):g[b]=[c];return!0});return e});
lofty("module",["global","cache","lang","event","config"],function(g,k,h,f,l){var q=[],m=0,j=k.modules={},n=k.config,d={get:function(a,c){var b={id:d.parseAlias(a)};f.emit("get",b,c);return j[b.id]},has:function(a,c){return d.get(a,c)||p[a]?!0:!1},hasDefine:function(a){return j[a]?!0:!1},parseAlias:function(a){var c;if(n.alias&&(c=n.alias[a]))a=c;return a},isAnon:function(a){return""===a.id},save:function(a){j[a._id||a.id]=a},autocompile:function(a){d.isAnon(a)&&d.compile(a)},compile:function(a){try{if(h.isFunction(a.factory)){var c=
[],b=a.deps;h.isArray(b)&&h.forEach(b,function(b){var e;b=(e=p[b])?e(a):d.require(b,a);c.push(b)});var e=a.factory.apply(null,c);void 0!==e?a.exports=e:a.entity&&(a.exports=a.entity.exports);a.entity&&delete a.entity}else void 0!==a.factory&&(a.exports=a.factory);f.emit("compiled",a)}catch(g){f.emit("compileFail",a,g)}},require:function(a,c){var b;(b=d.get(a,c))?(b.visits||(b.visits++,d.compile(b)),f.emit("required",b),b=b.exports):(f.emit("requireFail",{id:a}),b=null);return b}},r=function(a,c,b){this.id=
a;this.deps=c||[];this.factory=b;this.exports={};this.visits=0;""===a&&(a="__!_lofty_anonymous_"+m,m++,this._id=a);f.emit("initialized",this)},p={require:function(a){function c(b){return d.require(b,a)}f.emit("makeRequire",c,a);return c},exports:function(a){return a.exports},module:function(a){a.entity={id:a.id,exports:a.exports};return a.entity},config:function(){return l.config}};l.addRuleKey("alias","object");var s=g.define;this.noConflict=function(){g.define=s};this.define=function(a,c,b){var e;
e=arguments.length;1===e?(b=a,a=""):2===e&&(b=c,c=q,h.isString(a)||(c=a,a=""));if(d.hasDefine(a))return f.emit("existed",{id:a}),null;e=new r(a,c,b);d.save(e);d.autocompile(e)};g.define=this.define;return d});
lofty("loader",["cache","global"],function(p,h){var j=p.config,f=h.document,q=/\.css(?:\?|$)/,l=/loaded|complete|undefined/,r=536>1*h.navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/,"$1"),k=f&&(f.head||f.getElementsByTagName("head")[0]||f.documentElement),m=f.getElementsByTagName("base")[0],n=function(a,b){a.onerror=function(){a.onload=a.onreadystatechange=a.onerror=null;a=void 0;b&&b()}};return function(a,b){var c;if(q.test(a)){var d=c=f.createElement("link");if(r||!("onload"in d)){var g=
f.createElement("img");g.onerror=function(){b();g.onerror=null;g=void 0};g.src=a}else d.onload=d.onreadystatechange=function(){l.test(d.readyState)&&(d.onload=d.onreadystatechange=d.onerror=null,d=void 0,b&&b())},n(d,b);c.rel="stylesheet";c.href=a}else{var e=c=f.createElement("script");e.onload=e.onreadystatechange=function(a){a=a||h.event;if("load"===a.type||l.test(e.readyState))e.onload=e.onreadystatechange=e.onerror=null,j.debug||k.removeChild(e),e=void 0,b&&b()};n(e,b);c.async=!0;c.src=a}j.charset&&
(c.charset=j.charset);m?k.insertBefore(c,m):k.appendChild(c)}});
lofty("path",["global","cache","module","lang","config"],function(a,g,h,j,k){var b=g.config;a=a.document;var l=/\?|\.(?:css|js)$|\/$/;b.protocol="http";a=a.getElementsByTagName("script");a=a[a.length-1];a=(a.hasAttribute?a.src:a.getAttribute("src",4)).match(/([\w]+)[\:\/\/]+([\w|\.]+)\//i);b.domain=a[2];k.addRuleKey("resolve","array").addRuleKey("stamp","object");var c={parseResolve:function(f){var a=b.resolve,e;if(a)for(var d=0,c=a.length;d<c&&!(e=a[d](f),e!==f);d++);return b.protocol+"://"+b.domain+
e},addFileSuffix:function(a){l.test(a)||(a+=".js");return a},addStamp:function(a,m){var c,d=b.hasStamp?j.now():null;if(b.stamp&&(c=b.stamp[m]))d=c;d&&(a+="?lofty.stamp="+d);return a},idToUrl:function(a){var b="";a=h.parseAlias(a);b=c.parseResolve(a);b=c.addFileSuffix(b);return b=c.addStamp(b,a)}};return c});
lofty("request",["cache","path","event","loader","global"],function(e,j,k,l,m){var f=e.config,g=e.assets={};f.loadTimeout=1E4;var h=function(b,c){if(!b.timeout){m.clearTimeout(b.timeoutTimer);var d,a;"callback"===c?(b.status=2,a=b.callbackQueue):(b.status=-1,a=b.errorbackQueue);for(;d=a.shift();)d()}};return function(b,c,d){var a=g[b]||{id:b,url:j.idToUrl(b),callbackQueue:[],errorbackQueue:[],status:0,timeout:!1,timeoutTimer:null};2===a.status?c&&c():(a.callbackQueue.push(c),a.errorbackQueue.push(d),
1!==a.status&&(g[b]=a,a.status=1,a.timeoutTimer=setTimeout(function(){a.timeout=!0;h(a,"errorback");k.emit("requestTimeout",a)},f.loadTimeout),l(a.url,function(){h(a,"callback")})))}});
lofty("deferred",["lang"],function(c){var j=function(){},k=function(a){var e=this,f=[],g=0,d=0;a=a||1;var h=function(){e.then=!d?function(a){a&&a()}:function(a,b){b&&b()};h=j;c(!d?0:1);c=j;f=[]},c=function(a){for(var b,c=0;b=f[c++];)(b=b[a])&&b()};this.then=function(a,b){f.push([a,b])};this.resolve=function(){g++;g+d===a&&h()};this.reject=function(){d++;g+d===a&&h()}};return function(){var a=c.slice.call(arguments,0),e=new k(a.length);c.forEach(a,function(a){a(e)});return e}});
lofty("asyncrequire",["lang","event","module","request","deferred"],function(d,h,f,j,k){var a={fetch:function(b,a,g){var c=this;k.apply(null,d.map(b,function(b){return function(a){f.has(b,c)?a.resolve():j(b,function(){a.resolve()},function(){a.reject()})}})).then(a,g)}};a.loader=a.fetch;a.realize=function(b,e,g,c){d.isArray(b)||(b=[b]);a.loader.call(c,b,function(){var a=d.map(b,function(a){return f.require(a,c)});e&&e.apply(null,a)})};h.on("makeRequire",function(b,e){b.async=function(b,c,d){a.realize(b,
c,d,e)}});return a});
lofty("appframe",["module","cache","global","event","config"],function(h,j,e,g,k){var d=j.config;k.addRuleKey("rAppframeExcept","array");var c={isExcept:function(a){var b=!1,c=d.rAppframeExcept;if(c)for(var f=0,e=c.length;f<e;f++)if(c[f].test(a)){b=!0;break}return b},getRealId:function(a,b){return c.isExcept(a)?a:b.appframe+":"+a}};g.on("initialized",function(a){d.appframe&&(a.appframe=d.appframe,h.isAnon(a)||(a._id=c.getRealId(a.id,a)))});g.on("get",function(a,b){b&&b.appframe&&(a.id=c.getRealId(a.id,
b))});this.appframe=function(a){var b=e[a];b?b.define===this.define&&(d.appframe=a):(e[a]={log:this.log,define:this.define},d.appframe=a)};return c});
lofty("alicn",["cache","global"],function(a){a=a.config;var d=/\.css(?:\?|$)/,e={lofty:"/fdevlib/{type}/lofty/{id}",makeup:"/fdevlib/{type}/makeup/{id}",sys:"/sys/{type}{id}"};a.hasStamp=!0;a.resolve=[function(a){var b=a.split("/")[0],f=d.test(a)?"css":"js";if(b=e[b]){var c={type:f,id:a};a=b.replace(/\{(\w+)\}/g,function(a,b){return void 0!==c[b]?c[b]:"{"+b+"}"})}return a}];a.rAppframeExcept=[/^(lofty|makeup|sys)\//]});

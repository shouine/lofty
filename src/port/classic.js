/*! Lofty v0.1 beta Classic http://lofty.fangdeng.org/ MIT*/
(function(a){if(!a.lofty){var e={},c=function(b,h,g){if(!e[b]){g||(g=h,h=[]);if("function"===typeof g){for(var a=[],l=0,m=h.length;l<m;l++)a.push(e[h[l]]);g=g.apply(c,a)}e[b]=g||1}},b=function(b){return e[b]};c.version="0.1";c.cache={parts:e};c("global",a);c("require",function(){return b});a.lofty=c}})(this);
lofty("lang",function(){var a={}.toString,e=Array.prototype,c={isFunction:function(b){return"[object Function]"===a.call(b)},isArray:Array.isArray||function(b){return"[object Array]"===a.call(b)},isString:function(b){return"string"===typeof b},forEach:e.forEach?function(b,f,c){b.forEach(f,c)}:function(b,f,c){for(var a=0,e=b.length;a<e;a++)f.call(c,b[a],a,b)},map:e.map?function(b,c,a){return b.map(c,a)}:function(b,f,a){var e=[];c.forEach(b,function(b,c,m){e.push(f.call(a,b,c,m))});return e},indexOf:e.indexOf?
function(b,c){return b.indexOf(c)}:function(b,c){for(var a=0,e=b.length;a<e;a++)if(b[a]===c)return a;return-1}};return c});lofty("event",function(){var a=this.cache.events={},e=[].slice;return{on:function(c,b){(a[c]||(a[c]=[])).push(b)},emit:function(c){var b=e.call(arguments,1),f=a[c],h,g=0;if(f)for(;h=f[g++];)h.apply(null,b)},off:function(c){a[c]&&delete a[c]}}});
lofty("config",["lang"],function(a){var e=this.cache,c=e.config={},b=e.configRules={},e={addRule:function(c,a){b[c]={rule:a,keys:[]};return this},addItem:function(c,a){b[a]&&b[a].keys.push(c);return this}};e.addRule("object",function(b,c,a){if(b){for(var e in a)b[e]=a[e];return!0}return!1}).addRule("array",function(b,c,a){b?b.push(a):this[c]=[a];return!0});this.config=function(e){for(var h in e){var g=e[h],j=c[h],l=h,m=g,k=!1,d=void 0,n=void 0;for(n in b)if(k)break;else d=b[n],k=-1<a.indexOf(d.keys,
l)&&d.rule.call(c,j,l,m);k||(c[h]=g)}};return e});lofty("alias",["config","event"],function(a,e){var c=this.cache.config;a.addItem("alias","object");return function(b){var a=c.alias,h;if(a&&(h=a[b.id]))b.id=h;e.emit("alias",b)}});
lofty("module",["global","lang","event","alias"],function(a,e,c,b){var f=[],h=0,g=this.cache.modules={},j={get:function(d){d={id:d};b(d);return g[d.id]},has:function(d){return j.get(d)||m[d]?!0:!1},hasDefine:function(d){return g[d]?!0:!1},isAnon:function(d){return""===d.id},save:function(d){g[d._id||d.id]=d},autocompile:function(d){j.isAnon(d)&&j.compile(d)},compile:function(d){try{if(e.isFunction(d.factory)){var b=[],a=d.deps;e.isArray(a)&&e.forEach(a,function(a){var c;a=(c=m[a])?c(d):j.require(a,
d);b.push(a)});var l=d.factory.apply(null,b);void 0!==l?d.exports=l:d.entity&&d.entity.exports&&(d.exports=d.entity.exports);d.entity&&delete d.entity}else void 0!==d.factory&&(d.exports=d.factory);c.emit("compiled",d)}catch(f){c.emit("compileFail",f,d)}},require:function(d){var b=j.get(d);b?(b.compiled||(b.compiled=!0,j.compile(b)),c.emit("required",b),d=b.exports):(c.emit("requireFail",{id:d}),d=null);return d}},l=function(d,b,a){this.id=d;this.deps=b||[];this.factory=a;this.exports={};""===d&&
(d="__!_lofty_anonymous_"+h,h++,this._id=d)},m={require:function(){function d(d){return j.require(d)}c.emit("makeRequire",d);return d},exports:function(d){return d.exports},module:function(d){d.entity={id:d.id,exports:d.exports};return d.entity}},k=a.define;this.noConflict=function(){a.define=k};this.define=function(d,b,a){var g;g=arguments.length;1===g?(a=d,d=""):2===g&&(a=b,b=f,e.isString(d)||(b=d,d=""));if(j.hasDefine(d))return c.emit("existed",{id:d}),null;g=new l(d,b,a);c.emit("define",g);j.save(g);
j.autocompile(g)};a.define=this.define;return j});
lofty("loader",["global"],function(a){var e=this.cache.config,c=a.document,b=/\.css(?:\?|$)/,f=/loaded|complete|undefined/,h=536>1*a.navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/,"$1"),g=c&&(c.head||c.getElementsByTagName("head")[0]||c.documentElement),j=c.getElementsByTagName("base")[0],l=function(b,a){b.onerror=function(){b.onload=b.onreadystatechange=b.onerror=null;b=void 0;a&&a()}};return function(m,k){var d;if(b.test(m)){var n=d=c.createElement("link");if(h||!("onload"in n)){var q=c.createElement("img");
q.onerror=function(){k();q.onerror=null;q=void 0};q.src=m}else n.onload=n.onreadystatechange=function(){f.test(n.readyState)&&(n.onload=n.onreadystatechange=n.onerror=null,n=void 0,k&&k())},l(n,k);d.rel="stylesheet";d.href=m}else{var p=d=c.createElement("script");p.onload=p.onreadystatechange=function(b){b=b||a.event;if("load"===b.type||f.test(p.readyState))p.onload=p.onreadystatechange=p.onerror=null,e.debug||g.removeChild(p),p=void 0,k&&k()};l(p,k);d.async=!0;d.src=m}e.charset&&(d.charset=e.charset);
j?g.insertBefore(d,j):g.appendChild(d)}});
lofty("id2url",["global","event","config","alias"],function(a,e,c,b){var f=this.cache.config,h=/\?|\.(?:css|js)$|\/$/,g=/^https?:\/\//,j=(new Date).getTime();a=a.document.getElementsByTagName("script");a=a[a.length-1];a=(a.hasAttribute?a.src:a.getAttribute("src",4)).match(/([\w]+)\:\/\/([\w|\.|\:]+)\//i);f.baseUrl=a[0];c.addItem("resolve","array").addItem("stamp","object");return function(a){b(a);var c=f.resolve,k;if(c)for(var d=0,n=c.length;d<n&&!(k=c[d](a.id),k!==a.id);d++);a.url=k?k:a.id;e.emit("resolve",
a);g.test(a.url)||(a.url=f.baseUrl+a.url);!h.test(a.url)&&(a.url+=".js");c=f.hasStamp?j:null;if(k=f.stamp)for(var q in k)if(RegExp(q).test(a.id)){c=k[q];break}c&&(a.url+="?lofty.stamp="+c);e.emit("id2url",a)}});
lofty("request",["global","event","loader","id2url"],function(a,e,c,b){var f=this.cache,h=f.config,g=f.assets={};h.loadTimeout=1E4;var j=function(b,c){if(!b.timeout){a.clearTimeout(b.timer);e.emit("requested",b);var f,d;c?(b.status=2,d=b.callQueue):(b.status=-1,d=b.errorQueue);for(;f=d.shift();)f()}};return function(a,f,k){var d;a={id:a};b(a);d=g[a.url]||(g[a.url]=a);2===d.status?f&&f():(d.callQueue?d.callQueue.push(f):d.callQueue=[f],d.errorQueue?d.errorQueue.push(k):d.errorQueue=[k],1!==d.status&&
(d.status=1,d.timer=setTimeout(function(){d.timeout=!0;e.emit("requestTimeout",d);j(d,!1)},h.loadTimeout),c(d.url,function(){j(d,!0)})))}});
lofty("deferred",function(){var a=function(){},e=function(c){var b=this,e=[],h=0,g=0;c=c||0;var j=function(){h+g===c&&l()},l=function(){b.then=!g?function(b){b&&b()}:function(b,a){a&&a()};l=a;m(!g?0:1);m=a;e=[]},m=function(b){for(var a,c=0;a=e[c++];)(a=a[b])&&a()};this.then=function(b,a){e.push([b,a])};this.resolve=function(){h++;j()};this.reject=function(){g++;j()};j()};return function(){for(var a=new e(arguments.length),b,f=0;b=arguments[f++];)b(a);return a}});
lofty("use",["lang","event","module","request","deferred"],function(a,e,c,b,f){var h={fetch:function(b,e){h.get(b,function(){f.apply(null,a.map(b,function(b){return function(a){var e=c.get(b);e?h.fetch(e.deps,function(){a.resolve()}):a.resolve()}})).then(e)})},get:function(e,j,h){f.apply(null,a.map(e,function(a){return function(e){c.has(a)?e.resolve():b(a,function(){e.resolve()},function(){e.reject()})}})).then(j,h)}};e.on("makeRequire",function(b){b.use=function(b,e){a.isArray(b)||(b=[b]);h.fetch(b,
function(){e&&e.apply(null,a.map(b,function(b){return c.require(b)}))})}});return h});lofty("amd",["module","use"],function(a,e){var c=this.cache.config;c.amd=!0;a.autocompile=function(b){a.isAnon(b)&&(c.amd?e.fetch(b.deps,function(){a.compile(b)}):a.compile(b))}});lofty("appframe",["global","event","config"],function(a,e,c){this.appframe=function(b){b=(a[b]={define:this.define,log:this.log,config:this.config,on:e.on,off:e.off}).config;b.addRule=c.addRule;b.addItem=c.addItem}});
lofty("log",["global","console","request","require"],function(a,e,c,b){var f=this,h=f.log=function(){};return{create:function(g){f.log=g?a.console?function(b,c){a.console[c||"log"](b)}:function(a,f){e?e(a,f):c&&c("lofty/kernel/console",function(){e||(e=b("console"));e(a,f)})}:h},log:function(b){f.log(b,"log")},warn:function(b){f.log(b,"warn")}}});
lofty("debug",["config","log","event"],function(a,e,c){a.addRule("debug",function(b,a,c){e.create(c);this[a]=c;return!0}).addItem("debug","debug");c.on("existed",function(b){e.warn(b.id+": already exists.")});c.on("compiled",function(b){e.log((b._id?b._id:b.id)+": compiled.")});c.on("compileFail",function(b,a){e.warn((a._id?a._id:a.id)+": "+b.message)});c.on("required",function(b){!b.visits?b.visits=1:b.visits++;e.log(b.id+": required "+b.visits+".")});c.on("requireFail",function(b){e.warn(b.id+": failed to require.")});
c.on("requested",function(b){e.log(b.url+" requested")});c.on("requestTimeout",function(b){e.warn("request "+b.url+" timeout.")})});
lofty("alicn",["global","event"],function(a,e){var c=/\.css(?:\?|$)/,b=/([a-z])([A-Z])/g;e.on("resolve",function(a){a.url=a.url.replace(b,function(b,a,c){return a+"-"+c}).toLowerCase()});this.config({amd:!1,hasStamp:!0,resolve:function(a){var b=a.split("/"),e=b[0],j=c.test(a)?"css/":"js/";switch(e){case "lofty":case "gallery":a="fdevlib/"+j+a;break;case "sys":a="sys/"+j+b.slice(1).join("/")}return a},debug:function(){var b=!1;0<a.location.href.indexOf("lofty.debug=true")&&(b=!0);return b}()})});

/*! Lofty v0.1 beta Classic http://lofty.fangdeng.org/ MIT*/
(function(b){if(!b.lofty){var d={},a=function(e,g,f){if(!d[e]){f||(f=g,g=[]);if("function"===typeof f){for(var b=[],l=0,m=g.length;l<m;l++)b.push(d[g[l]]);f=f.apply(a,b)}d[e]=f||1}},g=function(e){return d[e]};a.version="0.1";a.cache={parts:d};a("global",b);a("require",function(){return g});b.lofty=a}})(this);
lofty("lang",function(){var b={}.toString,d=Array.prototype,a={isFunction:function(g){return"[object Function]"===b.call(g)},isArray:Array.isArray||function(g){return"[object Array]"===b.call(g)},isString:function(g){return"string"===typeof g},forEach:d.forEach?function(g,e,a){g.forEach(e,a)}:function(a,e,b){for(var f=0,d=a.length;f<d;f++)e.call(b,a[f],f,a)},map:d.map?function(a,e,b){return a.map(e,b)}:function(g,e,b){var f=[];a.forEach(g,function(a,g,d){f.push(e.call(b,a,g,d))});return f},indexOf:d.indexOf?
function(a,e){return a.indexOf(e)}:function(a,e){for(var b=0,f=a.length;b<f;b++)if(a[b]===e)return b;return-1}};return a});lofty("event",function(){var b=this.cache.events={},d=[].slice,a={on:function(a,e){(b[a]||(b[a]=[])).push(e)},emit:function(a){var e=d.call(arguments,1),j=b[a],f,h=0;if(j)for(;f=j[h++];)f.apply(null,e)},off:function(a){b[a]&&delete b[a]}};this.on=a.on;this.off=a.off;return a});
lofty("config",["lang"],function(b){var d=this.cache,a=d.config={},g=d.configRules={},d={addRule:function(a,b){g[a]={rule:b,keys:[]};return this},addItem:function(a,b){g[b]&&g[b].keys.push(a);return this}};d.addRule("object",function(a,b,f){if(a){for(var d in f)a[d]=f[d];return!0}return!1}).addRule("array",function(a,b,d){a?a.push(d):this[b]=[d];return!0});this.config=function(e){if(b.isString(e))return a[e];for(var d in e){var f=e[d],h=a[d],l=d,m=f,k=!1,c=void 0,n=void 0;for(n in g)if(k)break;else c=
g[n],k=-1<b.indexOf(c.keys,l)&&c.rule.call(a,h,l,m);k||(a[d]=f)}};return d});lofty("alias",["config","event"],function(b,d){var a=this.cache.config;b.addItem("alias","object");return function(b){var e=a.alias,j;if(e&&(j=e[b.id]))b.id=j;d.emit("alias",b)}});
lofty("module",["global","lang","event","alias"],function(b,d,a,g){var e=[],j=0,f=this.cache.modules={},h={get:function(c){c={id:c};g(c);return f[c.id]},has:function(c){return h.get(c)||m[c]?!0:!1},hasDefine:function(c){return f[c]?!0:!1},isAnon:function(c){return""===c.id},save:function(c){f[c._id||c.id]=c},autocompile:function(c){h.isAnon(c)&&h.compile(c)},compile:function(c){try{if(d.isFunction(c.factory)){var e=[],b=c.deps;d.isArray(b)&&d.forEach(b,function(a){var b;a=(b=m[a])?b(c):h.require(a,
c);e.push(a)});var f=c.factory.apply(null,e);void 0!==f?c.exports=f:c.entity&&c.entity.exports&&(c.exports=c.entity.exports);c.entity&&delete c.entity}else void 0!==c.factory&&(c.exports=c.factory);a.emit("compiled",c)}catch(l){a.emit("compileFail",l,c)}},require:function(c){var b=h.get(c);b?(b.compiled||(b.compiled=!0,h.compile(b)),a.emit("required",b),c=b.exports):(a.emit("requireFail",{id:c}),c=null);return c}},l=function(c,a,b){this.id=c;this.deps=a||[];this.factory=b;this.exports={};""===c&&
(c="__!_lofty_anonymous_"+j,j++,this._id=c)},m={require:function(){function c(a){return h.require(a)}a.emit("makeRequire",c);return c},exports:function(a){return a.exports},module:function(a){a.entity={id:a.id,exports:a.exports};return a.entity}},k=b.define;this.noConflict=function(){b.define=k};this.define=function(c,b,f){var g;g=arguments.length;1===g?(f=c,c=""):2===g&&(f=b,b=e,d.isString(c)||(b=c,c=""));if(h.hasDefine(c))return a.emit("existed",{id:c}),null;g=new l(c,b,f);a.emit("define",g);h.save(g);
h.autocompile(g)};b.define=this.define;return h});
lofty("loader",["global"],function(b){var d=this.cache.config,a=b.document,g=/\.css(?:\?|$)/,e=/loaded|complete|undefined/,j=536>1*b.navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/,"$1"),f=a&&(a.head||a.getElementsByTagName("head")[0]||a.documentElement),h=a.getElementsByTagName("base")[0],l=function(a,b){a.onerror=function(){a.onload=a.onreadystatechange=a.onerror=null;a=void 0;b&&b()}};return function(m,k){var c;if(g.test(m)){var n=c=a.createElement("link");if(j||!("onload"in n)){var q=a.createElement("img");
q.onerror=function(){k();q.onerror=null;q=void 0};q.src=m}else n.onload=n.onreadystatechange=function(){e.test(n.readyState)&&(n.onload=n.onreadystatechange=n.onerror=null,n=void 0,k&&k())},l(n,k);c.rel="stylesheet";c.href=m}else{var p=c=a.createElement("script");p.onload=p.onreadystatechange=function(a){a=a||b.event;if("load"===a.type||e.test(p.readyState))p.onload=p.onreadystatechange=p.onerror=null,d.debug||f.removeChild(p),p=void 0,k&&k()};l(p,k);c.async=!0;c.src=m}d.charset&&(c.charset=d.charset);
h?f.insertBefore(c,h):f.appendChild(c)}});
lofty("id2url",["global","event","config","alias"],function(b,d,a,g){var e=this.cache.config,j=/\?|\.(?:css|js)$|\/$/,f=/^https?:\/\//,h=(new Date).getTime();b=b.document.getElementsByTagName("script");b=b[b.length-1];b=(b.hasAttribute?b.src:b.getAttribute("src",4)).match(/([\w]+)\:\/\/([\w|\.|\:]+)\//i);e.baseUrl=b[0];a.addItem("resolve","array").addItem("stamp","object");return function(a){g(a);var b=e.resolve,k;if(b)for(var c=0,n=b.length;c<n&&!(k=b[c](a.id),k!==a.id);c++);a.url=k?k:a.id;d.emit("resolve",
a);f.test(a.url)||(a.url=e.baseUrl+a.url);!j.test(a.url)&&(a.url+=".js");b=e.hasStamp?h:null;if(k=e.stamp)for(var q in k)if(RegExp(q).test(a.id)){b=k[q];break}b&&(a.url+="?lofty.stamp="+b);d.emit("id2url",a)}});
lofty("request",["global","event","loader","id2url"],function(b,d,a,g){var e=this.cache,j=e.config,f=e.assets={};j.loadTimeout=1E4;var h=function(a,e){if(!a.timeout){b.clearTimeout(a.timer);d.emit("requested",a);var f,c;e?(a.status=2,c=a.callQueue):(a.status=-1,c=a.errorQueue);for(;f=c.shift();)f()}};return function(b,e,k){var c;b={id:b};g(b);c=f[b.url]||(f[b.url]=b);2===c.status?e&&e():(c.callQueue?c.callQueue.push(e):c.callQueue=[e],c.errorQueue?c.errorQueue.push(k):c.errorQueue=[k],1!==c.status&&
(c.status=1,c.timer=setTimeout(function(){c.timeout=!0;d.emit("requestTimeout",c);h(c,!1)},j.loadTimeout),a(c.url,function(){h(c,!0)})))}});
lofty("deferred",function(){var b=function(){},d=function(a){var d=this,e=[],j=0,f=0;a=a||0;var h=function(){j+f===a&&l()},l=function(){d.then=!f?function(a){a&&a()}:function(a,b){b&&b()};l=b;m(!f?0:1);m=b;e=[]},m=function(a){for(var b,d=0;b=e[d++];)(b=b[a])&&b()};this.then=function(a,b){e.push([a,b])};this.resolve=function(){j++;h()};this.reject=function(){f++;h()};h()};return function(){for(var a=new d(arguments.length),b,e=0;b=arguments[e++];)b(a);return a}});
lofty("use",["lang","event","module","request","deferred"],function(b,d,a,g,e){var j={fetch:function(d,g){j.get(d,function(){e.apply(null,b.map(d,function(b){return function(e){var d=a.get(b);d?j.fetch(d.deps,function(){e.resolve()}):e.resolve()}})).then(g)})},get:function(d,h,j){e.apply(null,b.map(d,function(b){return function(e){a.has(b)?e.resolve():g(b,function(){e.resolve()},function(){e.reject()})}})).then(h,j)}};d.on("makeRequire",function(e){e.use=function(e,d){b.isArray(e)||(e=[e]);j.fetch(e,
function(){var f=b.map(e,function(b){return a.require(b)});d&&d.apply(null,f)})}});return j});lofty("amd",["module","use"],function(b,d){var a=this.cache.config;a.amd=!0;b.autocompile=function(g){b.isAnon(g)&&(a.amd?d.fetch(g.deps,function(){b.compile(g)}):b.compile(g))}});
lofty("appframe",["global","config"],function(b,d){var a=this;a.appframe=function(g){g=(b[g]={define:a.define,log:function(){a.log.apply(null,arguments)},config:a.config,on:a.on,off:a.off}).config;g.addRule=d.addRule;g.addItem=d.addItem}});
lofty("log",["global","console","request","require"],function(b,d,a,g){var e=this,j=e.log=function(){},f=b.console;return{create:function(b){e.log=b?f&&f.warn?function(a,b){f[b||"log"](a)}:function(b,e){d?d(b,e):a&&a("lofty/kernel/console",function(){d||(d=g("console"));d(b,e)})}:j},log:function(a){e.log(a,"log")},warn:function(a){e.log(a,"warn")}}});
lofty("debug",["config","log","event"],function(b,d,a){b.addRule("debug",function(a,b,f){d.create(f);this[b]=f;return!0}).addItem("debug","debug");var g=this.cache.config;a.on("existed",function(a){d.warn(a.id+": already exists.")});a.on("compiled",function(a){d.log((a._id?a._id:a.id)+": compiled.")});a.on("compileFail",function(a){if(!g.hasCatch||g.debug)throw a;});a.on("required",function(a){!a.visits?a.visits=1:a.visits++;d.log(a.id+": required "+a.visits+".")});a.on("requireFail",function(a){d.warn(a.id+
": does not exist.")});a.on("requested",function(a){d.log(a.url+" requested")});a.on("requestTimeout",function(a){d.warn("request "+a.url+" timeout.")})});
lofty("alicn",["global","event"],function(b,d){var a=/\.css(?:\?|$)/,g=/([a-z])([A-Z])/g;d.on("resolve",function(a){a.url=a.url.replace(g,function(a,b,e){return b+"-"+e}).toLowerCase()});this.config({amd:!1,resolve:function(b){var d=b.split("/"),f=d[0],g=a.test(b)?"css/":"js/";switch(f){case "lofty":case "gallery":b="fdevlib/"+g+b;break;case "sys":b="sys/"+g+d.slice(1).join("/")}return b},debug:0<b.location.href.indexOf("lofty.debug=true")})});

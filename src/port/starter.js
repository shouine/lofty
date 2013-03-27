/*! Lofty v0.1 beta Starter http://lofty.fangdeng.org/ MIT*/
(function(d){if(!d.lofty){var g={},c=function(e,f,h){if(!g[e]){h||(h=f,f=[]);e=g[e]={id:e,deps:f,factory:h};if("function"===typeof e.factory){f=[];h=e.deps;for(var j=0,d=h.length;j<d;j++)f.push(a(h[j]));e.exports=e.factory.apply(c,f)}else e.exports=e.factory;delete e.factory}},a=function(e){return(e=g[e])?e.exports:null};c.version="0.1";c.cache={kernel:g};c("global",d);c("require",function(){return a});d.lofty=c}})(this);
lofty("lang",function(){var d={}.toString,g=Array.prototype,c={isFunction:function(a){return"[object Function]"===d.call(a)},isArray:Array.isArray||function(a){return"[object Array]"===d.call(a)},isString:function(a){return"string"===typeof a},forEach:g.forEach?function(a,e,f){a.forEach(e,f)}:function(a,e,f){for(var c=0,d=a.length;c<d;c++)e.call(f,a[c],c,a)},map:g.map?function(a,e,f){return a.map(e,f)}:function(a,e,f){var h=[];c.forEach(a,function(a,c,d){h.push(e.call(f,a,c,d))});return h},indexOf:g.indexOf?
function(a,e){return a.indexOf(e)}:function(a,e){for(var c=0,h=a.length;c<h;c++)if(a[c]===e)return c;return-1}};return c});lofty("event",function(){var d=this.cache.events={},g=[].slice;return{on:function(c,a){(d[c]||(d[c]=[])).push(a)},emit:function(c){var a=g.call(arguments,1),e=d[c],f,h=0;if(e)for(;f=e[h++];)f.apply(null,a)}}});
lofty("config",["lang"],function(d){var g=this.cache,c=g.config={},a=g.configRules={},g={addRule:function(e,c){a[e]={rule:c,keys:[]};return this},addRuleKey:function(e,c){a[c]&&a[c].keys.push(e);return this}};g.addRule("object",function(a,c,h){if(a){for(var d in h)a[d]=h[d];return!0}return!1}).addRule("array",function(a,c,d){a?a.push(d):this[c]=[d];return!0});this.config=function(e){for(var f in e){var h=e[f],g=c[f],m=f,l=h,k=!1,b=void 0,n=void 0;for(n in a)if(k)break;else b=a[n],k=-1<d.indexOf(b.keys,
m)&&b.rule.call(c,g,m,l);k||(c[f]=h)}};return g});lofty("alias",["config","event"],function(d,g){var c=this.cache.config;d.addRuleKey("alias","object");return function(a){var e=c.alias,d;if(e&&(d=e[a.id]))a.id=d;g.emit("alias",a)}});
lofty("module",["global","lang","event","alias"],function(d,g,c,a){var e=[],f=0,h=this.cache.modules={},j={get:function(b){b={id:b};a(b);return h[b.id]},has:function(b){return j.get(b)||l[b]?!0:!1},hasDefine:function(b){return h[b]?!0:!1},isAnon:function(b){return""===b.id},save:function(b){h[b._id||b.id]=b},autocompile:function(b){j.isAnon(b)&&j.compile(b)},compile:function(b){try{if(g.isFunction(b.factory)){var a=[],e=b.deps;g.isArray(e)&&g.forEach(e,function(c){var e;c=(e=l[c])?e(b):j.require(c,
b);a.push(c)});var d=b.factory.apply(null,a);void 0!==d?b.exports=d:b.entity&&(b.exports=b.entity.exports);b.entity&&delete b.entity}else void 0!==b.factory&&(b.exports=b.factory);c.emit("compiled",b)}catch(f){c.emit("compileFail",f,b)}},require:function(b){var a=j.get(b);a?(a.visits||(a.visits++,j.compile(a)),c.emit("required",a),b=a.exports):(c.emit("requireFail",{id:b}),b=null);return b}},m=function(b,a,c){this.id=b;this.deps=a||[];this.factory=c;this.exports={};this.visits=0;""===b&&(b="__!_lofty_anonymous_"+
f,f++,this._id=b)},l={require:function(){function b(b){return j.require(b)}c.emit("makeRequire",b);return b},exports:function(b){return b.exports},module:function(b){b.entity={id:b.id,exports:b.exports};return b.entity}},k=d.define;this.noConflict=function(){d.define=k};this.define=function(b,a,d){var f;f=arguments.length;1===f?(d=b,b=""):2===f&&(d=a,a=e,g.isString(b)||(a=b,b=""));if(j.hasDefine(b))return c.emit("existed",{id:b}),null;f=new m(b,a,d);c.emit("define",f);j.save(f);j.autocompile(f)};
d.define=this.define;return j});
lofty("console",["global","lang"],function(d,g){var c=d.document,a=[],e=null,f=!1,h=function(a){var d=c.createElement("li");d.style.color="warn"===a.type?"red":"#000";d.innerHTML=a.message;e.appendChild(d)},j=function(f){c.body?(c.body.appendChild(f),e=c.createElement("ol"),e.style.listStyleType="decimal",f.appendChild(e),g.forEach(a,function(a){h(a)})):d.setTimeout(function(){j(f)},200)};return function(d,g){var k={message:d,type:g||"log"};if(!f){var b=c.createElement("div");b.id="lofty-debug-console";
b.style.margin="10px 0";b.style.border="1px dashed red";b.style.padding="4px 8px";b.style.fontSize="14px";b.style.lineHeight="1.5";b.style.textAlign="left";j(b);f=!0}e?h(k):a.push(k)}});
lofty("debug",["global","config","console","request","require"],function(d,g,c,a,e){var f=this,h=this.log=function(){};g.addRule("debug",function(g,m,l){f.log=l?d.console?function(a,b){d.console[b||"log"](a)}:function(d,b){c?c(d,b):a&&a("lofty/kernel/console",function(){c||(c=e("console"));c(d,b)})}:h;this[m]=l;return!0}).addRuleKey("debug","debug")});
lofty("alicn",["global","event"],function(d,g){var c=/\.css(?:\?|$)/;this.config({hasStamp:!0,resolve:function(a){var e=a.split("/"),d=e[0],g=c.test(a)?"css/":"js/";switch(d){case "lofty":case "avid":a="/fdevlib/"+g+a;break;case "sys":a="/sys/"+g+e.slice(1).join("/")}return a},debug:function(){var a=!1;0<d.location.href.indexOf("lofty.debug=true")&&(a=!0);return a}()});this.appframe=function(a){d[a]={log:this.log,define:this.define,on:g.on}}});

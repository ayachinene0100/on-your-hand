const J=(s,T)=>{const p=s.toLowerCase(),v=T.toLowerCase(),C=[];let O=0,m=0;const D=(f,Y=!1)=>{let y="";m===0?y=f.length>20?`… ${f.slice(-20)}`:f:Y?y=f.length+m>100?`${f.slice(0,100-m)}… `:f:y=f.length>20?`${f.slice(0,20)} … ${f.slice(-20)}`:f,y&&C.push(y),m+=y.length,Y||(C.push(["strong",T]),m+=T.length,m>=100&&C.push(" …"))};let l=p.indexOf(v,O);if(l===-1)return null;for(;l>=0;){const f=l+v.length;if(D(s.slice(O,l)),O=f,m>100)break;l=p.indexOf(v,O)}return m<100&&D(s.slice(O),!0),C};function ct(s){return s}const nt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},rt="__vueuse_ssr_handlers__";nt[rt]=nt[rt]||{};var it;(function(s){s.UP="UP",s.RIGHT="RIGHT",s.DOWN="DOWN",s.LEFT="LEFT",s.NONE="NONE"})(it||(it={}));var ft=Object.defineProperty,st=Object.getOwnPropertySymbols,ht=Object.prototype.hasOwnProperty,lt=Object.prototype.propertyIsEnumerable,at=(s,T,p)=>T in s?ft(s,T,{enumerable:!0,configurable:!0,writable:!0,value:p}):s[T]=p,dt=(s,T)=>{for(var p in T||(T={}))ht.call(T,p)&&at(s,p,T[p]);if(st)for(var p of st(T))lt.call(T,p)&&at(s,p,T[p]);return s};const $t={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};dt({linear:ct},$t);var R=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},V={},vt={get exports(){return V},set exports(s){V=s}};(function(s,T){(function(p,v){s.exports=v()})(R,function(){var p=1e3,v=6e4,C=36e5,O="millisecond",m="second",D="minute",l="hour",f="day",Y="week",y="month",i="quarter",a="year",g="date",e="Invalid Date",u=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,w=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,S={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(o){var r=["th","st","nd","rd"],t=o%100;return"["+o+(r[(t-20)%10]||r[t]||r[0])+"]"}},x=function(o,r,t){var c=String(o);return!c||c.length>=r?o:""+Array(r+1-c.length).join(t)+o},k={s:x,z:function(o){var r=-o.utcOffset(),t=Math.abs(r),c=Math.floor(t/60),n=t%60;return(r<=0?"+":"-")+x(c,2,"0")+":"+x(n,2,"0")},m:function o(r,t){if(r.date()<t.date())return-o(t,r);var c=12*(t.year()-r.year())+(t.month()-r.month()),n=r.clone().add(c,y),d=t-n<0,h=r.clone().add(c+(d?-1:1),y);return+(-(c+(t-n)/(d?n-h:h-n))||0)},a:function(o){return o<0?Math.ceil(o)||0:Math.floor(o)},p:function(o){return{M:y,y:a,w:Y,d:f,D:g,h:l,m:D,s:m,ms:O,Q:i}[o]||String(o||"").toLowerCase().replace(/s$/,"")},u:function(o){return o===void 0}},I="en",U={};U[I]=S;var z=function(o){return o instanceof W},E=function o(r,t,c){var n;if(!r)return I;if(typeof r=="string"){var d=r.toLowerCase();U[d]&&(n=d),t&&(U[d]=t,n=d);var h=r.split("-");if(!n&&h.length>1)return o(h[0])}else{var b=r.name;U[b]=r,n=b}return!c&&n&&(I=n),n||!c&&I},M=function(o,r){if(z(o))return o.clone();var t=typeof r=="object"?r:{};return t.date=o,t.args=arguments,new W(t)},$=k;$.l=E,$.i=z,$.w=function(o,r){return M(o,{locale:r.$L,utc:r.$u,x:r.$x,$offset:r.$offset})};var W=function(){function o(t){this.$L=E(t.locale,null,!0),this.parse(t)}var r=o.prototype;return r.parse=function(t){this.$d=function(c){var n=c.date,d=c.utc;if(n===null)return new Date(NaN);if($.u(n))return new Date;if(n instanceof Date)return new Date(n);if(typeof n=="string"&&!/Z$/i.test(n)){var h=n.match(u);if(h){var b=h[2]-1||0,H=(h[7]||"0").substring(0,3);return d?new Date(Date.UTC(h[1],b,h[3]||1,h[4]||0,h[5]||0,h[6]||0,H)):new Date(h[1],b,h[3]||1,h[4]||0,h[5]||0,h[6]||0,H)}}return new Date(n)}(t),this.$x=t.x||{},this.init()},r.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},r.$utils=function(){return $},r.isValid=function(){return this.$d.toString()!==e},r.isSame=function(t,c){var n=M(t);return this.startOf(c)<=n&&n<=this.endOf(c)},r.isAfter=function(t,c){return M(t)<this.startOf(c)},r.isBefore=function(t,c){return this.endOf(c)<M(t)},r.$g=function(t,c,n){return $.u(t)?this[c]:this.set(n,t)},r.unix=function(){return Math.floor(this.valueOf()/1e3)},r.valueOf=function(){return this.$d.getTime()},r.startOf=function(t,c){var n=this,d=!!$.u(c)||c,h=$.p(t),b=function(Z,N){var P=$.w(n.$u?Date.UTC(n.$y,N,Z):new Date(n.$y,N,Z),n);return d?P:P.endOf(f)},H=function(Z,N){return $.w(n.toDate()[Z].apply(n.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(N)),n)},_=this.$W,L=this.$M,F=this.$D,j="set"+(this.$u?"UTC":"");switch(h){case a:return d?b(1,0):b(31,11);case y:return d?b(1,L):b(0,L+1);case Y:var Q=this.$locale().weekStart||0,A=(_<Q?_+7:_)-Q;return b(d?F-A:F+(6-A),L);case f:case g:return H(j+"Hours",0);case l:return H(j+"Minutes",1);case D:return H(j+"Seconds",2);case m:return H(j+"Milliseconds",3);default:return this.clone()}},r.endOf=function(t){return this.startOf(t,!1)},r.$set=function(t,c){var n,d=$.p(t),h="set"+(this.$u?"UTC":""),b=(n={},n[f]=h+"Date",n[g]=h+"Date",n[y]=h+"Month",n[a]=h+"FullYear",n[l]=h+"Hours",n[D]=h+"Minutes",n[m]=h+"Seconds",n[O]=h+"Milliseconds",n)[d],H=d===f?this.$D+(c-this.$W):c;if(d===y||d===a){var _=this.clone().set(g,1);_.$d[b](H),_.init(),this.$d=_.set(g,Math.min(this.$D,_.daysInMonth())).$d}else b&&this.$d[b](H);return this.init(),this},r.set=function(t,c){return this.clone().$set(t,c)},r.get=function(t){return this[$.p(t)]()},r.add=function(t,c){var n,d=this;t=Number(t);var h=$.p(c),b=function(L){var F=M(d);return $.w(F.date(F.date()+Math.round(L*t)),d)};if(h===y)return this.set(y,this.$M+t);if(h===a)return this.set(a,this.$y+t);if(h===f)return b(1);if(h===Y)return b(7);var H=(n={},n[D]=v,n[l]=C,n[m]=p,n)[h]||1,_=this.$d.getTime()+t*H;return $.w(_,this)},r.subtract=function(t,c){return this.add(-1*t,c)},r.format=function(t){var c=this,n=this.$locale();if(!this.isValid())return n.invalidDate||e;var d=t||"YYYY-MM-DDTHH:mm:ssZ",h=$.z(this),b=this.$H,H=this.$m,_=this.$M,L=n.weekdays,F=n.months,j=function(N,P,q,B){return N&&(N[P]||N(c,d))||q[P].slice(0,B)},Q=function(N){return $.s(b%12||12,N,"0")},A=n.meridiem||function(N,P,q){var B=N<12?"AM":"PM";return q?B.toLowerCase():B},Z={YY:String(this.$y).slice(-2),YYYY:this.$y,M:_+1,MM:$.s(_+1,2,"0"),MMM:j(n.monthsShort,_,F,3),MMMM:j(F,_),D:this.$D,DD:$.s(this.$D,2,"0"),d:String(this.$W),dd:j(n.weekdaysMin,this.$W,L,2),ddd:j(n.weekdaysShort,this.$W,L,3),dddd:L[this.$W],H:String(b),HH:$.s(b,2,"0"),h:Q(1),hh:Q(2),a:A(b,H,!0),A:A(b,H,!1),m:String(H),mm:$.s(H,2,"0"),s:String(this.$s),ss:$.s(this.$s,2,"0"),SSS:$.s(this.$ms,3,"0"),Z:h};return d.replace(w,function(N,P){return P||Z[N]||h.replace(":","")})},r.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},r.diff=function(t,c,n){var d,h=$.p(c),b=M(t),H=(b.utcOffset()-this.utcOffset())*v,_=this-b,L=$.m(this,b);return L=(d={},d[a]=L/12,d[y]=L,d[i]=L/3,d[Y]=(_-H)/6048e5,d[f]=(_-H)/864e5,d[l]=_/C,d[D]=_/v,d[m]=_/p,d)[h]||_,n?L:$.a(L)},r.daysInMonth=function(){return this.endOf(y).$D},r.$locale=function(){return U[this.$L]},r.locale=function(t,c){if(!t)return this.$L;var n=this.clone(),d=E(t,c,!0);return d&&(n.$L=d),n},r.clone=function(){return $.w(this.$d,this)},r.toDate=function(){return new Date(this.valueOf())},r.toJSON=function(){return this.isValid()?this.toISOString():null},r.toISOString=function(){return this.$d.toISOString()},r.toString=function(){return this.$d.toUTCString()},o}(),et=W.prototype;return M.prototype=et,[["$ms",O],["$s",m],["$m",D],["$H",l],["$W",f],["$M",y],["$y",a],["$D",g]].forEach(function(o){et[o[1]]=function(r){return this.$g(r,o[0],o[1])}}),M.extend=function(o,r){return o.$i||(o(r,W,M),o.$i=!0),M},M.locale=E,M.isDayjs=z,M.unix=function(o){return M(1e3*o)},M.en=U[I],M.Ls=U,M.p={},M})})(vt);var G=V,K={},mt={get exports(){return K},set exports(s){K=s}};(function(s,T){(function(p,v){s.exports=v()})(R,function(){return function(p,v,C){var O=v.prototype,m=function(i){var a,g=i.date,e=i.utc,u={};if(!((a=g)instanceof Date||a instanceof Array||O.$utils().u(a)||a.constructor.name!=="Object")){if(!Object.keys(g).length)return new Date;var w=e?C.utc():C();Object.keys(g).forEach(function(M){var $,W;u[$=M,W=O.$utils().p($),W==="date"?"day":W]=g[M]});var S=u.day||(u.year||u.month>=0?1:w.date()),x=u.year||w.year(),k=u.month>=0?u.month:u.year||u.day?0:w.month(),I=u.hour||0,U=u.minute||0,z=u.second||0,E=u.millisecond||0;return e?new Date(Date.UTC(x,k,S,I,U,z,E)):new Date(x,k,S,I,U,z,E)}return g},D=O.parse;O.parse=function(i){i.date=m.bind(this)(i),D.bind(this)(i)};var l=O.set,f=O.add,Y=O.subtract,y=function(i,a,g,e){e===void 0&&(e=1);var u=Object.keys(a),w=this;return u.forEach(function(S){w=i.bind(w)(a[S]*e,S)}),w};O.set=function(i,a){return a=a===void 0?i:a,i.constructor.name==="Object"?y.bind(this)(function(g,e){return l.bind(this)(e,g)},a,i):l.bind(this)(i,a)},O.add=function(i,a){return i.constructor.name==="Object"?y.bind(this)(f,i,a):f.bind(this)(i,a)},O.subtract=function(i,a){return i.constructor.name==="Object"?y.bind(this)(f,i,a,-1):Y.bind(this)(i,a)}}})})(mt);var gt=K,X={},pt={get exports(){return X},set exports(s){X=s}};(function(s,T){(function(p,v){s.exports=v()})(R,function(){var p={year:0,month:1,day:2,hour:3,minute:4,second:5},v={};return function(C,O,m){var D,l=function(i,a,g){g===void 0&&(g={});var e=new Date(i),u=function(w,S){S===void 0&&(S={});var x=S.timeZoneName||"short",k=w+"|"+x,I=v[k];return I||(I=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:w,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:x}),v[k]=I),I}(a,g);return u.formatToParts(e)},f=function(i,a){for(var g=l(i,a),e=[],u=0;u<g.length;u+=1){var w=g[u],S=w.type,x=w.value,k=p[S];k>=0&&(e[k]=parseInt(x,10))}var I=e[3],U=I===24?0:I,z=e[0]+"-"+e[1]+"-"+e[2]+" "+U+":"+e[4]+":"+e[5]+":000",E=+i;return(m.utc(z).valueOf()-(E-=E%1e3))/6e4},Y=O.prototype;Y.tz=function(i,a){i===void 0&&(i=D);var g=this.utcOffset(),e=this.toDate(),u=e.toLocaleString("en-US",{timeZone:i}),w=Math.round((e-new Date(u))/1e3/60),S=m(u).$set("millisecond",this.$ms).utcOffset(15*-Math.round(e.getTimezoneOffset()/15)-w,!0);if(a){var x=S.utcOffset();S=S.add(g-x,"minute")}return S.$x.$timezone=i,S},Y.offsetName=function(i){var a=this.$x.$timezone||m.tz.guess(),g=l(this.valueOf(),a,{timeZoneName:i}).find(function(e){return e.type.toLowerCase()==="timezonename"});return g&&g.value};var y=Y.startOf;Y.startOf=function(i,a){if(!this.$x||!this.$x.$timezone)return y.call(this,i,a);var g=m(this.format("YYYY-MM-DD HH:mm:ss:SSS"));return y.call(g,i,a).tz(this.$x.$timezone,!0)},m.tz=function(i,a,g){var e=g&&a,u=g||a||D,w=f(+m(),u);if(typeof i!="string")return m(i).tz(u);var S=function(U,z,E){var M=U-60*z*1e3,$=f(M,E);if(z===$)return[M,z];var W=f(M-=60*($-z)*1e3,E);return $===W?[M,$]:[U-60*Math.min($,W)*1e3,Math.max($,W)]}(m.utc(i,e).valueOf(),w,u),x=S[0],k=S[1],I=m(x).utcOffset(k);return I.$x.$timezone=u,I},m.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},m.tz.setDefault=function(i){D=i}}})})(pt);var Ot=X,tt={},yt={get exports(){return tt},set exports(s){tt=s}};(function(s,T){(function(p,v){s.exports=v()})(R,function(){var p="minute",v=/[+-]\d\d(?::?\d\d)?/g,C=/([+-]|\d\d)/g;return function(O,m,D){var l=m.prototype;D.utc=function(e){var u={date:e,utc:!0,args:arguments};return new m(u)},l.utc=function(e){var u=D(this.toDate(),{locale:this.$L,utc:!0});return e?u.add(this.utcOffset(),p):u},l.local=function(){return D(this.toDate(),{locale:this.$L,utc:!1})};var f=l.parse;l.parse=function(e){e.utc&&(this.$u=!0),this.$utils().u(e.$offset)||(this.$offset=e.$offset),f.call(this,e)};var Y=l.init;l.init=function(){if(this.$u){var e=this.$d;this.$y=e.getUTCFullYear(),this.$M=e.getUTCMonth(),this.$D=e.getUTCDate(),this.$W=e.getUTCDay(),this.$H=e.getUTCHours(),this.$m=e.getUTCMinutes(),this.$s=e.getUTCSeconds(),this.$ms=e.getUTCMilliseconds()}else Y.call(this)};var y=l.utcOffset;l.utcOffset=function(e,u){var w=this.$utils().u;if(w(e))return this.$u?0:w(this.$offset)?y.call(this):this.$offset;if(typeof e=="string"&&(e=function(I){I===void 0&&(I="");var U=I.match(v);if(!U)return null;var z=(""+U[0]).match(C)||["-",0,0],E=z[0],M=60*+z[1]+ +z[2];return M===0?0:E==="+"?M:-M}(e),e===null))return this;var S=Math.abs(e)<=16?60*e:e,x=this;if(u)return x.$offset=S,x.$u=e===0,x;if(e!==0){var k=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(x=this.local().add(S+k,p)).$offset=S,x.$x.$localOffset=k}else x=this.utc();return x};var i=l.format;l.format=function(e){var u=e||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return i.call(this,u)},l.valueOf=function(){var e=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*e},l.isUTC=function(){return!!this.$u},l.toISOString=function(){return this.toDate().toISOString()},l.toString=function(){return this.toDate().toUTCString()};var a=l.toDate;l.toDate=function(e){return e==="s"&&this.$offset?D(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():a.call(this)};var g=l.diff;l.diff=function(e,u,w){if(e&&this.$u===e.$u)return g.call(this,e,u,w);var S=this.local(),x=D(e).local();return g.call(S,x,u,w)}}})})(yt);var Dt=tt;G.extend(gt),G.extend(Dt),G.extend(Ot);const ut=Object.entries,Mt=Object.keys,ot=s=>s.reduce((T,{type:p})=>T+(p==="title"?50:p==="heading"?20:p==="custom"?10:1),0),St=(s,T)=>{var p;const v={};for(const[C,O]of ut(T)){const m=((p=T[C.replace(/\/[^\\]*$/,"")])==null?void 0:p.title)||"",D=`${m?`${m} > `:""}${O.title}`,l=J(O.title,s);l&&(v[D]=[...v[D]||[],{type:"title",path:C,display:l}]),O.customFields&&ut(O.customFields).forEach(([f,Y])=>{Y.forEach(y=>{const i=J(y,s);i&&(v[D]=[...v[D]||[],{type:"custom",path:C,index:f,display:i}])})});for(const f of O.contents){const Y=J(f.header,s);Y&&(v[D]=[...v[D]||[],{type:"heading",path:C+(f.slug?`#${f.slug}`:""),display:Y}]);for(const y of f.contents){const i=J(y,s);i&&(v[D]=[...v[D]||[],{type:"content",header:f.header,path:C+(f.slug?`#${f.slug}`:""),display:i}])}}}return Mt(v).sort((C,O)=>ot(v[C])-ot(v[O])).map(C=>({title:C,contents:v[C]}))},bt=JSON.parse("{\"/\":{\"/code/\":{\"title\":\"代码开发\",\"contents\":[{\"header\":\"\",\"slug\":\"\",\"contents\":[\"注意\",\"笔者水平有限，对于这部分内容不要盲目参考。\"]}]},\"/code/java/\":{\"title\":\"Java\",\"contents\":[]},\"/code/java/best-practice.html\":{\"title\":\"最佳实践\",\"contents\":[{\"header\":\"使用现有的实现优于自行开发\",\"slug\":\"使用现有的实现优于自行开发\",\"contents\":[\"在实现某一功能前，首先考虑该功能是否已经有成熟、可靠、标准的实现。 如果该实现可以满足需求，则优先考虑使用现有实现，而非自行开发。\",\"使用现有实现有着以下好处：\",\"代码统一（重复造轮子会导致代码冗余）\",\"开发简便（无需自行开发）\",\"可靠性高（业界成熟的实现已经经过时间的考验）\"]},{\"header\":\"使用优于使用\",\"slug\":\"使用valueof-优于使用new\",\"contents\":[\"通常某些类会为客户提供一些static的方法用于返回该类的实例。 一个常见的例子是各种基本类型的封装类。 如Integer:\",\"可以看到，valueOf()通过使用cache来复用对象，从而避免了创建过多对象。\",\"使用new()意味着创建一个对象的实例。 每使用一次new()就会有一个实例被创建。 而静态对象创建方法则不然，类的设计者可以在方法内部进行特殊的优化。从而实现对象复用等目的。 因此，应该首先考虑使用valueOf()\",\"扩展\",\"该词条可以扩展为：使用静态构造方法优于直接使用构造方法\"]},{\"header\":\"使用优于使用\",\"slug\":\"使用stringutils-substring-优于使用s-substring\",\"contents\":[\"可以看到，StringUtils.substring()对原生的substring()作了进一步的封装。\",\"主要体现在以下几点：\",\"空指针检查(15-17)\",\"边界处理(28-30, 33-35, 37-42)\",\"负下标功能(20-25)\",\"因此，使用StringUtils.substring()，你可以获得以下好处：\",\"绝对不会抛出异常\",\"绝对不会返回nul（除非str本身为null）\",\"处理末尾时的便捷性\"]},{\"header\":\"使用try-with-resource优于finally close\",\"slug\":\"使用try-with-resource优于finally-close\",\"contents\":[\"实现了AutoCloseable接口的对象都可以声明在try()中， try catch代码块执行完毕后声明在try()中的变量会自动关闭。\",\"使用try-with-resource也可以很好地避免忘记关闭流之类的情况。\"]},{\"header\":\"使用'_'来使长数字更加可读\",\"slug\":\"使用-来使长数字更加可读\",\"contents\":[\"提示\",\"你应该总是使用‘L’来表示long字面值，而非'l'。\"]},{\"header\":\"使用封装好的读写方法优于原生读写\",\"slug\":\"使用封装好的读写方法优于原生读写\",\"contents\":[]},{\"header\":\"小文件读写\",\"slug\":\"小文件读写\",\"contents\":[\"java.nio.file.Files提供了一些简单易用的读取方法。\",\"java.nio.file.Files也提供了一些简单易用的写入方法。\",\"这些方法在读/写小文件时非常好用。使用者无需考虑关闭流等繁琐的细节。 但并不适合读/写大文件。因为这些方法都尝试一次性将文件内容读/写到内存中。 特别地，由于byte[]的长度限制，诸如readAllBytes()，write(..byte[]..)一类的方法最多只能读/写2147483647B，即2GB。\",\"相关信息\",\"以上文本读/写方法在不声明Charset时，默认为sun.nio.cs.UTF_8.INSTANCE\",\"类似的工具类还有apache的FileUtils，IOUtils。\"]},{\"header\":\"大文件读取\",\"slug\":\"大文件读取\",\"contents\":[]},{\"header\":\"二进制\",\"slug\":\"二进制\",\"contents\":[\"Java 11提供了byte[] InputStream.readNBytes(int len) 若使用Java 8可以考虑copyreadNBytes()的实现。\"]},{\"header\":\"文本\",\"slug\":\"文本\",\"contents\":[\"考虑使用org.apache.commons.io.IOUtils.lineIterator()\"]},{\"header\":\"考虑复用对象\",\"slug\":\"考虑复用对象\",\"contents\":[\"考虑以下代码\",\"该方法用来判断一个字符串是否是保留到两位小数的正数（或是\\\"0.00\\\"）。 乍一看似乎没什么问题，让我们看看内部发生了什么事情。\",\"可以看到内部会创建一个Pattern对象和Matcher对象。 如果isAmt()被调用一百万次，就会创建一百万个Pattern对象！ 而这些Pattern对象之间根本没什么不同！\",\"改进：\"]}]},\"/code/java/common-tools.html\":{\"title\":\"常用工具\",\"contents\":[{\"header\":\"Apache Commons Lang\",\"slug\":\"apache-commons-lang\",\"contents\":[]}]},\"/code/java/how-to.html\":{\"title\":\"场景驱动\",\"contents\":[{\"header\":\"如何精确计算金额？\",\"slug\":\"如何精确计算金额\",\"contents\":[]},{\"header\":\"场景\",\"slug\":\"场景\",\"contents\":[\"发票金额信息包含以下三种：\",\"金额\",\"税额\",\"价税合计\",\"其中每种金额都精确到小数点后两位。如：36.78。 现已知金额和税额，想要计算价税合计。\"]},{\"header\":\"解决方案\",\"slug\":\"解决方案\",\"contents\":[]},{\"header\":\"1. 使用\",\"slug\":\"_1-使用bigdecimal\",\"contents\":[]},{\"header\":\"2. 转为整数运算\",\"slug\":\"_2-转为整数运算\",\"contents\":[\"提示\",\"int的最大值为：2147483647，最大可表示金额为：2147,4836.47元 当金额数较大时考虑使用long\",\"注意\",\"示例代码出于简洁，使用了String.matches()方法。 该方法内部会创建一个Pattern和一个Matcher对象。 为了避免重复创建对象造成的开销，在实际开发中，如果一个正则表达式会被多次使用， 你应该考虑复用该表达式对应的Pattern。 详细可以参考考虑复用对象\"]},{\"header\":\"比较\",\"slug\":\"比较\",\"contents\":[\"BigDecimal使用起来较为简单直接，但是效率不如整数运算。 整数运算仅在输入和输出时进行一次类型转换（string<->int），其余均为整型运算，效率较高。 如果注重性能且涉及到多次运算，推荐使用整数运算。\"]},{\"header\":\"如何比较两个文件内容是否一致？\",\"slug\":\"如何比较两个文件内容是否一致\",\"contents\":[]},{\"header\":\"场景\",\"slug\":\"场景-1\",\"contents\":[\"校验文件完整性 将源文件分段传输后合并，检查合并后的文件是否完整。\"]},{\"header\":\"解决方案\",\"slug\":\"解决方案-1\",\"contents\":[]},{\"header\":\"利用校验和\",\"slug\":\"利用校验和\",\"contents\":[\"提示\",\"FileUtils也提供了checksum(final File file, final Checksum checksum)方法，可以自行选择校验算法\"]},{\"header\":\"如何转换数据库中查回来的数据？\",\"slug\":\"如何转换数据库中查回来的数据\",\"contents\":[]},{\"header\":\"场景\",\"slug\":\"场景-2\",\"contents\":[\"数据库中user表的head_icon列存储的是头像所在路径，希望每次查询出该列时， 自动读取文件并转换为base64字符串。\"]},{\"header\":\"解决方案\",\"slug\":\"解决方案-2\",\"contents\":[]},{\"header\":\"\",\"slug\":\"typehandler\",\"contents\":[]},{\"header\":\"定义对应的\",\"slug\":\"定义对应的typehandler\",\"contents\":[]},{\"header\":\"使用\",\"slug\":\"使用typehandler\",\"contents\":[\"由于只希望该类型处理器作用在head_icon列，而不是所有的类型是varchar的列， 所以这里不使用全局注册TypeHandler。\",\"Raw use\",\"注解（MyBatis-Plus）\",\"以下示例省略了其他注解。\",\"提示\",\"笔者在使用自定义的TypeHandler时，@Autowired注解并不能生效。 应该是因为MyBatis在使用我的自定义TypeHandler时，并不是从IOC容器中拿取的缘故。\",\"提示\",\"可以进一步使用组合注解进行优化\"]},{\"header\":\"当失效时应如何注入依赖？\",\"slug\":\"当-autowired失效时应如何注入依赖\",\"contents\":[]},{\"header\":\"场景\",\"slug\":\"场景-3\",\"contents\":[\"众所周知，@Autowired是依赖于IOC容器的。 @Autowired生效需要满足以下条件\",\"@Autowired所在类（即要被依赖注入的类）在IOC容器中\",\"@Autowired所注解的依赖（即要注入的依赖）在IOC容器中\",\"⚠️注意：即使依赖被成功注入，也只是被IOC管理的那个bean实例的依赖被成功注入了。 因此，被依赖注入的类的其他实例是拿不到依赖对象的。\",\"举个例子：\",\"只要User类在包扫描路径下，那么IOC容器里就确实会有一个User类型的bean， 而且这个bean的imgService不为空。 但该示例中，user是由findUserById()返回的新实例， 并没有经过Spring IOC，因此user的ImgService为null。\"]},{\"header\":\"解决方案\",\"slug\":\"解决方案-3\",\"contents\":[]},{\"header\":\"如何使IDEA Gradle项目默认使用本地Gradle?\",\"slug\":\"如何使idea-gradle项目默认使用本地gradle\",\"contents\":[]},{\"header\":\"场景\",\"slug\":\"场景-4\",\"contents\":[\"当远程git仓库没有.idea文件夹时，拉取下来的代码默认使用gradle wrapper。 但项目总是想要使用本地gradle，想要更改该配置，但idea没有提供图形接口。\"]},{\"header\":\"解决方案\",\"slug\":\"解决方案-4\",\"contents\":[\"Help > Edit Custom Properties...\",\"在打开的idea.properties文件中输入：\",\"之后重启IDEA即可。\",\"IDEA内置Gradle插件源码在以下部分处理新Gradle项目的项目级别配置。 其中行高亮部分用来设置Use Gradle from:配置项的\"]}]},\"/common-operations/linux/commons.html\":{\"title\":\"通用\",\"contents\":[{\"header\":\"命令行\",\"slug\":\"命令行\",\"contents\":[]},{\"header\":\"删除\",\"slug\":\"删除\",\"contents\":[\"Ctrl + u\",\"删除整行，将光标移动到行首\",\"Ctrl + k\",\"删除光标所在位置及其以后的所有字符\"]},{\"header\":\"光标移动\",\"slug\":\"光标移动\",\"contents\":[\"Ctrl + a\",\"光标移动到行首\",\"Ctrl + e\",\"光标移动到行尾\",\"Alt + 左箭头\",\"向前移动一个单词\",\"Alt + 右箭头\",\"向后移动一个单词\"]},{\"header\":\"历史命令\",\"slug\":\"历史命令\",\"contents\":[\"history\",\"显示命令执行记录\",\"Ctrl + r\",\"开启搜索模式，搜索历史命令\",\"在该模式下按Ctrl + r可以继续向前搜索\",\"按回车可以直接执行命令\",\"按Ctrl + e可以选中命令并使光标到行尾但并不执行\",\"按Ctrl + g可以退出搜索模式\",\"使用![命令id]可以执行历史命令\"]}]},\"/common-operations/linux/vi.html\":{\"title\":\"Vi\",\"contents\":[{\"header\":\"文件格式\",\"slug\":\"文件格式\",\"contents\":[]},{\"header\":\"查看文件格式\",\"slug\":\"查看文件格式\",\"contents\":[\":set ff （ff为file format的缩写）\"]},{\"header\":\"修改文件格式\",\"slug\":\"修改文件格式\",\"contents\":[\":set ff=unix 类unix系统文件格式，换行符为\\\\n\",\":set ff=dos Windows文件格式，换行符为\\\\r\\\\n\",\"当windows下的文件传输到linux上时，可以使用:set ff=unix来转换换行符\"]},{\"header\":\"文件编码\",\"slug\":\"文件编码\",\"contents\":[]},{\"header\":\"查看文件编码\",\"slug\":\"查看文件编码\",\"contents\":[\":set fileencoding\"]},{\"header\":\"修改文件编码\",\"slug\":\"修改文件编码\",\"contents\":[\":set fileencoding=utf-8 # 修改文件编码为utf-8\"]},{\"header\":\"跳转\",\"slug\":\"跳转\",\"contents\":[]},{\"header\":\"\",\"slug\":\"\",\"contents\":[\":set number 显示行号\",\":set nonumber 取消显示行号\"]},{\"header\":\"绝对跳转\",\"slug\":\"绝对跳转\",\"contents\":[\"假设当前文件有97行\",\":66 跳转到66行\",\":100 跳转到97行（最后一行）\",\":0 跳转到第一行\",\":1 跳转到第一行\"]},{\"header\":\"相对跳转\",\"slug\":\"相对跳转\",\"contents\":[\"假设当前文件有46行，现在光标位于24行\",\":+10 跳转到第34行，相对当前行向前10行\",\":-8 跳转到第16行，相对于当前行后退8行\",\":+100 跳转到第46行（最后一行）\",\":-100 报错：Invalid range\"]},{\"header\":\"搜索\",\"slug\":\"搜索\",\"contents\":[\"/[regex] 向下搜索\",\"?[regex] 向后搜索\",\"n: 向下选择下一个匹配结果\",\"N: 向上选择上一个匹配结果\",\"提示\",\"助记：n: next 也可以使用3n, 10N等[整数][n|N]的形式来跳跃选择。 如3n表示向下选择第三个匹配结果。\"]},{\"header\":\"编辑\",\"slug\":\"编辑\",\"contents\":[]},{\"header\":\"撤回\",\"slug\":\"撤回\",\"contents\":[\"u 撤回\",\"Ctrl + r 取消撤回\"]},{\"header\":\"光标移动\",\"slug\":\"光标移动\",\"contents\":[]},{\"header\":\"单词移动\",\"slug\":\"单词移动\",\"contents\":[\"w: 光标跳转到下一个单词开头 word\",\"b: 光标跳转到当前单词开头 begin\",\"e: 光标跳转到当前单词末尾           end\"]}]},\"/common-operations/linux/\":{\"title\":\"Linux\",\"contents\":[]},\"/common-operations/\":{\"title\":\"Common Operations\",\"contents\":[]}}}");self.onmessage=({data:s})=>{self.postMessage(St(s.query,bt[s.routeLocale]))};
//# sourceMappingURL=original.js.map

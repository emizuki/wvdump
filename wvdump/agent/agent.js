📦
241008 /wvdump/agent/agent.src.js
✄
var gi=Object.defineProperty;var yi=(n,e)=>{for(var t in e)gi(n,t,{get:e[t],enumerable:!0})};var Ie=[],be=[],Ht="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(let n=0,e=Ht.length;n<e;++n)Ie[n]=Ht[n],be[Ht.charCodeAt(n)]=n;be[45]=62;be[95]=63;function bi(n){let e=n.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");let t=n.indexOf("=");t===-1&&(t=e);let r=t===e?0:4-t%4;return[t,r]}function Ei(n,e,t){return(e+t)*3/4-t}function Ar(n){let e=bi(n),t=e[0],r=e[1],o=new Uint8Array(Ei(n,t,r)),i=0,s=r>0?t-4:t,c;for(c=0;c<s;c+=4){let a=be[n.charCodeAt(c)]<<18|be[n.charCodeAt(c+1)]<<12|be[n.charCodeAt(c+2)]<<6|be[n.charCodeAt(c+3)];o[i++]=a>>16&255,o[i++]=a>>8&255,o[i++]=a&255}if(r===2){let a=be[n.charCodeAt(c)]<<2|be[n.charCodeAt(c+1)]>>4;o[i++]=a&255}if(r===1){let a=be[n.charCodeAt(c)]<<10|be[n.charCodeAt(c+1)]<<4|be[n.charCodeAt(c+2)]>>2;o[i++]=a>>8&255,o[i++]=a&255}return o}function vi(n){return Ie[n>>18&63]+Ie[n>>12&63]+Ie[n>>6&63]+Ie[n&63]}function Si(n,e,t){let r=[];for(let o=e;o<t;o+=3){let i=(n[o]<<16&16711680)+(n[o+1]<<8&65280)+(n[o+2]&255);r.push(vi(i))}return r.join("")}function Zt(n){let e=n.length,t=e%3,r=[],o=16383;for(let i=0,s=e-t;i<s;i+=o)r.push(Si(n,i,i+o>s?s:i+o));if(t===1){let i=n[e-1];r.push(Ie[i>>2]+Ie[i<<4&63]+"==")}else if(t===2){let i=(n[e-2]<<8)+n[e-1];r.push(Ie[i>>10]+Ie[i>>4&63]+Ie[i<<2&63]+"=")}return r.join("")}function nt(n,e,t,r,o){let i,s,c=o*8-r-1,a=(1<<c)-1,l=a>>1,d=-7,p=t?o-1:0,f=t?-1:1,u=n[e+p];for(p+=f,i=u&(1<<-d)-1,u>>=-d,d+=c;d>0;)i=i*256+n[e+p],p+=f,d-=8;for(s=i&(1<<-d)-1,i>>=-d,d+=r;d>0;)s=s*256+n[e+p],p+=f,d-=8;if(i===0)i=1-l;else{if(i===a)return s?NaN:(u?-1:1)*(1/0);s=s+Math.pow(2,r),i=i-l}return(u?-1:1)*s*Math.pow(2,i-r)}function qt(n,e,t,r,o,i){let s,c,a,l=i*8-o-1,d=(1<<l)-1,p=d>>1,f=o===23?Math.pow(2,-24)-Math.pow(2,-77):0,u=r?0:i-1,_=r?1:-1,h=e<0||e===0&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(c=isNaN(e)?1:0,s=d):(s=Math.floor(Math.log(e)/Math.LN2),e*(a=Math.pow(2,-s))<1&&(s--,a*=2),s+p>=1?e+=f/a:e+=f*Math.pow(2,1-p),e*a>=2&&(s++,a/=2),s+p>=d?(c=0,s=d):s+p>=1?(c=(e*a-1)*Math.pow(2,o),s=s+p):(c=e*Math.pow(2,p-1)*Math.pow(2,o),s=0));o>=8;)n[t+u]=c&255,u+=_,c/=256,o-=8;for(s=s<<o|c,l+=o;l>0;)n[t+u]=s&255,u+=_,s/=256,l-=8;n[t+u-_]|=h*128}var Ci={INSPECT_MAX_BYTES:50},Kt=2147483647;m.TYPED_ARRAY_SUPPORT=!0;Object.defineProperty(m.prototype,"parent",{enumerable:!0,get:function(){if(m.isBuffer(this))return this.buffer}});Object.defineProperty(m.prototype,"offset",{enumerable:!0,get:function(){if(m.isBuffer(this))return this.byteOffset}});function Te(n){if(n>Kt)throw new RangeError('The value "'+n+'" is invalid for option "size"');let e=new Uint8Array(n);return Object.setPrototypeOf(e,m.prototype),e}function m(n,e,t){if(typeof n=="number"){if(typeof e=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return Xt(n)}return Nr(n,e,t)}m.poolSize=8192;function Nr(n,e,t){if(typeof n=="string")return Ai(n,e);if(ArrayBuffer.isView(n))return Ti(n);if(n==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof n);if(n instanceof ArrayBuffer||n&&n.buffer instanceof ArrayBuffer||n instanceof SharedArrayBuffer||n&&n.buffer instanceof SharedArrayBuffer)return Qt(n,e,t);if(typeof n=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');let r=n.valueOf&&n.valueOf();if(r!=null&&r!==n)return m.from(r,e,t);let o=xi(n);if(o)return o;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof n[Symbol.toPrimitive]=="function")return m.from(n[Symbol.toPrimitive]("string"),e,t);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof n)}m.from=function(n,e,t){return Nr(n,e,t)};Object.setPrototypeOf(m.prototype,Uint8Array.prototype);Object.setPrototypeOf(m,Uint8Array);function Mr(n){if(typeof n!="number")throw new TypeError('"size" argument must be of type number');if(n<0)throw new RangeError('The value "'+n+'" is invalid for option "size"')}function Li(n,e,t){return Mr(n),n<=0?Te(n):e!==void 0?typeof t=="string"?Te(n).fill(e,t):Te(n).fill(e):Te(n)}m.alloc=function(n,e,t){return Li(n,e,t)};function Xt(n){return Mr(n),Te(n<0?0:en(n)|0)}m.allocUnsafe=function(n){return Xt(n)};m.allocUnsafeSlow=function(n){return Xt(n)};function Ai(n,e){if((typeof e!="string"||e==="")&&(e="utf8"),!m.isEncoding(e))throw new TypeError("Unknown encoding: "+e);let t=Rr(n,e)|0,r=Te(t),o=r.write(n,e);return o!==t&&(r=r.slice(0,o)),r}function Wt(n){let e=n.length<0?0:en(n.length)|0,t=Te(e);for(let r=0;r<e;r+=1)t[r]=n[r]&255;return t}function Ti(n){if(n instanceof Uint8Array){let e=new Uint8Array(n);return Qt(e.buffer,e.byteOffset,e.byteLength)}return Wt(n)}function Qt(n,e,t){if(e<0||n.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(n.byteLength<e+(t||0))throw new RangeError('"length" is outside of buffer bounds');let r;return e===void 0&&t===void 0?r=new Uint8Array(n):t===void 0?r=new Uint8Array(n,e):r=new Uint8Array(n,e,t),Object.setPrototypeOf(r,m.prototype),r}function xi(n){if(m.isBuffer(n)){let e=en(n.length)|0,t=Te(e);return t.length===0||n.copy(t,0,0,e),t}if(n.length!==void 0)return typeof n.length!="number"||Number.isNaN(n.length)?Te(0):Wt(n);if(n.type==="Buffer"&&Array.isArray(n.data))return Wt(n.data)}function en(n){if(n>=Kt)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+Kt.toString(16)+" bytes");return n|0}m.isBuffer=function(e){return e!=null&&e._isBuffer===!0&&e!==m.prototype};m.compare=function(e,t){if(e instanceof Uint8Array&&(e=m.from(e,e.offset,e.byteLength)),t instanceof Uint8Array&&(t=m.from(t,t.offset,t.byteLength)),!m.isBuffer(e)||!m.isBuffer(t))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;let r=e.length,o=t.length;for(let i=0,s=Math.min(r,o);i<s;++i)if(e[i]!==t[i]){r=e[i],o=t[i];break}return r<o?-1:o<r?1:0};m.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}};m.concat=function(e,t){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(e.length===0)return m.alloc(0);let r;if(t===void 0)for(t=0,r=0;r<e.length;++r)t+=e[r].length;let o=m.allocUnsafe(t),i=0;for(r=0;r<e.length;++r){let s=e[r];if(s instanceof Uint8Array)i+s.length>o.length?(m.isBuffer(s)||(s=m.from(s.buffer,s.byteOffset,s.byteLength)),s.copy(o,i)):Uint8Array.prototype.set.call(o,s,i);else if(m.isBuffer(s))s.copy(o,i);else throw new TypeError('"list" argument must be an Array of Buffers');i+=s.length}return o};function Rr(n,e){if(m.isBuffer(n))return n.length;if(ArrayBuffer.isView(n)||n instanceof ArrayBuffer)return n.byteLength;if(typeof n!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof n);let t=n.length,r=arguments.length>2&&arguments[2]===!0;if(!r&&t===0)return 0;let o=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return t;case"utf8":case"utf-8":return Yt(n).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return t*2;case"hex":return t>>>1;case"base64":return Vr(n).length;default:if(o)return r?-1:Yt(n).length;e=(""+e).toLowerCase(),o=!0}}m.byteLength=Rr;function ki(n,e,t){let r=!1;if((e===void 0||e<0)&&(e=0),e>this.length||((t===void 0||t>this.length)&&(t=this.length),t<=0)||(t>>>=0,e>>>=0,t<=e))return"";for(n||(n="utf8");;)switch(n){case"hex":return Bi(this,e,t);case"utf8":case"utf-8":return jr(this,e,t);case"ascii":return Di(this,e,t);case"latin1":case"binary":return Ui(this,e,t);case"base64":return Pi(this,e,t);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return zi(this,e,t);default:if(r)throw new TypeError("Unknown encoding: "+n);n=(n+"").toLowerCase(),r=!0}}m.prototype._isBuffer=!0;function Fe(n,e,t){let r=n[e];n[e]=n[t],n[t]=r}m.prototype.swap16=function(){let e=this.length;if(e%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let t=0;t<e;t+=2)Fe(this,t,t+1);return this};m.prototype.swap32=function(){let e=this.length;if(e%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let t=0;t<e;t+=4)Fe(this,t,t+3),Fe(this,t+1,t+2);return this};m.prototype.swap64=function(){let e=this.length;if(e%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let t=0;t<e;t+=8)Fe(this,t,t+7),Fe(this,t+1,t+6),Fe(this,t+2,t+5),Fe(this,t+3,t+4);return this};m.prototype.toString=function(){let e=this.length;return e===0?"":arguments.length===0?jr(this,0,e):ki.apply(this,arguments)};m.prototype.toLocaleString=m.prototype.toString;m.prototype.equals=function(e){if(!m.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e?!0:m.compare(this,e)===0};m.prototype.inspect=function(){let e="",t=Ci.INSPECT_MAX_BYTES;return e=this.toString("hex",0,t).replace(/(.{2})/g,"$1 ").trim(),this.length>t&&(e+=" ... "),"<Buffer "+e+">"};m.prototype[Symbol.for("nodejs.util.inspect.custom")]=m.prototype.inspect;m.prototype.compare=function(e,t,r,o,i){if(e instanceof Uint8Array&&(e=m.from(e,e.offset,e.byteLength)),!m.isBuffer(e))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(t===void 0&&(t=0),r===void 0&&(r=e?e.length:0),o===void 0&&(o=0),i===void 0&&(i=this.length),t<0||r>e.length||o<0||i>this.length)throw new RangeError("out of range index");if(o>=i&&t>=r)return 0;if(o>=i)return-1;if(t>=r)return 1;if(t>>>=0,r>>>=0,o>>>=0,i>>>=0,this===e)return 0;let s=i-o,c=r-t,a=Math.min(s,c),l=this.slice(o,i),d=e.slice(t,r);for(let p=0;p<a;++p)if(l[p]!==d[p]){s=l[p],c=d[p];break}return s<c?-1:c<s?1:0};function Or(n,e,t,r,o){if(n.length===0)return-1;if(typeof t=="string"?(r=t,t=0):t>2147483647?t=2147483647:t<-2147483648&&(t=-2147483648),t=+t,Number.isNaN(t)&&(t=o?0:n.length-1),t<0&&(t=n.length+t),t>=n.length){if(o)return-1;t=n.length-1}else if(t<0)if(o)t=0;else return-1;if(typeof e=="string"&&(e=m.from(e,r)),m.isBuffer(e))return e.length===0?-1:Tr(n,e,t,r,o);if(typeof e=="number")return e=e&255,typeof Uint8Array.prototype.indexOf=="function"?o?Uint8Array.prototype.indexOf.call(n,e,t):Uint8Array.prototype.lastIndexOf.call(n,e,t):Tr(n,[e],t,r,o);throw new TypeError("val must be string, number or Buffer")}function Tr(n,e,t,r,o){let i=1,s=n.length,c=e.length;if(r!==void 0&&(r=String(r).toLowerCase(),r==="ucs2"||r==="ucs-2"||r==="utf16le"||r==="utf-16le")){if(n.length<2||e.length<2)return-1;i=2,s/=2,c/=2,t/=2}function a(d,p){return i===1?d[p]:d.readUInt16BE(p*i)}let l;if(o){let d=-1;for(l=t;l<s;l++)if(a(n,l)===a(e,d===-1?0:l-d)){if(d===-1&&(d=l),l-d+1===c)return d*i}else d!==-1&&(l-=l-d),d=-1}else for(t+c>s&&(t=s-c),l=t;l>=0;l--){let d=!0;for(let p=0;p<c;p++)if(a(n,l+p)!==a(e,p)){d=!1;break}if(d)return l}return-1}m.prototype.includes=function(e,t,r){return this.indexOf(e,t,r)!==-1};m.prototype.indexOf=function(e,t,r){return Or(this,e,t,r,!0)};m.prototype.lastIndexOf=function(e,t,r){return Or(this,e,t,r,!1)};function Ni(n,e,t,r){t=Number(t)||0;let o=n.length-t;r?(r=Number(r),r>o&&(r=o)):r=o;let i=e.length;r>i/2&&(r=i/2);let s;for(s=0;s<r;++s){let c=parseInt(e.substr(s*2,2),16);if(Number.isNaN(c))return s;n[t+s]=c}return s}function Mi(n,e,t,r){return vt(Yt(e,n.length-t),n,t,r)}function Ri(n,e,t,r){return vt($i(e),n,t,r)}function Oi(n,e,t,r){return vt(Vr(e),n,t,r)}function ji(n,e,t,r){return vt(Hi(e,n.length-t),n,t,r)}m.prototype.write=function(e,t,r,o){if(t===void 0)o="utf8",r=this.length,t=0;else if(r===void 0&&typeof t=="string")o=t,r=this.length,t=0;else if(isFinite(t))t=t>>>0,isFinite(r)?(r=r>>>0,o===void 0&&(o="utf8")):(o=r,r=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let i=this.length-t;if((r===void 0||r>i)&&(r=i),e.length>0&&(r<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");o||(o="utf8");let s=!1;for(;;)switch(o){case"hex":return Ni(this,e,t,r);case"utf8":case"utf-8":return Mi(this,e,t,r);case"ascii":case"latin1":case"binary":return Ri(this,e,t,r);case"base64":return Oi(this,e,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ji(this,e,t,r);default:if(s)throw new TypeError("Unknown encoding: "+o);o=(""+o).toLowerCase(),s=!0}};m.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function Pi(n,e,t){return e===0&&t===n.length?Zt(n):Zt(n.slice(e,t))}function jr(n,e,t){t=Math.min(n.length,t);let r=[],o=e;for(;o<t;){let i=n[o],s=null,c=i>239?4:i>223?3:i>191?2:1;if(o+c<=t){let a,l,d,p;switch(c){case 1:i<128&&(s=i);break;case 2:a=n[o+1],(a&192)===128&&(p=(i&31)<<6|a&63,p>127&&(s=p));break;case 3:a=n[o+1],l=n[o+2],(a&192)===128&&(l&192)===128&&(p=(i&15)<<12|(a&63)<<6|l&63,p>2047&&(p<55296||p>57343)&&(s=p));break;case 4:a=n[o+1],l=n[o+2],d=n[o+3],(a&192)===128&&(l&192)===128&&(d&192)===128&&(p=(i&15)<<18|(a&63)<<12|(l&63)<<6|d&63,p>65535&&p<1114112&&(s=p))}}s===null?(s=65533,c=1):s>65535&&(s-=65536,r.push(s>>>10&1023|55296),s=56320|s&1023),r.push(s),o+=c}return Fi(r)}var xr=4096;function Fi(n){let e=n.length;if(e<=xr)return String.fromCharCode.apply(String,n);let t="",r=0;for(;r<e;)t+=String.fromCharCode.apply(String,n.slice(r,r+=xr));return t}function Di(n,e,t){let r="";t=Math.min(n.length,t);for(let o=e;o<t;++o)r+=String.fromCharCode(n[o]&127);return r}function Ui(n,e,t){let r="";t=Math.min(n.length,t);for(let o=e;o<t;++o)r+=String.fromCharCode(n[o]);return r}function Bi(n,e,t){let r=n.length;(!e||e<0)&&(e=0),(!t||t<0||t>r)&&(t=r);let o="";for(let i=e;i<t;++i)o+=Zi[n[i]];return o}function zi(n,e,t){let r=n.slice(e,t),o="";for(let i=0;i<r.length-1;i+=2)o+=String.fromCharCode(r[i]+r[i+1]*256);return o}m.prototype.slice=function(e,t){let r=this.length;e=~~e,t=t===void 0?r:~~t,e<0?(e+=r,e<0&&(e=0)):e>r&&(e=r),t<0?(t+=r,t<0&&(t=0)):t>r&&(t=r),t<e&&(t=e);let o=this.subarray(e,t);return Object.setPrototypeOf(o,m.prototype),o};function ae(n,e,t){if(n%1!==0||n<0)throw new RangeError("offset is not uint");if(n+e>t)throw new RangeError("Trying to access beyond buffer length")}m.prototype.readUintLE=m.prototype.readUIntLE=function(e,t,r){e=e>>>0,t=t>>>0,r||ae(e,t,this.length);let o=this[e],i=1,s=0;for(;++s<t&&(i*=256);)o+=this[e+s]*i;return o};m.prototype.readUintBE=m.prototype.readUIntBE=function(e,t,r){e=e>>>0,t=t>>>0,r||ae(e,t,this.length);let o=this[e+--t],i=1;for(;t>0&&(i*=256);)o+=this[e+--t]*i;return o};m.prototype.readUint8=m.prototype.readUInt8=function(e,t){return e=e>>>0,t||ae(e,1,this.length),this[e]};m.prototype.readUint16LE=m.prototype.readUInt16LE=function(e,t){return e=e>>>0,t||ae(e,2,this.length),this[e]|this[e+1]<<8};m.prototype.readUint16BE=m.prototype.readUInt16BE=function(e,t){return e=e>>>0,t||ae(e,2,this.length),this[e]<<8|this[e+1]};m.prototype.readUint32LE=m.prototype.readUInt32LE=function(e,t){return e=e>>>0,t||ae(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+this[e+3]*16777216};m.prototype.readUint32BE=m.prototype.readUInt32BE=function(e,t){return e=e>>>0,t||ae(e,4,this.length),this[e]*16777216+(this[e+1]<<16|this[e+2]<<8|this[e+3])};m.prototype.readBigUInt64LE=function(e){e=e>>>0,He(e,"offset");let t=this[e],r=this[e+7];(t===void 0||r===void 0)&&rt(e,this.length-8);let o=t+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24,i=this[++e]+this[++e]*2**8+this[++e]*2**16+r*2**24;return BigInt(o)+(BigInt(i)<<BigInt(32))};m.prototype.readBigUInt64BE=function(e){e=e>>>0,He(e,"offset");let t=this[e],r=this[e+7];(t===void 0||r===void 0)&&rt(e,this.length-8);let o=t*2**24+this[++e]*2**16+this[++e]*2**8+this[++e],i=this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+r;return(BigInt(o)<<BigInt(32))+BigInt(i)};m.prototype.readIntLE=function(e,t,r){e=e>>>0,t=t>>>0,r||ae(e,t,this.length);let o=this[e],i=1,s=0;for(;++s<t&&(i*=256);)o+=this[e+s]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*t)),o};m.prototype.readIntBE=function(e,t,r){e=e>>>0,t=t>>>0,r||ae(e,t,this.length);let o=t,i=1,s=this[e+--o];for(;o>0&&(i*=256);)s+=this[e+--o]*i;return i*=128,s>=i&&(s-=Math.pow(2,8*t)),s};m.prototype.readInt8=function(e,t){return e=e>>>0,t||ae(e,1,this.length),this[e]&128?(255-this[e]+1)*-1:this[e]};m.prototype.readInt16LE=function(e,t){e=e>>>0,t||ae(e,2,this.length);let r=this[e]|this[e+1]<<8;return r&32768?r|4294901760:r};m.prototype.readInt16BE=function(e,t){e=e>>>0,t||ae(e,2,this.length);let r=this[e+1]|this[e]<<8;return r&32768?r|4294901760:r};m.prototype.readInt32LE=function(e,t){return e=e>>>0,t||ae(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24};m.prototype.readInt32BE=function(e,t){return e=e>>>0,t||ae(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]};m.prototype.readBigInt64LE=function(e){e=e>>>0,He(e,"offset");let t=this[e],r=this[e+7];(t===void 0||r===void 0)&&rt(e,this.length-8);let o=this[e+4]+this[e+5]*2**8+this[e+6]*2**16+(r<<24);return(BigInt(o)<<BigInt(32))+BigInt(t+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24)};m.prototype.readBigInt64BE=function(e){e=e>>>0,He(e,"offset");let t=this[e],r=this[e+7];(t===void 0||r===void 0)&&rt(e,this.length-8);let o=(t<<24)+this[++e]*2**16+this[++e]*2**8+this[++e];return(BigInt(o)<<BigInt(32))+BigInt(this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+r)};m.prototype.readFloatLE=function(e,t){return e=e>>>0,t||ae(e,4,this.length),nt(this,e,!0,23,4)};m.prototype.readFloatBE=function(e,t){return e=e>>>0,t||ae(e,4,this.length),nt(this,e,!1,23,4)};m.prototype.readDoubleLE=function(e,t){return e=e>>>0,t||ae(e,8,this.length),nt(this,e,!0,52,8)};m.prototype.readDoubleBE=function(e,t){return e=e>>>0,t||ae(e,8,this.length),nt(this,e,!1,52,8)};function fe(n,e,t,r,o,i){if(!m.isBuffer(n))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>o||e<i)throw new RangeError('"value" argument is out of bounds');if(t+r>n.length)throw new RangeError("Index out of range")}m.prototype.writeUintLE=m.prototype.writeUIntLE=function(e,t,r,o){if(e=+e,t=t>>>0,r=r>>>0,!o){let c=Math.pow(2,8*r)-1;fe(this,e,t,r,c,0)}let i=1,s=0;for(this[t]=e&255;++s<r&&(i*=256);)this[t+s]=e/i&255;return t+r};m.prototype.writeUintBE=m.prototype.writeUIntBE=function(e,t,r,o){if(e=+e,t=t>>>0,r=r>>>0,!o){let c=Math.pow(2,8*r)-1;fe(this,e,t,r,c,0)}let i=r-1,s=1;for(this[t+i]=e&255;--i>=0&&(s*=256);)this[t+i]=e/s&255;return t+r};m.prototype.writeUint8=m.prototype.writeUInt8=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,1,255,0),this[t]=e&255,t+1};m.prototype.writeUint16LE=m.prototype.writeUInt16LE=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,2,65535,0),this[t]=e&255,this[t+1]=e>>>8,t+2};m.prototype.writeUint16BE=m.prototype.writeUInt16BE=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=e&255,t+2};m.prototype.writeUint32LE=m.prototype.writeUInt32LE=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=e&255,t+4};m.prototype.writeUint32BE=m.prototype.writeUInt32BE=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=e&255,t+4};function Pr(n,e,t,r,o){zr(e,r,o,n,t,7);let i=Number(e&BigInt(4294967295));n[t++]=i,i=i>>8,n[t++]=i,i=i>>8,n[t++]=i,i=i>>8,n[t++]=i;let s=Number(e>>BigInt(32)&BigInt(4294967295));return n[t++]=s,s=s>>8,n[t++]=s,s=s>>8,n[t++]=s,s=s>>8,n[t++]=s,t}function Fr(n,e,t,r,o){zr(e,r,o,n,t,7);let i=Number(e&BigInt(4294967295));n[t+7]=i,i=i>>8,n[t+6]=i,i=i>>8,n[t+5]=i,i=i>>8,n[t+4]=i;let s=Number(e>>BigInt(32)&BigInt(4294967295));return n[t+3]=s,s=s>>8,n[t+2]=s,s=s>>8,n[t+1]=s,s=s>>8,n[t]=s,t+8}m.prototype.writeBigUInt64LE=function(e,t=0){return Pr(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))};m.prototype.writeBigUInt64BE=function(e,t=0){return Fr(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))};m.prototype.writeIntLE=function(e,t,r,o){if(e=+e,t=t>>>0,!o){let a=Math.pow(2,8*r-1);fe(this,e,t,r,a-1,-a)}let i=0,s=1,c=0;for(this[t]=e&255;++i<r&&(s*=256);)e<0&&c===0&&this[t+i-1]!==0&&(c=1),this[t+i]=(e/s>>0)-c&255;return t+r};m.prototype.writeIntBE=function(e,t,r,o){if(e=+e,t=t>>>0,!o){let a=Math.pow(2,8*r-1);fe(this,e,t,r,a-1,-a)}let i=r-1,s=1,c=0;for(this[t+i]=e&255;--i>=0&&(s*=256);)e<0&&c===0&&this[t+i+1]!==0&&(c=1),this[t+i]=(e/s>>0)-c&255;return t+r};m.prototype.writeInt8=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=e&255,t+1};m.prototype.writeInt16LE=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,2,32767,-32768),this[t]=e&255,this[t+1]=e>>>8,t+2};m.prototype.writeInt16BE=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=e&255,t+2};m.prototype.writeInt32LE=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,4,2147483647,-2147483648),this[t]=e&255,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4};m.prototype.writeInt32BE=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=e&255,t+4};m.prototype.writeBigInt64LE=function(e,t=0){return Pr(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))};m.prototype.writeBigInt64BE=function(e,t=0){return Fr(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))};function Dr(n,e,t,r,o,i){if(t+r>n.length)throw new RangeError("Index out of range");if(t<0)throw new RangeError("Index out of range")}function Ur(n,e,t,r,o){return e=+e,t=t>>>0,o||Dr(n,e,t,4,34028234663852886e22,-34028234663852886e22),qt(n,e,t,r,23,4),t+4}m.prototype.writeFloatLE=function(e,t,r){return Ur(this,e,t,!0,r)};m.prototype.writeFloatBE=function(e,t,r){return Ur(this,e,t,!1,r)};function Br(n,e,t,r,o){return e=+e,t=t>>>0,o||Dr(n,e,t,8,17976931348623157e292,-17976931348623157e292),qt(n,e,t,r,52,8),t+8}m.prototype.writeDoubleLE=function(e,t,r){return Br(this,e,t,!0,r)};m.prototype.writeDoubleBE=function(e,t,r){return Br(this,e,t,!1,r)};m.prototype.copy=function(e,t,r,o){if(!m.isBuffer(e))throw new TypeError("argument should be a Buffer");if(r||(r=0),!o&&o!==0&&(o=this.length),t>=e.length&&(t=e.length),t||(t=0),o>0&&o<r&&(o=r),o===r||e.length===0||this.length===0)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(o<0)throw new RangeError("sourceEnd out of bounds");o>this.length&&(o=this.length),e.length-t<o-r&&(o=e.length-t+r);let i=o-r;return this===e?this.copyWithin(t,r,o):Uint8Array.prototype.set.call(e,this.subarray(r,o),t),i};m.prototype.fill=function(e,t,r,o){if(typeof e=="string"){if(typeof t=="string"?(o=t,t=0,r=this.length):typeof r=="string"&&(o=r,r=this.length),o!==void 0&&typeof o!="string")throw new TypeError("encoding must be a string");if(typeof o=="string"&&!m.isEncoding(o))throw new TypeError("Unknown encoding: "+o);if(e.length===1){let s=e.charCodeAt(0);(o==="utf8"&&s<128||o==="latin1")&&(e=s)}}else typeof e=="number"?e=e&255:typeof e=="boolean"&&(e=Number(e));if(t<0||this.length<t||this.length<r)throw new RangeError("Out of range index");if(r<=t)return this;t=t>>>0,r=r===void 0?this.length:r>>>0,e||(e=0);let i;if(typeof e=="number")for(i=t;i<r;++i)this[i]=e;else{let s=m.isBuffer(e)?e:m.from(e,o),c=s.length;if(c===0)throw new TypeError('The value "'+e+'" is invalid for argument "value"');for(i=0;i<r-t;++i)this[i+t]=s[i%c]}return this};var $e={};function tn(n,e,t){$e[n]=class extends t{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${n}]`,this.stack,delete this.name}get code(){return n}set code(o){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:o,writable:!0})}toString(){return`${this.name} [${n}]: ${this.message}`}}}tn("ERR_BUFFER_OUT_OF_BOUNDS",function(n){return n?`${n} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError);tn("ERR_INVALID_ARG_TYPE",function(n,e){return`The "${n}" argument must be of type number. Received type ${typeof e}`},TypeError);tn("ERR_OUT_OF_RANGE",function(n,e,t){let r=`The value of "${n}" is out of range.`,o=t;return Number.isInteger(t)&&Math.abs(t)>2**32?o=kr(String(t)):typeof t=="bigint"&&(o=String(t),(t>BigInt(2)**BigInt(32)||t<-(BigInt(2)**BigInt(32)))&&(o=kr(o)),o+="n"),r+=` It must be ${e}. Received ${o}`,r},RangeError);function kr(n){let e="",t=n.length,r=n[0]==="-"?1:0;for(;t>=r+4;t-=3)e=`_${n.slice(t-3,t)}${e}`;return`${n.slice(0,t)}${e}`}function Vi(n,e,t){He(e,"offset"),(n[e]===void 0||n[e+t]===void 0)&&rt(e,n.length-(t+1))}function zr(n,e,t,r,o,i){if(n>t||n<e){let s=typeof e=="bigint"?"n":"",c;throw i>3?e===0||e===BigInt(0)?c=`>= 0${s} and < 2${s} ** ${(i+1)*8}${s}`:c=`>= -(2${s} ** ${(i+1)*8-1}${s}) and < 2 ** ${(i+1)*8-1}${s}`:c=`>= ${e}${s} and <= ${t}${s}`,new $e.ERR_OUT_OF_RANGE("value",c,n)}Vi(r,o,i)}function He(n,e){if(typeof n!="number")throw new $e.ERR_INVALID_ARG_TYPE(e,"number",n)}function rt(n,e,t){throw Math.floor(n)!==n?(He(n,t),new $e.ERR_OUT_OF_RANGE(t||"offset","an integer",n)):e<0?new $e.ERR_BUFFER_OUT_OF_BOUNDS:new $e.ERR_OUT_OF_RANGE(t||"offset",`>= ${t?1:0} and <= ${e}`,n)}var Ji=/[^+/0-9A-Za-z-_]/g;function Gi(n){if(n=n.split("=")[0],n=n.trim().replace(Ji,""),n.length<2)return"";for(;n.length%4!==0;)n=n+"=";return n}function Yt(n,e){e=e||1/0;let t,r=n.length,o=null,i=[];for(let s=0;s<r;++s){if(t=n.charCodeAt(s),t>55295&&t<57344){if(!o){if(t>56319){(e-=3)>-1&&i.push(239,191,189);continue}else if(s+1===r){(e-=3)>-1&&i.push(239,191,189);continue}o=t;continue}if(t<56320){(e-=3)>-1&&i.push(239,191,189),o=t;continue}t=(o-55296<<10|t-56320)+65536}else o&&(e-=3)>-1&&i.push(239,191,189);if(o=null,t<128){if((e-=1)<0)break;i.push(t)}else if(t<2048){if((e-=2)<0)break;i.push(t>>6|192,t&63|128)}else if(t<65536){if((e-=3)<0)break;i.push(t>>12|224,t>>6&63|128,t&63|128)}else if(t<1114112){if((e-=4)<0)break;i.push(t>>18|240,t>>12&63|128,t>>6&63|128,t&63|128)}else throw new Error("Invalid code point")}return i}function $i(n){let e=[];for(let t=0;t<n.length;++t)e.push(n.charCodeAt(t)&255);return e}function Hi(n,e){let t,r,o,i=[];for(let s=0;s<n.length&&!((e-=2)<0);++s)t=n.charCodeAt(s),r=t>>8,o=t%256,i.push(o),i.push(r);return i}function Vr(n){return Ar(Gi(n))}function vt(n,e,t,r){let o;for(o=0;o<r&&!(o+t>=e.length||o>=n.length);++o)e[o+t]=n[o];return o}var Zi=function(){let n="0123456789abcdef",e=new Array(256);for(let t=0;t<16;++t){let r=t*16;for(let o=0;o<16;++o)e[r+o]=n[t]+n[o]}return e}();var Bt={};yi(Bt,{ArtMethod:()=>Mt,ArtStackVisitor:()=>jn,DVM_JNI_ENV_OFFSET_SELF:()=>uo,HandleVector:()=>dt,VariableSizedHandleScope:()=>ut,backtrace:()=>Wn,deoptimizeBootImage:()=>tr,deoptimizeEverything:()=>er,deoptimizeMethod:()=>Xn,ensureClassInitialized:()=>mc,getAndroidApiLevel:()=>te,getAndroidVersion:()=>pt,getApi:()=>J,getArtApexVersion:()=>Jn,getArtClassSpec:()=>$n,getArtFieldSpec:()=>Dt,getArtMethodSpec:()=>me,getArtThreadFromEnv:()=>Ut,getArtThreadSpec:()=>Ke,makeArtClassLoaderVisitor:()=>Kn,makeArtClassVisitor:()=>qn,makeMethodMangler:()=>ll,makeObjectVisitorPredicate:()=>rr,revertGlobalPatches:()=>Qn,translateMethod:()=>dl,withAllArtThreadsSuspended:()=>Zn,withRunnableArtThread:()=>Ee});var{pageSize:nn,pointerSize:qi}=Process,rn=class{constructor(e){this.sliceSize=e,this.slicesPerPage=nn/e,this.pages=[],this.free=[]}allocateSlice(e,t){let r=e.near===void 0,o=t===1;if(r&&o){let i=this.free.pop();if(i!==void 0)return i}else if(t<nn){let{free:i}=this,s=i.length,c=o?null:ptr(t-1);for(let a=0;a!==s;a++){let l=i[a],d=r||this._isSliceNear(l,e),p=o||l.and(c).isNull();if(d&&p)return i.splice(a,1)[0]}}return this._allocatePage(e)}_allocatePage(e){let t=Memory.alloc(nn,e),{sliceSize:r,slicesPerPage:o}=this;for(let i=1;i!==o;i++){let s=t.add(i*r);this.free.push(s)}return this.pages.push(t),t}_isSliceNear(e,t){let r=e.add(this.sliceSize),{near:o,maxDistance:i}=t,s=Jr(o.sub(e)),c=Jr(o.sub(r));return s.compare(i)<=0&&c.compare(i)<=0}freeSlice(e){this.free.push(e)}};function Jr(n){let e=qi===4?31:63,t=ptr(1).shl(e).not();return n.and(t)}function on(n){return new rn(n)}function ue(n,e){if(e!==0)throw new Error(n+" failed: "+e)}var St={v1_0:805371904,v1_2:805372416},wt={canTagObjects:1},{pointerSize:Ki}=Process,Wi={exceptions:"propagate"};function xe(n,e){this.handle=n,this.vm=e,this.vtable=n.readPointer()}xe.prototype.deallocate=ot(47,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});xe.prototype.getLoadedClasses=ot(78,"int32",["pointer","pointer","pointer"],function(n,e,t){let r=n(this.handle,e,t);ue("EnvJvmti::getLoadedClasses",r)});xe.prototype.iterateOverInstancesOfClass=ot(112,"int32",["pointer","pointer","int","pointer","pointer"],function(n,e,t,r,o){let i=n(this.handle,e,t,r,o);ue("EnvJvmti::iterateOverInstancesOfClass",i)});xe.prototype.getObjectsWithTags=ot(114,"int32",["pointer","int","pointer","pointer","pointer","pointer"],function(n,e,t,r,o,i){let s=n(this.handle,e,t,r,o,i);ue("EnvJvmti::getObjectsWithTags",s)});xe.prototype.addCapabilities=ot(142,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});function ot(n,e,t,r){let o=null;return function(){o===null&&(o=new NativeFunction(this.vtable.add((n-1)*Ki).readPointer(),e,t,Wi));let i=[o];return i=i.concat.apply(i,arguments),r.apply(this,i)}}function ke(n,e,{limit:t}){let r=n,o=null;for(let i=0;i!==t;i++){let s=Instruction.parse(r),c=e(s,o);if(c!==null)return c;r=s.next,o=s}return null}function de(n){let e=null,t=!1;return function(...r){return t||(e=n(...r),t=!0),e}}function b(n,e){this.handle=n,this.vm=e}var It=Process.pointerSize,Re=2,Qi=28,Yi=34,Xi=37,es=40,ts=43,ns=46,rs=49,os=52,is=55,ss=58,as=61,cs=64,ls=67,ds=70,us=73,ps=76,fs=79,hs=82,_s=85,ms=88,gs=91,ys=114,bs=117,Es=120,vs=123,Ss=126,ws=129,Is=132,Cs=135,Ls=138,As=141,Ts=95,xs=96,ks=97,Ns=98,Ms=99,Rs=100,Os=101,js=102,Ps=103,Fs=104,Ds=105,Us=106,Bs=107,zs=108,Vs=109,Js=110,Gs=111,$s=112,Hs=145,Zs=146,qs=147,Ks=148,Ws=149,Qs=150,Ys=151,Xs=152,ea=153,ta=154,na=155,ra=156,oa=157,ia=158,sa=159,aa=160,ca=161,la=162,da={pointer:Yi,uint8:Xi,int8:es,uint16:ts,int16:ns,int32:rs,int64:os,float:is,double:ss,void:as},ua={pointer:cs,uint8:ls,int8:ds,uint16:us,int16:ps,int32:fs,int64:hs,float:_s,double:ms,void:gs},pa={pointer:ys,uint8:bs,int8:Es,uint16:vs,int16:Ss,int32:ws,int64:Is,float:Cs,double:Ls,void:As},fa={pointer:Ts,uint8:xs,int8:ks,uint16:Ns,int16:Ms,int32:Rs,int64:Os,float:js,double:Ps},ha={pointer:Fs,uint8:Ds,int8:Us,uint16:Bs,int16:zs,int32:Vs,int64:Js,float:Gs,double:$s},_a={pointer:Hs,uint8:Zs,int8:qs,uint16:Ks,int16:Ws,int32:Qs,int64:Ys,float:Xs,double:ea},ma={pointer:ta,uint8:na,int8:ra,uint16:oa,int16:ia,int32:sa,int64:aa,float:ca,double:la},$r={exceptions:"propagate"},sn=null,gn=[];b.dispose=function(n){gn.forEach(n.deleteGlobalRef,n),gn=[]};function De(n){return gn.push(n),n}function Ct(n){return sn===null&&(sn=n.handle.readPointer()),sn}function x(n,e,t,r){let o=null;return function(){o===null&&(o=new NativeFunction(Ct(this).add(n*It).readPointer(),e,t,$r));let i=[o];return i=i.concat.apply(i,arguments),r.apply(this,i)}}b.prototype.getVersion=x(4,"int32",["pointer"],function(n){return n(this.handle)});b.prototype.findClass=x(6,"pointer",["pointer","pointer"],function(n,e){let t=n(this.handle,Memory.allocUtf8String(e));return this.throwIfExceptionPending(),t});b.prototype.throwIfExceptionPending=function(){let n=this.exceptionOccurred();if(n.isNull())return;this.exceptionClear();let e=this.newGlobalRef(n);this.deleteLocalRef(n);let t=this.vaMethod("pointer",[])(this.handle,e,this.javaLangObject().toString),r=this.stringFromJni(t);this.deleteLocalRef(t);let o=new Error(r);throw o.$h=e,Script.bindWeak(o,ga(this.vm,e)),o};function ga(n,e){return function(){n.perform(t=>{t.deleteGlobalRef(e)})}}b.prototype.fromReflectedMethod=x(7,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.fromReflectedField=x(8,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.toReflectedMethod=x(9,"pointer",["pointer","pointer","pointer","uint8"],function(n,e,t,r){return n(this.handle,e,t,r)});b.prototype.getSuperclass=x(10,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.isAssignableFrom=x(11,"uint8",["pointer","pointer","pointer"],function(n,e,t){return!!n(this.handle,e,t)});b.prototype.toReflectedField=x(12,"pointer",["pointer","pointer","pointer","uint8"],function(n,e,t,r){return n(this.handle,e,t,r)});b.prototype.throw=x(13,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.exceptionOccurred=x(15,"pointer",["pointer"],function(n){return n(this.handle)});b.prototype.exceptionDescribe=x(16,"void",["pointer"],function(n){n(this.handle)});b.prototype.exceptionClear=x(17,"void",["pointer"],function(n){n(this.handle)});b.prototype.pushLocalFrame=x(19,"int32",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.popLocalFrame=x(20,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.newGlobalRef=x(21,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.deleteGlobalRef=x(22,"void",["pointer","pointer"],function(n,e){n(this.handle,e)});b.prototype.deleteLocalRef=x(23,"void",["pointer","pointer"],function(n,e){n(this.handle,e)});b.prototype.isSameObject=x(24,"uint8",["pointer","pointer","pointer"],function(n,e,t){return!!n(this.handle,e,t)});b.prototype.newLocalRef=x(25,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.allocObject=x(27,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.getObjectClass=x(31,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.isInstanceOf=x(32,"uint8",["pointer","pointer","pointer"],function(n,e,t){return!!n(this.handle,e,t)});b.prototype.getMethodId=x(33,"pointer",["pointer","pointer","pointer","pointer"],function(n,e,t,r){return n(this.handle,e,Memory.allocUtf8String(t),Memory.allocUtf8String(r))});b.prototype.getFieldId=x(94,"pointer",["pointer","pointer","pointer","pointer"],function(n,e,t,r){return n(this.handle,e,Memory.allocUtf8String(t),Memory.allocUtf8String(r))});b.prototype.getIntField=x(100,"int32",["pointer","pointer","pointer"],function(n,e,t){return n(this.handle,e,t)});b.prototype.getStaticMethodId=x(113,"pointer",["pointer","pointer","pointer","pointer"],function(n,e,t,r){return n(this.handle,e,Memory.allocUtf8String(t),Memory.allocUtf8String(r))});b.prototype.getStaticFieldId=x(144,"pointer",["pointer","pointer","pointer","pointer"],function(n,e,t,r){return n(this.handle,e,Memory.allocUtf8String(t),Memory.allocUtf8String(r))});b.prototype.getStaticIntField=x(150,"int32",["pointer","pointer","pointer"],function(n,e,t){return n(this.handle,e,t)});b.prototype.getStringLength=x(164,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.getStringChars=x(165,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.releaseStringChars=x(166,"void",["pointer","pointer","pointer"],function(n,e,t){n(this.handle,e,t)});b.prototype.newStringUtf=x(167,"pointer",["pointer","pointer"],function(n,e){let t=Memory.allocUtf8String(e);return n(this.handle,t)});b.prototype.getStringUtfChars=x(169,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.releaseStringUtfChars=x(170,"void",["pointer","pointer","pointer"],function(n,e,t){n(this.handle,e,t)});b.prototype.getArrayLength=x(171,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.newObjectArray=x(172,"pointer",["pointer","int32","pointer","pointer"],function(n,e,t,r){return n(this.handle,e,t,r)});b.prototype.getObjectArrayElement=x(173,"pointer",["pointer","pointer","int32"],function(n,e,t){return n(this.handle,e,t)});b.prototype.setObjectArrayElement=x(174,"void",["pointer","pointer","int32","pointer"],function(n,e,t,r){n(this.handle,e,t,r)});b.prototype.newBooleanArray=x(175,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.newByteArray=x(176,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.newCharArray=x(177,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.newShortArray=x(178,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.newIntArray=x(179,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.newLongArray=x(180,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.newFloatArray=x(181,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.newDoubleArray=x(182,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.getBooleanArrayElements=x(183,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.getByteArrayElements=x(184,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.getCharArrayElements=x(185,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.getShortArrayElements=x(186,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.getIntArrayElements=x(187,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.getLongArrayElements=x(188,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.getFloatArrayElements=x(189,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.getDoubleArrayElements=x(190,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.releaseBooleanArrayElements=x(191,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});b.prototype.releaseByteArrayElements=x(192,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});b.prototype.releaseCharArrayElements=x(193,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});b.prototype.releaseShortArrayElements=x(194,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});b.prototype.releaseIntArrayElements=x(195,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});b.prototype.releaseLongArrayElements=x(196,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});b.prototype.releaseFloatArrayElements=x(197,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});b.prototype.releaseDoubleArrayElements=x(198,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});b.prototype.getByteArrayRegion=x(200,"void",["pointer","pointer","int","int","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.setBooleanArrayRegion=x(207,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.setByteArrayRegion=x(208,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.setCharArrayRegion=x(209,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.setShortArrayRegion=x(210,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.setIntArrayRegion=x(211,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.setLongArrayRegion=x(212,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.setFloatArrayRegion=x(213,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.setDoubleArrayRegion=x(214,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.registerNatives=x(215,"int32",["pointer","pointer","pointer","int32"],function(n,e,t,r){return n(this.handle,e,t,r)});b.prototype.monitorEnter=x(217,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.monitorExit=x(218,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.getDirectBufferAddress=x(230,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.getObjectRefType=x(232,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});var Gr=new Map;function Lt(n,e,t,r){return bn(this,"p",ba,n,e,t,r)}function yn(n,e,t,r){return bn(this,"v",Ea,n,e,t,r)}function ya(n,e,t,r){return bn(this,"n",va,n,e,t,r)}function bn(n,e,t,r,o,i,s){if(s!==void 0)return t(n,r,o,i,s);let c=[r,e,o].concat(i).join("|"),a=Gr.get(c);return a===void 0&&(a=t(n,r,o,i,$r),Gr.set(c,a)),a}function ba(n,e,t,r,o){return new NativeFunction(Ct(n).add(e*It).readPointer(),t,["pointer","pointer","pointer"].concat(r),o)}function Ea(n,e,t,r,o){return new NativeFunction(Ct(n).add(e*It).readPointer(),t,["pointer","pointer","pointer","..."].concat(r),o)}function va(n,e,t,r,o){return new NativeFunction(Ct(n).add(e*It).readPointer(),t,["pointer","pointer","pointer","pointer","..."].concat(r),o)}b.prototype.constructor=function(n,e){return yn.call(this,Qi,"pointer",n,e)};b.prototype.vaMethod=function(n,e,t){let r=da[n];if(r===void 0)throw new Error("Unsupported type: "+n);return yn.call(this,r,n,e,t)};b.prototype.nonvirtualVaMethod=function(n,e,t){let r=ua[n];if(r===void 0)throw new Error("Unsupported type: "+n);return ya.call(this,r,n,e,t)};b.prototype.staticVaMethod=function(n,e,t){let r=pa[n];if(r===void 0)throw new Error("Unsupported type: "+n);return yn.call(this,r,n,e,t)};b.prototype.getField=function(n){let e=fa[n];if(e===void 0)throw new Error("Unsupported type: "+n);return Lt.call(this,e,n,[])};b.prototype.getStaticField=function(n){let e=_a[n];if(e===void 0)throw new Error("Unsupported type: "+n);return Lt.call(this,e,n,[])};b.prototype.setField=function(n){let e=ha[n];if(e===void 0)throw new Error("Unsupported type: "+n);return Lt.call(this,e,"void",[n])};b.prototype.setStaticField=function(n){let e=ma[n];if(e===void 0)throw new Error("Unsupported type: "+n);return Lt.call(this,e,"void",[n])};var an=null;b.prototype.javaLangClass=function(){if(an===null){let n=this.findClass("java/lang/Class");try{let e=this.getMethodId.bind(this,n);an={handle:De(this.newGlobalRef(n)),getName:e("getName","()Ljava/lang/String;"),getSimpleName:e("getSimpleName","()Ljava/lang/String;"),getGenericSuperclass:e("getGenericSuperclass","()Ljava/lang/reflect/Type;"),getDeclaredConstructors:e("getDeclaredConstructors","()[Ljava/lang/reflect/Constructor;"),getDeclaredMethods:e("getDeclaredMethods","()[Ljava/lang/reflect/Method;"),getDeclaredFields:e("getDeclaredFields","()[Ljava/lang/reflect/Field;"),isArray:e("isArray","()Z"),isPrimitive:e("isPrimitive","()Z"),isInterface:e("isInterface","()Z"),getComponentType:e("getComponentType","()Ljava/lang/Class;")}}finally{this.deleteLocalRef(n)}}return an};var cn=null;b.prototype.javaLangObject=function(){if(cn===null){let n=this.findClass("java/lang/Object");try{let e=this.getMethodId.bind(this,n);cn={handle:De(this.newGlobalRef(n)),toString:e("toString","()Ljava/lang/String;"),getClass:e("getClass","()Ljava/lang/Class;")}}finally{this.deleteLocalRef(n)}}return cn};var ln=null;b.prototype.javaLangReflectConstructor=function(){if(ln===null){let n=this.findClass("java/lang/reflect/Constructor");try{ln={getGenericParameterTypes:this.getMethodId(n,"getGenericParameterTypes","()[Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(n)}}return ln};var dn=null;b.prototype.javaLangReflectMethod=function(){if(dn===null){let n=this.findClass("java/lang/reflect/Method");try{let e=this.getMethodId.bind(this,n);dn={getName:e("getName","()Ljava/lang/String;"),getGenericParameterTypes:e("getGenericParameterTypes","()[Ljava/lang/reflect/Type;"),getParameterTypes:e("getParameterTypes","()[Ljava/lang/Class;"),getGenericReturnType:e("getGenericReturnType","()Ljava/lang/reflect/Type;"),getGenericExceptionTypes:e("getGenericExceptionTypes","()[Ljava/lang/reflect/Type;"),getModifiers:e("getModifiers","()I"),isVarArgs:e("isVarArgs","()Z")}}finally{this.deleteLocalRef(n)}}return dn};var un=null;b.prototype.javaLangReflectField=function(){if(un===null){let n=this.findClass("java/lang/reflect/Field");try{let e=this.getMethodId.bind(this,n);un={getName:e("getName","()Ljava/lang/String;"),getType:e("getType","()Ljava/lang/Class;"),getGenericType:e("getGenericType","()Ljava/lang/reflect/Type;"),getModifiers:e("getModifiers","()I"),toString:e("toString","()Ljava/lang/String;")}}finally{this.deleteLocalRef(n)}}return un};var pn=null;b.prototype.javaLangReflectTypeVariable=function(){if(pn===null){let n=this.findClass("java/lang/reflect/TypeVariable");try{let e=this.getMethodId.bind(this,n);pn={handle:De(this.newGlobalRef(n)),getName:e("getName","()Ljava/lang/String;"),getBounds:e("getBounds","()[Ljava/lang/reflect/Type;"),getGenericDeclaration:e("getGenericDeclaration","()Ljava/lang/reflect/GenericDeclaration;")}}finally{this.deleteLocalRef(n)}}return pn};var fn=null;b.prototype.javaLangReflectWildcardType=function(){if(fn===null){let n=this.findClass("java/lang/reflect/WildcardType");try{let e=this.getMethodId.bind(this,n);fn={handle:De(this.newGlobalRef(n)),getLowerBounds:e("getLowerBounds","()[Ljava/lang/reflect/Type;"),getUpperBounds:e("getUpperBounds","()[Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(n)}}return fn};var hn=null;b.prototype.javaLangReflectGenericArrayType=function(){if(hn===null){let n=this.findClass("java/lang/reflect/GenericArrayType");try{hn={handle:De(this.newGlobalRef(n)),getGenericComponentType:this.getMethodId(n,"getGenericComponentType","()Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(n)}}return hn};var _n=null;b.prototype.javaLangReflectParameterizedType=function(){if(_n===null){let n=this.findClass("java/lang/reflect/ParameterizedType");try{let e=this.getMethodId.bind(this,n);_n={handle:De(this.newGlobalRef(n)),getActualTypeArguments:e("getActualTypeArguments","()[Ljava/lang/reflect/Type;"),getRawType:e("getRawType","()Ljava/lang/reflect/Type;"),getOwnerType:e("getOwnerType","()Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(n)}}return _n};var mn=null;b.prototype.javaLangString=function(){if(mn===null){let n=this.findClass("java/lang/String");try{mn={handle:De(this.newGlobalRef(n))}}finally{this.deleteLocalRef(n)}}return mn};b.prototype.getClassName=function(n){let e=this.vaMethod("pointer",[])(this.handle,n,this.javaLangClass().getName);try{return this.stringFromJni(e)}finally{this.deleteLocalRef(e)}};b.prototype.getObjectClassName=function(n){let e=this.getObjectClass(n);try{return this.getClassName(e)}finally{this.deleteLocalRef(e)}};b.prototype.getActualTypeArgument=function(n){let e=this.vaMethod("pointer",[])(this.handle,n,this.javaLangReflectParameterizedType().getActualTypeArguments);if(this.throwIfExceptionPending(),!e.isNull())try{return this.getTypeNameFromFirstTypeElement(e)}finally{this.deleteLocalRef(e)}};b.prototype.getTypeNameFromFirstTypeElement=function(n){if(this.getArrayLength(n)>0){let t=this.getObjectArrayElement(n,0);try{return this.getTypeName(t)}finally{this.deleteLocalRef(t)}}else return"java.lang.Object"};b.prototype.getTypeName=function(n,e){let t=this.vaMethod("pointer",[]);if(this.isInstanceOf(n,this.javaLangClass().handle))return this.getClassName(n);if(this.isInstanceOf(n,this.javaLangReflectGenericArrayType().handle))return this.getArrayTypeName(n);if(this.isInstanceOf(n,this.javaLangReflectParameterizedType().handle)){let r=t(this.handle,n,this.javaLangReflectParameterizedType().getRawType);this.throwIfExceptionPending();let o;try{o=this.getTypeName(r)}finally{this.deleteLocalRef(r)}return e&&(o+="<"+this.getActualTypeArgument(n)+">"),o}else return this.isInstanceOf(n,this.javaLangReflectTypeVariable().handle)||this.isInstanceOf(n,this.javaLangReflectWildcardType().handle),"java.lang.Object"};b.prototype.getArrayTypeName=function(n){let e=this.vaMethod("pointer",[]);if(this.isInstanceOf(n,this.javaLangClass().handle))return this.getClassName(n);if(this.isInstanceOf(n,this.javaLangReflectGenericArrayType().handle)){let t=e(this.handle,n,this.javaLangReflectGenericArrayType().getGenericComponentType);this.throwIfExceptionPending();try{return"[L"+this.getTypeName(t)+";"}finally{this.deleteLocalRef(t)}}else return"[Ljava.lang.Object;"};b.prototype.stringFromJni=function(n){let e=this.getStringChars(n);if(e.isNull())throw new Error("Unable to access string");try{let t=this.getStringLength(n);return e.readUtf16String(t)}finally{this.releaseStringChars(n,e)}};var Hr=65542,Ze=Process.pointerSize,En=Process.getCurrentThreadId(),Ue=new Map,it=new Map;function Ce(n){let e=n.vm,t=null,r=null,o=null;function i(){let c=e.readPointer(),a={exceptions:"propagate"};t=new NativeFunction(c.add(4*Ze).readPointer(),"int32",["pointer","pointer","pointer"],a),r=new NativeFunction(c.add(5*Ze).readPointer(),"int32",["pointer"],a),o=new NativeFunction(c.add(6*Ze).readPointer(),"int32",["pointer","pointer","int32"],a)}this.handle=e,this.perform=function(c){let a=Process.getCurrentThreadId(),l=s(a);if(l!==null)return c(l);let d=this._tryGetEnv(),p=d!==null;p||(d=this.attachCurrentThread(),Ue.set(a,!0)),this.link(a,d);try{return c(d)}finally{let f=a===En;if(f||this.unlink(a),!p&&!f){let u=Ue.get(a);Ue.delete(a),u&&this.detachCurrentThread()}}},this.attachCurrentThread=function(){let c=Memory.alloc(Ze);return ue("VM::AttachCurrentThread",t(e,c,NULL)),new b(c.readPointer(),this)},this.detachCurrentThread=function(){ue("VM::DetachCurrentThread",r(e))},this.preventDetachDueToClassLoader=function(){let c=Process.getCurrentThreadId();Ue.has(c)&&Ue.set(c,!1)},this.getEnv=function(){let c=s(Process.getCurrentThreadId());if(c!==null)return c;let a=Memory.alloc(Ze),l=o(e,a,Hr);if(l===-2)throw new Error("Current thread is not attached to the Java VM; please move this code inside a Java.perform() callback");return ue("VM::GetEnv",l),new b(a.readPointer(),this)},this.tryGetEnv=function(){let c=s(Process.getCurrentThreadId());return c!==null?c:this._tryGetEnv()},this._tryGetEnv=function(){let c=this.tryGetEnvHandle(Hr);return c===null?null:new b(c,this)},this.tryGetEnvHandle=function(c){let a=Memory.alloc(Ze);return o(e,a,c)!==0?null:a.readPointer()},this.makeHandleDestructor=function(c){return()=>{this.perform(a=>{a.deleteGlobalRef(c)})}},this.link=function(c,a){let l=it.get(c);l===void 0?it.set(c,[a,1]):l[1]++},this.unlink=function(c){let a=it.get(c);a[1]===1?it.delete(c):a[1]--};function s(c){let a=it.get(c);return a===void 0?null:a[0]}i.call(this)}Ce.dispose=function(n){Ue.get(En)===!0&&(Ue.delete(En),n.detachCurrentThread())};var Sa=4,v=Process.pointerSize,{readU32:wa,readPointer:Ia,writeU32:Ca,writePointer:La}=NativePointer.prototype,Aa=1,Ta=8,xa=16,kt=256,ka=524288,Na=2097152,lo=1073741824,Ma=524288,Ra=134217728,Zr=1048576,Oa=2097152,ja=268435456,Pa=268435456,Fa=0,Nn=3,Mn=5,Vn=ptr(1).not(),Da=2147467263,Ua=4294963200,Ft=17*v,Ba=18*v,uo=12,za=112,Va=116,Ja=0,Sn=56,qr=4,Ga=8,$a=10,Ha=12,Za=14,qa=28,Ka=36,Wa=0,Qa=1,Ya=2,Xa=3,ec=4,tc=5,nc=6,rc=7,Kr=2147483648,oc=28,lt=3*v,ic=3*v,sc=1,ac=1,po=de(yc),cc=de(Nc),me=de(Rc),Ke=de(Oc),lc=de(jc),dc=de(Gc),pt=de(Uc),fo=de(Bc),te=de(zc),Jn=de(Vc),uc=de(qc),pc=Process.arch==="ia32"?Ol:Rl,W={exceptions:"propagate"},st={},wn=null,In=null,ho=null,ie=null,Gn=[],Nt=new Map,_o=[],Cn=null,Wr=0,Qr=!1,Yr=!1,at=null,fc=[],Ln=null,At=null;function J(){return wn===null&&(wn=hc()),wn}function hc(){let n=Process.enumerateModules().filter(u=>/^lib(art|dvm).so$/.test(u.name)).filter(u=>!/\/system\/fake-libs/.test(u.path));if(n.length===0)return null;let e=n[0],t=e.name.indexOf("art")!==-1?"art":"dalvik",r=t==="art",o={module:e,find(u){let{module:_}=this,h=_.findExportByName(u);return h===null&&(h=_.findSymbolByName(u)),h},flavor:t,addLocalReference:null};o.isApiLevel34OrApexEquivalent=r&&(o.find("_ZN3art7AppInfo29GetPrimaryApkReferenceProfileEv")!==null||o.find("_ZN3art6Thread15RunFlipFunctionEPS0_")!==null);let i=r?{functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],artInterpreterToCompiledCodeBridge:function(u){this.artInterpreterToCompiledCodeBridge=u},_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadENS_6ObjPtrINS_6mirror6ObjectEEE:["art::JavaVMExt::AddGlobalRef","pointer",["pointer","pointer","pointer"]],_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadEPNS_6mirror6ObjectE:["art::JavaVMExt::AddGlobalRef","pointer",["pointer","pointer","pointer"]],_ZN3art17ReaderWriterMutex13ExclusiveLockEPNS_6ThreadE:["art::ReaderWriterMutex::ExclusiveLock","void",["pointer","pointer"]],_ZN3art17ReaderWriterMutex15ExclusiveUnlockEPNS_6ThreadE:["art::ReaderWriterMutex::ExclusiveUnlock","void",["pointer","pointer"]],_ZN3art22IndirectReferenceTable3AddEjPNS_6mirror6ObjectE:function(u){this["art::IndirectReferenceTable::Add"]=new NativeFunction(u,"pointer",["pointer","uint","pointer"],W)},_ZN3art22IndirectReferenceTable3AddENS_15IRTSegmentStateENS_6ObjPtrINS_6mirror6ObjectEEE:function(u){this["art::IndirectReferenceTable::Add"]=new NativeFunction(u,"pointer",["pointer","uint","pointer"],W)},_ZN3art9JavaVMExt12DecodeGlobalEPv:function(u){let _;te()>=26?_=pc(u,["pointer","pointer"]):_=new NativeFunction(u,"pointer",["pointer","pointer"],W),this["art::JavaVMExt::DecodeGlobal"]=function(h,g,y){return _(h,y)}},_ZN3art9JavaVMExt12DecodeGlobalEPNS_6ThreadEPv:["art::JavaVMExt::DecodeGlobal","pointer",["pointer","pointer","pointer"]],_ZNK3art6Thread19DecodeGlobalJObjectEP8_jobject:["art::Thread::DecodeJObject","pointer",["pointer","pointer"]],_ZNK3art6Thread13DecodeJObjectEP8_jobject:["art::Thread::DecodeJObject","pointer",["pointer","pointer"]],_ZN3art10ThreadList10SuspendAllEPKcb:["art::ThreadList::SuspendAll","void",["pointer","pointer","bool"]],_ZN3art10ThreadList10SuspendAllEv:function(u){let _=new NativeFunction(u,"void",["pointer"],W);this["art::ThreadList::SuspendAll"]=function(h,g,y){return _(h)}},_ZN3art10ThreadList9ResumeAllEv:["art::ThreadList::ResumeAll","void",["pointer"]],_ZN3art11ClassLinker12VisitClassesEPNS_12ClassVisitorE:["art::ClassLinker::VisitClasses","void",["pointer","pointer"]],_ZN3art11ClassLinker12VisitClassesEPFbPNS_6mirror5ClassEPvES4_:function(u){let _=new NativeFunction(u,"void",["pointer","pointer","pointer"],W);this["art::ClassLinker::VisitClasses"]=function(h,g){_(h,g,NULL)}},_ZNK3art11ClassLinker17VisitClassLoadersEPNS_18ClassLoaderVisitorE:["art::ClassLinker::VisitClassLoaders","void",["pointer","pointer"]],_ZN3art2gc4Heap12VisitObjectsEPFvPNS_6mirror6ObjectEPvES5_:["art::gc::Heap::VisitObjects","void",["pointer","pointer","pointer"]],_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE:["art::gc::Heap::GetInstances","void",["pointer","pointer","pointer","int","pointer"]],_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEbiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE:function(u){let _=new NativeFunction(u,"void",["pointer","pointer","pointer","bool","int","pointer"],W);this["art::gc::Heap::GetInstances"]=function(h,g,y,E,C){_(h,g,y,0,E,C)}},_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEjb:["art::StackVisitor::StackVisitor","void",["pointer","pointer","pointer","uint","uint","bool"]],_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEmb:["art::StackVisitor::StackVisitor","void",["pointer","pointer","pointer","uint","size_t","bool"]],_ZN3art12StackVisitor9WalkStackILNS0_16CountTransitionsE0EEEvb:["art::StackVisitor::WalkStack","void",["pointer","bool"]],_ZNK3art12StackVisitor9GetMethodEv:["art::StackVisitor::GetMethod","pointer",["pointer"]],_ZNK3art12StackVisitor16DescribeLocationEv:function(u){this["art::StackVisitor::DescribeLocation"]=xt(u,["pointer"])},_ZNK3art12StackVisitor24GetCurrentQuickFrameInfoEv:function(u){this["art::StackVisitor::GetCurrentQuickFrameInfo"]=Zc(u)},_ZN3art7Context6CreateEv:["art::Context::Create","pointer",[]],_ZN3art6Thread18GetLongJumpContextEv:["art::Thread::GetLongJumpContext","pointer",["pointer"]],_ZN3art6mirror5Class13GetDescriptorEPNSt3__112basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE:function(u){this["art::mirror::Class::GetDescriptor"]=u},_ZN3art6mirror5Class11GetLocationEv:function(u){this["art::mirror::Class::GetLocation"]=xt(u,["pointer"])},_ZN3art9ArtMethod12PrettyMethodEb:function(u){this["art::ArtMethod::PrettyMethod"]=xt(u,["pointer","bool"])},_ZN3art12PrettyMethodEPNS_9ArtMethodEb:function(u){this["art::ArtMethod::PrettyMethodNullSafe"]=xt(u,["pointer","bool"])},_ZN3art6Thread14CurrentFromGdbEv:["art::Thread::CurrentFromGdb","pointer",[]],_ZN3art6mirror6Object5CloneEPNS_6ThreadE:function(u){this["art::mirror::Object::Clone"]=new NativeFunction(u,"pointer",["pointer","pointer"],W)},_ZN3art6mirror6Object5CloneEPNS_6ThreadEm:function(u){let _=new NativeFunction(u,"pointer",["pointer","pointer","pointer"],W);this["art::mirror::Object::Clone"]=function(h,g){let y=NULL;return _(h,g,y)}},_ZN3art6mirror6Object5CloneEPNS_6ThreadEj:function(u){let _=new NativeFunction(u,"pointer",["pointer","pointer","uint"],W);this["art::mirror::Object::Clone"]=function(h,g){return _(h,g,0)}},_ZN3art3Dbg14SetJdwpAllowedEb:["art::Dbg::SetJdwpAllowed","void",["bool"]],_ZN3art3Dbg13ConfigureJdwpERKNS_4JDWP11JdwpOptionsE:["art::Dbg::ConfigureJdwp","void",["pointer"]],_ZN3art31InternalDebuggerControlCallback13StartDebuggerEv:["art::InternalDebuggerControlCallback::StartDebugger","void",["pointer"]],_ZN3art3Dbg9StartJdwpEv:["art::Dbg::StartJdwp","void",[]],_ZN3art3Dbg8GoActiveEv:["art::Dbg::GoActive","void",[]],_ZN3art3Dbg21RequestDeoptimizationERKNS_21DeoptimizationRequestE:["art::Dbg::RequestDeoptimization","void",["pointer"]],_ZN3art3Dbg20ManageDeoptimizationEv:["art::Dbg::ManageDeoptimization","void",[]],_ZN3art15instrumentation15Instrumentation20EnableDeoptimizationEv:["art::Instrumentation::EnableDeoptimization","void",["pointer"]],_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEPKc:["art::Instrumentation::DeoptimizeEverything","void",["pointer","pointer"]],_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEv:function(u){let _=new NativeFunction(u,"void",["pointer"],W);this["art::Instrumentation::DeoptimizeEverything"]=function(h,g){_(h)}},_ZN3art7Runtime19DeoptimizeBootImageEv:["art::Runtime::DeoptimizeBootImage","void",["pointer"]],_ZN3art15instrumentation15Instrumentation10DeoptimizeEPNS_9ArtMethodE:["art::Instrumentation::Deoptimize","void",["pointer","pointer"]],_ZN3art3jni12JniIdManager14DecodeMethodIdEP10_jmethodID:["art::jni::JniIdManager::DecodeMethodId","pointer",["pointer","pointer"]],_ZN3art3jni12JniIdManager13DecodeFieldIdEP9_jfieldID:["art::jni::JniIdManager::DecodeFieldId","pointer",["pointer","pointer"]],_ZN3art11interpreter18GetNterpEntryPointEv:["art::interpreter::GetNterpEntryPoint","pointer",[]],_ZN3art7Monitor17TranslateLocationEPNS_9ArtMethodEjPPKcPi:["art::Monitor::TranslateLocation","void",["pointer","uint32","pointer","pointer"]]},variables:{_ZN3art3Dbg9gRegistryE:function(u){this.isJdwpStarted=()=>!u.readPointer().isNull()},_ZN3art3Dbg15gDebuggerActiveE:function(u){this.isDebuggerActive=()=>!!u.readU8()}},optionals:new Set(["artInterpreterToCompiledCodeBridge","_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadENS_6ObjPtrINS_6mirror6ObjectEEE","_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadEPNS_6mirror6ObjectE","_ZN3art9JavaVMExt12DecodeGlobalEPv","_ZN3art9JavaVMExt12DecodeGlobalEPNS_6ThreadEPv","_ZNK3art6Thread19DecodeGlobalJObjectEP8_jobject","_ZNK3art6Thread13DecodeJObjectEP8_jobject","_ZN3art10ThreadList10SuspendAllEPKcb","_ZN3art10ThreadList10SuspendAllEv","_ZN3art11ClassLinker12VisitClassesEPNS_12ClassVisitorE","_ZN3art11ClassLinker12VisitClassesEPFbPNS_6mirror5ClassEPvES4_","_ZNK3art11ClassLinker17VisitClassLoadersEPNS_18ClassLoaderVisitorE","_ZN3art6mirror6Object5CloneEPNS_6ThreadE","_ZN3art6mirror6Object5CloneEPNS_6ThreadEm","_ZN3art6mirror6Object5CloneEPNS_6ThreadEj","_ZN3art22IndirectReferenceTable3AddEjPNS_6mirror6ObjectE","_ZN3art22IndirectReferenceTable3AddENS_15IRTSegmentStateENS_6ObjPtrINS_6mirror6ObjectEEE","_ZN3art2gc4Heap12VisitObjectsEPFvPNS_6mirror6ObjectEPvES5_","_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE","_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEbiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE","_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEjb","_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEmb","_ZN3art12StackVisitor9WalkStackILNS0_16CountTransitionsE0EEEvb","_ZNK3art12StackVisitor9GetMethodEv","_ZNK3art12StackVisitor16DescribeLocationEv","_ZNK3art12StackVisitor24GetCurrentQuickFrameInfoEv","_ZN3art7Context6CreateEv","_ZN3art6Thread18GetLongJumpContextEv","_ZN3art6mirror5Class13GetDescriptorEPNSt3__112basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE","_ZN3art6mirror5Class11GetLocationEv","_ZN3art9ArtMethod12PrettyMethodEb","_ZN3art12PrettyMethodEPNS_9ArtMethodEb","_ZN3art3Dbg13ConfigureJdwpERKNS_4JDWP11JdwpOptionsE","_ZN3art31InternalDebuggerControlCallback13StartDebuggerEv","_ZN3art3Dbg15gDebuggerActiveE","_ZN3art15instrumentation15Instrumentation20EnableDeoptimizationEv","_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEPKc","_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEv","_ZN3art7Runtime19DeoptimizeBootImageEv","_ZN3art15instrumentation15Instrumentation10DeoptimizeEPNS_9ArtMethodE","_ZN3art3Dbg9StartJdwpEv","_ZN3art3Dbg8GoActiveEv","_ZN3art3Dbg21RequestDeoptimizationERKNS_21DeoptimizationRequestE","_ZN3art3Dbg20ManageDeoptimizationEv","_ZN3art3Dbg9gRegistryE","_ZN3art3jni12JniIdManager14DecodeMethodIdEP10_jmethodID","_ZN3art3jni12JniIdManager13DecodeFieldIdEP9_jfieldID","_ZN3art11interpreter18GetNterpEntryPointEv","_ZN3art7Monitor17TranslateLocationEPNS_9ArtMethodEjPPKcPi"])}:{functions:{_Z20dvmDecodeIndirectRefP6ThreadP8_jobject:["dvmDecodeIndirectRef","pointer",["pointer","pointer"]],_Z15dvmUseJNIBridgeP6MethodPv:["dvmUseJNIBridge","void",["pointer","pointer"]],_Z20dvmHeapSourceGetBasev:["dvmHeapSourceGetBase","pointer",[]],_Z21dvmHeapSourceGetLimitv:["dvmHeapSourceGetLimit","pointer",[]],_Z16dvmIsValidObjectPK6Object:["dvmIsValidObject","uint8",["pointer"]],JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]]},variables:{gDvmJni:function(u){this.gDvmJni=u},gDvm:function(u){this.gDvm=u}}},{functions:s={},variables:c={},optionals:a=new Set}=i,l=[];for(let[u,_]of Object.entries(s)){let h=o.find(u);h!==null?typeof _=="function"?_.call(o,h):o[_[0]]=new NativeFunction(h,_[1],_[2],W):a.has(u)||l.push(u)}for(let[u,_]of Object.entries(c)){let h=o.find(u);h!==null?_.call(o,h):a.has(u)||l.push(u)}if(l.length>0)throw new Error("Java API only partially available; please file a bug. Missing: "+l.join(", "));let d=Memory.alloc(v),p=Memory.alloc(Sa);if(ue("JNI_GetCreatedJavaVMs",o.JNI_GetCreatedJavaVMs(d,1,p)),p.readInt()===0)return null;if(o.vm=d.readPointer(),r){let u=te(),_;u>=27?_=33554432:u>=24?_=16777216:_=0,o.kAccCompileDontBother=_;let h=o.vm.add(v).readPointer();o.artRuntime=h;let g=po(o),y=g.offset,E=y.instrumentation;o.artInstrumentation=E!==null?h.add(E):null,Jn()>=36e7&&o.artInstrumentation!=null&&(o.artInstrumentation=o.artInstrumentation.readPointer()),o.artHeap=h.add(y.heap).readPointer(),o.artThreadList=h.add(y.threadList).readPointer();let A=h.add(y.classLinker).readPointer(),M=Mc(h,g).offset,O=A.add(M.quickResolutionTrampoline).readPointer(),N=A.add(M.quickImtConflictTrampoline).readPointer(),k=A.add(M.quickGenericJniTrampoline).readPointer(),S=A.add(M.quickToInterpreterBridgeTrampoline).readPointer();o.artClassLinker={address:A,quickResolutionTrampoline:O,quickImtConflictTrampoline:N,quickGenericJniTrampoline:k,quickToInterpreterBridgeTrampoline:S};let T=new Ce(o);o.artQuickGenericJniTrampoline=An(k,T),o.artQuickToInterpreterBridge=An(S,T),o.artQuickResolutionTrampoline=An(O,T),o["art::JavaVMExt::AddGlobalRef"]===void 0&&(o["art::JavaVMExt::AddGlobalRef"]=Al(o)),o["art::JavaVMExt::DecodeGlobal"]===void 0&&(o["art::JavaVMExt::DecodeGlobal"]=Tl(o)),o["art::ArtMethod::PrettyMethod"]===void 0&&(o["art::ArtMethod::PrettyMethod"]=o["art::ArtMethod::PrettyMethodNullSafe"]),o["art::interpreter::GetNterpEntryPoint"]!==void 0?o.artNterpEntryPoint=o["art::interpreter::GetNterpEntryPoint"]():o.artNterpEntryPoint=o.find("ExecuteNterpImpl"),ie=Qc(o,T),Ml(o);let R=null;Object.defineProperty(o,"jvmti",{get(){return R===null&&(R=[_c(T,this.artRuntime)]),R[0]}})}let f=e.enumerateImports().filter(u=>u.name.indexOf("_Z")===0).reduce((u,_)=>(u[_.name]=_.address,u),{});return o.$new=new NativeFunction(f._Znwm||f._Znwj,"pointer",["ulong"],W),o.$delete=new NativeFunction(f._ZdlPv,"void",["pointer"],W),ho=r?Dn:Un,o}function _c(n,e){let t=null;return n.perform(()=>{let r=J().find("_ZN3art7Runtime18EnsurePluginLoadedEPKcPNSt3__112basic_stringIcNS3_11char_traitsIcEENS3_9allocatorIcEEEE");if(r===null)return;let o=new NativeFunction(r,"bool",["pointer","pointer","pointer"]),i=Memory.alloc(v);if(!o(e,Memory.allocUtf8String("libopenjdkjvmti.so"),i))return;let c=St.v1_2|1073741824,a=n.tryGetEnvHandle(c);if(a===null)return;t=new xe(a,n);let l=Memory.alloc(8);l.writeU64(wt.canTagObjects),t.addCapabilities(l)!==0&&(t=null)}),t}function mc(n,e){J().flavor==="art"&&n.getClassName(e)}function gc(n){return{offset:v===4?{globalsLock:32,globals:72}:{globalsLock:64,globals:112}}}function yc(n){let e=n.vm,t=n.artRuntime,r=v===4?200:384,o=r+100*v,i=te(),s=fo(),{isApiLevel34OrApexEquivalent:c}=n,a=null;for(let d=r;d!==o;d+=v)if(t.add(d).readPointer().equals(e)){let f,u=null;i>=33||s==="Tiramisu"||c?(f=[d-4*v],u=d-v):i>=30||s==="R"?(f=[d-3*v,d-4*v],u=d-v):i>=29?f=[d-2*v]:i>=27?f=[d-lt-3*v]:f=[d-lt-2*v];for(let _ of f){let h=_-v,g=h-v,y;c?y=g-9*v:i>=24?y=g-8*v:i>=23?y=g-7*v:y=g-4*v;let E={offset:{heap:y,threadList:g,internTable:h,classLinker:_,jniIdManager:u}};if(mo(t,E)!==null){a=E;break}}break}if(a===null)throw new Error("Unable to determine Runtime field offsets");let l=Jn()>=36e7;return a.offset.instrumentation=l?Ic(n):Ec(n),a.offset.jniIdsIndirection=Tc(n),a}var bc={ia32:Xr,x64:Xr,arm:vc,arm64:Sc};function Ec(n){let e=n["art::Runtime::DeoptimizeBootImage"];return e===void 0?null:ke(e,bc[Process.arch],{limit:30})}function Xr(n){if(n.mnemonic!=="lea")return null;let e=n.operands[1].value.disp;return e<256||e>1024?null:e}function vc(n){if(n.mnemonic!=="add.w")return null;let e=n.operands;if(e.length!==3)return null;let t=e[2];return t.type!=="imm"?null:t.value}function Sc(n){if(n.mnemonic!=="add")return null;let e=n.operands;if(e.length!==3||e[0].value==="sp"||e[1].value==="sp")return null;let t=e[2];if(t.type!=="imm")return null;let r=t.value.valueOf();return r<256||r>1024?null:r}var wc={ia32:eo,x64:eo,arm:Cc,arm64:Lc};function Ic(n){let e=n["art::Runtime::DeoptimizeBootImage"];return e===void 0?null:ke(e,wc[Process.arch],{limit:30})}function eo(n){if(n.mnemonic!=="mov")return null;let e=n.operands;if(e[0].value!=="rax")return null;let r=e[1];if(r.type!=="mem")return null;let o=r.value;if(o.base!=="rdi")return null;let i=o.disp;return i<256||i>1024?null:i}function Cc(n){return null}function Lc(n){if(n.mnemonic!=="ldr")return null;let e=n.operands;if(e[0].value==="x0")return null;let t=e[1].value;if(t.base!=="x0")return null;let r=t.disp;return r<256||r>1024?null:r}var Ac={ia32:to,x64:to,arm:xc,arm64:kc};function Tc(n){let e=n.find("_ZN3art7Runtime12SetJniIdTypeENS_9JniIdTypeE");if(e===null)return null;let t=ke(e,Ac[Process.arch],{limit:20});if(t===null)throw new Error("Unable to determine Runtime.jni_ids_indirection_ offset");return t}function to(n){return n.mnemonic==="cmp"?n.operands[0].value.disp:null}function xc(n){return n.mnemonic==="ldr.w"?n.operands[1].value.disp:null}function kc(n,e){if(e===null)return null;let{mnemonic:t}=n,{mnemonic:r}=e;return t==="cmp"&&r==="ldr"||t==="bl"&&r==="str"?e.operands[1].value.disp:null}function Nc(){let e={"4-21":136,"4-22":136,"4-23":172,"4-24":196,"4-25":196,"4-26":196,"4-27":196,"4-28":212,"4-29":172,"4-30":180,"4-31":180,"8-21":224,"8-22":224,"8-23":296,"8-24":344,"8-25":344,"8-26":352,"8-27":352,"8-28":392,"8-29":328,"8-30":336,"8-31":336}[`${v}-${te()}`];if(e===void 0)throw new Error("Unable to determine Instrumentation field offsets");return{offset:{forcedInterpretOnly:4,deoptimizationEnabled:e}}}function Mc(n,e){let t=mo(n,e);if(t===null)throw new Error("Unable to determine ClassLinker field offsets");return t}function mo(n,e){if(In!==null)return In;let{classLinker:t,internTable:r}=e.offset,o=n.add(t).readPointer(),i=n.add(r).readPointer(),s=v===4?100:200,c=s+100*v,a=te(),l=null;for(let d=s;d!==c;d+=v)if(o.add(d).readPointer().equals(i)){let f;a>=30||fo()==="R"?f=6:a>=29?f=4:a>=23?f=3:f=5;let u=d+f*v,_;a>=23?_=u-2*v:_=u-3*v,l={offset:{quickResolutionTrampoline:_,quickImtConflictTrampoline:u-v,quickGenericJniTrampoline:u,quickToInterpreterBridgeTrampoline:u+v}};break}return l!==null&&(In=l),l}function $n(n){let t=null;return n.perform(r=>{let o=Dt(n),i=me(n),s={artArrayLengthSize:4,artArrayEntrySize:o.size,artArrayMax:50},c={artArrayLengthSize:v,artArrayEntrySize:i.size,artArrayMax:100},a=(f,u,_)=>{let h=f.add(u).readPointer();if(h.isNull())return null;let g=_===4?h.readU32():h.readU64().valueOf();return g<=0?null:{length:g,data:h.add(_)}},l=(f,u,_,h)=>{try{let g=a(f,u,h.artArrayLengthSize);if(g===null)return!1;let y=Math.min(g.length,h.artArrayMax);for(let E=0;E!==y;E++)if(g.data.add(E*h.artArrayEntrySize).equals(_))return!0}catch{}return!1},d=r.findClass("java/lang/Thread"),p=r.newGlobalRef(d);try{let f;Ee(n,r,k=>{f=J()["art::JavaVMExt::DecodeGlobal"](n,k,p)});let u=oo(r.getFieldId(p,"name","Ljava/lang/String;")),_=oo(r.getStaticFieldId(p,"MAX_PRIORITY","I")),h=-1,g=-1;for(let k=0;k!==256;k+=4)h===-1&&l(f,k,_,s)&&(h=k),g===-1&&l(f,k,u,s)&&(g=k);if(g===-1||h===-1)throw new Error("Unable to find fields in java/lang/Thread; please file a bug");let y=g!==h?h:0,E=g,C=-1,A=Yn(r.getMethodId(p,"getName","()Ljava/lang/String;"));for(let k=0;k!==256;k+=4)C===-1&&l(f,k,A,c)&&(C=k);if(C===-1)throw new Error("Unable to find methods in java/lang/Thread; please file a bug");let M=-1,N=a(f,C,c.artArrayLengthSize).length;for(let k=C;k!==256;k+=4)if(f.add(k).readU16()===N){M=k;break}if(M===-1)throw new Error("Unable to find copied methods in java/lang/Thread; please file a bug");t={offset:{ifields:E,methods:C,sfields:y,copiedMethodsOffset:M}}}finally{r.deleteLocalRef(d),r.deleteGlobalRef(p)}}),t}function Rc(n){let e=J(),t;return n.perform(r=>{let o=r.findClass("android/os/Process"),i=Yn(r.getStaticMethodId(o,"getElapsedCpuTime","()J"));r.deleteLocalRef(o);let s=Process.getModuleByName("libandroid_runtime.so"),c=s.base,a=c.add(s.size),l=te(),d=l<=21?8:v,p=Aa|Ta|xa|kt,f=~(lo|ja|Oa)>>>0,u=null,_=null,h=2;for(let E=0;E!==64&&h!==0;E+=4){let C=i.add(E);if(u===null){let A=C.readPointer();A.compare(c)>=0&&A.compare(a)<0&&(u=E,h--)}_===null&&(C.readU32()&f)===p&&(_=E,h--)}if(h!==0)throw new Error("Unable to determine ArtMethod field offsets");let g=u+d;t={size:l<=21?g+32:g+v,offset:{jniCode:u,quickCode:g,accessFlags:_}},"artInterpreterToCompiledCodeBridge"in e&&(t.offset.interpreterCode=u-d)}),t}function Dt(n){let e=te();return e>=23?{size:16,offset:{accessFlags:4}}:e>=21?{size:24,offset:{accessFlags:12}}:null}function Oc(n){let e=te(),t;return n.perform(r=>{let o=Ut(r),i=r.handle,s=null,c=null,a=null,l=null,d=null,p=null;for(let f=144;f!==256;f+=v)if(o.add(f).readPointer().equals(i)){c=f-6*v,d=f-4*v,p=f+2*v,e<=22&&(c-=v,s=c-v-9*8-3*4,a=f+6*v,d-=v,p-=v),l=f+9*v,e<=22&&(l+=2*v+4,v===8&&(l+=4)),e>=23&&(l+=v);break}if(l===null)throw new Error("Unable to determine ArtThread field offsets");t={offset:{isExceptionReportedToInstrumentation:s,exception:c,throwLocation:a,topHandleScope:l,managedStack:d,self:p}}}),t}function jc(){return te()>=23?{offset:{topQuickFrame:0,link:v}}:{offset:{topQuickFrame:2*v,link:0}}}var Pc={ia32:no,x64:no,arm:Fc,arm64:Dc};function An(n,e){let t;return e.perform(r=>{let o=Ut(r),i=Pc[Process.arch],s=Instruction.parse(n),c=i(s);c!==null?t=o.add(c).readPointer():t=n}),t}function no(n){return n.mnemonic==="jmp"?n.operands[0].value.disp:null}function Fc(n){return n.mnemonic==="ldr.w"?n.operands[1].value.disp:null}function Dc(n){return n.mnemonic==="ldr"?n.operands[1].value.disp:null}function Ut(n){return n.handle.add(v).readPointer()}function Uc(){return Hn("ro.build.version.release")}function Bc(){return Hn("ro.build.version.codename")}function zc(){return parseInt(Hn("ro.build.version.sdk"),10)}function Vc(){try{let n=File.readAllText("/proc/self/mountinfo"),e=null,t=new Map;for(let o of n.trimEnd().split(`
`)){let i=o.split(" "),s=i[4];if(!s.startsWith("/apex/com.android.art"))continue;let c=i[10];s.includes("@")?t.set(c,s.split("@")[1]):e=c}let r=t.get(e);return r!==void 0?parseInt(r):ro()}catch{return ro()}}function ro(){return te()*1e7}var Tn=null,Jc=92;function Hn(n){Tn===null&&(Tn=new NativeFunction(Process.getModuleByName("libc.so").getExportByName("__system_property_get"),"int",["pointer","pointer"],W));let e=Memory.alloc(Jc);return Tn(Memory.allocUtf8String(n),e),e.readUtf8String()}function Ee(n,e,t){let r=dc(n,e),o=Ut(e).toString();if(st[o]=t,r(e.handle),st[o]!==void 0)throw delete st[o],new Error("Unable to perform state transition; please file a bug")}function Gc(n,e){let t=new NativeCallback($c,"void",["pointer"]);return bo(n,e,t)}function $c(n){let e=n.toString(),t=st[e];delete st[e],t(n)}function Zn(n){let e=J(),t=e.artThreadList;e["art::ThreadList::SuspendAll"](t,Memory.allocUtf8String("frida"),!1?1:0);try{n()}finally{e["art::ThreadList::ResumeAll"](t)}}var Rn=class{constructor(e){let t=Memory.alloc(4*v),r=t.add(v);t.writePointer(r);let o=new NativeCallback((i,s)=>e(s)===!0?1:0,"bool",["pointer","pointer"]);r.add(2*v).writePointer(o),this.handle=t,this._onVisit=o}};function qn(n){return J()["art::ClassLinker::VisitClasses"]instanceof NativeFunction?new Rn(n):new NativeCallback(t=>n(t)===!0?1:0,"bool",["pointer","pointer"])}var On=class{constructor(e){let t=Memory.alloc(4*v),r=t.add(v);t.writePointer(r);let o=new NativeCallback((i,s)=>{e(s)},"void",["pointer","pointer"]);r.add(2*v).writePointer(o),this.handle=t,this._onVisit=o}};function Kn(n){return new On(n)}var Hc={"include-inlined-frames":0,"skip-inlined-frames":1},jn=class{constructor(e,t,r,o=0,i=!0){let s=J(),c=512,a=3*v,l=Memory.alloc(c+a);s["art::StackVisitor::StackVisitor"](l,e,t,Hc[r],o,i?1:0);let d=l.add(c);l.writePointer(d);let p=new NativeCallback(this._visitFrame.bind(this),"bool",["pointer"]);d.add(2*v).writePointer(p),this.handle=l,this._onVisitFrame=p;let f=l.add(v===4?12:24);this._curShadowFrame=f,this._curQuickFrame=f.add(v),this._curQuickFramePc=f.add(2*v),this._curOatQuickMethodHeader=f.add(3*v),this._getMethodImpl=s["art::StackVisitor::GetMethod"],this._descLocImpl=s["art::StackVisitor::DescribeLocation"],this._getCQFIImpl=s["art::StackVisitor::GetCurrentQuickFrameInfo"]}walkStack(e=!1){J()["art::StackVisitor::WalkStack"](this.handle,e?1:0)}_visitFrame(){return this.visitFrame()?1:0}visitFrame(){throw new Error("Subclass must implement visitFrame")}getMethod(){let e=this._getMethodImpl(this.handle);return e.isNull()?null:new Mt(e)}getCurrentQuickFramePc(){return this._curQuickFramePc.readPointer()}getCurrentQuickFrame(){return this._curQuickFrame.readPointer()}getCurrentShadowFrame(){return this._curShadowFrame.readPointer()}describeLocation(){let e=new jt;return this._descLocImpl(e,this.handle),e.disposeToString()}getCurrentOatQuickMethodHeader(){return this._curOatQuickMethodHeader.readPointer()}getCurrentQuickFrameInfo(){return this._getCQFIImpl(this.handle)}},Mt=class{constructor(e){this.handle=e}prettyMethod(e=!0){let t=new jt;return J()["art::ArtMethod::PrettyMethod"](t,this.handle,e?1:0),t.disposeToString()}toString(){return`ArtMethod(handle=${this.handle})`}};function Zc(n){return function(e){let t=Memory.alloc(12);return uc(n)(t,e),{frameSizeInBytes:t.readU32(),coreSpillMask:t.add(4).readU32(),fpSpillMask:t.add(8).readU32()}}}function qc(n){let e=NULL;switch(Process.arch){case"ia32":e=qe(32,t=>{t.putMovRegRegOffsetPtr("ecx","esp",4),t.putMovRegRegOffsetPtr("edx","esp",8),t.putCallAddressWithArguments(n,["ecx","edx"]),t.putMovRegReg("esp","ebp"),t.putPopReg("ebp"),t.putRet()});break;case"x64":e=qe(32,t=>{t.putPushReg("rdi"),t.putCallAddressWithArguments(n,["rsi"]),t.putPopReg("rdi"),t.putMovRegPtrReg("rdi","rax"),t.putMovRegOffsetPtrReg("rdi",8,"edx"),t.putRet()});break;case"arm":e=qe(16,t=>{t.putCallAddressWithArguments(n,["r0","r1"]),t.putPopRegs(["r0","lr"]),t.putMovRegReg("pc","lr")});break;case"arm64":e=qe(64,t=>{t.putPushRegReg("x0","lr"),t.putCallAddressWithArguments(n,["x1"]),t.putPopRegReg("x2","lr"),t.putStrRegRegOffset("x0","x2",0),t.putStrRegRegOffset("w1","x2",8),t.putRet()});break}return new NativeFunction(e,"void",["pointer","pointer"],W)}var Kc={ia32:globalThis.X86Relocator,x64:globalThis.X86Relocator,arm:globalThis.ThumbRelocator,arm64:globalThis.Arm64Relocator},Pn={ia32:globalThis.X86Writer,x64:globalThis.X86Writer,arm:globalThis.ThumbWriter,arm64:globalThis.Arm64Writer};function qe(n,e){Cn===null&&(Cn=Memory.alloc(Process.pageSize));let t=Cn.add(Wr),r=Process.arch,o=Pn[r];return Memory.patchCode(t,n,i=>{let s=new o(i,{pc:t});if(e(s),s.flush(),s.offset>n)throw new Error(`Wrote ${s.offset}, exceeding maximum of ${n}`)}),Wr+=n,r==="arm"?t.or(1):t}function Wc(n,e){Yc(e),rl(e)}function Qc(n,e){let t=Ke(e).offset,r=lc().offset,o=`
#include <gum/guminterceptor.h>

extern GMutex lock;
extern GHashTable * methods;
extern GHashTable * replacements;
extern gpointer last_seen_art_method;

extern gpointer get_oat_quick_method_header_impl (gpointer method, gpointer pc);

void
init (void)
{
  g_mutex_init (&lock);
  methods = g_hash_table_new_full (NULL, NULL, NULL, NULL);
  replacements = g_hash_table_new_full (NULL, NULL, NULL, NULL);
}

void
finalize (void)
{
  g_hash_table_unref (replacements);
  g_hash_table_unref (methods);
  g_mutex_clear (&lock);
}

gboolean
is_replacement_method (gpointer method)
{
  gboolean is_replacement;

  g_mutex_lock (&lock);

  is_replacement = g_hash_table_contains (replacements, method);

  g_mutex_unlock (&lock);

  return is_replacement;
}

gpointer
get_replacement_method (gpointer original_method)
{
  gpointer replacement_method;

  g_mutex_lock (&lock);

  replacement_method = g_hash_table_lookup (methods, original_method);

  g_mutex_unlock (&lock);

  return replacement_method;
}

void
set_replacement_method (gpointer original_method,
                        gpointer replacement_method)
{
  g_mutex_lock (&lock);

  g_hash_table_insert (methods, original_method, replacement_method);
  g_hash_table_insert (replacements, replacement_method, original_method);

  g_mutex_unlock (&lock);
}

void
synchronize_replacement_methods (guint quick_code_offset,
                                 void * nterp_entrypoint,
                                 void * quick_to_interpreter_bridge)
{
  GHashTableIter iter;
  gpointer hooked_method, replacement_method;

  g_mutex_lock (&lock);

  g_hash_table_iter_init (&iter, methods);
  while (g_hash_table_iter_next (&iter, &hooked_method, &replacement_method))
  {
    void ** quick_code;

    *((uint32_t *) replacement_method) = *((uint32_t *) hooked_method);

    quick_code = hooked_method + quick_code_offset;
    if (*quick_code == nterp_entrypoint)
      *quick_code = quick_to_interpreter_bridge;
  }

  g_mutex_unlock (&lock);
}

void
delete_replacement_method (gpointer original_method)
{
  gpointer replacement_method;

  g_mutex_lock (&lock);

  replacement_method = g_hash_table_lookup (methods, original_method);
  if (replacement_method != NULL)
  {
    g_hash_table_remove (methods, original_method);
    g_hash_table_remove (replacements, replacement_method);
  }

  g_mutex_unlock (&lock);
}

gpointer
translate_method (gpointer method)
{
  gpointer translated_method;

  g_mutex_lock (&lock);

  translated_method = g_hash_table_lookup (replacements, method);

  g_mutex_unlock (&lock);

  return (translated_method != NULL) ? translated_method : method;
}

gpointer
find_replacement_method_from_quick_code (gpointer method,
                                         gpointer thread)
{
  gpointer replacement_method;
  gpointer managed_stack;
  gpointer top_quick_frame;
  gpointer link_managed_stack;
  gpointer * link_top_quick_frame;

  replacement_method = get_replacement_method (method);
  if (replacement_method == NULL)
    return NULL;

  /*
   * Stack check.
   *
   * Return NULL to indicate that the original method should be invoked, otherwise
   * return a pointer to the replacement ArtMethod.
   *
   * If the caller is our own JNI replacement stub, then a stack transition must
   * have been pushed onto the current thread's linked list.
   *
   * Therefore, we invoke the original method if the following conditions are met:
   *   1- The current managed stack is empty.
   *   2- The ArtMethod * inside the linked managed stack's top quick frame is the
   *      same as our replacement.
   */
  managed_stack = thread + ${t.managedStack};
  top_quick_frame = *((gpointer *) (managed_stack + ${r.topQuickFrame}));
  if (top_quick_frame != NULL)
    return replacement_method;

  link_managed_stack = *((gpointer *) (managed_stack + ${r.link}));
  if (link_managed_stack == NULL)
    return replacement_method;

  link_top_quick_frame = GSIZE_TO_POINTER (*((gsize *) (link_managed_stack + ${r.topQuickFrame})) & ~((gsize) 1));
  if (link_top_quick_frame == NULL || *link_top_quick_frame != replacement_method)
    return replacement_method;

  return NULL;
}

void
on_interpreter_do_call (GumInvocationContext * ic)
{
  gpointer method, replacement_method;

  method = gum_invocation_context_get_nth_argument (ic, 0);

  replacement_method = get_replacement_method (method);
  if (replacement_method != NULL)
    gum_invocation_context_replace_nth_argument (ic, 0, replacement_method);
}

gpointer
on_art_method_get_oat_quick_method_header (gpointer method,
                                           gpointer pc)
{
  if (is_replacement_method (method))
    return NULL;

  return get_oat_quick_method_header_impl (method, pc);
}

void
on_art_method_pretty_method (GumInvocationContext * ic)
{
  const guint this_arg_index = ${Process.arch==="arm64"?0:1};
  gpointer method;

  method = gum_invocation_context_get_nth_argument (ic, this_arg_index);
  if (method == NULL)
    gum_invocation_context_replace_nth_argument (ic, this_arg_index, last_seen_art_method);
  else
    last_seen_art_method = method;
}

void
on_leave_gc_concurrent_copying_copying_phase (GumInvocationContext * ic)
{
  GHashTableIter iter;
  gpointer hooked_method, replacement_method;

  g_mutex_lock (&lock);

  g_hash_table_iter_init (&iter, methods);
  while (g_hash_table_iter_next (&iter, &hooked_method, &replacement_method))
    *((uint32_t *) replacement_method) = *((uint32_t *) hooked_method);

  g_mutex_unlock (&lock);
}
`,i=8,s=v,c=v,a=v,d=Memory.alloc(i+s+c+a),p=d.add(i),f=p.add(s),u=f.add(c),_=n.find(v===4?"_ZN3art9ArtMethod23GetOatQuickMethodHeaderEj":"_ZN3art9ArtMethod23GetOatQuickMethodHeaderEm"),h=new CModule(o,{lock:d,methods:p,replacements:f,last_seen_art_method:u,get_oat_quick_method_header_impl:_??ptr("0xdeadbeef")}),g={exceptions:"propagate",scheduling:"exclusive"};return{handle:h,replacedMethods:{isReplacement:new NativeFunction(h.is_replacement_method,"bool",["pointer"],g),get:new NativeFunction(h.get_replacement_method,"pointer",["pointer"],g),set:new NativeFunction(h.set_replacement_method,"void",["pointer","pointer"],g),synchronize:new NativeFunction(h.synchronize_replacement_methods,"void",["uint","pointer","pointer"],g),delete:new NativeFunction(h.delete_replacement_method,"void",["pointer"],g),translate:new NativeFunction(h.translate_method,"pointer",["pointer"],g),findReplacementFromQuickCode:h.find_replacement_method_from_quick_code},getOatQuickMethodHeaderImpl:_,hooks:{Interpreter:{doCall:h.on_interpreter_do_call},ArtMethod:{getOatQuickMethodHeader:h.on_art_method_get_oat_quick_method_header,prettyMethod:h.on_art_method_pretty_method},Gc:{copyingPhase:{onLeave:h.on_leave_gc_concurrent_copying_copying_phase},runFlip:{onEnter:h.on_leave_gc_concurrent_copying_copying_phase}}}}}function Yc(n){Yr||(Yr=!0,Xc(n),el(),tl(),nl())}function Xc(n){let e=J();[e.artQuickGenericJniTrampoline,e.artQuickToInterpreterBridge,e.artQuickResolutionTrampoline].forEach(r=>{Memory.protect(r,32,"rwx");let o=new Ot(r);o.activate(n),_o.push(o)})}function el(){let n=J(),e=te(),{isApiLevel34OrApexEquivalent:t}=n,r;if(e<=22)r=/^_ZN3art11interpreter6DoCallILb[0-1]ELb[0-1]EEEbPNS_6mirror9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtPNS_6JValueE$/;else if(e<=33&&!t)r=/^_ZN3art11interpreter6DoCallILb[0-1]ELb[0-1]EEEbPNS_9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtPNS_6JValueE$/;else if(t)r=/^_ZN3art11interpreter6DoCallILb[0-1]EEEbPNS_9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtbPNS_6JValueE$/;else throw new Error("Unable to find method invocation in ART; please file a bug");let o=n.module,i=[...o.enumerateExports(),...o.enumerateSymbols()].filter(s=>r.test(s.name));if(i.length===0)throw new Error("Unable to find method invocation in ART; please file a bug");for(let s of i)Interceptor.attach(s.address,ie.hooks.Interpreter.doCall)}function tl(){let n=J(),t=n.module.findSymbolByName("_ZN3art2gc4Heap22CollectGarbageInternalENS0_9collector6GcTypeENS0_7GcCauseEbj");if(t===null)return;let{artNterpEntryPoint:r,artQuickToInterpreterBridge:o}=n,i=me(n.vm).offset.quickCode;Interceptor.attach(t,{onLeave(){ie.replacedMethods.synchronize(i,r,o)}})}function nl(){let n=[["_ZN3art11ClassLinker26VisiblyInitializedCallback22MarkVisiblyInitializedEPNS_6ThreadE","e90340f8 : ff0ff0ff"],["_ZN3art11ClassLinker26VisiblyInitializedCallback29AdjustThreadVisibilityCounterEPNS_6ThreadEl","7f0f00f9 : 1ffcffff"]],e=J(),t=e.module;for(let[r,o]of n){let i=t.findSymbolByName(r);if(i===null)continue;let s=Memory.scanSync(i,8192,o);if(s.length===0)return;let{artNterpEntryPoint:c,artQuickToInterpreterBridge:a}=e,l=me(e.vm).offset.quickCode;Interceptor.attach(s[0].address,function(){ie.replacedMethods.synchronize(l,c,a)});return}}function rl(n){if(Qr)return;if(Qr=!0,!il()){let{getOatQuickMethodHeaderImpl:i}=ie;if(i===null)return;try{Interceptor.replace(i,ie.hooks.ArtMethod.getOatQuickMethodHeader)}catch{}}let e=te(),t=null,r=J();e>28?t=r.find("_ZN3art2gc9collector17ConcurrentCopying12CopyingPhaseEv"):e>22&&(t=r.find("_ZN3art2gc9collector17ConcurrentCopying12MarkingPhaseEv")),t!==null&&Interceptor.attach(t,ie.hooks.Gc.copyingPhase);let o=null;o=r.find("_ZN3art6Thread15RunFlipFunctionEPS0_"),o===null&&(o=r.find("_ZN3art6Thread15RunFlipFunctionEPS0_b")),o!==null&&Interceptor.attach(o,ie.hooks.Gc.runFlip)}var ol={arm:{signatures:[{pattern:["b0 68","01 30","0c d0","1b 98",":","c0 ff","c0 ff","00 ff","00 2f"],validateMatch:xn},{pattern:["d8 f8 08 00","01 30","0c d0","1b 98",":","f0 ff ff 0f","ff ff","00 ff","00 2f"],validateMatch:xn},{pattern:["b0 68","01 30","40 f0 c3 80","00 25",":","c0 ff","c0 ff","c0 fb 00 d0","ff f8"],validateMatch:xn}],instrument:al},arm64:{signatures:[{pattern:["0a 40 b9","1f 05 00 31","40 01 00 54","88 39 00 f0",":","fc ff ff","1f fc ff ff","1f 00 00 ff","00 00 00 9f"],offset:1,validateMatch:kn},{pattern:["0a 40 b9","1f 05 00 31","40 01 00 54","00 0e 40 f9",":","fc ff ff","1f fc ff ff","1f 00 00 ff","00 fc ff ff"],offset:1,validateMatch:kn},{pattern:["0a 40 b9","1f 05 00 31","01 34 00 54","e0 03 1f aa",":","fc ff ff","1f fc ff ff","1f 00 00 ff","e0 ff ff ff"],offset:1,validateMatch:kn}],instrument:cl}};function xn({address:n,size:e}){let t=Instruction.parse(n.or(1)),[r,o]=t.operands,i=o.value.base,s=r.value,c=Instruction.parse(t.next.add(2)),a=ptr(c.operands[0].value),l=c.address.add(c.size),d,p;return c.mnemonic==="beq"?(d=l,p=a):(d=a,p=l),ke(d.or(1),f,{limit:3});function f(u){let{mnemonic:_}=u;if(!(_==="ldr"||_==="ldr.w"))return null;let{base:h,disp:g}=u.operands[1].value;return h===i&&g===20?{methodReg:i,scratchReg:s,target:{whenTrue:a,whenRegularMethod:d,whenRuntimeMethod:p}}:null}}function kn({address:n,size:e}){let[t,r]=Instruction.parse(n).operands,o=r.value.base,i="x"+t.value.substring(1),s=Instruction.parse(n.add(8)),c=ptr(s.operands[0].value),a=n.add(12),l,d;return s.mnemonic==="b.eq"?(l=a,d=c):(l=c,d=a),ke(l,p,{limit:3});function p(f){if(f.mnemonic!=="ldr")return null;let{base:u,disp:_}=f.operands[1].value;return u===o&&_===24?{methodReg:o,scratchReg:i,target:{whenTrue:c,whenRegularMethod:l,whenRuntimeMethod:d}}:null}}function il(){if(te()<31)return!1;let n=ol[Process.arch];if(n===void 0)return!1;let e=n.signatures.map(({pattern:r,offset:o=0,validateMatch:i=sl})=>({pattern:new MatchPattern(r.join("")),offset:o,validateMatch:i})),t=[];for(let{base:r,size:o}of J().module.enumerateRanges("--x"))for(let{pattern:i,offset:s,validateMatch:c}of e){let a=Memory.scanSync(r,o,i).map(({address:l,size:d})=>({address:l.sub(s),size:d+s})).filter(l=>{let d=c(l);return d===null?!1:(l.validationResult=d,!0)});t.push(...a)}return t.length===0?!1:(t.forEach(n.instrument),!0)}function sl(){return{}}var Rt=class{constructor(e,t,r){this.address=e,this.size=t,this.originalCode=e.readByteArray(t),this.trampoline=r}revert(){Memory.patchCode(this.address,this.size,e=>{e.writeByteArray(this.originalCode)})}};function al({address:n,size:e,validationResult:t}){let{methodReg:r,target:o}=t,i=Memory.alloc(Process.pageSize),s=e;Memory.patchCode(i,256,c=>{let a=new ThumbWriter(c,{pc:i}),l=new ThumbRelocator(n,a);for(let _=0;_!==2;_++)l.readOne();l.writeAll(),l.readOne(),l.skipOne(),a.putBCondLabel("eq","runtime_or_replacement_method");let d=[45,237,16,10];a.putBytes(d);let p=["r0","r1","r2","r3"];a.putPushRegs(p),a.putCallAddressWithArguments(ie.replacedMethods.isReplacement,[r]),a.putCmpRegImm("r0",0),a.putPopRegs(p);let f=[189,236,16,10];a.putBytes(f),a.putBCondLabel("ne","runtime_or_replacement_method"),a.putBLabel("regular_method"),l.readOne();let u=l.input.address.equals(o.whenRegularMethod);for(a.putLabel(u?"regular_method":"runtime_or_replacement_method"),l.writeOne();s<10;){let _=l.readOne();if(_===0){s=10;break}s=_}l.writeAll(),a.putBranchAddress(n.add(s+1)),a.putLabel(u?"runtime_or_replacement_method":"regular_method"),a.putBranchAddress(o.whenTrue),a.flush()}),Gn.push(new Rt(n,s,i)),Memory.patchCode(n,s,c=>{let a=new ThumbWriter(c,{pc:n});a.putLdrRegAddress("pc",i.or(1)),a.flush()})}function cl({address:n,size:e,validationResult:t}){let{methodReg:r,scratchReg:o,target:i}=t,s=Memory.alloc(Process.pageSize);Memory.patchCode(s,256,c=>{let a=new Arm64Writer(c,{pc:s}),l=new Arm64Relocator(n,a);for(let _=0;_!==2;_++)l.readOne();l.writeAll(),l.readOne(),l.skipOne(),a.putBCondLabel("eq","runtime_or_replacement_method");let d=["d0","d1","d2","d3","d4","d5","d6","d7","x0","x1","x2","x3","x4","x5","x6","x7","x8","x9","x10","x11","x12","x13","x14","x15","x16","x17"],p=d.length;for(let _=0;_!==p;_+=2)a.putPushRegReg(d[_],d[_+1]);a.putCallAddressWithArguments(ie.replacedMethods.isReplacement,[r]),a.putCmpRegReg("x0","xzr");for(let _=p-2;_>=0;_-=2)a.putPopRegReg(d[_],d[_+1]);a.putBCondLabel("ne","runtime_or_replacement_method"),a.putBLabel("regular_method"),l.readOne();let f=l.input,u=f.address.equals(i.whenRegularMethod);a.putLabel(u?"regular_method":"runtime_or_replacement_method"),l.writeOne(),a.putBranchAddress(f.next),a.putLabel(u?"runtime_or_replacement_method":"regular_method"),a.putBranchAddress(i.whenTrue),a.flush()}),Gn.push(new Rt(n,e,s)),Memory.patchCode(n,e,c=>{let a=new Arm64Writer(c,{pc:n});a.putLdrRegAddress(o,s),a.putBrReg(o),a.flush()})}function ll(n){return new ho(n)}function dl(n){return ie.replacedMethods.translate(n)}function Wn(n,e={}){let{limit:t=16}=e,r=n.getEnv();return at===null&&(at=ul(n,r)),at.backtrace(r,t)}function ul(n,e){let t=J(),r=Memory.alloc(Process.pointerSize),o=new CModule(`
#include <glib.h>
#include <stdbool.h>
#include <string.h>
#include <gum/gumtls.h>
#include <json-glib/json-glib.h>

typedef struct _ArtBacktrace ArtBacktrace;
typedef struct _ArtStackFrame ArtStackFrame;

typedef struct _ArtStackVisitor ArtStackVisitor;
typedef struct _ArtStackVisitorVTable ArtStackVisitorVTable;

typedef struct _ArtClass ArtClass;
typedef struct _ArtMethod ArtMethod;
typedef struct _ArtThread ArtThread;
typedef struct _ArtContext ArtContext;

typedef struct _JNIEnv JNIEnv;

typedef struct _StdString StdString;
typedef struct _StdTinyString StdTinyString;
typedef struct _StdLargeString StdLargeString;

typedef enum {
  STACK_WALK_INCLUDE_INLINED_FRAMES,
  STACK_WALK_SKIP_INLINED_FRAMES,
} StackWalkKind;

struct _StdTinyString
{
  guint8 unused;
  gchar data[(3 * sizeof (gpointer)) - 1];
};

struct _StdLargeString
{
  gsize capacity;
  gsize size;
  gchar * data;
};

struct _StdString
{
  union
  {
    guint8 flags;
    StdTinyString tiny;
    StdLargeString large;
  };
};

struct _ArtBacktrace
{
  GChecksum * id;
  GArray * frames;
  gchar * frames_json;
};

struct _ArtStackFrame
{
  ArtMethod * method;
  gsize dexpc;
  StdString description;
};

struct _ArtStackVisitorVTable
{
  void (* unused1) (void);
  void (* unused2) (void);
  bool (* visit) (ArtStackVisitor * visitor);
};

struct _ArtStackVisitor
{
  ArtStackVisitorVTable * vtable;

  guint8 padding[512];

  ArtStackVisitorVTable vtable_storage;

  ArtBacktrace * backtrace;
};

struct _ArtMethod
{
  guint32 declaring_class;
  guint32 access_flags;
};

extern GumTlsKey current_backtrace;

extern void (* perform_art_thread_state_transition) (JNIEnv * env);

extern ArtContext * art_make_context (ArtThread * thread);

extern void art_stack_visitor_init (ArtStackVisitor * visitor, ArtThread * thread, void * context, StackWalkKind walk_kind,
    size_t num_frames, bool check_suspended);
extern void art_stack_visitor_walk_stack (ArtStackVisitor * visitor, bool include_transitions);
extern ArtMethod * art_stack_visitor_get_method (ArtStackVisitor * visitor);
extern void art_stack_visitor_describe_location (StdString * description, ArtStackVisitor * visitor);
extern ArtMethod * translate_method (ArtMethod * method);
extern void translate_location (ArtMethod * method, guint32 pc, const gchar ** source_file, gint32 * line_number);
extern void get_class_location (StdString * result, ArtClass * klass);
extern void cxx_delete (void * mem);
extern unsigned long strtoul (const char * str, char ** endptr, int base);

static bool visit_frame (ArtStackVisitor * visitor);
static void art_stack_frame_destroy (ArtStackFrame * frame);

static void append_jni_type_name (GString * s, const gchar * name, gsize length);

static void std_string_destroy (StdString * str);
static gchar * std_string_get_data (StdString * str);

void
init (void)
{
  current_backtrace = gum_tls_key_new ();
}

void
finalize (void)
{
  gum_tls_key_free (current_backtrace);
}

ArtBacktrace *
_create (JNIEnv * env,
         guint limit)
{
  ArtBacktrace * bt;

  bt = g_new (ArtBacktrace, 1);
  bt->id = g_checksum_new (G_CHECKSUM_SHA1);
  bt->frames = (limit != 0)
      ? g_array_sized_new (FALSE, FALSE, sizeof (ArtStackFrame), limit)
      : g_array_new (FALSE, FALSE, sizeof (ArtStackFrame));
  g_array_set_clear_func (bt->frames, (GDestroyNotify) art_stack_frame_destroy);
  bt->frames_json = NULL;

  gum_tls_key_set_value (current_backtrace, bt);

  perform_art_thread_state_transition (env);

  gum_tls_key_set_value (current_backtrace, NULL);

  return bt;
}

void
_on_thread_state_transition_complete (ArtThread * thread)
{
  ArtContext * context;
  ArtStackVisitor visitor = {
    .vtable_storage = {
      .visit = visit_frame,
    },
  };

  context = art_make_context (thread);

  art_stack_visitor_init (&visitor, thread, context, STACK_WALK_SKIP_INLINED_FRAMES, 0, true);
  visitor.vtable = &visitor.vtable_storage;
  visitor.backtrace = gum_tls_key_get_value (current_backtrace);

  art_stack_visitor_walk_stack (&visitor, false);

  cxx_delete (context);
}

static bool
visit_frame (ArtStackVisitor * visitor)
{
  ArtBacktrace * bt = visitor->backtrace;
  ArtStackFrame frame;
  const gchar * description, * dexpc_part;

  frame.method = art_stack_visitor_get_method (visitor);

  art_stack_visitor_describe_location (&frame.description, visitor);

  description = std_string_get_data (&frame.description);
  if (strstr (description, " '<") != NULL)
    goto skip;

  dexpc_part = strstr (description, " at dex PC 0x");
  if (dexpc_part == NULL)
    goto skip;
  frame.dexpc = strtoul (dexpc_part + 13, NULL, 16);

  g_array_append_val (bt->frames, frame);

  g_checksum_update (bt->id, (guchar *) &frame.method, sizeof (frame.method));
  g_checksum_update (bt->id, (guchar *) &frame.dexpc, sizeof (frame.dexpc));

  return true;

skip:
  std_string_destroy (&frame.description);
  return true;
}

static void
art_stack_frame_destroy (ArtStackFrame * frame)
{
  std_string_destroy (&frame->description);
}

void
_destroy (ArtBacktrace * backtrace)
{
  g_free (backtrace->frames_json);
  g_array_free (backtrace->frames, TRUE);
  g_checksum_free (backtrace->id);
  g_free (backtrace);
}

const gchar *
_get_id (ArtBacktrace * backtrace)
{
  return g_checksum_get_string (backtrace->id);
}

const gchar *
_get_frames (ArtBacktrace * backtrace)
{
  GArray * frames = backtrace->frames;
  JsonBuilder * b;
  guint i;
  JsonNode * root;

  if (backtrace->frames_json != NULL)
    return backtrace->frames_json;

  b = json_builder_new_immutable ();

  json_builder_begin_array (b);

  for (i = 0; i != frames->len; i++)
  {
    ArtStackFrame * frame = &g_array_index (frames, ArtStackFrame, i);
    gchar * description, * ret_type, * paren_open, * paren_close, * arg_types, * token, * method_name, * class_name;
    GString * signature;
    gchar * cursor;
    ArtMethod * translated_method;
    StdString location;
    gsize dexpc;
    const gchar * source_file;
    gint32 line_number;

    description = std_string_get_data (&frame->description);

    ret_type = strchr (description, '\\'') + 1;

    paren_open = strchr (ret_type, '(');
    paren_close = strchr (paren_open, ')');
    *paren_open = '\\0';
    *paren_close = '\\0';

    arg_types = paren_open + 1;

    token = strrchr (ret_type, '.');
    *token = '\\0';

    method_name = token + 1;

    token = strrchr (ret_type, ' ');
    *token = '\\0';

    class_name = token + 1;

    signature = g_string_sized_new (128);

    append_jni_type_name (signature, class_name, method_name - class_name - 1);
    g_string_append_c (signature, ',');
    g_string_append (signature, method_name);
    g_string_append (signature, ",(");

    if (arg_types != paren_close)
    {
      for (cursor = arg_types; cursor != NULL;)
      {
        gsize length;
        gchar * next;

        token = strstr (cursor, ", ");
        if (token != NULL)
        {
          length = token - cursor;
          next = token + 2;
        }
        else
        {
          length = paren_close - cursor;
          next = NULL;
        }

        append_jni_type_name (signature, cursor, length);

        cursor = next;
      }
    }

    g_string_append_c (signature, ')');

    append_jni_type_name (signature, ret_type, class_name - ret_type - 1);

    translated_method = translate_method (frame->method);
    dexpc = (translated_method == frame->method) ? frame->dexpc : 0;

    get_class_location (&location, GSIZE_TO_POINTER (translated_method->declaring_class));

    translate_location (translated_method, dexpc, &source_file, &line_number);

    json_builder_begin_object (b);

    json_builder_set_member_name (b, "signature");
    json_builder_add_string_value (b, signature->str);

    json_builder_set_member_name (b, "origin");
    json_builder_add_string_value (b, std_string_get_data (&location));

    json_builder_set_member_name (b, "className");
    json_builder_add_string_value (b, class_name);

    json_builder_set_member_name (b, "methodName");
    json_builder_add_string_value (b, method_name);

    json_builder_set_member_name (b, "methodFlags");
    json_builder_add_int_value (b, translated_method->access_flags);

    json_builder_set_member_name (b, "fileName");
    json_builder_add_string_value (b, source_file);

    json_builder_set_member_name (b, "lineNumber");
    json_builder_add_int_value (b, line_number);

    json_builder_end_object (b);

    std_string_destroy (&location);
    g_string_free (signature, TRUE);
  }

  json_builder_end_array (b);

  root = json_builder_get_root (b);
  backtrace->frames_json = json_to_string (root, FALSE);
  json_node_unref (root);

  return backtrace->frames_json;
}

static void
append_jni_type_name (GString * s,
                      const gchar * name,
                      gsize length)
{
  gchar shorty = '\\0';
  gsize i;

  switch (name[0])
  {
    case 'b':
      if (strncmp (name, "boolean", length) == 0)
        shorty = 'Z';
      else if (strncmp (name, "byte", length) == 0)
        shorty = 'B';
      break;
    case 'c':
      if (strncmp (name, "char", length) == 0)
        shorty = 'C';
      break;
    case 'd':
      if (strncmp (name, "double", length) == 0)
        shorty = 'D';
      break;
    case 'f':
      if (strncmp (name, "float", length) == 0)
        shorty = 'F';
      break;
    case 'i':
      if (strncmp (name, "int", length) == 0)
        shorty = 'I';
      break;
    case 'l':
      if (strncmp (name, "long", length) == 0)
        shorty = 'J';
      break;
    case 's':
      if (strncmp (name, "short", length) == 0)
        shorty = 'S';
      break;
    case 'v':
      if (strncmp (name, "void", length) == 0)
        shorty = 'V';
      break;
  }

  if (shorty != '\\0')
  {
    g_string_append_c (s, shorty);

    return;
  }

  if (length > 2 && name[length - 2] == '[' && name[length - 1] == ']')
  {
    g_string_append_c (s, '[');
    append_jni_type_name (s, name, length - 2);

    return;
  }

  g_string_append_c (s, 'L');

  for (i = 0; i != length; i++)
  {
    gchar ch = name[i];
    if (ch != '.')
      g_string_append_c (s, ch);
    else
      g_string_append_c (s, '/');
  }

  g_string_append_c (s, ';');
}

static void
std_string_destroy (StdString * str)
{
  bool is_large = (str->flags & 1) != 0;
  if (is_large)
    cxx_delete (str->large.data);
}

static gchar *
std_string_get_data (StdString * str)
{
  bool is_large = (str->flags & 1) != 0;
  return is_large ? str->large.data : str->tiny.data;
}
`,{current_backtrace:Memory.alloc(Process.pointerSize),perform_art_thread_state_transition:r,art_make_context:t["art::Thread::GetLongJumpContext"]??t["art::Context::Create"],art_stack_visitor_init:t["art::StackVisitor::StackVisitor"],art_stack_visitor_walk_stack:t["art::StackVisitor::WalkStack"],art_stack_visitor_get_method:t["art::StackVisitor::GetMethod"],art_stack_visitor_describe_location:t["art::StackVisitor::DescribeLocation"],translate_method:ie.replacedMethods.translate,translate_location:t["art::Monitor::TranslateLocation"],get_class_location:t["art::mirror::Class::GetLocation"],cxx_delete:t.$delete,strtoul:Process.getModuleByName("libc.so").getExportByName("strtoul")}),i=new NativeFunction(o._create,"pointer",["pointer","uint"],W),s=new NativeFunction(o._destroy,"void",["pointer"],W),c={exceptions:"propagate",scheduling:"exclusive"},a=new NativeFunction(o._get_id,"pointer",["pointer"],c),l=new NativeFunction(o._get_frames,"pointer",["pointer"],c),d=bo(n,e,o._on_thread_state_transition_complete);o._performData=d,r.writePointer(d),o.backtrace=(f,u)=>{let _=i(f,u),h=new Fn(_);return Script.bindWeak(h,p.bind(null,_)),h};function p(f){s(f)}return o.getId=f=>a(f).readUtf8String(),o.getFrames=f=>JSON.parse(l(f).readUtf8String()),o}var Fn=class{constructor(e){this.handle=e}get id(){return at.getId(this.handle)}get frames(){return at.getFrames(this.handle)}};function Qn(){Nt.forEach(n=>{n.vtablePtr.writePointer(n.vtable),n.vtableCountPtr.writeS32(n.vtableCount)}),Nt.clear();for(let n of _o.splice(0))n.deactivate();for(let n of Gn.splice(0))n.revert()}function Yn(n){return go(n,"art::jni::JniIdManager::DecodeMethodId")}function oo(n){return go(n,"art::jni::JniIdManager::DecodeFieldId")}function go(n,e){let t=J(),r=po(t).offset,o=r.jniIdManager,i=r.jniIdsIndirection;if(o!==null&&i!==null){let s=t.artRuntime;if(s.add(i).readInt()!==Fa){let a=s.add(o).readPointer();return t[e](a,n)}}return n}var pl={ia32:fl,x64:hl,arm:_l,arm64:ml};function fl(n,e,t,r,o){let i=Ke(o).offset,s=me(o).offset,c;return Memory.patchCode(n,128,a=>{let l=new X86Writer(a,{pc:n}),d=new X86Relocator(e,l),p=[15,174,4,36],f=[15,174,12,36];l.putPushax(),l.putMovRegReg("ebp","esp"),l.putAndRegU32("esp",4294967280),l.putSubRegImm("esp",512),l.putBytes(p),l.putMovRegFsU32Ptr("ebx",i.self),l.putCallAddressWithAlignedArguments(ie.replacedMethods.findReplacementFromQuickCode,["eax","ebx"]),l.putTestRegReg("eax","eax"),l.putJccShortLabel("je","restore_registers","no-hint"),l.putMovRegOffsetPtrReg("ebp",7*4,"eax"),l.putLabel("restore_registers"),l.putBytes(f),l.putMovRegReg("esp","ebp"),l.putPopax(),l.putJccShortLabel("jne","invoke_replacement","no-hint");do c=d.readOne();while(c<t&&!d.eoi);d.writeAll(),d.eoi||l.putJmpAddress(e.add(c)),l.putLabel("invoke_replacement"),l.putJmpRegOffsetPtr("eax",s.quickCode),l.flush()}),c}function hl(n,e,t,r,o){let i=Ke(o).offset,s=me(o).offset,c;return Memory.patchCode(n,256,a=>{let l=new X86Writer(a,{pc:n}),d=new X86Relocator(e,l),p=[15,174,4,36],f=[15,174,12,36];l.putPushax(),l.putMovRegReg("rbp","rsp"),l.putAndRegU32("rsp",4294967280),l.putSubRegImm("rsp",512),l.putBytes(p),l.putMovRegGsU32Ptr("rbx",i.self),l.putCallAddressWithAlignedArguments(ie.replacedMethods.findReplacementFromQuickCode,["rdi","rbx"]),l.putTestRegReg("rax","rax"),l.putJccShortLabel("je","restore_registers","no-hint"),l.putMovRegOffsetPtrReg("rbp",8*8,"rax"),l.putLabel("restore_registers"),l.putBytes(f),l.putMovRegReg("rsp","rbp"),l.putPopax(),l.putJccShortLabel("jne","invoke_replacement","no-hint");do c=d.readOne();while(c<t&&!d.eoi);d.writeAll(),d.eoi||l.putJmpAddress(e.add(c)),l.putLabel("invoke_replacement"),l.putJmpRegOffsetPtr("rdi",s.quickCode),l.flush()}),c}function _l(n,e,t,r,o){let i=me(o).offset,s=e.and(Vn),c;return Memory.patchCode(n,128,a=>{let l=new ThumbWriter(a,{pc:n}),d=new ThumbRelocator(s,l),p=[45,237,16,10],f=[189,236,16,10];l.putPushRegs(["r1","r2","r3","r5","r6","r7","r8","r10","r11","lr"]),l.putBytes(p),l.putSubRegRegImm("sp","sp",8),l.putStrRegRegOffset("r0","sp",0),l.putCallAddressWithArguments(ie.replacedMethods.findReplacementFromQuickCode,["r0","r9"]),l.putCmpRegImm("r0",0),l.putBCondLabel("eq","restore_registers"),l.putStrRegRegOffset("r0","sp",0),l.putLabel("restore_registers"),l.putLdrRegRegOffset("r0","sp",0),l.putAddRegRegImm("sp","sp",8),l.putBytes(f),l.putPopRegs(["lr","r11","r10","r8","r7","r6","r5","r3","r2","r1"]),l.putBCondLabel("ne","invoke_replacement");do c=d.readOne();while(c<t&&!d.eoi);d.writeAll(),d.eoi||l.putLdrRegAddress("pc",e.add(c)),l.putLabel("invoke_replacement"),l.putLdrRegRegOffset("pc","r0",i.quickCode),l.flush()}),c}function ml(n,e,t,{availableScratchRegs:r},o){let i=me(o).offset,s;return Memory.patchCode(n,256,c=>{let a=new Arm64Writer(c,{pc:n}),l=new Arm64Relocator(e,a);a.putPushRegReg("d0","d1"),a.putPushRegReg("d2","d3"),a.putPushRegReg("d4","d5"),a.putPushRegReg("d6","d7"),a.putPushRegReg("x1","x2"),a.putPushRegReg("x3","x4"),a.putPushRegReg("x5","x6"),a.putPushRegReg("x7","x20"),a.putPushRegReg("x21","x22"),a.putPushRegReg("x23","x24"),a.putPushRegReg("x25","x26"),a.putPushRegReg("x27","x28"),a.putPushRegReg("x29","lr"),a.putSubRegRegImm("sp","sp",16),a.putStrRegRegOffset("x0","sp",0),a.putCallAddressWithArguments(ie.replacedMethods.findReplacementFromQuickCode,["x0","x19"]),a.putCmpRegReg("x0","xzr"),a.putBCondLabel("eq","restore_registers"),a.putStrRegRegOffset("x0","sp",0),a.putLabel("restore_registers"),a.putLdrRegRegOffset("x0","sp",0),a.putAddRegRegImm("sp","sp",16),a.putPopRegReg("x29","lr"),a.putPopRegReg("x27","x28"),a.putPopRegReg("x25","x26"),a.putPopRegReg("x23","x24"),a.putPopRegReg("x21","x22"),a.putPopRegReg("x7","x20"),a.putPopRegReg("x5","x6"),a.putPopRegReg("x3","x4"),a.putPopRegReg("x1","x2"),a.putPopRegReg("d6","d7"),a.putPopRegReg("d4","d5"),a.putPopRegReg("d2","d3"),a.putPopRegReg("d0","d1"),a.putBCondLabel("ne","invoke_replacement");do s=l.readOne();while(s<t&&!l.eoi);if(l.writeAll(),!l.eoi){let d=Array.from(r)[0];a.putLdrRegAddress(d,e.add(s)),a.putBrReg(d)}a.putLabel("invoke_replacement"),a.putLdrRegRegOffset("x16","x0",i.quickCode),a.putBrReg("x16"),a.flush()}),s}var gl={ia32:io,x64:io,arm:yl,arm64:bl};function io(n,e,t){Memory.patchCode(n,16,r=>{let o=new X86Writer(r,{pc:n});o.putJmpAddress(e),o.flush()})}function yl(n,e,t){let r=n.and(Vn);Memory.patchCode(r,16,o=>{let i=new ThumbWriter(o,{pc:r});i.putLdrRegAddress("pc",e.or(1)),i.flush()})}function bl(n,e,t){Memory.patchCode(n,16,r=>{let o=new Arm64Writer(r,{pc:n});t===16?o.putLdrRegAddress("x16",e):o.putAdrpRegAddress("x16",e),o.putBrReg("x16"),o.flush()})}var El={ia32:5,x64:16,arm:8,arm64:16},Ot=class{constructor(e){this.quickCode=e,this.quickCodeAddress=Process.arch==="arm"?e.and(Vn):e,this.redirectSize=0,this.trampoline=null,this.overwrittenPrologue=null,this.overwrittenPrologueLength=0}_canRelocateCode(e,t){let r=Pn[Process.arch],o=Kc[Process.arch],{quickCodeAddress:i}=this,s=new r(i),c=new o(i,s),a;if(Process.arch==="arm64"){let l=new Set(["x16","x17"]);do{let d=c.readOne(),p=new Set(l),{read:f,written:u}=c.input.regsAccessed;for(let _ of[f,u])for(let h of _){let g;h.startsWith("w")?g="x"+h.substring(1):g=h,p.delete(g)}if(p.size===0)break;a=d,l=p}while(a<e&&!c.eoi);t.availableScratchRegs=l}else do a=c.readOne();while(a<e&&!c.eoi);return a>=e}_allocateTrampoline(){At===null&&(At=on(v===4?128:256));let e=El[Process.arch],t,r,o=1,i={};if(v===4||this._canRelocateCode(e,i))t=e,r={};else{let s;Process.arch==="x64"?(t=5,s=Da):Process.arch==="arm64"&&(t=8,s=Ua,o=4096),r={near:this.quickCodeAddress,maxDistance:s}}return this.redirectSize=t,this.trampoline=At.allocateSlice(r,o),i}_destroyTrampoline(){At.freeSlice(this.trampoline)}activate(e){let t=this._allocateTrampoline(),{trampoline:r,quickCode:o,redirectSize:i}=this,s=pl[Process.arch],c=s(r,o,i,t,e);this.overwrittenPrologueLength=c,this.overwrittenPrologue=Memory.dup(this.quickCodeAddress,c);let a=gl[Process.arch];a(o,r,i)}deactivate(){let{quickCodeAddress:e,overwrittenPrologueLength:t}=this,r=Pn[Process.arch];Memory.patchCode(e,t,o=>{let i=new r(o,{pc:e}),{overwrittenPrologue:s}=this;i.putBytes(s.readByteArray(t)),i.flush()}),this._destroyTrampoline()}};function vl(n){let e=J(),{module:t,artClassLinker:r}=e;return n.equals(r.quickGenericJniTrampoline)||n.equals(r.quickToInterpreterBridgeTrampoline)||n.equals(r.quickResolutionTrampoline)||n.equals(r.quickImtConflictTrampoline)||n.compare(t.base)>=0&&n.compare(t.base.add(t.size))<0}var Dn=class{constructor(e){let t=Yn(e);this.methodId=t,this.originalMethod=null,this.hookedMethodId=t,this.replacementMethodId=null,this.interceptor=null}replace(e,t,r,o,i){let{kAccCompileDontBother:s,artNterpEntryPoint:c}=i;this.originalMethod=so(this.methodId,o);let a=this.originalMethod.accessFlags;if((a&Pa)!==0&&Sl()){let u=this.originalMethod.jniCode;this.hookedMethodId=u.add(2*v).readPointer(),this.originalMethod=so(this.hookedMethodId,o)}let{hookedMethodId:l}=this,d=Il(l,o);this.replacementMethodId=d,Tt(d,{jniCode:e,accessFlags:(a&~(Na|ka|Zr)|kt|s)>>>0,quickCode:i.artClassLinker.quickGenericJniTrampoline,interpreterCode:i.artInterpreterToCompiledCodeBridge},o);let p=lo|Ra|Zr;(a&kt)===0&&(p|=Ma),Tt(l,{accessFlags:(a&~p|s)>>>0},o);let f=this.originalMethod.quickCode;if(c!==null&&f.equals(c)&&Tt(l,{quickCode:i.artQuickToInterpreterBridge},o),!vl(f)){let u=new Ot(f);u.activate(o),this.interceptor=u}ie.replacedMethods.set(l,d),Wc(l,o)}revert(e){let{hookedMethodId:t,interceptor:r}=this;Tt(t,this.originalMethod,e),ie.replacedMethods.delete(t),r!==null&&(r.deactivate(),this.interceptor=null)}resolveTarget(e,t,r,o){return this.hookedMethodId}};function Sl(){return te()<28}function so(n,e){let r=me(e).offset;return["jniCode","accessFlags","quickCode","interpreterCode"].reduce((o,i)=>{let s=r[i];if(s===void 0)return o;let c=n.add(s),a=i==="accessFlags"?wa:Ia;return o[i]=a.call(c),o},{})}function Tt(n,e,t){let o=me(t).offset;Object.keys(e).forEach(i=>{let s=o[i];if(s===void 0)return;let c=n.add(s);(i==="accessFlags"?Ca:La).call(c,e[i])})}var Un=class{constructor(e){this.methodId=e,this.originalMethod=null}replace(e,t,r,o,i){let{methodId:s}=this;this.originalMethod=Memory.dup(s,Sn);let c=r.reduce((f,u)=>f+u.size,0);t&&c++;let a=(s.add(qr).readU32()|kt)>>>0,l=c,d=0,p=c;s.add(qr).writeU32(a),s.add($a).writeU16(l),s.add(Ha).writeU16(d),s.add(Za).writeU16(p),s.add(Ka).writeU32(wl(s)),i.dvmUseJNIBridge(s,e)}revert(e){Memory.copy(this.methodId,this.originalMethod,Sn)}resolveTarget(e,t,r,o){let i=r.handle.add(uo).readPointer(),s;if(t)s=o.dvmDecodeIndirectRef(i,e.$h);else{let f=e.$borrowClassHandle(r);s=o.dvmDecodeIndirectRef(i,f.value),f.unref(r)}let c;t?c=s.add(Ja).readPointer():c=s;let a=c.toString(16),l=Nt.get(a);if(l===void 0){let f=c.add(Va),u=c.add(za),_=f.readPointer(),h=u.readS32(),g=h*v,y=Memory.alloc(2*g);Memory.copy(y,_,g),f.writePointer(y),l={classObject:c,vtablePtr:f,vtableCountPtr:u,vtable:_,vtableCount:h,shadowVtable:y,shadowVtableCount:h,targetMethods:new Map},Nt.set(a,l)}let d=this.methodId.toString(16),p=l.targetMethods.get(d);if(p===void 0){p=Memory.dup(this.originalMethod,Sn);let f=l.shadowVtableCount++;l.shadowVtable.add(f*v).writePointer(p),p.add(Ga).writeU16(f),l.vtableCountPtr.writeS32(l.shadowVtableCount),l.targetMethods.set(d,p)}return p}};function wl(n){if(Process.arch!=="ia32")return Kr;let e=n.add(qa).readPointer().readCString();if(e===null||e.length===0||e.length>65535)return Kr;let t;switch(e[0]){case"V":t=Wa;break;case"F":t=Qa;break;case"D":t=Ya;break;case"J":t=Xa;break;case"Z":case"B":t=rc;break;case"C":t=nc;break;case"S":t=tc;break;default:t=ec;break}let r=0;for(let o=e.length-1;o>0;o--){let i=e[o];r+=i==="D"||i==="J"?2:1}return t<<oc|r}function Il(n,e){let t=J();if(te()<23){let r=t["art::Thread::CurrentFromGdb"]();return t["art::mirror::Object::Clone"](n,r)}return Memory.dup(n,me(e).size)}function Xn(n,e,t){yo(n,e,Mn,t)}function er(n,e){yo(n,e,Nn)}function tr(n,e){let t=J();if(te()<26)throw new Error("This API is only available on Android >= 8.0");Ee(n,e,r=>{t["art::Runtime::DeoptimizeBootImage"](t.artRuntime)})}function yo(n,e,t,r){let o=J();if(te()<24)throw new Error("This API is only available on Android >= 7.0");Ee(n,e,i=>{if(te()<30){if(!o.isJdwpStarted()){let c=Cl(o);fc.push(c)}o.isDebuggerActive()||o["art::Dbg::GoActive"]();let s=Memory.alloc(8+v);switch(s.writeU32(t),t){case Nn:break;case Mn:s.add(8).writePointer(r);break;default:throw new Error("Unsupported deoptimization kind")}o["art::Dbg::RequestDeoptimization"](s),o["art::Dbg::ManageDeoptimization"]()}else{let s=o.artInstrumentation;if(s===null)throw new Error("Unable to find Instrumentation class in ART; please file a bug");let c=o["art::Instrumentation::EnableDeoptimization"];switch(c!==void 0&&(s.add(cc().offset.deoptimizationEnabled).readU8()||c(s)),t){case Nn:o["art::Instrumentation::DeoptimizeEverything"](s,Memory.allocUtf8String("frida"));break;case Mn:o["art::Instrumentation::Deoptimize"](s,r);break;default:throw new Error("Unsupported deoptimization kind")}}})}var Bn=class{constructor(){let e=Process.getModuleByName("libart.so"),t=e.getExportByName("_ZN3art4JDWP12JdwpAdbState6AcceptEv"),r=e.getExportByName("_ZN3art4JDWP12JdwpAdbState15ReceiveClientFdEv"),o=ao(),i=ao();this._controlFd=o[0],this._clientFd=i[0];let s=null;s=Interceptor.attach(t,function(c){let a=c[0];Memory.scanSync(a.add(8252),256,"00 ff ff ff ff 00")[0].address.add(1).writeS32(o[1]),s.detach()}),Interceptor.replace(r,new NativeCallback(function(c){return Interceptor.revert(r),i[1]},"int",["pointer"])),Interceptor.flush(),this._handshakeRequest=this._performHandshake()}async _performHandshake(){let e=new UnixInputStream(this._clientFd,{autoClose:!1}),t=new UnixOutputStream(this._clientFd,{autoClose:!1}),r=[74,68,87,80,45,72,97,110,100,115,104,97,107,101];try{await t.writeAll(r),await e.readAll(r.length)}catch{}}};function Cl(n){let e=new Bn;n["art::Dbg::SetJdwpAllowed"](1);let t=Ll();n["art::Dbg::ConfigureJdwp"](t);let r=n["art::InternalDebuggerControlCallback::StartDebugger"];return r!==void 0?r(NULL):n["art::Dbg::StartJdwp"](),e}function Ll(){let n=te()<28?2:3,e=0,t=n,r=!0,o=!1,i=e,s=8+lt+2,c=Memory.alloc(s);return c.writeU32(t).add(4).writeU8(r?1:0).add(1).writeU8(o?1:0).add(1).add(lt).writeU16(i),c}function ao(){Ln===null&&(Ln=new NativeFunction(Process.getModuleByName("libc.so").getExportByName("socketpair"),"int",["int","int","int","pointer"]));let n=Memory.alloc(8);if(Ln(sc,ac,0,n)===-1)throw new Error("Unable to create socketpair for JDWP");return[n.readS32(),n.add(4).readS32()]}function Al(n){let e=gc().offset,t=n.vm.add(e.globalsLock),r=n.vm.add(e.globals),o=n["art::IndirectReferenceTable::Add"],i=n["art::ReaderWriterMutex::ExclusiveLock"],s=n["art::ReaderWriterMutex::ExclusiveUnlock"],c=0;return function(a,l,d){i(t,l);try{return o(r,c,d)}finally{s(t,l)}}}function Tl(n){let e=n["art::Thread::DecodeJObject"];if(e===void 0)throw new Error("art::Thread::DecodeJObject is not available; please file a bug");return function(t,r,o){return e(r,o)}}var xl={ia32:co,x64:co,arm:kl,arm64:Nl};function bo(n,e,t){let r=J(),o=e.handle.readPointer(),i,s=r.find("_ZN3art3JNIILb1EE14ExceptionClearEP7_JNIEnv");s!==null?i=s:i=o.add(Ft).readPointer();let c,a=r.find("_ZN3art3JNIILb1EE10FatalErrorEP7_JNIEnvPKc");a!==null?c=a:c=o.add(Ba).readPointer();let l=xl[Process.arch];if(l===void 0)throw new Error("Not yet implemented for "+Process.arch);let d=null,p=Ke(n).offset,f=p.exception,u=new Set,_=p.isExceptionReportedToInstrumentation;_!==null&&u.add(_);let h=p.throwLocation;h!==null&&(u.add(h),u.add(h+v),u.add(h+2*v));let g=65536,y=Memory.alloc(g);return Memory.patchCode(y,g,E=>{d=l(E,y,i,c,f,u,t)}),d._code=y,d._callback=t,d}function co(n,e,t,r,o,i,s){let c={},a=new Set,l=[t];for(;l.length>0;){let h=l.shift();if(Object.values(c).some(({begin:M,end:O})=>h.compare(M)>=0&&h.compare(O)<0))continue;let y=h.toString(),E={begin:h},C=null,A=!1;do{if(h.equals(r)){A=!0;break}let M=Instruction.parse(h);C=M;let O=c[M.address.toString()];if(O!==void 0){delete c[O.begin.toString()],c[y]=O,O.begin=E.begin,E=null;break}let N=null;switch(M.mnemonic){case"jmp":N=ptr(M.operands[0].value),A=!0;break;case"je":case"jg":case"jle":case"jne":case"js":N=ptr(M.operands[0].value);break;case"ret":A=!0;break}N!==null&&(a.add(N.toString()),l.push(N),l.sort((k,S)=>k.compare(S))),h=M.next}while(!A);E!==null&&(E.end=C.address.add(C.size),c[y]=E)}let d=Object.keys(c).map(h=>c[h]);d.sort((h,g)=>h.begin.compare(g.begin));let p=c[t.toString()];d.splice(d.indexOf(p),1),d.unshift(p);let f=new X86Writer(n,{pc:e}),u=!1,_=null;return d.forEach(h=>{let g=h.end.sub(h.begin).toInt32(),y=new X86Relocator(h.begin,f),E;for(;(E=y.readOne())!==0;){let C=y.input,{mnemonic:A}=C,M=C.address.toString();a.has(M)&&f.putLabel(M);let O=!0;switch(A){case"jmp":f.putJmpNearLabel(he(C.operands[0])),O=!1;break;case"je":case"jg":case"jle":case"jne":case"js":f.putJccNearLabel(A,he(C.operands[0]),"no-hint"),O=!1;break;case"mov":{let[N,k]=C.operands;if(N.type==="mem"&&k.type==="imm"){let S=N.value,T=S.disp;if(T===o&&k.value.valueOf()===0){if(_=S.base,f.putPushfx(),f.putPushax(),f.putMovRegReg("xbp","xsp"),v===4)f.putAndRegU32("esp",4294967280);else{let R=_!=="rdi"?"rdi":"rsi";f.putMovRegU64(R,uint64("0xfffffffffffffff0")),f.putAndRegReg("rsp",R)}f.putCallAddressWithAlignedArguments(s,[_]),f.putMovRegReg("xsp","xbp"),f.putPopax(),f.putPopfx(),u=!0,O=!1}else i.has(T)&&S.base===_&&(O=!1)}break}case"call":{let N=C.operands[0];N.type==="mem"&&N.value.disp===Ft&&(v===4?(f.putPopReg("eax"),f.putMovRegRegOffsetPtr("eax","eax",4),f.putPushReg("eax")):f.putMovRegRegOffsetPtr("rdi","rdi",8),f.putCallAddressWithArguments(s,[]),u=!0,O=!1);break}}if(O?y.writeAll():y.skipOne(),E===g)break}y.dispose()}),f.dispose(),u||nr(),new NativeFunction(e,"void",["pointer"],W)}function kl(n,e,t,r,o,i,s){let c={},a=new Set,l=ptr(1).not(),d=[t];for(;d.length>0;){let y=d.shift();if(Object.values(c).some(({begin:T,end:R})=>y.compare(T)>=0&&y.compare(R)<0))continue;let C=y.and(l),A=C.toString(),M=y.and(1),O={begin:C},N=null,k=!1,S=0;do{if(y.equals(r)){k=!0;break}let T=Instruction.parse(y),{mnemonic:R}=T;N=T;let j=y.and(l).toString(),D=c[j];if(D!==void 0){delete c[D.begin.toString()],c[A]=D,D.begin=O.begin,O=null;break}let U=S===0,F=null;switch(R){case"b":F=ptr(T.operands[0].value),k=U;break;case"beq.w":case"beq":case"bne":case"bne.w":case"bgt":F=ptr(T.operands[0].value);break;case"cbz":case"cbnz":F=ptr(T.operands[1].value);break;case"pop.w":U&&(k=T.operands.filter(z=>z.value==="pc").length===1);break}switch(R){case"it":S=1;break;case"itt":S=2;break;case"ittt":S=3;break;case"itttt":S=4;break;default:S>0&&S--;break}F!==null&&(a.add(F.toString()),d.push(F.or(M)),d.sort((z,ee)=>z.compare(ee))),y=T.next}while(!k);O!==null&&(O.end=N.address.add(N.size),c[A]=O)}let p=Object.keys(c).map(y=>c[y]);p.sort((y,E)=>y.begin.compare(E.begin));let f=c[t.and(l).toString()];p.splice(p.indexOf(f),1),p.unshift(f);let u=new ThumbWriter(n,{pc:e}),_=!1,h=null,g=null;return p.forEach(y=>{let E=new ThumbRelocator(y.begin,u),C=y.begin,A=y.end,M=0;do{if(E.readOne()===0)throw new Error("Unexpected end of block");let N=E.input;C=N.address,M=N.size;let{mnemonic:k}=N,S=C.toString();a.has(S)&&u.putLabel(S);let T=!0;switch(k){case"b":u.putBLabel(he(N.operands[0])),T=!1;break;case"beq.w":u.putBCondLabelWide("eq",he(N.operands[0])),T=!1;break;case"bne.w":u.putBCondLabelWide("ne",he(N.operands[0])),T=!1;break;case"beq":case"bne":case"bgt":u.putBCondLabelWide(k.substr(1),he(N.operands[0])),T=!1;break;case"cbz":{let R=N.operands;u.putCbzRegLabel(R[0].value,he(R[1])),T=!1;break}case"cbnz":{let R=N.operands;u.putCbnzRegLabel(R[0].value,he(R[1])),T=!1;break}case"str":case"str.w":{let R=N.operands[1].value,w=R.disp;if(w===o){h=R.base;let j=h!=="r4"?"r4":"r5",D=["r0","r1","r2","r3",j,"r9","r12","lr"];u.putPushRegs(D),u.putMrsRegReg(j,"apsr-nzcvq"),u.putCallAddressWithArguments(s,[h]),u.putMsrRegReg("apsr-nzcvq",j),u.putPopRegs(D),_=!0,T=!1}else i.has(w)&&R.base===h&&(T=!1);break}case"ldr":{let[R,w]=N.operands;if(w.type==="mem"){let j=w.value;j.base[0]==="r"&&j.disp===Ft&&(g=R.value)}break}case"blx":N.operands[0].value===g&&(u.putLdrRegRegOffset("r0","r0",4),u.putCallAddressWithArguments(s,["r0"]),_=!0,g=null,T=!1);break}T?E.writeAll():E.skipOne()}while(!C.add(M).equals(A));E.dispose()}),u.dispose(),_||nr(),new NativeFunction(e.or(1),"void",["pointer"],W)}function Nl(n,e,t,r,o,i,s){let c={},a=new Set,l=[t];for(;l.length>0;){let y=l.shift();if(Object.values(c).some(({begin:N,end:k})=>y.compare(N)>=0&&y.compare(k)<0))continue;let C=y.toString(),A={begin:y},M=null,O=!1;do{if(y.equals(r)){O=!0;break}let N;try{N=Instruction.parse(y)}catch(T){if(y.readU32()===0){O=!0;break}else throw T}M=N;let k=c[N.address.toString()];if(k!==void 0){delete c[k.begin.toString()],c[C]=k,k.begin=A.begin,A=null;break}let S=null;switch(N.mnemonic){case"b":S=ptr(N.operands[0].value),O=!0;break;case"b.eq":case"b.ne":case"b.le":case"b.gt":S=ptr(N.operands[0].value);break;case"cbz":case"cbnz":S=ptr(N.operands[1].value);break;case"tbz":case"tbnz":S=ptr(N.operands[2].value);break;case"ret":O=!0;break}S!==null&&(a.add(S.toString()),l.push(S),l.sort((T,R)=>T.compare(R))),y=N.next}while(!O);A!==null&&(A.end=M.address.add(M.size),c[C]=A)}let d=Object.keys(c).map(y=>c[y]);d.sort((y,E)=>y.begin.compare(E.begin));let p=c[t.toString()];d.splice(d.indexOf(p),1),d.unshift(p);let f=new Arm64Writer(n,{pc:e});f.putBLabel("performTransition");let u=e.add(f.offset);f.putPushAllXRegisters(),f.putCallAddressWithArguments(s,["x0"]),f.putPopAllXRegisters(),f.putRet(),f.putLabel("performTransition");let _=!1,h=null,g=null;return d.forEach(y=>{let E=y.end.sub(y.begin).toInt32(),C=new Arm64Relocator(y.begin,f),A;for(;(A=C.readOne())!==0;){let M=C.input,{mnemonic:O}=M,N=M.address.toString();a.has(N)&&f.putLabel(N);let k=!0;switch(O){case"b":f.putBLabel(he(M.operands[0])),k=!1;break;case"b.eq":case"b.ne":case"b.le":case"b.gt":f.putBCondLabel(O.substr(2),he(M.operands[0])),k=!1;break;case"cbz":{let S=M.operands;f.putCbzRegLabel(S[0].value,he(S[1])),k=!1;break}case"cbnz":{let S=M.operands;f.putCbnzRegLabel(S[0].value,he(S[1])),k=!1;break}case"tbz":{let S=M.operands;f.putTbzRegImmLabel(S[0].value,S[1].value.valueOf(),he(S[2])),k=!1;break}case"tbnz":{let S=M.operands;f.putTbnzRegImmLabel(S[0].value,S[1].value.valueOf(),he(S[2])),k=!1;break}case"str":{let S=M.operands,T=S[0].value,R=S[1].value,w=R.disp;T==="xzr"&&w===o?(h=R.base,f.putPushRegReg("x0","lr"),f.putMovRegReg("x0",h),f.putBlImm(u),f.putPopRegReg("x0","lr"),_=!0,k=!1):i.has(w)&&R.base===h&&(k=!1);break}case"ldr":{let S=M.operands,T=S[1].value;T.base[0]==="x"&&T.disp===Ft&&(g=S[0].value);break}case"blr":M.operands[0].value===g&&(f.putLdrRegRegOffset("x0","x0",8),f.putCallAddressWithArguments(s,["x0"]),_=!0,g=null,k=!1);break}if(k?C.writeAll():C.skipOne(),A===E)break}C.dispose()}),f.dispose(),_||nr(),new NativeFunction(e,"void",["pointer"],W)}function nr(){throw new Error("Unable to parse ART internals; please file a bug")}function Ml(n){let e=n["art::ArtMethod::PrettyMethod"];e!==void 0&&(Interceptor.attach(e.impl,ie.hooks.ArtMethod.prettyMethod),Interceptor.flush())}function he(n){return ptr(n.value).toString()}function Rl(n,e){return new NativeFunction(n,"pointer",e,W)}function Ol(n,e){let t=new NativeFunction(n,"void",["pointer"].concat(e),W);return function(){let r=Memory.alloc(v);return t(r,...arguments),r.readPointer()}}function xt(n,e){let{arch:t}=Process;switch(t){case"ia32":case"arm64":{let r;t==="ia32"?r=qe(64,s=>{let c=1+e.length,a=c*4;s.putSubRegImm("esp",a);for(let l=0;l!==c;l++){let d=l*4;s.putMovRegRegOffsetPtr("eax","esp",a+4+d),s.putMovRegOffsetPtrReg("esp",d,"eax")}s.putCallAddress(n),s.putAddRegImm("esp",a-4),s.putRet()}):r=qe(32,s=>{s.putMovRegReg("x8","x0"),e.forEach((c,a)=>{s.putMovRegReg("x"+a,"x"+(a+1))}),s.putLdrRegAddress("x7",n),s.putBrReg("x7")});let o=new NativeFunction(r,"void",["pointer"].concat(e),W),i=function(...s){o(...s)};return i.handle=r,i.impl=n,i}default:{let r=new NativeFunction(n,"void",["pointer"].concat(e),W);return r.impl=n,r}}}var jt=class{constructor(){this.handle=Memory.alloc(lt)}dispose(){let[e,t]=this._getData();t||J().$delete(e)}disposeToString(){let e=this.toString();return this.dispose(),e}toString(){let[e]=this._getData();return e.readUtf8String()}_getData(){let e=this.handle,t=(e.readU8()&1)===0;return[t?e.add(1):e.add(2*v).readPointer(),t]}},zn=class{$delete(){this.dispose(),J().$delete(this)}constructor(e,t){this.handle=e,this._begin=e,this._end=e.add(v),this._storage=e.add(2*v),this._elementSize=t}init(){this.begin=NULL,this.end=NULL,this.storage=NULL}dispose(){J().$delete(this.begin)}get begin(){return this._begin.readPointer()}set begin(e){this._begin.writePointer(e)}get end(){return this._end.readPointer()}set end(e){this._end.writePointer(e)}get storage(){return this._storage.readPointer()}set storage(e){this._storage.writePointer(e)}get size(){return this.end.sub(this.begin).toInt32()/this._elementSize}},dt=class n extends zn{static $new(){let e=new n(J().$new(ic));return e.init(),e}constructor(e){super(e,v)}get handles(){let e=[],t=this.begin,r=this.end;for(;!t.equals(r);)e.push(t.readPointer()),t=t.add(v);return e}},jl=0,Eo=v,vo=Eo+4,Pl=-1,Pt=class n{$delete(){this.dispose(),J().$delete(this)}constructor(e){this.handle=e,this._link=e.add(jl),this._numberOfReferences=e.add(Eo)}init(e,t){this.link=e,this.numberOfReferences=t}dispose(){}get link(){return new n(this._link.readPointer())}set link(e){this._link.writePointer(e)}get numberOfReferences(){return this._numberOfReferences.readS32()}set numberOfReferences(e){this._numberOfReferences.writeS32(e)}},So=Bl(vo),wo=So+v,Fl=wo+v,ut=class n extends Pt{static $new(e,t){let r=new n(J().$new(Fl));return r.init(e,t),r}constructor(e){super(e),this._self=e.add(So),this._currentScope=e.add(wo);let o=(64-v-4-4)/4;this._scopeLayout=ct.layoutForCapacity(o),this._topHandleScopePtr=null}init(e,t){let r=e.add(Ke(t).offset.topHandleScope);this._topHandleScopePtr=r,super.init(r.readPointer(),Pl),this.self=e,this.currentScope=ct.$new(this._scopeLayout),r.writePointer(this)}dispose(){this._topHandleScopePtr.writePointer(this.link);let e;for(;(e=this.currentScope)!==null;){let t=e.link;e.$delete(),this.currentScope=t}}get self(){return this._self.readPointer()}set self(e){this._self.writePointer(e)}get currentScope(){let e=this._currentScope.readPointer();return e.isNull()?null:new ct(e,this._scopeLayout)}set currentScope(e){this._currentScope.writePointer(e)}newHandle(e){return this.currentScope.newHandle(e)}},ct=class n extends Pt{static $new(e){let t=new n(J().$new(e.size),e);return t.init(),t}constructor(e,t){super(e);let{offset:r}=t;this._refsStorage=e.add(r.refsStorage),this._pos=e.add(r.pos),this._layout=t}init(){super.init(NULL,this._layout.numberOfReferences),this.pos=0}get pos(){return this._pos.readU32()}set pos(e){this._pos.writeU32(e)}newHandle(e){let t=this.pos,r=this._refsStorage.add(t*4);return r.writeS32(e.toInt32()),this.pos=t+1,r}static layoutForCapacity(e){let t=vo,r=t+e*4;return{size:r+4,numberOfReferences:e,offset:{refsStorage:t,pos:r}}}},Dl={arm:function(n,e){let t=Process.pageSize,r=Memory.alloc(t);Memory.protect(r,t,"rwx");let o=new NativeCallback(e,"void",["pointer"]);r._onMatchCallback=o;let i=[26625,18947,17041,53505,19202,18200,18288,48896],s=i.length*2,c=s+4,a=c+4;return Memory.patchCode(r,a,function(l){i.forEach((d,p)=>{l.add(p*2).writeU16(d)}),l.add(s).writeS32(n),l.add(c).writePointer(o)}),r.or(1)},arm64:function(n,e){let t=Process.pageSize,r=Memory.alloc(t);Memory.protect(r,t,"rwx");let o=new NativeCallback(e,"void",["pointer"]);r._onMatchCallback=o;let i=[3107979265,402653378,1795293247,1409286241,1476395139,3592355936,3596551104],s=i.length*4,c=s+4,a=c+8;return Memory.patchCode(r,a,function(l){i.forEach((d,p)=>{l.add(p*4).writeU32(d)}),l.add(s).writeS32(n),l.add(c).writePointer(o)}),r}};function rr(n,e){return(Dl[Process.arch]||Ul)(n,e)}function Ul(n,e){return new NativeCallback(t=>{t.readS32()===n&&e(t)},"void",["pointer","pointer"])}function Bl(n){let e=n%v;return e!==0?n+v-e:n}var zl=4,{pointerSize:V}=Process,Vl=256,Jl=65536,Gl=131072,$l=33554432,Hl=67108864,Zl=134217728,Be={exceptions:"propagate"},Ao=de(sd),ql=de(cd),Kl=de(rd),or=null,ir=!1,zt=new Map,ft=new Map;function Le(){return or===null&&(or=Wl()),or}function Wl(){let n=Process.enumerateModules().filter(a=>/jvm.(dll|dylib|so)$/.test(a.name));if(n.length===0)return null;let e=n[0],t={flavor:"jvm"},r=Process.platform==="windows"?[{module:e,functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],JVM_Sleep:["JVM_Sleep","void",["pointer","pointer","long"]],"VMThread::execute":["VMThread::execute","void",["pointer"]],"Method::size":["Method::size","int",["int"]],"Method::set_native_function":["Method::set_native_function","void",["pointer","pointer","int"]],"Method::clear_native_function":["Method::clear_native_function","void",["pointer"]],"Method::jmethod_id":["Method::jmethod_id","pointer",["pointer"]],"ClassLoaderDataGraph::classes_do":["ClassLoaderDataGraph::classes_do","void",["pointer"]],"NMethodSweeper::sweep_code_cache":["NMethodSweeper::sweep_code_cache","void",[]],"OopMapCache::flush_obsolete_entries":["OopMapCache::flush_obsolete_entries","void",["pointer"]]},variables:{"VM_RedefineClasses::`vftable'":function(a){this.vtableRedefineClasses=a},"VM_RedefineClasses::doit":function(a){this.redefineClassesDoIt=a},"VM_RedefineClasses::doit_prologue":function(a){this.redefineClassesDoItPrologue=a},"VM_RedefineClasses::doit_epilogue":function(a){this.redefineClassesDoItEpilogue=a},"VM_RedefineClasses::allow_nested_vm_operations":function(a){this.redefineClassesAllow=a},"NMethodSweeper::_traversals":function(a){this.traversals=a},"NMethodSweeper::_should_sweep":function(a){this.shouldSweep=a}},optionals:[]}]:[{module:e,functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],_ZN6Method4sizeEb:["Method::size","int",["int"]],_ZN6Method19set_native_functionEPhb:["Method::set_native_function","void",["pointer","pointer","int"]],_ZN6Method21clear_native_functionEv:["Method::clear_native_function","void",["pointer"]],_ZN6Method24restore_unshareable_infoEP10JavaThread:["Method::restore_unshareable_info","void",["pointer","pointer"]],_ZN6Method24restore_unshareable_infoEP6Thread:["Method::restore_unshareable_info","void",["pointer","pointer"]],_ZN6Method11link_methodERK12methodHandleP10JavaThread:["Method::link_method","void",["pointer","pointer","pointer"]],_ZN6Method10jmethod_idEv:["Method::jmethod_id","pointer",["pointer"]],_ZN6Method10clear_codeEv:function(a){let l=new NativeFunction(a,"void",["pointer"],Be);this["Method::clear_code"]=function(d){l(d)}},_ZN6Method10clear_codeEb:function(a){let l=new NativeFunction(a,"void",["pointer","int"],Be),d=0;this["Method::clear_code"]=function(p){l(p,d)}},_ZN18VM_RedefineClasses19mark_dependent_codeEP13InstanceKlass:["VM_RedefineClasses::mark_dependent_code","void",["pointer","pointer"]],_ZN18VM_RedefineClasses20flush_dependent_codeEv:["VM_RedefineClasses::flush_dependent_code","void",[]],_ZN18VM_RedefineClasses20flush_dependent_codeEP13InstanceKlassP6Thread:["VM_RedefineClasses::flush_dependent_code","void",["pointer","pointer","pointer"]],_ZN18VM_RedefineClasses20flush_dependent_codeE19instanceKlassHandleP6Thread:["VM_RedefineClasses::flush_dependent_code","void",["pointer","pointer","pointer"]],_ZN19ResolvedMethodTable21adjust_method_entriesEPb:["ResolvedMethodTable::adjust_method_entries","void",["pointer"]],_ZN15MemberNameTable21adjust_method_entriesEP13InstanceKlassPb:["MemberNameTable::adjust_method_entries","void",["pointer","pointer","pointer"]],_ZN17ConstantPoolCache21adjust_method_entriesEPb:function(a){let l=new NativeFunction(a,"void",["pointer","pointer"],Be);this["ConstantPoolCache::adjust_method_entries"]=function(d,p,f){l(d,f)}},_ZN17ConstantPoolCache21adjust_method_entriesEP13InstanceKlassPb:function(a){let l=new NativeFunction(a,"void",["pointer","pointer","pointer"],Be);this["ConstantPoolCache::adjust_method_entries"]=function(d,p,f){l(d,p,f)}},_ZN20ClassLoaderDataGraph10classes_doEP12KlassClosure:["ClassLoaderDataGraph::classes_do","void",["pointer"]],_ZN20ClassLoaderDataGraph22clean_deallocate_listsEb:["ClassLoaderDataGraph::clean_deallocate_lists","void",["int"]],_ZN10JavaThread27thread_from_jni_environmentEP7JNIEnv_:["JavaThread::thread_from_jni_environment","pointer",["pointer"]],_ZN8VMThread7executeEP12VM_Operation:["VMThread::execute","void",["pointer"]],_ZN11OopMapCache22flush_obsolete_entriesEv:["OopMapCache::flush_obsolete_entries","void",["pointer"]],_ZN14NMethodSweeper11force_sweepEv:["NMethodSweeper::force_sweep","void",[]],_ZN14NMethodSweeper16sweep_code_cacheEv:["NMethodSweeper::sweep_code_cache","void",[]],_ZN14NMethodSweeper17sweep_in_progressEv:["NMethodSweeper::sweep_in_progress","bool",[]],JVM_Sleep:["JVM_Sleep","void",["pointer","pointer","long"]]},variables:{_ZN18VM_RedefineClasses14_the_class_oopE:function(a){this.redefineClass=a},_ZN18VM_RedefineClasses10_the_classE:function(a){this.redefineClass=a},_ZN18VM_RedefineClasses25AdjustCpoolCacheAndVtable8do_klassEP5Klass:function(a){this.doKlass=a},_ZN18VM_RedefineClasses22AdjustAndCleanMetadata8do_klassEP5Klass:function(a){this.doKlass=a},_ZTV18VM_RedefineClasses:function(a){this.vtableRedefineClasses=a},_ZN18VM_RedefineClasses4doitEv:function(a){this.redefineClassesDoIt=a},_ZN18VM_RedefineClasses13doit_prologueEv:function(a){this.redefineClassesDoItPrologue=a},_ZN18VM_RedefineClasses13doit_epilogueEv:function(a){this.redefineClassesDoItEpilogue=a},_ZN18VM_RedefineClassesD0Ev:function(a){this.redefineClassesDispose0=a},_ZN18VM_RedefineClassesD1Ev:function(a){this.redefineClassesDispose1=a},_ZNK18VM_RedefineClasses26allow_nested_vm_operationsEv:function(a){this.redefineClassesAllow=a},_ZNK18VM_RedefineClasses14print_on_errorEP12outputStream:function(a){this.redefineClassesOnError=a},_ZN13InstanceKlass33create_new_default_vtable_indicesEiP10JavaThread:function(a){this.createNewDefaultVtableIndices=a},_ZN13InstanceKlass33create_new_default_vtable_indicesEiP6Thread:function(a){this.createNewDefaultVtableIndices=a},_ZN19Abstract_VM_Version19jre_release_versionEv:function(a){let d=new NativeFunction(a,"pointer",[],Be)().readCString();this.version=d.startsWith("1.8")?8:d.startsWith("9.")?9:parseInt(d.slice(0,2),10),this.versionS=d},_ZN14NMethodSweeper11_traversalsE:function(a){this.traversals=a},_ZN14NMethodSweeper21_sweep_fractions_leftE:function(a){this.fractions=a},_ZN14NMethodSweeper13_should_sweepE:function(a){this.shouldSweep=a}},optionals:["_ZN6Method24restore_unshareable_infoEP10JavaThread","_ZN6Method24restore_unshareable_infoEP6Thread","_ZN6Method11link_methodERK12methodHandleP10JavaThread","_ZN6Method10clear_codeEv","_ZN6Method10clear_codeEb","_ZN18VM_RedefineClasses19mark_dependent_codeEP13InstanceKlass","_ZN18VM_RedefineClasses20flush_dependent_codeEv","_ZN18VM_RedefineClasses20flush_dependent_codeEP13InstanceKlassP6Thread","_ZN18VM_RedefineClasses20flush_dependent_codeE19instanceKlassHandleP6Thread","_ZN19ResolvedMethodTable21adjust_method_entriesEPb","_ZN15MemberNameTable21adjust_method_entriesEP13InstanceKlassPb","_ZN17ConstantPoolCache21adjust_method_entriesEPb","_ZN17ConstantPoolCache21adjust_method_entriesEP13InstanceKlassPb","_ZN20ClassLoaderDataGraph22clean_deallocate_listsEb","_ZN10JavaThread27thread_from_jni_environmentEP7JNIEnv_","_ZN14NMethodSweeper11force_sweepEv","_ZN14NMethodSweeper17sweep_in_progressEv","_ZN18VM_RedefineClasses14_the_class_oopE","_ZN18VM_RedefineClasses10_the_classE","_ZN18VM_RedefineClasses25AdjustCpoolCacheAndVtable8do_klassEP5Klass","_ZN18VM_RedefineClasses22AdjustAndCleanMetadata8do_klassEP5Klass","_ZN18VM_RedefineClassesD0Ev","_ZN18VM_RedefineClassesD1Ev","_ZNK18VM_RedefineClasses14print_on_errorEP12outputStream","_ZN13InstanceKlass33create_new_default_vtable_indicesEiP10JavaThread","_ZN13InstanceKlass33create_new_default_vtable_indicesEiP6Thread","_ZN14NMethodSweeper21_sweep_fractions_leftE"]}],o=[];if(r.forEach(function(a){let l=a.module,d=a.functions||{},p=a.variables||{},f=new Set(a.optionals||[]),u=l.enumerateExports().reduce(function(h,g){return h[g.name]=g,h},{}),_=l.enumerateSymbols().reduce(function(h,g){return h[g.name]=g,h},u);Object.keys(d).forEach(function(h){let g=_[h];if(g!==void 0){let y=d[h];typeof y=="function"?y.call(t,g.address):t[y[0]]=new NativeFunction(g.address,y[1],y[2],Be)}else f.has(h)||o.push(h)}),Object.keys(p).forEach(function(h){let g=_[h];g!==void 0?p[h].call(t,g.address):f.has(h)||o.push(h)})}),o.length>0)throw new Error("Java API only partially available; please file a bug. Missing: "+o.join(", "));let i=Memory.alloc(V),s=Memory.alloc(zl);if(ue("JNI_GetCreatedJavaVMs",t.JNI_GetCreatedJavaVMs(i,1,s)),s.readInt()===0)return null;t.vm=i.readPointer();let c=Process.platform==="windows"?{$new:["??2@YAPEAX_K@Z","pointer",["ulong"]],$delete:["??3@YAXPEAX@Z","void",["pointer"]]}:{$new:["_Znwm","pointer",["ulong"]],$delete:["_ZdlPv","void",["pointer"]]};for(let[a,[l,d,p]]of Object.entries(c)){let f=Module.findGlobalExportByName(l);if(f===null&&(f=DebugSymbol.fromName(l).address,f.isNull()))throw new Error(`unable to find C++ allocator API, missing: '${l}'`);t[a]=new NativeFunction(f,d,p,Be)}return t.jvmti=Ql(t),t["JavaThread::thread_from_jni_environment"]===void 0&&(t["JavaThread::thread_from_jni_environment"]=Xl(t)),t}function Ql(n){let e=new Ce(n),t;return e.perform(()=>{let r=e.tryGetEnvHandle(St.v1_0);if(r===null)throw new Error("JVMTI not available");t=new xe(r,e);let o=Memory.alloc(8);o.writeU64(wt.canTagObjects);let i=t.addCapabilities(o);ue("getEnvJvmti::AddCapabilities",i)}),t}var Yl={x64:ed};function Xl(n){let e=null,t=Yl[Process.arch];if(t!==void 0){let o=new Ce(n).perform(i=>i.handle.readPointer().add(6*V).readPointer());e=ke(o,t,{limit:11})}return e===null?()=>{throw new Error("Unable to make thread_from_jni_environment() helper for the current architecture")}:r=>r.add(e)}function ed(n){if(n.mnemonic!=="lea")return null;let{base:e,disp:t}=n.operands[1].value;return e==="rdi"&&t<0?t:null}function To(n,e){}var sr=class{constructor(e){this.methodId=e,this.method=e.readPointer(),this.originalMethod=null,this.newMethod=null,this.resolved=null,this.impl=null,this.key=e.toString(16)}replace(e,t,r,o,i){let{key:s}=this,c=ft.get(s);c!==void 0&&(ft.delete(s),this.method=c.method,this.originalMethod=c.originalMethod,this.newMethod=c.newMethod,this.resolved=c.resolved),this.impl=e,zt.set(s,this),Io(o)}revert(e){let{key:t}=this;zt.delete(t),ft.set(t,this),Io(e)}resolveTarget(e,t,r,o){let{resolved:i,originalMethod:s,methodId:c}=this;if(i!==null)return i;if(s===null)return c;s.oldMethod.vtableIndexPtr.writeS32(-2);let l=Memory.alloc(V);return l.writePointer(this.method),this.resolved=l,l}};function Io(n){ir||(ir=!0,Script.nextTick(td,n))}function td(n){let e=new Map(zt),t=new Map(ft);zt.clear(),ft.clear(),ir=!1,n.perform(r=>{let o=Le(),i=o["JavaThread::thread_from_jni_environment"](r.handle),s=!1;xo(()=>{e.forEach(c=>{let{method:a,originalMethod:l,impl:d,methodId:p,newMethod:f}=c;l===null?(c.originalMethod=No(a),c.newMethod=od(a,d,i),Co(c.newMethod,p,i)):o["Method::set_native_function"](f.method,d,0)}),t.forEach(c=>{let{originalMethod:a,methodId:l,newMethod:d}=c;if(a!==null){id(a);let p=a.oldMethod;p.oldMethod=d,Co(p,l,i),s=!0}})}),s&&nd(r.handle)})}function nd(n){let{fractions:e,shouldSweep:t,traversals:r,"NMethodSweeper::sweep_code_cache":o,"NMethodSweeper::sweep_in_progress":i,"NMethodSweeper::force_sweep":s,JVM_Sleep:c}=Le();if(s!==void 0)Thread.sleep(.05),s(),Thread.sleep(.05),s();else{let a=r.readS64(),l=a+2;for(;l>a;)e.writeS32(1),c(n,NULL,50),i()||xo(()=>{Thread.sleep(.05)}),t.readU8()===0&&(e.writeS32(1),o()),a=r.readS64()}}function xo(n,e,t){let{execute:r,vtable:o,vtableSize:i,doItOffset:s,prologueOffset:c,epilogueOffset:a}=Kl(),l=Memory.dup(o,i),d=Memory.alloc(V*25);d.writePointer(l);let p=new NativeCallback(n,"void",["pointer"]);l.add(s).writePointer(p);let f=null;e!==void 0&&(f=new NativeCallback(e,"int",["pointer"]),l.add(c).writePointer(f));let u=null;t!==void 0&&(u=new NativeCallback(t,"void",["pointer"]),l.add(a).writePointer(u)),r(d)}function rd(){let{vtableRedefineClasses:n,redefineClassesDoIt:e,redefineClassesDoItPrologue:t,redefineClassesDoItEpilogue:r,redefineClassesOnError:o,redefineClassesAllow:i,redefineClassesDispose0:s,redefineClassesDispose1:c,"VMThread::execute":a}=Le(),l=n.add(2*V),d=15*V,p=Memory.dup(l,d),f=new NativeCallback(()=>{},"void",["pointer"]),u,_,h;for(let g=0;g!==d;g+=V){let y=p.add(g),E=y.readPointer();o!==void 0&&E.equals(o)||s!==void 0&&E.equals(s)||c!==void 0&&E.equals(c)?y.writePointer(f):E.equals(e)?u=g:E.equals(t)?(_=g,y.writePointer(i)):E.equals(r)&&(h=g,y.writePointer(f))}return{execute:a,emptyCallback:f,vtable:p,vtableSize:d,doItOffset:u,prologueOffset:_,epilogueOffset:h}}function ko(n){return new sr(n)}function Co(n,e,t){let{method:r,oldMethod:o}=n,i=Le();n.methodsArray.add(n.methodIndex*V).writePointer(r),n.vtableIndex>=0&&n.vtable.add(n.vtableIndex*V).writePointer(r),e.writePointer(r),o.accessFlagsPtr.writeU32((o.accessFlags|Jl|Gl)>>>0);let s=i["OopMapCache::flush_obsolete_entries"];if(s!==void 0){let{oopMapCache:_}=n;_.isNull()||s(_)}let c=i["VM_RedefineClasses::mark_dependent_code"],a=i["VM_RedefineClasses::flush_dependent_code"];c!==void 0?(c(NULL,n.instanceKlass),a()):a(NULL,n.instanceKlass,t);let l=Memory.alloc(1);l.writeU8(1),i["ConstantPoolCache::adjust_method_entries"](n.cache,n.instanceKlass,l);let d=Memory.alloc(3*V),p=Memory.alloc(V);p.writePointer(i.doKlass),d.writePointer(p),d.add(V).writePointer(t),d.add(2*V).writePointer(t),i.redefineClass!==void 0&&i.redefineClass.writePointer(n.instanceKlass),i["ClassLoaderDataGraph::classes_do"](d);let f=i["ResolvedMethodTable::adjust_method_entries"];if(f!==void 0)f(l);else{let{memberNames:_}=n;if(!_.isNull()){let h=i["MemberNameTable::adjust_method_entries"];h!==void 0&&h(_,n.instanceKlass,l)}}let u=i["ClassLoaderDataGraph::clean_deallocate_lists"];u!==void 0&&u(0)}function od(n,e,t){let r=Le(),o=No(n);o.constPtr.writePointer(o.const);let i=(o.accessFlags|Vl|$l|Hl|Zl)>>>0;if(o.accessFlagsPtr.writeU32(i),o.signatureHandler.writePointer(NULL),o.adapter.writePointer(NULL),o.i2iEntry.writePointer(NULL),r["Method::clear_code"](o.method),o.dataPtr.writePointer(NULL),o.countersPtr.writePointer(NULL),o.stackmapPtr.writePointer(NULL),r["Method::clear_native_function"](o.method),r["Method::set_native_function"](o.method,e,0),r["Method::restore_unshareable_info"](o.method,t),r.version>=17){let s=Memory.alloc(2*V);s.writePointer(o.method),s.add(V).writePointer(t),r["Method::link_method"](o.method,s,t)}return o}function No(n){let e=Ao(),t=n.add(e.method.constMethodOffset).readPointer(),r=t.add(e.constMethod.sizeOffset).readS32()*V,o=Memory.alloc(r+e.method.size);Memory.copy(o,t,r);let i=o.add(r);Memory.copy(i,n,e.method.size);let s=Lo(i,o,r),c=Lo(n,t,r);return s.oldMethod=c,s}function Lo(n,e,t){let r=Le(),o=Ao(),i=n.add(o.method.constMethodOffset),s=n.add(o.method.methodDataOffset),c=n.add(o.method.methodCountersOffset),a=n.add(o.method.accessFlagsOffset),l=a.readU32(),d=o.getAdapterPointer(n,e),p=n.add(o.method.i2iEntryOffset),f=n.add(o.method.signatureHandlerOffset),u=e.add(o.constMethod.constantPoolOffset).readPointer(),_=e.add(o.constMethod.stackmapDataOffset),h=u.add(o.constantPool.instanceKlassOffset).readPointer(),g=u.add(o.constantPool.cacheOffset).readPointer(),y=ql(),E=h.add(y.methodsOffset).readPointer(),C=E.readS32(),A=E.add(V),M=e.add(o.constMethod.methodIdnumOffset).readU16(),O=n.add(o.method.vtableIndexOffset),N=O.readS32(),k=h.add(y.vtableOffset),S=h.add(y.oopMapCacheOffset).readPointer(),T=r.version>=10?h.add(y.memberNamesOffset).readPointer():NULL;return{method:n,methodSize:o.method.size,const:e,constSize:t,constPtr:i,dataPtr:s,countersPtr:c,stackmapPtr:_,instanceKlass:h,methodsArray:A,methodsCount:C,methodIndex:M,vtableIndex:N,vtableIndexPtr:O,vtable:k,accessFlags:l,accessFlagsPtr:a,adapter:d,i2iEntry:p,signatureHandler:f,memberNames:T,cache:g,oopMapCache:S}}function id(n){let{oldMethod:e}=n;e.accessFlagsPtr.writeU32(e.accessFlags),e.vtableIndexPtr.writeS32(e.vtableIndex)}function sd(){let n=Le(),{version:e}=n,t;e>=17?t="method:early":e>=9&&e<=16?t="const-method":t="method:late";let o=n["Method::size"](1)*V,i=V,s=2*V,c=3*V,a=4*V,l=t==="method:early"?V:0,d=a+l,p=d+4,f=p+4+8,u=f+V,_=l!==0?a:u,h=o-2*V,g=o-V,y=8,E=y+V,C=E+V,A=t==="const-method"?V:0,M=C+A,O=M+14,N=2*V,k=3*V;return{getAdapterPointer:A!==0?function(T,R){return R.add(C)}:function(T,R){return T.add(_)},method:{size:o,constMethodOffset:i,methodDataOffset:s,methodCountersOffset:c,accessFlagsOffset:d,vtableIndexOffset:p,i2iEntryOffset:f,nativeFunctionOffset:h,signatureHandlerOffset:g},constMethod:{constantPoolOffset:y,stackmapDataOffset:E,sizeOffset:M,methodIdnumOffset:O},constantPool:{cacheOffset:N,instanceKlassOffset:k}}}var ad={x64:ld};function cd(){let{version:n,createNewDefaultVtableIndices:e}=Le(),t=ad[Process.arch];if(t===void 0)throw new Error(`Missing vtable offset parser for ${Process.arch}`);let r=ke(e,t,{limit:32});if(r===null)throw new Error("Unable to deduce vtable offset");let o=n>=10&&n<=11||n>=15?17:18,i=r-7*V,s=r-17*V,c=r-o*V;return{vtableOffset:r,methodsOffset:i,memberNamesOffset:s,oopMapCacheOffset:c}}function ld(n){if(n.mnemonic!=="mov")return null;let e=n.operands[0];if(e.type!=="mem")return null;let{value:t}=e;if(t.scale!==1)return null;let{disp:r}=t;return r<256?null:r+16}var Mo=J;try{pt()}catch{Mo=Le}var ht=Mo;var dd=`#include <json-glib/json-glib.h>
#include <string.h>

#define kAccStatic 0x0008
#define kAccConstructor 0x00010000

typedef struct _Model Model;
typedef struct _EnumerateMethodsContext EnumerateMethodsContext;

typedef struct _JavaApi JavaApi;
typedef struct _JavaClassApi JavaClassApi;
typedef struct _JavaMethodApi JavaMethodApi;
typedef struct _JavaFieldApi JavaFieldApi;

typedef struct _JNIEnv JNIEnv;
typedef guint8 jboolean;
typedef gint32 jint;
typedef jint jsize;
typedef gpointer jobject;
typedef jobject jclass;
typedef jobject jstring;
typedef jobject jarray;
typedef jarray jobjectArray;
typedef gpointer jfieldID;
typedef gpointer jmethodID;

typedef struct _jvmtiEnv jvmtiEnv;
typedef enum
{
  JVMTI_ERROR_NONE = 0
} jvmtiError;

typedef struct _ArtApi ArtApi;
typedef guint32 ArtHeapReference;
typedef struct _ArtObject ArtObject;
typedef struct _ArtClass ArtClass;
typedef struct _ArtClassLinker ArtClassLinker;
typedef struct _ArtClassVisitor ArtClassVisitor;
typedef struct _ArtClassVisitorVTable ArtClassVisitorVTable;
typedef struct _ArtMethod ArtMethod;
typedef struct _ArtString ArtString;

typedef union _StdString StdString;
typedef struct _StdStringShort StdStringShort;
typedef struct _StdStringLong StdStringLong;

typedef void (* ArtVisitClassesFunc) (ArtClassLinker * linker, ArtClassVisitor * visitor);
typedef const char * (* ArtGetClassDescriptorFunc) (ArtClass * klass, StdString * storage);
typedef void (* ArtPrettyMethodFunc) (StdString * result, ArtMethod * method, jboolean with_signature);

struct _Model
{
  GHashTable * members;
};

struct _EnumerateMethodsContext
{
  GPatternSpec * class_query;
  GPatternSpec * method_query;
  jboolean include_signature;
  jboolean ignore_case;
  jboolean skip_system_classes;
  GHashTable * groups;
};

struct _JavaClassApi
{
  jmethodID get_declared_methods;
  jmethodID get_declared_fields;
};

struct _JavaMethodApi
{
  jmethodID get_name;
  jmethodID get_modifiers;
};

struct _JavaFieldApi
{
  jmethodID get_name;
  jmethodID get_modifiers;
};

struct _JavaApi
{
  jvmtiEnv * jvmti;
  JavaClassApi clazz;
  JavaMethodApi method;
  JavaFieldApi field;
};

struct _JNIEnv
{
  gpointer * functions;
};

struct _jvmtiEnv
{
  gpointer * functions;
};

struct _ArtApi
{
  gboolean available;

  guint class_offset_ifields;
  guint class_offset_methods;
  guint class_offset_sfields;
  guint class_offset_copied_methods_offset;

  guint method_size;
  guint method_offset_access_flags;

  guint field_size;
  guint field_offset_access_flags;

  guint alignment_padding;

  ArtClassLinker * linker;
  ArtVisitClassesFunc visit_classes;
  ArtGetClassDescriptorFunc get_class_descriptor;
  ArtPrettyMethodFunc pretty_method;

  void (* free) (gpointer mem);
};

struct _ArtObject
{
  ArtHeapReference klass;
  ArtHeapReference monitor;
};

struct _ArtClass
{
  ArtObject parent;

  ArtHeapReference class_loader;
};

struct _ArtClassVisitor
{
  ArtClassVisitorVTable * vtable;
  gpointer user_data;
};

struct _ArtClassVisitorVTable
{
  void (* reserved1) (ArtClassVisitor * self);
  void (* reserved2) (ArtClassVisitor * self);
  jboolean (* visit) (ArtClassVisitor * self, ArtClass * klass);
};

struct _ArtString
{
  ArtObject parent;

  gint32 count;
  guint32 hash_code;

  union
  {
    guint16 value[0];
    guint8 value_compressed[0];
  };
};

struct _StdStringShort
{
  guint8 size;
  gchar data[(3 * sizeof (gpointer)) - sizeof (guint8)];
};

struct _StdStringLong
{
  gsize capacity;
  gsize size;
  gchar * data;
};

union _StdString
{
  StdStringShort s;
  StdStringLong l;
};

static void model_add_method (Model * self, const gchar * name, jmethodID id, jint modifiers);
static void model_add_field (Model * self, const gchar * name, jfieldID id, jint modifiers);
static void model_free (Model * model);

static jboolean collect_matching_class_methods (ArtClassVisitor * self, ArtClass * klass);
static gchar * finalize_method_groups_to_json (GHashTable * groups);
static GPatternSpec * make_pattern_spec (const gchar * pattern, jboolean ignore_case);
static gchar * class_name_from_signature (const gchar * signature);
static gchar * format_method_signature (const gchar * name, const gchar * signature);
static void append_type (GString * output, const gchar ** type);

static gpointer read_art_array (gpointer object_base, guint field_offset, guint length_size, guint * length);

static void std_string_destroy (StdString * str);
static gchar * std_string_c_str (StdString * self);

extern GMutex lock;
extern GArray * models;
extern JavaApi java_api;
extern ArtApi art_api;

void
init (void)
{
  g_mutex_init (&lock);
  models = g_array_new (FALSE, FALSE, sizeof (Model *));
}

void
finalize (void)
{
  guint n, i;

  n = models->len;
  for (i = 0; i != n; i++)
  {
    Model * model = g_array_index (models, Model *, i);
    model_free (model);
  }

  g_array_unref (models);
  g_mutex_clear (&lock);
}

Model *
model_new (jclass class_handle,
           gpointer class_object,
           JNIEnv * env)
{
  Model * model;
  GHashTable * members;
  jvmtiEnv * jvmti = java_api.jvmti;
  gpointer * funcs = env->functions;
  jmethodID (* from_reflected_method) (JNIEnv *, jobject) = funcs[7];
  jfieldID (* from_reflected_field) (JNIEnv *, jobject) = funcs[8];
  jobject (* to_reflected_method) (JNIEnv *, jclass, jmethodID, jboolean) = funcs[9];
  jobject (* to_reflected_field) (JNIEnv *, jclass, jfieldID, jboolean) = funcs[12];
  void (* delete_local_ref) (JNIEnv *, jobject) = funcs[23];
  jobject (* call_object_method) (JNIEnv *, jobject, jmethodID, ...) = funcs[34];
  jint (* call_int_method) (JNIEnv *, jobject, jmethodID, ...) = funcs[49];
  const char * (* get_string_utf_chars) (JNIEnv *, jstring, jboolean *) = funcs[169];
  void (* release_string_utf_chars) (JNIEnv *, jstring, const char *) = funcs[170];
  jsize (* get_array_length) (JNIEnv *, jarray) = funcs[171];
  jobject (* get_object_array_element) (JNIEnv *, jobjectArray, jsize) = funcs[173];
  jsize n, i;

  model = g_new (Model, 1);

  members = g_hash_table_new_full (g_str_hash, g_str_equal, g_free, g_free);
  model->members = members;

  if (jvmti != NULL)
  {
    gpointer * jf = jvmti->functions - 1;
    jvmtiError (* deallocate) (jvmtiEnv *, void * mem) = jf[47];
    jvmtiError (* get_class_methods) (jvmtiEnv *, jclass, jint *, jmethodID **) = jf[52];
    jvmtiError (* get_class_fields) (jvmtiEnv *, jclass, jint *, jfieldID **) = jf[53];
    jvmtiError (* get_field_name) (jvmtiEnv *, jclass, jfieldID, char **, char **, char **) = jf[60];
    jvmtiError (* get_field_modifiers) (jvmtiEnv *, jclass, jfieldID, jint *) = jf[62];
    jvmtiError (* get_method_name) (jvmtiEnv *, jmethodID, char **, char **, char **) = jf[64];
    jvmtiError (* get_method_modifiers) (jvmtiEnv *, jmethodID, jint *) = jf[66];
    jint method_count;
    jmethodID * methods;
    jint field_count;
    jfieldID * fields;
    char * name;
    jint modifiers;

    get_class_methods (jvmti, class_handle, &method_count, &methods);
    for (i = 0; i != method_count; i++)
    {
      jmethodID method = methods[i];

      get_method_name (jvmti, method, &name, NULL, NULL);
      get_method_modifiers (jvmti, method, &modifiers);

      model_add_method (model, name, method, modifiers);

      deallocate (jvmti, name);
    }
    deallocate (jvmti, methods);

    get_class_fields (jvmti, class_handle, &field_count, &fields);
    for (i = 0; i != field_count; i++)
    {
      jfieldID field = fields[i];

      get_field_name (jvmti, class_handle, field, &name, NULL, NULL);
      get_field_modifiers (jvmti, class_handle, field, &modifiers);

      model_add_field (model, name, field, modifiers);

      deallocate (jvmti, name);
    }
    deallocate (jvmti, fields);
  }
  else if (art_api.available)
  {
    gpointer elements;
    guint n, i;
    const guint field_arrays[] = {
      art_api.class_offset_ifields,
      art_api.class_offset_sfields
    };
    guint field_array_cursor;
    gboolean merged_fields = art_api.class_offset_sfields == 0;

    elements = read_art_array (class_object, art_api.class_offset_methods, sizeof (gsize), NULL);
    n = *(guint16 *) (class_object + art_api.class_offset_copied_methods_offset);
    for (i = 0; i != n; i++)
    {
      jmethodID id;
      guint32 access_flags;
      jboolean is_static;
      jobject method, name;
      const char * name_str;
      jint modifiers;

      id = elements + (i * art_api.method_size);

      access_flags = *(guint32 *) (id + art_api.method_offset_access_flags);
      if ((access_flags & kAccConstructor) != 0)
        continue;
      is_static = (access_flags & kAccStatic) != 0;
      method = to_reflected_method (env, class_handle, id, is_static);
      name = call_object_method (env, method, java_api.method.get_name);
      name_str = get_string_utf_chars (env, name, NULL);
      modifiers = access_flags & 0xffff;

      model_add_method (model, name_str, id, modifiers);

      release_string_utf_chars (env, name, name_str);
      delete_local_ref (env, name);
      delete_local_ref (env, method);
    }

    for (field_array_cursor = 0; field_array_cursor != G_N_ELEMENTS (field_arrays); field_array_cursor++)
    {
      jboolean is_static;

      if (field_arrays[field_array_cursor] == 0)
        continue;

      if (!merged_fields)
        is_static = field_array_cursor == 1;

      elements = read_art_array (class_object, field_arrays[field_array_cursor], sizeof (guint32), &n);
      for (i = 0; i != n; i++)
      {
        jfieldID id;
        guint32 access_flags;
        jobject field, name;
        const char * name_str;
        jint modifiers;

        id = elements + (i * art_api.field_size);

        access_flags = *(guint32 *) (id + art_api.field_offset_access_flags);
        if (merged_fields)
          is_static = (access_flags & kAccStatic) != 0;
        field = to_reflected_field (env, class_handle, id, is_static);
        name = call_object_method (env, field, java_api.field.get_name);
        name_str = get_string_utf_chars (env, name, NULL);
        modifiers = access_flags & 0xffff;

        model_add_field (model, name_str, id, modifiers);

        release_string_utf_chars (env, name, name_str);
        delete_local_ref (env, name);
        delete_local_ref (env, field);
      }
    }
  }
  else
  {
    jobject elements;

    elements = call_object_method (env, class_handle, java_api.clazz.get_declared_methods);
    n = get_array_length (env, elements);
    for (i = 0; i != n; i++)
    {
      jobject method, name;
      const char * name_str;
      jmethodID id;
      jint modifiers;

      method = get_object_array_element (env, elements, i);
      name = call_object_method (env, method, java_api.method.get_name);
      name_str = get_string_utf_chars (env, name, NULL);
      id = from_reflected_method (env, method);
      modifiers = call_int_method (env, method, java_api.method.get_modifiers);

      model_add_method (model, name_str, id, modifiers);

      release_string_utf_chars (env, name, name_str);
      delete_local_ref (env, name);
      delete_local_ref (env, method);
    }
    delete_local_ref (env, elements);

    elements = call_object_method (env, class_handle, java_api.clazz.get_declared_fields);
    n = get_array_length (env, elements);
    for (i = 0; i != n; i++)
    {
      jobject field, name;
      const char * name_str;
      jfieldID id;
      jint modifiers;

      field = get_object_array_element (env, elements, i);
      name = call_object_method (env, field, java_api.field.get_name);
      name_str = get_string_utf_chars (env, name, NULL);
      id = from_reflected_field (env, field);
      modifiers = call_int_method (env, field, java_api.field.get_modifiers);

      model_add_field (model, name_str, id, modifiers);

      release_string_utf_chars (env, name, name_str);
      delete_local_ref (env, name);
      delete_local_ref (env, field);
    }
    delete_local_ref (env, elements);
  }

  g_mutex_lock (&lock);
  g_array_append_val (models, model);
  g_mutex_unlock (&lock);

  return model;
}

static void
model_add_method (Model * self,
                  const gchar * name,
                  jmethodID id,
                  jint modifiers)
{
  GHashTable * members = self->members;
  gchar * key, type;
  const gchar * value;

  if (name[0] == '$')
    key = g_strdup_printf ("_%s", name);
  else
    key = g_strdup (name);

  type = (modifiers & kAccStatic) != 0 ? 's' : 'i';

  value = g_hash_table_lookup (members, key);
  if (value == NULL)
    g_hash_table_insert (members, key, g_strdup_printf ("m:%c0x%zx", type, id));
  else
    g_hash_table_insert (members, key, g_strdup_printf ("%s:%c0x%zx", value, type, id));
}

static void
model_add_field (Model * self,
                 const gchar * name,
                 jfieldID id,
                 jint modifiers)
{
  GHashTable * members = self->members;
  gchar * key, type;

  if (name[0] == '$')
    key = g_strdup_printf ("_%s", name);
  else
    key = g_strdup (name);
  while (g_hash_table_contains (members, key))
  {
    gchar * new_key = g_strdup_printf ("_%s", key);
    g_free (key);
    key = new_key;
  }

  type = (modifiers & kAccStatic) != 0 ? 's' : 'i';

  g_hash_table_insert (members, key, g_strdup_printf ("f:%c0x%zx", type, id));
}

static void
model_free (Model * model)
{
  g_hash_table_unref (model->members);

  g_free (model);
}

gboolean
model_has (Model * self,
           const gchar * member)
{
  return g_hash_table_contains (self->members, member);
}

const gchar *
model_find (Model * self,
            const gchar * member)
{
  return g_hash_table_lookup (self->members, member);
}

gchar *
model_list (Model * self)
{
  GString * result;
  GHashTableIter iter;
  guint i;
  const gchar * name;

  result = g_string_sized_new (128);

  g_string_append_c (result, '[');

  g_hash_table_iter_init (&iter, self->members);
  for (i = 0; g_hash_table_iter_next (&iter, (gpointer *) &name, NULL); i++)
  {
    if (i > 0)
      g_string_append_c (result, ',');

    g_string_append_c (result, '"');
    g_string_append (result, name);
    g_string_append_c (result, '"');
  }

  g_string_append_c (result, ']');

  return g_string_free (result, FALSE);
}

gchar *
enumerate_methods_art (const gchar * class_query,
                       const gchar * method_query,
                       jboolean include_signature,
                       jboolean ignore_case,
                       jboolean skip_system_classes)
{
  gchar * result;
  EnumerateMethodsContext ctx;
  ArtClassVisitor visitor;
  ArtClassVisitorVTable visitor_vtable = { NULL, };

  ctx.class_query = make_pattern_spec (class_query, ignore_case);
  ctx.method_query = make_pattern_spec (method_query, ignore_case);
  ctx.include_signature = include_signature;
  ctx.ignore_case = ignore_case;
  ctx.skip_system_classes = skip_system_classes;
  ctx.groups = g_hash_table_new_full (NULL, NULL, NULL, NULL);

  visitor.vtable = &visitor_vtable;
  visitor.user_data = &ctx;

  visitor_vtable.visit = collect_matching_class_methods;

  art_api.visit_classes (art_api.linker, &visitor);

  result = finalize_method_groups_to_json (ctx.groups);

  g_hash_table_unref (ctx.groups);
  g_pattern_spec_free (ctx.method_query);
  g_pattern_spec_free (ctx.class_query);

  return result;
}

static jboolean
collect_matching_class_methods (ArtClassVisitor * self,
                                ArtClass * klass)
{
  EnumerateMethodsContext * ctx = self->user_data;
  const char * descriptor;
  StdString descriptor_storage = { 0, };
  gchar * class_name = NULL;
  gchar * class_name_copy = NULL;
  const gchar * normalized_class_name;
  JsonBuilder * group;
  size_t class_name_length;
  GHashTable * seen_method_names;
  gpointer elements;
  guint n, i;

  if (ctx->skip_system_classes && klass->class_loader == 0)
    goto skip_class;

  descriptor = art_api.get_class_descriptor (klass, &descriptor_storage);
  if (descriptor[0] != 'L')
    goto skip_class;

  class_name = class_name_from_signature (descriptor);

  if (ctx->ignore_case)
  {
    class_name_copy = g_utf8_strdown (class_name, -1);
    normalized_class_name = class_name_copy;
  }
  else
  {
    normalized_class_name = class_name;
  }

  if (!g_pattern_match_string (ctx->class_query, normalized_class_name))
    goto skip_class;

  group = NULL;
  class_name_length = strlen (class_name);
  seen_method_names = ctx->include_signature ? NULL : g_hash_table_new_full (g_str_hash, g_str_equal, g_free, NULL);

  elements = read_art_array (klass, art_api.class_offset_methods, sizeof (gsize), NULL);
  n = *(guint16 *) ((gpointer) klass + art_api.class_offset_copied_methods_offset);
  for (i = 0; i != n; i++)
  {
    ArtMethod * method;
    guint32 access_flags;
    jboolean is_constructor;
    StdString method_name = { 0, };
    const gchar * bare_method_name;
    gchar * bare_method_name_copy = NULL;
    const gchar * normalized_method_name;
    gchar * normalized_method_name_copy = NULL;

    method = elements + (i * art_api.method_size);

    access_flags = *(guint32 *) ((gpointer) method + art_api.method_offset_access_flags);
    is_constructor = (access_flags & kAccConstructor) != 0;

    art_api.pretty_method (&method_name, method, ctx->include_signature);
    bare_method_name = std_string_c_str (&method_name);
    if (ctx->include_signature)
    {
      const gchar * return_type_end, * name_begin;
      GString * name;

      return_type_end = strchr (bare_method_name, ' ');
      name_begin = return_type_end + 1 + class_name_length + 1;
      if (is_constructor && g_str_has_prefix (name_begin, "<clinit>"))
        goto skip_method;

      name = g_string_sized_new (64);

      if (is_constructor)
      {
        g_string_append (name, "$init");
        g_string_append (name, strchr (name_begin, '>') + 1);
      }
      else
      {
        g_string_append (name, name_begin);
      }
      g_string_append (name, ": ");
      g_string_append_len (name, bare_method_name, return_type_end - bare_method_name);

      bare_method_name_copy = g_string_free (name, FALSE);
      bare_method_name = bare_method_name_copy;
    }
    else
    {
      const gchar * name_begin;

      name_begin = bare_method_name + class_name_length + 1;
      if (is_constructor && strcmp (name_begin, "<clinit>") == 0)
        goto skip_method;

      if (is_constructor)
        bare_method_name = "$init";
      else
        bare_method_name += class_name_length + 1;
    }

    if (seen_method_names != NULL && g_hash_table_contains (seen_method_names, bare_method_name))
      goto skip_method;

    if (ctx->ignore_case)
    {
      normalized_method_name_copy = g_utf8_strdown (bare_method_name, -1);
      normalized_method_name = normalized_method_name_copy;
    }
    else
    {
      normalized_method_name = bare_method_name;
    }

    if (!g_pattern_match_string (ctx->method_query, normalized_method_name))
      goto skip_method;

    if (group == NULL)
    {
      group = g_hash_table_lookup (ctx->groups, GUINT_TO_POINTER (klass->class_loader));
      if (group == NULL)
      {
        group = json_builder_new_immutable ();
        g_hash_table_insert (ctx->groups, GUINT_TO_POINTER (klass->class_loader), group);

        json_builder_begin_object (group);

        json_builder_set_member_name (group, "loader");
        json_builder_add_int_value (group, klass->class_loader);

        json_builder_set_member_name (group, "classes");
        json_builder_begin_array (group);
      }

      json_builder_begin_object (group);

      json_builder_set_member_name (group, "name");
      json_builder_add_string_value (group, class_name);

      json_builder_set_member_name (group, "methods");
      json_builder_begin_array (group);
    }

    json_builder_add_string_value (group, bare_method_name);

    if (seen_method_names != NULL)
      g_hash_table_add (seen_method_names, g_strdup (bare_method_name));

skip_method:
    g_free (normalized_method_name_copy);
    g_free (bare_method_name_copy);
    std_string_destroy (&method_name);
  }

  if (seen_method_names != NULL)
    g_hash_table_unref (seen_method_names);

  if (group == NULL)
    goto skip_class;

  json_builder_end_array (group);
  json_builder_end_object (group);

skip_class:
  g_free (class_name_copy);
  g_free (class_name);
  std_string_destroy (&descriptor_storage);

  return TRUE;
}

gchar *
enumerate_methods_jvm (const gchar * class_query,
                       const gchar * method_query,
                       jboolean include_signature,
                       jboolean ignore_case,
                       jboolean skip_system_classes,
                       JNIEnv * env)
{
  gchar * result;
  GPatternSpec * class_pattern, * method_pattern;
  GHashTable * groups;
  gpointer * ef = env->functions;
  jobject (* new_global_ref) (JNIEnv *, jobject) = ef[21];
  void (* delete_local_ref) (JNIEnv *, jobject) = ef[23];
  jboolean (* is_same_object) (JNIEnv *, jobject, jobject) = ef[24];
  jvmtiEnv * jvmti = java_api.jvmti;
  gpointer * jf = jvmti->functions - 1;
  jvmtiError (* deallocate) (jvmtiEnv *, void * mem) = jf[47];
  jvmtiError (* get_class_signature) (jvmtiEnv *, jclass, char **, char **) = jf[48];
  jvmtiError (* get_class_methods) (jvmtiEnv *, jclass, jint *, jmethodID **) = jf[52];
  jvmtiError (* get_class_loader) (jvmtiEnv *, jclass, jobject *) = jf[57];
  jvmtiError (* get_method_name) (jvmtiEnv *, jmethodID, char **, char **, char **) = jf[64];
  jvmtiError (* get_loaded_classes) (jvmtiEnv *, jint *, jclass **) = jf[78];
  jint class_count, class_index;
  jclass * classes;

  class_pattern = make_pattern_spec (class_query, ignore_case);
  method_pattern = make_pattern_spec (method_query, ignore_case);
  groups = g_hash_table_new_full (NULL, NULL, NULL, NULL);

  if (get_loaded_classes (jvmti, &class_count, &classes) != JVMTI_ERROR_NONE)
    goto emit_results;

  for (class_index = 0; class_index != class_count; class_index++)
  {
    jclass klass = classes[class_index];
    jobject loader = NULL;
    gboolean have_loader = FALSE;
    char * signature = NULL;
    gchar * class_name = NULL;
    gchar * class_name_copy = NULL;
    const gchar * normalized_class_name;
    jint method_count, method_index;
    jmethodID * methods = NULL;
    JsonBuilder * group = NULL;
    GHashTable * seen_method_names = NULL;

    if (skip_system_classes)
    {
      if (get_class_loader (jvmti, klass, &loader) != JVMTI_ERROR_NONE)
        goto skip_class;
      have_loader = TRUE;

      if (loader == NULL)
        goto skip_class;
    }

    if (get_class_signature (jvmti, klass, &signature, NULL) != JVMTI_ERROR_NONE)
      goto skip_class;

    class_name = class_name_from_signature (signature);

    if (ignore_case)
    {
      class_name_copy = g_utf8_strdown (class_name, -1);
      normalized_class_name = class_name_copy;
    }
    else
    {
      normalized_class_name = class_name;
    }

    if (!g_pattern_match_string (class_pattern, normalized_class_name))
      goto skip_class;

    if (get_class_methods (jvmti, klass, &method_count, &methods) != JVMTI_ERROR_NONE)
      goto skip_class;

    if (!include_signature)
      seen_method_names = g_hash_table_new_full (g_str_hash, g_str_equal, g_free, NULL);

    for (method_index = 0; method_index != method_count; method_index++)
    {
      jmethodID method = methods[method_index];
      const gchar * method_name;
      char * method_name_value = NULL;
      char * method_signature_value = NULL;
      gchar * method_name_copy = NULL;
      const gchar * normalized_method_name;
      gchar * normalized_method_name_copy = NULL;

      if (get_method_name (jvmti, method, &method_name_value, include_signature ? &method_signature_value : NULL, NULL) != JVMTI_ERROR_NONE)
        goto skip_method;
      method_name = method_name_value;

      if (method_name[0] == '<')
      {
        if (strcmp (method_name, "<init>") == 0)
          method_name = "$init";
        else if (strcmp (method_name, "<clinit>") == 0)
          goto skip_method;
      }

      if (include_signature)
      {
        method_name_copy = format_method_signature (method_name, method_signature_value);
        method_name = method_name_copy;
      }

      if (seen_method_names != NULL && g_hash_table_contains (seen_method_names, method_name))
        goto skip_method;

      if (ignore_case)
      {
        normalized_method_name_copy = g_utf8_strdown (method_name, -1);
        normalized_method_name = normalized_method_name_copy;
      }
      else
      {
        normalized_method_name = method_name;
      }

      if (!g_pattern_match_string (method_pattern, normalized_method_name))
        goto skip_method;

      if (group == NULL)
      {
        if (!have_loader && get_class_loader (jvmti, klass, &loader) != JVMTI_ERROR_NONE)
          goto skip_method;

        if (loader == NULL)
        {
          group = g_hash_table_lookup (groups, NULL);
        }
        else
        {
          GHashTableIter iter;
          jobject cur_loader;
          JsonBuilder * cur_group;

          g_hash_table_iter_init (&iter, groups);
          while (g_hash_table_iter_next (&iter, (gpointer *) &cur_loader, (gpointer *) &cur_group))
          {
            if (cur_loader != NULL && is_same_object (env, cur_loader, loader))
            {
              group = cur_group;
              break;
            }
          }
        }

        if (group == NULL)
        {
          jobject l;
          gchar * str;

          l = (loader != NULL) ? new_global_ref (env, loader) : NULL;

          group = json_builder_new_immutable ();
          g_hash_table_insert (groups, l, group);

          json_builder_begin_object (group);

          json_builder_set_member_name (group, "loader");
          str = g_strdup_printf ("0x%" G_GSIZE_MODIFIER "x", GPOINTER_TO_SIZE (l));
          json_builder_add_string_value (group, str);
          g_free (str);

          json_builder_set_member_name (group, "classes");
          json_builder_begin_array (group);
        }

        json_builder_begin_object (group);

        json_builder_set_member_name (group, "name");
        json_builder_add_string_value (group, class_name);

        json_builder_set_member_name (group, "methods");
        json_builder_begin_array (group);
      }

      json_builder_add_string_value (group, method_name);

      if (seen_method_names != NULL)
        g_hash_table_add (seen_method_names, g_strdup (method_name));

skip_method:
      g_free (normalized_method_name_copy);
      g_free (method_name_copy);
      deallocate (jvmti, method_signature_value);
      deallocate (jvmti, method_name_value);
    }

skip_class:
    if (group != NULL)
    {
      json_builder_end_array (group);
      json_builder_end_object (group);
    }

    if (seen_method_names != NULL)
      g_hash_table_unref (seen_method_names);

    deallocate (jvmti, methods);

    g_free (class_name_copy);
    g_free (class_name);
    deallocate (jvmti, signature);

    if (loader != NULL)
      delete_local_ref (env, loader);

    delete_local_ref (env, klass);
  }

  deallocate (jvmti, classes);

emit_results:
  result = finalize_method_groups_to_json (groups);

  g_hash_table_unref (groups);
  g_pattern_spec_free (method_pattern);
  g_pattern_spec_free (class_pattern);

  return result;
}

static gchar *
finalize_method_groups_to_json (GHashTable * groups)
{
  GString * result;
  GHashTableIter iter;
  guint i;
  JsonBuilder * group;

  result = g_string_sized_new (1024);

  g_string_append_c (result, '[');

  g_hash_table_iter_init (&iter, groups);
  for (i = 0; g_hash_table_iter_next (&iter, NULL, (gpointer *) &group); i++)
  {
    JsonNode * root;
    gchar * json;

    if (i > 0)
      g_string_append_c (result, ',');

    json_builder_end_array (group);
    json_builder_end_object (group);

    root = json_builder_get_root (group);
    json = json_to_string (root, FALSE);
    g_string_append (result, json);
    g_free (json);
    json_node_unref (root);

    g_object_unref (group);
  }

  g_string_append_c (result, ']');

  return g_string_free (result, FALSE);
}

static GPatternSpec *
make_pattern_spec (const gchar * pattern,
                   jboolean ignore_case)
{
  GPatternSpec * spec;

  if (ignore_case)
  {
    gchar * str = g_utf8_strdown (pattern, -1);
    spec = g_pattern_spec_new (str);
    g_free (str);
  }
  else
  {
    spec = g_pattern_spec_new (pattern);
  }

  return spec;
}

static gchar *
class_name_from_signature (const gchar * descriptor)
{
  gchar * result, * c;

  result = g_strdup (descriptor + 1);

  for (c = result; *c != '\\0'; c++)
  {
    if (*c == '/')
      *c = '.';
  }

  c[-1] = '\\0';

  return result;
}

static gchar *
format_method_signature (const gchar * name,
                         const gchar * signature)
{
  GString * sig;
  const gchar * cursor;
  gint arg_index;

  sig = g_string_sized_new (128);

  g_string_append (sig, name);

  cursor = signature;
  arg_index = -1;
  while (TRUE)
  {
    const gchar c = *cursor;

    if (c == '(')
    {
      g_string_append_c (sig, c);
      cursor++;
      arg_index = 0;
    }
    else if (c == ')')
    {
      g_string_append_c (sig, c);
      cursor++;
      break;
    }
    else
    {
      if (arg_index >= 1)
        g_string_append (sig, ", ");

      append_type (sig, &cursor);

      if (arg_index != -1)
        arg_index++;
    }
  }

  g_string_append (sig, ": ");
  append_type (sig, &cursor);

  return g_string_free (sig, FALSE);
}

static void
append_type (GString * output,
             const gchar ** type)
{
  const gchar * cursor = *type;

  switch (*cursor)
  {
    case 'Z':
      g_string_append (output, "boolean");
      cursor++;
      break;
    case 'B':
      g_string_append (output, "byte");
      cursor++;
      break;
    case 'C':
      g_string_append (output, "char");
      cursor++;
      break;
    case 'S':
      g_string_append (output, "short");
      cursor++;
      break;
    case 'I':
      g_string_append (output, "int");
      cursor++;
      break;
    case 'J':
      g_string_append (output, "long");
      cursor++;
      break;
    case 'F':
      g_string_append (output, "float");
      cursor++;
      break;
    case 'D':
      g_string_append (output, "double");
      cursor++;
      break;
    case 'V':
      g_string_append (output, "void");
      cursor++;
      break;
    case 'L':
    {
      gchar ch;

      cursor++;
      for (; (ch = *cursor) != ';'; cursor++)
      {
        g_string_append_c (output, (ch != '/') ? ch : '.');
      }
      cursor++;

      break;
    }
    case '[':
      *type = cursor + 1;
      append_type (output, type);
      g_string_append (output, "[]");
      return;
    default:
      g_string_append (output, "BUG");
      cursor++;
  }

  *type = cursor;
}

void
dealloc (gpointer mem)
{
  g_free (mem);
}

static gpointer
read_art_array (gpointer object_base,
                guint field_offset,
                guint length_size,
                guint * length)
{
  gpointer result, header;
  guint n;

  header = GSIZE_TO_POINTER (*(guint64 *) (object_base + field_offset));
  if (header != NULL)
  {
    result = header + length_size;
    if (length_size == sizeof (guint32))
      n = *(guint32 *) header;
    else
      n = *(guint64 *) header;
  }
  else
  {
    result = NULL;
    n = 0;
  }

  if (length != NULL)
    *length = n;

  return result;
}

static void
std_string_destroy (StdString * str)
{
  if ((str->l.capacity & 1) != 0)
    art_api.free (str->l.data);
}

static gchar *
std_string_c_str (StdString * self)
{
  if ((self->l.capacity & 1) != 0)
    return self->l.data;

  return self->s.data;
}
`,ud=/(.+)!([^/]+)\/?([isu]+)?/,ve=null,Oo=null,ze=class n{static build(e,t){return Ro(t),Oo(e,t,r=>new n(ve.new(e,r,t)))}static enumerateMethods(e,t,r){Ro(r);let o=e.match(ud);if(o===null)throw new Error("Invalid query; format is: class!method -- see documentation of Java.enumerateMethods(query) for details");let i=Memory.allocUtf8String(o[1]),s=Memory.allocUtf8String(o[2]),c=!1,a=!1,l=!1,d=o[3];d!==void 0&&(c=d.indexOf("s")!==-1,a=d.indexOf("i")!==-1,l=d.indexOf("u")!==-1);let p;if(t.jvmti!==null){let f=ve.enumerateMethodsJvm(i,s,We(c),We(a),We(l),r);try{p=JSON.parse(f.readUtf8String()).map(u=>{let _=ptr(u.loader);return u.loader=_.isNull()?null:_,u})}finally{ve.dealloc(f)}}else Ee(r.vm,r,f=>{let u=ve.enumerateMethodsArt(i,s,We(c),We(a),We(l));try{let _=t["art::JavaVMExt::AddGlobalRef"],{vm:h}=t;p=JSON.parse(u.readUtf8String()).map(g=>{let y=g.loader;return g.loader=y!==0?_(h,f,ptr(y)):null,g})}finally{ve.dealloc(u)}});return p}constructor(e){this.handle=e}has(e){return ve.has(this.handle,Memory.allocUtf8String(e))!==0}find(e){return ve.find(this.handle,Memory.allocUtf8String(e)).readUtf8String()}list(){let e=ve.list(this.handle);try{return JSON.parse(e.readUtf8String())}finally{ve.dealloc(e)}}};function Ro(n){ve===null&&(ve=pd(n),Oo=fd(ve,n.vm))}function pd(n){let e=ht(),{jvmti:t=null}=e,{pointerSize:r}=Process,o=8,i=r,s=7*r,c=10*4+5*r,a=o+i+s+c,d=Memory.alloc(a),p=d.add(o),f=p.add(i),{getDeclaredMethods:u,getDeclaredFields:_}=n.javaLangClass(),h=n.javaLangReflectMethod(),g=n.javaLangReflectField(),y=f;[t!==null?t:NULL,u,_,h.getName,h.getModifiers,g.getName,g.getModifiers].forEach(N=>{y=y.writePointer(N).add(r)});let E=f.add(s),{vm:C}=n;if(e.flavor==="art"){let N;if(t!==null)N=[0,0,0,0];else{let R=$n(C).offset;N=[R.ifields,R.methods,R.sfields,R.copiedMethodsOffset]}let k=me(C),S=Dt(C),T=E;[1,...N,k.size,k.offset.accessFlags,S.size,S.offset.accessFlags,4294967295].forEach(R=>{T=T.writeUInt(R).add(4)}),[e.artClassLinker.address,e["art::ClassLinker::VisitClasses"],e["art::mirror::Class::GetDescriptor"],e["art::ArtMethod::PrettyMethod"],Process.getModuleByName("libc.so").getExportByName("free")].forEach((R,w)=>{R===void 0&&(R=NULL),T=T.writePointer(R).add(r)})}let A=new CModule(dd,{lock:d,models:p,java_api:f,art_api:E}),M={exceptions:"propagate"},O={exceptions:"propagate",scheduling:"exclusive"};return{handle:A,new:new NativeFunction(A.model_new,"pointer",["pointer","pointer","pointer"],M),has:new NativeFunction(A.model_has,"bool",["pointer","pointer"],O),find:new NativeFunction(A.model_find,"pointer",["pointer","pointer"],O),list:new NativeFunction(A.model_list,"pointer",["pointer"],O),enumerateMethodsArt:new NativeFunction(A.enumerate_methods_art,"pointer",["pointer","pointer","bool","bool","bool"],M),enumerateMethodsJvm:new NativeFunction(A.enumerate_methods_jvm,"pointer",["pointer","pointer","bool","bool","bool","pointer"],M),dealloc:new NativeFunction(A.dealloc,"void",["pointer"],O)}}function fd(n,e){let t=ht();if(t.flavor!=="art")return hd;let r=t["art::JavaVMExt::DecodeGlobal"];return function(o,i,s){let c;return Ee(e,i,a=>{let l=r(e,a,o);c=s(l)}),c}}function hd(n,e,t){return t(NULL)}function We(n){return n?1:0}var _t=class{constructor(e,t){this.items=new Map,this.capacity=e,this.destroy=t}dispose(e){let{items:t,destroy:r}=this;t.forEach(o=>{r(o,e)}),t.clear()}get(e){let{items:t}=this,r=t.get(e);return r!==void 0&&(t.delete(e),t.set(e,r)),r}set(e,t,r){let{items:o}=this,i=o.get(e);if(i!==void 0)o.delete(e),this.destroy(i,r);else if(o.size===this.capacity){let s=o.keys().next().value,c=o.get(s);o.delete(s),this.destroy(c,r)}o.set(e,t)}};var mt=1,lr=256,jo=65536,_d=305419896,Po=32,Fo=12,Do=8,Uo=8,Bo=4,zo=4,Vo=12,md=0,gd=1,yd=2,bd=3,Ed=4,vd=5,Sd=6,wd=4096,Id=4097,Cd=4099,Ld=8192,Ad=8193,Td=8194,xd=8195,kd=8196,Nd=8198,Md=24,Rd=28,Od=2,jd=24,Jo=m.from([3,0,7,14,0]),ar="Ldalvik/annotation/Throws;",Pd=m.from([0]);function Fd(n){let e=new dr,t=Object.assign({},n);return e.addClass(t),e.build()}var dr=class{constructor(){this.classes=[]}addClass(e){this.classes.push(e)}build(){let e=Bd(this.classes),{classes:t,interfaces:r,fields:o,methods:i,protos:s,parameters:c,annotationDirectories:a,annotationSets:l,throwsAnnotations:d,types:p,strings:f}=e,u=0,_=0,h=8,g=12,y=20,E=112;u+=E;let C=u,A=f.length*zo;u+=A;let M=u,O=p.length*Bo;u+=O;let N=u,k=s.length*Fo;u+=k;let S=u,T=o.length*Do;u+=T;let R=u,w=i.length*Uo;u+=w;let j=u,D=t.length*Po;u+=D;let U=u,F=l.map(L=>{let P=u;return L.offset=P,u+=4+L.items.length*4,P}),z=t.reduce((L,P)=>(P.classData.constructorMethods.forEach(Z=>{let[,K,q]=Z;(K&lr)===0&&q>=0&&(Z.push(u),L.push({offset:u,superConstructor:q}),u+=jd)}),L),[]);a.forEach(L=>{L.offset=u,u+=16+L.methods.length*8});let ee=r.map(L=>{u=cr(u,4);let P=u;return L.offset=P,u+=4+2*L.types.length,P}),ne=c.map(L=>{u=cr(u,4);let P=u;return L.offset=P,u+=4+2*L.types.length,P}),ce=[],Y=f.map(L=>{let P=u,B=m.from(ge(L.length)),Z=m.from(L,"utf8"),K=m.concat([B,Z,Pd]);return ce.push(K),u+=K.length,P}),se=z.map(L=>{let P=u;return u+=Jo.length,P}),X=d.map(L=>{let P=Ud(L);return L.offset=u,u+=P.length,P}),re=t.map((L,P)=>{L.classData.offset=u;let B=Dd(L);return u+=B.length,B}),we=0,et=0;u=cr(u,4);let H=u,_e=r.length+c.length,Ae=4+(o.length>0?1:0)+2+l.length+z.length+a.length+(_e>0?1:0)+1+se.length+d.length+t.length+1,Pe=4+Ae*Vo;u+=Pe;let Me=u-U,Ge=u,I=m.alloc(Ge);I.write(`dex
035`),I.writeUInt32LE(Ge,32),I.writeUInt32LE(E,36),I.writeUInt32LE(_d,40),I.writeUInt32LE(we,44),I.writeUInt32LE(et,48),I.writeUInt32LE(H,52),I.writeUInt32LE(f.length,56),I.writeUInt32LE(C,60),I.writeUInt32LE(p.length,64),I.writeUInt32LE(M,68),I.writeUInt32LE(s.length,72),I.writeUInt32LE(N,76),I.writeUInt32LE(o.length,80),I.writeUInt32LE(o.length>0?S:0,84),I.writeUInt32LE(i.length,88),I.writeUInt32LE(R,92),I.writeUInt32LE(t.length,96),I.writeUInt32LE(j,100),I.writeUInt32LE(Me,104),I.writeUInt32LE(U,108),Y.forEach((L,P)=>{I.writeUInt32LE(L,C+P*zo)}),p.forEach((L,P)=>{I.writeUInt32LE(L,M+P*Bo)}),s.forEach((L,P)=>{let[B,Z,K]=L,q=N+P*Fo;I.writeUInt32LE(B,q),I.writeUInt32LE(Z,q+4),I.writeUInt32LE(K!==null?K.offset:0,q+8)}),o.forEach((L,P)=>{let[B,Z,K]=L,q=S+P*Do;I.writeUInt16LE(B,q),I.writeUInt16LE(Z,q+2),I.writeUInt32LE(K,q+4)}),i.forEach((L,P)=>{let[B,Z,K]=L,q=R+P*Uo;I.writeUInt16LE(B,q),I.writeUInt16LE(Z,q+2),I.writeUInt32LE(K,q+4)}),t.forEach((L,P)=>{let{interfaces:B,annotationsDirectory:Z}=L,K=B!==null?B.offset:0,q=Z!==null?Z.offset:0,tt=0,ye=j+P*Po;I.writeUInt32LE(L.index,ye),I.writeUInt32LE(L.accessFlags,ye+4),I.writeUInt32LE(L.superClassIndex,ye+8),I.writeUInt32LE(K,ye+12),I.writeUInt32LE(L.sourceFileIndex,ye+16),I.writeUInt32LE(q,ye+20),I.writeUInt32LE(L.classData.offset,ye+24),I.writeUInt32LE(tt,ye+28)}),l.forEach((L,P)=>{let{items:B}=L,Z=F[P];I.writeUInt32LE(B.length,Z),B.forEach((K,q)=>{I.writeUInt32LE(K.offset,Z+4+q*4)})}),z.forEach((L,P)=>{let{offset:B,superConstructor:Z}=L,K=1,q=1,tt=1,ye=0,Et=4;I.writeUInt16LE(K,B),I.writeUInt16LE(q,B+2),I.writeUInt16LE(tt,B+4),I.writeUInt16LE(ye,B+6),I.writeUInt32LE(se[P],B+8),I.writeUInt32LE(Et,B+12),I.writeUInt16LE(4208,B+16),I.writeUInt16LE(Z,B+18),I.writeUInt16LE(0,B+20),I.writeUInt16LE(14,B+22)}),a.forEach(L=>{let P=L.offset,B=0,Z=0,K=L.methods.length,q=0;I.writeUInt32LE(B,P),I.writeUInt32LE(Z,P+4),I.writeUInt32LE(K,P+8),I.writeUInt32LE(q,P+12),L.methods.forEach((tt,ye)=>{let Et=P+16+ye*8,[_i,mi]=tt;I.writeUInt32LE(_i,Et),I.writeUInt32LE(mi.offset,Et+4)})}),r.forEach((L,P)=>{let B=ee[P];I.writeUInt32LE(L.types.length,B),L.types.forEach((Z,K)=>{I.writeUInt16LE(Z,B+4+K*2)})}),c.forEach((L,P)=>{let B=ne[P];I.writeUInt32LE(L.types.length,B),L.types.forEach((Z,K)=>{I.writeUInt16LE(Z,B+4+K*2)})}),ce.forEach((L,P)=>{L.copy(I,Y[P])}),se.forEach(L=>{Jo.copy(I,L)}),X.forEach((L,P)=>{L.copy(I,d[P].offset)}),re.forEach((L,P)=>{L.copy(I,t[P].classData.offset)}),I.writeUInt32LE(Ae,H);let le=[[md,1,_],[gd,f.length,C],[yd,p.length,M],[bd,s.length,N]];o.length>0&&le.push([Ed,o.length,S]),le.push([vd,i.length,R]),le.push([Sd,t.length,j]),l.forEach((L,P)=>{le.push([Cd,L.items.length,F[P]])}),z.forEach(L=>{le.push([Ad,1,L.offset])}),a.forEach(L=>{le.push([Nd,1,L.offset])}),_e>0&&le.push([Id,_e,ee.concat(ne)[0]]),le.push([Td,f.length,Y[0]]),se.forEach(L=>{le.push([xd,1,L])}),d.forEach(L=>{le.push([kd,1,L.offset])}),t.forEach(L=>{le.push([Ld,1,L.classData.offset])}),le.push([wd,1,H]),le.forEach((L,P)=>{let[B,Z,K]=L,q=H+4+P*Vo;I.writeUInt16LE(B,q),I.writeUInt32LE(Z,q+4),I.writeUInt32LE(K,q+8)});let Lr=new Checksum("sha1");return Lr.update(I.slice(g+y)),m.from(Lr.getDigest()).copy(I,g),I.writeUInt32LE(Hd(I,g),h),I}};function Dd(n){let{instanceFields:e,constructorMethods:t,virtualMethods:r}=n.classData;return m.from([0].concat(ge(e.length)).concat(ge(t.length)).concat(ge(r.length)).concat(e.reduce((i,[s,c])=>i.concat(ge(s)).concat(ge(c)),[])).concat(t.reduce((i,[s,c,,a])=>i.concat(ge(s)).concat(ge(c)).concat(ge(a||0)),[])).concat(r.reduce((i,[s,c])=>i.concat(ge(s)).concat(ge(c)).concat([0]),[])))}function Ud(n){let{thrownTypes:e}=n;return m.from([Od].concat(ge(n.type)).concat([1]).concat(ge(n.value)).concat([Rd,e.length]).concat(e.reduce((t,r)=>(t.push(Md,r),t),[])))}function Bd(n){let e=new Set,t=new Set,r={},o=[],i=[],s={},c=new Set,a=new Set;n.forEach(w=>{let{name:j,superClass:D,sourceFileName:U}=w;e.add("this"),e.add(j),t.add(j),e.add(D),t.add(D),e.add(U),w.interfaces.forEach(F=>{e.add(F),t.add(F)}),w.fields.forEach(F=>{let[z,ee]=F;e.add(z),e.add(ee),t.add(ee),o.push([w.name,ee,z])}),w.methods.some(([F])=>F==="<init>")||(w.methods.unshift(["<init>","V",[]]),c.add(j)),w.methods.forEach(F=>{let[z,ee,ne,ce=[],Y]=F;e.add(z);let se=l(ee,ne),X=null;if(ce.length>0){let re=ce.slice();re.sort(),X=re.join("|");let we=s[X];we===void 0&&(we={id:X,types:re},s[X]=we),e.add(ar),t.add(ar),ce.forEach(et=>{e.add(et),t.add(et)}),e.add("value")}if(i.push([w.name,se,z,X,Y]),z==="<init>"){a.add(j+"|"+se);let re=D+"|"+se;c.has(j)&&!a.has(re)&&(i.push([D,se,z,null,0]),a.add(re))}})});function l(w,j){let D=[w].concat(j),U=D.join("|");if(r[U]!==void 0)return U;e.add(w),t.add(w),j.forEach(z=>{e.add(z),t.add(z)});let F=D.map($d).join("");return e.add(F),r[U]=[U,F,w,j],U}let d=Array.from(e);d.sort();let p=d.reduce((w,j,D)=>(w[j]=D,w),{}),f=Array.from(t).map(w=>p[w]);f.sort(Go);let u=f.reduce((w,j,D)=>(w[d[j]]=D,w),{}),_=Object.keys(r).map(w=>r[w]);_.sort(Vd);let h={},g=_.map(w=>{let[,j,D,U]=w,F;if(U.length>0){let z=U.join("|");F=h[z],F===void 0&&(F={types:U.map(ee=>u[ee]),offset:-1},h[z]=F)}else F=null;return[p[j],u[D],F]}),y=_.reduce((w,j,D)=>{let[U]=j;return w[U]=D,w},{}),E=Object.keys(h).map(w=>h[w]),C=o.map(w=>{let[j,D,U]=w;return[u[j],u[D],p[U]]});C.sort(Jd);let A=i.map(w=>{let[j,D,U,F,z]=w;return[u[j],y[D],p[U],F,z]});A.sort(Gd);let M=Object.keys(s).map(w=>s[w]).map(w=>({id:w.id,type:u[ar],value:p.value,thrownTypes:w.types.map(j=>u[j]),offset:-1})),O=M.map(w=>({id:w.id,items:[w],offset:-1})),N=O.reduce((w,j,D)=>(w[j.id]=D,w),{}),k={},S=[],T=n.map(w=>{let j=u[w.name],D=mt,U=u[w.superClass],F,z=w.interfaces.map(H=>u[H]);if(z.length>0){z.sort(Go);let H=z.join("|");F=k[H],F===void 0&&(F={types:z,offset:-1},k[H]=F)}else F=null;let ee=p[w.sourceFileName],ne=A.reduce((H,_e,Ae)=>{let[Pe,Me,Ge,I,le]=_e;return Pe===j&&H.push([Ae,Ge,I,Me,le]),H},[]),ce=null,Y=ne.filter(([,,H])=>H!==null).map(([H,,_e])=>[H,O[N[_e]]]);Y.length>0&&(ce={methods:Y,offset:-1},S.push(ce));let se=C.reduce((H,_e,Ae)=>{let[Pe]=_e;return Pe===j&&H.push([Ae>0?1:0,mt]),H},[]),X=p["<init>"],re=ne.filter(([,H])=>H===X).map(([H,,,_e])=>{if(c.has(w.name)){let Ae=-1,Pe=A.length;for(let Me=0;Me!==Pe;Me++){let[Ge,I,le]=A[Me];if(Ge===U&&le===X&&I===_e){Ae=Me;break}}return[H,mt|jo,Ae]}else return[H,mt|jo|lr,-1]}),we=zd(ne.filter(([,H])=>H!==X).map(([H,,,,_e])=>[H,_e|mt|lr]));return{index:j,accessFlags:D,superClassIndex:U,interfaces:F,sourceFileIndex:ee,annotationsDirectory:ce,classData:{instanceFields:se,constructorMethods:re,virtualMethods:we,offset:-1}}}),R=Object.keys(k).map(w=>k[w]);return{classes:T,interfaces:R,fields:C,methods:A,protos:g,parameters:E,annotationDirectories:S,annotationSets:O,throwsAnnotations:M,types:f,strings:d}}function zd(n){let e=0;return n.map(([t,r],o)=>{let i;return o===0?i=[t,r]:i=[t-e,r],e=t,i})}function Go(n,e){return n-e}function Vd(n,e){let[,,t,r]=n,[,,o,i]=e;if(t<o)return-1;if(t>o)return 1;let s=r.join("|"),c=i.join("|");return s<c?-1:s>c?1:0}function Jd(n,e){let[t,r,o]=n,[i,s,c]=e;return t!==i?t-i:o!==c?o-c:r-s}function Gd(n,e){let[t,r,o]=n,[i,s,c]=e;return t!==i?t-i:o!==c?o-c:r-s}function $d(n){let e=n[0];return e==="L"||e==="["?"L":n}function ge(n){if(n<=127)return[n];let e=[],t=!1;do{let r=n&127;n>>=7,t=n!==0,t&&(r|=128),e.push(r)}while(t);return e}function cr(n,e){let t=n%e;return t===0?n:n+e-t}function Hd(n,e){let t=1,r=0,o=n.length;for(let i=e;i<o;i++)t=(t+n[i])%65521,r=(r+t)%65521;return(r<<16|t)>>>0}var $o=Fd;var Zd=1,ur=null,Ho=null;function Zo(n){ur=n}function pr(n,e,t){let r=Qe(n);return r===null&&(n.indexOf("[")===0?r=fr(n,e,t):(n[0]==="L"&&n[n.length-1]===";"&&(n=n.substring(1,n.length-1)),r=Kd(n,e,t))),Object.assign({className:n},r)}var qo={boolean:{name:"Z",type:"uint8",size:1,byteSize:1,defaultValue:!1,isCompatible(n){return typeof n=="boolean"},fromJni(n){return!!n},toJni(n){return n?1:0},read(n){return n.readU8()},write(n,e){n.writeU8(e)},toString(){return this.name}},byte:{name:"B",type:"int8",size:1,byteSize:1,defaultValue:0,isCompatible(n){return Number.isInteger(n)&&n>=-128&&n<=127},fromJni:Se,toJni:Se,read(n){return n.readS8()},write(n,e){n.writeS8(e)},toString(){return this.name}},char:{name:"C",type:"uint16",size:1,byteSize:2,defaultValue:0,isCompatible(n){if(typeof n!="string"||n.length!==1)return!1;let e=n.charCodeAt(0);return e>=0&&e<=65535},fromJni(n){return String.fromCharCode(n)},toJni(n){return n.charCodeAt(0)},read(n){return n.readU16()},write(n,e){n.writeU16(e)},toString(){return this.name}},short:{name:"S",type:"int16",size:1,byteSize:2,defaultValue:0,isCompatible(n){return Number.isInteger(n)&&n>=-32768&&n<=32767},fromJni:Se,toJni:Se,read(n){return n.readS16()},write(n,e){n.writeS16(e)},toString(){return this.name}},int:{name:"I",type:"int32",size:1,byteSize:4,defaultValue:0,isCompatible(n){return Number.isInteger(n)&&n>=-2147483648&&n<=2147483647},fromJni:Se,toJni:Se,read(n){return n.readS32()},write(n,e){n.writeS32(e)},toString(){return this.name}},long:{name:"J",type:"int64",size:2,byteSize:8,defaultValue:0,isCompatible(n){return typeof n=="number"||n instanceof Int64},fromJni:Se,toJni:Se,read(n){return n.readS64()},write(n,e){n.writeS64(e)},toString(){return this.name}},float:{name:"F",type:"float",size:1,byteSize:4,defaultValue:0,isCompatible(n){return typeof n=="number"},fromJni:Se,toJni:Se,read(n){return n.readFloat()},write(n,e){n.writeFloat(e)},toString(){return this.name}},double:{name:"D",type:"double",size:2,byteSize:8,defaultValue:0,isCompatible(n){return typeof n=="number"},fromJni:Se,toJni:Se,read(n){return n.readDouble()},write(n,e){n.writeDouble(e)},toString(){return this.name}},void:{name:"V",type:"void",size:0,byteSize:0,defaultValue:void 0,isCompatible(n){return n===void 0},fromJni(){},toJni(){return NULL},toString(){return this.name}}},qd=new Set(Object.values(qo).map(n=>n.name));function Qe(n){let e=qo[n];return e!==void 0?e:null}function Kd(n,e,t){let r=t._types[e?1:0],o=r[n];return o!==void 0||(n==="java.lang.Object"?o=Wd(t):o=Qd(n,e,t),r[n]=o),o}function Wd(n){return{name:"Ljava/lang/Object;",type:"pointer",size:1,defaultValue:NULL,isCompatible(e){return e===null?!0:e===void 0?!1:e.$h instanceof NativePointer?!0:typeof e=="string"},fromJni(e,t,r){return e.isNull()?null:n.cast(e,n.use("java.lang.Object"),r)},toJni(e,t){return e===null?NULL:typeof e=="string"?t.newStringUtf(e):e.$h}}}function Qd(n,e,t){let r=null,o=null,i=null;function s(){return r===null&&(r=t.use(n).class),r}function c(l){let d=s();return o===null&&(o=d.isInstance.overload("java.lang.Object")),o.call(d,l)}function a(){if(i===null){let l=s();i=t.use("java.lang.String").class.isAssignableFrom(l)}return i}return{name:Ve(n),type:"pointer",size:1,defaultValue:NULL,isCompatible(l){return l===null?!0:l===void 0?!1:l.$h instanceof NativePointer?c(l):typeof l=="string"&&a()},fromJni(l,d,p){return l.isNull()?null:a()&&e?d.stringFromJni(l):t.cast(l,t.use(n),p)},toJni(l,d){return l===null?NULL:typeof l=="string"?d.newStringUtf(l):l.$h},toString(){return this.name}}}var Yd=[["Z","boolean"],["B","byte"],["C","char"],["D","double"],["F","float"],["I","int"],["J","long"],["S","short"]].reduce((n,[e,t])=>(n["["+e]=Xd("["+e,t),n),{});function Xd(n,e){let t=b.prototype,r=ou(e),o={typeName:e,newArray:t["new"+r+"Array"],setRegion:t["set"+r+"ArrayRegion"],getElements:t["get"+r+"ArrayElements"],releaseElements:t["release"+r+"ArrayElements"]};return{name:n,type:"pointer",size:1,defaultValue:NULL,isCompatible(i){return ru(i,e)},fromJni(i,s,c){return tu(i,o,s,c)},toJni(i,s){return nu(i,o,s)}}}function fr(n,e,t){let r=Yd[n];if(r!==void 0)return r;if(n.indexOf("[")!==0)throw new Error("Unsupported type: "+n);let o=n.substring(1),i=pr(o,e,t),s=0,c=o.length;for(;s!==c&&o[s]==="[";)s++;o=o.substring(s),o[0]==="L"&&o[o.length-1]===";"&&(o=o.substring(1,o.length-1));let a=o.replace(/\./g,"/");qd.has(a)?a="[".repeat(s)+a:a="[".repeat(s)+"L"+a+";";let l="["+a;return o="[".repeat(s)+o,{name:n.replace(/\./g,"/"),type:"pointer",size:1,defaultValue:NULL,isCompatible(d){return d===null?!0:typeof d!="object"||d.length===void 0?!1:d.every(function(p){return i.isCompatible(p)})},fromJni(d,p,f){if(d.isNull())return null;let u=[],_=p.getArrayLength(d);for(let h=0;h!==_;h++){let g=p.getObjectArrayElement(d,h);try{u.push(i.fromJni(g,p))}finally{p.deleteLocalRef(g)}}try{u.$w=t.cast(d,t.use(l),f)}catch{t.use("java.lang.reflect.Array").newInstance(t.use(o).class,0),u.$w=t.cast(d,t.use(l),f)}return u.$dispose=eu,u},toJni(d,p){if(d===null)return NULL;if(!(d instanceof Array))throw new Error("Expected an array");let f=d.$w;if(f!==void 0)return f.$h;let u=d.length,h=t.use(o).$borrowClassHandle(p);try{let g=p.newObjectArray(u,h.value,NULL);p.throwIfExceptionPending();for(let y=0;y!==u;y++){let E=i.toJni(d[y],p);try{p.setObjectArrayElement(g,y,E)}finally{i.type==="pointer"&&p.getObjectRefType(E)===Zd&&p.deleteLocalRef(E)}p.throwIfExceptionPending()}return g}finally{h.unref(p)}}}}function eu(){let n=this.length;for(let e=0;e!==n;e++){let t=this[e];if(t===null)continue;let r=t.$dispose;if(r===void 0)break;r.call(t)}this.$w.$dispose()}function tu(n,e,t,r){if(n.isNull())return null;let o=Qe(e.typeName),i=t.getArrayLength(n);return new Vt(n,e,o,i,t,r)}function nu(n,e,t){if(n===null)return NULL;let r=n.$h;if(r!==void 0)return r;let o=n.length,i=Qe(e.typeName),s=e.newArray.call(t,o);if(s.isNull())throw new Error("Unable to construct array");if(o>0){let c=i.byteSize,a=i.write,l=i.toJni,d=Memory.alloc(o*i.byteSize);for(let p=0;p!==o;p++)a(d.add(p*c),l(n[p]));e.setRegion.call(t,s,0,o,d),t.throwIfExceptionPending()}return s}function ru(n,e){if(n===null)return!0;if(n instanceof Vt)return n.$s.typeName===e;if(!(typeof n=="object"&&n.length!==void 0))return!1;let r=Qe(e);return Array.prototype.every.call(n,o=>r.isCompatible(o))}function Vt(n,e,t,r,o,i=!0){if(i){let s=o.newGlobalRef(n);this.$h=s,this.$r=Script.bindWeak(this,o.vm.makeHandleDestructor(s))}else this.$h=n,this.$r=null;return this.$s=e,this.$t=t,this.length=r,new Proxy(this,Ho)}Ho={has(n,e){return e in n?!0:n.tryParseIndex(e)!==null},get(n,e,t){let r=n.tryParseIndex(e);return r===null?n[e]:n.readElement(r)},set(n,e,t,r){let o=n.tryParseIndex(e);return o===null?(n[e]=t,!0):(n.writeElement(o,t),!0)},ownKeys(n){let e=[],{length:t}=n;for(let r=0;r!==t;r++){let o=r.toString();e.push(o)}return e.push("length"),e},getOwnPropertyDescriptor(n,e){return n.tryParseIndex(e)!==null?{writable:!0,configurable:!0,enumerable:!0}:Object.getOwnPropertyDescriptor(n,e)}};Object.defineProperties(Vt.prototype,{$dispose:{enumerable:!0,value(){let n=this.$r;n!==null&&(this.$r=null,Script.unbindWeak(n))}},$clone:{value(n){return new Vt(this.$h,this.$s,this.$t,this.length,n)}},tryParseIndex:{value(n){if(typeof n=="symbol")return null;let e=parseInt(n);return isNaN(e)||e<0||e>=this.length?null:e}},readElement:{value(n){return this.withElements(e=>{let t=this.$t;return t.fromJni(t.read(e.add(n*t.byteSize)))})}},writeElement:{value(n,e){let{$h:t,$s:r,$t:o}=this,i=ur.getEnv(),s=Memory.alloc(o.byteSize);o.write(s,o.toJni(e)),r.setRegion.call(i,t,n,1,s)}},withElements:{value(n){let{$h:e,$s:t}=this,r=ur.getEnv(),o=t.getElements.call(r,e);if(o.isNull())throw new Error("Unable to get array elements");try{return n(o)}finally{t.releaseElements.call(r,e,o)}}},toJSON:{value(){let{length:n,$t:e}=this,{byteSize:t,fromJni:r,read:o}=e;return this.withElements(i=>{let s=[];for(let c=0;c!==n;c++){let a=r(o(i.add(c*t)));s.push(a)}return s})}},toString:{value(){return this.toJSON().toString()}}});function Ve(n){return"L"+n.replace(/\./g,"/")+";"}function ou(n){return n.charAt(0).toUpperCase()+n.slice(1)}function Se(n){return n}var iu=4,{ensureClassInitialized:Ko,makeMethodMangler:ti}=Bt,su=8,mr=1,yt=2,Ne=3,hr=1,gr=2,Jt=1,ni=2,Wo=Symbol("PENDING_USE"),Qo="/data/local/tmp",{getCurrentThreadId:$t,pointerSize:gt}=Process,pe={state:"empty",factories:[],loaders:null,Integer:null},G=null,Q=null,ri=null,oi=null,ii=null,si=null,ai=null,Yo=null,_r=null,Xe=new Map,Oe=class n{static _initialize(e,t){G=e,Q=t,ri=t.flavor==="art",t.flavor==="jvm"&&(Ko=To,ti=ko)}static _disposeAll(e){pe.factories.forEach(t=>{t._dispose(e)})}static get(e){let t=Lu(),r=t.factories[0];if(e===null)return r;let o=t.loaders.get(e);if(o!==null){let s=r.cast(o,t.Integer);return t.factories[s.intValue()]}let i=new n;return i.loader=e,i.cacheDir=r.cacheDir,Er(i,e),i}constructor(){this.cacheDir=Qo,this.codeCacheDir=Qo+"/dalvik-cache",this.tempFileNaming={prefix:"frida",suffix:""},this._classes={},this._classHandles=new _t(10,cu),this._patchedMethods=new Set,this._loader=null,this._types=[{},{}],pe.factories.push(this)}_dispose(e){Array.from(this._patchedMethods).forEach(t=>{t.implementation=null}),this._patchedMethods.clear(),Qn(),this._classHandles.dispose(e),this._classes={}}get loader(){return this._loader}set loader(e){let t=this._loader===null&&e!==null;this._loader=e,t&&pe.state==="ready"&&this===pe.factories[0]&&Er(this,e)}use(e,t={}){let r=t.cache!=="skip",o=r?this._getUsedClass(e):void 0;if(o===void 0)try{let i=G.getEnv(),{_loader:s}=this,c=s!==null?du(e,s,i):lu(e);o=this._make(e,c,i)}finally{r&&this._setUsedClass(e,o)}return o}_getUsedClass(e){let t;for(;(t=this._classes[e])===Wo;)Thread.sleep(.05);return t===void 0&&(this._classes[e]=Wo),t}_setUsedClass(e,t){t!==void 0?this._classes[e]=t:delete this._classes[e]}_make(e,t,r){let o=au(),i=Object.create(Sr.prototype,{[Symbol.for("n")]:{value:e},$n:{get(){return this[Symbol.for("n")]}},[Symbol.for("C")]:{value:o},$C:{get(){return this[Symbol.for("C")]}},[Symbol.for("w")]:{value:null,writable:!0},$w:{get(){return this[Symbol.for("w")]},set(a){this[Symbol.for("w")]=a}},[Symbol.for("_s")]:{writable:!0},$_s:{get(){return this[Symbol.for("_s")]},set(a){this[Symbol.for("_s")]=a}},[Symbol.for("c")]:{value:[null]},$c:{get(){return this[Symbol.for("c")]}},[Symbol.for("m")]:{value:new Map},$m:{get(){return this[Symbol.for("m")]}},[Symbol.for("l")]:{value:null,writable:!0},$l:{get(){return this[Symbol.for("l")]},set(a){this[Symbol.for("l")]=a}},[Symbol.for("gch")]:{value:t},$gch:{get(){return this[Symbol.for("gch")]}},[Symbol.for("f")]:{value:this},$f:{get(){return this[Symbol.for("f")]}}});o.prototype=i;let s=new o(null);i[Symbol.for("w")]=s,i.$w=s;let c=s.$borrowClassHandle(r);try{let a=c.value;Ko(r,a),i.$l=ze.build(a,r)}finally{c.unref(r)}return s}retain(e){let t=G.getEnv();return e.$clone(t)}cast(e,t,r){let o=G.getEnv(),i=e.$h;i===void 0&&(i=e);let s=t.$borrowClassHandle(o);try{if(!o.isInstanceOf(i,s.value))throw new Error(`Cast from '${o.getObjectClassName(i)}' to '${t.$n}' isn't possible`)}finally{s.unref(o)}let c=t.$C;return new c(i,Jt,o,r)}wrap(e,t,r){let o=t.$C,i=new o(e,Jt,r,!1);return i.$r=Script.bindWeak(i,G.makeHandleDestructor(e)),i}array(e,t){let r=G.getEnv(),o=Qe(e);o!==null&&(e=o.name);let i=fr("["+e,!1,this),s=i.toJni(t,r);return i.fromJni(s,r,!0)}registerClass(e){let t=G.getEnv(),r=[];try{let o=this.use("java.lang.Class"),i=t.javaLangReflectMethod(),s=t.vaMethod("pointer",[]),c=e.name,a=e.implements||[],l=e.superClass||this.use("java.lang.Object"),d=[],p=[],f={name:Ve(c),sourceFileName:Tu(c),superClass:Ve(l.$n),interfaces:a.map(S=>Ve(S.$n)),fields:d,methods:p},u=a.slice();a.forEach(S=>{Array.prototype.slice.call(S.class.getInterfaces()).forEach(T=>{let R=this.cast(T,o).getCanonicalName();u.push(this.use(R))})});let _=e.fields||{};Object.getOwnPropertyNames(_).forEach(S=>{let T=this._getType(_[S]);d.push([S,T.name])});let h={},g={};u.forEach(S=>{let T=S.$borrowClassHandle(t);r.push(T);let R=T.value;S.$ownMembers.filter(w=>S[w].overloads!==void 0).forEach(w=>{let j=S[w],D=j.overloads,U=D.map(F=>Xo(w,F.returnType,F.argumentTypes));h[w]=[j,U,R],D.forEach((F,z)=>{let ee=U[z];g[ee]=[F,R]})})});let y=e.methods||{},C=Object.keys(y).reduce((S,T)=>{let R=y[T],w=T==="$init"?"<init>":T;return R instanceof Array?S.push(...R.map(j=>[w,j])):S.push([w,R]),S},[]),A=[];C.forEach(([S,T])=>{let R=Ne,w,j,D=[],U;if(typeof T=="function"){let ne=h[S];if(ne!==void 0&&Array.isArray(ne)){let[ce,Y,se]=ne;if(Y.length>1)throw new Error(`More than one overload matching '${S}': signature must be specified`);delete g[Y[0]];let X=ce.overloads[0];R=X.type,w=X.returnType,j=X.argumentTypes,U=T;let re=t.toReflectedMethod(se,X.handle,0),we=s(t.handle,re,i.getGenericExceptionTypes);D=vr(t,we).map(Ve),t.deleteLocalRef(we),t.deleteLocalRef(re)}else w=this._getType("void"),j=[],U=T}else{if(T.isStatic&&(R=yt),w=this._getType(T.returnType||"void"),j=(T.argumentTypes||[]).map(Y=>this._getType(Y)),U=T.implementation,typeof U!="function")throw new Error("Expected a function implementation for method: "+S);let ne=Xo(S,w,j),ce=g[ne];if(ce!==void 0){let[Y,se]=ce;delete g[ne],R=Y.type,w=Y.returnType,j=Y.argumentTypes;let X=t.toReflectedMethod(se,Y.handle,0),re=s(t.handle,X,i.getGenericExceptionTypes);D=vr(t,re).map(Ve),t.deleteLocalRef(re),t.deleteLocalRef(X)}}let F=w.name,z=j.map(ne=>ne.name),ee="("+z.join("")+")"+F;p.push([S,F,z,D,R===yt?su:0]),A.push([S,ee,R,w,j,U])});let M=Object.keys(g);if(M.length>0)throw new Error("Missing implementation for: "+M.join(", "));let O=Gt.fromBuffer($o(f),this);try{O.load()}finally{O.file.delete()}let N=this.use(e.name),k=C.length;if(k>0){let S=3*gt,T=Memory.alloc(k*S),R=[],w=[];A.forEach(([U,F,z,ee,ne,ce],Y)=>{let se=Memory.allocUtf8String(U),X=Memory.allocUtf8String(F),re=ci(U,N,z,ee,ne,ce);T.add(Y*S).writePointer(se),T.add(Y*S+gt).writePointer(X),T.add(Y*S+2*gt).writePointer(re),w.push(se,X),R.push(re)});let j=N.$borrowClassHandle(t);r.push(j);let D=j.value;t.registerNatives(D,T,k),t.throwIfExceptionPending(),N.$nativeMethods=R}return N}finally{r.forEach(o=>{o.unref(t)})}}choose(e,t){let r=G.getEnv(),{flavor:o}=Q;if(o==="jvm")this._chooseObjectsJvm(e,r,t);else if(o==="art"){let i=Q["art::gc::Heap::VisitObjects"]===void 0;if(i&&Q["art::gc::Heap::GetInstances"]===void 0)return this._chooseObjectsJvm(e,r,t);Ee(G,r,s=>{i?this._chooseObjectsArtPreA12(e,r,s,t):this._chooseObjectsArtLegacy(e,r,s,t)})}else this._chooseObjectsDalvik(e,r,t)}_chooseObjectsJvm(e,t,r){let o=this.use(e),{jvmti:i}=Q,s=1,c=3,a=o.$borrowClassHandle(t),l=int64(a.value.toString());try{let d=new NativeCallback((y,E,C,A)=>(C.writeS64(l),s),"int",["int64","int64","pointer","pointer"]);i.iterateOverInstancesOfClass(a.value,c,d,a.value);let p=Memory.alloc(8);p.writeS64(l);let f=Memory.alloc(iu),u=Memory.alloc(gt);i.getObjectsWithTags(1,p,f,u,NULL);let _=f.readS32(),h=u.readPointer(),g=[];for(let y=0;y!==_;y++)g.push(h.add(y*gt).readPointer());i.deallocate(h);try{for(let y of g){let E=this.cast(y,o);if(r.onMatch(E)==="stop")break}r.onComplete()}finally{g.forEach(y=>{t.deleteLocalRef(y)})}}finally{a.unref(t)}}_chooseObjectsArtPreA12(e,t,r,o){let i=this.use(e),s=ut.$new(r,G),c,a=i.$borrowClassHandle(t);try{let f=Q["art::JavaVMExt::DecodeGlobal"](Q.vm,r,a.value);c=s.newHandle(f)}finally{a.unref(t)}let l=0,d=dt.$new();Q["art::gc::Heap::GetInstances"](Q.artHeap,s,c,l,d);let p=d.handles.map(f=>t.newGlobalRef(f));d.$delete(),s.$delete();try{for(let f of p){let u=this.cast(f,i);if(o.onMatch(u)==="stop")break}o.onComplete()}finally{p.forEach(f=>{t.deleteGlobalRef(f)})}}_chooseObjectsArtLegacy(e,t,r,o){let i=this.use(e),s=[],c=Q["art::JavaVMExt::AddGlobalRef"],a=Q.vm,l,d=i.$borrowClassHandle(t);try{l=Q["art::JavaVMExt::DecodeGlobal"](a,r,d.value).toInt32()}finally{d.unref(t)}let p=rr(l,f=>{s.push(c(a,r,f))});Q["art::gc::Heap::VisitObjects"](Q.artHeap,p,NULL);try{for(let f of s){let u=this.cast(f,i);if(o.onMatch(u)==="stop")break}}finally{s.forEach(f=>{t.deleteGlobalRef(f)})}o.onComplete()}_chooseObjectsDalvik(e,t,r){let o=this.use(e);if(Q.addLocalReference===null){let s=Process.getModuleByName("libdvm.so"),c;switch(Process.arch){case"arm":c="2d e9 f0 41 05 46 15 4e 0c 46 7e 44 11 b3 43 68";break;case"ia32":c="8d 64 24 d4 89 5c 24 1c 89 74 24 20 e8 ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? 85 d2";break}Memory.scan(s.base,s.size,c,{onMatch:(a,l)=>{let d;if(Process.arch==="arm")a=a.or(1),d=new NativeFunction(a,"pointer",["pointer","pointer"]);else{let p=Memory.alloc(Process.pageSize);Memory.patchCode(p,16,f=>{let u=new X86Writer(f,{pc:p});u.putMovRegRegOffsetPtr("eax","esp",4),u.putMovRegRegOffsetPtr("edx","esp",8),u.putJmpAddress(a),u.flush()}),d=new NativeFunction(p,"pointer",["pointer","pointer"]),d._thunk=p}return Q.addLocalReference=d,G.perform(p=>{i(this,p)}),"stop"},onError(a){},onComplete(){Q.addLocalReference===null&&r.onComplete()}})}else i(this,t);function i(s,c){let{DVM_JNI_ENV_OFFSET_SELF:a}=Bt,l=c.handle.add(a).readPointer(),d,p=o.$borrowClassHandle(c);try{d=Q.dvmDecodeIndirectRef(l,p.value)}finally{p.unref(c)}let f=d.toMatchPattern(),u=Q.dvmHeapSourceGetBase(),h=Q.dvmHeapSourceGetLimit().sub(u).toInt32();Memory.scan(u,h,f,{onMatch:(g,y)=>{Q.dvmIsValidObject(g)&&G.perform(E=>{let C=E.handle.add(a).readPointer(),A,M=Q.addLocalReference(C,g);try{A=s.cast(M,o)}finally{E.deleteLocalRef(M)}if(r.onMatch(A)==="stop")return"stop"})},onError(g){},onComplete(){r.onComplete()}})}}openClassFile(e){return new Gt(e,null,this)}_getType(e,t=!0){return pr(e,t,this)}};function au(){return function(n,e,t,r){return Sr.call(this,n,e,t,r)}}function Sr(n,e,t,r=!0){if(n!==null)if(r){let o=t.newGlobalRef(n);this.$h=o,this.$r=Script.bindWeak(this,G.makeHandleDestructor(o))}else this.$h=n,this.$r=null;else this.$h=null,this.$r=null;return this.$t=e,new Proxy(this,oi)}oi={has(n,e){return e in n?!0:n.$has(e)},get(n,e,t){if(typeof e!="string"||e.startsWith("$")||e==="class")return n[e];let r=n.$find(e);return r!==null?r(t):n[e]},set(n,e,t,r){return n[e]=t,!0},ownKeys(n){return n.$list()},getOwnPropertyDescriptor(n,e){return Object.prototype.hasOwnProperty.call(n,e)?Object.getOwnPropertyDescriptor(n,e):{writable:!1,configurable:!0,enumerable:!0}}};Object.defineProperties(Sr.prototype,{[Symbol.for("new")]:{enumerable:!1,get(){return this.$getCtor("allocAndInit")}},$new:{enumerable:!0,get(){return this[Symbol.for("new")]}},[Symbol.for("alloc")]:{enumerable:!1,value(){let n=G.getEnv(),e=this.$borrowClassHandle(n);try{let t=n.allocObject(e.value);return this.$f.cast(t,this)}finally{e.unref(n)}}},$alloc:{enumerable:!0,get(){return this[Symbol.for("alloc")]}},[Symbol.for("init")]:{enumerable:!1,get(){return this.$getCtor("initOnly")}},$init:{enumerable:!0,get(){return this[Symbol.for("init")]}},[Symbol.for("dispose")]:{enumerable:!1,value(){let n=this.$r;n!==null&&(this.$r=null,Script.unbindWeak(n)),this.$h!==null&&(this.$h=void 0)}},$dispose:{enumerable:!0,get(){return this[Symbol.for("dispose")]}},[Symbol.for("clone")]:{enumerable:!1,value(n){let e=this.$C;return new e(this.$h,this.$t,n)}},$clone:{value(n){return this[Symbol.for("clone")](n)}},[Symbol.for("class")]:{enumerable:!1,get(){let n=G.getEnv(),e=this.$borrowClassHandle(n);try{let t=this.$f;return t.cast(e.value,t.use("java.lang.Class"))}finally{e.unref(n)}}},class:{enumerable:!0,get(){return this[Symbol.for("class")]}},[Symbol.for("className")]:{enumerable:!1,get(){let n=this.$h;return n===null?this.$n:G.getEnv().getObjectClassName(n)}},$className:{enumerable:!0,get(){return this[Symbol.for("className")]}},[Symbol.for("ownMembers")]:{enumerable:!1,get(){return this.$l.list()}},$ownMembers:{enumerable:!0,get(){return this[Symbol.for("ownMembers")]}},[Symbol.for("super")]:{enumerable:!1,get(){let n=G.getEnv(),e=this.$s.$C;return new e(this.$h,ni,n)}},$super:{enumerable:!0,get(){return this[Symbol.for("super")]}},[Symbol.for("s")]:{enumerable:!1,get(){let n=Object.getPrototypeOf(this),e=n.$_s;if(e===void 0){let t=G.getEnv(),r=this.$borrowClassHandle(t);try{let o=t.getSuperclass(r.value);if(o.isNull())e=null;else try{let i=t.getClassName(o),s=n.$f;if(e=s._getUsedClass(i),e===void 0)try{let c=uu(this);e=s._make(i,c,t)}finally{s._setUsedClass(i,e)}}finally{t.deleteLocalRef(o)}}finally{r.unref(t)}n.$_s=e}return e}},$s:{get(){return this[Symbol.for("s")]}},[Symbol.for("isSameObject")]:{enumerable:!1,value(n){return G.getEnv().isSameObject(n.$h,this.$h)}},$isSameObject:{value(n){return this[Symbol.for("isSameObject")](n)}},[Symbol.for("getCtor")]:{enumerable:!1,value(n){let e=this.$c,t=e[0];if(t===null){let r=G.getEnv(),o=this.$borrowClassHandle(r);try{t=pu(o.value,this.$w,r),e[0]=t}finally{o.unref(r)}}return t[n]}},$getCtor:{value(n){return this[Symbol.for("getCtor")](n)}},[Symbol.for("borrowClassHandle")]:{enumerable:!1,value(n){let e=this.$n,t=this.$f._classHandles,r=t.get(e);return r===void 0&&(r=new wr(this.$gch(n),n),t.set(e,r,n)),r.ref()}},$borrowClassHandle:{value(n){return this[Symbol.for("borrowClassHandle")](n)}},[Symbol.for("copyClassHandle")]:{enumerable:!1,value(n){let e=this.$borrowClassHandle(n);try{return n.newLocalRef(e.value)}finally{e.unref(n)}}},$copyClassHandle:{value(n){return this[Symbol.for("copyClassHandle")](n)}},[Symbol.for("getHandle")]:{enumerable:!1,value(n){let e=this.$h;if(e===void 0)throw new Error("Wrapper is disposed; perhaps it was borrowed from a hook instead of calling Java.retain() to make a long-lived wrapper?");return e}},$getHandle:{value(n){return this[Symbol.for("getHandle")](n)}},[Symbol.for("list")]:{enumerable:!1,value(){let n=this.$s,e=n!==null?n.$list():[],t=this.$l;return Array.from(new Set(e.concat(t.list())))}},$list:{get(){return this[Symbol.for("list")]}},[Symbol.for("has")]:{enumerable:!1,value(n){if(this.$m.has(n)||this.$l.has(n))return!0;let r=this.$s;return!!(r!==null&&r.$has(n))}},$has:{value(n){return this[Symbol.for("has")](n)}},[Symbol.for("find")]:{enumerable:!1,value(n){let e=this.$m,t=e.get(n);if(t!==void 0)return t;let o=this.$l.find(n);if(o!==null){let s=G.getEnv(),c=this.$borrowClassHandle(s);try{t=fu(n,o,c.value,this.$w,s)}finally{c.unref(s)}return e.set(n,t),t}let i=this.$s;return i!==null?i.$find(n):null}},$find:{value(n){return this[Symbol.for("find")](n)}},[Symbol.for("toJSON")]:{enumerable:!1,value(){let n=this.$n;if(this.$h===null)return`<class: ${n}>`;let t=this.$className;return n===t?`<instance: ${n}>`:`<instance: ${n}, $className: ${t}>`}},toJSON:{get(){return this[Symbol.for("toJSON")]}}});function wr(n,e){this.value=e.newGlobalRef(n),e.deleteLocalRef(n),this.refs=1}wr.prototype.ref=function(){return this.refs++,this};wr.prototype.unref=function(n){--this.refs===0&&n.deleteGlobalRef(this.value)};function cu(n,e){n.unref(e)}function lu(n){let e=n.replace(/\./g,"/");return function(t){let r=$t();di(r);try{return t.findClass(e)}finally{ui(r)}}}function du(n,e,t){return _r===null&&(Yo=t.vaMethod("pointer",["pointer"]),_r=e.loadClass.overload("java.lang.String").handle),t=null,function(r){let o=r.newStringUtf(n),i=$t();di(i);try{let s=Yo(r.handle,e.$h,_r,o);return r.throwIfExceptionPending(),s}finally{ui(i),r.deleteLocalRef(o)}}}function uu(n){return function(e){let t=n.$borrowClassHandle(e);try{return e.getSuperclass(t.value)}finally{t.unref(e)}}}function pu(n,e,t){let{$n:r,$f:o}=e,i=Au(r),s=t.javaLangClass(),c=t.javaLangReflectConstructor(),a=t.vaMethod("pointer",[]),l=t.vaMethod("uint8",[]),d=[],p=[],f=o._getType(r,!1),u=o._getType("void",!1),_=a(t.handle,n,s.getDeclaredConstructors);try{let h=t.getArrayLength(_);if(h!==0)for(let g=0;g!==h;g++){let y,E,C=t.getObjectArrayElement(_,g);try{y=t.fromReflectedMethod(C),E=a(t.handle,C,c.getGenericParameterTypes)}finally{t.deleteLocalRef(C)}let A;try{A=vr(t,E).map(M=>o._getType(M))}finally{t.deleteLocalRef(E)}d.push(Ye(i,e,mr,y,f,A,t)),p.push(Ye(i,e,Ne,y,u,A,t))}else{if(l(t.handle,n,s.isInterface))throw new Error("cannot instantiate an interface");let y=t.javaLangObject(),E=t.getMethodId(y,"<init>","()V");d.push(Ye(i,e,mr,E,f,[],t)),p.push(Ye(i,e,Ne,E,u,[],t))}}finally{t.deleteLocalRef(_)}if(p.length===0)throw new Error("no supported overloads");return{allocAndInit:yr(d),initOnly:yr(p)}}function fu(n,e,t,r,o){return e.startsWith("m")?hu(n,e,t,r,o):wu(n,e,t,r,o)}function hu(n,e,t,r,o){let{$f:i}=r,s=e.split(":").slice(1),c=o.javaLangReflectMethod(),a=o.vaMethod("pointer",[]),l=o.vaMethod("uint8",[]),d=s.map(f=>{let u=f[0]==="s"?yt:Ne,_=ptr(f.substr(1)),h,g=[],y=o.toReflectedMethod(t,_,u===yt?1:0);try{let E=!!l(o.handle,y,c.isVarArgs),C=a(o.handle,y,c.getGenericReturnType);o.throwIfExceptionPending();try{h=i._getType(o.getTypeName(C))}finally{o.deleteLocalRef(C)}let A=a(o.handle,y,c.getParameterTypes);try{let M=o.getArrayLength(A);for(let O=0;O!==M;O++){let N=o.getObjectArrayElement(A,O),k;try{k=E&&O===M-1?o.getArrayTypeName(N):o.getTypeName(N)}finally{o.deleteLocalRef(N)}let S=i._getType(k);g.push(S)}}finally{o.deleteLocalRef(A)}}catch{return null}finally{o.deleteLocalRef(y)}return Ye(n,r,u,_,h,g,o)}).filter(f=>f!==null);if(d.length===0)throw new Error("No supported overloads");n==="valueOf"&&Eu(d);let p=yr(d);return function(f){return p}}function yr(n){let e=_u();return Object.setPrototypeOf(e,ii),e._o=n,e}function _u(){let n=function(){return n.invoke(this,arguments)};return n}ii=Object.create(Function.prototype,{overloads:{enumerable:!0,get(){return this._o}},overload:{value(...n){let e=this._o,t=n.length,r=n.join(":");for(let o=0;o!==e.length;o++){let i=e[o],{argumentTypes:s}=i;if(s.length!==t)continue;if(s.map(a=>a.className).join(":")===r)return i}br(this.methodName,this.overloads,"specified argument types do not match any of:")}},methodName:{enumerable:!0,get(){return this._o[0].methodName}},holder:{enumerable:!0,get(){return this._o[0].holder}},type:{enumerable:!0,get(){return this._o[0].type}},handle:{enumerable:!0,get(){return Je(this),this._o[0].handle}},implementation:{enumerable:!0,get(){return Je(this),this._o[0].implementation},set(n){Je(this),this._o[0].implementation=n}},returnType:{enumerable:!0,get(){return Je(this),this._o[0].returnType}},argumentTypes:{enumerable:!0,get(){return Je(this),this._o[0].argumentTypes}},canInvokeWith:{enumerable:!0,get(n){return Je(this),this._o[0].canInvokeWith}},clone:{enumerable:!0,value(n){return Je(this),this._o[0].clone(n)}},invoke:{value(n,e){let t=this._o,r=n.$h!==null;for(let o=0;o!==t.length;o++){let i=t[o];if(i.canInvokeWith(e)){if(i.type===Ne&&!r){let s=this.methodName;if(s==="toString")return`<class: ${n.$n}>`;throw new Error(s+": cannot call instance method without an instance")}return i.apply(n,e)}}if(this.methodName==="toString")return`<class: ${n.$n}>`;br(this.methodName,this.overloads,"argument types do not match any of:")}}});function Xo(n,e,t){return`${e.className} ${n}(${t.map(r=>r.className).join(", ")})`}function Je(n){let e=n._o;e.length>1&&br(e[0].methodName,e,"has more than one overload, use .overload(<signature>) to choose from:")}function br(n,e,t){let o=e.slice().sort((i,s)=>i.argumentTypes.length-s.argumentTypes.length).map(i=>i.argumentTypes.length>0?".overload('"+i.argumentTypes.map(c=>c.className).join("', '")+"')":".overload()");throw new Error(`${n}(): ${t}
	${o.join(`
	`)}`)}function Ye(n,e,t,r,o,i,s,c){let a=o.type,l=i.map(f=>f.type);s===null&&(s=G.getEnv());let d,p;return t===Ne?(d=s.vaMethod(a,l,c),p=s.nonvirtualVaMethod(a,l,c)):t===yt?(d=s.staticVaMethod(a,l,c),p=d):(d=s.constructor(l,c),p=d),mu([n,e,t,r,o,i,d,p])}function mu(n){let e=gu();return Object.setPrototypeOf(e,si),e._p=n,e}function gu(){let n=function(){return n.invoke(this,arguments)};return n}si=Object.create(Function.prototype,{methodName:{enumerable:!0,get(){return this._p[0]}},holder:{enumerable:!0,get(){return this._p[1]}},type:{enumerable:!0,get(){return this._p[2]}},handle:{enumerable:!0,get(){return this._p[3]}},implementation:{enumerable:!0,get(){let n=this._r;return n!==void 0?n:null},set(n){let e=this._p,t=e[1];if(e[2]===mr)throw new Error("Reimplementing $new is not possible; replace implementation of $init instead");let o=this._r;if(o!==void 0&&(t.$f._patchedMethods.delete(this),o._m.revert(G),this._r=void 0),n!==null){let[i,s,c,a,l,d]=e,p=ci(i,s,c,l,d,n,this),f=ti(a);p._m=f,this._r=p,f.replace(p,c===Ne,d,G,Q),t.$f._patchedMethods.add(this)}}},returnType:{enumerable:!0,get(){return this._p[4]}},argumentTypes:{enumerable:!0,get(){return this._p[5]}},canInvokeWith:{enumerable:!0,value(n){let e=this._p[5];return n.length!==e.length?!1:e.every((t,r)=>t.isCompatible(n[r]))}},clone:{enumerable:!0,value(n){let e=this._p.slice(0,6);return Ye(...e,null,n)}},invoke:{value(n,e){let t=G.getEnv(),r=this._p,o=r[2],i=r[4],s=r[5],c=this._r,a=o===Ne,l=e.length,d=2+l;t.pushLocalFrame(d);let p=null;try{let f;a?f=n.$getHandle():(p=n.$borrowClassHandle(t),f=p.value);let u,_=n.$t;c===void 0?u=r[3]:(u=c._m.resolveTarget(n,a,t,Q),ri&&c._c.has($t())&&(_=ni));let h=[t.handle,f,u];for(let E=0;E!==l;E++)h.push(s[E].toJni(e[E],t));let g;_===Jt?g=r[6]:(g=r[7],a&&h.splice(2,0,n.$copyClassHandle(t)));let y=g.apply(null,h);return t.throwIfExceptionPending(),i.fromJni(y,t,!0)}finally{p!==null&&p.unref(t),t.popLocalFrame(NULL)}}},toString:{enumerable:!0,value(){return`function ${this.methodName}(${this.argumentTypes.map(n=>n.className).join(", ")}): ${this.returnType.className}`}}});function ci(n,e,t,r,o,i,s=null){let c=new Set,a=yu([n,e,t,r,o,i,s,c]),l=new NativeCallback(a,r.type,["pointer","pointer"].concat(o.map(d=>d.type)));return l._c=c,l}function yu(n){return function(){return bu(arguments,n)}}function bu(n,e){let t=new b(n[0],G),[r,o,i,s,c,a,l,d]=e,p=[],f;if(i===Ne){let h=o.$C;f=new h(n[1],Jt,t,!1)}else f=o;let u=$t();t.pushLocalFrame(3);let _=!0;G.link(u,t);try{d.add(u);let h;l===null||!Xe.has(u)?h=a:h=l;let g=[],y=n.length-2;for(let A=0;A!==y;A++){let O=c[A].fromJni(n[2+A],t,!1);g.push(O),p.push(O)}let E=h.apply(f,g);if(!s.isCompatible(E))throw new Error(`Implementation for ${r} expected return value compatible with ${s.className}`);let C=s.toJni(E,t);return s.type==="pointer"&&(C=t.popLocalFrame(C),_=!1,p.push(E)),C}catch(h){let g=h.$h;return g!==void 0?t.throw(g):Script.nextTick(()=>{throw h}),s.defaultValue}finally{G.unlink(u),_&&t.popLocalFrame(NULL),d.delete(u),p.forEach(h=>{if(h===null)return;let g=h.$dispose;g!==void 0&&g.call(h)})}}function Eu(n){let{holder:e,type:t}=n[0];n.some(o=>o.type===t&&o.argumentTypes.length===0)||n.push(vu([e,t]))}function vu(n){let e=Su();return Object.setPrototypeOf(e,ai),e._p=n,e}function Su(){return function(){return this}}ai=Object.create(Function.prototype,{methodName:{enumerable:!0,get(){return"valueOf"}},holder:{enumerable:!0,get(){return this._p[0]}},type:{enumerable:!0,get(){return this._p[1]}},handle:{enumerable:!0,get(){return NULL}},implementation:{enumerable:!0,get(){return null},set(n){}},returnType:{enumerable:!0,get(){let n=this.holder;return n.$f.use(n.$n)}},argumentTypes:{enumerable:!0,get(){return[]}},canInvokeWith:{enumerable:!0,value(n){return n.length===0}},clone:{enumerable:!0,value(n){throw new Error("Invalid operation")}}});function wu(n,e,t,r,o){let i=e[2]==="s"?hr:gr,s=ptr(e.substr(3)),{$f:c}=r,a,l=o.toReflectedField(t,s,i===hr?1:0);try{a=o.vaMethod("pointer",[])(o.handle,l,o.javaLangReflectField().getGenericType),o.throwIfExceptionPending()}finally{o.deleteLocalRef(l)}let d;try{d=c._getType(o.getTypeName(a))}finally{o.deleteLocalRef(a)}let p,f,u=d.type;return i===hr?(p=o.getStaticField(u),f=o.setStaticField(u)):(p=o.getField(u),f=o.setField(u)),Iu([i,d,s,p,f])}function Iu(n){return function(e){return new li([e].concat(n))}}function li(n){this._p=n}Object.defineProperties(li.prototype,{value:{enumerable:!0,get(){let[n,e,t,r,o]=this._p,i=G.getEnv();i.pushLocalFrame(4);let s=null;try{let c;if(e===gr){if(c=n.$getHandle(),c===null)throw new Error("Cannot access an instance field without an instance")}else s=n.$borrowClassHandle(i),c=s.value;let a=o(i.handle,c,r);return i.throwIfExceptionPending(),t.fromJni(a,i,!0)}finally{s!==null&&s.unref(i),i.popLocalFrame(NULL)}},set(n){let[e,t,r,o,,i]=this._p,s=G.getEnv();s.pushLocalFrame(4);let c=null;try{let a;if(t===gr){if(a=e.$getHandle(),a===null)throw new Error("Cannot access an instance field without an instance")}else c=e.$borrowClassHandle(s),a=c.value;if(!r.isCompatible(n))throw new Error(`Expected value compatible with ${r.className}`);let l=r.toJni(n,s);i(s.handle,a,o,l),s.throwIfExceptionPending()}finally{c!==null&&c.unref(s),s.popLocalFrame(NULL)}}},holder:{enumerable:!0,get(){return this._p[0]}},fieldType:{enumerable:!0,get(){return this._p[1]}},fieldReturnType:{enumerable:!0,get(){return this._p[2]}},toString:{enumerable:!0,value(){let n=`Java.Field{holder: ${this.holder}, fieldType: ${this.fieldType}, fieldReturnType: ${this.fieldReturnType}, value: ${this.value}}`;return n.length<200?n:`Java.Field{
	holder: ${this.holder},
	fieldType: ${this.fieldType},
	fieldReturnType: ${this.fieldReturnType},
	value: ${this.value},
}`.split(`
`).map(t=>t.length>200?t.slice(0,t.indexOf(" ")+1)+"...,":t).join(`
`)}}});var Gt=class n{static fromBuffer(e,t){let r=ei(t),o=r.getCanonicalPath().toString(),i=new File(o,"w");return i.write(e.buffer),i.close(),Cu(o,t),new n(o,r,t)}constructor(e,t,r){this.path=e,this.file=t,this._factory=r}load(){let{_factory:e}=this,{codeCacheDir:t}=e,r=e.use("dalvik.system.DexClassLoader"),o=e.use("java.io.File"),i=this.file;if(i===null&&(i=e.use("java.io.File").$new(this.path)),!i.exists())throw new Error("File not found");o.$new(t).mkdirs(),e.loader=r.$new(i.getCanonicalPath(),t,null,e.loader),G.preventDetachDueToClassLoader()}getClassNames(){let{_factory:e}=this,t=e.use("dalvik.system.DexFile"),r=ei(e),o=t.loadDex(this.path,r.getCanonicalPath(),0),i=[],s=o.entries();for(;s.hasMoreElements();)i.push(s.nextElement().toString());return i}};function ei(n){let{cacheDir:e,tempFileNaming:t}=n,r=n.use("java.io.File"),o=r.$new(e);return o.mkdirs(),r.createTempFile(t.prefix,t.suffix+".dex",o)}function Cu(n,e){e.use("java.io.File").$new(n).setWritable(!1,!1)}function Lu(){switch(pe.state){case"empty":{pe.state="pending";let n=pe.factories[0],e=n.use("java.util.HashMap"),t=n.use("java.lang.Integer");pe.loaders=e.$new(),pe.Integer=t;let r=n.loader;return r!==null&&Er(n,r),pe.state="ready",pe}case"pending":do Thread.sleep(.05);while(pe.state==="pending");return pe;case"ready":return pe}}function Er(n,e){let{factories:t,loaders:r,Integer:o}=pe,i=o.$new(t.indexOf(n));r.put(e,i);for(let s=e.getParent();s!==null&&!r.containsKey(s);s=s.getParent())r.put(s,i)}function di(n){let e=Xe.get(n);e===void 0&&(e=0),e++,Xe.set(n,e)}function ui(n){let e=Xe.get(n);if(e===void 0)throw new Error(`Thread ${n} is not ignored`);e--,e===0?Xe.delete(n):Xe.set(n,e)}function Au(n){return n.slice(n.lastIndexOf(".")+1)}function vr(n,e){let t=[],r=n.getArrayLength(e);for(let o=0;o!==r;o++){let i=n.getObjectArrayElement(e,o);try{t.push(n.getTypeName(i))}finally{n.deleteLocalRef(i)}}return t}function Tu(n){let e=n.split(".");return e[e.length-1]+".java"}var xu=4,pi=Process.pointerSize,Ir=class{ACC_PUBLIC=1;ACC_PRIVATE=2;ACC_PROTECTED=4;ACC_STATIC=8;ACC_FINAL=16;ACC_SYNCHRONIZED=32;ACC_BRIDGE=64;ACC_VARARGS=128;ACC_NATIVE=256;ACC_ABSTRACT=1024;ACC_STRICT=2048;ACC_SYNTHETIC=4096;constructor(){this.classFactory=null,this.ClassFactory=Oe,this.vm=null,this.api=null,this._initialized=!1,this._apiError=null,this._wakeupHandler=null,this._pollListener=null,this._pendingMainOps=[],this._pendingVmOps=[],this._cachedIsAppProcess=null;try{this._tryInitialize()}catch{}}_tryInitialize(){if(this._initialized)return!0;if(this._apiError!==null)throw this._apiError;let e;try{e=ht(),this.api=e}catch(r){throw this._apiError=r,r}if(e===null)return!1;let t=new Ce(e);return this.vm=t,Zo(t),Oe._initialize(t,e),this.classFactory=new Oe,this._initialized=!0,!0}_dispose(){if(this.api===null)return;let{vm:e}=this;e.perform(t=>{Oe._disposeAll(t),b.dispose(t)}),Script.nextTick(()=>{Ce.dispose(e)})}get available(){return this._tryInitialize()}get androidVersion(){return pt()}synchronized(e,t){let{$h:r=e}=e;if(!(r instanceof NativePointer))throw new Error("Java.synchronized: the first argument `obj` must be either a pointer or a Java instance");let o=this.vm.getEnv();ue("VM::MonitorEnter",o.monitorEnter(r));try{t()}finally{o.monitorExit(r)}}enumerateLoadedClasses(e){this._checkAvailable();let{flavor:t}=this.api;t==="jvm"?this._enumerateLoadedClassesJvm(e):t==="art"?this._enumerateLoadedClassesArt(e):this._enumerateLoadedClassesDalvik(e)}enumerateLoadedClassesSync(){let e=[];return this.enumerateLoadedClasses({onMatch(t){e.push(t)},onComplete(){}}),e}enumerateClassLoaders(e){this._checkAvailable();let{flavor:t}=this.api;if(t==="jvm")this._enumerateClassLoadersJvm(e);else if(t==="art")this._enumerateClassLoadersArt(e);else throw new Error("Enumerating class loaders is not supported on Dalvik")}enumerateClassLoadersSync(){let e=[];return this.enumerateClassLoaders({onMatch(t){e.push(t)},onComplete(){}}),e}_enumerateLoadedClassesJvm(e){let{api:t,vm:r}=this,{jvmti:o}=t,i=r.getEnv(),s=Memory.alloc(xu),c=Memory.alloc(pi);o.getLoadedClasses(s,c);let a=s.readS32(),l=c.readPointer(),d=[];for(let p=0;p!==a;p++)d.push(l.add(p*pi).readPointer());o.deallocate(l);try{for(let p of d){let f=i.getClassName(p);e.onMatch(f,p)}e.onComplete()}finally{d.forEach(p=>{i.deleteLocalRef(p)})}}_enumerateClassLoadersJvm(e){this.choose("java.lang.ClassLoader",e)}_enumerateLoadedClassesArt(e){let{vm:t,api:r}=this,o=t.getEnv(),i=r["art::JavaVMExt::AddGlobalRef"],{vm:s}=r;Ee(t,o,c=>{let a=qn(l=>{let d=i(s,c,l);try{let p=o.getClassName(d);e.onMatch(p,d)}finally{o.deleteGlobalRef(d)}return!0});r["art::ClassLinker::VisitClasses"](r.artClassLinker.address,a)}),e.onComplete()}_enumerateClassLoadersArt(e){let{classFactory:t,vm:r,api:o}=this,i=r.getEnv(),s=o["art::ClassLinker::VisitClassLoaders"];if(s===void 0)throw new Error("This API is only available on Android >= 7.0");let c=t.use("java.lang.ClassLoader"),a=[],l=o["art::JavaVMExt::AddGlobalRef"],{vm:d}=o;Ee(r,i,p=>{let f=Kn(u=>(a.push(l(d,p,u)),!0));Zn(()=>{s(o.artClassLinker.address,f)})});try{a.forEach(p=>{let f=t.cast(p,c);e.onMatch(f)})}finally{a.forEach(p=>{i.deleteGlobalRef(p)})}e.onComplete()}_enumerateLoadedClassesDalvik(e){let{api:t}=this,r=ptr("0xcbcacccd"),o=172,i=8,c=t.gDvm.add(o).readPointer(),a=c.readS32(),d=c.add(12).readPointer(),p=a*i;for(let f=0;f<p;f+=i){let _=d.add(f).add(4).readPointer();if(_.isNull()||_.equals(r))continue;let g=_.add(24).readPointer().readUtf8String();if(g.startsWith("L")){let y=g.substring(1,g.length-1).replace(/\//g,".");e.onMatch(y)}}e.onComplete()}enumerateMethods(e){let{classFactory:t}=this,r=this.vm.getEnv(),o=t.use("java.lang.ClassLoader");return ze.enumerateMethods(e,this.api,r).map(i=>{let s=i.loader;return i.loader=s!==null?t.wrap(s,o,r):null,i})}scheduleOnMainThread(e){this.performNow(()=>{this._pendingMainOps.push(e);let{_wakeupHandler:t}=this;if(t===null){let{classFactory:r}=this,o=r.use("android.os.Handler"),i=r.use("android.os.Looper");t=o.$new(i.getMainLooper()),this._wakeupHandler=t}this._pollListener===null&&(this._pollListener=Interceptor.attach(Process.getModuleByName("libc.so").getExportByName("epoll_wait"),this._makePollHook()),Interceptor.flush()),t.sendEmptyMessage(1)})}_makePollHook(){let e=Process.id,{_pendingMainOps:t}=this;return function(){if(this.threadId!==e)return;let r;for(;(r=t.shift())!==void 0;)try{r()}catch(o){Script.nextTick(()=>{throw o})}}}perform(e){if(this._checkAvailable(),!this._isAppProcess()||this.classFactory.loader!==null)try{this.vm.perform(e)}catch(t){Script.nextTick(()=>{throw t})}else this._pendingVmOps.push(e),this._pendingVmOps.length===1&&this._performPendingVmOpsWhenReady()}performNow(e){return this._checkAvailable(),this.vm.perform(()=>{let{classFactory:t}=this;if(this._isAppProcess()&&t.loader===null){let o=t.use("android.app.ActivityThread").currentApplication();o!==null&&fi(t,o)}return e()})}_performPendingVmOpsWhenReady(){this.vm.perform(()=>{let{classFactory:e}=this,t=e.use("android.app.ActivityThread"),r=t.currentApplication();if(r!==null){fi(e,r),this._performPendingVmOps();return}let o=this,i=!1,s="early",c=t.handleBindApplication;c.implementation=function(d){if(d.instrumentationName.value!==null){s="late";let f=e.use("android.app.LoadedApk").makeApplication;f.implementation=function(u,_){return i||(i=!0,hi(e,this),o._performPendingVmOps()),f.apply(this,arguments)}}c.apply(this,arguments)};let l=t.getPackageInfo.overloads.map(d=>[d.argumentTypes.length,d]).sort(([d],[p])=>p-d).map(([d,p])=>p)[0];l.implementation=function(...d){let p=l.call(this,...d);return!i&&s==="early"&&(i=!0,hi(e,p),o._performPendingVmOps()),p}})}_performPendingVmOps(){let{vm:e,_pendingVmOps:t}=this,r;for(;(r=t.shift())!==void 0;)try{e.perform(r)}catch(o){Script.nextTick(()=>{throw o})}}use(e,t){return this.classFactory.use(e,t)}openClassFile(e){return this.classFactory.openClassFile(e)}choose(e,t){this.classFactory.choose(e,t)}retain(e){return this.classFactory.retain(e)}cast(e,t){return this.classFactory.cast(e,t)}array(e,t){return this.classFactory.array(e,t)}backtrace(e){return Wn(this.vm,e)}isMainThread(){let e=this.classFactory.use("android.os.Looper"),t=e.getMainLooper(),r=e.myLooper();return r===null?!1:t.$isSameObject(r)}registerClass(e){return this.classFactory.registerClass(e)}deoptimizeEverything(){let{vm:e}=this;return er(e,e.getEnv())}deoptimizeBootImage(){let{vm:e}=this;return tr(e,e.getEnv())}deoptimizeMethod(e){let{vm:t}=this;return Xn(t,t.getEnv(),e)}_checkAvailable(){if(!this.available)throw new Error("Java API not available")}_isAppProcess(){let e=this._cachedIsAppProcess;if(e===null){if(this.api.flavor==="jvm")return e=!1,this._cachedIsAppProcess=e,e;let t=new NativeFunction(Module.getGlobalExportByName("readlink"),"pointer",["pointer","pointer","pointer"],{exceptions:"propagate"}),r=Memory.allocUtf8String("/proc/self/exe"),o=1024,i=Memory.alloc(o),s=t(r,i,ptr(o)).toInt32();if(s!==-1){let c=i.readUtf8String(s);e=/^\/system\/bin\/app_process/.test(c)}else e=!0;this._cachedIsAppProcess=e}return e}};function fi(n,e){let t=n.use("android.os.Process");n.loader=e.getClassLoader(),t.myUid()===t.SYSTEM_UID.value?(n.cacheDir="/data/system",n.codeCacheDir="/data/dalvik-cache"):"getCodeCacheDir"in e?(n.cacheDir=e.getCacheDir().getCanonicalPath(),n.codeCacheDir=e.getCodeCacheDir().getCanonicalPath()):(n.cacheDir=e.getFilesDir().getCanonicalPath(),n.codeCacheDir=e.getCacheDir().getCanonicalPath())}function hi(n,e){let t=n.use("java.io.File");n.loader=e.getClassLoader();let r=t.$new(e.getDataDir()).getCanonicalPath();n.cacheDir=r,n.codeCacheDir=r+"/cache"}var Cr=new Ir;Script.bindWeak(Cr,()=>{Cr._dispose()});var je=Cr;typeof Memory.readByteArray>"u"&&(Memory.readByteArray=function(n,e){return ptr(n).readByteArray(e)},Memory.readPointer=function(n){return ptr(n).readPointer()},Memory.readUtf8String=function(n){return ptr(n).readUtf8String()},Memory.readUInt=function(n){return ptr(n).readUInt()});function bt(n){if(n==null)return null;for(var e=new Uint8Array(n),t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r="",o=0;o+3<=e.length;o+=3)r+=t[e[o]>>2],r+=t[(e[o]&3)<<4|e[o+1]>>4],r+=t[(e[o+1]&15)<<2|e[o+2]>>6],r+=t[e[o+2]&63];var i=e.length-o;return i===1?(r+=t[e[o]>>2],r+=t[(e[o]&3)<<4],r+="=="):i===2&&(r+=t[e[o]>>2],r+=t[(e[o]&3)<<4|e[o+1]>>4],r+=t[(e[o+1]&15)<<2],r+="="),r}function $(n,e){send(Object.assign({kind:n},e||{}))}function ku(n){var e=n.add(Process.pointerSize).readUInt();return n.add(Process.pointerSize*2).readPointer().readByteArray(e)}function Nu(n,e){Interceptor.attach(ptr(n),{onEnter:function(t){this.keyData=t[0],this.keyDataLength=t[1]},onLeave:function(t){try{if(t.toInt32()!==0)return;var r=Memory.readPointer(this.keyDataLength).toInt32(),o=Memory.readByteArray(this.keyData,r);$("keybox",{data:bt(o)}),$("log",{message:e+": OEMCrypto_GetKeyData size="+r})}catch(i){$("log",{message:e+": OEMCrypto_GetKeyData read failed: "+i})}}})}function Mu(n,e){Interceptor.attach(ptr(n),{onEnter:function(t){this.session=t[0],this.wrappedKey=t[1],this.wrappedKeyLength=t[2]},onLeave:function(t){try{if(t.toInt32()!==0)return;var r=this.wrappedKeyLength.toInt32(),o=Memory.readByteArray(this.wrappedKey,r);$("device_rsa_key",{data:bt(o)}),$("log",{message:e+": OEMCrypto_LoadDeviceRSAKey size="+r})}catch(i){$("log",{message:e+": OEMCrypto_LoadDeviceRSAKey read failed: "+i})}}})}function Ru(n,e){Interceptor.attach(ptr(n),{onEnter:function(t){this.wrappedKeyOut=t[9],this.wrappedKeyOutLength=t[10]},onLeave:function(t){try{if(t.toInt32()!==0)return;var r=Memory.readPointer(this.wrappedKeyOutLength).toInt32(),o=Memory.readByteArray(this.wrappedKeyOut,r);$("device_rsa_key",{data:bt(o)}),$("log",{message:e+": OEMCrypto_RewrapDeviceRSAKey size="+r})}catch(i){$("log",{message:e+": OEMCrypto_RewrapDeviceRSAKey read failed: "+i})}}})}function Ou(n,e){Interceptor.attach(ptr(n),{onLeave:function(t){try{$("log",{message:e+": OEMCrypto_LoadKeys status="+t.toInt32()})}catch(r){$("log",{message:e+": OEMCrypto_LoadKeys log failed: "+r})}}})}function ju(n,e){Interceptor.attach(ptr(n),{onEnter:function(t){this.ret=t[4]},onLeave:function(){try{if(!this.ret)return;var t=ku(this.ret);$("device_client_id",{data:bt(t)}),$("log",{message:e+": PrepareKeyRequest captured license request"})}catch(r){$("log",{message:e+": PrepareKeyRequest read failed: "+r})}}})}function Pu(n,e){var t=n.name,r=n.address;try{t==="_lcc04"||t==="_oecc04"||t.indexOf("GetKeyData")!==-1?Nu(r,e):t==="_lcc18"||t==="_oecc18"||t.indexOf("RewrapDeviceRSAKey")!==-1?Ru(r,e):t==="_lcc19"||t==="_oecc19"||t.indexOf("LoadDeviceRSAKey")!==-1?Mu(r,e):t==="OEMCrypto_LoadKeys_Back_Compat"||t.indexOf("LoadKeys")!==-1?Ou(r,e):t.indexOf("PrepareKeyRequest")!==-1&&ju(r,e)}catch(o){$("log",{message:"attach failed for "+t+" in "+e+": "+o})}}function Fu(){["libwvhidl.so","libwvdrmengine.so","liboemcrypto.so","libmediadrm.so"].forEach(function(n){var e;try{e=Process.getModuleByName(n)}catch{return}try{$("log",{message:"hooking "+n+" @ "+e.base})}catch{}try{e.enumerateExports().forEach(function(t){Pu(t,n)})}catch(t){$("log",{message:"enumerateExports failed for "+n+": "+t})}})}function Du(){try{var n=je.use("android.media.MediaDrm");n.getKeyRequest.overload("[B","[B","java.lang.String","int","java.util.HashMap").implementation=function(e,t,r,o,i){return t&&$("pssh",{data:bt(t)}),this.getKeyRequest(e,t,r,o,i)}}catch(e){$("log",{message:"MediaDrm.getKeyRequest hook failed: "+e})}}function Uu(){try{var n=je.use("okhttp3.Request$Builder");n.url.overload("java.lang.String").implementation=function(e){return $("license_url",{url:e}),this.url(e)},n.addHeader.implementation=function(e,t){var r={};return r[e]=t,$("license_headers",{headers:r}),this.addHeader(e,t)}}catch(e){$("log",{message:"okhttp not present: "+e})}}function Bu(){try{var n=je.use("java.net.URL");n.openConnection.overload().implementation=function(){var t=this.openConnection();try{$("license_url",{url:this.toString()})}catch{}return t}}catch(t){$("log",{message:"URL.openConnection hook failed: "+t})}try{var e=je.use("java.net.HttpURLConnection");e.setRequestProperty.implementation=function(t,r){var o={};return o[t]=r,$("license_headers",{headers:o}),this.setRequestProperty(t,r)}}catch(t){$("log",{message:"HttpURLConnection.setRequestProperty hook failed: "+t})}}function zu(){["androidx.media3.exoplayer.drm.HttpMediaDrmCallback","com.google.android.exoplayer2.drm.HttpMediaDrmCallback"].forEach(function(n){try{var e=je.use(n);e.executePost.overloads.forEach(function(t){t.implementation=function(){try{var r=arguments[1];r&&$("license_url",{url:""+r});var o=arguments[3];if(o&&o.keySet){for(var i=o.keySet().iterator(),s={};i.hasNext();){var c=i.next();s[""+c]=""+o.get(c)}$("license_headers",{headers:s})}}catch(a){$("log",{message:n+".executePost read failed: "+a})}return t.apply(this,arguments)}})}catch{}})}function Vu(){if(!je.available){$("log",{message:"no JVM in this process -- Java capture hooks not installed"});return}je.perform(function(){Du(),Uu(),Bu(),zu()})}rpc.exports={hookNative:Fu,hookJava:Vu};

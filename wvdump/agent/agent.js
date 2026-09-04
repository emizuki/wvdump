📦
244593 /wvdump/agent/agent.src.js
✄
var bi=Object.defineProperty;var Ei=(n,e)=>{for(var t in e)bi(n,t,{get:e[t],enumerable:!0})};var Ie=[],be=[],Zt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(let n=0,e=Zt.length;n<e;++n)Ie[n]=Zt[n],be[Zt.charCodeAt(n)]=n;be[45]=62;be[95]=63;function vi(n){let e=n.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");let t=n.indexOf("=");t===-1&&(t=e);let r=t===e?0:4-t%4;return[t,r]}function Si(n,e,t){return(e+t)*3/4-t}function xr(n){let e=vi(n),t=e[0],r=e[1],o=new Uint8Array(Si(n,t,r)),i=0,s=r>0?t-4:t,c;for(c=0;c<s;c+=4){let a=be[n.charCodeAt(c)]<<18|be[n.charCodeAt(c+1)]<<12|be[n.charCodeAt(c+2)]<<6|be[n.charCodeAt(c+3)];o[i++]=a>>16&255,o[i++]=a>>8&255,o[i++]=a&255}if(r===2){let a=be[n.charCodeAt(c)]<<2|be[n.charCodeAt(c+1)]>>4;o[i++]=a&255}if(r===1){let a=be[n.charCodeAt(c)]<<10|be[n.charCodeAt(c+1)]<<4|be[n.charCodeAt(c+2)]>>2;o[i++]=a>>8&255,o[i++]=a&255}return o}function wi(n){return Ie[n>>18&63]+Ie[n>>12&63]+Ie[n>>6&63]+Ie[n&63]}function Ii(n,e,t){let r=[];for(let o=e;o<t;o+=3){let i=(n[o]<<16&16711680)+(n[o+1]<<8&65280)+(n[o+2]&255);r.push(wi(i))}return r.join("")}function qt(n){let e=n.length,t=e%3,r=[],o=16383;for(let i=0,s=e-t;i<s;i+=o)r.push(Ii(n,i,i+o>s?s:i+o));if(t===1){let i=n[e-1];r.push(Ie[i>>2]+Ie[i<<4&63]+"==")}else if(t===2){let i=(n[e-2]<<8)+n[e-1];r.push(Ie[i>>10]+Ie[i>>4&63]+Ie[i<<2&63]+"=")}return r.join("")}function ot(n,e,t,r,o){let i,s,c=o*8-r-1,a=(1<<c)-1,l=a>>1,d=-7,p=t?o-1:0,f=t?-1:1,u=n[e+p];for(p+=f,i=u&(1<<-d)-1,u>>=-d,d+=c;d>0;)i=i*256+n[e+p],p+=f,d-=8;for(s=i&(1<<-d)-1,i>>=-d,d+=r;d>0;)s=s*256+n[e+p],p+=f,d-=8;if(i===0)i=1-l;else{if(i===a)return s?NaN:(u?-1:1)*(1/0);s=s+Math.pow(2,r),i=i-l}return(u?-1:1)*s*Math.pow(2,i-r)}function Kt(n,e,t,r,o,i){let s,c,a,l=i*8-o-1,d=(1<<l)-1,p=d>>1,f=o===23?Math.pow(2,-24)-Math.pow(2,-77):0,u=r?0:i-1,_=r?1:-1,h=e<0||e===0&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(c=isNaN(e)?1:0,s=d):(s=Math.floor(Math.log(e)/Math.LN2),e*(a=Math.pow(2,-s))<1&&(s--,a*=2),s+p>=1?e+=f/a:e+=f*Math.pow(2,1-p),e*a>=2&&(s++,a/=2),s+p>=d?(c=0,s=d):s+p>=1?(c=(e*a-1)*Math.pow(2,o),s=s+p):(c=e*Math.pow(2,p-1)*Math.pow(2,o),s=0));o>=8;)n[t+u]=c&255,u+=_,c/=256,o-=8;for(s=s<<o|c,l+=o;l>0;)n[t+u]=s&255,u+=_,s/=256,l-=8;n[t+u-_]|=h*128}var Li={INSPECT_MAX_BYTES:50},Wt=2147483647;m.TYPED_ARRAY_SUPPORT=!0;Object.defineProperty(m.prototype,"parent",{enumerable:!0,get:function(){if(m.isBuffer(this))return this.buffer}});Object.defineProperty(m.prototype,"offset",{enumerable:!0,get:function(){if(m.isBuffer(this))return this.byteOffset}});function Te(n){if(n>Wt)throw new RangeError('The value "'+n+'" is invalid for option "size"');let e=new Uint8Array(n);return Object.setPrototypeOf(e,m.prototype),e}function m(n,e,t){if(typeof n=="number"){if(typeof e=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return en(n)}return Mr(n,e,t)}m.poolSize=8192;function Mr(n,e,t){if(typeof n=="string")return Ti(n,e);if(ArrayBuffer.isView(n))return ki(n);if(n==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof n);if(n instanceof ArrayBuffer||n&&n.buffer instanceof ArrayBuffer||n instanceof SharedArrayBuffer||n&&n.buffer instanceof SharedArrayBuffer)return Yt(n,e,t);if(typeof n=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');let r=n.valueOf&&n.valueOf();if(r!=null&&r!==n)return m.from(r,e,t);let o=Ni(n);if(o)return o;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof n[Symbol.toPrimitive]=="function")return m.from(n[Symbol.toPrimitive]("string"),e,t);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof n)}m.from=function(n,e,t){return Mr(n,e,t)};Object.setPrototypeOf(m.prototype,Uint8Array.prototype);Object.setPrototypeOf(m,Uint8Array);function Or(n){if(typeof n!="number")throw new TypeError('"size" argument must be of type number');if(n<0)throw new RangeError('The value "'+n+'" is invalid for option "size"')}function xi(n,e,t){return Or(n),n<=0?Te(n):e!==void 0?typeof t=="string"?Te(n).fill(e,t):Te(n).fill(e):Te(n)}m.alloc=function(n,e,t){return xi(n,e,t)};function en(n){return Or(n),Te(n<0?0:tn(n)|0)}m.allocUnsafe=function(n){return en(n)};m.allocUnsafeSlow=function(n){return en(n)};function Ti(n,e){if((typeof e!="string"||e==="")&&(e="utf8"),!m.isEncoding(e))throw new TypeError("Unknown encoding: "+e);let t=Rr(n,e)|0,r=Te(t),o=r.write(n,e);return o!==t&&(r=r.slice(0,o)),r}function Qt(n){let e=n.length<0?0:tn(n.length)|0,t=Te(e);for(let r=0;r<e;r+=1)t[r]=n[r]&255;return t}function ki(n){if(n instanceof Uint8Array){let e=new Uint8Array(n);return Yt(e.buffer,e.byteOffset,e.byteLength)}return Qt(n)}function Yt(n,e,t){if(e<0||n.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(n.byteLength<e+(t||0))throw new RangeError('"length" is outside of buffer bounds');let r;return e===void 0&&t===void 0?r=new Uint8Array(n):t===void 0?r=new Uint8Array(n,e):r=new Uint8Array(n,e,t),Object.setPrototypeOf(r,m.prototype),r}function Ni(n){if(m.isBuffer(n)){let e=tn(n.length)|0,t=Te(e);return t.length===0||n.copy(t,0,0,e),t}if(n.length!==void 0)return typeof n.length!="number"||Number.isNaN(n.length)?Te(0):Qt(n);if(n.type==="Buffer"&&Array.isArray(n.data))return Qt(n.data)}function tn(n){if(n>=Wt)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+Wt.toString(16)+" bytes");return n|0}m.isBuffer=function(e){return e!=null&&e._isBuffer===!0&&e!==m.prototype};m.compare=function(e,t){if(e instanceof Uint8Array&&(e=m.from(e,e.offset,e.byteLength)),t instanceof Uint8Array&&(t=m.from(t,t.offset,t.byteLength)),!m.isBuffer(e)||!m.isBuffer(t))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;let r=e.length,o=t.length;for(let i=0,s=Math.min(r,o);i<s;++i)if(e[i]!==t[i]){r=e[i],o=t[i];break}return r<o?-1:o<r?1:0};m.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}};m.concat=function(e,t){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(e.length===0)return m.alloc(0);let r;if(t===void 0)for(t=0,r=0;r<e.length;++r)t+=e[r].length;let o=m.allocUnsafe(t),i=0;for(r=0;r<e.length;++r){let s=e[r];if(s instanceof Uint8Array)i+s.length>o.length?(m.isBuffer(s)||(s=m.from(s.buffer,s.byteOffset,s.byteLength)),s.copy(o,i)):Uint8Array.prototype.set.call(o,s,i);else if(m.isBuffer(s))s.copy(o,i);else throw new TypeError('"list" argument must be an Array of Buffers');i+=s.length}return o};function Rr(n,e){if(m.isBuffer(n))return n.length;if(ArrayBuffer.isView(n)||n instanceof ArrayBuffer)return n.byteLength;if(typeof n!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof n);let t=n.length,r=arguments.length>2&&arguments[2]===!0;if(!r&&t===0)return 0;let o=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return t;case"utf8":case"utf-8":return Xt(n).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return t*2;case"hex":return t>>>1;case"base64":return Jr(n).length;default:if(o)return r?-1:Xt(n).length;e=(""+e).toLowerCase(),o=!0}}m.byteLength=Rr;function Mi(n,e,t){let r=!1;if((e===void 0||e<0)&&(e=0),e>this.length||((t===void 0||t>this.length)&&(t=this.length),t<=0)||(t>>>=0,e>>>=0,t<=e))return"";for(n||(n="utf8");;)switch(n){case"hex":return Vi(this,e,t);case"utf8":case"utf-8":return Pr(this,e,t);case"ascii":return Bi(this,e,t);case"latin1":case"binary":return zi(this,e,t);case"base64":return Di(this,e,t);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Ji(this,e,t);default:if(r)throw new TypeError("Unknown encoding: "+n);n=(n+"").toLowerCase(),r=!0}}m.prototype._isBuffer=!0;function De(n,e,t){let r=n[e];n[e]=n[t],n[t]=r}m.prototype.swap16=function(){let e=this.length;if(e%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let t=0;t<e;t+=2)De(this,t,t+1);return this};m.prototype.swap32=function(){let e=this.length;if(e%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let t=0;t<e;t+=4)De(this,t,t+3),De(this,t+1,t+2);return this};m.prototype.swap64=function(){let e=this.length;if(e%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let t=0;t<e;t+=8)De(this,t,t+7),De(this,t+1,t+6),De(this,t+2,t+5),De(this,t+3,t+4);return this};m.prototype.toString=function(){let e=this.length;return e===0?"":arguments.length===0?Pr(this,0,e):Mi.apply(this,arguments)};m.prototype.toLocaleString=m.prototype.toString;m.prototype.equals=function(e){if(!m.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e?!0:m.compare(this,e)===0};m.prototype.inspect=function(){let e="",t=Li.INSPECT_MAX_BYTES;return e=this.toString("hex",0,t).replace(/(.{2})/g,"$1 ").trim(),this.length>t&&(e+=" ... "),"<Buffer "+e+">"};m.prototype[Symbol.for("nodejs.util.inspect.custom")]=m.prototype.inspect;m.prototype.compare=function(e,t,r,o,i){if(e instanceof Uint8Array&&(e=m.from(e,e.offset,e.byteLength)),!m.isBuffer(e))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(t===void 0&&(t=0),r===void 0&&(r=e?e.length:0),o===void 0&&(o=0),i===void 0&&(i=this.length),t<0||r>e.length||o<0||i>this.length)throw new RangeError("out of range index");if(o>=i&&t>=r)return 0;if(o>=i)return-1;if(t>=r)return 1;if(t>>>=0,r>>>=0,o>>>=0,i>>>=0,this===e)return 0;let s=i-o,c=r-t,a=Math.min(s,c),l=this.slice(o,i),d=e.slice(t,r);for(let p=0;p<a;++p)if(l[p]!==d[p]){s=l[p],c=d[p];break}return s<c?-1:c<s?1:0};function jr(n,e,t,r,o){if(n.length===0)return-1;if(typeof t=="string"?(r=t,t=0):t>2147483647?t=2147483647:t<-2147483648&&(t=-2147483648),t=+t,Number.isNaN(t)&&(t=o?0:n.length-1),t<0&&(t=n.length+t),t>=n.length){if(o)return-1;t=n.length-1}else if(t<0)if(o)t=0;else return-1;if(typeof e=="string"&&(e=m.from(e,r)),m.isBuffer(e))return e.length===0?-1:Tr(n,e,t,r,o);if(typeof e=="number")return e=e&255,typeof Uint8Array.prototype.indexOf=="function"?o?Uint8Array.prototype.indexOf.call(n,e,t):Uint8Array.prototype.lastIndexOf.call(n,e,t):Tr(n,[e],t,r,o);throw new TypeError("val must be string, number or Buffer")}function Tr(n,e,t,r,o){let i=1,s=n.length,c=e.length;if(r!==void 0&&(r=String(r).toLowerCase(),r==="ucs2"||r==="ucs-2"||r==="utf16le"||r==="utf-16le")){if(n.length<2||e.length<2)return-1;i=2,s/=2,c/=2,t/=2}function a(d,p){return i===1?d[p]:d.readUInt16BE(p*i)}let l;if(o){let d=-1;for(l=t;l<s;l++)if(a(n,l)===a(e,d===-1?0:l-d)){if(d===-1&&(d=l),l-d+1===c)return d*i}else d!==-1&&(l-=l-d),d=-1}else for(t+c>s&&(t=s-c),l=t;l>=0;l--){let d=!0;for(let p=0;p<c;p++)if(a(n,l+p)!==a(e,p)){d=!1;break}if(d)return l}return-1}m.prototype.includes=function(e,t,r){return this.indexOf(e,t,r)!==-1};m.prototype.indexOf=function(e,t,r){return jr(this,e,t,r,!0)};m.prototype.lastIndexOf=function(e,t,r){return jr(this,e,t,r,!1)};function Oi(n,e,t,r){t=Number(t)||0;let o=n.length-t;r?(r=Number(r),r>o&&(r=o)):r=o;let i=e.length;r>i/2&&(r=i/2);let s;for(s=0;s<r;++s){let c=parseInt(e.substr(s*2,2),16);if(Number.isNaN(c))return s;n[t+s]=c}return s}function Ri(n,e,t,r){return St(Xt(e,n.length-t),n,t,r)}function ji(n,e,t,r){return St(Zi(e),n,t,r)}function Pi(n,e,t,r){return St(Jr(e),n,t,r)}function Fi(n,e,t,r){return St(qi(e,n.length-t),n,t,r)}m.prototype.write=function(e,t,r,o){if(t===void 0)o="utf8",r=this.length,t=0;else if(r===void 0&&typeof t=="string")o=t,r=this.length,t=0;else if(isFinite(t))t=t>>>0,isFinite(r)?(r=r>>>0,o===void 0&&(o="utf8")):(o=r,r=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let i=this.length-t;if((r===void 0||r>i)&&(r=i),e.length>0&&(r<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");o||(o="utf8");let s=!1;for(;;)switch(o){case"hex":return Oi(this,e,t,r);case"utf8":case"utf-8":return Ri(this,e,t,r);case"ascii":case"latin1":case"binary":return ji(this,e,t,r);case"base64":return Pi(this,e,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Fi(this,e,t,r);default:if(s)throw new TypeError("Unknown encoding: "+o);o=(""+o).toLowerCase(),s=!0}};m.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function Di(n,e,t){return e===0&&t===n.length?qt(n):qt(n.slice(e,t))}function Pr(n,e,t){t=Math.min(n.length,t);let r=[],o=e;for(;o<t;){let i=n[o],s=null,c=i>239?4:i>223?3:i>191?2:1;if(o+c<=t){let a,l,d,p;switch(c){case 1:i<128&&(s=i);break;case 2:a=n[o+1],(a&192)===128&&(p=(i&31)<<6|a&63,p>127&&(s=p));break;case 3:a=n[o+1],l=n[o+2],(a&192)===128&&(l&192)===128&&(p=(i&15)<<12|(a&63)<<6|l&63,p>2047&&(p<55296||p>57343)&&(s=p));break;case 4:a=n[o+1],l=n[o+2],d=n[o+3],(a&192)===128&&(l&192)===128&&(d&192)===128&&(p=(i&15)<<18|(a&63)<<12|(l&63)<<6|d&63,p>65535&&p<1114112&&(s=p))}}s===null?(s=65533,c=1):s>65535&&(s-=65536,r.push(s>>>10&1023|55296),s=56320|s&1023),r.push(s),o+=c}return Ui(r)}var kr=4096;function Ui(n){let e=n.length;if(e<=kr)return String.fromCharCode.apply(String,n);let t="",r=0;for(;r<e;)t+=String.fromCharCode.apply(String,n.slice(r,r+=kr));return t}function Bi(n,e,t){let r="";t=Math.min(n.length,t);for(let o=e;o<t;++o)r+=String.fromCharCode(n[o]&127);return r}function zi(n,e,t){let r="";t=Math.min(n.length,t);for(let o=e;o<t;++o)r+=String.fromCharCode(n[o]);return r}function Vi(n,e,t){let r=n.length;(!e||e<0)&&(e=0),(!t||t<0||t>r)&&(t=r);let o="";for(let i=e;i<t;++i)o+=Ki[n[i]];return o}function Ji(n,e,t){let r=n.slice(e,t),o="";for(let i=0;i<r.length-1;i+=2)o+=String.fromCharCode(r[i]+r[i+1]*256);return o}m.prototype.slice=function(e,t){let r=this.length;e=~~e,t=t===void 0?r:~~t,e<0?(e+=r,e<0&&(e=0)):e>r&&(e=r),t<0?(t+=r,t<0&&(t=0)):t>r&&(t=r),t<e&&(t=e);let o=this.subarray(e,t);return Object.setPrototypeOf(o,m.prototype),o};function ae(n,e,t){if(n%1!==0||n<0)throw new RangeError("offset is not uint");if(n+e>t)throw new RangeError("Trying to access beyond buffer length")}m.prototype.readUintLE=m.prototype.readUIntLE=function(e,t,r){e=e>>>0,t=t>>>0,r||ae(e,t,this.length);let o=this[e],i=1,s=0;for(;++s<t&&(i*=256);)o+=this[e+s]*i;return o};m.prototype.readUintBE=m.prototype.readUIntBE=function(e,t,r){e=e>>>0,t=t>>>0,r||ae(e,t,this.length);let o=this[e+--t],i=1;for(;t>0&&(i*=256);)o+=this[e+--t]*i;return o};m.prototype.readUint8=m.prototype.readUInt8=function(e,t){return e=e>>>0,t||ae(e,1,this.length),this[e]};m.prototype.readUint16LE=m.prototype.readUInt16LE=function(e,t){return e=e>>>0,t||ae(e,2,this.length),this[e]|this[e+1]<<8};m.prototype.readUint16BE=m.prototype.readUInt16BE=function(e,t){return e=e>>>0,t||ae(e,2,this.length),this[e]<<8|this[e+1]};m.prototype.readUint32LE=m.prototype.readUInt32LE=function(e,t){return e=e>>>0,t||ae(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+this[e+3]*16777216};m.prototype.readUint32BE=m.prototype.readUInt32BE=function(e,t){return e=e>>>0,t||ae(e,4,this.length),this[e]*16777216+(this[e+1]<<16|this[e+2]<<8|this[e+3])};m.prototype.readBigUInt64LE=function(e){e=e>>>0,Ze(e,"offset");let t=this[e],r=this[e+7];(t===void 0||r===void 0)&&it(e,this.length-8);let o=t+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24,i=this[++e]+this[++e]*2**8+this[++e]*2**16+r*2**24;return BigInt(o)+(BigInt(i)<<BigInt(32))};m.prototype.readBigUInt64BE=function(e){e=e>>>0,Ze(e,"offset");let t=this[e],r=this[e+7];(t===void 0||r===void 0)&&it(e,this.length-8);let o=t*2**24+this[++e]*2**16+this[++e]*2**8+this[++e],i=this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+r;return(BigInt(o)<<BigInt(32))+BigInt(i)};m.prototype.readIntLE=function(e,t,r){e=e>>>0,t=t>>>0,r||ae(e,t,this.length);let o=this[e],i=1,s=0;for(;++s<t&&(i*=256);)o+=this[e+s]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*t)),o};m.prototype.readIntBE=function(e,t,r){e=e>>>0,t=t>>>0,r||ae(e,t,this.length);let o=t,i=1,s=this[e+--o];for(;o>0&&(i*=256);)s+=this[e+--o]*i;return i*=128,s>=i&&(s-=Math.pow(2,8*t)),s};m.prototype.readInt8=function(e,t){return e=e>>>0,t||ae(e,1,this.length),this[e]&128?(255-this[e]+1)*-1:this[e]};m.prototype.readInt16LE=function(e,t){e=e>>>0,t||ae(e,2,this.length);let r=this[e]|this[e+1]<<8;return r&32768?r|4294901760:r};m.prototype.readInt16BE=function(e,t){e=e>>>0,t||ae(e,2,this.length);let r=this[e+1]|this[e]<<8;return r&32768?r|4294901760:r};m.prototype.readInt32LE=function(e,t){return e=e>>>0,t||ae(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24};m.prototype.readInt32BE=function(e,t){return e=e>>>0,t||ae(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]};m.prototype.readBigInt64LE=function(e){e=e>>>0,Ze(e,"offset");let t=this[e],r=this[e+7];(t===void 0||r===void 0)&&it(e,this.length-8);let o=this[e+4]+this[e+5]*2**8+this[e+6]*2**16+(r<<24);return(BigInt(o)<<BigInt(32))+BigInt(t+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24)};m.prototype.readBigInt64BE=function(e){e=e>>>0,Ze(e,"offset");let t=this[e],r=this[e+7];(t===void 0||r===void 0)&&it(e,this.length-8);let o=(t<<24)+this[++e]*2**16+this[++e]*2**8+this[++e];return(BigInt(o)<<BigInt(32))+BigInt(this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+r)};m.prototype.readFloatLE=function(e,t){return e=e>>>0,t||ae(e,4,this.length),ot(this,e,!0,23,4)};m.prototype.readFloatBE=function(e,t){return e=e>>>0,t||ae(e,4,this.length),ot(this,e,!1,23,4)};m.prototype.readDoubleLE=function(e,t){return e=e>>>0,t||ae(e,8,this.length),ot(this,e,!0,52,8)};m.prototype.readDoubleBE=function(e,t){return e=e>>>0,t||ae(e,8,this.length),ot(this,e,!1,52,8)};function fe(n,e,t,r,o,i){if(!m.isBuffer(n))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>o||e<i)throw new RangeError('"value" argument is out of bounds');if(t+r>n.length)throw new RangeError("Index out of range")}m.prototype.writeUintLE=m.prototype.writeUIntLE=function(e,t,r,o){if(e=+e,t=t>>>0,r=r>>>0,!o){let c=Math.pow(2,8*r)-1;fe(this,e,t,r,c,0)}let i=1,s=0;for(this[t]=e&255;++s<r&&(i*=256);)this[t+s]=e/i&255;return t+r};m.prototype.writeUintBE=m.prototype.writeUIntBE=function(e,t,r,o){if(e=+e,t=t>>>0,r=r>>>0,!o){let c=Math.pow(2,8*r)-1;fe(this,e,t,r,c,0)}let i=r-1,s=1;for(this[t+i]=e&255;--i>=0&&(s*=256);)this[t+i]=e/s&255;return t+r};m.prototype.writeUint8=m.prototype.writeUInt8=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,1,255,0),this[t]=e&255,t+1};m.prototype.writeUint16LE=m.prototype.writeUInt16LE=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,2,65535,0),this[t]=e&255,this[t+1]=e>>>8,t+2};m.prototype.writeUint16BE=m.prototype.writeUInt16BE=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=e&255,t+2};m.prototype.writeUint32LE=m.prototype.writeUInt32LE=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=e&255,t+4};m.prototype.writeUint32BE=m.prototype.writeUInt32BE=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=e&255,t+4};function Fr(n,e,t,r,o){Vr(e,r,o,n,t,7);let i=Number(e&BigInt(4294967295));n[t++]=i,i=i>>8,n[t++]=i,i=i>>8,n[t++]=i,i=i>>8,n[t++]=i;let s=Number(e>>BigInt(32)&BigInt(4294967295));return n[t++]=s,s=s>>8,n[t++]=s,s=s>>8,n[t++]=s,s=s>>8,n[t++]=s,t}function Dr(n,e,t,r,o){Vr(e,r,o,n,t,7);let i=Number(e&BigInt(4294967295));n[t+7]=i,i=i>>8,n[t+6]=i,i=i>>8,n[t+5]=i,i=i>>8,n[t+4]=i;let s=Number(e>>BigInt(32)&BigInt(4294967295));return n[t+3]=s,s=s>>8,n[t+2]=s,s=s>>8,n[t+1]=s,s=s>>8,n[t]=s,t+8}m.prototype.writeBigUInt64LE=function(e,t=0){return Fr(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))};m.prototype.writeBigUInt64BE=function(e,t=0){return Dr(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))};m.prototype.writeIntLE=function(e,t,r,o){if(e=+e,t=t>>>0,!o){let a=Math.pow(2,8*r-1);fe(this,e,t,r,a-1,-a)}let i=0,s=1,c=0;for(this[t]=e&255;++i<r&&(s*=256);)e<0&&c===0&&this[t+i-1]!==0&&(c=1),this[t+i]=(e/s>>0)-c&255;return t+r};m.prototype.writeIntBE=function(e,t,r,o){if(e=+e,t=t>>>0,!o){let a=Math.pow(2,8*r-1);fe(this,e,t,r,a-1,-a)}let i=r-1,s=1,c=0;for(this[t+i]=e&255;--i>=0&&(s*=256);)e<0&&c===0&&this[t+i+1]!==0&&(c=1),this[t+i]=(e/s>>0)-c&255;return t+r};m.prototype.writeInt8=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=e&255,t+1};m.prototype.writeInt16LE=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,2,32767,-32768),this[t]=e&255,this[t+1]=e>>>8,t+2};m.prototype.writeInt16BE=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=e&255,t+2};m.prototype.writeInt32LE=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,4,2147483647,-2147483648),this[t]=e&255,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4};m.prototype.writeInt32BE=function(e,t,r){return e=+e,t=t>>>0,r||fe(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=e&255,t+4};m.prototype.writeBigInt64LE=function(e,t=0){return Fr(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))};m.prototype.writeBigInt64BE=function(e,t=0){return Dr(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))};function Ur(n,e,t,r,o,i){if(t+r>n.length)throw new RangeError("Index out of range");if(t<0)throw new RangeError("Index out of range")}function Br(n,e,t,r,o){return e=+e,t=t>>>0,o||Ur(n,e,t,4,34028234663852886e22,-34028234663852886e22),Kt(n,e,t,r,23,4),t+4}m.prototype.writeFloatLE=function(e,t,r){return Br(this,e,t,!0,r)};m.prototype.writeFloatBE=function(e,t,r){return Br(this,e,t,!1,r)};function zr(n,e,t,r,o){return e=+e,t=t>>>0,o||Ur(n,e,t,8,17976931348623157e292,-17976931348623157e292),Kt(n,e,t,r,52,8),t+8}m.prototype.writeDoubleLE=function(e,t,r){return zr(this,e,t,!0,r)};m.prototype.writeDoubleBE=function(e,t,r){return zr(this,e,t,!1,r)};m.prototype.copy=function(e,t,r,o){if(!m.isBuffer(e))throw new TypeError("argument should be a Buffer");if(r||(r=0),!o&&o!==0&&(o=this.length),t>=e.length&&(t=e.length),t||(t=0),o>0&&o<r&&(o=r),o===r||e.length===0||this.length===0)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(o<0)throw new RangeError("sourceEnd out of bounds");o>this.length&&(o=this.length),e.length-t<o-r&&(o=e.length-t+r);let i=o-r;return this===e?this.copyWithin(t,r,o):Uint8Array.prototype.set.call(e,this.subarray(r,o),t),i};m.prototype.fill=function(e,t,r,o){if(typeof e=="string"){if(typeof t=="string"?(o=t,t=0,r=this.length):typeof r=="string"&&(o=r,r=this.length),o!==void 0&&typeof o!="string")throw new TypeError("encoding must be a string");if(typeof o=="string"&&!m.isEncoding(o))throw new TypeError("Unknown encoding: "+o);if(e.length===1){let s=e.charCodeAt(0);(o==="utf8"&&s<128||o==="latin1")&&(e=s)}}else typeof e=="number"?e=e&255:typeof e=="boolean"&&(e=Number(e));if(t<0||this.length<t||this.length<r)throw new RangeError("Out of range index");if(r<=t)return this;t=t>>>0,r=r===void 0?this.length:r>>>0,e||(e=0);let i;if(typeof e=="number")for(i=t;i<r;++i)this[i]=e;else{let s=m.isBuffer(e)?e:m.from(e,o),c=s.length;if(c===0)throw new TypeError('The value "'+e+'" is invalid for argument "value"');for(i=0;i<r-t;++i)this[i+t]=s[i%c]}return this};var He={};function nn(n,e,t){He[n]=class extends t{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${n}]`,this.stack,delete this.name}get code(){return n}set code(o){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:o,writable:!0})}toString(){return`${this.name} [${n}]: ${this.message}`}}}nn("ERR_BUFFER_OUT_OF_BOUNDS",function(n){return n?`${n} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError);nn("ERR_INVALID_ARG_TYPE",function(n,e){return`The "${n}" argument must be of type number. Received type ${typeof e}`},TypeError);nn("ERR_OUT_OF_RANGE",function(n,e,t){let r=`The value of "${n}" is out of range.`,o=t;return Number.isInteger(t)&&Math.abs(t)>2**32?o=Nr(String(t)):typeof t=="bigint"&&(o=String(t),(t>BigInt(2)**BigInt(32)||t<-(BigInt(2)**BigInt(32)))&&(o=Nr(o)),o+="n"),r+=` It must be ${e}. Received ${o}`,r},RangeError);function Nr(n){let e="",t=n.length,r=n[0]==="-"?1:0;for(;t>=r+4;t-=3)e=`_${n.slice(t-3,t)}${e}`;return`${n.slice(0,t)}${e}`}function Gi(n,e,t){Ze(e,"offset"),(n[e]===void 0||n[e+t]===void 0)&&it(e,n.length-(t+1))}function Vr(n,e,t,r,o,i){if(n>t||n<e){let s=typeof e=="bigint"?"n":"",c;throw i>3?e===0||e===BigInt(0)?c=`>= 0${s} and < 2${s} ** ${(i+1)*8}${s}`:c=`>= -(2${s} ** ${(i+1)*8-1}${s}) and < 2 ** ${(i+1)*8-1}${s}`:c=`>= ${e}${s} and <= ${t}${s}`,new He.ERR_OUT_OF_RANGE("value",c,n)}Gi(r,o,i)}function Ze(n,e){if(typeof n!="number")throw new He.ERR_INVALID_ARG_TYPE(e,"number",n)}function it(n,e,t){throw Math.floor(n)!==n?(Ze(n,t),new He.ERR_OUT_OF_RANGE(t||"offset","an integer",n)):e<0?new He.ERR_BUFFER_OUT_OF_BOUNDS:new He.ERR_OUT_OF_RANGE(t||"offset",`>= ${t?1:0} and <= ${e}`,n)}var $i=/[^+/0-9A-Za-z-_]/g;function Hi(n){if(n=n.split("=")[0],n=n.trim().replace($i,""),n.length<2)return"";for(;n.length%4!==0;)n=n+"=";return n}function Xt(n,e){e=e||1/0;let t,r=n.length,o=null,i=[];for(let s=0;s<r;++s){if(t=n.charCodeAt(s),t>55295&&t<57344){if(!o){if(t>56319){(e-=3)>-1&&i.push(239,191,189);continue}else if(s+1===r){(e-=3)>-1&&i.push(239,191,189);continue}o=t;continue}if(t<56320){(e-=3)>-1&&i.push(239,191,189),o=t;continue}t=(o-55296<<10|t-56320)+65536}else o&&(e-=3)>-1&&i.push(239,191,189);if(o=null,t<128){if((e-=1)<0)break;i.push(t)}else if(t<2048){if((e-=2)<0)break;i.push(t>>6|192,t&63|128)}else if(t<65536){if((e-=3)<0)break;i.push(t>>12|224,t>>6&63|128,t&63|128)}else if(t<1114112){if((e-=4)<0)break;i.push(t>>18|240,t>>12&63|128,t>>6&63|128,t&63|128)}else throw new Error("Invalid code point")}return i}function Zi(n){let e=[];for(let t=0;t<n.length;++t)e.push(n.charCodeAt(t)&255);return e}function qi(n,e){let t,r,o,i=[];for(let s=0;s<n.length&&!((e-=2)<0);++s)t=n.charCodeAt(s),r=t>>8,o=t%256,i.push(o),i.push(r);return i}function Jr(n){return xr(Hi(n))}function St(n,e,t,r){let o;for(o=0;o<r&&!(o+t>=e.length||o>=n.length);++o)e[o+t]=n[o];return o}var Ki=function(){let n="0123456789abcdef",e=new Array(256);for(let t=0;t<16;++t){let r=t*16;for(let o=0;o<16;++o)e[r+o]=n[t]+n[o]}return e}();var zt={};Ei(zt,{ArtMethod:()=>Ot,ArtStackVisitor:()=>Pn,DVM_JNI_ENV_OFFSET_SELF:()=>po,HandleVector:()=>pt,VariableSizedHandleScope:()=>ft,backtrace:()=>Qn,deoptimizeBootImage:()=>nr,deoptimizeEverything:()=>tr,deoptimizeMethod:()=>er,ensureClassInitialized:()=>yc,getAndroidApiLevel:()=>te,getAndroidVersion:()=>ht,getApi:()=>G,getArtApexVersion:()=>Gn,getArtClassSpec:()=>Hn,getArtFieldSpec:()=>Ut,getArtMethodSpec:()=>me,getArtThreadFromEnv:()=>Bt,getArtThreadSpec:()=>We,makeArtClassLoaderVisitor:()=>Wn,makeArtClassVisitor:()=>Kn,makeMethodMangler:()=>ul,makeObjectVisitorPredicate:()=>or,revertGlobalPatches:()=>Yn,translateMethod:()=>pl,withAllArtThreadsSuspended:()=>qn,withRunnableArtThread:()=>Ee});var{pageSize:rn,pointerSize:Wi}=Process,on=class{constructor(e){this.sliceSize=e,this.slicesPerPage=rn/e,this.pages=[],this.free=[]}allocateSlice(e,t){let r=e.near===void 0,o=t===1;if(r&&o){let i=this.free.pop();if(i!==void 0)return i}else if(t<rn){let{free:i}=this,s=i.length,c=o?null:ptr(t-1);for(let a=0;a!==s;a++){let l=i[a],d=r||this._isSliceNear(l,e),p=o||l.and(c).isNull();if(d&&p)return i.splice(a,1)[0]}}return this._allocatePage(e)}_allocatePage(e){let t=Memory.alloc(rn,e),{sliceSize:r,slicesPerPage:o}=this;for(let i=1;i!==o;i++){let s=t.add(i*r);this.free.push(s)}return this.pages.push(t),t}_isSliceNear(e,t){let r=e.add(this.sliceSize),{near:o,maxDistance:i}=t,s=Gr(o.sub(e)),c=Gr(o.sub(r));return s.compare(i)<=0&&c.compare(i)<=0}freeSlice(e){this.free.push(e)}};function Gr(n){let e=Wi===4?31:63,t=ptr(1).shl(e).not();return n.and(t)}function sn(n){return new on(n)}function ue(n,e){if(e!==0)throw new Error(n+" failed: "+e)}var wt={v1_0:805371904,v1_2:805372416},It={canTagObjects:1},{pointerSize:Qi}=Process,Yi={exceptions:"propagate"};function ke(n,e){this.handle=n,this.vm=e,this.vtable=n.readPointer()}ke.prototype.deallocate=st(47,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});ke.prototype.getLoadedClasses=st(78,"int32",["pointer","pointer","pointer"],function(n,e,t){let r=n(this.handle,e,t);ue("EnvJvmti::getLoadedClasses",r)});ke.prototype.iterateOverInstancesOfClass=st(112,"int32",["pointer","pointer","int","pointer","pointer"],function(n,e,t,r,o){let i=n(this.handle,e,t,r,o);ue("EnvJvmti::iterateOverInstancesOfClass",i)});ke.prototype.getObjectsWithTags=st(114,"int32",["pointer","int","pointer","pointer","pointer","pointer"],function(n,e,t,r,o,i){let s=n(this.handle,e,t,r,o,i);ue("EnvJvmti::getObjectsWithTags",s)});ke.prototype.addCapabilities=st(142,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});function st(n,e,t,r){let o=null;return function(){o===null&&(o=new NativeFunction(this.vtable.add((n-1)*Qi).readPointer(),e,t,Yi));let i=[o];return i=i.concat.apply(i,arguments),r.apply(this,i)}}function Ne(n,e,{limit:t}){let r=n,o=null;for(let i=0;i!==t;i++){let s=Instruction.parse(r),c=e(s,o);if(c!==null)return c;r=s.next,o=s}return null}function de(n){let e=null,t=!1;return function(...r){return t||(e=n(...r),t=!0),e}}function b(n,e){this.handle=n,this.vm=e}var Ct=Process.pointerSize,Re=2,Xi=28,es=34,ts=37,ns=40,rs=43,os=46,is=49,ss=52,as=55,cs=58,ls=61,ds=64,us=67,ps=70,fs=73,hs=76,_s=79,ms=82,gs=85,ys=88,bs=91,Es=114,vs=117,Ss=120,ws=123,Is=126,Cs=129,As=132,Ls=135,xs=138,Ts=141,ks=95,Ns=96,Ms=97,Os=98,Rs=99,js=100,Ps=101,Fs=102,Ds=103,Us=104,Bs=105,zs=106,Vs=107,Js=108,Gs=109,$s=110,Hs=111,Zs=112,qs=145,Ks=146,Ws=147,Qs=148,Ys=149,Xs=150,ea=151,ta=152,na=153,ra=154,oa=155,ia=156,sa=157,aa=158,ca=159,la=160,da=161,ua=162,pa={pointer:es,uint8:ts,int8:ns,uint16:rs,int16:os,int32:is,int64:ss,float:as,double:cs,void:ls},fa={pointer:ds,uint8:us,int8:ps,uint16:fs,int16:hs,int32:_s,int64:ms,float:gs,double:ys,void:bs},ha={pointer:Es,uint8:vs,int8:Ss,uint16:ws,int16:Is,int32:Cs,int64:As,float:Ls,double:xs,void:Ts},_a={pointer:ks,uint8:Ns,int8:Ms,uint16:Os,int16:Rs,int32:js,int64:Ps,float:Fs,double:Ds},ma={pointer:Us,uint8:Bs,int8:zs,uint16:Vs,int16:Js,int32:Gs,int64:$s,float:Hs,double:Zs},ga={pointer:qs,uint8:Ks,int8:Ws,uint16:Qs,int16:Ys,int32:Xs,int64:ea,float:ta,double:na},ya={pointer:ra,uint8:oa,int8:ia,uint16:sa,int16:aa,int32:ca,int64:la,float:da,double:ua},Hr={exceptions:"propagate"},an=null,yn=[];b.dispose=function(n){yn.forEach(n.deleteGlobalRef,n),yn=[]};function Ue(n){return yn.push(n),n}function At(n){return an===null&&(an=n.handle.readPointer()),an}function T(n,e,t,r){let o=null;return function(){o===null&&(o=new NativeFunction(At(this).add(n*Ct).readPointer(),e,t,Hr));let i=[o];return i=i.concat.apply(i,arguments),r.apply(this,i)}}b.prototype.getVersion=T(4,"int32",["pointer"],function(n){return n(this.handle)});b.prototype.findClass=T(6,"pointer",["pointer","pointer"],function(n,e){let t=n(this.handle,Memory.allocUtf8String(e));return this.throwIfExceptionPending(),t});b.prototype.throwIfExceptionPending=function(){let n=this.exceptionOccurred();if(n.isNull())return;this.exceptionClear();let e=this.newGlobalRef(n);this.deleteLocalRef(n);let t=this.vaMethod("pointer",[])(this.handle,e,this.javaLangObject().toString),r=this.stringFromJni(t);this.deleteLocalRef(t);let o=new Error(r);throw o.$h=e,Script.bindWeak(o,ba(this.vm,e)),o};function ba(n,e){return function(){n.perform(t=>{t.deleteGlobalRef(e)})}}b.prototype.fromReflectedMethod=T(7,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.fromReflectedField=T(8,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.toReflectedMethod=T(9,"pointer",["pointer","pointer","pointer","uint8"],function(n,e,t,r){return n(this.handle,e,t,r)});b.prototype.getSuperclass=T(10,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.isAssignableFrom=T(11,"uint8",["pointer","pointer","pointer"],function(n,e,t){return!!n(this.handle,e,t)});b.prototype.toReflectedField=T(12,"pointer",["pointer","pointer","pointer","uint8"],function(n,e,t,r){return n(this.handle,e,t,r)});b.prototype.throw=T(13,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.exceptionOccurred=T(15,"pointer",["pointer"],function(n){return n(this.handle)});b.prototype.exceptionDescribe=T(16,"void",["pointer"],function(n){n(this.handle)});b.prototype.exceptionClear=T(17,"void",["pointer"],function(n){n(this.handle)});b.prototype.pushLocalFrame=T(19,"int32",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.popLocalFrame=T(20,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.newGlobalRef=T(21,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.deleteGlobalRef=T(22,"void",["pointer","pointer"],function(n,e){n(this.handle,e)});b.prototype.deleteLocalRef=T(23,"void",["pointer","pointer"],function(n,e){n(this.handle,e)});b.prototype.isSameObject=T(24,"uint8",["pointer","pointer","pointer"],function(n,e,t){return!!n(this.handle,e,t)});b.prototype.newLocalRef=T(25,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.allocObject=T(27,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.getObjectClass=T(31,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.isInstanceOf=T(32,"uint8",["pointer","pointer","pointer"],function(n,e,t){return!!n(this.handle,e,t)});b.prototype.getMethodId=T(33,"pointer",["pointer","pointer","pointer","pointer"],function(n,e,t,r){return n(this.handle,e,Memory.allocUtf8String(t),Memory.allocUtf8String(r))});b.prototype.getFieldId=T(94,"pointer",["pointer","pointer","pointer","pointer"],function(n,e,t,r){return n(this.handle,e,Memory.allocUtf8String(t),Memory.allocUtf8String(r))});b.prototype.getIntField=T(100,"int32",["pointer","pointer","pointer"],function(n,e,t){return n(this.handle,e,t)});b.prototype.getStaticMethodId=T(113,"pointer",["pointer","pointer","pointer","pointer"],function(n,e,t,r){return n(this.handle,e,Memory.allocUtf8String(t),Memory.allocUtf8String(r))});b.prototype.getStaticFieldId=T(144,"pointer",["pointer","pointer","pointer","pointer"],function(n,e,t,r){return n(this.handle,e,Memory.allocUtf8String(t),Memory.allocUtf8String(r))});b.prototype.getStaticIntField=T(150,"int32",["pointer","pointer","pointer"],function(n,e,t){return n(this.handle,e,t)});b.prototype.getStringLength=T(164,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.getStringChars=T(165,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.releaseStringChars=T(166,"void",["pointer","pointer","pointer"],function(n,e,t){n(this.handle,e,t)});b.prototype.newStringUtf=T(167,"pointer",["pointer","pointer"],function(n,e){let t=Memory.allocUtf8String(e);return n(this.handle,t)});b.prototype.getStringUtfChars=T(169,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.releaseStringUtfChars=T(170,"void",["pointer","pointer","pointer"],function(n,e,t){n(this.handle,e,t)});b.prototype.getArrayLength=T(171,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.newObjectArray=T(172,"pointer",["pointer","int32","pointer","pointer"],function(n,e,t,r){return n(this.handle,e,t,r)});b.prototype.getObjectArrayElement=T(173,"pointer",["pointer","pointer","int32"],function(n,e,t){return n(this.handle,e,t)});b.prototype.setObjectArrayElement=T(174,"void",["pointer","pointer","int32","pointer"],function(n,e,t,r){n(this.handle,e,t,r)});b.prototype.newBooleanArray=T(175,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.newByteArray=T(176,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.newCharArray=T(177,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.newShortArray=T(178,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.newIntArray=T(179,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.newLongArray=T(180,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.newFloatArray=T(181,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.newDoubleArray=T(182,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});b.prototype.getBooleanArrayElements=T(183,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.getByteArrayElements=T(184,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.getCharArrayElements=T(185,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.getShortArrayElements=T(186,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.getIntArrayElements=T(187,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.getLongArrayElements=T(188,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.getFloatArrayElements=T(189,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.getDoubleArrayElements=T(190,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});b.prototype.releaseBooleanArrayElements=T(191,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});b.prototype.releaseByteArrayElements=T(192,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});b.prototype.releaseCharArrayElements=T(193,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});b.prototype.releaseShortArrayElements=T(194,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});b.prototype.releaseIntArrayElements=T(195,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});b.prototype.releaseLongArrayElements=T(196,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});b.prototype.releaseFloatArrayElements=T(197,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});b.prototype.releaseDoubleArrayElements=T(198,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});b.prototype.getByteArrayRegion=T(200,"void",["pointer","pointer","int","int","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.setBooleanArrayRegion=T(207,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.setByteArrayRegion=T(208,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.setCharArrayRegion=T(209,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.setShortArrayRegion=T(210,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.setIntArrayRegion=T(211,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.setLongArrayRegion=T(212,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.setFloatArrayRegion=T(213,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.setDoubleArrayRegion=T(214,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});b.prototype.registerNatives=T(215,"int32",["pointer","pointer","pointer","int32"],function(n,e,t,r){return n(this.handle,e,t,r)});b.prototype.monitorEnter=T(217,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.monitorExit=T(218,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.getDirectBufferAddress=T(230,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});b.prototype.getObjectRefType=T(232,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});var $r=new Map;function Lt(n,e,t,r){return En(this,"p",va,n,e,t,r)}function bn(n,e,t,r){return En(this,"v",Sa,n,e,t,r)}function Ea(n,e,t,r){return En(this,"n",wa,n,e,t,r)}function En(n,e,t,r,o,i,s){if(s!==void 0)return t(n,r,o,i,s);let c=[r,e,o].concat(i).join("|"),a=$r.get(c);return a===void 0&&(a=t(n,r,o,i,Hr),$r.set(c,a)),a}function va(n,e,t,r,o){return new NativeFunction(At(n).add(e*Ct).readPointer(),t,["pointer","pointer","pointer"].concat(r),o)}function Sa(n,e,t,r,o){return new NativeFunction(At(n).add(e*Ct).readPointer(),t,["pointer","pointer","pointer","..."].concat(r),o)}function wa(n,e,t,r,o){return new NativeFunction(At(n).add(e*Ct).readPointer(),t,["pointer","pointer","pointer","pointer","..."].concat(r),o)}b.prototype.constructor=function(n,e){return bn.call(this,Xi,"pointer",n,e)};b.prototype.vaMethod=function(n,e,t){let r=pa[n];if(r===void 0)throw new Error("Unsupported type: "+n);return bn.call(this,r,n,e,t)};b.prototype.nonvirtualVaMethod=function(n,e,t){let r=fa[n];if(r===void 0)throw new Error("Unsupported type: "+n);return Ea.call(this,r,n,e,t)};b.prototype.staticVaMethod=function(n,e,t){let r=ha[n];if(r===void 0)throw new Error("Unsupported type: "+n);return bn.call(this,r,n,e,t)};b.prototype.getField=function(n){let e=_a[n];if(e===void 0)throw new Error("Unsupported type: "+n);return Lt.call(this,e,n,[])};b.prototype.getStaticField=function(n){let e=ga[n];if(e===void 0)throw new Error("Unsupported type: "+n);return Lt.call(this,e,n,[])};b.prototype.setField=function(n){let e=ma[n];if(e===void 0)throw new Error("Unsupported type: "+n);return Lt.call(this,e,"void",[n])};b.prototype.setStaticField=function(n){let e=ya[n];if(e===void 0)throw new Error("Unsupported type: "+n);return Lt.call(this,e,"void",[n])};var cn=null;b.prototype.javaLangClass=function(){if(cn===null){let n=this.findClass("java/lang/Class");try{let e=this.getMethodId.bind(this,n);cn={handle:Ue(this.newGlobalRef(n)),getName:e("getName","()Ljava/lang/String;"),getSimpleName:e("getSimpleName","()Ljava/lang/String;"),getGenericSuperclass:e("getGenericSuperclass","()Ljava/lang/reflect/Type;"),getDeclaredConstructors:e("getDeclaredConstructors","()[Ljava/lang/reflect/Constructor;"),getDeclaredMethods:e("getDeclaredMethods","()[Ljava/lang/reflect/Method;"),getDeclaredFields:e("getDeclaredFields","()[Ljava/lang/reflect/Field;"),isArray:e("isArray","()Z"),isPrimitive:e("isPrimitive","()Z"),isInterface:e("isInterface","()Z"),getComponentType:e("getComponentType","()Ljava/lang/Class;")}}finally{this.deleteLocalRef(n)}}return cn};var ln=null;b.prototype.javaLangObject=function(){if(ln===null){let n=this.findClass("java/lang/Object");try{let e=this.getMethodId.bind(this,n);ln={handle:Ue(this.newGlobalRef(n)),toString:e("toString","()Ljava/lang/String;"),getClass:e("getClass","()Ljava/lang/Class;")}}finally{this.deleteLocalRef(n)}}return ln};var dn=null;b.prototype.javaLangReflectConstructor=function(){if(dn===null){let n=this.findClass("java/lang/reflect/Constructor");try{dn={getGenericParameterTypes:this.getMethodId(n,"getGenericParameterTypes","()[Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(n)}}return dn};var un=null;b.prototype.javaLangReflectMethod=function(){if(un===null){let n=this.findClass("java/lang/reflect/Method");try{let e=this.getMethodId.bind(this,n);un={getName:e("getName","()Ljava/lang/String;"),getGenericParameterTypes:e("getGenericParameterTypes","()[Ljava/lang/reflect/Type;"),getParameterTypes:e("getParameterTypes","()[Ljava/lang/Class;"),getGenericReturnType:e("getGenericReturnType","()Ljava/lang/reflect/Type;"),getGenericExceptionTypes:e("getGenericExceptionTypes","()[Ljava/lang/reflect/Type;"),getModifiers:e("getModifiers","()I"),isVarArgs:e("isVarArgs","()Z")}}finally{this.deleteLocalRef(n)}}return un};var pn=null;b.prototype.javaLangReflectField=function(){if(pn===null){let n=this.findClass("java/lang/reflect/Field");try{let e=this.getMethodId.bind(this,n);pn={getName:e("getName","()Ljava/lang/String;"),getType:e("getType","()Ljava/lang/Class;"),getGenericType:e("getGenericType","()Ljava/lang/reflect/Type;"),getModifiers:e("getModifiers","()I"),toString:e("toString","()Ljava/lang/String;")}}finally{this.deleteLocalRef(n)}}return pn};var fn=null;b.prototype.javaLangReflectTypeVariable=function(){if(fn===null){let n=this.findClass("java/lang/reflect/TypeVariable");try{let e=this.getMethodId.bind(this,n);fn={handle:Ue(this.newGlobalRef(n)),getName:e("getName","()Ljava/lang/String;"),getBounds:e("getBounds","()[Ljava/lang/reflect/Type;"),getGenericDeclaration:e("getGenericDeclaration","()Ljava/lang/reflect/GenericDeclaration;")}}finally{this.deleteLocalRef(n)}}return fn};var hn=null;b.prototype.javaLangReflectWildcardType=function(){if(hn===null){let n=this.findClass("java/lang/reflect/WildcardType");try{let e=this.getMethodId.bind(this,n);hn={handle:Ue(this.newGlobalRef(n)),getLowerBounds:e("getLowerBounds","()[Ljava/lang/reflect/Type;"),getUpperBounds:e("getUpperBounds","()[Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(n)}}return hn};var _n=null;b.prototype.javaLangReflectGenericArrayType=function(){if(_n===null){let n=this.findClass("java/lang/reflect/GenericArrayType");try{_n={handle:Ue(this.newGlobalRef(n)),getGenericComponentType:this.getMethodId(n,"getGenericComponentType","()Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(n)}}return _n};var mn=null;b.prototype.javaLangReflectParameterizedType=function(){if(mn===null){let n=this.findClass("java/lang/reflect/ParameterizedType");try{let e=this.getMethodId.bind(this,n);mn={handle:Ue(this.newGlobalRef(n)),getActualTypeArguments:e("getActualTypeArguments","()[Ljava/lang/reflect/Type;"),getRawType:e("getRawType","()Ljava/lang/reflect/Type;"),getOwnerType:e("getOwnerType","()Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(n)}}return mn};var gn=null;b.prototype.javaLangString=function(){if(gn===null){let n=this.findClass("java/lang/String");try{gn={handle:Ue(this.newGlobalRef(n))}}finally{this.deleteLocalRef(n)}}return gn};b.prototype.getClassName=function(n){let e=this.vaMethod("pointer",[])(this.handle,n,this.javaLangClass().getName);try{return this.stringFromJni(e)}finally{this.deleteLocalRef(e)}};b.prototype.getObjectClassName=function(n){let e=this.getObjectClass(n);try{return this.getClassName(e)}finally{this.deleteLocalRef(e)}};b.prototype.getActualTypeArgument=function(n){let e=this.vaMethod("pointer",[])(this.handle,n,this.javaLangReflectParameterizedType().getActualTypeArguments);if(this.throwIfExceptionPending(),!e.isNull())try{return this.getTypeNameFromFirstTypeElement(e)}finally{this.deleteLocalRef(e)}};b.prototype.getTypeNameFromFirstTypeElement=function(n){if(this.getArrayLength(n)>0){let t=this.getObjectArrayElement(n,0);try{return this.getTypeName(t)}finally{this.deleteLocalRef(t)}}else return"java.lang.Object"};b.prototype.getTypeName=function(n,e){let t=this.vaMethod("pointer",[]);if(this.isInstanceOf(n,this.javaLangClass().handle))return this.getClassName(n);if(this.isInstanceOf(n,this.javaLangReflectGenericArrayType().handle))return this.getArrayTypeName(n);if(this.isInstanceOf(n,this.javaLangReflectParameterizedType().handle)){let r=t(this.handle,n,this.javaLangReflectParameterizedType().getRawType);this.throwIfExceptionPending();let o;try{o=this.getTypeName(r)}finally{this.deleteLocalRef(r)}return e&&(o+="<"+this.getActualTypeArgument(n)+">"),o}else return this.isInstanceOf(n,this.javaLangReflectTypeVariable().handle)||this.isInstanceOf(n,this.javaLangReflectWildcardType().handle),"java.lang.Object"};b.prototype.getArrayTypeName=function(n){let e=this.vaMethod("pointer",[]);if(this.isInstanceOf(n,this.javaLangClass().handle))return this.getClassName(n);if(this.isInstanceOf(n,this.javaLangReflectGenericArrayType().handle)){let t=e(this.handle,n,this.javaLangReflectGenericArrayType().getGenericComponentType);this.throwIfExceptionPending();try{return"[L"+this.getTypeName(t)+";"}finally{this.deleteLocalRef(t)}}else return"[Ljava.lang.Object;"};b.prototype.stringFromJni=function(n){let e=this.getStringChars(n);if(e.isNull())throw new Error("Unable to access string");try{let t=this.getStringLength(n);return e.readUtf16String(t)}finally{this.releaseStringChars(n,e)}};var Zr=65542,qe=Process.pointerSize,vn=Process.getCurrentThreadId(),Be=new Map,at=new Map;function Ce(n){let e=n.vm,t=null,r=null,o=null;function i(){let c=e.readPointer(),a={exceptions:"propagate"};t=new NativeFunction(c.add(4*qe).readPointer(),"int32",["pointer","pointer","pointer"],a),r=new NativeFunction(c.add(5*qe).readPointer(),"int32",["pointer"],a),o=new NativeFunction(c.add(6*qe).readPointer(),"int32",["pointer","pointer","int32"],a)}this.handle=e,this.perform=function(c){let a=Process.getCurrentThreadId(),l=s(a);if(l!==null)return c(l);let d=this._tryGetEnv(),p=d!==null;p||(d=this.attachCurrentThread(),Be.set(a,!0)),this.link(a,d);try{return c(d)}finally{let f=a===vn;if(f||this.unlink(a),!p&&!f){let u=Be.get(a);Be.delete(a),u&&this.detachCurrentThread()}}},this.attachCurrentThread=function(){let c=Memory.alloc(qe);return ue("VM::AttachCurrentThread",t(e,c,NULL)),new b(c.readPointer(),this)},this.detachCurrentThread=function(){ue("VM::DetachCurrentThread",r(e))},this.preventDetachDueToClassLoader=function(){let c=Process.getCurrentThreadId();Be.has(c)&&Be.set(c,!1)},this.getEnv=function(){let c=s(Process.getCurrentThreadId());if(c!==null)return c;let a=Memory.alloc(qe),l=o(e,a,Zr);if(l===-2)throw new Error("Current thread is not attached to the Java VM; please move this code inside a Java.perform() callback");return ue("VM::GetEnv",l),new b(a.readPointer(),this)},this.tryGetEnv=function(){let c=s(Process.getCurrentThreadId());return c!==null?c:this._tryGetEnv()},this._tryGetEnv=function(){let c=this.tryGetEnvHandle(Zr);return c===null?null:new b(c,this)},this.tryGetEnvHandle=function(c){let a=Memory.alloc(qe);return o(e,a,c)!==0?null:a.readPointer()},this.makeHandleDestructor=function(c){return()=>{this.perform(a=>{a.deleteGlobalRef(c)})}},this.link=function(c,a){let l=at.get(c);l===void 0?at.set(c,[a,1]):l[1]++},this.unlink=function(c){let a=at.get(c);a[1]===1?at.delete(c):a[1]--};function s(c){let a=at.get(c);return a===void 0?null:a[0]}i.call(this)}Ce.dispose=function(n){Be.get(vn)===!0&&(Be.delete(vn),n.detachCurrentThread())};var Ia=4,v=Process.pointerSize,{readU32:Ca,readPointer:Aa,writeU32:La,writePointer:xa}=NativePointer.prototype,Ta=1,ka=8,Na=16,Nt=256,Ma=524288,Oa=2097152,uo=1073741824,Ra=524288,ja=134217728,qr=1048576,Pa=2097152,Fa=268435456,Da=268435456,Ua=0,Mn=3,On=5,Jn=ptr(1).not(),Ba=2147467263,za=4294963200,Dt=17*v,Va=18*v,po=12,Ja=112,Ga=116,$a=0,wn=56,Kr=4,Ha=8,Za=10,qa=12,Ka=14,Wa=28,Qa=36,Ya=0,Xa=1,ec=2,tc=3,nc=4,rc=5,oc=6,ic=7,Wr=2147483648,sc=28,ut=3*v,ac=3*v,cc=1,lc=1,fo=de(Ec),dc=de(Oc),me=de(jc),We=de(Pc),uc=de(Fc),pc=de(Hc),ht=de(zc),ho=de(Vc),te=de(Jc),Gn=de(Gc),fc=de(Wc),hc=Process.arch==="ia32"?Pl:jl,W={exceptions:"propagate"},ct={},In=null,Cn=null,_o=null,ie=null,$n=[],Mt=new Map,mo=[],An=null,Qr=0,Yr=!1,Xr=!1,lt=null,_c=[],Ln=null,xt=null;function G(){return In===null&&(In=mc()),In}function mc(){let n=Process.enumerateModules().filter(u=>/^lib(art|dvm).so$/.test(u.name)).filter(u=>!/\/system\/fake-libs/.test(u.path));if(n.length===0)return null;let e=n[0],t=e.name.indexOf("art")!==-1?"art":"dalvik",r=t==="art",o={module:e,find(u){let{module:_}=this,h=_.findExportByName(u);return h===null&&(h=_.findSymbolByName(u)),h},flavor:t,addLocalReference:null};o.isApiLevel34OrApexEquivalent=r&&(o.find("_ZN3art7AppInfo29GetPrimaryApkReferenceProfileEv")!==null||o.find("_ZN3art6Thread15RunFlipFunctionEPS0_")!==null);let i=r?{functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],artInterpreterToCompiledCodeBridge:function(u){this.artInterpreterToCompiledCodeBridge=u},_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadENS_6ObjPtrINS_6mirror6ObjectEEE:["art::JavaVMExt::AddGlobalRef","pointer",["pointer","pointer","pointer"]],_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadEPNS_6mirror6ObjectE:["art::JavaVMExt::AddGlobalRef","pointer",["pointer","pointer","pointer"]],_ZN3art17ReaderWriterMutex13ExclusiveLockEPNS_6ThreadE:["art::ReaderWriterMutex::ExclusiveLock","void",["pointer","pointer"]],_ZN3art17ReaderWriterMutex15ExclusiveUnlockEPNS_6ThreadE:["art::ReaderWriterMutex::ExclusiveUnlock","void",["pointer","pointer"]],_ZN3art22IndirectReferenceTable3AddEjPNS_6mirror6ObjectE:function(u){this["art::IndirectReferenceTable::Add"]=new NativeFunction(u,"pointer",["pointer","uint","pointer"],W)},_ZN3art22IndirectReferenceTable3AddENS_15IRTSegmentStateENS_6ObjPtrINS_6mirror6ObjectEEE:function(u){this["art::IndirectReferenceTable::Add"]=new NativeFunction(u,"pointer",["pointer","uint","pointer"],W)},_ZN3art9JavaVMExt12DecodeGlobalEPv:function(u){let _;te()>=26?_=hc(u,["pointer","pointer"]):_=new NativeFunction(u,"pointer",["pointer","pointer"],W),this["art::JavaVMExt::DecodeGlobal"]=function(h,g,y){return _(h,y)}},_ZN3art9JavaVMExt12DecodeGlobalEPNS_6ThreadEPv:["art::JavaVMExt::DecodeGlobal","pointer",["pointer","pointer","pointer"]],_ZNK3art6Thread19DecodeGlobalJObjectEP8_jobject:["art::Thread::DecodeJObject","pointer",["pointer","pointer"]],_ZNK3art6Thread13DecodeJObjectEP8_jobject:["art::Thread::DecodeJObject","pointer",["pointer","pointer"]],_ZN3art10ThreadList10SuspendAllEPKcb:["art::ThreadList::SuspendAll","void",["pointer","pointer","bool"]],_ZN3art10ThreadList10SuspendAllEv:function(u){let _=new NativeFunction(u,"void",["pointer"],W);this["art::ThreadList::SuspendAll"]=function(h,g,y){return _(h)}},_ZN3art10ThreadList9ResumeAllEv:["art::ThreadList::ResumeAll","void",["pointer"]],_ZN3art11ClassLinker12VisitClassesEPNS_12ClassVisitorE:["art::ClassLinker::VisitClasses","void",["pointer","pointer"]],_ZN3art11ClassLinker12VisitClassesEPFbPNS_6mirror5ClassEPvES4_:function(u){let _=new NativeFunction(u,"void",["pointer","pointer","pointer"],W);this["art::ClassLinker::VisitClasses"]=function(h,g){_(h,g,NULL)}},_ZNK3art11ClassLinker17VisitClassLoadersEPNS_18ClassLoaderVisitorE:["art::ClassLinker::VisitClassLoaders","void",["pointer","pointer"]],_ZN3art2gc4Heap12VisitObjectsEPFvPNS_6mirror6ObjectEPvES5_:["art::gc::Heap::VisitObjects","void",["pointer","pointer","pointer"]],_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE:["art::gc::Heap::GetInstances","void",["pointer","pointer","pointer","int","pointer"]],_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEbiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE:function(u){let _=new NativeFunction(u,"void",["pointer","pointer","pointer","bool","int","pointer"],W);this["art::gc::Heap::GetInstances"]=function(h,g,y,E,C){_(h,g,y,0,E,C)}},_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEjb:["art::StackVisitor::StackVisitor","void",["pointer","pointer","pointer","uint","uint","bool"]],_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEmb:["art::StackVisitor::StackVisitor","void",["pointer","pointer","pointer","uint","size_t","bool"]],_ZN3art12StackVisitor9WalkStackILNS0_16CountTransitionsE0EEEvb:["art::StackVisitor::WalkStack","void",["pointer","bool"]],_ZNK3art12StackVisitor9GetMethodEv:["art::StackVisitor::GetMethod","pointer",["pointer"]],_ZNK3art12StackVisitor16DescribeLocationEv:function(u){this["art::StackVisitor::DescribeLocation"]=kt(u,["pointer"])},_ZNK3art12StackVisitor24GetCurrentQuickFrameInfoEv:function(u){this["art::StackVisitor::GetCurrentQuickFrameInfo"]=Kc(u)},_ZN3art7Context6CreateEv:["art::Context::Create","pointer",[]],_ZN3art6Thread18GetLongJumpContextEv:["art::Thread::GetLongJumpContext","pointer",["pointer"]],_ZN3art6mirror5Class13GetDescriptorEPNSt3__112basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE:function(u){this["art::mirror::Class::GetDescriptor"]=u},_ZN3art6mirror5Class11GetLocationEv:function(u){this["art::mirror::Class::GetLocation"]=kt(u,["pointer"])},_ZN3art9ArtMethod12PrettyMethodEb:function(u){this["art::ArtMethod::PrettyMethod"]=kt(u,["pointer","bool"])},_ZN3art12PrettyMethodEPNS_9ArtMethodEb:function(u){this["art::ArtMethod::PrettyMethodNullSafe"]=kt(u,["pointer","bool"])},_ZN3art6Thread14CurrentFromGdbEv:["art::Thread::CurrentFromGdb","pointer",[]],_ZN3art6mirror6Object5CloneEPNS_6ThreadE:function(u){this["art::mirror::Object::Clone"]=new NativeFunction(u,"pointer",["pointer","pointer"],W)},_ZN3art6mirror6Object5CloneEPNS_6ThreadEm:function(u){let _=new NativeFunction(u,"pointer",["pointer","pointer","pointer"],W);this["art::mirror::Object::Clone"]=function(h,g){let y=NULL;return _(h,g,y)}},_ZN3art6mirror6Object5CloneEPNS_6ThreadEj:function(u){let _=new NativeFunction(u,"pointer",["pointer","pointer","uint"],W);this["art::mirror::Object::Clone"]=function(h,g){return _(h,g,0)}},_ZN3art3Dbg14SetJdwpAllowedEb:["art::Dbg::SetJdwpAllowed","void",["bool"]],_ZN3art3Dbg13ConfigureJdwpERKNS_4JDWP11JdwpOptionsE:["art::Dbg::ConfigureJdwp","void",["pointer"]],_ZN3art31InternalDebuggerControlCallback13StartDebuggerEv:["art::InternalDebuggerControlCallback::StartDebugger","void",["pointer"]],_ZN3art3Dbg9StartJdwpEv:["art::Dbg::StartJdwp","void",[]],_ZN3art3Dbg8GoActiveEv:["art::Dbg::GoActive","void",[]],_ZN3art3Dbg21RequestDeoptimizationERKNS_21DeoptimizationRequestE:["art::Dbg::RequestDeoptimization","void",["pointer"]],_ZN3art3Dbg20ManageDeoptimizationEv:["art::Dbg::ManageDeoptimization","void",[]],_ZN3art15instrumentation15Instrumentation20EnableDeoptimizationEv:["art::Instrumentation::EnableDeoptimization","void",["pointer"]],_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEPKc:["art::Instrumentation::DeoptimizeEverything","void",["pointer","pointer"]],_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEv:function(u){let _=new NativeFunction(u,"void",["pointer"],W);this["art::Instrumentation::DeoptimizeEverything"]=function(h,g){_(h)}},_ZN3art7Runtime19DeoptimizeBootImageEv:["art::Runtime::DeoptimizeBootImage","void",["pointer"]],_ZN3art15instrumentation15Instrumentation10DeoptimizeEPNS_9ArtMethodE:["art::Instrumentation::Deoptimize","void",["pointer","pointer"]],_ZN3art3jni12JniIdManager14DecodeMethodIdEP10_jmethodID:["art::jni::JniIdManager::DecodeMethodId","pointer",["pointer","pointer"]],_ZN3art3jni12JniIdManager13DecodeFieldIdEP9_jfieldID:["art::jni::JniIdManager::DecodeFieldId","pointer",["pointer","pointer"]],_ZN3art11interpreter18GetNterpEntryPointEv:["art::interpreter::GetNterpEntryPoint","pointer",[]],_ZN3art7Monitor17TranslateLocationEPNS_9ArtMethodEjPPKcPi:["art::Monitor::TranslateLocation","void",["pointer","uint32","pointer","pointer"]]},variables:{_ZN3art3Dbg9gRegistryE:function(u){this.isJdwpStarted=()=>!u.readPointer().isNull()},_ZN3art3Dbg15gDebuggerActiveE:function(u){this.isDebuggerActive=()=>!!u.readU8()}},optionals:new Set(["artInterpreterToCompiledCodeBridge","_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadENS_6ObjPtrINS_6mirror6ObjectEEE","_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadEPNS_6mirror6ObjectE","_ZN3art9JavaVMExt12DecodeGlobalEPv","_ZN3art9JavaVMExt12DecodeGlobalEPNS_6ThreadEPv","_ZNK3art6Thread19DecodeGlobalJObjectEP8_jobject","_ZNK3art6Thread13DecodeJObjectEP8_jobject","_ZN3art10ThreadList10SuspendAllEPKcb","_ZN3art10ThreadList10SuspendAllEv","_ZN3art11ClassLinker12VisitClassesEPNS_12ClassVisitorE","_ZN3art11ClassLinker12VisitClassesEPFbPNS_6mirror5ClassEPvES4_","_ZNK3art11ClassLinker17VisitClassLoadersEPNS_18ClassLoaderVisitorE","_ZN3art6mirror6Object5CloneEPNS_6ThreadE","_ZN3art6mirror6Object5CloneEPNS_6ThreadEm","_ZN3art6mirror6Object5CloneEPNS_6ThreadEj","_ZN3art22IndirectReferenceTable3AddEjPNS_6mirror6ObjectE","_ZN3art22IndirectReferenceTable3AddENS_15IRTSegmentStateENS_6ObjPtrINS_6mirror6ObjectEEE","_ZN3art2gc4Heap12VisitObjectsEPFvPNS_6mirror6ObjectEPvES5_","_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE","_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEbiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE","_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEjb","_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEmb","_ZN3art12StackVisitor9WalkStackILNS0_16CountTransitionsE0EEEvb","_ZNK3art12StackVisitor9GetMethodEv","_ZNK3art12StackVisitor16DescribeLocationEv","_ZNK3art12StackVisitor24GetCurrentQuickFrameInfoEv","_ZN3art7Context6CreateEv","_ZN3art6Thread18GetLongJumpContextEv","_ZN3art6mirror5Class13GetDescriptorEPNSt3__112basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE","_ZN3art6mirror5Class11GetLocationEv","_ZN3art9ArtMethod12PrettyMethodEb","_ZN3art12PrettyMethodEPNS_9ArtMethodEb","_ZN3art3Dbg13ConfigureJdwpERKNS_4JDWP11JdwpOptionsE","_ZN3art31InternalDebuggerControlCallback13StartDebuggerEv","_ZN3art3Dbg15gDebuggerActiveE","_ZN3art15instrumentation15Instrumentation20EnableDeoptimizationEv","_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEPKc","_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEv","_ZN3art7Runtime19DeoptimizeBootImageEv","_ZN3art15instrumentation15Instrumentation10DeoptimizeEPNS_9ArtMethodE","_ZN3art3Dbg9StartJdwpEv","_ZN3art3Dbg8GoActiveEv","_ZN3art3Dbg21RequestDeoptimizationERKNS_21DeoptimizationRequestE","_ZN3art3Dbg20ManageDeoptimizationEv","_ZN3art3Dbg9gRegistryE","_ZN3art3jni12JniIdManager14DecodeMethodIdEP10_jmethodID","_ZN3art3jni12JniIdManager13DecodeFieldIdEP9_jfieldID","_ZN3art11interpreter18GetNterpEntryPointEv","_ZN3art7Monitor17TranslateLocationEPNS_9ArtMethodEjPPKcPi"])}:{functions:{_Z20dvmDecodeIndirectRefP6ThreadP8_jobject:["dvmDecodeIndirectRef","pointer",["pointer","pointer"]],_Z15dvmUseJNIBridgeP6MethodPv:["dvmUseJNIBridge","void",["pointer","pointer"]],_Z20dvmHeapSourceGetBasev:["dvmHeapSourceGetBase","pointer",[]],_Z21dvmHeapSourceGetLimitv:["dvmHeapSourceGetLimit","pointer",[]],_Z16dvmIsValidObjectPK6Object:["dvmIsValidObject","uint8",["pointer"]],JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]]},variables:{gDvmJni:function(u){this.gDvmJni=u},gDvm:function(u){this.gDvm=u}}},{functions:s={},variables:c={},optionals:a=new Set}=i,l=[];for(let[u,_]of Object.entries(s)){let h=o.find(u);h!==null?typeof _=="function"?_.call(o,h):o[_[0]]=new NativeFunction(h,_[1],_[2],W):a.has(u)||l.push(u)}for(let[u,_]of Object.entries(c)){let h=o.find(u);h!==null?_.call(o,h):a.has(u)||l.push(u)}if(l.length>0)throw new Error("Java API only partially available; please file a bug. Missing: "+l.join(", "));let d=Memory.alloc(v),p=Memory.alloc(Ia);if(ue("JNI_GetCreatedJavaVMs",o.JNI_GetCreatedJavaVMs(d,1,p)),p.readInt()===0)return null;if(o.vm=d.readPointer(),r){let u=te(),_;u>=27?_=33554432:u>=24?_=16777216:_=0,o.kAccCompileDontBother=_;let h=o.vm.add(v).readPointer();o.artRuntime=h;let g=fo(o),y=g.offset,E=y.instrumentation;o.artInstrumentation=E!==null?h.add(E):null,Gn()>=36e7&&o.artInstrumentation!=null&&(o.artInstrumentation=o.artInstrumentation.readPointer()),o.artHeap=h.add(y.heap).readPointer(),o.artThreadList=h.add(y.threadList).readPointer();let L=h.add(y.classLinker).readPointer(),M=Rc(h,g).offset,R=L.add(M.quickResolutionTrampoline).readPointer(),N=L.add(M.quickImtConflictTrampoline).readPointer(),k=L.add(M.quickGenericJniTrampoline).readPointer(),S=L.add(M.quickToInterpreterBridgeTrampoline).readPointer();o.artClassLinker={address:L,quickResolutionTrampoline:R,quickImtConflictTrampoline:N,quickGenericJniTrampoline:k,quickToInterpreterBridgeTrampoline:S};let x=new Ce(o);o.artQuickGenericJniTrampoline=xn(k,x),o.artQuickToInterpreterBridge=xn(S,x),o.artQuickResolutionTrampoline=xn(R,x),o["art::JavaVMExt::AddGlobalRef"]===void 0&&(o["art::JavaVMExt::AddGlobalRef"]=Tl(o)),o["art::JavaVMExt::DecodeGlobal"]===void 0&&(o["art::JavaVMExt::DecodeGlobal"]=kl(o)),o["art::ArtMethod::PrettyMethod"]===void 0&&(o["art::ArtMethod::PrettyMethod"]=o["art::ArtMethod::PrettyMethodNullSafe"]),o["art::interpreter::GetNterpEntryPoint"]!==void 0?o.artNterpEntryPoint=o["art::interpreter::GetNterpEntryPoint"]():o.artNterpEntryPoint=o.find("ExecuteNterpImpl"),ie=Xc(o,x),Rl(o);let O=null;Object.defineProperty(o,"jvmti",{get(){return O===null&&(O=[gc(x,this.artRuntime)]),O[0]}})}let f=e.enumerateImports().filter(u=>u.name.indexOf("_Z")===0).reduce((u,_)=>(u[_.name]=_.address,u),{});return o.$new=new NativeFunction(f._Znwm||f._Znwj,"pointer",["ulong"],W),o.$delete=new NativeFunction(f._ZdlPv,"void",["pointer"],W),_o=r?Un:Bn,o}function gc(n,e){let t=null;return n.perform(()=>{let r=G().find("_ZN3art7Runtime18EnsurePluginLoadedEPKcPNSt3__112basic_stringIcNS3_11char_traitsIcEENS3_9allocatorIcEEEE");if(r===null)return;let o=new NativeFunction(r,"bool",["pointer","pointer","pointer"]),i=Memory.alloc(v);if(!o(e,Memory.allocUtf8String("libopenjdkjvmti.so"),i))return;let c=wt.v1_2|1073741824,a=n.tryGetEnvHandle(c);if(a===null)return;t=new ke(a,n);let l=Memory.alloc(8);l.writeU64(It.canTagObjects),t.addCapabilities(l)!==0&&(t=null)}),t}function yc(n,e){G().flavor==="art"&&n.getClassName(e)}function bc(n){return{offset:v===4?{globalsLock:32,globals:72}:{globalsLock:64,globals:112}}}function Ec(n){let e=n.vm,t=n.artRuntime,r=v===4?200:384,o=r+100*v,i=te(),s=ho(),{isApiLevel34OrApexEquivalent:c}=n,a=null;for(let d=r;d!==o;d+=v)if(t.add(d).readPointer().equals(e)){let f,u=null;i>=33||s==="Tiramisu"||c?(f=[d-4*v],u=d-v):i>=30||s==="R"?(f=[d-3*v,d-4*v],u=d-v):i>=29?f=[d-2*v]:i>=27?f=[d-ut-3*v]:f=[d-ut-2*v];for(let _ of f){let h=_-v,g=h-v,y;c?y=g-9*v:i>=24?y=g-8*v:i>=23?y=g-7*v:y=g-4*v;let E={offset:{heap:y,threadList:g,internTable:h,classLinker:_,jniIdManager:u}};if(go(t,E)!==null){a=E;break}}break}if(a===null)throw new Error("Unable to determine Runtime field offsets");let l=Gn()>=36e7;return a.offset.instrumentation=l?Ac(n):Sc(n),a.offset.jniIdsIndirection=kc(n),a}var vc={ia32:eo,x64:eo,arm:wc,arm64:Ic};function Sc(n){let e=n["art::Runtime::DeoptimizeBootImage"];return e===void 0?null:Ne(e,vc[Process.arch],{limit:30})}function eo(n){if(n.mnemonic!=="lea")return null;let e=n.operands[1].value.disp;return e<256||e>1024?null:e}function wc(n){if(n.mnemonic!=="add.w")return null;let e=n.operands;if(e.length!==3)return null;let t=e[2];return t.type!=="imm"?null:t.value}function Ic(n){if(n.mnemonic!=="add")return null;let e=n.operands;if(e.length!==3||e[0].value==="sp"||e[1].value==="sp")return null;let t=e[2];if(t.type!=="imm")return null;let r=t.value.valueOf();return r<256||r>1024?null:r}var Cc={ia32:to,x64:to,arm:Lc,arm64:xc};function Ac(n){let e=n["art::Runtime::DeoptimizeBootImage"];return e===void 0?null:Ne(e,Cc[Process.arch],{limit:30})}function to(n){if(n.mnemonic!=="mov")return null;let e=n.operands;if(e[0].value!=="rax")return null;let r=e[1];if(r.type!=="mem")return null;let o=r.value;if(o.base!=="rdi")return null;let i=o.disp;return i<256||i>1024?null:i}function Lc(n){return null}function xc(n){if(n.mnemonic!=="ldr")return null;let e=n.operands;if(e[0].value==="x0")return null;let t=e[1].value;if(t.base!=="x0")return null;let r=t.disp;return r<256||r>1024?null:r}var Tc={ia32:no,x64:no,arm:Nc,arm64:Mc};function kc(n){let e=n.find("_ZN3art7Runtime12SetJniIdTypeENS_9JniIdTypeE");if(e===null)return null;let t=Ne(e,Tc[Process.arch],{limit:20});if(t===null)throw new Error("Unable to determine Runtime.jni_ids_indirection_ offset");return t}function no(n){return n.mnemonic==="cmp"?n.operands[0].value.disp:null}function Nc(n){return n.mnemonic==="ldr.w"?n.operands[1].value.disp:null}function Mc(n,e){if(e===null)return null;let{mnemonic:t}=n,{mnemonic:r}=e;return t==="cmp"&&r==="ldr"||t==="bl"&&r==="str"?e.operands[1].value.disp:null}function Oc(){let e={"4-21":136,"4-22":136,"4-23":172,"4-24":196,"4-25":196,"4-26":196,"4-27":196,"4-28":212,"4-29":172,"4-30":180,"4-31":180,"8-21":224,"8-22":224,"8-23":296,"8-24":344,"8-25":344,"8-26":352,"8-27":352,"8-28":392,"8-29":328,"8-30":336,"8-31":336}[`${v}-${te()}`];if(e===void 0)throw new Error("Unable to determine Instrumentation field offsets");return{offset:{forcedInterpretOnly:4,deoptimizationEnabled:e}}}function Rc(n,e){let t=go(n,e);if(t===null)throw new Error("Unable to determine ClassLinker field offsets");return t}function go(n,e){if(Cn!==null)return Cn;let{classLinker:t,internTable:r}=e.offset,o=n.add(t).readPointer(),i=n.add(r).readPointer(),s=v===4?100:200,c=s+100*v,a=te(),l=null;for(let d=s;d!==c;d+=v)if(o.add(d).readPointer().equals(i)){let f;a>=30||ho()==="R"?f=6:a>=29?f=4:a>=23?f=3:f=5;let u=d+f*v,_;a>=23?_=u-2*v:_=u-3*v,l={offset:{quickResolutionTrampoline:_,quickImtConflictTrampoline:u-v,quickGenericJniTrampoline:u,quickToInterpreterBridgeTrampoline:u+v}};break}return l!==null&&(Cn=l),l}function Hn(n){let t=null;return n.perform(r=>{let o=Ut(n),i=me(n),s={artArrayLengthSize:4,artArrayEntrySize:o.size,artArrayMax:50},c={artArrayLengthSize:v,artArrayEntrySize:i.size,artArrayMax:100},a=(f,u,_)=>{let h=f.add(u).readPointer();if(h.isNull())return null;let g=_===4?h.readU32():h.readU64().valueOf();return g<=0?null:{length:g,data:h.add(_)}},l=(f,u,_,h)=>{try{let g=a(f,u,h.artArrayLengthSize);if(g===null)return!1;let y=Math.min(g.length,h.artArrayMax);for(let E=0;E!==y;E++)if(g.data.add(E*h.artArrayEntrySize).equals(_))return!0}catch{}return!1},d=r.findClass("java/lang/Thread"),p=r.newGlobalRef(d);try{let f;Ee(n,r,k=>{f=G()["art::JavaVMExt::DecodeGlobal"](n,k,p)});let u=io(r.getFieldId(p,"name","Ljava/lang/String;")),_=io(r.getStaticFieldId(p,"MAX_PRIORITY","I")),h=-1,g=-1;for(let k=0;k!==256;k+=4)h===-1&&l(f,k,_,s)&&(h=k),g===-1&&l(f,k,u,s)&&(g=k);if(g===-1||h===-1)throw new Error("Unable to find fields in java/lang/Thread; please file a bug");let y=g!==h?h:0,E=g,C=-1,L=Xn(r.getMethodId(p,"getName","()Ljava/lang/String;"));for(let k=0;k!==256;k+=4)C===-1&&l(f,k,L,c)&&(C=k);if(C===-1)throw new Error("Unable to find methods in java/lang/Thread; please file a bug");let M=-1,N=a(f,C,c.artArrayLengthSize).length;for(let k=C;k!==256;k+=4)if(f.add(k).readU16()===N){M=k;break}if(M===-1)throw new Error("Unable to find copied methods in java/lang/Thread; please file a bug");t={offset:{ifields:E,methods:C,sfields:y,copiedMethodsOffset:M}}}finally{r.deleteLocalRef(d),r.deleteGlobalRef(p)}}),t}function jc(n){let e=G(),t;return n.perform(r=>{let o=r.findClass("android/os/Process"),i=Xn(r.getStaticMethodId(o,"getElapsedCpuTime","()J"));r.deleteLocalRef(o);let s=Process.getModuleByName("libandroid_runtime.so"),c=s.base,a=c.add(s.size),l=te(),d=l<=21?8:v,p=Ta|ka|Na|Nt,f=~(uo|Fa|Pa)>>>0,u=null,_=null,h=2;for(let E=0;E!==64&&h!==0;E+=4){let C=i.add(E);if(u===null){let L=C.readPointer();L.compare(c)>=0&&L.compare(a)<0&&(u=E,h--)}_===null&&(C.readU32()&f)===p&&(_=E,h--)}if(h!==0)throw new Error("Unable to determine ArtMethod field offsets");let g=u+d;t={size:l<=21?g+32:g+v,offset:{jniCode:u,quickCode:g,accessFlags:_}},"artInterpreterToCompiledCodeBridge"in e&&(t.offset.interpreterCode=u-d)}),t}function Ut(n){let e=te();return e>=23?{size:16,offset:{accessFlags:4}}:e>=21?{size:24,offset:{accessFlags:12}}:null}function Pc(n){let e=te(),t;return n.perform(r=>{let o=Bt(r),i=r.handle,s=null,c=null,a=null,l=null,d=null,p=null;for(let f=144;f!==256;f+=v)if(o.add(f).readPointer().equals(i)){c=f-6*v,d=f-4*v,p=f+2*v,e<=22&&(c-=v,s=c-v-9*8-3*4,a=f+6*v,d-=v,p-=v),l=f+9*v,e<=22&&(l+=2*v+4,v===8&&(l+=4)),e>=23&&(l+=v);break}if(l===null)throw new Error("Unable to determine ArtThread field offsets");t={offset:{isExceptionReportedToInstrumentation:s,exception:c,throwLocation:a,topHandleScope:l,managedStack:d,self:p}}}),t}function Fc(){return te()>=23?{offset:{topQuickFrame:0,link:v}}:{offset:{topQuickFrame:2*v,link:0}}}var Dc={ia32:ro,x64:ro,arm:Uc,arm64:Bc};function xn(n,e){let t;return e.perform(r=>{let o=Bt(r),i=Dc[Process.arch],s=Instruction.parse(n),c=i(s);c!==null?t=o.add(c).readPointer():t=n}),t}function ro(n){return n.mnemonic==="jmp"?n.operands[0].value.disp:null}function Uc(n){return n.mnemonic==="ldr.w"?n.operands[1].value.disp:null}function Bc(n){return n.mnemonic==="ldr"?n.operands[1].value.disp:null}function Bt(n){return n.handle.add(v).readPointer()}function zc(){return Zn("ro.build.version.release")}function Vc(){return Zn("ro.build.version.codename")}function Jc(){return parseInt(Zn("ro.build.version.sdk"),10)}function Gc(){try{let n=File.readAllText("/proc/self/mountinfo"),e=null,t=new Map;for(let o of n.trimEnd().split(`
`)){let i=o.split(" "),s=i[4];if(!s.startsWith("/apex/com.android.art"))continue;let c=i[10];s.includes("@")?t.set(c,s.split("@")[1]):e=c}let r=t.get(e);return r!==void 0?parseInt(r):oo()}catch{return oo()}}function oo(){return te()*1e7}var Tn=null,$c=92;function Zn(n){Tn===null&&(Tn=new NativeFunction(Process.getModuleByName("libc.so").getExportByName("__system_property_get"),"int",["pointer","pointer"],W));let e=Memory.alloc($c);return Tn(Memory.allocUtf8String(n),e),e.readUtf8String()}function Ee(n,e,t){let r=pc(n,e),o=Bt(e).toString();if(ct[o]=t,r(e.handle),ct[o]!==void 0)throw delete ct[o],new Error("Unable to perform state transition; please file a bug")}function Hc(n,e){let t=new NativeCallback(Zc,"void",["pointer"]);return Eo(n,e,t)}function Zc(n){let e=n.toString(),t=ct[e];delete ct[e],t(n)}function qn(n){let e=G(),t=e.artThreadList;e["art::ThreadList::SuspendAll"](t,Memory.allocUtf8String("frida"),!1?1:0);try{n()}finally{e["art::ThreadList::ResumeAll"](t)}}var Rn=class{constructor(e){let t=Memory.alloc(4*v),r=t.add(v);t.writePointer(r);let o=new NativeCallback((i,s)=>e(s)===!0?1:0,"bool",["pointer","pointer"]);r.add(2*v).writePointer(o),this.handle=t,this._onVisit=o}};function Kn(n){return G()["art::ClassLinker::VisitClasses"]instanceof NativeFunction?new Rn(n):new NativeCallback(t=>n(t)===!0?1:0,"bool",["pointer","pointer"])}var jn=class{constructor(e){let t=Memory.alloc(4*v),r=t.add(v);t.writePointer(r);let o=new NativeCallback((i,s)=>{e(s)},"void",["pointer","pointer"]);r.add(2*v).writePointer(o),this.handle=t,this._onVisit=o}};function Wn(n){return new jn(n)}var qc={"include-inlined-frames":0,"skip-inlined-frames":1},Pn=class{constructor(e,t,r,o=0,i=!0){let s=G(),c=512,a=3*v,l=Memory.alloc(c+a);s["art::StackVisitor::StackVisitor"](l,e,t,qc[r],o,i?1:0);let d=l.add(c);l.writePointer(d);let p=new NativeCallback(this._visitFrame.bind(this),"bool",["pointer"]);d.add(2*v).writePointer(p),this.handle=l,this._onVisitFrame=p;let f=l.add(v===4?12:24);this._curShadowFrame=f,this._curQuickFrame=f.add(v),this._curQuickFramePc=f.add(2*v),this._curOatQuickMethodHeader=f.add(3*v),this._getMethodImpl=s["art::StackVisitor::GetMethod"],this._descLocImpl=s["art::StackVisitor::DescribeLocation"],this._getCQFIImpl=s["art::StackVisitor::GetCurrentQuickFrameInfo"]}walkStack(e=!1){G()["art::StackVisitor::WalkStack"](this.handle,e?1:0)}_visitFrame(){return this.visitFrame()?1:0}visitFrame(){throw new Error("Subclass must implement visitFrame")}getMethod(){let e=this._getMethodImpl(this.handle);return e.isNull()?null:new Ot(e)}getCurrentQuickFramePc(){return this._curQuickFramePc.readPointer()}getCurrentQuickFrame(){return this._curQuickFrame.readPointer()}getCurrentShadowFrame(){return this._curShadowFrame.readPointer()}describeLocation(){let e=new Pt;return this._descLocImpl(e,this.handle),e.disposeToString()}getCurrentOatQuickMethodHeader(){return this._curOatQuickMethodHeader.readPointer()}getCurrentQuickFrameInfo(){return this._getCQFIImpl(this.handle)}},Ot=class{constructor(e){this.handle=e}prettyMethod(e=!0){let t=new Pt;return G()["art::ArtMethod::PrettyMethod"](t,this.handle,e?1:0),t.disposeToString()}toString(){return`ArtMethod(handle=${this.handle})`}};function Kc(n){return function(e){let t=Memory.alloc(12);return fc(n)(t,e),{frameSizeInBytes:t.readU32(),coreSpillMask:t.add(4).readU32(),fpSpillMask:t.add(8).readU32()}}}function Wc(n){let e=NULL;switch(Process.arch){case"ia32":e=Ke(32,t=>{t.putMovRegRegOffsetPtr("ecx","esp",4),t.putMovRegRegOffsetPtr("edx","esp",8),t.putCallAddressWithArguments(n,["ecx","edx"]),t.putMovRegReg("esp","ebp"),t.putPopReg("ebp"),t.putRet()});break;case"x64":e=Ke(32,t=>{t.putPushReg("rdi"),t.putCallAddressWithArguments(n,["rsi"]),t.putPopReg("rdi"),t.putMovRegPtrReg("rdi","rax"),t.putMovRegOffsetPtrReg("rdi",8,"edx"),t.putRet()});break;case"arm":e=Ke(16,t=>{t.putCallAddressWithArguments(n,["r0","r1"]),t.putPopRegs(["r0","lr"]),t.putMovRegReg("pc","lr")});break;case"arm64":e=Ke(64,t=>{t.putPushRegReg("x0","lr"),t.putCallAddressWithArguments(n,["x1"]),t.putPopRegReg("x2","lr"),t.putStrRegRegOffset("x0","x2",0),t.putStrRegRegOffset("w1","x2",8),t.putRet()});break}return new NativeFunction(e,"void",["pointer","pointer"],W)}var Qc={ia32:globalThis.X86Relocator,x64:globalThis.X86Relocator,arm:globalThis.ThumbRelocator,arm64:globalThis.Arm64Relocator},Fn={ia32:globalThis.X86Writer,x64:globalThis.X86Writer,arm:globalThis.ThumbWriter,arm64:globalThis.Arm64Writer};function Ke(n,e){An===null&&(An=Memory.alloc(Process.pageSize));let t=An.add(Qr),r=Process.arch,o=Fn[r];return Memory.patchCode(t,n,i=>{let s=new o(i,{pc:t});if(e(s),s.flush(),s.offset>n)throw new Error(`Wrote ${s.offset}, exceeding maximum of ${n}`)}),Qr+=n,r==="arm"?t.or(1):t}function Yc(n,e){el(e),il(e)}function Xc(n,e){let t=We(e).offset,r=uc().offset,o=`
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
`,i=8,s=v,c=v,a=v,d=Memory.alloc(i+s+c+a),p=d.add(i),f=p.add(s),u=f.add(c),_=n.find(v===4?"_ZN3art9ArtMethod23GetOatQuickMethodHeaderEj":"_ZN3art9ArtMethod23GetOatQuickMethodHeaderEm"),h=new CModule(o,{lock:d,methods:p,replacements:f,last_seen_art_method:u,get_oat_quick_method_header_impl:_??ptr("0xdeadbeef")}),g={exceptions:"propagate",scheduling:"exclusive"};return{handle:h,replacedMethods:{isReplacement:new NativeFunction(h.is_replacement_method,"bool",["pointer"],g),get:new NativeFunction(h.get_replacement_method,"pointer",["pointer"],g),set:new NativeFunction(h.set_replacement_method,"void",["pointer","pointer"],g),synchronize:new NativeFunction(h.synchronize_replacement_methods,"void",["uint","pointer","pointer"],g),delete:new NativeFunction(h.delete_replacement_method,"void",["pointer"],g),translate:new NativeFunction(h.translate_method,"pointer",["pointer"],g),findReplacementFromQuickCode:h.find_replacement_method_from_quick_code},getOatQuickMethodHeaderImpl:_,hooks:{Interpreter:{doCall:h.on_interpreter_do_call},ArtMethod:{getOatQuickMethodHeader:h.on_art_method_get_oat_quick_method_header,prettyMethod:h.on_art_method_pretty_method},Gc:{copyingPhase:{onLeave:h.on_leave_gc_concurrent_copying_copying_phase},runFlip:{onEnter:h.on_leave_gc_concurrent_copying_copying_phase}}}}}function el(n){Xr||(Xr=!0,tl(n),nl(),rl(),ol())}function tl(n){let e=G();[e.artQuickGenericJniTrampoline,e.artQuickToInterpreterBridge,e.artQuickResolutionTrampoline].forEach(r=>{Memory.protect(r,32,"rwx");let o=new jt(r);o.activate(n),mo.push(o)})}function nl(){let n=G(),e=te(),{isApiLevel34OrApexEquivalent:t}=n,r;if(e<=22)r=/^_ZN3art11interpreter6DoCallILb[0-1]ELb[0-1]EEEbPNS_6mirror9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtPNS_6JValueE$/;else if(e<=33&&!t)r=/^_ZN3art11interpreter6DoCallILb[0-1]ELb[0-1]EEEbPNS_9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtPNS_6JValueE$/;else if(t)r=/^_ZN3art11interpreter6DoCallILb[0-1]EEEbPNS_9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtbPNS_6JValueE$/;else throw new Error("Unable to find method invocation in ART; please file a bug");let o=n.module,i=[...o.enumerateExports(),...o.enumerateSymbols()].filter(s=>r.test(s.name));if(i.length===0)throw new Error("Unable to find method invocation in ART; please file a bug");for(let s of i)Interceptor.attach(s.address,ie.hooks.Interpreter.doCall)}function rl(){let n=G(),t=n.module.findSymbolByName("_ZN3art2gc4Heap22CollectGarbageInternalENS0_9collector6GcTypeENS0_7GcCauseEbj");if(t===null)return;let{artNterpEntryPoint:r,artQuickToInterpreterBridge:o}=n,i=me(n.vm).offset.quickCode;Interceptor.attach(t,{onLeave(){ie.replacedMethods.synchronize(i,r,o)}})}function ol(){let n=[["_ZN3art11ClassLinker26VisiblyInitializedCallback22MarkVisiblyInitializedEPNS_6ThreadE","e90340f8 : ff0ff0ff"],["_ZN3art11ClassLinker26VisiblyInitializedCallback29AdjustThreadVisibilityCounterEPNS_6ThreadEl","7f0f00f9 : 1ffcffff"]],e=G(),t=e.module;for(let[r,o]of n){let i=t.findSymbolByName(r);if(i===null)continue;let s=Memory.scanSync(i,8192,o);if(s.length===0)return;let{artNterpEntryPoint:c,artQuickToInterpreterBridge:a}=e,l=me(e.vm).offset.quickCode;Interceptor.attach(s[0].address,function(){ie.replacedMethods.synchronize(l,c,a)});return}}function il(n){if(Yr)return;if(Yr=!0,!al()){let{getOatQuickMethodHeaderImpl:i}=ie;if(i===null)return;try{Interceptor.replace(i,ie.hooks.ArtMethod.getOatQuickMethodHeader)}catch{}}let e=te(),t=null,r=G();e>28?t=r.find("_ZN3art2gc9collector17ConcurrentCopying12CopyingPhaseEv"):e>22&&(t=r.find("_ZN3art2gc9collector17ConcurrentCopying12MarkingPhaseEv")),t!==null&&Interceptor.attach(t,ie.hooks.Gc.copyingPhase);let o=null;o=r.find("_ZN3art6Thread15RunFlipFunctionEPS0_"),o===null&&(o=r.find("_ZN3art6Thread15RunFlipFunctionEPS0_b")),o!==null&&Interceptor.attach(o,ie.hooks.Gc.runFlip)}var sl={arm:{signatures:[{pattern:["b0 68","01 30","0c d0","1b 98",":","c0 ff","c0 ff","00 ff","00 2f"],validateMatch:kn},{pattern:["d8 f8 08 00","01 30","0c d0","1b 98",":","f0 ff ff 0f","ff ff","00 ff","00 2f"],validateMatch:kn},{pattern:["b0 68","01 30","40 f0 c3 80","00 25",":","c0 ff","c0 ff","c0 fb 00 d0","ff f8"],validateMatch:kn}],instrument:ll},arm64:{signatures:[{pattern:["0a 40 b9","1f 05 00 31","40 01 00 54","88 39 00 f0",":","fc ff ff","1f fc ff ff","1f 00 00 ff","00 00 00 9f"],offset:1,validateMatch:Nn},{pattern:["0a 40 b9","1f 05 00 31","40 01 00 54","00 0e 40 f9",":","fc ff ff","1f fc ff ff","1f 00 00 ff","00 fc ff ff"],offset:1,validateMatch:Nn},{pattern:["0a 40 b9","1f 05 00 31","01 34 00 54","e0 03 1f aa",":","fc ff ff","1f fc ff ff","1f 00 00 ff","e0 ff ff ff"],offset:1,validateMatch:Nn}],instrument:dl}};function kn({address:n,size:e}){let t=Instruction.parse(n.or(1)),[r,o]=t.operands,i=o.value.base,s=r.value,c=Instruction.parse(t.next.add(2)),a=ptr(c.operands[0].value),l=c.address.add(c.size),d,p;return c.mnemonic==="beq"?(d=l,p=a):(d=a,p=l),Ne(d.or(1),f,{limit:3});function f(u){let{mnemonic:_}=u;if(!(_==="ldr"||_==="ldr.w"))return null;let{base:h,disp:g}=u.operands[1].value;return h===i&&g===20?{methodReg:i,scratchReg:s,target:{whenTrue:a,whenRegularMethod:d,whenRuntimeMethod:p}}:null}}function Nn({address:n,size:e}){let[t,r]=Instruction.parse(n).operands,o=r.value.base,i="x"+t.value.substring(1),s=Instruction.parse(n.add(8)),c=ptr(s.operands[0].value),a=n.add(12),l,d;return s.mnemonic==="b.eq"?(l=a,d=c):(l=c,d=a),Ne(l,p,{limit:3});function p(f){if(f.mnemonic!=="ldr")return null;let{base:u,disp:_}=f.operands[1].value;return u===o&&_===24?{methodReg:o,scratchReg:i,target:{whenTrue:c,whenRegularMethod:l,whenRuntimeMethod:d}}:null}}function al(){if(te()<31)return!1;let n=sl[Process.arch];if(n===void 0)return!1;let e=n.signatures.map(({pattern:r,offset:o=0,validateMatch:i=cl})=>({pattern:new MatchPattern(r.join("")),offset:o,validateMatch:i})),t=[];for(let{base:r,size:o}of G().module.enumerateRanges("--x"))for(let{pattern:i,offset:s,validateMatch:c}of e){let a=Memory.scanSync(r,o,i).map(({address:l,size:d})=>({address:l.sub(s),size:d+s})).filter(l=>{let d=c(l);return d===null?!1:(l.validationResult=d,!0)});t.push(...a)}return t.length===0?!1:(t.forEach(n.instrument),!0)}function cl(){return{}}var Rt=class{constructor(e,t,r){this.address=e,this.size=t,this.originalCode=e.readByteArray(t),this.trampoline=r}revert(){Memory.patchCode(this.address,this.size,e=>{e.writeByteArray(this.originalCode)})}};function ll({address:n,size:e,validationResult:t}){let{methodReg:r,target:o}=t,i=Memory.alloc(Process.pageSize),s=e;Memory.patchCode(i,256,c=>{let a=new ThumbWriter(c,{pc:i}),l=new ThumbRelocator(n,a);for(let _=0;_!==2;_++)l.readOne();l.writeAll(),l.readOne(),l.skipOne(),a.putBCondLabel("eq","runtime_or_replacement_method");let d=[45,237,16,10];a.putBytes(d);let p=["r0","r1","r2","r3"];a.putPushRegs(p),a.putCallAddressWithArguments(ie.replacedMethods.isReplacement,[r]),a.putCmpRegImm("r0",0),a.putPopRegs(p);let f=[189,236,16,10];a.putBytes(f),a.putBCondLabel("ne","runtime_or_replacement_method"),a.putBLabel("regular_method"),l.readOne();let u=l.input.address.equals(o.whenRegularMethod);for(a.putLabel(u?"regular_method":"runtime_or_replacement_method"),l.writeOne();s<10;){let _=l.readOne();if(_===0){s=10;break}s=_}l.writeAll(),a.putBranchAddress(n.add(s+1)),a.putLabel(u?"runtime_or_replacement_method":"regular_method"),a.putBranchAddress(o.whenTrue),a.flush()}),$n.push(new Rt(n,s,i)),Memory.patchCode(n,s,c=>{let a=new ThumbWriter(c,{pc:n});a.putLdrRegAddress("pc",i.or(1)),a.flush()})}function dl({address:n,size:e,validationResult:t}){let{methodReg:r,scratchReg:o,target:i}=t,s=Memory.alloc(Process.pageSize);Memory.patchCode(s,256,c=>{let a=new Arm64Writer(c,{pc:s}),l=new Arm64Relocator(n,a);for(let _=0;_!==2;_++)l.readOne();l.writeAll(),l.readOne(),l.skipOne(),a.putBCondLabel("eq","runtime_or_replacement_method");let d=["d0","d1","d2","d3","d4","d5","d6","d7","x0","x1","x2","x3","x4","x5","x6","x7","x8","x9","x10","x11","x12","x13","x14","x15","x16","x17"],p=d.length;for(let _=0;_!==p;_+=2)a.putPushRegReg(d[_],d[_+1]);a.putCallAddressWithArguments(ie.replacedMethods.isReplacement,[r]),a.putCmpRegReg("x0","xzr");for(let _=p-2;_>=0;_-=2)a.putPopRegReg(d[_],d[_+1]);a.putBCondLabel("ne","runtime_or_replacement_method"),a.putBLabel("regular_method"),l.readOne();let f=l.input,u=f.address.equals(i.whenRegularMethod);a.putLabel(u?"regular_method":"runtime_or_replacement_method"),l.writeOne(),a.putBranchAddress(f.next),a.putLabel(u?"runtime_or_replacement_method":"regular_method"),a.putBranchAddress(i.whenTrue),a.flush()}),$n.push(new Rt(n,e,s)),Memory.patchCode(n,e,c=>{let a=new Arm64Writer(c,{pc:n});a.putLdrRegAddress(o,s),a.putBrReg(o),a.flush()})}function ul(n){return new _o(n)}function pl(n){return ie.replacedMethods.translate(n)}function Qn(n,e={}){let{limit:t=16}=e,r=n.getEnv();return lt===null&&(lt=fl(n,r)),lt.backtrace(r,t)}function fl(n,e){let t=G(),r=Memory.alloc(Process.pointerSize),o=new CModule(`
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
`,{current_backtrace:Memory.alloc(Process.pointerSize),perform_art_thread_state_transition:r,art_make_context:t["art::Thread::GetLongJumpContext"]??t["art::Context::Create"],art_stack_visitor_init:t["art::StackVisitor::StackVisitor"],art_stack_visitor_walk_stack:t["art::StackVisitor::WalkStack"],art_stack_visitor_get_method:t["art::StackVisitor::GetMethod"],art_stack_visitor_describe_location:t["art::StackVisitor::DescribeLocation"],translate_method:ie.replacedMethods.translate,translate_location:t["art::Monitor::TranslateLocation"],get_class_location:t["art::mirror::Class::GetLocation"],cxx_delete:t.$delete,strtoul:Process.getModuleByName("libc.so").getExportByName("strtoul")}),i=new NativeFunction(o._create,"pointer",["pointer","uint"],W),s=new NativeFunction(o._destroy,"void",["pointer"],W),c={exceptions:"propagate",scheduling:"exclusive"},a=new NativeFunction(o._get_id,"pointer",["pointer"],c),l=new NativeFunction(o._get_frames,"pointer",["pointer"],c),d=Eo(n,e,o._on_thread_state_transition_complete);o._performData=d,r.writePointer(d),o.backtrace=(f,u)=>{let _=i(f,u),h=new Dn(_);return Script.bindWeak(h,p.bind(null,_)),h};function p(f){s(f)}return o.getId=f=>a(f).readUtf8String(),o.getFrames=f=>JSON.parse(l(f).readUtf8String()),o}var Dn=class{constructor(e){this.handle=e}get id(){return lt.getId(this.handle)}get frames(){return lt.getFrames(this.handle)}};function Yn(){Mt.forEach(n=>{n.vtablePtr.writePointer(n.vtable),n.vtableCountPtr.writeS32(n.vtableCount)}),Mt.clear();for(let n of mo.splice(0))n.deactivate();for(let n of $n.splice(0))n.revert()}function Xn(n){return yo(n,"art::jni::JniIdManager::DecodeMethodId")}function io(n){return yo(n,"art::jni::JniIdManager::DecodeFieldId")}function yo(n,e){let t=G(),r=fo(t).offset,o=r.jniIdManager,i=r.jniIdsIndirection;if(o!==null&&i!==null){let s=t.artRuntime;if(s.add(i).readInt()!==Ua){let a=s.add(o).readPointer();return t[e](a,n)}}return n}var hl={ia32:_l,x64:ml,arm:gl,arm64:yl};function _l(n,e,t,r,o){let i=We(o).offset,s=me(o).offset,c;return Memory.patchCode(n,128,a=>{let l=new X86Writer(a,{pc:n}),d=new X86Relocator(e,l),p=[15,174,4,36],f=[15,174,12,36];l.putPushax(),l.putMovRegReg("ebp","esp"),l.putAndRegU32("esp",4294967280),l.putSubRegImm("esp",512),l.putBytes(p),l.putMovRegFsU32Ptr("ebx",i.self),l.putCallAddressWithAlignedArguments(ie.replacedMethods.findReplacementFromQuickCode,["eax","ebx"]),l.putTestRegReg("eax","eax"),l.putJccShortLabel("je","restore_registers","no-hint"),l.putMovRegOffsetPtrReg("ebp",7*4,"eax"),l.putLabel("restore_registers"),l.putBytes(f),l.putMovRegReg("esp","ebp"),l.putPopax(),l.putJccShortLabel("jne","invoke_replacement","no-hint");do c=d.readOne();while(c<t&&!d.eoi);d.writeAll(),d.eoi||l.putJmpAddress(e.add(c)),l.putLabel("invoke_replacement"),l.putJmpRegOffsetPtr("eax",s.quickCode),l.flush()}),c}function ml(n,e,t,r,o){let i=We(o).offset,s=me(o).offset,c;return Memory.patchCode(n,256,a=>{let l=new X86Writer(a,{pc:n}),d=new X86Relocator(e,l),p=[15,174,4,36],f=[15,174,12,36];l.putPushax(),l.putMovRegReg("rbp","rsp"),l.putAndRegU32("rsp",4294967280),l.putSubRegImm("rsp",512),l.putBytes(p),l.putMovRegGsU32Ptr("rbx",i.self),l.putCallAddressWithAlignedArguments(ie.replacedMethods.findReplacementFromQuickCode,["rdi","rbx"]),l.putTestRegReg("rax","rax"),l.putJccShortLabel("je","restore_registers","no-hint"),l.putMovRegOffsetPtrReg("rbp",8*8,"rax"),l.putLabel("restore_registers"),l.putBytes(f),l.putMovRegReg("rsp","rbp"),l.putPopax(),l.putJccShortLabel("jne","invoke_replacement","no-hint");do c=d.readOne();while(c<t&&!d.eoi);d.writeAll(),d.eoi||l.putJmpAddress(e.add(c)),l.putLabel("invoke_replacement"),l.putJmpRegOffsetPtr("rdi",s.quickCode),l.flush()}),c}function gl(n,e,t,r,o){let i=me(o).offset,s=e.and(Jn),c;return Memory.patchCode(n,128,a=>{let l=new ThumbWriter(a,{pc:n}),d=new ThumbRelocator(s,l),p=[45,237,16,10],f=[189,236,16,10];l.putPushRegs(["r1","r2","r3","r5","r6","r7","r8","r10","r11","lr"]),l.putBytes(p),l.putSubRegRegImm("sp","sp",8),l.putStrRegRegOffset("r0","sp",0),l.putCallAddressWithArguments(ie.replacedMethods.findReplacementFromQuickCode,["r0","r9"]),l.putCmpRegImm("r0",0),l.putBCondLabel("eq","restore_registers"),l.putStrRegRegOffset("r0","sp",0),l.putLabel("restore_registers"),l.putLdrRegRegOffset("r0","sp",0),l.putAddRegRegImm("sp","sp",8),l.putBytes(f),l.putPopRegs(["lr","r11","r10","r8","r7","r6","r5","r3","r2","r1"]),l.putBCondLabel("ne","invoke_replacement");do c=d.readOne();while(c<t&&!d.eoi);d.writeAll(),d.eoi||l.putLdrRegAddress("pc",e.add(c)),l.putLabel("invoke_replacement"),l.putLdrRegRegOffset("pc","r0",i.quickCode),l.flush()}),c}function yl(n,e,t,{availableScratchRegs:r},o){let i=me(o).offset,s;return Memory.patchCode(n,256,c=>{let a=new Arm64Writer(c,{pc:n}),l=new Arm64Relocator(e,a);a.putPushRegReg("d0","d1"),a.putPushRegReg("d2","d3"),a.putPushRegReg("d4","d5"),a.putPushRegReg("d6","d7"),a.putPushRegReg("x1","x2"),a.putPushRegReg("x3","x4"),a.putPushRegReg("x5","x6"),a.putPushRegReg("x7","x20"),a.putPushRegReg("x21","x22"),a.putPushRegReg("x23","x24"),a.putPushRegReg("x25","x26"),a.putPushRegReg("x27","x28"),a.putPushRegReg("x29","lr"),a.putSubRegRegImm("sp","sp",16),a.putStrRegRegOffset("x0","sp",0),a.putCallAddressWithArguments(ie.replacedMethods.findReplacementFromQuickCode,["x0","x19"]),a.putCmpRegReg("x0","xzr"),a.putBCondLabel("eq","restore_registers"),a.putStrRegRegOffset("x0","sp",0),a.putLabel("restore_registers"),a.putLdrRegRegOffset("x0","sp",0),a.putAddRegRegImm("sp","sp",16),a.putPopRegReg("x29","lr"),a.putPopRegReg("x27","x28"),a.putPopRegReg("x25","x26"),a.putPopRegReg("x23","x24"),a.putPopRegReg("x21","x22"),a.putPopRegReg("x7","x20"),a.putPopRegReg("x5","x6"),a.putPopRegReg("x3","x4"),a.putPopRegReg("x1","x2"),a.putPopRegReg("d6","d7"),a.putPopRegReg("d4","d5"),a.putPopRegReg("d2","d3"),a.putPopRegReg("d0","d1"),a.putBCondLabel("ne","invoke_replacement");do s=l.readOne();while(s<t&&!l.eoi);if(l.writeAll(),!l.eoi){let d=Array.from(r)[0];a.putLdrRegAddress(d,e.add(s)),a.putBrReg(d)}a.putLabel("invoke_replacement"),a.putLdrRegRegOffset("x16","x0",i.quickCode),a.putBrReg("x16"),a.flush()}),s}var bl={ia32:so,x64:so,arm:El,arm64:vl};function so(n,e,t){Memory.patchCode(n,16,r=>{let o=new X86Writer(r,{pc:n});o.putJmpAddress(e),o.flush()})}function El(n,e,t){let r=n.and(Jn);Memory.patchCode(r,16,o=>{let i=new ThumbWriter(o,{pc:r});i.putLdrRegAddress("pc",e.or(1)),i.flush()})}function vl(n,e,t){Memory.patchCode(n,16,r=>{let o=new Arm64Writer(r,{pc:n});t===16?o.putLdrRegAddress("x16",e):o.putAdrpRegAddress("x16",e),o.putBrReg("x16"),o.flush()})}var Sl={ia32:5,x64:16,arm:8,arm64:16},jt=class{constructor(e){this.quickCode=e,this.quickCodeAddress=Process.arch==="arm"?e.and(Jn):e,this.redirectSize=0,this.trampoline=null,this.overwrittenPrologue=null,this.overwrittenPrologueLength=0}_canRelocateCode(e,t){let r=Fn[Process.arch],o=Qc[Process.arch],{quickCodeAddress:i}=this,s=new r(i),c=new o(i,s),a;if(Process.arch==="arm64"){let l=new Set(["x16","x17"]);do{let d=c.readOne(),p=new Set(l),{read:f,written:u}=c.input.regsAccessed;for(let _ of[f,u])for(let h of _){let g;h.startsWith("w")?g="x"+h.substring(1):g=h,p.delete(g)}if(p.size===0)break;a=d,l=p}while(a<e&&!c.eoi);t.availableScratchRegs=l}else do a=c.readOne();while(a<e&&!c.eoi);return a>=e}_allocateTrampoline(){xt===null&&(xt=sn(v===4?128:256));let e=Sl[Process.arch],t,r,o=1,i={};if(v===4||this._canRelocateCode(e,i))t=e,r={};else{let s;Process.arch==="x64"?(t=5,s=Ba):Process.arch==="arm64"&&(t=8,s=za,o=4096),r={near:this.quickCodeAddress,maxDistance:s}}return this.redirectSize=t,this.trampoline=xt.allocateSlice(r,o),i}_destroyTrampoline(){xt.freeSlice(this.trampoline)}activate(e){let t=this._allocateTrampoline(),{trampoline:r,quickCode:o,redirectSize:i}=this,s=hl[Process.arch],c=s(r,o,i,t,e);this.overwrittenPrologueLength=c,this.overwrittenPrologue=Memory.dup(this.quickCodeAddress,c);let a=bl[Process.arch];a(o,r,i)}deactivate(){let{quickCodeAddress:e,overwrittenPrologueLength:t}=this,r=Fn[Process.arch];Memory.patchCode(e,t,o=>{let i=new r(o,{pc:e}),{overwrittenPrologue:s}=this;i.putBytes(s.readByteArray(t)),i.flush()}),this._destroyTrampoline()}};function wl(n){let e=G(),{module:t,artClassLinker:r}=e;return n.equals(r.quickGenericJniTrampoline)||n.equals(r.quickToInterpreterBridgeTrampoline)||n.equals(r.quickResolutionTrampoline)||n.equals(r.quickImtConflictTrampoline)||n.compare(t.base)>=0&&n.compare(t.base.add(t.size))<0}var Un=class{constructor(e){let t=Xn(e);this.methodId=t,this.originalMethod=null,this.hookedMethodId=t,this.replacementMethodId=null,this.interceptor=null}replace(e,t,r,o,i){let{kAccCompileDontBother:s,artNterpEntryPoint:c}=i;this.originalMethod=ao(this.methodId,o);let a=this.originalMethod.accessFlags;if((a&Da)!==0&&Il()){let u=this.originalMethod.jniCode;this.hookedMethodId=u.add(2*v).readPointer(),this.originalMethod=ao(this.hookedMethodId,o)}let{hookedMethodId:l}=this,d=Al(l,o);this.replacementMethodId=d,Tt(d,{jniCode:e,accessFlags:(a&~(Oa|Ma|qr)|Nt|s)>>>0,quickCode:i.artClassLinker.quickGenericJniTrampoline,interpreterCode:i.artInterpreterToCompiledCodeBridge},o);let p=uo|ja|qr;(a&Nt)===0&&(p|=Ra),Tt(l,{accessFlags:(a&~p|s)>>>0},o);let f=this.originalMethod.quickCode;if(c!==null&&f.equals(c)&&Tt(l,{quickCode:i.artQuickToInterpreterBridge},o),!wl(f)){let u=new jt(f);u.activate(o),this.interceptor=u}ie.replacedMethods.set(l,d),Yc(l,o)}revert(e){let{hookedMethodId:t,interceptor:r}=this;Tt(t,this.originalMethod,e),ie.replacedMethods.delete(t),r!==null&&(r.deactivate(),this.interceptor=null)}resolveTarget(e,t,r,o){return this.hookedMethodId}};function Il(){return te()<28}function ao(n,e){let r=me(e).offset;return["jniCode","accessFlags","quickCode","interpreterCode"].reduce((o,i)=>{let s=r[i];if(s===void 0)return o;let c=n.add(s),a=i==="accessFlags"?Ca:Aa;return o[i]=a.call(c),o},{})}function Tt(n,e,t){let o=me(t).offset;Object.keys(e).forEach(i=>{let s=o[i];if(s===void 0)return;let c=n.add(s);(i==="accessFlags"?La:xa).call(c,e[i])})}var Bn=class{constructor(e){this.methodId=e,this.originalMethod=null}replace(e,t,r,o,i){let{methodId:s}=this;this.originalMethod=Memory.dup(s,wn);let c=r.reduce((f,u)=>f+u.size,0);t&&c++;let a=(s.add(Kr).readU32()|Nt)>>>0,l=c,d=0,p=c;s.add(Kr).writeU32(a),s.add(Za).writeU16(l),s.add(qa).writeU16(d),s.add(Ka).writeU16(p),s.add(Qa).writeU32(Cl(s)),i.dvmUseJNIBridge(s,e)}revert(e){Memory.copy(this.methodId,this.originalMethod,wn)}resolveTarget(e,t,r,o){let i=r.handle.add(po).readPointer(),s;if(t)s=o.dvmDecodeIndirectRef(i,e.$h);else{let f=e.$borrowClassHandle(r);s=o.dvmDecodeIndirectRef(i,f.value),f.unref(r)}let c;t?c=s.add($a).readPointer():c=s;let a=c.toString(16),l=Mt.get(a);if(l===void 0){let f=c.add(Ga),u=c.add(Ja),_=f.readPointer(),h=u.readS32(),g=h*v,y=Memory.alloc(2*g);Memory.copy(y,_,g),f.writePointer(y),l={classObject:c,vtablePtr:f,vtableCountPtr:u,vtable:_,vtableCount:h,shadowVtable:y,shadowVtableCount:h,targetMethods:new Map},Mt.set(a,l)}let d=this.methodId.toString(16),p=l.targetMethods.get(d);if(p===void 0){p=Memory.dup(this.originalMethod,wn);let f=l.shadowVtableCount++;l.shadowVtable.add(f*v).writePointer(p),p.add(Ha).writeU16(f),l.vtableCountPtr.writeS32(l.shadowVtableCount),l.targetMethods.set(d,p)}return p}};function Cl(n){if(Process.arch!=="ia32")return Wr;let e=n.add(Wa).readPointer().readCString();if(e===null||e.length===0||e.length>65535)return Wr;let t;switch(e[0]){case"V":t=Ya;break;case"F":t=Xa;break;case"D":t=ec;break;case"J":t=tc;break;case"Z":case"B":t=ic;break;case"C":t=oc;break;case"S":t=rc;break;default:t=nc;break}let r=0;for(let o=e.length-1;o>0;o--){let i=e[o];r+=i==="D"||i==="J"?2:1}return t<<sc|r}function Al(n,e){let t=G();if(te()<23){let r=t["art::Thread::CurrentFromGdb"]();return t["art::mirror::Object::Clone"](n,r)}return Memory.dup(n,me(e).size)}function er(n,e,t){bo(n,e,On,t)}function tr(n,e){bo(n,e,Mn)}function nr(n,e){let t=G();if(te()<26)throw new Error("This API is only available on Android >= 8.0");Ee(n,e,r=>{t["art::Runtime::DeoptimizeBootImage"](t.artRuntime)})}function bo(n,e,t,r){let o=G();if(te()<24)throw new Error("This API is only available on Android >= 7.0");Ee(n,e,i=>{if(te()<30){if(!o.isJdwpStarted()){let c=Ll(o);_c.push(c)}o.isDebuggerActive()||o["art::Dbg::GoActive"]();let s=Memory.alloc(8+v);switch(s.writeU32(t),t){case Mn:break;case On:s.add(8).writePointer(r);break;default:throw new Error("Unsupported deoptimization kind")}o["art::Dbg::RequestDeoptimization"](s),o["art::Dbg::ManageDeoptimization"]()}else{let s=o.artInstrumentation;if(s===null)throw new Error("Unable to find Instrumentation class in ART; please file a bug");let c=o["art::Instrumentation::EnableDeoptimization"];switch(c!==void 0&&(s.add(dc().offset.deoptimizationEnabled).readU8()||c(s)),t){case Mn:o["art::Instrumentation::DeoptimizeEverything"](s,Memory.allocUtf8String("frida"));break;case On:o["art::Instrumentation::Deoptimize"](s,r);break;default:throw new Error("Unsupported deoptimization kind")}}})}var zn=class{constructor(){let e=Process.getModuleByName("libart.so"),t=e.getExportByName("_ZN3art4JDWP12JdwpAdbState6AcceptEv"),r=e.getExportByName("_ZN3art4JDWP12JdwpAdbState15ReceiveClientFdEv"),o=co(),i=co();this._controlFd=o[0],this._clientFd=i[0];let s=null;s=Interceptor.attach(t,function(c){let a=c[0];Memory.scanSync(a.add(8252),256,"00 ff ff ff ff 00")[0].address.add(1).writeS32(o[1]),s.detach()}),Interceptor.replace(r,new NativeCallback(function(c){return Interceptor.revert(r),i[1]},"int",["pointer"])),Interceptor.flush(),this._handshakeRequest=this._performHandshake()}async _performHandshake(){let e=new UnixInputStream(this._clientFd,{autoClose:!1}),t=new UnixOutputStream(this._clientFd,{autoClose:!1}),r=[74,68,87,80,45,72,97,110,100,115,104,97,107,101];try{await t.writeAll(r),await e.readAll(r.length)}catch{}}};function Ll(n){let e=new zn;n["art::Dbg::SetJdwpAllowed"](1);let t=xl();n["art::Dbg::ConfigureJdwp"](t);let r=n["art::InternalDebuggerControlCallback::StartDebugger"];return r!==void 0?r(NULL):n["art::Dbg::StartJdwp"](),e}function xl(){let n=te()<28?2:3,e=0,t=n,r=!0,o=!1,i=e,s=8+ut+2,c=Memory.alloc(s);return c.writeU32(t).add(4).writeU8(r?1:0).add(1).writeU8(o?1:0).add(1).add(ut).writeU16(i),c}function co(){Ln===null&&(Ln=new NativeFunction(Process.getModuleByName("libc.so").getExportByName("socketpair"),"int",["int","int","int","pointer"]));let n=Memory.alloc(8);if(Ln(cc,lc,0,n)===-1)throw new Error("Unable to create socketpair for JDWP");return[n.readS32(),n.add(4).readS32()]}function Tl(n){let e=bc().offset,t=n.vm.add(e.globalsLock),r=n.vm.add(e.globals),o=n["art::IndirectReferenceTable::Add"],i=n["art::ReaderWriterMutex::ExclusiveLock"],s=n["art::ReaderWriterMutex::ExclusiveUnlock"],c=0;return function(a,l,d){i(t,l);try{return o(r,c,d)}finally{s(t,l)}}}function kl(n){let e=n["art::Thread::DecodeJObject"];if(e===void 0)throw new Error("art::Thread::DecodeJObject is not available; please file a bug");return function(t,r,o){return e(r,o)}}var Nl={ia32:lo,x64:lo,arm:Ml,arm64:Ol};function Eo(n,e,t){let r=G(),o=e.handle.readPointer(),i,s=r.find("_ZN3art3JNIILb1EE14ExceptionClearEP7_JNIEnv");s!==null?i=s:i=o.add(Dt).readPointer();let c,a=r.find("_ZN3art3JNIILb1EE10FatalErrorEP7_JNIEnvPKc");a!==null?c=a:c=o.add(Va).readPointer();let l=Nl[Process.arch];if(l===void 0)throw new Error("Not yet implemented for "+Process.arch);let d=null,p=We(n).offset,f=p.exception,u=new Set,_=p.isExceptionReportedToInstrumentation;_!==null&&u.add(_);let h=p.throwLocation;h!==null&&(u.add(h),u.add(h+v),u.add(h+2*v));let g=65536,y=Memory.alloc(g);return Memory.patchCode(y,g,E=>{d=l(E,y,i,c,f,u,t)}),d._code=y,d._callback=t,d}function lo(n,e,t,r,o,i,s){let c={},a=new Set,l=[t];for(;l.length>0;){let h=l.shift();if(Object.values(c).some(({begin:M,end:R})=>h.compare(M)>=0&&h.compare(R)<0))continue;let y=h.toString(),E={begin:h},C=null,L=!1;do{if(h.equals(r)){L=!0;break}let M=Instruction.parse(h);C=M;let R=c[M.address.toString()];if(R!==void 0){delete c[R.begin.toString()],c[y]=R,R.begin=E.begin,E=null;break}let N=null;switch(M.mnemonic){case"jmp":N=ptr(M.operands[0].value),L=!0;break;case"je":case"jg":case"jle":case"jne":case"js":N=ptr(M.operands[0].value);break;case"ret":L=!0;break}N!==null&&(a.add(N.toString()),l.push(N),l.sort((k,S)=>k.compare(S))),h=M.next}while(!L);E!==null&&(E.end=C.address.add(C.size),c[y]=E)}let d=Object.keys(c).map(h=>c[h]);d.sort((h,g)=>h.begin.compare(g.begin));let p=c[t.toString()];d.splice(d.indexOf(p),1),d.unshift(p);let f=new X86Writer(n,{pc:e}),u=!1,_=null;return d.forEach(h=>{let g=h.end.sub(h.begin).toInt32(),y=new X86Relocator(h.begin,f),E;for(;(E=y.readOne())!==0;){let C=y.input,{mnemonic:L}=C,M=C.address.toString();a.has(M)&&f.putLabel(M);let R=!0;switch(L){case"jmp":f.putJmpNearLabel(he(C.operands[0])),R=!1;break;case"je":case"jg":case"jle":case"jne":case"js":f.putJccNearLabel(L,he(C.operands[0]),"no-hint"),R=!1;break;case"mov":{let[N,k]=C.operands;if(N.type==="mem"&&k.type==="imm"){let S=N.value,x=S.disp;if(x===o&&k.value.valueOf()===0){if(_=S.base,f.putPushfx(),f.putPushax(),f.putMovRegReg("xbp","xsp"),v===4)f.putAndRegU32("esp",4294967280);else{let O=_!=="rdi"?"rdi":"rsi";f.putMovRegU64(O,uint64("0xfffffffffffffff0")),f.putAndRegReg("rsp",O)}f.putCallAddressWithAlignedArguments(s,[_]),f.putMovRegReg("xsp","xbp"),f.putPopax(),f.putPopfx(),u=!0,R=!1}else i.has(x)&&S.base===_&&(R=!1)}break}case"call":{let N=C.operands[0];N.type==="mem"&&N.value.disp===Dt&&(v===4?(f.putPopReg("eax"),f.putMovRegRegOffsetPtr("eax","eax",4),f.putPushReg("eax")):f.putMovRegRegOffsetPtr("rdi","rdi",8),f.putCallAddressWithArguments(s,[]),u=!0,R=!1);break}}if(R?y.writeAll():y.skipOne(),E===g)break}y.dispose()}),f.dispose(),u||rr(),new NativeFunction(e,"void",["pointer"],W)}function Ml(n,e,t,r,o,i,s){let c={},a=new Set,l=ptr(1).not(),d=[t];for(;d.length>0;){let y=d.shift();if(Object.values(c).some(({begin:x,end:O})=>y.compare(x)>=0&&y.compare(O)<0))continue;let C=y.and(l),L=C.toString(),M=y.and(1),R={begin:C},N=null,k=!1,S=0;do{if(y.equals(r)){k=!0;break}let x=Instruction.parse(y),{mnemonic:O}=x;N=x;let j=y.and(l).toString(),D=c[j];if(D!==void 0){delete c[D.begin.toString()],c[L]=D,D.begin=R.begin,R=null;break}let B=S===0,F=null;switch(O){case"b":F=ptr(x.operands[0].value),k=B;break;case"beq.w":case"beq":case"bne":case"bne.w":case"bgt":F=ptr(x.operands[0].value);break;case"cbz":case"cbnz":F=ptr(x.operands[1].value);break;case"pop.w":B&&(k=x.operands.filter(V=>V.value==="pc").length===1);break}switch(O){case"it":S=1;break;case"itt":S=2;break;case"ittt":S=3;break;case"itttt":S=4;break;default:S>0&&S--;break}F!==null&&(a.add(F.toString()),d.push(F.or(M)),d.sort((V,ee)=>V.compare(ee))),y=x.next}while(!k);R!==null&&(R.end=N.address.add(N.size),c[L]=R)}let p=Object.keys(c).map(y=>c[y]);p.sort((y,E)=>y.begin.compare(E.begin));let f=c[t.and(l).toString()];p.splice(p.indexOf(f),1),p.unshift(f);let u=new ThumbWriter(n,{pc:e}),_=!1,h=null,g=null;return p.forEach(y=>{let E=new ThumbRelocator(y.begin,u),C=y.begin,L=y.end,M=0;do{if(E.readOne()===0)throw new Error("Unexpected end of block");let N=E.input;C=N.address,M=N.size;let{mnemonic:k}=N,S=C.toString();a.has(S)&&u.putLabel(S);let x=!0;switch(k){case"b":u.putBLabel(he(N.operands[0])),x=!1;break;case"beq.w":u.putBCondLabelWide("eq",he(N.operands[0])),x=!1;break;case"bne.w":u.putBCondLabelWide("ne",he(N.operands[0])),x=!1;break;case"beq":case"bne":case"bgt":u.putBCondLabelWide(k.substr(1),he(N.operands[0])),x=!1;break;case"cbz":{let O=N.operands;u.putCbzRegLabel(O[0].value,he(O[1])),x=!1;break}case"cbnz":{let O=N.operands;u.putCbnzRegLabel(O[0].value,he(O[1])),x=!1;break}case"str":case"str.w":{let O=N.operands[1].value,w=O.disp;if(w===o){h=O.base;let j=h!=="r4"?"r4":"r5",D=["r0","r1","r2","r3",j,"r9","r12","lr"];u.putPushRegs(D),u.putMrsRegReg(j,"apsr-nzcvq"),u.putCallAddressWithArguments(s,[h]),u.putMsrRegReg("apsr-nzcvq",j),u.putPopRegs(D),_=!0,x=!1}else i.has(w)&&O.base===h&&(x=!1);break}case"ldr":{let[O,w]=N.operands;if(w.type==="mem"){let j=w.value;j.base[0]==="r"&&j.disp===Dt&&(g=O.value)}break}case"blx":N.operands[0].value===g&&(u.putLdrRegRegOffset("r0","r0",4),u.putCallAddressWithArguments(s,["r0"]),_=!0,g=null,x=!1);break}x?E.writeAll():E.skipOne()}while(!C.add(M).equals(L));E.dispose()}),u.dispose(),_||rr(),new NativeFunction(e.or(1),"void",["pointer"],W)}function Ol(n,e,t,r,o,i,s){let c={},a=new Set,l=[t];for(;l.length>0;){let y=l.shift();if(Object.values(c).some(({begin:N,end:k})=>y.compare(N)>=0&&y.compare(k)<0))continue;let C=y.toString(),L={begin:y},M=null,R=!1;do{if(y.equals(r)){R=!0;break}let N;try{N=Instruction.parse(y)}catch(x){if(y.readU32()===0){R=!0;break}else throw x}M=N;let k=c[N.address.toString()];if(k!==void 0){delete c[k.begin.toString()],c[C]=k,k.begin=L.begin,L=null;break}let S=null;switch(N.mnemonic){case"b":S=ptr(N.operands[0].value),R=!0;break;case"b.eq":case"b.ne":case"b.le":case"b.gt":S=ptr(N.operands[0].value);break;case"cbz":case"cbnz":S=ptr(N.operands[1].value);break;case"tbz":case"tbnz":S=ptr(N.operands[2].value);break;case"ret":R=!0;break}S!==null&&(a.add(S.toString()),l.push(S),l.sort((x,O)=>x.compare(O))),y=N.next}while(!R);L!==null&&(L.end=M.address.add(M.size),c[C]=L)}let d=Object.keys(c).map(y=>c[y]);d.sort((y,E)=>y.begin.compare(E.begin));let p=c[t.toString()];d.splice(d.indexOf(p),1),d.unshift(p);let f=new Arm64Writer(n,{pc:e});f.putBLabel("performTransition");let u=e.add(f.offset);f.putPushAllXRegisters(),f.putCallAddressWithArguments(s,["x0"]),f.putPopAllXRegisters(),f.putRet(),f.putLabel("performTransition");let _=!1,h=null,g=null;return d.forEach(y=>{let E=y.end.sub(y.begin).toInt32(),C=new Arm64Relocator(y.begin,f),L;for(;(L=C.readOne())!==0;){let M=C.input,{mnemonic:R}=M,N=M.address.toString();a.has(N)&&f.putLabel(N);let k=!0;switch(R){case"b":f.putBLabel(he(M.operands[0])),k=!1;break;case"b.eq":case"b.ne":case"b.le":case"b.gt":f.putBCondLabel(R.substr(2),he(M.operands[0])),k=!1;break;case"cbz":{let S=M.operands;f.putCbzRegLabel(S[0].value,he(S[1])),k=!1;break}case"cbnz":{let S=M.operands;f.putCbnzRegLabel(S[0].value,he(S[1])),k=!1;break}case"tbz":{let S=M.operands;f.putTbzRegImmLabel(S[0].value,S[1].value.valueOf(),he(S[2])),k=!1;break}case"tbnz":{let S=M.operands;f.putTbnzRegImmLabel(S[0].value,S[1].value.valueOf(),he(S[2])),k=!1;break}case"str":{let S=M.operands,x=S[0].value,O=S[1].value,w=O.disp;x==="xzr"&&w===o?(h=O.base,f.putPushRegReg("x0","lr"),f.putMovRegReg("x0",h),f.putBlImm(u),f.putPopRegReg("x0","lr"),_=!0,k=!1):i.has(w)&&O.base===h&&(k=!1);break}case"ldr":{let S=M.operands,x=S[1].value;x.base[0]==="x"&&x.disp===Dt&&(g=S[0].value);break}case"blr":M.operands[0].value===g&&(f.putLdrRegRegOffset("x0","x0",8),f.putCallAddressWithArguments(s,["x0"]),_=!0,g=null,k=!1);break}if(k?C.writeAll():C.skipOne(),L===E)break}C.dispose()}),f.dispose(),_||rr(),new NativeFunction(e,"void",["pointer"],W)}function rr(){throw new Error("Unable to parse ART internals; please file a bug")}function Rl(n){let e=n["art::ArtMethod::PrettyMethod"];e!==void 0&&(Interceptor.attach(e.impl,ie.hooks.ArtMethod.prettyMethod),Interceptor.flush())}function he(n){return ptr(n.value).toString()}function jl(n,e){return new NativeFunction(n,"pointer",e,W)}function Pl(n,e){let t=new NativeFunction(n,"void",["pointer"].concat(e),W);return function(){let r=Memory.alloc(v);return t(r,...arguments),r.readPointer()}}function kt(n,e){let{arch:t}=Process;switch(t){case"ia32":case"arm64":{let r;t==="ia32"?r=Ke(64,s=>{let c=1+e.length,a=c*4;s.putSubRegImm("esp",a);for(let l=0;l!==c;l++){let d=l*4;s.putMovRegRegOffsetPtr("eax","esp",a+4+d),s.putMovRegOffsetPtrReg("esp",d,"eax")}s.putCallAddress(n),s.putAddRegImm("esp",a-4),s.putRet()}):r=Ke(32,s=>{s.putMovRegReg("x8","x0"),e.forEach((c,a)=>{s.putMovRegReg("x"+a,"x"+(a+1))}),s.putLdrRegAddress("x7",n),s.putBrReg("x7")});let o=new NativeFunction(r,"void",["pointer"].concat(e),W),i=function(...s){o(...s)};return i.handle=r,i.impl=n,i}default:{let r=new NativeFunction(n,"void",["pointer"].concat(e),W);return r.impl=n,r}}}var Pt=class{constructor(){this.handle=Memory.alloc(ut)}dispose(){let[e,t]=this._getData();t||G().$delete(e)}disposeToString(){let e=this.toString();return this.dispose(),e}toString(){let[e]=this._getData();return e.readUtf8String()}_getData(){let e=this.handle,t=(e.readU8()&1)===0;return[t?e.add(1):e.add(2*v).readPointer(),t]}},Vn=class{$delete(){this.dispose(),G().$delete(this)}constructor(e,t){this.handle=e,this._begin=e,this._end=e.add(v),this._storage=e.add(2*v),this._elementSize=t}init(){this.begin=NULL,this.end=NULL,this.storage=NULL}dispose(){G().$delete(this.begin)}get begin(){return this._begin.readPointer()}set begin(e){this._begin.writePointer(e)}get end(){return this._end.readPointer()}set end(e){this._end.writePointer(e)}get storage(){return this._storage.readPointer()}set storage(e){this._storage.writePointer(e)}get size(){return this.end.sub(this.begin).toInt32()/this._elementSize}},pt=class n extends Vn{static $new(){let e=new n(G().$new(ac));return e.init(),e}constructor(e){super(e,v)}get handles(){let e=[],t=this.begin,r=this.end;for(;!t.equals(r);)e.push(t.readPointer()),t=t.add(v);return e}},Fl=0,vo=v,So=vo+4,Dl=-1,Ft=class n{$delete(){this.dispose(),G().$delete(this)}constructor(e){this.handle=e,this._link=e.add(Fl),this._numberOfReferences=e.add(vo)}init(e,t){this.link=e,this.numberOfReferences=t}dispose(){}get link(){return new n(this._link.readPointer())}set link(e){this._link.writePointer(e)}get numberOfReferences(){return this._numberOfReferences.readS32()}set numberOfReferences(e){this._numberOfReferences.writeS32(e)}},wo=Vl(So),Io=wo+v,Ul=Io+v,ft=class n extends Ft{static $new(e,t){let r=new n(G().$new(Ul));return r.init(e,t),r}constructor(e){super(e),this._self=e.add(wo),this._currentScope=e.add(Io);let o=(64-v-4-4)/4;this._scopeLayout=dt.layoutForCapacity(o),this._topHandleScopePtr=null}init(e,t){let r=e.add(We(t).offset.topHandleScope);this._topHandleScopePtr=r,super.init(r.readPointer(),Dl),this.self=e,this.currentScope=dt.$new(this._scopeLayout),r.writePointer(this)}dispose(){this._topHandleScopePtr.writePointer(this.link);let e;for(;(e=this.currentScope)!==null;){let t=e.link;e.$delete(),this.currentScope=t}}get self(){return this._self.readPointer()}set self(e){this._self.writePointer(e)}get currentScope(){let e=this._currentScope.readPointer();return e.isNull()?null:new dt(e,this._scopeLayout)}set currentScope(e){this._currentScope.writePointer(e)}newHandle(e){return this.currentScope.newHandle(e)}},dt=class n extends Ft{static $new(e){let t=new n(G().$new(e.size),e);return t.init(),t}constructor(e,t){super(e);let{offset:r}=t;this._refsStorage=e.add(r.refsStorage),this._pos=e.add(r.pos),this._layout=t}init(){super.init(NULL,this._layout.numberOfReferences),this.pos=0}get pos(){return this._pos.readU32()}set pos(e){this._pos.writeU32(e)}newHandle(e){let t=this.pos,r=this._refsStorage.add(t*4);return r.writeS32(e.toInt32()),this.pos=t+1,r}static layoutForCapacity(e){let t=So,r=t+e*4;return{size:r+4,numberOfReferences:e,offset:{refsStorage:t,pos:r}}}},Bl={arm:function(n,e){let t=Process.pageSize,r=Memory.alloc(t);Memory.protect(r,t,"rwx");let o=new NativeCallback(e,"void",["pointer"]);r._onMatchCallback=o;let i=[26625,18947,17041,53505,19202,18200,18288,48896],s=i.length*2,c=s+4,a=c+4;return Memory.patchCode(r,a,function(l){i.forEach((d,p)=>{l.add(p*2).writeU16(d)}),l.add(s).writeS32(n),l.add(c).writePointer(o)}),r.or(1)},arm64:function(n,e){let t=Process.pageSize,r=Memory.alloc(t);Memory.protect(r,t,"rwx");let o=new NativeCallback(e,"void",["pointer"]);r._onMatchCallback=o;let i=[3107979265,402653378,1795293247,1409286241,1476395139,3592355936,3596551104],s=i.length*4,c=s+4,a=c+8;return Memory.patchCode(r,a,function(l){i.forEach((d,p)=>{l.add(p*4).writeU32(d)}),l.add(s).writeS32(n),l.add(c).writePointer(o)}),r}};function or(n,e){return(Bl[Process.arch]||zl)(n,e)}function zl(n,e){return new NativeCallback(t=>{t.readS32()===n&&e(t)},"void",["pointer","pointer"])}function Vl(n){let e=n%v;return e!==0?n+v-e:n}var Jl=4,{pointerSize:J}=Process,Gl=256,$l=65536,Hl=131072,Zl=33554432,ql=67108864,Kl=134217728,ze={exceptions:"propagate"},xo=de(cd),Wl=de(dd),Ql=de(id),ir=null,sr=!1,Vt=new Map,_t=new Map;function Ae(){return ir===null&&(ir=Yl()),ir}function Yl(){let n=Process.enumerateModules().filter(a=>/jvm.(dll|dylib|so)$/.test(a.name));if(n.length===0)return null;let e=n[0],t={flavor:"jvm"},r=Process.platform==="windows"?[{module:e,functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],JVM_Sleep:["JVM_Sleep","void",["pointer","pointer","long"]],"VMThread::execute":["VMThread::execute","void",["pointer"]],"Method::size":["Method::size","int",["int"]],"Method::set_native_function":["Method::set_native_function","void",["pointer","pointer","int"]],"Method::clear_native_function":["Method::clear_native_function","void",["pointer"]],"Method::jmethod_id":["Method::jmethod_id","pointer",["pointer"]],"ClassLoaderDataGraph::classes_do":["ClassLoaderDataGraph::classes_do","void",["pointer"]],"NMethodSweeper::sweep_code_cache":["NMethodSweeper::sweep_code_cache","void",[]],"OopMapCache::flush_obsolete_entries":["OopMapCache::flush_obsolete_entries","void",["pointer"]]},variables:{"VM_RedefineClasses::`vftable'":function(a){this.vtableRedefineClasses=a},"VM_RedefineClasses::doit":function(a){this.redefineClassesDoIt=a},"VM_RedefineClasses::doit_prologue":function(a){this.redefineClassesDoItPrologue=a},"VM_RedefineClasses::doit_epilogue":function(a){this.redefineClassesDoItEpilogue=a},"VM_RedefineClasses::allow_nested_vm_operations":function(a){this.redefineClassesAllow=a},"NMethodSweeper::_traversals":function(a){this.traversals=a},"NMethodSweeper::_should_sweep":function(a){this.shouldSweep=a}},optionals:[]}]:[{module:e,functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],_ZN6Method4sizeEb:["Method::size","int",["int"]],_ZN6Method19set_native_functionEPhb:["Method::set_native_function","void",["pointer","pointer","int"]],_ZN6Method21clear_native_functionEv:["Method::clear_native_function","void",["pointer"]],_ZN6Method24restore_unshareable_infoEP10JavaThread:["Method::restore_unshareable_info","void",["pointer","pointer"]],_ZN6Method24restore_unshareable_infoEP6Thread:["Method::restore_unshareable_info","void",["pointer","pointer"]],_ZN6Method11link_methodERK12methodHandleP10JavaThread:["Method::link_method","void",["pointer","pointer","pointer"]],_ZN6Method10jmethod_idEv:["Method::jmethod_id","pointer",["pointer"]],_ZN6Method10clear_codeEv:function(a){let l=new NativeFunction(a,"void",["pointer"],ze);this["Method::clear_code"]=function(d){l(d)}},_ZN6Method10clear_codeEb:function(a){let l=new NativeFunction(a,"void",["pointer","int"],ze),d=0;this["Method::clear_code"]=function(p){l(p,d)}},_ZN18VM_RedefineClasses19mark_dependent_codeEP13InstanceKlass:["VM_RedefineClasses::mark_dependent_code","void",["pointer","pointer"]],_ZN18VM_RedefineClasses20flush_dependent_codeEv:["VM_RedefineClasses::flush_dependent_code","void",[]],_ZN18VM_RedefineClasses20flush_dependent_codeEP13InstanceKlassP6Thread:["VM_RedefineClasses::flush_dependent_code","void",["pointer","pointer","pointer"]],_ZN18VM_RedefineClasses20flush_dependent_codeE19instanceKlassHandleP6Thread:["VM_RedefineClasses::flush_dependent_code","void",["pointer","pointer","pointer"]],_ZN19ResolvedMethodTable21adjust_method_entriesEPb:["ResolvedMethodTable::adjust_method_entries","void",["pointer"]],_ZN15MemberNameTable21adjust_method_entriesEP13InstanceKlassPb:["MemberNameTable::adjust_method_entries","void",["pointer","pointer","pointer"]],_ZN17ConstantPoolCache21adjust_method_entriesEPb:function(a){let l=new NativeFunction(a,"void",["pointer","pointer"],ze);this["ConstantPoolCache::adjust_method_entries"]=function(d,p,f){l(d,f)}},_ZN17ConstantPoolCache21adjust_method_entriesEP13InstanceKlassPb:function(a){let l=new NativeFunction(a,"void",["pointer","pointer","pointer"],ze);this["ConstantPoolCache::adjust_method_entries"]=function(d,p,f){l(d,p,f)}},_ZN20ClassLoaderDataGraph10classes_doEP12KlassClosure:["ClassLoaderDataGraph::classes_do","void",["pointer"]],_ZN20ClassLoaderDataGraph22clean_deallocate_listsEb:["ClassLoaderDataGraph::clean_deallocate_lists","void",["int"]],_ZN10JavaThread27thread_from_jni_environmentEP7JNIEnv_:["JavaThread::thread_from_jni_environment","pointer",["pointer"]],_ZN8VMThread7executeEP12VM_Operation:["VMThread::execute","void",["pointer"]],_ZN11OopMapCache22flush_obsolete_entriesEv:["OopMapCache::flush_obsolete_entries","void",["pointer"]],_ZN14NMethodSweeper11force_sweepEv:["NMethodSweeper::force_sweep","void",[]],_ZN14NMethodSweeper16sweep_code_cacheEv:["NMethodSweeper::sweep_code_cache","void",[]],_ZN14NMethodSweeper17sweep_in_progressEv:["NMethodSweeper::sweep_in_progress","bool",[]],JVM_Sleep:["JVM_Sleep","void",["pointer","pointer","long"]]},variables:{_ZN18VM_RedefineClasses14_the_class_oopE:function(a){this.redefineClass=a},_ZN18VM_RedefineClasses10_the_classE:function(a){this.redefineClass=a},_ZN18VM_RedefineClasses25AdjustCpoolCacheAndVtable8do_klassEP5Klass:function(a){this.doKlass=a},_ZN18VM_RedefineClasses22AdjustAndCleanMetadata8do_klassEP5Klass:function(a){this.doKlass=a},_ZTV18VM_RedefineClasses:function(a){this.vtableRedefineClasses=a},_ZN18VM_RedefineClasses4doitEv:function(a){this.redefineClassesDoIt=a},_ZN18VM_RedefineClasses13doit_prologueEv:function(a){this.redefineClassesDoItPrologue=a},_ZN18VM_RedefineClasses13doit_epilogueEv:function(a){this.redefineClassesDoItEpilogue=a},_ZN18VM_RedefineClassesD0Ev:function(a){this.redefineClassesDispose0=a},_ZN18VM_RedefineClassesD1Ev:function(a){this.redefineClassesDispose1=a},_ZNK18VM_RedefineClasses26allow_nested_vm_operationsEv:function(a){this.redefineClassesAllow=a},_ZNK18VM_RedefineClasses14print_on_errorEP12outputStream:function(a){this.redefineClassesOnError=a},_ZN13InstanceKlass33create_new_default_vtable_indicesEiP10JavaThread:function(a){this.createNewDefaultVtableIndices=a},_ZN13InstanceKlass33create_new_default_vtable_indicesEiP6Thread:function(a){this.createNewDefaultVtableIndices=a},_ZN19Abstract_VM_Version19jre_release_versionEv:function(a){let d=new NativeFunction(a,"pointer",[],ze)().readCString();this.version=d.startsWith("1.8")?8:d.startsWith("9.")?9:parseInt(d.slice(0,2),10),this.versionS=d},_ZN14NMethodSweeper11_traversalsE:function(a){this.traversals=a},_ZN14NMethodSweeper21_sweep_fractions_leftE:function(a){this.fractions=a},_ZN14NMethodSweeper13_should_sweepE:function(a){this.shouldSweep=a}},optionals:["_ZN6Method24restore_unshareable_infoEP10JavaThread","_ZN6Method24restore_unshareable_infoEP6Thread","_ZN6Method11link_methodERK12methodHandleP10JavaThread","_ZN6Method10clear_codeEv","_ZN6Method10clear_codeEb","_ZN18VM_RedefineClasses19mark_dependent_codeEP13InstanceKlass","_ZN18VM_RedefineClasses20flush_dependent_codeEv","_ZN18VM_RedefineClasses20flush_dependent_codeEP13InstanceKlassP6Thread","_ZN18VM_RedefineClasses20flush_dependent_codeE19instanceKlassHandleP6Thread","_ZN19ResolvedMethodTable21adjust_method_entriesEPb","_ZN15MemberNameTable21adjust_method_entriesEP13InstanceKlassPb","_ZN17ConstantPoolCache21adjust_method_entriesEPb","_ZN17ConstantPoolCache21adjust_method_entriesEP13InstanceKlassPb","_ZN20ClassLoaderDataGraph22clean_deallocate_listsEb","_ZN10JavaThread27thread_from_jni_environmentEP7JNIEnv_","_ZN14NMethodSweeper11force_sweepEv","_ZN14NMethodSweeper17sweep_in_progressEv","_ZN18VM_RedefineClasses14_the_class_oopE","_ZN18VM_RedefineClasses10_the_classE","_ZN18VM_RedefineClasses25AdjustCpoolCacheAndVtable8do_klassEP5Klass","_ZN18VM_RedefineClasses22AdjustAndCleanMetadata8do_klassEP5Klass","_ZN18VM_RedefineClassesD0Ev","_ZN18VM_RedefineClassesD1Ev","_ZNK18VM_RedefineClasses14print_on_errorEP12outputStream","_ZN13InstanceKlass33create_new_default_vtable_indicesEiP10JavaThread","_ZN13InstanceKlass33create_new_default_vtable_indicesEiP6Thread","_ZN14NMethodSweeper21_sweep_fractions_leftE"]}],o=[];if(r.forEach(function(a){let l=a.module,d=a.functions||{},p=a.variables||{},f=new Set(a.optionals||[]),u=l.enumerateExports().reduce(function(h,g){return h[g.name]=g,h},{}),_=l.enumerateSymbols().reduce(function(h,g){return h[g.name]=g,h},u);Object.keys(d).forEach(function(h){let g=_[h];if(g!==void 0){let y=d[h];typeof y=="function"?y.call(t,g.address):t[y[0]]=new NativeFunction(g.address,y[1],y[2],ze)}else f.has(h)||o.push(h)}),Object.keys(p).forEach(function(h){let g=_[h];g!==void 0?p[h].call(t,g.address):f.has(h)||o.push(h)})}),o.length>0)throw new Error("Java API only partially available; please file a bug. Missing: "+o.join(", "));let i=Memory.alloc(J),s=Memory.alloc(Jl);if(ue("JNI_GetCreatedJavaVMs",t.JNI_GetCreatedJavaVMs(i,1,s)),s.readInt()===0)return null;t.vm=i.readPointer();let c=Process.platform==="windows"?{$new:["??2@YAPEAX_K@Z","pointer",["ulong"]],$delete:["??3@YAXPEAX@Z","void",["pointer"]]}:{$new:["_Znwm","pointer",["ulong"]],$delete:["_ZdlPv","void",["pointer"]]};for(let[a,[l,d,p]]of Object.entries(c)){let f=Module.findGlobalExportByName(l);if(f===null&&(f=DebugSymbol.fromName(l).address,f.isNull()))throw new Error(`unable to find C++ allocator API, missing: '${l}'`);t[a]=new NativeFunction(f,d,p,ze)}return t.jvmti=Xl(t),t["JavaThread::thread_from_jni_environment"]===void 0&&(t["JavaThread::thread_from_jni_environment"]=td(t)),t}function Xl(n){let e=new Ce(n),t;return e.perform(()=>{let r=e.tryGetEnvHandle(wt.v1_0);if(r===null)throw new Error("JVMTI not available");t=new ke(r,e);let o=Memory.alloc(8);o.writeU64(It.canTagObjects);let i=t.addCapabilities(o);ue("getEnvJvmti::AddCapabilities",i)}),t}var ed={x64:nd};function td(n){let e=null,t=ed[Process.arch];if(t!==void 0){let o=new Ce(n).perform(i=>i.handle.readPointer().add(6*J).readPointer());e=Ne(o,t,{limit:11})}return e===null?()=>{throw new Error("Unable to make thread_from_jni_environment() helper for the current architecture")}:r=>r.add(e)}function nd(n){if(n.mnemonic!=="lea")return null;let{base:e,disp:t}=n.operands[1].value;return e==="rdi"&&t<0?t:null}function To(n,e){}var ar=class{constructor(e){this.methodId=e,this.method=e.readPointer(),this.originalMethod=null,this.newMethod=null,this.resolved=null,this.impl=null,this.key=e.toString(16)}replace(e,t,r,o,i){let{key:s}=this,c=_t.get(s);c!==void 0&&(_t.delete(s),this.method=c.method,this.originalMethod=c.originalMethod,this.newMethod=c.newMethod,this.resolved=c.resolved),this.impl=e,Vt.set(s,this),Co(o)}revert(e){let{key:t}=this;Vt.delete(t),_t.set(t,this),Co(e)}resolveTarget(e,t,r,o){let{resolved:i,originalMethod:s,methodId:c}=this;if(i!==null)return i;if(s===null)return c;s.oldMethod.vtableIndexPtr.writeS32(-2);let l=Memory.alloc(J);return l.writePointer(this.method),this.resolved=l,l}};function Co(n){sr||(sr=!0,Script.nextTick(rd,n))}function rd(n){let e=new Map(Vt),t=new Map(_t);Vt.clear(),_t.clear(),sr=!1,n.perform(r=>{let o=Ae(),i=o["JavaThread::thread_from_jni_environment"](r.handle),s=!1;ko(()=>{e.forEach(c=>{let{method:a,originalMethod:l,impl:d,methodId:p,newMethod:f}=c;l===null?(c.originalMethod=Mo(a),c.newMethod=sd(a,d,i),Ao(c.newMethod,p,i)):o["Method::set_native_function"](f.method,d,0)}),t.forEach(c=>{let{originalMethod:a,methodId:l,newMethod:d}=c;if(a!==null){ad(a);let p=a.oldMethod;p.oldMethod=d,Ao(p,l,i),s=!0}})}),s&&od(r.handle)})}function od(n){let{fractions:e,shouldSweep:t,traversals:r,"NMethodSweeper::sweep_code_cache":o,"NMethodSweeper::sweep_in_progress":i,"NMethodSweeper::force_sweep":s,JVM_Sleep:c}=Ae();if(s!==void 0)Thread.sleep(.05),s(),Thread.sleep(.05),s();else{let a=r.readS64(),l=a+2;for(;l>a;)e.writeS32(1),c(n,NULL,50),i()||ko(()=>{Thread.sleep(.05)}),t.readU8()===0&&(e.writeS32(1),o()),a=r.readS64()}}function ko(n,e,t){let{execute:r,vtable:o,vtableSize:i,doItOffset:s,prologueOffset:c,epilogueOffset:a}=Ql(),l=Memory.dup(o,i),d=Memory.alloc(J*25);d.writePointer(l);let p=new NativeCallback(n,"void",["pointer"]);l.add(s).writePointer(p);let f=null;e!==void 0&&(f=new NativeCallback(e,"int",["pointer"]),l.add(c).writePointer(f));let u=null;t!==void 0&&(u=new NativeCallback(t,"void",["pointer"]),l.add(a).writePointer(u)),r(d)}function id(){let{vtableRedefineClasses:n,redefineClassesDoIt:e,redefineClassesDoItPrologue:t,redefineClassesDoItEpilogue:r,redefineClassesOnError:o,redefineClassesAllow:i,redefineClassesDispose0:s,redefineClassesDispose1:c,"VMThread::execute":a}=Ae(),l=n.add(2*J),d=15*J,p=Memory.dup(l,d),f=new NativeCallback(()=>{},"void",["pointer"]),u,_,h;for(let g=0;g!==d;g+=J){let y=p.add(g),E=y.readPointer();o!==void 0&&E.equals(o)||s!==void 0&&E.equals(s)||c!==void 0&&E.equals(c)?y.writePointer(f):E.equals(e)?u=g:E.equals(t)?(_=g,y.writePointer(i)):E.equals(r)&&(h=g,y.writePointer(f))}return{execute:a,emptyCallback:f,vtable:p,vtableSize:d,doItOffset:u,prologueOffset:_,epilogueOffset:h}}function No(n){return new ar(n)}function Ao(n,e,t){let{method:r,oldMethod:o}=n,i=Ae();n.methodsArray.add(n.methodIndex*J).writePointer(r),n.vtableIndex>=0&&n.vtable.add(n.vtableIndex*J).writePointer(r),e.writePointer(r),o.accessFlagsPtr.writeU32((o.accessFlags|$l|Hl)>>>0);let s=i["OopMapCache::flush_obsolete_entries"];if(s!==void 0){let{oopMapCache:_}=n;_.isNull()||s(_)}let c=i["VM_RedefineClasses::mark_dependent_code"],a=i["VM_RedefineClasses::flush_dependent_code"];c!==void 0?(c(NULL,n.instanceKlass),a()):a(NULL,n.instanceKlass,t);let l=Memory.alloc(1);l.writeU8(1),i["ConstantPoolCache::adjust_method_entries"](n.cache,n.instanceKlass,l);let d=Memory.alloc(3*J),p=Memory.alloc(J);p.writePointer(i.doKlass),d.writePointer(p),d.add(J).writePointer(t),d.add(2*J).writePointer(t),i.redefineClass!==void 0&&i.redefineClass.writePointer(n.instanceKlass),i["ClassLoaderDataGraph::classes_do"](d);let f=i["ResolvedMethodTable::adjust_method_entries"];if(f!==void 0)f(l);else{let{memberNames:_}=n;if(!_.isNull()){let h=i["MemberNameTable::adjust_method_entries"];h!==void 0&&h(_,n.instanceKlass,l)}}let u=i["ClassLoaderDataGraph::clean_deallocate_lists"];u!==void 0&&u(0)}function sd(n,e,t){let r=Ae(),o=Mo(n);o.constPtr.writePointer(o.const);let i=(o.accessFlags|Gl|Zl|ql|Kl)>>>0;if(o.accessFlagsPtr.writeU32(i),o.signatureHandler.writePointer(NULL),o.adapter.writePointer(NULL),o.i2iEntry.writePointer(NULL),r["Method::clear_code"](o.method),o.dataPtr.writePointer(NULL),o.countersPtr.writePointer(NULL),o.stackmapPtr.writePointer(NULL),r["Method::clear_native_function"](o.method),r["Method::set_native_function"](o.method,e,0),r["Method::restore_unshareable_info"](o.method,t),r.version>=17){let s=Memory.alloc(2*J);s.writePointer(o.method),s.add(J).writePointer(t),r["Method::link_method"](o.method,s,t)}return o}function Mo(n){let e=xo(),t=n.add(e.method.constMethodOffset).readPointer(),r=t.add(e.constMethod.sizeOffset).readS32()*J,o=Memory.alloc(r+e.method.size);Memory.copy(o,t,r);let i=o.add(r);Memory.copy(i,n,e.method.size);let s=Lo(i,o,r),c=Lo(n,t,r);return s.oldMethod=c,s}function Lo(n,e,t){let r=Ae(),o=xo(),i=n.add(o.method.constMethodOffset),s=n.add(o.method.methodDataOffset),c=n.add(o.method.methodCountersOffset),a=n.add(o.method.accessFlagsOffset),l=a.readU32(),d=o.getAdapterPointer(n,e),p=n.add(o.method.i2iEntryOffset),f=n.add(o.method.signatureHandlerOffset),u=e.add(o.constMethod.constantPoolOffset).readPointer(),_=e.add(o.constMethod.stackmapDataOffset),h=u.add(o.constantPool.instanceKlassOffset).readPointer(),g=u.add(o.constantPool.cacheOffset).readPointer(),y=Wl(),E=h.add(y.methodsOffset).readPointer(),C=E.readS32(),L=E.add(J),M=e.add(o.constMethod.methodIdnumOffset).readU16(),R=n.add(o.method.vtableIndexOffset),N=R.readS32(),k=h.add(y.vtableOffset),S=h.add(y.oopMapCacheOffset).readPointer(),x=r.version>=10?h.add(y.memberNamesOffset).readPointer():NULL;return{method:n,methodSize:o.method.size,const:e,constSize:t,constPtr:i,dataPtr:s,countersPtr:c,stackmapPtr:_,instanceKlass:h,methodsArray:L,methodsCount:C,methodIndex:M,vtableIndex:N,vtableIndexPtr:R,vtable:k,accessFlags:l,accessFlagsPtr:a,adapter:d,i2iEntry:p,signatureHandler:f,memberNames:x,cache:g,oopMapCache:S}}function ad(n){let{oldMethod:e}=n;e.accessFlagsPtr.writeU32(e.accessFlags),e.vtableIndexPtr.writeS32(e.vtableIndex)}function cd(){let n=Ae(),{version:e}=n,t;e>=17?t="method:early":e>=9&&e<=16?t="const-method":t="method:late";let o=n["Method::size"](1)*J,i=J,s=2*J,c=3*J,a=4*J,l=t==="method:early"?J:0,d=a+l,p=d+4,f=p+4+8,u=f+J,_=l!==0?a:u,h=o-2*J,g=o-J,y=8,E=y+J,C=E+J,L=t==="const-method"?J:0,M=C+L,R=M+14,N=2*J,k=3*J;return{getAdapterPointer:L!==0?function(x,O){return O.add(C)}:function(x,O){return x.add(_)},method:{size:o,constMethodOffset:i,methodDataOffset:s,methodCountersOffset:c,accessFlagsOffset:d,vtableIndexOffset:p,i2iEntryOffset:f,nativeFunctionOffset:h,signatureHandlerOffset:g},constMethod:{constantPoolOffset:y,stackmapDataOffset:E,sizeOffset:M,methodIdnumOffset:R},constantPool:{cacheOffset:N,instanceKlassOffset:k}}}var ld={x64:ud};function dd(){let{version:n,createNewDefaultVtableIndices:e}=Ae(),t=ld[Process.arch];if(t===void 0)throw new Error(`Missing vtable offset parser for ${Process.arch}`);let r=Ne(e,t,{limit:32});if(r===null)throw new Error("Unable to deduce vtable offset");let o=n>=10&&n<=11||n>=15?17:18,i=r-7*J,s=r-17*J,c=r-o*J;return{vtableOffset:r,methodsOffset:i,memberNamesOffset:s,oopMapCacheOffset:c}}function ud(n){if(n.mnemonic!=="mov")return null;let e=n.operands[0];if(e.type!=="mem")return null;let{value:t}=e;if(t.scale!==1)return null;let{disp:r}=t;return r<256?null:r+16}var Oo=G;try{ht()}catch{Oo=Ae}var mt=Oo;var pd=`#include <json-glib/json-glib.h>
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
`,fd=/(.+)!([^/]+)\/?([isu]+)?/,ve=null,jo=null,Ve=class n{static build(e,t){return Ro(t),jo(e,t,r=>new n(ve.new(e,r,t)))}static enumerateMethods(e,t,r){Ro(r);let o=e.match(fd);if(o===null)throw new Error("Invalid query; format is: class!method -- see documentation of Java.enumerateMethods(query) for details");let i=Memory.allocUtf8String(o[1]),s=Memory.allocUtf8String(o[2]),c=!1,a=!1,l=!1,d=o[3];d!==void 0&&(c=d.indexOf("s")!==-1,a=d.indexOf("i")!==-1,l=d.indexOf("u")!==-1);let p;if(t.jvmti!==null){let f=ve.enumerateMethodsJvm(i,s,Qe(c),Qe(a),Qe(l),r);try{p=JSON.parse(f.readUtf8String()).map(u=>{let _=ptr(u.loader);return u.loader=_.isNull()?null:_,u})}finally{ve.dealloc(f)}}else Ee(r.vm,r,f=>{let u=ve.enumerateMethodsArt(i,s,Qe(c),Qe(a),Qe(l));try{let _=t["art::JavaVMExt::AddGlobalRef"],{vm:h}=t;p=JSON.parse(u.readUtf8String()).map(g=>{let y=g.loader;return g.loader=y!==0?_(h,f,ptr(y)):null,g})}finally{ve.dealloc(u)}});return p}constructor(e){this.handle=e}has(e){return ve.has(this.handle,Memory.allocUtf8String(e))!==0}find(e){return ve.find(this.handle,Memory.allocUtf8String(e)).readUtf8String()}list(){let e=ve.list(this.handle);try{return JSON.parse(e.readUtf8String())}finally{ve.dealloc(e)}}};function Ro(n){ve===null&&(ve=hd(n),jo=_d(ve,n.vm))}function hd(n){let e=mt(),{jvmti:t=null}=e,{pointerSize:r}=Process,o=8,i=r,s=7*r,c=10*4+5*r,a=o+i+s+c,d=Memory.alloc(a),p=d.add(o),f=p.add(i),{getDeclaredMethods:u,getDeclaredFields:_}=n.javaLangClass(),h=n.javaLangReflectMethod(),g=n.javaLangReflectField(),y=f;[t!==null?t:NULL,u,_,h.getName,h.getModifiers,g.getName,g.getModifiers].forEach(N=>{y=y.writePointer(N).add(r)});let E=f.add(s),{vm:C}=n;if(e.flavor==="art"){let N;if(t!==null)N=[0,0,0,0];else{let O=Hn(C).offset;N=[O.ifields,O.methods,O.sfields,O.copiedMethodsOffset]}let k=me(C),S=Ut(C),x=E;[1,...N,k.size,k.offset.accessFlags,S.size,S.offset.accessFlags,4294967295].forEach(O=>{x=x.writeUInt(O).add(4)}),[e.artClassLinker.address,e["art::ClassLinker::VisitClasses"],e["art::mirror::Class::GetDescriptor"],e["art::ArtMethod::PrettyMethod"],Process.getModuleByName("libc.so").getExportByName("free")].forEach((O,w)=>{O===void 0&&(O=NULL),x=x.writePointer(O).add(r)})}let L=new CModule(pd,{lock:d,models:p,java_api:f,art_api:E}),M={exceptions:"propagate"},R={exceptions:"propagate",scheduling:"exclusive"};return{handle:L,new:new NativeFunction(L.model_new,"pointer",["pointer","pointer","pointer"],M),has:new NativeFunction(L.model_has,"bool",["pointer","pointer"],R),find:new NativeFunction(L.model_find,"pointer",["pointer","pointer"],R),list:new NativeFunction(L.model_list,"pointer",["pointer"],R),enumerateMethodsArt:new NativeFunction(L.enumerate_methods_art,"pointer",["pointer","pointer","bool","bool","bool"],M),enumerateMethodsJvm:new NativeFunction(L.enumerate_methods_jvm,"pointer",["pointer","pointer","bool","bool","bool","pointer"],M),dealloc:new NativeFunction(L.dealloc,"void",["pointer"],R)}}function _d(n,e){let t=mt();if(t.flavor!=="art")return md;let r=t["art::JavaVMExt::DecodeGlobal"];return function(o,i,s){let c;return Ee(e,i,a=>{let l=r(e,a,o);c=s(l)}),c}}function md(n,e,t){return t(NULL)}function Qe(n){return n?1:0}var gt=class{constructor(e,t){this.items=new Map,this.capacity=e,this.destroy=t}dispose(e){let{items:t,destroy:r}=this;t.forEach(o=>{r(o,e)}),t.clear()}get(e){let{items:t}=this,r=t.get(e);return r!==void 0&&(t.delete(e),t.set(e,r)),r}set(e,t,r){let{items:o}=this,i=o.get(e);if(i!==void 0)o.delete(e),this.destroy(i,r);else if(o.size===this.capacity){let s=o.keys().next().value,c=o.get(s);o.delete(s),this.destroy(c,r)}o.set(e,t)}};var yt=1,dr=256,Po=65536,gd=305419896,Fo=32,Do=12,Uo=8,Bo=8,zo=4,Vo=4,Jo=12,yd=0,bd=1,Ed=2,vd=3,Sd=4,wd=5,Id=6,Cd=4096,Ad=4097,Ld=4099,xd=8192,Td=8193,kd=8194,Nd=8195,Md=8196,Od=8198,Rd=24,jd=28,Pd=2,Fd=24,Go=m.from([3,0,7,14,0]),cr="Ldalvik/annotation/Throws;",Dd=m.from([0]);function Ud(n){let e=new ur,t=Object.assign({},n);return e.addClass(t),e.build()}var ur=class{constructor(){this.classes=[]}addClass(e){this.classes.push(e)}build(){let e=Vd(this.classes),{classes:t,interfaces:r,fields:o,methods:i,protos:s,parameters:c,annotationDirectories:a,annotationSets:l,throwsAnnotations:d,types:p,strings:f}=e,u=0,_=0,h=8,g=12,y=20,E=112;u+=E;let C=u,L=f.length*Vo;u+=L;let M=u,R=p.length*zo;u+=R;let N=u,k=s.length*Do;u+=k;let S=u,x=o.length*Uo;u+=x;let O=u,w=i.length*Bo;u+=w;let j=u,D=t.length*Fo;u+=D;let B=u,F=l.map(A=>{let P=u;return A.offset=P,u+=4+A.items.length*4,P}),V=t.reduce((A,P)=>(P.classData.constructorMethods.forEach(Z=>{let[,K,q]=Z;(K&dr)===0&&q>=0&&(Z.push(u),A.push({offset:u,superConstructor:q}),u+=Fd)}),A),[]);a.forEach(A=>{A.offset=u,u+=16+A.methods.length*8});let ee=r.map(A=>{u=lr(u,4);let P=u;return A.offset=P,u+=4+2*A.types.length,P}),ne=c.map(A=>{u=lr(u,4);let P=u;return A.offset=P,u+=4+2*A.types.length,P}),ce=[],Y=f.map(A=>{let P=u,z=m.from(ge(A.length)),Z=m.from(A,"utf8"),K=m.concat([z,Z,Dd]);return ce.push(K),u+=K.length,P}),se=V.map(A=>{let P=u;return u+=Go.length,P}),X=d.map(A=>{let P=zd(A);return A.offset=u,u+=P.length,P}),re=t.map((A,P)=>{A.classData.offset=u;let z=Bd(A);return u+=z.length,z}),we=0,nt=0;u=lr(u,4);let H=u,_e=r.length+c.length,xe=4+(o.length>0?1:0)+2+l.length+V.length+a.length+(_e>0?1:0)+1+se.length+d.length+t.length+1,Fe=4+xe*Jo;u+=Fe;let Oe=u-B,$e=u,I=m.alloc($e);I.write(`dex
035`),I.writeUInt32LE($e,32),I.writeUInt32LE(E,36),I.writeUInt32LE(gd,40),I.writeUInt32LE(we,44),I.writeUInt32LE(nt,48),I.writeUInt32LE(H,52),I.writeUInt32LE(f.length,56),I.writeUInt32LE(C,60),I.writeUInt32LE(p.length,64),I.writeUInt32LE(M,68),I.writeUInt32LE(s.length,72),I.writeUInt32LE(N,76),I.writeUInt32LE(o.length,80),I.writeUInt32LE(o.length>0?S:0,84),I.writeUInt32LE(i.length,88),I.writeUInt32LE(O,92),I.writeUInt32LE(t.length,96),I.writeUInt32LE(j,100),I.writeUInt32LE(Oe,104),I.writeUInt32LE(B,108),Y.forEach((A,P)=>{I.writeUInt32LE(A,C+P*Vo)}),p.forEach((A,P)=>{I.writeUInt32LE(A,M+P*zo)}),s.forEach((A,P)=>{let[z,Z,K]=A,q=N+P*Do;I.writeUInt32LE(z,q),I.writeUInt32LE(Z,q+4),I.writeUInt32LE(K!==null?K.offset:0,q+8)}),o.forEach((A,P)=>{let[z,Z,K]=A,q=S+P*Uo;I.writeUInt16LE(z,q),I.writeUInt16LE(Z,q+2),I.writeUInt32LE(K,q+4)}),i.forEach((A,P)=>{let[z,Z,K]=A,q=O+P*Bo;I.writeUInt16LE(z,q),I.writeUInt16LE(Z,q+2),I.writeUInt32LE(K,q+4)}),t.forEach((A,P)=>{let{interfaces:z,annotationsDirectory:Z}=A,K=z!==null?z.offset:0,q=Z!==null?Z.offset:0,rt=0,ye=j+P*Fo;I.writeUInt32LE(A.index,ye),I.writeUInt32LE(A.accessFlags,ye+4),I.writeUInt32LE(A.superClassIndex,ye+8),I.writeUInt32LE(K,ye+12),I.writeUInt32LE(A.sourceFileIndex,ye+16),I.writeUInt32LE(q,ye+20),I.writeUInt32LE(A.classData.offset,ye+24),I.writeUInt32LE(rt,ye+28)}),l.forEach((A,P)=>{let{items:z}=A,Z=F[P];I.writeUInt32LE(z.length,Z),z.forEach((K,q)=>{I.writeUInt32LE(K.offset,Z+4+q*4)})}),V.forEach((A,P)=>{let{offset:z,superConstructor:Z}=A,K=1,q=1,rt=1,ye=0,vt=4;I.writeUInt16LE(K,z),I.writeUInt16LE(q,z+2),I.writeUInt16LE(rt,z+4),I.writeUInt16LE(ye,z+6),I.writeUInt32LE(se[P],z+8),I.writeUInt32LE(vt,z+12),I.writeUInt16LE(4208,z+16),I.writeUInt16LE(Z,z+18),I.writeUInt16LE(0,z+20),I.writeUInt16LE(14,z+22)}),a.forEach(A=>{let P=A.offset,z=0,Z=0,K=A.methods.length,q=0;I.writeUInt32LE(z,P),I.writeUInt32LE(Z,P+4),I.writeUInt32LE(K,P+8),I.writeUInt32LE(q,P+12),A.methods.forEach((rt,ye)=>{let vt=P+16+ye*8,[gi,yi]=rt;I.writeUInt32LE(gi,vt),I.writeUInt32LE(yi.offset,vt+4)})}),r.forEach((A,P)=>{let z=ee[P];I.writeUInt32LE(A.types.length,z),A.types.forEach((Z,K)=>{I.writeUInt16LE(Z,z+4+K*2)})}),c.forEach((A,P)=>{let z=ne[P];I.writeUInt32LE(A.types.length,z),A.types.forEach((Z,K)=>{I.writeUInt16LE(Z,z+4+K*2)})}),ce.forEach((A,P)=>{A.copy(I,Y[P])}),se.forEach(A=>{Go.copy(I,A)}),X.forEach((A,P)=>{A.copy(I,d[P].offset)}),re.forEach((A,P)=>{A.copy(I,t[P].classData.offset)}),I.writeUInt32LE(xe,H);let le=[[yd,1,_],[bd,f.length,C],[Ed,p.length,M],[vd,s.length,N]];o.length>0&&le.push([Sd,o.length,S]),le.push([wd,i.length,O]),le.push([Id,t.length,j]),l.forEach((A,P)=>{le.push([Ld,A.items.length,F[P]])}),V.forEach(A=>{le.push([Td,1,A.offset])}),a.forEach(A=>{le.push([Od,1,A.offset])}),_e>0&&le.push([Ad,_e,ee.concat(ne)[0]]),le.push([kd,f.length,Y[0]]),se.forEach(A=>{le.push([Nd,1,A])}),d.forEach(A=>{le.push([Md,1,A.offset])}),t.forEach(A=>{le.push([xd,1,A.classData.offset])}),le.push([Cd,1,H]),le.forEach((A,P)=>{let[z,Z,K]=A,q=H+4+P*Jo;I.writeUInt16LE(z,q),I.writeUInt32LE(Z,q+4),I.writeUInt32LE(K,q+8)});let Lr=new Checksum("sha1");return Lr.update(I.slice(g+y)),m.from(Lr.getDigest()).copy(I,g),I.writeUInt32LE(qd(I,g),h),I}};function Bd(n){let{instanceFields:e,constructorMethods:t,virtualMethods:r}=n.classData;return m.from([0].concat(ge(e.length)).concat(ge(t.length)).concat(ge(r.length)).concat(e.reduce((i,[s,c])=>i.concat(ge(s)).concat(ge(c)),[])).concat(t.reduce((i,[s,c,,a])=>i.concat(ge(s)).concat(ge(c)).concat(ge(a||0)),[])).concat(r.reduce((i,[s,c])=>i.concat(ge(s)).concat(ge(c)).concat([0]),[])))}function zd(n){let{thrownTypes:e}=n;return m.from([Pd].concat(ge(n.type)).concat([1]).concat(ge(n.value)).concat([jd,e.length]).concat(e.reduce((t,r)=>(t.push(Rd,r),t),[])))}function Vd(n){let e=new Set,t=new Set,r={},o=[],i=[],s={},c=new Set,a=new Set;n.forEach(w=>{let{name:j,superClass:D,sourceFileName:B}=w;e.add("this"),e.add(j),t.add(j),e.add(D),t.add(D),e.add(B),w.interfaces.forEach(F=>{e.add(F),t.add(F)}),w.fields.forEach(F=>{let[V,ee]=F;e.add(V),e.add(ee),t.add(ee),o.push([w.name,ee,V])}),w.methods.some(([F])=>F==="<init>")||(w.methods.unshift(["<init>","V",[]]),c.add(j)),w.methods.forEach(F=>{let[V,ee,ne,ce=[],Y]=F;e.add(V);let se=l(ee,ne),X=null;if(ce.length>0){let re=ce.slice();re.sort(),X=re.join("|");let we=s[X];we===void 0&&(we={id:X,types:re},s[X]=we),e.add(cr),t.add(cr),ce.forEach(nt=>{e.add(nt),t.add(nt)}),e.add("value")}if(i.push([w.name,se,V,X,Y]),V==="<init>"){a.add(j+"|"+se);let re=D+"|"+se;c.has(j)&&!a.has(re)&&(i.push([D,se,V,null,0]),a.add(re))}})});function l(w,j){let D=[w].concat(j),B=D.join("|");if(r[B]!==void 0)return B;e.add(w),t.add(w),j.forEach(V=>{e.add(V),t.add(V)});let F=D.map(Zd).join("");return e.add(F),r[B]=[B,F,w,j],B}let d=Array.from(e);d.sort();let p=d.reduce((w,j,D)=>(w[j]=D,w),{}),f=Array.from(t).map(w=>p[w]);f.sort($o);let u=f.reduce((w,j,D)=>(w[d[j]]=D,w),{}),_=Object.keys(r).map(w=>r[w]);_.sort(Gd);let h={},g=_.map(w=>{let[,j,D,B]=w,F;if(B.length>0){let V=B.join("|");F=h[V],F===void 0&&(F={types:B.map(ee=>u[ee]),offset:-1},h[V]=F)}else F=null;return[p[j],u[D],F]}),y=_.reduce((w,j,D)=>{let[B]=j;return w[B]=D,w},{}),E=Object.keys(h).map(w=>h[w]),C=o.map(w=>{let[j,D,B]=w;return[u[j],u[D],p[B]]});C.sort($d);let L=i.map(w=>{let[j,D,B,F,V]=w;return[u[j],y[D],p[B],F,V]});L.sort(Hd);let M=Object.keys(s).map(w=>s[w]).map(w=>({id:w.id,type:u[cr],value:p.value,thrownTypes:w.types.map(j=>u[j]),offset:-1})),R=M.map(w=>({id:w.id,items:[w],offset:-1})),N=R.reduce((w,j,D)=>(w[j.id]=D,w),{}),k={},S=[],x=n.map(w=>{let j=u[w.name],D=yt,B=u[w.superClass],F,V=w.interfaces.map(H=>u[H]);if(V.length>0){V.sort($o);let H=V.join("|");F=k[H],F===void 0&&(F={types:V,offset:-1},k[H]=F)}else F=null;let ee=p[w.sourceFileName],ne=L.reduce((H,_e,xe)=>{let[Fe,Oe,$e,I,le]=_e;return Fe===j&&H.push([xe,$e,I,Oe,le]),H},[]),ce=null,Y=ne.filter(([,,H])=>H!==null).map(([H,,_e])=>[H,R[N[_e]]]);Y.length>0&&(ce={methods:Y,offset:-1},S.push(ce));let se=C.reduce((H,_e,xe)=>{let[Fe]=_e;return Fe===j&&H.push([xe>0?1:0,yt]),H},[]),X=p["<init>"],re=ne.filter(([,H])=>H===X).map(([H,,,_e])=>{if(c.has(w.name)){let xe=-1,Fe=L.length;for(let Oe=0;Oe!==Fe;Oe++){let[$e,I,le]=L[Oe];if($e===B&&le===X&&I===_e){xe=Oe;break}}return[H,yt|Po,xe]}else return[H,yt|Po|dr,-1]}),we=Jd(ne.filter(([,H])=>H!==X).map(([H,,,,_e])=>[H,_e|yt|dr]));return{index:j,accessFlags:D,superClassIndex:B,interfaces:F,sourceFileIndex:ee,annotationsDirectory:ce,classData:{instanceFields:se,constructorMethods:re,virtualMethods:we,offset:-1}}}),O=Object.keys(k).map(w=>k[w]);return{classes:x,interfaces:O,fields:C,methods:L,protos:g,parameters:E,annotationDirectories:S,annotationSets:R,throwsAnnotations:M,types:f,strings:d}}function Jd(n){let e=0;return n.map(([t,r],o)=>{let i;return o===0?i=[t,r]:i=[t-e,r],e=t,i})}function $o(n,e){return n-e}function Gd(n,e){let[,,t,r]=n,[,,o,i]=e;if(t<o)return-1;if(t>o)return 1;let s=r.join("|"),c=i.join("|");return s<c?-1:s>c?1:0}function $d(n,e){let[t,r,o]=n,[i,s,c]=e;return t!==i?t-i:o!==c?o-c:r-s}function Hd(n,e){let[t,r,o]=n,[i,s,c]=e;return t!==i?t-i:o!==c?o-c:r-s}function Zd(n){let e=n[0];return e==="L"||e==="["?"L":n}function ge(n){if(n<=127)return[n];let e=[],t=!1;do{let r=n&127;n>>=7,t=n!==0,t&&(r|=128),e.push(r)}while(t);return e}function lr(n,e){let t=n%e;return t===0?n:n+e-t}function qd(n,e){let t=1,r=0,o=n.length;for(let i=e;i<o;i++)t=(t+n[i])%65521,r=(r+t)%65521;return(r<<16|t)>>>0}var Ho=Ud;var Kd=1,pr=null,Zo=null;function qo(n){pr=n}function fr(n,e,t){let r=Ye(n);return r===null&&(n.indexOf("[")===0?r=hr(n,e,t):(n[0]==="L"&&n[n.length-1]===";"&&(n=n.substring(1,n.length-1)),r=Qd(n,e,t))),Object.assign({className:n},r)}var Ko={boolean:{name:"Z",type:"uint8",size:1,byteSize:1,defaultValue:!1,isCompatible(n){return typeof n=="boolean"},fromJni(n){return!!n},toJni(n){return n?1:0},read(n){return n.readU8()},write(n,e){n.writeU8(e)},toString(){return this.name}},byte:{name:"B",type:"int8",size:1,byteSize:1,defaultValue:0,isCompatible(n){return Number.isInteger(n)&&n>=-128&&n<=127},fromJni:Se,toJni:Se,read(n){return n.readS8()},write(n,e){n.writeS8(e)},toString(){return this.name}},char:{name:"C",type:"uint16",size:1,byteSize:2,defaultValue:0,isCompatible(n){if(typeof n!="string"||n.length!==1)return!1;let e=n.charCodeAt(0);return e>=0&&e<=65535},fromJni(n){return String.fromCharCode(n)},toJni(n){return n.charCodeAt(0)},read(n){return n.readU16()},write(n,e){n.writeU16(e)},toString(){return this.name}},short:{name:"S",type:"int16",size:1,byteSize:2,defaultValue:0,isCompatible(n){return Number.isInteger(n)&&n>=-32768&&n<=32767},fromJni:Se,toJni:Se,read(n){return n.readS16()},write(n,e){n.writeS16(e)},toString(){return this.name}},int:{name:"I",type:"int32",size:1,byteSize:4,defaultValue:0,isCompatible(n){return Number.isInteger(n)&&n>=-2147483648&&n<=2147483647},fromJni:Se,toJni:Se,read(n){return n.readS32()},write(n,e){n.writeS32(e)},toString(){return this.name}},long:{name:"J",type:"int64",size:2,byteSize:8,defaultValue:0,isCompatible(n){return typeof n=="number"||n instanceof Int64},fromJni:Se,toJni:Se,read(n){return n.readS64()},write(n,e){n.writeS64(e)},toString(){return this.name}},float:{name:"F",type:"float",size:1,byteSize:4,defaultValue:0,isCompatible(n){return typeof n=="number"},fromJni:Se,toJni:Se,read(n){return n.readFloat()},write(n,e){n.writeFloat(e)},toString(){return this.name}},double:{name:"D",type:"double",size:2,byteSize:8,defaultValue:0,isCompatible(n){return typeof n=="number"},fromJni:Se,toJni:Se,read(n){return n.readDouble()},write(n,e){n.writeDouble(e)},toString(){return this.name}},void:{name:"V",type:"void",size:0,byteSize:0,defaultValue:void 0,isCompatible(n){return n===void 0},fromJni(){},toJni(){return NULL},toString(){return this.name}}},Wd=new Set(Object.values(Ko).map(n=>n.name));function Ye(n){let e=Ko[n];return e!==void 0?e:null}function Qd(n,e,t){let r=t._types[e?1:0],o=r[n];return o!==void 0||(n==="java.lang.Object"?o=Yd(t):o=Xd(n,e,t),r[n]=o),o}function Yd(n){return{name:"Ljava/lang/Object;",type:"pointer",size:1,defaultValue:NULL,isCompatible(e){return e===null?!0:e===void 0?!1:e.$h instanceof NativePointer?!0:typeof e=="string"},fromJni(e,t,r){return e.isNull()?null:n.cast(e,n.use("java.lang.Object"),r)},toJni(e,t){return e===null?NULL:typeof e=="string"?t.newStringUtf(e):e.$h}}}function Xd(n,e,t){let r=null,o=null,i=null;function s(){return r===null&&(r=t.use(n).class),r}function c(l){let d=s();return o===null&&(o=d.isInstance.overload("java.lang.Object")),o.call(d,l)}function a(){if(i===null){let l=s();i=t.use("java.lang.String").class.isAssignableFrom(l)}return i}return{name:Je(n),type:"pointer",size:1,defaultValue:NULL,isCompatible(l){return l===null?!0:l===void 0?!1:l.$h instanceof NativePointer?c(l):typeof l=="string"&&a()},fromJni(l,d,p){return l.isNull()?null:a()&&e?d.stringFromJni(l):t.cast(l,t.use(n),p)},toJni(l,d){return l===null?NULL:typeof l=="string"?d.newStringUtf(l):l.$h},toString(){return this.name}}}var eu=[["Z","boolean"],["B","byte"],["C","char"],["D","double"],["F","float"],["I","int"],["J","long"],["S","short"]].reduce((n,[e,t])=>(n["["+e]=tu("["+e,t),n),{});function tu(n,e){let t=b.prototype,r=su(e),o={typeName:e,newArray:t["new"+r+"Array"],setRegion:t["set"+r+"ArrayRegion"],getElements:t["get"+r+"ArrayElements"],releaseElements:t["release"+r+"ArrayElements"]};return{name:n,type:"pointer",size:1,defaultValue:NULL,isCompatible(i){return iu(i,e)},fromJni(i,s,c){return ru(i,o,s,c)},toJni(i,s){return ou(i,o,s)}}}function hr(n,e,t){let r=eu[n];if(r!==void 0)return r;if(n.indexOf("[")!==0)throw new Error("Unsupported type: "+n);let o=n.substring(1),i=fr(o,e,t),s=0,c=o.length;for(;s!==c&&o[s]==="[";)s++;o=o.substring(s),o[0]==="L"&&o[o.length-1]===";"&&(o=o.substring(1,o.length-1));let a=o.replace(/\./g,"/");Wd.has(a)?a="[".repeat(s)+a:a="[".repeat(s)+"L"+a+";";let l="["+a;return o="[".repeat(s)+o,{name:n.replace(/\./g,"/"),type:"pointer",size:1,defaultValue:NULL,isCompatible(d){return d===null?!0:typeof d!="object"||d.length===void 0?!1:d.every(function(p){return i.isCompatible(p)})},fromJni(d,p,f){if(d.isNull())return null;let u=[],_=p.getArrayLength(d);for(let h=0;h!==_;h++){let g=p.getObjectArrayElement(d,h);try{u.push(i.fromJni(g,p))}finally{p.deleteLocalRef(g)}}try{u.$w=t.cast(d,t.use(l),f)}catch{t.use("java.lang.reflect.Array").newInstance(t.use(o).class,0),u.$w=t.cast(d,t.use(l),f)}return u.$dispose=nu,u},toJni(d,p){if(d===null)return NULL;if(!(d instanceof Array))throw new Error("Expected an array");let f=d.$w;if(f!==void 0)return f.$h;let u=d.length,h=t.use(o).$borrowClassHandle(p);try{let g=p.newObjectArray(u,h.value,NULL);p.throwIfExceptionPending();for(let y=0;y!==u;y++){let E=i.toJni(d[y],p);try{p.setObjectArrayElement(g,y,E)}finally{i.type==="pointer"&&p.getObjectRefType(E)===Kd&&p.deleteLocalRef(E)}p.throwIfExceptionPending()}return g}finally{h.unref(p)}}}}function nu(){let n=this.length;for(let e=0;e!==n;e++){let t=this[e];if(t===null)continue;let r=t.$dispose;if(r===void 0)break;r.call(t)}this.$w.$dispose()}function ru(n,e,t,r){if(n.isNull())return null;let o=Ye(e.typeName),i=t.getArrayLength(n);return new Jt(n,e,o,i,t,r)}function ou(n,e,t){if(n===null)return NULL;let r=n.$h;if(r!==void 0)return r;let o=n.length,i=Ye(e.typeName),s=e.newArray.call(t,o);if(s.isNull())throw new Error("Unable to construct array");if(o>0){let c=i.byteSize,a=i.write,l=i.toJni,d=Memory.alloc(o*i.byteSize);for(let p=0;p!==o;p++)a(d.add(p*c),l(n[p]));e.setRegion.call(t,s,0,o,d),t.throwIfExceptionPending()}return s}function iu(n,e){if(n===null)return!0;if(n instanceof Jt)return n.$s.typeName===e;if(!(typeof n=="object"&&n.length!==void 0))return!1;let r=Ye(e);return Array.prototype.every.call(n,o=>r.isCompatible(o))}function Jt(n,e,t,r,o,i=!0){if(i){let s=o.newGlobalRef(n);this.$h=s,this.$r=Script.bindWeak(this,o.vm.makeHandleDestructor(s))}else this.$h=n,this.$r=null;return this.$s=e,this.$t=t,this.length=r,new Proxy(this,Zo)}Zo={has(n,e){return e in n?!0:n.tryParseIndex(e)!==null},get(n,e,t){let r=n.tryParseIndex(e);return r===null?n[e]:n.readElement(r)},set(n,e,t,r){let o=n.tryParseIndex(e);return o===null?(n[e]=t,!0):(n.writeElement(o,t),!0)},ownKeys(n){let e=[],{length:t}=n;for(let r=0;r!==t;r++){let o=r.toString();e.push(o)}return e.push("length"),e},getOwnPropertyDescriptor(n,e){return n.tryParseIndex(e)!==null?{writable:!0,configurable:!0,enumerable:!0}:Object.getOwnPropertyDescriptor(n,e)}};Object.defineProperties(Jt.prototype,{$dispose:{enumerable:!0,value(){let n=this.$r;n!==null&&(this.$r=null,Script.unbindWeak(n))}},$clone:{value(n){return new Jt(this.$h,this.$s,this.$t,this.length,n)}},tryParseIndex:{value(n){if(typeof n=="symbol")return null;let e=parseInt(n);return isNaN(e)||e<0||e>=this.length?null:e}},readElement:{value(n){return this.withElements(e=>{let t=this.$t;return t.fromJni(t.read(e.add(n*t.byteSize)))})}},writeElement:{value(n,e){let{$h:t,$s:r,$t:o}=this,i=pr.getEnv(),s=Memory.alloc(o.byteSize);o.write(s,o.toJni(e)),r.setRegion.call(i,t,n,1,s)}},withElements:{value(n){let{$h:e,$s:t}=this,r=pr.getEnv(),o=t.getElements.call(r,e);if(o.isNull())throw new Error("Unable to get array elements");try{return n(o)}finally{t.releaseElements.call(r,e,o)}}},toJSON:{value(){let{length:n,$t:e}=this,{byteSize:t,fromJni:r,read:o}=e;return this.withElements(i=>{let s=[];for(let c=0;c!==n;c++){let a=r(o(i.add(c*t)));s.push(a)}return s})}},toString:{value(){return this.toJSON().toString()}}});function Je(n){return"L"+n.replace(/\./g,"/")+";"}function su(n){return n.charAt(0).toUpperCase()+n.slice(1)}function Se(n){return n}var au=4,{ensureClassInitialized:Wo,makeMethodMangler:ni}=zt,cu=8,gr=1,Et=2,Me=3,_r=1,yr=2,Gt=1,ri=2,Qo=Symbol("PENDING_USE"),Yo="/data/local/tmp",{getCurrentThreadId:Ht,pointerSize:bt}=Process,pe={state:"empty",factories:[],loaders:null,Integer:null},$=null,Q=null,oi=null,ii=null,si=null,ai=null,ci=null,Xo=null,mr=null,et=new Map,je=class n{static _initialize(e,t){$=e,Q=t,oi=t.flavor==="art",t.flavor==="jvm"&&(Wo=To,ni=No)}static _disposeAll(e){pe.factories.forEach(t=>{t._dispose(e)})}static get(e){let t=xu(),r=t.factories[0];if(e===null)return r;let o=t.loaders.get(e);if(o!==null){let s=r.cast(o,t.Integer);return t.factories[s.intValue()]}let i=new n;return i.loader=e,i.cacheDir=r.cacheDir,vr(i,e),i}constructor(){this.cacheDir=Yo,this.codeCacheDir=Yo+"/dalvik-cache",this.tempFileNaming={prefix:"frida",suffix:""},this._classes={},this._classHandles=new gt(10,du),this._patchedMethods=new Set,this._loader=null,this._types=[{},{}],pe.factories.push(this)}_dispose(e){Array.from(this._patchedMethods).forEach(t=>{t.implementation=null}),this._patchedMethods.clear(),Yn(),this._classHandles.dispose(e),this._classes={}}get loader(){return this._loader}set loader(e){let t=this._loader===null&&e!==null;this._loader=e,t&&pe.state==="ready"&&this===pe.factories[0]&&vr(this,e)}use(e,t={}){let r=t.cache!=="skip",o=r?this._getUsedClass(e):void 0;if(o===void 0)try{let i=$.getEnv(),{_loader:s}=this,c=s!==null?pu(e,s,i):uu(e);o=this._make(e,c,i)}finally{r&&this._setUsedClass(e,o)}return o}_getUsedClass(e){let t;for(;(t=this._classes[e])===Qo;)Thread.sleep(.05);return t===void 0&&(this._classes[e]=Qo),t}_setUsedClass(e,t){t!==void 0?this._classes[e]=t:delete this._classes[e]}_make(e,t,r){let o=lu(),i=Object.create(wr.prototype,{[Symbol.for("n")]:{value:e},$n:{get(){return this[Symbol.for("n")]}},[Symbol.for("C")]:{value:o},$C:{get(){return this[Symbol.for("C")]}},[Symbol.for("w")]:{value:null,writable:!0},$w:{get(){return this[Symbol.for("w")]},set(a){this[Symbol.for("w")]=a}},[Symbol.for("_s")]:{writable:!0},$_s:{get(){return this[Symbol.for("_s")]},set(a){this[Symbol.for("_s")]=a}},[Symbol.for("c")]:{value:[null]},$c:{get(){return this[Symbol.for("c")]}},[Symbol.for("m")]:{value:new Map},$m:{get(){return this[Symbol.for("m")]}},[Symbol.for("l")]:{value:null,writable:!0},$l:{get(){return this[Symbol.for("l")]},set(a){this[Symbol.for("l")]=a}},[Symbol.for("gch")]:{value:t},$gch:{get(){return this[Symbol.for("gch")]}},[Symbol.for("f")]:{value:this},$f:{get(){return this[Symbol.for("f")]}}});o.prototype=i;let s=new o(null);i[Symbol.for("w")]=s,i.$w=s;let c=s.$borrowClassHandle(r);try{let a=c.value;Wo(r,a),i.$l=Ve.build(a,r)}finally{c.unref(r)}return s}retain(e){let t=$.getEnv();return e.$clone(t)}cast(e,t,r){let o=$.getEnv(),i=e.$h;i===void 0&&(i=e);let s=t.$borrowClassHandle(o);try{if(!o.isInstanceOf(i,s.value))throw new Error(`Cast from '${o.getObjectClassName(i)}' to '${t.$n}' isn't possible`)}finally{s.unref(o)}let c=t.$C;return new c(i,Gt,o,r)}wrap(e,t,r){let o=t.$C,i=new o(e,Gt,r,!1);return i.$r=Script.bindWeak(i,$.makeHandleDestructor(e)),i}array(e,t){let r=$.getEnv(),o=Ye(e);o!==null&&(e=o.name);let i=hr("["+e,!1,this),s=i.toJni(t,r);return i.fromJni(s,r,!0)}registerClass(e){let t=$.getEnv(),r=[];try{let o=this.use("java.lang.Class"),i=t.javaLangReflectMethod(),s=t.vaMethod("pointer",[]),c=e.name,a=e.implements||[],l=e.superClass||this.use("java.lang.Object"),d=[],p=[],f={name:Je(c),sourceFileName:ku(c),superClass:Je(l.$n),interfaces:a.map(S=>Je(S.$n)),fields:d,methods:p},u=a.slice();a.forEach(S=>{Array.prototype.slice.call(S.class.getInterfaces()).forEach(x=>{let O=this.cast(x,o).getCanonicalName();u.push(this.use(O))})});let _=e.fields||{};Object.getOwnPropertyNames(_).forEach(S=>{let x=this._getType(_[S]);d.push([S,x.name])});let h={},g={};u.forEach(S=>{let x=S.$borrowClassHandle(t);r.push(x);let O=x.value;S.$ownMembers.filter(w=>S[w].overloads!==void 0).forEach(w=>{let j=S[w],D=j.overloads,B=D.map(F=>ei(w,F.returnType,F.argumentTypes));h[w]=[j,B,O],D.forEach((F,V)=>{let ee=B[V];g[ee]=[F,O]})})});let y=e.methods||{},C=Object.keys(y).reduce((S,x)=>{let O=y[x],w=x==="$init"?"<init>":x;return O instanceof Array?S.push(...O.map(j=>[w,j])):S.push([w,O]),S},[]),L=[];C.forEach(([S,x])=>{let O=Me,w,j,D=[],B;if(typeof x=="function"){let ne=h[S];if(ne!==void 0&&Array.isArray(ne)){let[ce,Y,se]=ne;if(Y.length>1)throw new Error(`More than one overload matching '${S}': signature must be specified`);delete g[Y[0]];let X=ce.overloads[0];O=X.type,w=X.returnType,j=X.argumentTypes,B=x;let re=t.toReflectedMethod(se,X.handle,0),we=s(t.handle,re,i.getGenericExceptionTypes);D=Sr(t,we).map(Je),t.deleteLocalRef(we),t.deleteLocalRef(re)}else w=this._getType("void"),j=[],B=x}else{if(x.isStatic&&(O=Et),w=this._getType(x.returnType||"void"),j=(x.argumentTypes||[]).map(Y=>this._getType(Y)),B=x.implementation,typeof B!="function")throw new Error("Expected a function implementation for method: "+S);let ne=ei(S,w,j),ce=g[ne];if(ce!==void 0){let[Y,se]=ce;delete g[ne],O=Y.type,w=Y.returnType,j=Y.argumentTypes;let X=t.toReflectedMethod(se,Y.handle,0),re=s(t.handle,X,i.getGenericExceptionTypes);D=Sr(t,re).map(Je),t.deleteLocalRef(re),t.deleteLocalRef(X)}}let F=w.name,V=j.map(ne=>ne.name),ee="("+V.join("")+")"+F;p.push([S,F,V,D,O===Et?cu:0]),L.push([S,ee,O,w,j,B])});let M=Object.keys(g);if(M.length>0)throw new Error("Missing implementation for: "+M.join(", "));let R=$t.fromBuffer(Ho(f),this);try{R.load()}finally{R.file.delete()}let N=this.use(e.name),k=C.length;if(k>0){let S=3*bt,x=Memory.alloc(k*S),O=[],w=[];L.forEach(([B,F,V,ee,ne,ce],Y)=>{let se=Memory.allocUtf8String(B),X=Memory.allocUtf8String(F),re=li(B,N,V,ee,ne,ce);x.add(Y*S).writePointer(se),x.add(Y*S+bt).writePointer(X),x.add(Y*S+2*bt).writePointer(re),w.push(se,X),O.push(re)});let j=N.$borrowClassHandle(t);r.push(j);let D=j.value;t.registerNatives(D,x,k),t.throwIfExceptionPending(),N.$nativeMethods=O}return N}finally{r.forEach(o=>{o.unref(t)})}}choose(e,t){let r=$.getEnv(),{flavor:o}=Q;if(o==="jvm")this._chooseObjectsJvm(e,r,t);else if(o==="art"){let i=Q["art::gc::Heap::VisitObjects"]===void 0;if(i&&Q["art::gc::Heap::GetInstances"]===void 0)return this._chooseObjectsJvm(e,r,t);Ee($,r,s=>{i?this._chooseObjectsArtPreA12(e,r,s,t):this._chooseObjectsArtLegacy(e,r,s,t)})}else this._chooseObjectsDalvik(e,r,t)}_chooseObjectsJvm(e,t,r){let o=this.use(e),{jvmti:i}=Q,s=1,c=3,a=o.$borrowClassHandle(t),l=int64(a.value.toString());try{let d=new NativeCallback((y,E,C,L)=>(C.writeS64(l),s),"int",["int64","int64","pointer","pointer"]);i.iterateOverInstancesOfClass(a.value,c,d,a.value);let p=Memory.alloc(8);p.writeS64(l);let f=Memory.alloc(au),u=Memory.alloc(bt);i.getObjectsWithTags(1,p,f,u,NULL);let _=f.readS32(),h=u.readPointer(),g=[];for(let y=0;y!==_;y++)g.push(h.add(y*bt).readPointer());i.deallocate(h);try{for(let y of g){let E=this.cast(y,o);if(r.onMatch(E)==="stop")break}r.onComplete()}finally{g.forEach(y=>{t.deleteLocalRef(y)})}}finally{a.unref(t)}}_chooseObjectsArtPreA12(e,t,r,o){let i=this.use(e),s=ft.$new(r,$),c,a=i.$borrowClassHandle(t);try{let f=Q["art::JavaVMExt::DecodeGlobal"](Q.vm,r,a.value);c=s.newHandle(f)}finally{a.unref(t)}let l=0,d=pt.$new();Q["art::gc::Heap::GetInstances"](Q.artHeap,s,c,l,d);let p=d.handles.map(f=>t.newGlobalRef(f));d.$delete(),s.$delete();try{for(let f of p){let u=this.cast(f,i);if(o.onMatch(u)==="stop")break}o.onComplete()}finally{p.forEach(f=>{t.deleteGlobalRef(f)})}}_chooseObjectsArtLegacy(e,t,r,o){let i=this.use(e),s=[],c=Q["art::JavaVMExt::AddGlobalRef"],a=Q.vm,l,d=i.$borrowClassHandle(t);try{l=Q["art::JavaVMExt::DecodeGlobal"](a,r,d.value).toInt32()}finally{d.unref(t)}let p=or(l,f=>{s.push(c(a,r,f))});Q["art::gc::Heap::VisitObjects"](Q.artHeap,p,NULL);try{for(let f of s){let u=this.cast(f,i);if(o.onMatch(u)==="stop")break}}finally{s.forEach(f=>{t.deleteGlobalRef(f)})}o.onComplete()}_chooseObjectsDalvik(e,t,r){let o=this.use(e);if(Q.addLocalReference===null){let s=Process.getModuleByName("libdvm.so"),c;switch(Process.arch){case"arm":c="2d e9 f0 41 05 46 15 4e 0c 46 7e 44 11 b3 43 68";break;case"ia32":c="8d 64 24 d4 89 5c 24 1c 89 74 24 20 e8 ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? 85 d2";break}Memory.scan(s.base,s.size,c,{onMatch:(a,l)=>{let d;if(Process.arch==="arm")a=a.or(1),d=new NativeFunction(a,"pointer",["pointer","pointer"]);else{let p=Memory.alloc(Process.pageSize);Memory.patchCode(p,16,f=>{let u=new X86Writer(f,{pc:p});u.putMovRegRegOffsetPtr("eax","esp",4),u.putMovRegRegOffsetPtr("edx","esp",8),u.putJmpAddress(a),u.flush()}),d=new NativeFunction(p,"pointer",["pointer","pointer"]),d._thunk=p}return Q.addLocalReference=d,$.perform(p=>{i(this,p)}),"stop"},onError(a){},onComplete(){Q.addLocalReference===null&&r.onComplete()}})}else i(this,t);function i(s,c){let{DVM_JNI_ENV_OFFSET_SELF:a}=zt,l=c.handle.add(a).readPointer(),d,p=o.$borrowClassHandle(c);try{d=Q.dvmDecodeIndirectRef(l,p.value)}finally{p.unref(c)}let f=d.toMatchPattern(),u=Q.dvmHeapSourceGetBase(),h=Q.dvmHeapSourceGetLimit().sub(u).toInt32();Memory.scan(u,h,f,{onMatch:(g,y)=>{Q.dvmIsValidObject(g)&&$.perform(E=>{let C=E.handle.add(a).readPointer(),L,M=Q.addLocalReference(C,g);try{L=s.cast(M,o)}finally{E.deleteLocalRef(M)}if(r.onMatch(L)==="stop")return"stop"})},onError(g){},onComplete(){r.onComplete()}})}}openClassFile(e){return new $t(e,null,this)}_getType(e,t=!0){return fr(e,t,this)}};function lu(){return function(n,e,t,r){return wr.call(this,n,e,t,r)}}function wr(n,e,t,r=!0){if(n!==null)if(r){let o=t.newGlobalRef(n);this.$h=o,this.$r=Script.bindWeak(this,$.makeHandleDestructor(o))}else this.$h=n,this.$r=null;else this.$h=null,this.$r=null;return this.$t=e,new Proxy(this,ii)}ii={has(n,e){return e in n?!0:n.$has(e)},get(n,e,t){if(typeof e!="string"||e.startsWith("$")||e==="class")return n[e];let r=n.$find(e);return r!==null?r(t):n[e]},set(n,e,t,r){return n[e]=t,!0},ownKeys(n){return n.$list()},getOwnPropertyDescriptor(n,e){return Object.prototype.hasOwnProperty.call(n,e)?Object.getOwnPropertyDescriptor(n,e):{writable:!1,configurable:!0,enumerable:!0}}};Object.defineProperties(wr.prototype,{[Symbol.for("new")]:{enumerable:!1,get(){return this.$getCtor("allocAndInit")}},$new:{enumerable:!0,get(){return this[Symbol.for("new")]}},[Symbol.for("alloc")]:{enumerable:!1,value(){let n=$.getEnv(),e=this.$borrowClassHandle(n);try{let t=n.allocObject(e.value);return this.$f.cast(t,this)}finally{e.unref(n)}}},$alloc:{enumerable:!0,get(){return this[Symbol.for("alloc")]}},[Symbol.for("init")]:{enumerable:!1,get(){return this.$getCtor("initOnly")}},$init:{enumerable:!0,get(){return this[Symbol.for("init")]}},[Symbol.for("dispose")]:{enumerable:!1,value(){let n=this.$r;n!==null&&(this.$r=null,Script.unbindWeak(n)),this.$h!==null&&(this.$h=void 0)}},$dispose:{enumerable:!0,get(){return this[Symbol.for("dispose")]}},[Symbol.for("clone")]:{enumerable:!1,value(n){let e=this.$C;return new e(this.$h,this.$t,n)}},$clone:{value(n){return this[Symbol.for("clone")](n)}},[Symbol.for("class")]:{enumerable:!1,get(){let n=$.getEnv(),e=this.$borrowClassHandle(n);try{let t=this.$f;return t.cast(e.value,t.use("java.lang.Class"))}finally{e.unref(n)}}},class:{enumerable:!0,get(){return this[Symbol.for("class")]}},[Symbol.for("className")]:{enumerable:!1,get(){let n=this.$h;return n===null?this.$n:$.getEnv().getObjectClassName(n)}},$className:{enumerable:!0,get(){return this[Symbol.for("className")]}},[Symbol.for("ownMembers")]:{enumerable:!1,get(){return this.$l.list()}},$ownMembers:{enumerable:!0,get(){return this[Symbol.for("ownMembers")]}},[Symbol.for("super")]:{enumerable:!1,get(){let n=$.getEnv(),e=this.$s.$C;return new e(this.$h,ri,n)}},$super:{enumerable:!0,get(){return this[Symbol.for("super")]}},[Symbol.for("s")]:{enumerable:!1,get(){let n=Object.getPrototypeOf(this),e=n.$_s;if(e===void 0){let t=$.getEnv(),r=this.$borrowClassHandle(t);try{let o=t.getSuperclass(r.value);if(o.isNull())e=null;else try{let i=t.getClassName(o),s=n.$f;if(e=s._getUsedClass(i),e===void 0)try{let c=fu(this);e=s._make(i,c,t)}finally{s._setUsedClass(i,e)}}finally{t.deleteLocalRef(o)}}finally{r.unref(t)}n.$_s=e}return e}},$s:{get(){return this[Symbol.for("s")]}},[Symbol.for("isSameObject")]:{enumerable:!1,value(n){return $.getEnv().isSameObject(n.$h,this.$h)}},$isSameObject:{value(n){return this[Symbol.for("isSameObject")](n)}},[Symbol.for("getCtor")]:{enumerable:!1,value(n){let e=this.$c,t=e[0];if(t===null){let r=$.getEnv(),o=this.$borrowClassHandle(r);try{t=hu(o.value,this.$w,r),e[0]=t}finally{o.unref(r)}}return t[n]}},$getCtor:{value(n){return this[Symbol.for("getCtor")](n)}},[Symbol.for("borrowClassHandle")]:{enumerable:!1,value(n){let e=this.$n,t=this.$f._classHandles,r=t.get(e);return r===void 0&&(r=new Ir(this.$gch(n),n),t.set(e,r,n)),r.ref()}},$borrowClassHandle:{value(n){return this[Symbol.for("borrowClassHandle")](n)}},[Symbol.for("copyClassHandle")]:{enumerable:!1,value(n){let e=this.$borrowClassHandle(n);try{return n.newLocalRef(e.value)}finally{e.unref(n)}}},$copyClassHandle:{value(n){return this[Symbol.for("copyClassHandle")](n)}},[Symbol.for("getHandle")]:{enumerable:!1,value(n){let e=this.$h;if(e===void 0)throw new Error("Wrapper is disposed; perhaps it was borrowed from a hook instead of calling Java.retain() to make a long-lived wrapper?");return e}},$getHandle:{value(n){return this[Symbol.for("getHandle")](n)}},[Symbol.for("list")]:{enumerable:!1,value(){let n=this.$s,e=n!==null?n.$list():[],t=this.$l;return Array.from(new Set(e.concat(t.list())))}},$list:{get(){return this[Symbol.for("list")]}},[Symbol.for("has")]:{enumerable:!1,value(n){if(this.$m.has(n)||this.$l.has(n))return!0;let r=this.$s;return!!(r!==null&&r.$has(n))}},$has:{value(n){return this[Symbol.for("has")](n)}},[Symbol.for("find")]:{enumerable:!1,value(n){let e=this.$m,t=e.get(n);if(t!==void 0)return t;let o=this.$l.find(n);if(o!==null){let s=$.getEnv(),c=this.$borrowClassHandle(s);try{t=_u(n,o,c.value,this.$w,s)}finally{c.unref(s)}return e.set(n,t),t}let i=this.$s;return i!==null?i.$find(n):null}},$find:{value(n){return this[Symbol.for("find")](n)}},[Symbol.for("toJSON")]:{enumerable:!1,value(){let n=this.$n;if(this.$h===null)return`<class: ${n}>`;let t=this.$className;return n===t?`<instance: ${n}>`:`<instance: ${n}, $className: ${t}>`}},toJSON:{get(){return this[Symbol.for("toJSON")]}}});function Ir(n,e){this.value=e.newGlobalRef(n),e.deleteLocalRef(n),this.refs=1}Ir.prototype.ref=function(){return this.refs++,this};Ir.prototype.unref=function(n){--this.refs===0&&n.deleteGlobalRef(this.value)};function du(n,e){n.unref(e)}function uu(n){let e=n.replace(/\./g,"/");return function(t){let r=Ht();ui(r);try{return t.findClass(e)}finally{pi(r)}}}function pu(n,e,t){return mr===null&&(Xo=t.vaMethod("pointer",["pointer"]),mr=e.loadClass.overload("java.lang.String").handle),t=null,function(r){let o=r.newStringUtf(n),i=Ht();ui(i);try{let s=Xo(r.handle,e.$h,mr,o);return r.throwIfExceptionPending(),s}finally{pi(i),r.deleteLocalRef(o)}}}function fu(n){return function(e){let t=n.$borrowClassHandle(e);try{return e.getSuperclass(t.value)}finally{t.unref(e)}}}function hu(n,e,t){let{$n:r,$f:o}=e,i=Tu(r),s=t.javaLangClass(),c=t.javaLangReflectConstructor(),a=t.vaMethod("pointer",[]),l=t.vaMethod("uint8",[]),d=[],p=[],f=o._getType(r,!1),u=o._getType("void",!1),_=a(t.handle,n,s.getDeclaredConstructors);try{let h=t.getArrayLength(_);if(h!==0)for(let g=0;g!==h;g++){let y,E,C=t.getObjectArrayElement(_,g);try{y=t.fromReflectedMethod(C),E=a(t.handle,C,c.getGenericParameterTypes)}finally{t.deleteLocalRef(C)}let L;try{L=Sr(t,E).map(M=>o._getType(M))}finally{t.deleteLocalRef(E)}d.push(Xe(i,e,gr,y,f,L,t)),p.push(Xe(i,e,Me,y,u,L,t))}else{if(l(t.handle,n,s.isInterface))throw new Error("cannot instantiate an interface");let y=t.javaLangObject(),E=t.getMethodId(y,"<init>","()V");d.push(Xe(i,e,gr,E,f,[],t)),p.push(Xe(i,e,Me,E,u,[],t))}}finally{t.deleteLocalRef(_)}if(p.length===0)throw new Error("no supported overloads");return{allocAndInit:br(d),initOnly:br(p)}}function _u(n,e,t,r,o){return e.startsWith("m")?mu(n,e,t,r,o):Cu(n,e,t,r,o)}function mu(n,e,t,r,o){let{$f:i}=r,s=e.split(":").slice(1),c=o.javaLangReflectMethod(),a=o.vaMethod("pointer",[]),l=o.vaMethod("uint8",[]),d=s.map(f=>{let u=f[0]==="s"?Et:Me,_=ptr(f.substr(1)),h,g=[],y=o.toReflectedMethod(t,_,u===Et?1:0);try{let E=!!l(o.handle,y,c.isVarArgs),C=a(o.handle,y,c.getGenericReturnType);o.throwIfExceptionPending();try{h=i._getType(o.getTypeName(C))}finally{o.deleteLocalRef(C)}let L=a(o.handle,y,c.getParameterTypes);try{let M=o.getArrayLength(L);for(let R=0;R!==M;R++){let N=o.getObjectArrayElement(L,R),k;try{k=E&&R===M-1?o.getArrayTypeName(N):o.getTypeName(N)}finally{o.deleteLocalRef(N)}let S=i._getType(k);g.push(S)}}finally{o.deleteLocalRef(L)}}catch{return null}finally{o.deleteLocalRef(y)}return Xe(n,r,u,_,h,g,o)}).filter(f=>f!==null);if(d.length===0)throw new Error("No supported overloads");n==="valueOf"&&Su(d);let p=br(d);return function(f){return p}}function br(n){let e=gu();return Object.setPrototypeOf(e,si),e._o=n,e}function gu(){let n=function(){return n.invoke(this,arguments)};return n}si=Object.create(Function.prototype,{overloads:{enumerable:!0,get(){return this._o}},overload:{value(...n){let e=this._o,t=n.length,r=n.join(":");for(let o=0;o!==e.length;o++){let i=e[o],{argumentTypes:s}=i;if(s.length!==t)continue;if(s.map(a=>a.className).join(":")===r)return i}Er(this.methodName,this.overloads,"specified argument types do not match any of:")}},methodName:{enumerable:!0,get(){return this._o[0].methodName}},holder:{enumerable:!0,get(){return this._o[0].holder}},type:{enumerable:!0,get(){return this._o[0].type}},handle:{enumerable:!0,get(){return Ge(this),this._o[0].handle}},implementation:{enumerable:!0,get(){return Ge(this),this._o[0].implementation},set(n){Ge(this),this._o[0].implementation=n}},returnType:{enumerable:!0,get(){return Ge(this),this._o[0].returnType}},argumentTypes:{enumerable:!0,get(){return Ge(this),this._o[0].argumentTypes}},canInvokeWith:{enumerable:!0,get(n){return Ge(this),this._o[0].canInvokeWith}},clone:{enumerable:!0,value(n){return Ge(this),this._o[0].clone(n)}},invoke:{value(n,e){let t=this._o,r=n.$h!==null;for(let o=0;o!==t.length;o++){let i=t[o];if(i.canInvokeWith(e)){if(i.type===Me&&!r){let s=this.methodName;if(s==="toString")return`<class: ${n.$n}>`;throw new Error(s+": cannot call instance method without an instance")}return i.apply(n,e)}}if(this.methodName==="toString")return`<class: ${n.$n}>`;Er(this.methodName,this.overloads,"argument types do not match any of:")}}});function ei(n,e,t){return`${e.className} ${n}(${t.map(r=>r.className).join(", ")})`}function Ge(n){let e=n._o;e.length>1&&Er(e[0].methodName,e,"has more than one overload, use .overload(<signature>) to choose from:")}function Er(n,e,t){let o=e.slice().sort((i,s)=>i.argumentTypes.length-s.argumentTypes.length).map(i=>i.argumentTypes.length>0?".overload('"+i.argumentTypes.map(c=>c.className).join("', '")+"')":".overload()");throw new Error(`${n}(): ${t}
	${o.join(`
	`)}`)}function Xe(n,e,t,r,o,i,s,c){let a=o.type,l=i.map(f=>f.type);s===null&&(s=$.getEnv());let d,p;return t===Me?(d=s.vaMethod(a,l,c),p=s.nonvirtualVaMethod(a,l,c)):t===Et?(d=s.staticVaMethod(a,l,c),p=d):(d=s.constructor(l,c),p=d),yu([n,e,t,r,o,i,d,p])}function yu(n){let e=bu();return Object.setPrototypeOf(e,ai),e._p=n,e}function bu(){let n=function(){return n.invoke(this,arguments)};return n}ai=Object.create(Function.prototype,{methodName:{enumerable:!0,get(){return this._p[0]}},holder:{enumerable:!0,get(){return this._p[1]}},type:{enumerable:!0,get(){return this._p[2]}},handle:{enumerable:!0,get(){return this._p[3]}},implementation:{enumerable:!0,get(){let n=this._r;return n!==void 0?n:null},set(n){let e=this._p,t=e[1];if(e[2]===gr)throw new Error("Reimplementing $new is not possible; replace implementation of $init instead");let o=this._r;if(o!==void 0&&(t.$f._patchedMethods.delete(this),o._m.revert($),this._r=void 0),n!==null){let[i,s,c,a,l,d]=e,p=li(i,s,c,l,d,n,this),f=ni(a);p._m=f,this._r=p,f.replace(p,c===Me,d,$,Q),t.$f._patchedMethods.add(this)}}},returnType:{enumerable:!0,get(){return this._p[4]}},argumentTypes:{enumerable:!0,get(){return this._p[5]}},canInvokeWith:{enumerable:!0,value(n){let e=this._p[5];return n.length!==e.length?!1:e.every((t,r)=>t.isCompatible(n[r]))}},clone:{enumerable:!0,value(n){let e=this._p.slice(0,6);return Xe(...e,null,n)}},invoke:{value(n,e){let t=$.getEnv(),r=this._p,o=r[2],i=r[4],s=r[5],c=this._r,a=o===Me,l=e.length,d=2+l;t.pushLocalFrame(d);let p=null;try{let f;a?f=n.$getHandle():(p=n.$borrowClassHandle(t),f=p.value);let u,_=n.$t;c===void 0?u=r[3]:(u=c._m.resolveTarget(n,a,t,Q),oi&&c._c.has(Ht())&&(_=ri));let h=[t.handle,f,u];for(let E=0;E!==l;E++)h.push(s[E].toJni(e[E],t));let g;_===Gt?g=r[6]:(g=r[7],a&&h.splice(2,0,n.$copyClassHandle(t)));let y=g.apply(null,h);return t.throwIfExceptionPending(),i.fromJni(y,t,!0)}finally{p!==null&&p.unref(t),t.popLocalFrame(NULL)}}},toString:{enumerable:!0,value(){return`function ${this.methodName}(${this.argumentTypes.map(n=>n.className).join(", ")}): ${this.returnType.className}`}}});function li(n,e,t,r,o,i,s=null){let c=new Set,a=Eu([n,e,t,r,o,i,s,c]),l=new NativeCallback(a,r.type,["pointer","pointer"].concat(o.map(d=>d.type)));return l._c=c,l}function Eu(n){return function(){return vu(arguments,n)}}function vu(n,e){let t=new b(n[0],$),[r,o,i,s,c,a,l,d]=e,p=[],f;if(i===Me){let h=o.$C;f=new h(n[1],Gt,t,!1)}else f=o;let u=Ht();t.pushLocalFrame(3);let _=!0;$.link(u,t);try{d.add(u);let h;l===null||!et.has(u)?h=a:h=l;let g=[],y=n.length-2;for(let L=0;L!==y;L++){let R=c[L].fromJni(n[2+L],t,!1);g.push(R),p.push(R)}let E=h.apply(f,g);if(!s.isCompatible(E))throw new Error(`Implementation for ${r} expected return value compatible with ${s.className}`);let C=s.toJni(E,t);return s.type==="pointer"&&(C=t.popLocalFrame(C),_=!1,p.push(E)),C}catch(h){let g=h.$h;return g!==void 0?t.throw(g):Script.nextTick(()=>{throw h}),s.defaultValue}finally{$.unlink(u),_&&t.popLocalFrame(NULL),d.delete(u),p.forEach(h=>{if(h===null)return;let g=h.$dispose;g!==void 0&&g.call(h)})}}function Su(n){let{holder:e,type:t}=n[0];n.some(o=>o.type===t&&o.argumentTypes.length===0)||n.push(wu([e,t]))}function wu(n){let e=Iu();return Object.setPrototypeOf(e,ci),e._p=n,e}function Iu(){return function(){return this}}ci=Object.create(Function.prototype,{methodName:{enumerable:!0,get(){return"valueOf"}},holder:{enumerable:!0,get(){return this._p[0]}},type:{enumerable:!0,get(){return this._p[1]}},handle:{enumerable:!0,get(){return NULL}},implementation:{enumerable:!0,get(){return null},set(n){}},returnType:{enumerable:!0,get(){let n=this.holder;return n.$f.use(n.$n)}},argumentTypes:{enumerable:!0,get(){return[]}},canInvokeWith:{enumerable:!0,value(n){return n.length===0}},clone:{enumerable:!0,value(n){throw new Error("Invalid operation")}}});function Cu(n,e,t,r,o){let i=e[2]==="s"?_r:yr,s=ptr(e.substr(3)),{$f:c}=r,a,l=o.toReflectedField(t,s,i===_r?1:0);try{a=o.vaMethod("pointer",[])(o.handle,l,o.javaLangReflectField().getGenericType),o.throwIfExceptionPending()}finally{o.deleteLocalRef(l)}let d;try{d=c._getType(o.getTypeName(a))}finally{o.deleteLocalRef(a)}let p,f,u=d.type;return i===_r?(p=o.getStaticField(u),f=o.setStaticField(u)):(p=o.getField(u),f=o.setField(u)),Au([i,d,s,p,f])}function Au(n){return function(e){return new di([e].concat(n))}}function di(n){this._p=n}Object.defineProperties(di.prototype,{value:{enumerable:!0,get(){let[n,e,t,r,o]=this._p,i=$.getEnv();i.pushLocalFrame(4);let s=null;try{let c;if(e===yr){if(c=n.$getHandle(),c===null)throw new Error("Cannot access an instance field without an instance")}else s=n.$borrowClassHandle(i),c=s.value;let a=o(i.handle,c,r);return i.throwIfExceptionPending(),t.fromJni(a,i,!0)}finally{s!==null&&s.unref(i),i.popLocalFrame(NULL)}},set(n){let[e,t,r,o,,i]=this._p,s=$.getEnv();s.pushLocalFrame(4);let c=null;try{let a;if(t===yr){if(a=e.$getHandle(),a===null)throw new Error("Cannot access an instance field without an instance")}else c=e.$borrowClassHandle(s),a=c.value;if(!r.isCompatible(n))throw new Error(`Expected value compatible with ${r.className}`);let l=r.toJni(n,s);i(s.handle,a,o,l),s.throwIfExceptionPending()}finally{c!==null&&c.unref(s),s.popLocalFrame(NULL)}}},holder:{enumerable:!0,get(){return this._p[0]}},fieldType:{enumerable:!0,get(){return this._p[1]}},fieldReturnType:{enumerable:!0,get(){return this._p[2]}},toString:{enumerable:!0,value(){let n=`Java.Field{holder: ${this.holder}, fieldType: ${this.fieldType}, fieldReturnType: ${this.fieldReturnType}, value: ${this.value}}`;return n.length<200?n:`Java.Field{
	holder: ${this.holder},
	fieldType: ${this.fieldType},
	fieldReturnType: ${this.fieldReturnType},
	value: ${this.value},
}`.split(`
`).map(t=>t.length>200?t.slice(0,t.indexOf(" ")+1)+"...,":t).join(`
`)}}});var $t=class n{static fromBuffer(e,t){let r=ti(t),o=r.getCanonicalPath().toString(),i=new File(o,"w");return i.write(e.buffer),i.close(),Lu(o,t),new n(o,r,t)}constructor(e,t,r){this.path=e,this.file=t,this._factory=r}load(){let{_factory:e}=this,{codeCacheDir:t}=e,r=e.use("dalvik.system.DexClassLoader"),o=e.use("java.io.File"),i=this.file;if(i===null&&(i=e.use("java.io.File").$new(this.path)),!i.exists())throw new Error("File not found");o.$new(t).mkdirs(),e.loader=r.$new(i.getCanonicalPath(),t,null,e.loader),$.preventDetachDueToClassLoader()}getClassNames(){let{_factory:e}=this,t=e.use("dalvik.system.DexFile"),r=ti(e),o=t.loadDex(this.path,r.getCanonicalPath(),0),i=[],s=o.entries();for(;s.hasMoreElements();)i.push(s.nextElement().toString());return i}};function ti(n){let{cacheDir:e,tempFileNaming:t}=n,r=n.use("java.io.File"),o=r.$new(e);return o.mkdirs(),r.createTempFile(t.prefix,t.suffix+".dex",o)}function Lu(n,e){e.use("java.io.File").$new(n).setWritable(!1,!1)}function xu(){switch(pe.state){case"empty":{pe.state="pending";let n=pe.factories[0],e=n.use("java.util.HashMap"),t=n.use("java.lang.Integer");pe.loaders=e.$new(),pe.Integer=t;let r=n.loader;return r!==null&&vr(n,r),pe.state="ready",pe}case"pending":do Thread.sleep(.05);while(pe.state==="pending");return pe;case"ready":return pe}}function vr(n,e){let{factories:t,loaders:r,Integer:o}=pe,i=o.$new(t.indexOf(n));r.put(e,i);for(let s=e.getParent();s!==null&&!r.containsKey(s);s=s.getParent())r.put(s,i)}function ui(n){let e=et.get(n);e===void 0&&(e=0),e++,et.set(n,e)}function pi(n){let e=et.get(n);if(e===void 0)throw new Error(`Thread ${n} is not ignored`);e--,e===0?et.delete(n):et.set(n,e)}function Tu(n){return n.slice(n.lastIndexOf(".")+1)}function Sr(n,e){let t=[],r=n.getArrayLength(e);for(let o=0;o!==r;o++){let i=n.getObjectArrayElement(e,o);try{t.push(n.getTypeName(i))}finally{n.deleteLocalRef(i)}}return t}function ku(n){let e=n.split(".");return e[e.length-1]+".java"}var Nu=4,fi=Process.pointerSize,Cr=class{ACC_PUBLIC=1;ACC_PRIVATE=2;ACC_PROTECTED=4;ACC_STATIC=8;ACC_FINAL=16;ACC_SYNCHRONIZED=32;ACC_BRIDGE=64;ACC_VARARGS=128;ACC_NATIVE=256;ACC_ABSTRACT=1024;ACC_STRICT=2048;ACC_SYNTHETIC=4096;constructor(){this.classFactory=null,this.ClassFactory=je,this.vm=null,this.api=null,this._initialized=!1,this._apiError=null,this._wakeupHandler=null,this._pollListener=null,this._pendingMainOps=[],this._pendingVmOps=[],this._cachedIsAppProcess=null;try{this._tryInitialize()}catch{}}_tryInitialize(){if(this._initialized)return!0;if(this._apiError!==null)throw this._apiError;let e;try{e=mt(),this.api=e}catch(r){throw this._apiError=r,r}if(e===null)return!1;let t=new Ce(e);return this.vm=t,qo(t),je._initialize(t,e),this.classFactory=new je,this._initialized=!0,!0}_dispose(){if(this.api===null)return;let{vm:e}=this;e.perform(t=>{je._disposeAll(t),b.dispose(t)}),Script.nextTick(()=>{Ce.dispose(e)})}get available(){return this._tryInitialize()}get androidVersion(){return ht()}synchronized(e,t){let{$h:r=e}=e;if(!(r instanceof NativePointer))throw new Error("Java.synchronized: the first argument `obj` must be either a pointer or a Java instance");let o=this.vm.getEnv();ue("VM::MonitorEnter",o.monitorEnter(r));try{t()}finally{o.monitorExit(r)}}enumerateLoadedClasses(e){this._checkAvailable();let{flavor:t}=this.api;t==="jvm"?this._enumerateLoadedClassesJvm(e):t==="art"?this._enumerateLoadedClassesArt(e):this._enumerateLoadedClassesDalvik(e)}enumerateLoadedClassesSync(){let e=[];return this.enumerateLoadedClasses({onMatch(t){e.push(t)},onComplete(){}}),e}enumerateClassLoaders(e){this._checkAvailable();let{flavor:t}=this.api;if(t==="jvm")this._enumerateClassLoadersJvm(e);else if(t==="art")this._enumerateClassLoadersArt(e);else throw new Error("Enumerating class loaders is not supported on Dalvik")}enumerateClassLoadersSync(){let e=[];return this.enumerateClassLoaders({onMatch(t){e.push(t)},onComplete(){}}),e}_enumerateLoadedClassesJvm(e){let{api:t,vm:r}=this,{jvmti:o}=t,i=r.getEnv(),s=Memory.alloc(Nu),c=Memory.alloc(fi);o.getLoadedClasses(s,c);let a=s.readS32(),l=c.readPointer(),d=[];for(let p=0;p!==a;p++)d.push(l.add(p*fi).readPointer());o.deallocate(l);try{for(let p of d){let f=i.getClassName(p);e.onMatch(f,p)}e.onComplete()}finally{d.forEach(p=>{i.deleteLocalRef(p)})}}_enumerateClassLoadersJvm(e){this.choose("java.lang.ClassLoader",e)}_enumerateLoadedClassesArt(e){let{vm:t,api:r}=this,o=t.getEnv(),i=r["art::JavaVMExt::AddGlobalRef"],{vm:s}=r;Ee(t,o,c=>{let a=Kn(l=>{let d=i(s,c,l);try{let p=o.getClassName(d);e.onMatch(p,d)}finally{o.deleteGlobalRef(d)}return!0});r["art::ClassLinker::VisitClasses"](r.artClassLinker.address,a)}),e.onComplete()}_enumerateClassLoadersArt(e){let{classFactory:t,vm:r,api:o}=this,i=r.getEnv(),s=o["art::ClassLinker::VisitClassLoaders"];if(s===void 0)throw new Error("This API is only available on Android >= 7.0");let c=t.use("java.lang.ClassLoader"),a=[],l=o["art::JavaVMExt::AddGlobalRef"],{vm:d}=o;Ee(r,i,p=>{let f=Wn(u=>(a.push(l(d,p,u)),!0));qn(()=>{s(o.artClassLinker.address,f)})});try{a.forEach(p=>{let f=t.cast(p,c);e.onMatch(f)})}finally{a.forEach(p=>{i.deleteGlobalRef(p)})}e.onComplete()}_enumerateLoadedClassesDalvik(e){let{api:t}=this,r=ptr("0xcbcacccd"),o=172,i=8,c=t.gDvm.add(o).readPointer(),a=c.readS32(),d=c.add(12).readPointer(),p=a*i;for(let f=0;f<p;f+=i){let _=d.add(f).add(4).readPointer();if(_.isNull()||_.equals(r))continue;let g=_.add(24).readPointer().readUtf8String();if(g.startsWith("L")){let y=g.substring(1,g.length-1).replace(/\//g,".");e.onMatch(y)}}e.onComplete()}enumerateMethods(e){let{classFactory:t}=this,r=this.vm.getEnv(),o=t.use("java.lang.ClassLoader");return Ve.enumerateMethods(e,this.api,r).map(i=>{let s=i.loader;return i.loader=s!==null?t.wrap(s,o,r):null,i})}scheduleOnMainThread(e){this.performNow(()=>{this._pendingMainOps.push(e);let{_wakeupHandler:t}=this;if(t===null){let{classFactory:r}=this,o=r.use("android.os.Handler"),i=r.use("android.os.Looper");t=o.$new(i.getMainLooper()),this._wakeupHandler=t}this._pollListener===null&&(this._pollListener=Interceptor.attach(Process.getModuleByName("libc.so").getExportByName("epoll_wait"),this._makePollHook()),Interceptor.flush()),t.sendEmptyMessage(1)})}_makePollHook(){let e=Process.id,{_pendingMainOps:t}=this;return function(){if(this.threadId!==e)return;let r;for(;(r=t.shift())!==void 0;)try{r()}catch(o){Script.nextTick(()=>{throw o})}}}perform(e){if(this._checkAvailable(),!this._isAppProcess()||this.classFactory.loader!==null)try{this.vm.perform(e)}catch(t){Script.nextTick(()=>{throw t})}else this._pendingVmOps.push(e),this._pendingVmOps.length===1&&this._performPendingVmOpsWhenReady()}performNow(e){return this._checkAvailable(),this.vm.perform(()=>{let{classFactory:t}=this;if(this._isAppProcess()&&t.loader===null){let o=t.use("android.app.ActivityThread").currentApplication();o!==null&&hi(t,o)}return e()})}_performPendingVmOpsWhenReady(){this.vm.perform(()=>{let{classFactory:e}=this,t=e.use("android.app.ActivityThread"),r=t.currentApplication();if(r!==null){hi(e,r),this._performPendingVmOps();return}let o=this,i=!1,s="early",c=t.handleBindApplication;c.implementation=function(d){if(d.instrumentationName.value!==null){s="late";let f=e.use("android.app.LoadedApk").makeApplication;f.implementation=function(u,_){return i||(i=!0,_i(e,this),o._performPendingVmOps()),f.apply(this,arguments)}}c.apply(this,arguments)};let l=t.getPackageInfo.overloads.map(d=>[d.argumentTypes.length,d]).sort(([d],[p])=>p-d).map(([d,p])=>p)[0];l.implementation=function(...d){let p=l.call(this,...d);return!i&&s==="early"&&(i=!0,_i(e,p),o._performPendingVmOps()),p}})}_performPendingVmOps(){let{vm:e,_pendingVmOps:t}=this,r;for(;(r=t.shift())!==void 0;)try{e.perform(r)}catch(o){Script.nextTick(()=>{throw o})}}use(e,t){return this.classFactory.use(e,t)}openClassFile(e){return this.classFactory.openClassFile(e)}choose(e,t){this.classFactory.choose(e,t)}retain(e){return this.classFactory.retain(e)}cast(e,t){return this.classFactory.cast(e,t)}array(e,t){return this.classFactory.array(e,t)}backtrace(e){return Qn(this.vm,e)}isMainThread(){let e=this.classFactory.use("android.os.Looper"),t=e.getMainLooper(),r=e.myLooper();return r===null?!1:t.$isSameObject(r)}registerClass(e){return this.classFactory.registerClass(e)}deoptimizeEverything(){let{vm:e}=this;return tr(e,e.getEnv())}deoptimizeBootImage(){let{vm:e}=this;return nr(e,e.getEnv())}deoptimizeMethod(e){let{vm:t}=this;return er(t,t.getEnv(),e)}_checkAvailable(){if(!this.available)throw new Error("Java API not available")}_isAppProcess(){let e=this._cachedIsAppProcess;if(e===null){if(this.api.flavor==="jvm")return e=!1,this._cachedIsAppProcess=e,e;let t=new NativeFunction(Module.getGlobalExportByName("readlink"),"pointer",["pointer","pointer","pointer"],{exceptions:"propagate"}),r=Memory.allocUtf8String("/proc/self/exe"),o=1024,i=Memory.alloc(o),s=t(r,i,ptr(o)).toInt32();if(s!==-1){let c=i.readUtf8String(s);e=/^\/system\/bin\/app_process/.test(c)}else e=!0;this._cachedIsAppProcess=e}return e}};function hi(n,e){let t=n.use("android.os.Process");n.loader=e.getClassLoader(),t.myUid()===t.SYSTEM_UID.value?(n.cacheDir="/data/system",n.codeCacheDir="/data/dalvik-cache"):"getCodeCacheDir"in e?(n.cacheDir=e.getCacheDir().getCanonicalPath(),n.codeCacheDir=e.getCodeCacheDir().getCanonicalPath()):(n.cacheDir=e.getFilesDir().getCanonicalPath(),n.codeCacheDir=e.getCacheDir().getCanonicalPath())}function _i(n,e){let t=n.use("java.io.File");n.loader=e.getClassLoader();let r=t.$new(e.getDataDir()).getCanonicalPath();n.cacheDir=r,n.codeCacheDir=r+"/cache"}var Ar=new Cr;Script.bindWeak(Ar,()=>{Ar._dispose()});var Le=Ar;typeof Memory.readByteArray>"u"&&(Memory.readByteArray=function(n,e){return ptr(n).readByteArray(e)},Memory.readPointer=function(n){return ptr(n).readPointer()},Memory.readUtf8String=function(n){return ptr(n).readUtf8String()},Memory.readUInt=function(n){return ptr(n).readUInt()});function Pe(n){if(n==null)return null;for(var e=new Uint8Array(n),t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r="",o=0;o+3<=e.length;o+=3)r+=t[e[o]>>2],r+=t[(e[o]&3)<<4|e[o+1]>>4],r+=t[(e[o+1]&15)<<2|e[o+2]>>6],r+=t[e[o+2]&63];var i=e.length-o;return i===1?(r+=t[e[o]>>2],r+=t[(e[o]&3)<<4],r+="=="):i===2&&(r+=t[e[o]>>2],r+=t[(e[o]&3)<<4|e[o+1]>>4],r+=t[(e[o+1]&15)<<2],r+="="),r}function U(n,e){send(Object.assign({kind:n},e||{}))}function Mu(n){var e=n.add(Process.pointerSize).readUInt();return n.add(Process.pointerSize*2).readPointer().readByteArray(e)}function Ou(n,e){Interceptor.attach(ptr(n),{onEnter:function(t){this.keyData=t[0],this.keyDataLength=t[1]},onLeave:function(t){try{if(t.toInt32()!==0)return;var r=Memory.readPointer(this.keyDataLength).toInt32(),o=Memory.readByteArray(this.keyData,r);U("keybox",{data:Pe(o)}),U("log",{message:e+": OEMCrypto_GetKeyData size="+r})}catch(i){U("log",{message:e+": OEMCrypto_GetKeyData read failed: "+i})}}})}function Ru(n,e){Interceptor.attach(ptr(n),{onEnter:function(t){this.session=t[0],this.wrappedKey=t[1],this.wrappedKeyLength=t[2]},onLeave:function(t){try{if(t.toInt32()!==0)return;var r=this.wrappedKeyLength.toInt32(),o=Memory.readByteArray(this.wrappedKey,r);U("device_rsa_key",{data:Pe(o)}),U("log",{message:e+": OEMCrypto_LoadDeviceRSAKey size="+r})}catch(i){U("log",{message:e+": OEMCrypto_LoadDeviceRSAKey read failed: "+i})}}})}function ju(n,e){Interceptor.attach(ptr(n),{onEnter:function(t){this.wrappedKeyOut=t[9],this.wrappedKeyOutLength=t[10]},onLeave:function(t){try{if(t.toInt32()!==0)return;var r=Memory.readPointer(this.wrappedKeyOutLength).toInt32(),o=Memory.readByteArray(this.wrappedKeyOut,r);U("device_rsa_key",{data:Pe(o)}),U("log",{message:e+": OEMCrypto_RewrapDeviceRSAKey size="+r})}catch(i){U("log",{message:e+": OEMCrypto_RewrapDeviceRSAKey read failed: "+i})}}})}function Pu(n,e){Interceptor.attach(ptr(n),{onLeave:function(t){try{U("log",{message:e+": OEMCrypto_LoadKeys status="+t.toInt32()})}catch(r){U("log",{message:e+": OEMCrypto_LoadKeys log failed: "+r})}}})}function Fu(n,e){Interceptor.attach(ptr(n),{onEnter:function(t){this.ret=t[4]},onLeave:function(){try{if(!this.ret)return;var t=Mu(this.ret);U("device_client_id",{data:Pe(t)}),U("log",{message:e+": PrepareKeyRequest captured license request"})}catch(r){U("log",{message:e+": PrepareKeyRequest read failed: "+r})}}})}function Du(n,e){var t=n.name,r=n.address;try{t==="_lcc04"||t==="_oecc04"||t.indexOf("GetKeyData")!==-1?Ou(r,e):t==="_lcc18"||t==="_oecc18"||t.indexOf("RewrapDeviceRSAKey")!==-1?ju(r,e):t==="_lcc19"||t==="_oecc19"||t.indexOf("LoadDeviceRSAKey")!==-1?Ru(r,e):t==="OEMCrypto_LoadKeys_Back_Compat"||t.indexOf("LoadKeys")!==-1?Pu(r,e):t.indexOf("PrepareKeyRequest")!==-1&&Fu(r,e)}catch(o){U("log",{message:"attach failed for "+t+" in "+e+": "+o})}}function Uu(){["libwvhidl.so","libwvdrmengine.so","liboemcrypto.so","libmediadrm.so"].forEach(function(n){var e;try{e=Process.getModuleByName(n)}catch{return}try{U("log",{message:"hooking "+n+" @ "+e.base})}catch{}try{e.enumerateExports().forEach(function(t){Du(t,n)})}catch(t){U("log",{message:"enumerateExports failed for "+n+": "+t})}})}function Bu(n,e,t){if(!n.isNull()){var r;try{r=new Uint8Array(n.readByteArray(4))}catch{return}if(!(r[0]!==48||r[1]!==130)){var o=(r[2]<<8|r[3])+4;if(!(o<600||o>4e3)){var i=n.toString()+":"+o;if(!t[i]){t[i]=!0;var s;try{s=n.readByteArray(o)}catch{return}U("device_rsa_key",{data:Pe(s),plaintext:!0}),U("log",{message:"captured plaintext RSA key at "+e+" len="+o})}}}}}function zu(){var n={},e=["libwvhidl.so","libwvdrmengine.so","liboemcrypto.so","libmediadrm.so"],t=[];e.forEach(function(o){var i;try{i=Process.getModuleByName(o)}catch{return}i.enumerateExports().forEach(function(s){t.push(s)})});var r=0;t.forEach(function(o){var i=o.name;if(!(!/^[a-z]{4,12}$/.test(i)&&!/^_oecc\d+$/.test(i)))try{Interceptor.attach(o.address,{onEnter:function(s){for(var c=0;c<8;c++)try{Bu(s[c],i+"#arg"+c,n)}catch{}}}),r++}catch{}}),U("log",{message:"provisioning key sniff installed on "+r+" functions"})}var tt=[];function Vu(n){if(!(!n||!n.length)){var e=Pe(n);tt.push({u8:n,b64:e,b64url:e.replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}),tt.length>6&&tt.shift()}}function Ju(n){for(var e="",t=32768,r=0;r<n.length;r+=t)e+=String.fromCharCode.apply(null,n.subarray(r,r+t));return e}function Gu(n,e){if(e.length===0||e.length>n.length)return!1;for(var t=n.length-e.length,r=0;r<=t;r++){for(var o=0;o<e.length&&n[r+o]===e[o];)o++;if(o===e.length)return!0}return!1}function $u(n){for(var e=Pe(n),t=null,r=0;r<tt.length;r++){var o=tt[r];if(e===o.b64||Gu(n,o.u8)||(t===null&&(t=Ju(n)),t.indexOf(o.b64)!==-1)||t.indexOf(o.b64url)!==-1)return!0}return!1}function Hu(){try{var n=Le.use("android.media.MediaDrm");n.getKeyRequest.overload("[B","[B","java.lang.String","int","java.util.HashMap").implementation=function(e,t,r,o,i){t&&U("pssh",{data:Pe(t)});var s=this.getKeyRequest(e,t,r,o,i);try{var c=s.getData();c!==null&&Vu(new Uint8Array(c))}catch{}try{var a=s.getDefaultUrl();a&&(""+a).length>0&&U("license_url",{url:""+a})}catch{}return s}}catch(e){U("log",{message:"MediaDrm.getKeyRequest hook failed: "+e})}}function Zu(){var n,e;try{n=Le.use("okhttp3.Request$Builder")}catch(t){U("log",{message:"licensePost: okhttp3.Request$Builder not found: "+t});return}try{e=Le.use("okio.Buffer")}catch{e=null}try{n.build.implementation=function(){var t=this.build();try{Yu(t,e)}catch(r){U("log",{message:"licensePost: inspect threw: "+r})}return t},U("log",{message:"licensePost: build() hook installed"})}catch(t){U("log",{message:"licensePost: could not hook build(): "+t})}}function qu(n){var e={};try{(""+n.headers().toString()).split(`
`).forEach(function(t){var r=t.indexOf(": ");r>0&&(e[t.substring(0,r)]=t.substring(r+2))})}catch{}return e}function mi(n,e){var t=""+n.url().toString();U("license_request",{url:t,headers:qu(n),matched:!0,via:e}),U("log",{message:"correlated license POST ("+e+"): "+t})}function Ku(n){var e=n.toLowerCase();return e.indexOf("license")!==-1||e.indexOf("drm_type=")!==-1||e.indexOf("widevine")!==-1||e.indexOf("acquirelicense")!==-1||e.indexOf("getlicense")!==-1||e.indexOf("licenseserver")!==-1}function Wu(n){try{for(var e=n.getClass(),t=0;t<3&&e!==null;t++){for(var r=e.getDeclaredFields(),o=0;o<r.length;o++){var i=r[o];if(""+i.getType().getName()=="[B")try{i.setAccessible(!0);var s=i.get(n);if(s!==null&&s.length>0&&s.length<=262144)return new Uint8Array(s)}catch{}}e=e.getSuperclass()}}catch{}return null}function Qu(n){try{return n.readByteArray()}catch{}try{return n.snapshot().toByteArray()}catch{}return null}function Yu(n,e){if(tt.length!==0&&(""+n.method()).toUpperCase()==="POST"){var t=n.body();if(t!==null){var r=Wu(t);if(r===null&&e!==null)try{if(!t.isDuplex()&&!t.isOneShot()){var o=-1;try{o=t.contentLength()}catch{}if(o<=262144){var i=e.$new();t.writeTo(i);var s=Qu(i);s!==null&&(r=new Uint8Array(s))}}}catch{}if(r!==null&&$u(r)){mi(n,"body-match");return}if(Ku(""+n.url().toString())){mi(n,"url-heuristic");return}}}}function Xu(){try{var n=Le.use("okhttp3.Request$Builder");n.url.overload("java.lang.String").implementation=function(e){return U("license_url",{url:e}),this.url(e)},n.addHeader.implementation=function(e,t){var r={};return r[e]=t,U("license_headers",{headers:r}),this.addHeader(e,t)}}catch(e){U("log",{message:"okhttp not present: "+e})}}function ep(){try{var n=Le.use("java.net.URL");n.openConnection.overload().implementation=function(){var t=this.openConnection();try{U("license_url",{url:this.toString()})}catch{}return t}}catch(t){U("log",{message:"URL.openConnection hook failed: "+t})}try{var e=Le.use("java.net.HttpURLConnection");e.setRequestProperty.implementation=function(t,r){var o={};return o[t]=r,U("license_headers",{headers:o}),this.setRequestProperty(t,r)}}catch(t){U("log",{message:"HttpURLConnection.setRequestProperty hook failed: "+t})}}function tp(){["androidx.media3.exoplayer.drm.HttpMediaDrmCallback","com.google.android.exoplayer2.drm.HttpMediaDrmCallback"].forEach(function(n){try{var e=Le.use(n);e.executePost.overloads.forEach(function(t){t.implementation=function(){try{var r=arguments[1];r&&U("license_url",{url:""+r});var o=arguments[3];if(o&&o.keySet){for(var i=o.keySet().iterator(),s={};i.hasNext();){var c=i.next();s[""+c]=""+o.get(c)}U("license_headers",{headers:s})}}catch(a){U("log",{message:n+".executePost read failed: "+a})}return t.apply(this,arguments)}})}catch{}})}function np(){if(!Le.available){U("log",{message:"no JVM in this process -- Java capture hooks not installed"});return}Le.perform(function(){Hu(),Zu(),Xu(),ep(),tp()})}rpc.exports={hookNative:Uu,hookJava:np,hookProvisioningKey:zu};

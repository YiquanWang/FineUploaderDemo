﻿ /*!
* Fine Uploader
*
* Copyright 2013, Widen Enterprises, Inc. info@fineuploader.com
*
* Version: 5.0.0-15
*
* Homepage: http://fineuploader.com
*
* Repository: git://github.com/Widen/fine-uploader.git
*
* Licensed under GNU GPL v3, see LICENSE
*/


var qq = function(a) {
    "use strict";
    return {hide: function() {
            return a.style.display = "none", this
        },attach: function(b, c) {
            return a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c), function() {
                qq(a).detach(b, c)
            }
        },detach: function(b, c) {
            return a.removeEventListener ? a.removeEventListener(b, c, !1) : a.attachEvent && a.detachEvent("on" + b, c), this
        },contains: function(b) {
            return b ? a === b ? !0 : a.contains ? a.contains(b) : !!(8 & b.compareDocumentPosition(a)) : !1
        },insertBefore: function(b) {
            return b.parentNode.insertBefore(a, b), this
        },remove: function() {
            return a.parentNode.removeChild(a), this
        },css: function(b) {
            if (null == a.style)
                throw new qq.Error("Can't apply style to node as it is not on the HTMLElement prototype chain!");
            return null != b.opacity && "string" != typeof a.style.opacity && "undefined" != typeof a.filters && (b.filter = "alpha(opacity=" + Math.round(100 * b.opacity) + ")"), qq.extend(a.style, b), this
        },hasClass: function(b) {
            var c = new RegExp("(^| )" + b + "( |$)");
            return c.test(a.className)
        },addClass: function(b) {
            return qq(a).hasClass(b) || (a.className += " " + b), this
        },removeClass: function(b) {
            var c = new RegExp("(^| )" + b + "( |$)");
            return a.className = a.className.replace(c, " ").replace(/^\s+|\s+$/g, ""), this
        },getByClass: function(b) {
            var c, d = [];
            return a.querySelectorAll ? a.querySelectorAll("." + b) : (c = a.getElementsByTagName("*"), qq.each(c, function(a, c) {
                qq(c).hasClass(b) && d.push(c)
            }), d)
        },children: function() {
            for (var b = [], c = a.firstChild; c; )
                1 === c.nodeType && b.push(c), c = c.nextSibling;
            return b
        },setText: function(b) {
            return a.innerText = b, a.textContent = b, this
        },clearText: function() {
            return qq(a).setText("")
        },hasAttribute: function(b) {
            var c;
            return a.hasAttribute ? a.hasAttribute(b) ? null == /^false$/i.exec(a.getAttribute(b)) : !1 : (c = a[b], void 0 === c ? !1 : null == /^false$/i.exec(c))
        }}
};
!function() {
    "use strict";
    qq.log = function(a, b) {
        window.console && (b && "info" !== b ? window.console[b] ? window.console[b](a) : window.console.log("<" + b + "> " + a) : window.console.log(a))
    }, qq.isObject = function(a) {
        return a && !a.nodeType && "[object Object]" === Object.prototype.toString.call(a)
    }, qq.isFunction = function(a) {
        return "function" == typeof a
    }, qq.isArray = function(a) {
        return "[object Array]" === Object.prototype.toString.call(a) || a && window.ArrayBuffer && a.buffer && a.buffer.constructor === ArrayBuffer
    }, qq.isItemList = function(a) {
        return "[object DataTransferItemList]" === Object.prototype.toString.call(a)
    }, qq.isNodeList = function(a) {
        return "[object NodeList]" === Object.prototype.toString.call(a) || a.item && a.namedItem
    }, qq.isString = function(a) {
        return "[object String]" === Object.prototype.toString.call(a)
    }, qq.trimStr = function(a) {
        return String.prototype.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "")
    }, qq.format = function(a) {
        var b = Array.prototype.slice.call(arguments, 1), c = a, d = c.indexOf("{}");
        return qq.each(b, function(a, b) {
            var e = c.substring(0, d), f = c.substring(d + 2);
            return c = e + b + f, d = c.indexOf("{}", d + b.length), 0 > d ? !1 : void 0
        }), c
    }, qq.isFile = function(a) {
        return window.File && "[object File]" === Object.prototype.toString.call(a)
    }, qq.isFileList = function(a) {
        return window.FileList && "[object FileList]" === Object.prototype.toString.call(a)
    }, qq.isFileOrInput = function(a) {
        return qq.isFile(a) || qq.isInput(a)
    }, qq.isInput = function(a, b) {
        var c = function(a) {
            var c = a.toLowerCase();
            return b ? "file" !== c : "file" === c
        };
        return window.HTMLInputElement && "[object HTMLInputElement]" === Object.prototype.toString.call(a) && a.type && c(a.type) ? !0 : a.tagName && "input" === a.tagName.toLowerCase() && a.type && c(a.type) ? !0 : !1
    }, qq.isBlob = function(a) {
        return window.Blob && "[object Blob]" === Object.prototype.toString.call(a) ? !0 : void 0
    }, qq.isXhrUploadSupported = function() {
        var a = document.createElement("input");
        return a.type = "file", void 0 !== a.multiple && "undefined" != typeof File && "undefined" != typeof FormData && "undefined" != typeof qq.createXhrInstance().upload
    }, qq.createXhrInstance = function() {
        if (window.XMLHttpRequest)
            return new XMLHttpRequest;
        try {
            return new ActiveXObject("MSXML2.XMLHTTP.3.0")
        } catch (a) {
            return qq.log("Neither XHR or ActiveX are supported!", "error"), null
        }
    }, qq.isFolderDropSupported = function(a) {
        return a.items && a.items.length > 0 && a.items[0].webkitGetAsEntry
    }, qq.isFileChunkingSupported = function() {
        return !qq.androidStock() && qq.isXhrUploadSupported() && (void 0 !== File.prototype.slice || void 0 !== File.prototype.webkitSlice || void 0 !== File.prototype.mozSlice)
    }, qq.sliceBlob = function(a, b, c) {
        var d = a.slice || a.mozSlice || a.webkitSlice;
        return d.call(a, b, c)
    }, qq.arrayBufferToHex = function(a) {
        var b = "", c = new Uint8Array(a);
        return qq.each(c, function(a, c) {
            var d = c.toString(16);
            d.length < 2 && (d = "0" + d), b += d
        }), b
    }, qq.readBlobToHex = function(a, b, c) {
        var d = qq.sliceBlob(a, b, b + c), e = new FileReader, f = new qq.Promise;
        return e.onload = function() {
            f.success(qq.arrayBufferToHex(e.result))
        }, e.onerror = f.failure, e.readAsArrayBuffer(d), f
    }, qq.extend = function(a, b, c) {
        return qq.each(b, function(b, d) {
            c && qq.isObject(d) ? (void 0 === a[b] && (a[b] = {}), qq.extend(a[b], d, !0)) : a[b] = d
        }), a
    }, qq.override = function(a, b) {
        var c = {}, d = b(c);
        return qq.each(d, function(b, d) {
            void 0 !== a[b] && (c[b] = a[b]), a[b] = d
        }), a
    }, qq.indexOf = function(a, b, c) {
        if (a.indexOf)
            return a.indexOf(b, c);
        c = c || 0;
        var d = a.length;
        for (0 > c && (c += d); d > c; c += 1)
            if (a.hasOwnProperty(c) && a[c] === b)
                return c;
        return -1
    }, qq.getUniqueId = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
            var b = 0 | 16 * Math.random(), c = "x" == a ? b : 8 | 3 & b;
            return c.toString(16)
        })
    }, qq.ie = function() {
        return -1 !== navigator.userAgent.indexOf("MSIE")
    }, qq.ie7 = function() {
        return -1 !== navigator.userAgent.indexOf("MSIE 7")
    }, qq.ie10 = function() {
        return -1 !== navigator.userAgent.indexOf("MSIE 10")
    }, qq.ie11 = function() {
        return -1 !== navigator.userAgent.indexOf("Trident") && -1 !== navigator.userAgent.indexOf("rv:11")
    }, qq.safari = function() {
        return void 0 !== navigator.vendor && -1 !== navigator.vendor.indexOf("Apple")
    }, qq.chrome = function() {
        return void 0 !== navigator.vendor && -1 !== navigator.vendor.indexOf("Google")
    }, qq.opera = function() {
        return void 0 !== navigator.vendor && -1 !== navigator.vendor.indexOf("Opera")
    }, qq.firefox = function() {
        return !qq.ie11() && -1 !== navigator.userAgent.indexOf("Mozilla") && void 0 !== navigator.vendor && "" === navigator.vendor
    }, qq.windows = function() {
        return "Win32" === navigator.platform
    }, qq.android = function() {
        return -1 !== navigator.userAgent.toLowerCase().indexOf("android")
    }, qq.androidStock = function() {
        return qq.android() && navigator.userAgent.toLowerCase().indexOf("chrome") < 0
    }, qq.ios7 = function() {
        return qq.ios() && -1 !== navigator.userAgent.indexOf(" OS 7_")
    }, qq.ios = function() {
        return -1 !== navigator.userAgent.indexOf("iPad") || -1 !== navigator.userAgent.indexOf("iPod") || -1 !== navigator.userAgent.indexOf("iPhone")
    }, qq.preventDefault = function(a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }, qq.toElement = function() {
        var a = document.createElement("div");
        return function(b) {
            a.innerHTML = b;
            var c = a.firstChild;
            return a.removeChild(c), c
        }
    }(), qq.each = function(a, b) {
        var c, d;
        if (a)
            if (window.Storage && a.constructor === window.Storage)
                for (c = 0; c < a.length && (d = b(a.key(c), a.getItem(a.key(c))), d !== !1); c++)
                    ;
            else if (qq.isArray(a) || qq.isItemList(a) || qq.isNodeList(a))
                for (c = 0; c < a.length && (d = b(c, a[c]), d !== !1); c++)
                    ;
            else if (qq.isString(a))
                for (c = 0; c < a.length && (d = b(c, a.charAt(c)), d !== !1); c++)
                    ;
            else
                for (c in a)
                    if (Object.prototype.hasOwnProperty.call(a, c) && (d = b(c, a[c]), d === !1))
                        break
    }, qq.bind = function(a, b) {
        if (qq.isFunction(a)) {
            var c = Array.prototype.slice.call(arguments, 2);
            return function() {
                var d = qq.extend([], c);
                return arguments.length && (d = d.concat(Array.prototype.slice.call(arguments))), a.apply(b, d)
            }
        }
        throw new Error("first parameter must be a function!")
    }, qq.obj2url = function(a, b, c) {
        var d = [], e = "&", f = function(a, c) {
            var e = b ? /\[\]$/.test(b) ? b : b + "[" + c + "]" : c;
            "undefined" !== e && "undefined" !== c && d.push("object" == typeof a ? qq.obj2url(a, e, !0) : "[object Function]" === Object.prototype.toString.call(a) ? encodeURIComponent(e) + "=" + encodeURIComponent(a()) : encodeURIComponent(e) + "=" + encodeURIComponent(a))
        };
        return !c && b ? (e = /\?/.test(b) ? /\?$/.test(b) ? "" : "&" : "?", d.push(b), d.push(qq.obj2url(a))) : "[object Array]" === Object.prototype.toString.call(a) && "undefined" != typeof a ? qq.each(a, function(a, b) {
            f(b, a)
        }) : "undefined" != typeof a && null !== a && "object" == typeof a ? qq.each(a, function(a, b) {
            f(b, a)
        }) : d.push(encodeURIComponent(b) + "=" + encodeURIComponent(a)), b ? d.join(e) : d.join(e).replace(/^&/, "").replace(/%20/g, "+")
    }, qq.obj2FormData = function(a, b, c) {
        return b || (b = new FormData), qq.each(a, function(a, d) {
            a = c ? c + "[" + a + "]" : a, qq.isObject(d) ? qq.obj2FormData(d, b, a) : qq.isFunction(d) ? b.append(a, d()) : b.append(a, d)
        }), b
    }, qq.obj2Inputs = function(a, b) {
        var c;
        return b || (b = document.createElement("form")), qq.obj2FormData(a, {append: function(a, d) {
                c = document.createElement("input"), c.setAttribute("name", a), c.setAttribute("value", d), b.appendChild(c)
            }}), b
    }, qq.parseJson = function(json) {
        return window.JSON && qq.isFunction(JSON.parse) ? JSON.parse(json) : eval("(" + json + ")")
    }, qq.getExtension = function(a) {
        var b = a.lastIndexOf(".") + 1;
        return b > 0 ? a.substr(b, a.length - b) : void 0
    }, qq.getFilename = function(a) {
        return qq.isInput(a) ? a.value.replace(/.*(\/|\\)/, "") : qq.isFile(a) && null !== a.fileName && void 0 !== a.fileName ? a.fileName : a.name
    }, qq.DisposeSupport = function() {
        var a = [];
        return {dispose: function() {
                var b;
                do
                    b = a.shift(), b && b();
                while (b)
            },attach: function() {
                var a = arguments;
                this.addDisposer(qq(a[0]).attach.apply(this, Array.prototype.slice.call(arguments, 1)))
            },addDisposer: function(b) {
                a.push(b)
            }}
    }
}(), function() {
    "use strict";
    qq.Error = function(a) {
        this.message = "[Fine Uploader " + qq.version + "] " + a
    }, qq.Error.prototype = new Error
}(), qq.version = "5.0.0-15", qq.supportedFeatures = function() {
    "use strict";
    function a() {
        var a, b = !0;
        try {
            a = document.createElement("input"), a.type = "file", qq(a).hide(), a.disabled && (b = !1)
        } catch (c) {
            b = !1
        }
        return b
    }
    function b() {
        return (qq.chrome() || qq.opera()) && void 0 !== navigator.userAgent.match(/Chrome\/[2][1-9]|Chrome\/[3-9][0-9]/)
    }
    function c() {
        return (qq.chrome() || qq.opera()) && void 0 !== navigator.userAgent.match(/Chrome\/[1][4-9]|Chrome\/[2-9][0-9]/)
    }
    function d() {
        if (window.XMLHttpRequest) {
            var a = qq.createXhrInstance();
            return void 0 !== a.withCredentials
        }
        return !1
    }
    function e() {
        return void 0 !== window.XDomainRequest
    }
    function f() {
        return d() ? !0 : e()
    }
    function g() {
        return void 0 !== document.createElement("input").webkitdirectory
    }
    var h, i, j, k, l, m, n, o, p, q, r, s, t, u;
    return h = a(), j = h && qq.isXhrUploadSupported(), i = j && !qq.androidStock(), k = j && b(), l = j && qq.isFileChunkingSupported(), m = j && l && !!window.localStorage, n = j && c(), o = h && (void 0 !== window.postMessage || j), q = d(), p = e(), r = f(), s = g(), t = j && void 0 !== window.FileReader, u = function() {
        return j ? !(qq.androidStock() || qq.ios() && navigator.userAgent.indexOf("CriOS") >= 0) : !1
    }(), {ajaxUploading: j,blobUploading: i,canDetermineSize: j,chunking: l,deleteFileCors: r,deleteFileCorsXdr: p,deleteFileCorsXhr: q,fileDrop: j,folderDrop: k,folderSelection: s,imagePreviews: t,imageValidation: t,itemSizeValidation: j,pause: l,progressBar: u,resume: m,scaling: t && i,tiffPreviews: qq.safari(),uploading: h,uploadCors: o,uploadCustomHeaders: j,uploadNonMultipart: j,uploadViaPaste: n}
}(), qq.isGenericPromise = function(a) {
    "use strict";
    return !!(a && a.then && qq.isFunction(a.then))
}, qq.Promise = function() {
    "use strict";
    var a, b, c = [], d = [], e = [], f = 0;
    qq.extend(this, {then: function(e, g) {
            return 0 === f ? (e && c.push(e), g && d.push(g)) : -1 === f ? g && g.apply(null, b) : e && e.apply(null, a), this
        },done: function(c) {
            return 0 === f ? e.push(c) : c.apply(null, void 0 === b ? a : b), this
        },success: function() {
            return f = 1, a = arguments, c.length && qq.each(c, function(b, c) {
                c.apply(null, a)
            }), e.length && qq.each(e, function(b, c) {
                c.apply(null, a)
            }), this
        },failure: function() {
            return f = -1, b = arguments, d.length && qq.each(d, function(a, c) {
                c.apply(null, b)
            }), e.length && qq.each(e, function(a, c) {
                c.apply(null, b)
            }), this
        }})
}, qq.BlobProxy = function(a, b) {
    "use strict";
    qq.extend(this, {referenceBlob: a,create: function() {
            return b(a)
        }})
}, qq.UploadButton = function(a) {
    "use strict";
    function b() {
        var a = document.createElement("input");
        return a.setAttribute(qq.UploadButton.BUTTON_ID_ATTR_NAME, d), f.multiple && a.setAttribute("multiple", ""), f.folders && qq.supportedFeatures.folderSelection && a.setAttribute("webkitdirectory", ""), f.acceptFiles && a.setAttribute("accept", f.acceptFiles), a.setAttribute("type", "file"), a.setAttribute("name", f.name), qq(a).css({position: "absolute",right: 0,top: 0,fontFamily: "Arial",fontSize: "118px",margin: 0,padding: 0,cursor: "pointer",opacity: 0}), f.element.appendChild(a), e.attach(a, "change", function() {
            f.onChange(a)
        }), e.attach(a, "mouseover", function() {
            qq(f.element).addClass(f.hoverClass)
        }), e.attach(a, "mouseout", function() {
            qq(f.element).removeClass(f.hoverClass)
        }), e.attach(a, "focus", function() {
            qq(f.element).addClass(f.focusClass)
        }), e.attach(a, "blur", function() {
            qq(f.element).removeClass(f.focusClass)
        }), window.attachEvent && a.setAttribute("tabIndex", "-1"), a
    }
    var c, d, e = new qq.DisposeSupport, f = {element: null,multiple: !1,acceptFiles: null,folders: !1,name: "qqfile",onChange: function() {
        },hoverClass: "qq-upload-button-hover",focusClass: "qq-upload-button-focus"};
    qq.extend(f, a), d = qq.getUniqueId(), qq(f.element).css({position: "relative",overflow: "hidden",direction: "ltr"}), c = b(), qq.extend(this, {getInput: function() {
            return c
        },getButtonId: function() {
            return d
        },setMultiple: function(a) {
            a !== f.multiple && (a ? c.setAttribute("multiple", "") : c.removeAttribute("multiple"))
        },setAcceptFiles: function(a) {
            a !== f.acceptFiles && c.setAttribute("accept", a)
        },reset: function() {
            c.parentNode && qq(c).remove(), qq(f.element).removeClass(f.focusClass), c = b()
        }})
}, qq.UploadButton.BUTTON_ID_ATTR_NAME = "qq-button-id", qq.UploadData = function(a) {
    "use strict";
    function b(a) {
        if (qq.isArray(a)) {
            var b = [];
            return qq.each(a, function(a, c) {
                b.push(e[c])
            }), b
        }
        return e[a]
    }
    function c(a) {
        if (qq.isArray(a)) {
            var b = [];
            return qq.each(a, function(a, c) {
                b.push(e[f[c]])
            }), b
        }
        return e[f[a]]
    }
    function d(a) {
        var b = [], c = [].concat(a);
        return qq.each(c, function(a, c) {
            var d = g[c];
            void 0 !== d && qq.each(d, function(a, c) {
                b.push(e[c])
            })
        }), b
    }
    var e = [], f = {}, g = {}, h = {}, i = {};
    qq.extend(this, {addFile: function(b) {
            var c = b.status || qq.status.SUBMITTING, d = e.push({name: b.name,originalName: b.name,uuid: b.uuid,size: b.size || -1,status: c}) - 1;
            return b.batchId && (e[d].batchId = b.batchId, void 0 === i[b.batchId] && (i[b.batchId] = []), i[b.batchId].push(d)), b.proxyGroupId && (e[d].proxyGroupId = b.proxyGroupId, void 0 === h[b.proxyGroupId] && (h[b.proxyGroupId] = []), h[b.proxyGroupId].push(d)), e[d].id = d, f[b.uuid] = d, void 0 === g[c] && (g[c] = []), g[c].push(d), a.onStatusChange(d, null, c), d
        },retrieve: function(a) {
            return qq.isObject(a) && e.length ? void 0 !== a.id ? b(a.id) : void 0 !== a.uuid ? c(a.uuid) : a.status ? d(a.status) : void 0 : qq.extend([], e, !0)
        },reset: function() {
            e = [], f = {}, g = {}, i = {}
        },setStatus: function(b, c) {
            var d = e[b].status, f = qq.indexOf(g[d], b);
            g[d].splice(f, 1), e[b].status = c, void 0 === g[c] && (g[c] = []), g[c].push(b), a.onStatusChange(b, d, c)
        },uuidChanged: function(a, b) {
            var c = e[a].uuid;
            e[a].uuid = b, f[b] = a, delete f[c]
        },updateName: function(a, b) {
            e[a].name = b
        },updateSize: function(a, b) {
            e[a].size = b
        },setParentId: function(a, b) {
            e[a].parentId = b
        },getIdsInProxyGroup: function(a) {
            var b = e[a].proxyGroupId;
            return b ? h[b] : []
        },getIdsInBatch: function(a) {
            var b = e[a].batchId;
            return i[b]
        }})
}, qq.status = {SUBMITTING: "submitting",SUBMITTED: "submitted",REJECTED: "rejected",QUEUED: "queued",CANCELED: "canceled",PAUSED: "paused",UPLOADING: "uploading",UPLOAD_RETRYING: "retrying upload",UPLOAD_SUCCESSFUL: "upload successful",UPLOAD_FAILED: "upload failed",DELETE_FAILED: "delete failed",DELETING: "deleting",DELETED: "deleted"}, function() {
    "use strict";
    qq.basePublicApi = {addBlobs: function(a, b, c) {
            if (!qq.supportedFeatures.blobUploading)
                throw new qq.Error("Blob uploading is not supported in this browser!");
            if (a) {
                var d = [].concat(a), e = [], f = 0 === this._storedIds.length ? qq.getUniqueId() : this._currentBatchId, g = this;
                this._currentBatchId = f, qq.each(d, function(a, b) {
                    var c;
                    qq.isBlob(b) && !qq.isFileOrInput(b) ? c = {blob: b,name: g._options.blobs.defaultName} : qq.isObject(b) && b.blob && b.name ? c = b : g.log("addBlobs: entry at index " + a + " is not a Blob or a BlobData object", "error"), c && g._handleNewFile(c, f, e)
                }), this._prepareItemsForUpload(e, b, c)
            } else
                this.log("undefined or non-array parameter passed into addBlobs", "error")
        },addFiles: function(a, b, c) {
            var d, e, f, g = [], h = 0 === this._storedIds.length ? qq.getUniqueId() : this._currentBatchId;
            if (this._currentBatchId = h, a) {
                for (qq.isFileList(a) || (a = [].concat(a)), d = 0; d < a.length; d += 1)
                    if (e = a[d], qq.isFileOrInput(e))
                        if (qq.isInput(e) && qq.supportedFeatures.ajaxUploading)
                            for (f = 0; f < e.files.length; f++)
                                this._handleNewFile(e.files[f], h, g);
                        else
                            this._handleNewFile(e, h, g);
                    else
                        this.log(e + " is not a File or INPUT element!  Ignoring!", "warn");
                this.log("Received " + g.length + " files or inputs."), this._prepareItemsForUpload(g, b, c)
            }
        },cancel: function(a) {
            this._handler.cancel(a)
        },cancelAll: function() {
            var a = [], b = this;
            qq.extend(a, this._storedIds), qq.each(a, function(a, c) {
                b.cancel(c)
            }), this._handler.cancelAll()
        },clearStoredFiles: function() {
            this._storedIds = []
        },continueUpload: function(a) {
            var b = this._uploadData.retrieve({id: a});
            return qq.supportedFeatures.pause && this._options.chunking.enabled ? b.status === qq.status.PAUSED ? (this.log(qq.format("Paused file ID {} ({}) will be continued.  Not paused.", a, this.getName(a))), this._uploadFile(a), !0) : (this.log(qq.format("Ignoring continue for file ID {} ({}).  Not paused.", a, this.getName(a)), "error"), !1) : !1
        },deleteFile: function(a) {
            return this._onSubmitDelete(a)
        },doesExist: function(a) {
            return this._handler.isValid(a)
        },drawThumbnail: function(a, b, c, d) {
            var e = new qq.Promise;
            if (this._imageGenerator) {
                var f = this._thumbnailUrls[a], g = {scale: c > 0,maxSize: c > 0 ? c : null};
                !d && qq.supportedFeatures.imagePreviews && (f = this.getFile(a)), null == f ? e.failure({container: b,error: "File or URL not found."}) : this._imageGenerator.generate(f, b, g).then(function(a) {
                    e.success(a)
                }, function(a, b) {
                    e.failure({container: a,error: b || "Problem generating thumbnail"})
                })
            } else
                e.failure({container: b,error: "Missing image generator module"});
            return e
        },getButton: function(a) {
            return this._getButton(this._buttonIdsForFileIds[a])
        },getFile: function(a) {
            return this._handler.getFile(a) || null
        },getInProgress: function() {
            return this._uploadData.retrieve({status: [qq.status.UPLOADING, qq.status.UPLOAD_RETRYING, qq.status.QUEUED]}).length
        },getName: function(a) {
            return this._uploadData.retrieve({id: a}).name
        },getParentId: function(a) {
            var b = this.getUploads({id: a}), c = null;
            return b && void 0 !== b.parentId && (c = b.parentId), c
        },getResumableFilesData: function() {
            return this._handler.getResumableFilesData()
        },getSize: function(a) {
            return this._uploadData.retrieve({id: a}).size
        },getNetUploads: function() {
            return this._netUploaded
        },getRemainingAllowedItems: function() {
            var a = this._options.validation.itemLimit;
            return a > 0 ? this._options.validation.itemLimit - this._netUploadedOrQueued : null
        },getUploads: function(a) {
            return this._uploadData.retrieve(a)
        },getUuid: function(a) {
            return this._uploadData.retrieve({id: a}).uuid
        },log: function(a, b) {
            !this._options.debug || b && "info" !== b ? b && "info" !== b && qq.log("[Fine Uploader " + qq.version + "] " + a, b) : qq.log("[Fine Uploader " + qq.version + "] " + a)
        },pauseUpload: function(a) {
            var b = this._uploadData.retrieve({id: a});
            if (!qq.supportedFeatures.pause || !this._options.chunking.enabled)
                return !1;
            if (qq.indexOf([qq.status.UPLOADING, qq.status.UPLOAD_RETRYING], b.status) >= 0) {
                if (this._handler.pause(a))
                    return this._uploadData.setStatus(a, qq.status.PAUSED), !0;
                this.log(qq.format("Unable to pause file ID {} ({}).", a, this.getName(a)), "error")
            } else
                this.log(qq.format("Ignoring pause for file ID {} ({}).  Not in progress.", a, this.getName(a)), "error");
            return !1
        },reset: function() {
            this.log("Resetting uploader..."), this._handler.reset(), this._storedIds = [], this._autoRetries = [], this._retryTimeouts = [], this._preventRetries = [], this._thumbnailUrls = [], qq.each(this._buttons, function(a, b) {
                b.reset()
            }), this._paramsStore.reset(), this._endpointStore.reset(), this._netUploadedOrQueued = 0, this._netUploaded = 0, this._uploadData.reset(), this._buttonIdsForFileIds = [], this._pasteHandler && this._pasteHandler.reset(), this._options.session.refreshOnReset && this._refreshSessionData(), this._succeededSinceLastAllComplete = [], this._failedSinceLastAllComplete = [], this._totalProgress && this._totalProgress.reset()
        },retry: function(a) {
            return this._manualRetry(a)
        },scaleImage: function(a, b) {
            var c = this;
            return qq.Scaler.prototype.scaleImage(a, b, {log: qq.bind(c.log, c),getFile: qq.bind(c.getFile, c),uploadData: c._uploadData})
        },setCustomHeaders: function(a, b) {
            this._customHeadersStore.set(a, b)
        },setDeleteFileCustomHeaders: function(a, b) {
            this._deleteFileCustomHeadersStore.set(a, b)
        },setDeleteFileEndpoint: function(a, b) {
            this._deleteFileEndpointStore.set(a, b)
        },setDeleteFileParams: function(a, b) {
            this._deleteFileParamsStore.set(a, b)
        },setEndpoint: function(a, b) {
            this._endpointStore.set(a, b)
        },setName: function(a, b) {
            this._uploadData.updateName(a, b)
        },setParams: function(a, b) {
            this._paramsStore.set(a, b)
        },setUuid: function(a, b) {
            return this._uploadData.uuidChanged(a, b)
        },uploadStoredFiles: function() {
            var a;
            if (0 === this._storedIds.length)
                this._itemError("noFilesError");
            else
                for (; this._storedIds.length; )
                    a = this._storedIds.shift(), this._uploadFile(a)
        }}, qq.basePrivateApi = {_addCannedFile: function(a) {
            var b = this._uploadData.addFile({uuid: a.uuid,name: a.name,size: a.size,status: qq.status.UPLOAD_SUCCESSFUL});
            return a.deleteFileEndpoint && this.setDeleteFileEndpoint(a.deleteFileEndpoint, b), a.deleteFileParams && this.setDeleteFileParams(a.deleteFileParams, b), a.thumbnailUrl && (this._thumbnailUrls[b] = a.thumbnailUrl), this._netUploaded++, this._netUploadedOrQueued++, b
        },_annotateWithButtonId: function(a, b) {
            qq.isFile(a) && (a.qqButtonId = this._getButtonId(b))
        },_batchError: function(a) {
            this._options.callbacks.onError(null, null, a, void 0)
        },_createDeleteHandler: function() {
            var a = this;
            return new qq.DeleteFileAjaxRequester({method: this._options.deleteFile.method.toUpperCase(),maxConnections: this._options.maxConnections,uuidParamName: this._options.request.uuidName,customHeaders: this._deleteFileCustomHeadersStore,paramsStore: this._deleteFileParamsStore,endpointStore: this._deleteFileEndpointStore,demoMode: this._options.demoMode,cors: this._options.cors,log: qq.bind(a.log, a),onDelete: function(b) {
                    a._onDelete(b), a._options.callbacks.onDelete(b)
                },onDeleteComplete: function(b, c, d) {
                    a._onDeleteComplete(b, c, d), a._options.callbacks.onDeleteComplete(b, c, d)
                }})
        },_createPasteHandler: function() {
            var a = this;
            return new qq.PasteSupport({targetElement: this._options.paste.targetElement,callbacks: {log: qq.bind(a.log, a),pasteReceived: function(b) {
                        a._handleCheckedCallback({name: "onPasteReceived",callback: qq.bind(a._options.callbacks.onPasteReceived, a, b),onSuccess: qq.bind(a._handlePasteSuccess, a, b),identifier: "pasted image"})
                    }}})
        },_createStore: function(a, b) {
            var c = {}, d = a, e = {}, f = function(a) {
                return qq.isObject(a) ? qq.extend({}, a) : a
            }, g = function() {
                return qq.isFunction(b) ? b() : b
            }, h = function(a, c) {
                b && qq.isObject(c) && qq.extend(c, g()), e[a] && qq.extend(c, e[a])
            };
            return {set: function(a, b) {
                    null == b ? (c = {}, d = f(a)) : c[b] = f(a)
                },get: function(a) {
                    var b;
                    return b = null != a && c[a] ? c[a] : f(d), h(a, b), f(b)
                },addReadOnly: function(a, b) {
                    qq.isObject(c) && (e[a] = e[a] || {}, qq.extend(e[a], b))
                },remove: function(a) {
                    return delete c[a]
                },reset: function() {
                    c = {}, e = {}, d = a
                }}
        },_createUploadDataTracker: function() {
            var a = this;
            return new qq.UploadData({getName: function(b) {
                    return a.getName(b)
                },getUuid: function(b) {
                    return a.getUuid(b)
                },getSize: function(b) {
                    return a.getSize(b)
                },onStatusChange: function(b, c, d) {
                    a._onUploadStatusChange(b, c, d), a._options.callbacks.onStatusChange(b, c, d), a._maybeAllComplete(b, d), a._totalProgress && setTimeout(function() {
                        a._totalProgress.onStatusChange(b, c, d)
                    }, 0)
                }})
        },_createUploadButton: function(a) {
            function b() {
                return qq.supportedFeatures.ajaxUploading ? qq.ios7() && c._isAllowedExtension(e, ".mov") ? !1 : void 0 === a.multiple ? c._options.multiple : a.multiple : !1
            }
            var c = this, d = a.accept || this._options.validation.acceptFiles, e = a.allowedExtensions || this._options.validation.allowedExtensions, f = new qq.UploadButton({element: a.element,folders: a.folders,name: this._options.request.inputName,multiple: b(),acceptFiles: d,onChange: function(a) {
                    c._onInputChange(a)
                },hoverClass: this._options.classes.buttonHover,focusClass: this._options.classes.buttonFocus});
            return this._disposeSupport.addDisposer(function() {
                f.dispose()
            }), c._buttons.push(f), f
        },_createUploadHandler: function(a, b) {
            var c = this, d = {}, e = {debug: this._options.debug,maxConnections: this._options.maxConnections,cors: this._options.cors,demoMode: this._options.demoMode,paramsStore: this._paramsStore,endpointStore: this._endpointStore,chunking: this._options.chunking,resume: this._options.resume,blobs: this._options.blobs,log: qq.bind(c.log, c),preventRetryParam: this._options.retry.preventRetryResponseProperty,onProgress: function(a, b, e, f) {
                    d[a] ? (d[a].loaded !== e || d[a].total !== f) && (c._onProgress(a, b, e, f), c._options.callbacks.onProgress(a, b, e, f)) : (c._onProgress(a, b, e, f), c._options.callbacks.onProgress(a, b, e, f)), d[a] = {loaded: e,total: f}
                },onComplete: function(a, b, e, f) {
                    delete d[a];
                    var g = c.getUploads({id: a}).status;
                    if (g !== qq.status.UPLOAD_SUCCESSFUL && g !== qq.status.UPLOAD_FAILED) {
                        var h = c._onComplete(a, b, e, f);
                        h instanceof qq.Promise ? h.done(function() {
                            c._options.callbacks.onComplete(a, b, e, f)
                        }) : c._options.callbacks.onComplete(a, b, e, f)
                    }
                },onCancel: function(a, b, d) {
                    var e = new qq.Promise;
                    return c._handleCheckedCallback({name: "onCancel",callback: qq.bind(c._options.callbacks.onCancel, c, a, b),onFailure: e.failure,onSuccess: function() {
                            d.then(function() {
                                c._onCancel(a, b)
                            }), e.success()
                        },identifier: a}), e
                },onUploadPrep: qq.bind(this._onUploadPrep, this),onUpload: function(a, b) {
                    c._onUpload(a, b), c._options.callbacks.onUpload(a, b)
                },onUploadChunk: function(a, b, d) {
                    c._onUploadChunk(a, d), c._options.callbacks.onUploadChunk(a, b, d)
                },onUploadChunkSuccess: function() {
                    c._options.callbacks.onUploadChunkSuccess.apply(c, arguments)
                },onResume: function(a, b, d) {
                    return c._options.callbacks.onResume(a, b, d)
                },onAutoRetry: function() {
                    return c._onAutoRetry.apply(c, arguments)
                },onUuidChanged: function(a, b) {
                    c.log("Server requested UUID change from '" + c.getUuid(a) + "' to '" + b + "'"), c.setUuid(a, b)
                },getName: qq.bind(c.getName, c),getUuid: qq.bind(c.getUuid, c),getSize: qq.bind(c.getSize, c),setSize: qq.bind(c._setSize, c),getDataByUuid: function(a) {
                    return c.getUploads({uuid: a})
                },isQueued: function(a) {
                    var b = c.getUploads({id: a}).status;
                    return b === qq.status.QUEUED || b === qq.status.SUBMITTED || b === qq.status.UPLOAD_RETRYING || b === qq.status.PAUSED
                },getIdsInProxyGroup: c._uploadData.getIdsInProxyGroup,getIdsInBatch: c._uploadData.getIdsInBatch};
            return qq.each(this._options.request, function(a, b) {
                e[a] = b
            }), e.customHeaders = this._customHeadersStore, a && qq.each(a, function(a, b) {
                e[a] = b
            }), new qq.UploadHandlerController(e, b)
        },_fileOrBlobRejected: function(a) {
            this._netUploadedOrQueued--, this._uploadData.setStatus(a, qq.status.REJECTED)
        },_formatSize: function(a) {
            var b = -1;
            do
                a /= 1e3, b++;
            while (a > 999);
            return Math.max(a, .1).toFixed(1) + this._options.text.sizeSymbols[b]
        },_generateExtraButtonSpecs: function() {
            var a = this;
            this._extraButtonSpecs = {}, qq.each(this._options.extraButtons, function(b, c) {
                var d = c.multiple, e = qq.extend({}, a._options.validation, !0), f = qq.extend({}, c);
                void 0 === d && (d = a._options.multiple), f.validation && qq.extend(e, c.validation, !0), qq.extend(f, {multiple: d,validation: e}, !0), a._initExtraButton(f)
            })
        },_getButton: function(a) {
            var b = this._extraButtonSpecs[a];
            return b ? b.element : a === this._defaultButtonId ? this._options.button : void 0
        },_getButtonId: function(a) {
            var b, c, d = a;
            if (d instanceof qq.BlobProxy && (d = d.referenceBlob), d && !qq.isBlob(d)) {
                if (qq.isFile(d))
                    return d.qqButtonId;
                if ("input" === d.tagName.toLowerCase() && "file" === d.type.toLowerCase())
                    return d.getAttribute(qq.UploadButton.BUTTON_ID_ATTR_NAME);
                if (b = d.getElementsByTagName("input"), qq.each(b, function(a, b) {
                    return "file" === b.getAttribute("type") ? (c = b, !1) : void 0
                }), c)
                    return c.getAttribute(qq.UploadButton.BUTTON_ID_ATTR_NAME)
            }
        },_getNotFinished: function() {
            return this._uploadData.retrieve({status: [qq.status.UPLOADING, qq.status.UPLOAD_RETRYING, qq.status.QUEUED, qq.status.SUBMITTING, qq.status.SUBMITTED, qq.status.PAUSED]}).length
        },_getValidationBase: function(a) {
            var b = this._extraButtonSpecs[a];
            return b ? b.validation : this._options.validation
        },_getValidationDescriptor: function(a) {
            return a.file instanceof qq.BlobProxy ? {name: qq.getFilename(a.file.referenceBlob),size: a.file.referenceBlob.size} : {name: this.getUploads({id: a.id}).name,size: this.getUploads({id: a.id}).size}
        },_getValidationDescriptors: function(a) {
            var b = this, c = [];
            return qq.each(a, function(a, d) {
                c.push(b._getValidationDescriptor(d))
            }), c
        },_handleCameraAccess: function() {
            if (this._options.camera.ios && qq.ios()) {
                var a = "image/*;capture=camera", b = this._options.camera.button, c = b ? this._getButtonId(b) : this._defaultButtonId, d = this._options;
                c && c !== this._defaultButtonId && (d = this._extraButtonSpecs[c]), d.multiple = !1, null === d.validation.acceptFiles ? d.validation.acceptFiles = a : d.validation.acceptFiles += "," + a, qq.each(this._buttons, function(a, b) {
                    return b.getButtonId() === c ? (b.setMultiple(d.multiple), b.setAcceptFiles(d.acceptFiles), !1) : void 0
                })
            }
        },_handleCheckedCallback: function(a) {
            var b = this, c = a.callback();
            return qq.isGenericPromise(c) ? (this.log(a.name + " - waiting for " + a.name + " promise to be fulfilled for " + a.identifier), c.then(function(c) {
                b.log(a.name + " promise success for " + a.identifier), a.onSuccess(c)
            }, function() {
                a.onFailure ? (b.log(a.name + " promise failure for " + a.identifier), a.onFailure()) : b.log(a.name + " promise failure for " + a.identifier)
            })) : (c !== !1 ? a.onSuccess(c) : a.onFailure ? (this.log(a.name + " - return value was 'false' for " + a.identifier + ".  Invoking failure callback."), a.onFailure()) : this.log(a.name + " - return value was 'false' for " + a.identifier + ".  Will not proceed."), c)
        },_handleNewFile: function(a, b, c) {
            var d = this, e = qq.getUniqueId(), f = -1, g = qq.getFilename(a), h = a.blob || a, i = this._customNewFileHandler ? this._customNewFileHandler : qq.bind(d._handleNewFileGeneric, d);
            !qq.isInput(h) && h.size >= 0 && (f = h.size), i(h, g, e, f, c, b, this._options.request.uuidName, {uploadData: d._uploadData,paramsStore: d._paramsStore,addFileToHandler: function(a, b) {
                    d._handler.add(a, b), d._netUploadedOrQueued++, d._trackButton(a)
                }})
        },_handleNewFileGeneric: function(a, b, c, d, e, f) {
            var g = this._uploadData.addFile({uuid: c,name: b,size: d,batchId: f});
            this._handler.add(g, a), this._trackButton(g), this._netUploadedOrQueued++, e.push({id: g,file: a})
        },_handlePasteSuccess: function(a, b) {
            var c = a.type.split("/")[1], d = b;
            null == d && (d = this._options.paste.defaultName), d += "." + c, this.addBlobs({name: d,blob: a})
        },_initExtraButton: function(a) {
            var b = this._createUploadButton({element: a.element,multiple: a.multiple,accept: a.validation.acceptFiles,folders: a.folders,allowedExtensions: a.validation.allowedExtensions});
            this._extraButtonSpecs[b.getButtonId()] = a
        },_initFormSupportAndParams: function() {
            this._formSupport = qq.FormSupport && new qq.FormSupport(this._options.form, qq.bind(this.uploadStoredFiles, this), qq.bind(this.log, this)), this._formSupport && this._formSupport.attachedToForm ? (this._paramsStore = this._createStore(this._options.request.params, this._formSupport.getFormInputsAsObject), this._options.autoUpload = this._formSupport.newAutoUpload, this._formSupport.newEndpoint && (this._options.request.endpoint = this._formSupport.newEndpoint)) : this._paramsStore = this._createStore(this._options.request.params)
        },_isDeletePossible: function() {
            return qq.DeleteFileAjaxRequester && this._options.deleteFile.enabled ? this._options.cors.expected ? qq.supportedFeatures.deleteFileCorsXhr ? !0 : qq.supportedFeatures.deleteFileCorsXdr && this._options.cors.allowXdr ? !0 : !1 : !0 : !1
        },_isAllowedExtension: function(a, b) {
            var c = !1;
            return a.length ? (qq.each(a, function(a, d) {
                if (qq.isString(d)) {
                    var e = new RegExp("\\." + d + "$", "i");
                    if (null != b.match(e))
                        return c = !0, !1
                }
            }), c) : !0
        },_itemError: function(a, b, c) {
            function d(a, b) {
                g = g.replace(a, b)
            }
            var e, f, g = this._options.messages[a], h = [], i = [].concat(b), j = i[0], k = this._getButtonId(c), l = this._getValidationBase(k);
            return qq.each(l.allowedExtensions, function(a, b) {
                qq.isString(b) && h.push(b)
            }), e = h.join(", ").toLowerCase(), d("{file}", this._options.formatFileName(j)), d("{extensions}", e), d("{sizeLimit}", this._formatSize(l.sizeLimit)), d("{minSizeLimit}", this._formatSize(l.minSizeLimit)), f = g.match(/(\{\w+\})/g), null !== f && qq.each(f, function(a, b) {
                d(b, i[a])
            }), this._options.callbacks.onError(null, j, g, void 0), g
        },_manualRetry: function(a, b) {
            return this._onBeforeManualRetry(a) ? (this._netUploadedOrQueued++, this._uploadData.setStatus(a, qq.status.UPLOAD_RETRYING), b ? b(a) : this._handler.retry(a), !0) : void 0
        },_maybeAllComplete: function(a, b) {
            var c = this, d = this._getNotFinished();
            b === qq.status.UPLOAD_SUCCESSFUL ? this._succeededSinceLastAllComplete.push(a) : b === qq.status.UPLOAD_FAILED && this._failedSinceLastAllComplete.push(a), 0 === d && (this._succeededSinceLastAllComplete.length || this._failedSinceLastAllComplete.length) && setTimeout(function() {
                c._onAllComplete(c._succeededSinceLastAllComplete, c._failedSinceLastAllComplete)
            }, 0)
        },_maybeParseAndSendUploadError: function(a, b, c, d) {
            if (!c.success)
                if (d && 200 !== d.status && !c.error)
                    this._options.callbacks.onError(a, b, "XHR returned response code " + d.status, d);
                else {
                    var e = c.error ? c.error : this._options.text.defaultResponseError;
                    this._options.callbacks.onError(a, b, e, d)
                }
        },_maybeProcessNextItemAfterOnValidateCallback: function(a, b, c, d, e) {
            var f = this;
            if (b.length > c)
                if (a || !this._options.validation.stopOnFirstInvalidFile)
                    setTimeout(function() {
                        var a = f._getValidationDescriptor(b[c]);
                        f._handleCheckedCallback({name: "onValidate",callback: qq.bind(f._options.callbacks.onValidate, f, b[c].file),onSuccess: qq.bind(f._onValidateCallbackSuccess, f, b, c, d, e),onFailure: qq.bind(f._onValidateCallbackFailure, f, b, c, d, e),identifier: "Item '" + a.name + "', size: " + a.size})
                    }, 0);
                else if (!a)
                    for (; c < b.length; c++)
                        f._fileOrBlobRejected(b[c].id)
        },_onAllComplete: function(a, b) {
            this._totalProgress && this._totalProgress.onAllComplete(a, b, this._preventRetries), this._options.callbacks.onAllComplete(qq.extend([], a), qq.extend([], b)), this._succeededSinceLastAllComplete = [], this._failedSinceLastAllComplete = []
        },_onAutoRetry: function(a, b, c, d, e) {
            var f = this;
            return f._preventRetries[a] = c[f._options.retry.preventRetryResponseProperty], f._shouldAutoRetry(a, b, c) ? (f._maybeParseAndSendUploadError.apply(f, arguments), f._options.callbacks.onAutoRetry(a, b, f._autoRetries[a]), f._onBeforeAutoRetry(a, b), f._retryTimeouts[a] = setTimeout(function() {
                f.log("Retrying " + b + "..."), f._uploadData.setStatus(a, qq.status.UPLOAD_RETRYING), e ? e(a) : f._handler.retry(a)
            }, 1e3 * f._options.retry.autoAttemptDelay), !0) : void 0
        },_onBeforeAutoRetry: function(a, b) {
            this.log("Waiting " + this._options.retry.autoAttemptDelay + " seconds before retrying " + b + "...")
        },_onBeforeManualRetry: function(a) {
            var b = this._options.validation.itemLimit;
            if (this._preventRetries[a])
                return this.log("Retries are forbidden for id " + a, "warn"), !1;
            if (this._handler.isValid(a)) {
                var c = this.getName(a);
                return this._options.callbacks.onManualRetry(a, c) === !1 ? !1 : b > 0 && this._netUploadedOrQueued + 1 > b ? (this._itemError("retryFailTooManyItems"), !1) : (this.log("Retrying upload for '" + c + "' (id: " + a + ")..."), !0)
            }
            return this.log("'" + a + "' is not a valid file ID", "error"), !1
        },_onCancel: function(a) {
            this._netUploadedOrQueued--, clearTimeout(this._retryTimeouts[a]);
            var b = qq.indexOf(this._storedIds, a);
            !this._options.autoUpload && b >= 0 && this._storedIds.splice(b, 1), this._uploadData.setStatus(a, qq.status.CANCELED)
        },_onComplete: function(a, b, c, d) {
            return c.success ? (c.thumbnailUrl && (this._thumbnailUrls[a] = c.thumbnailUrl), this._netUploaded++, this._uploadData.setStatus(a, qq.status.UPLOAD_SUCCESSFUL)) : (this._netUploadedOrQueued--, this._uploadData.setStatus(a, qq.status.UPLOAD_FAILED), c[this._options.retry.preventRetryResponseProperty] === !0 && (this._preventRetries[a] = !0)), this._maybeParseAndSendUploadError(a, b, c, d), c.success ? !0 : !1
        },_onDelete: function(a) {
            this._uploadData.setStatus(a, qq.status.DELETING)
        },_onDeleteComplete: function(a, b, c) {
            var d = this.getName(a);
            c ? (this._uploadData.setStatus(a, qq.status.DELETE_FAILED), this.log("Delete request for '" + d + "' has failed.", "error"), void 0 === b.withCredentials ? this._options.callbacks.onError(a, d, "Delete request failed", b) : this._options.callbacks.onError(a, d, "Delete request failed with response code " + b.status, b)) : (this._netUploadedOrQueued--, this._netUploaded--, this._handler.expunge(a), this._uploadData.setStatus(a, qq.status.DELETED), this.log("Delete request for '" + d + "' has succeeded."))
        },_onInputChange: function(a) {
            var b;
            if (qq.supportedFeatures.ajaxUploading) {
                for (b = 0; b < a.files.length; b++)
                    this._annotateWithButtonId(a.files[b], a);
                this.addFiles(a.files)
            } else
                a.value.length > 0 && this.addFiles(a);
            qq.each(this._buttons, function(a, b) {
                b.reset()
            })
        },_onProgress: function(a, b, c, d) {
            this._totalProgress && this._totalProgress.onIndividualProgress(a, c, d)
        },_onSubmit: function() {
        },_onSubmitCallbackSuccess: function(a) {
            this._onSubmit.apply(this, arguments), this._uploadData.setStatus(a, qq.status.SUBMITTED), this._onSubmitted.apply(this, arguments), this._options.callbacks.onSubmitted.apply(this, arguments), this._options.autoUpload ? this._uploadFile(a) : this._storeForLater(a)
        },_onSubmitDelete: function(a, b, c) {
            var d, e = this.getUuid(a);
            return b && (d = qq.bind(b, this, a, e, c)), this._isDeletePossible() ? (this._handleCheckedCallback({name: "onSubmitDelete",callback: qq.bind(this._options.callbacks.onSubmitDelete, this, a),onSuccess: d || qq.bind(this._deleteHandler.sendDelete, this, a, e, c),identifier: a}), !0) : (this.log("Delete request ignored for ID " + a + ", delete feature is disabled or request not possible " + "due to CORS on a user agent that does not support pre-flighting.", "warn"), !1)
        },_onSubmitted: function() {
        },_onTotalProgress: function(a, b) {
            this._options.callbacks.onTotalProgress(a, b)
        },_onUploadPrep: function() {
        },_onUpload: function(a) {
            this._uploadData.setStatus(a, qq.status.UPLOADING)
        },_onUploadChunk: function() {
        },_onUploadStatusChange: function(a, b, c) {
            c === qq.status.PAUSED && clearTimeout(this._retryTimeouts[a])
        },_onValidateBatchCallbackFailure: function(a) {
            var b = this;
            qq.each(a, function(a, c) {
                b._fileOrBlobRejected(c.id)
            })
        },_onValidateBatchCallbackSuccess: function(a, b, c, d, e) {
            var f, g = this._options.validation.itemLimit, h = this._netUploadedOrQueued;
            0 === g || g >= h ? b.length > 0 ? this._handleCheckedCallback({name: "onValidate",callback: qq.bind(this._options.callbacks.onValidate, this, a[0], e),onSuccess: qq.bind(this._onValidateCallbackSuccess, this, b, 0, c, d),onFailure: qq.bind(this._onValidateCallbackFailure, this, b, 0, c, d),identifier: "Item '" + b[0].file.name + "', size: " + b[0].file.size}) : this._itemError("noFilesError") : (this._onValidateBatchCallbackFailure(b), f = this._options.messages.tooManyItemsError.replace(/\{netItems\}/g, h).replace(/\{itemLimit\}/g, g), this._batchError(f))
        },_onValidateCallbackFailure: function(a, b, c, d) {
            var e = b + 1;
            this._fileOrBlobRejected(a[0].id, a[0].file.name), this._maybeProcessNextItemAfterOnValidateCallback(!1, a, e, c, d)
        },_onValidateCallbackSuccess: function(a, b, c, d) {
            var e = this, f = b + 1, g = this._getValidationDescriptor(a[b]);
            this._validateFileOrBlobData(a[b], g).then(function() {
                e._upload(a[b].id, c, d), e._maybeProcessNextItemAfterOnValidateCallback(!0, a, f, c, d)
            }, function() {
                e._maybeProcessNextItemAfterOnValidateCallback(!1, a, f, c, d)
            })
        },_prepareItemsForUpload: function(a, b, c) {
            if (0 === a.length)
                return this._itemError("noFilesError"), void 0;
            var d = this._getValidationDescriptors(a), e = this._getButtonId(a[0].file), f = this._getButton(e);
            this._handleCheckedCallback({name: "onValidateBatch",callback: qq.bind(this._options.callbacks.onValidateBatch, this, d, f),onSuccess: qq.bind(this._onValidateBatchCallbackSuccess, this, d, a, b, c, f),onFailure: qq.bind(this._onValidateBatchCallbackFailure, this, a),identifier: "batch validation"})
        },_preventLeaveInProgress: function() {
            var a = this;
            this._disposeSupport.attach(window, "beforeunload", function(b) {
                return a.getInProgress() ? (b = b || window.event, b.returnValue = a._options.messages.onLeave, a._options.messages.onLeave) : void 0
            })
        },_refreshSessionData: function() {
            var a = this, b = this._options.session;
            qq.Session && null != this._options.session.endpoint && (this._session || (qq.extend(b, this._options.cors), b.log = qq.bind(this.log, this), b.addFileRecord = qq.bind(this._addCannedFile, this), this._session = new qq.Session(b)), setTimeout(function() {
                a._session.refresh().then(function(b, c) {
                    a._options.callbacks.onSessionRequestComplete(b, !0, c)
                }, function(b, c) {
                    a._options.callbacks.onSessionRequestComplete(b, !1, c)
                })
            }, 0))
        },_setSize: function(a, b) {
            this._uploadData.updateSize(a, b), this._totalProgress && this._totalProgress.onNewSize(a)
        },_shouldAutoRetry: function(a) {
            var b = this._uploadData.retrieve({id: a});
            return !this._preventRetries[a] && this._options.retry.enableAuto && b.status !== qq.status.PAUSED && (void 0 === this._autoRetries[a] && (this._autoRetries[a] = 0), this._autoRetries[a] < this._options.retry.maxAutoAttempts) ? (this._autoRetries[a] += 1, !0) : !1
        },_storeForLater: function(a) {
            this._storedIds.push(a)
        },_trackButton: function(a) {
            var b;
            b = qq.supportedFeatures.ajaxUploading ? this._handler.getFile(a).qqButtonId : this._getButtonId(this._handler.getInput(a)), b && (this._buttonIdsForFileIds[a] = b)
        },_upload: function(a, b, c) {
            var d = this.getName(a);
            b && this.setParams(b, a), c && this.setEndpoint(c, a), this._handleCheckedCallback({name: "onSubmit",callback: qq.bind(this._options.callbacks.onSubmit, this, a, d),onSuccess: qq.bind(this._onSubmitCallbackSuccess, this, a, d),onFailure: qq.bind(this._fileOrBlobRejected, this, a, d),identifier: a})
        },_uploadFile: function(a) {
            this._handler.upload(a) || this._uploadData.setStatus(a, qq.status.QUEUED)
        },_validateFileOrBlobData: function(a, b) {
            var c = this, d = function() {
                return a.file instanceof qq.BlobProxy ? a.file.referenceBlob : a.file
            }(), e = b.name, f = b.size, g = this._getButtonId(a.file), h = this._getValidationBase(g), i = new qq.Promise;
            return i.then(function() {
            }, function() {
                c._fileOrBlobRejected(a.id, e)
            }), qq.isFileOrInput(d) && !this._isAllowedExtension(h.allowedExtensions, e) ? (this._itemError("typeError", e, d), i.failure()) : 0 === f ? (this._itemError("emptyError", e, d), i.failure()) : f > 0 && h.sizeLimit && f > h.sizeLimit ? (this._itemError("sizeError", e, d), i.failure()) : f > 0 && f < h.minSizeLimit ? (this._itemError("minSizeError", e, d), i.failure()) : (qq.ImageValidation && qq.supportedFeatures.imagePreviews && qq.isFile(d) ? new qq.ImageValidation(d, qq.bind(c.log, c)).validate(h.image).then(i.success, function(a) {
                c._itemError(a + "ImageError", e, d), i.failure()
            }) : i.success(), i)
        },_wrapCallbacks: function() {
            var a, b;
            a = this, b = function(b, c, d) {
                var e;
                try {
                    return c.apply(a, d)
                } catch (f) {
                    e = f.message || f.toString(), a.log("Caught exception in '" + b + "' callback - " + e, "error")
                }
            };
            for (var c in this._options.callbacks)
                !function() {
                    var d, e;
                    d = c, e = a._options.callbacks[d], a._options.callbacks[d] = function() {
                        return b(d, e, arguments)
                    }
                }()
        }}
}(), function() {
    "use strict";
    qq.FineUploaderBasic = function(a) {
        var b = this;
        this._options = {debug: !1,button: null,multiple: !0,maxConnections: 3,disableCancelForFormUploads: !1,autoUpload: !0,request: {endpoint: "/server/upload",params: {},paramsInBody: !0,customHeaders: {},forceMultipart: !0,inputName: "qqfile",uuidName: "qquuid",totalFileSizeName: "qqtotalfilesize",filenameParam: "qqfilename"},validation: {allowedExtensions: [],sizeLimit: 0,minSizeLimit: 0,itemLimit: 0,stopOnFirstInvalidFile: !0,acceptFiles: null,image: {maxHeight: 0,maxWidth: 0,minHeight: 0,minWidth: 0}},callbacks: {onSubmit: function() {
                },onSubmitted: function() {
                },onComplete: function() {
                },onAllComplete: function() {
                },onCancel: function() {
                },onUpload: function() {
                },onUploadChunk: function() {
                },onUploadChunkSuccess: function() {
                },onResume: function() {
                },onProgress: function() {
                },onTotalProgress: function() {
                },onError: function() {
                },onAutoRetry: function() {
                },onManualRetry: function() {
                },onValidateBatch: function() {
                },onValidate: function() {
                },onSubmitDelete: function() {
                },onDelete: function() {
                },onDeleteComplete: function() {
                },onPasteReceived: function() {
                },onStatusChange: function() {
                },onSessionRequestComplete: function() {
                } 
        }, messages: {
            typeError: "{file} 不是允许上传的文件格式，请上传以下格式文件: {extensions}。",
            sizeError: "{file} 文件太大，请重新上传，最大文件大小为 {sizeLimit}。",
            minSizeError: "{file} 文件太小，请重新上传，最小文件大小为 {minSizeLimit}。",
            emptyError: "{file} 是空文件, 请重新上传。",
            noFilesError: "没有需要上传的文件。",
            tooManyItemsError: "最多只允许上传 {itemLimit} 个文件。",
            maxHeightImageError: "上传的图片太高了。", 
            maxWidthImageError: "上传的图片太宽了。",
            minHeightImageError: "上传的图片没有达到高度需求。",
            minWidthImageError: "上传的图片没有达到宽度需求。",
            retryFailTooManyItems: "重试失败 - 已经到达上传文件数量限制。",
            onLeave: "文件正在上传中，如果离开页面将会停止上传。"
        }, retry: { enableAuto: !1, maxAutoAttempts: 3, autoAttemptDelay: 5, preventRetryResponseProperty: "preventRetry" }, classes: { buttonHover: "qq-upload-button-hover", buttonFocus: "qq-upload-button-focus" }, chunking: { enabled: !1, concurrent: { enabled: !1 }, paramNames: { partIndex: "qqpartindex", partByteOffset: "qqpartbyteoffset", chunkSize: "qqchunksize", totalFileSize: "qqtotalfilesize", totalParts: "qqtotalparts" }, partSize: 2e6, success: { endpoint: null} }, resume: { enabled: !1, recordsExpireIn: 7, paramNames: { resuming: "qqresume"} }, formatFileName: function (a) {
                return void 0 !== a && a.length > 33 && (a = a.slice(0, 19) + "..." + a.slice(-14)), a
            },text: {defaultResponseError: "Upload failure reason unknown",sizeSymbols: ["kB", "MB", "GB", "TB", "PB", "EB"]},deleteFile: {enabled: !1,method: "DELETE",endpoint: "/server/upload",customHeaders: {},params: {}},cors: {expected: !1,sendCredentials: !1,allowXdr: !1},blobs: {defaultName: "misc_data"},paste: {targetElement: null,defaultName: "pasted_image"},camera: {ios: !1,button: null},extraButtons: [],session: {endpoint: null,params: {},customHeaders: {},refreshOnReset: !0},form: {element: "qq-form",autoUpload: !1,interceptSubmit: !0},scaling: {sendOriginal: !0,orient: !0,defaultType: null,defaultQuality: 80,failureText: "Failed to scale",includeExif: !1,sizes: []}}, qq.extend(this._options, a, !0), this._buttons = [], this._extraButtonSpecs = {}, this._buttonIdsForFileIds = [], this._wrapCallbacks(), this._disposeSupport = new qq.DisposeSupport, this._storedIds = [], this._autoRetries = [], this._retryTimeouts = [], this._preventRetries = [], this._thumbnailUrls = [], this._netUploadedOrQueued = 0, this._netUploaded = 0, this._uploadData = this._createUploadDataTracker(), this._initFormSupportAndParams(), this._customHeadersStore = this._createStore(this._options.request.customHeaders), this._deleteFileCustomHeadersStore = this._createStore(this._options.deleteFile.customHeaders), this._deleteFileParamsStore = this._createStore(this._options.deleteFile.params), this._endpointStore = this._createStore(this._options.request.endpoint), this._deleteFileEndpointStore = this._createStore(this._options.deleteFile.endpoint), this._handler = this._createUploadHandler(), this._deleteHandler = qq.DeleteFileAjaxRequester && this._createDeleteHandler(), this._options.button && (this._defaultButtonId = this._createUploadButton({element: this._options.button}).getButtonId()), this._generateExtraButtonSpecs(), this._handleCameraAccess(), this._options.paste.targetElement && (qq.PasteSupport ? this._pasteHandler = this._createPasteHandler() : this.log("Paste support module not found", "error")), this._preventLeaveInProgress(), this._imageGenerator = qq.ImageGenerator && new qq.ImageGenerator(qq.bind(this.log, this)), this._refreshSessionData(), this._succeededSinceLastAllComplete = [], this._failedSinceLastAllComplete = [], this._scaler = qq.Scaler && new qq.Scaler(this._options.scaling, qq.bind(this.log, this)) || {}, this._scaler.enabled && (this._customNewFileHandler = qq.bind(this._scaler.handleNewFile, this._scaler)), qq.TotalProgress && qq.supportedFeatures.progressBar && (this._totalProgress = new qq.TotalProgress(qq.bind(this._onTotalProgress, this), function(a) {
            var c = b._uploadData.retrieve({id: a});
            return c && c.size || 0
        }))
    }, qq.FineUploaderBasic.prototype = qq.basePublicApi, qq.extend(qq.FineUploaderBasic.prototype, qq.basePrivateApi)
}(), qq.AjaxRequester = function(a) {
    "use strict";
    function b() {
        return qq.indexOf(["GET", "POST", "HEAD"], w.method) >= 0
    }
    function c() {
        var a = !1;
        return qq.each(a, function(b, c) {
            return qq.indexOf(["Accept", "Accept-Language", "Content-Language", "Content-Type"], c) < 0 ? (a = !0, !1) : void 0
        }), a
    }
    function d(a) {
        return w.cors.expected && void 0 === a.withCredentials
    }
    function e() {
        var a;
        return (window.XMLHttpRequest || window.ActiveXObject) && (a = qq.createXhrInstance(), void 0 === a.withCredentials && (a = new XDomainRequest)), a
    }
    function f(a, b) {
        var c = v[a].xhr;
        return c || (c = b ? b : w.cors.expected ? e() : qq.createXhrInstance(), v[a].xhr = c), c
    }
    function g(a) {
        var b, c = qq.indexOf(u, a), d = w.maxConnections;
        delete v[a], u.splice(c, 1), u.length >= d && d > c && (b = u[d - 1], j(b))
    }
    function h(a, b) {
        var c = f(a), e = w.method, h = b === !0;
        g(a), h ? s(e + " request for " + a + " has failed", "error") : d(c) || q(c.status) || (h = !0, s(e + " request for " + a + " has failed - response code " + c.status, "error")), w.onComplete(a, c, h)
    }
    function i(a) {
        var b, c = v[a].additionalParams, d = w.mandatedParams;
        return w.paramsStore.get && (b = w.paramsStore.get(a)), c && qq.each(c, function(a, c) {
            b = b || {}, b[a] = c
        }), d && qq.each(d, function(a, c) {
            b = b || {}, b[a] = c
        }), b
    }
    function j(a, b) {
        var c, e = f(a, b), g = w.method, h = i(a), j = v[a].payload;
        return w.onSend(a), c = k(a, h), d(e) ? (e.onload = n(a), e.onerror = o(a)) : e.onreadystatechange = l(a), m(a), e.open(g, c, !0), w.cors.expected && w.cors.sendCredentials && !d(e) && (e.withCredentials = !0), p(a), s("Sending " + g + " request for " + a), j ? e.send(j) : t || !h ? e.send() : h && w.contentType && w.contentType.toLowerCase().indexOf("application/x-www-form-urlencoded") >= 0 ? e.send(qq.obj2url(h, "")) : h && w.contentType && w.contentType.toLowerCase().indexOf("application/json") >= 0 ? e.send(JSON.stringify(h)) : e.send(h), e
    }
    function k(a, b) {
        var c = w.endpointStore.get(a), d = v[a].addToPath;
        return void 0 != d && (c += "/" + d), t && b ? qq.obj2url(b, c) : c
    }
    function l(a) {
        return function() {
            4 === f(a).readyState && h(a)
        }
    }
    function m(a) {
        var b = w.onProgress;
        b && (f(a).upload.onprogress = function(c) {
            c.lengthComputable && b(a, c.loaded, c.total)
        })
    }
    function n(a) {
        return function() {
            h(a)
        }
    }
    function o(a) {
        return function() {
            h(a, !0)
        }
    }
    function p(a) {
        var e = f(a), g = w.customHeaders, h = v[a].additionalHeaders || {}, i = w.method, j = {};
        d(e) || (w.acceptHeader && e.setRequestHeader("Accept", w.acceptHeader), w.allowXRequestedWithAndCacheControl && (w.cors.expected && b() && !c(g) || (e.setRequestHeader("X-Requested-With", "XMLHttpRequest"), e.setRequestHeader("Cache-Control", "no-cache"))), !w.contentType || "POST" !== i && "PUT" !== i || e.setRequestHeader("Content-Type", w.contentType), qq.extend(j, qq.isFunction(g) ? g(a) : g), qq.extend(j, h), qq.each(j, function(a, b) {
            e.setRequestHeader(a, b)
        }))
    }
    function q(a) {
        return qq.indexOf(w.successfulResponseCodes[w.method], a) >= 0
    }
    function r(a, b, c, d, e, f) {
        v[a] = {addToPath: c,additionalParams: d,additionalHeaders: e,payload: f};
        var g = u.push(a);
        return g <= w.maxConnections ? j(a, b) : void 0
    }
    var s, t, u = [], v = {}, w = {acceptHeader: null,validMethods: ["POST"],method: "POST",contentType: "application/x-www-form-urlencoded",maxConnections: 3,customHeaders: {},endpointStore: {},paramsStore: {},mandatedParams: {},allowXRequestedWithAndCacheControl: !0,successfulResponseCodes: {DELETE: [200, 202, 204],POST: [200, 204],GET: [200]},cors: {expected: !1,sendCredentials: !1},log: function() {
        },onSend: function() {
        },onComplete: function() {
        },onProgress: null};
    if (qq.extend(w, a), s = w.log, qq.indexOf(w.validMethods, w.method) < 0)
        throw new Error("'" + w.method + "' is not a supported method for this type of request!");
    t = "GET" === w.method || "DELETE" === w.method, qq.extend(this, {initTransport: function(a) {
            var b, c, d, e, f;
            return {withPath: function(a) {
                    return b = a, this
                },withParams: function(a) {
                    return c = a, this
                },withHeaders: function(a) {
                    return d = a, this
                },withPayload: function(a) {
                    return e = a, this
                },withCacheBuster: function() {
                    return f = !0, this
                },send: function(g) {
                    return f && qq.indexOf(["GET", "DELETE"], w.method) >= 0 && (c.qqtimestamp = (new Date).getTime()), r(a, g, b, c, d, e)
                }}
        },canceled: function(a) {
            g(a)
        }})
}, qq.UploadHandler = function(a) {
    "use strict";
    var b = a.proxy, c = {}, d = b.onCancel, e = b.getName;
    qq.extend(this, {add: function(a, b) {
            c[a] = b, c[a].temp = {}
        },cancel: function(a) {
            var b = this, f = new qq.Promise, g = d(a, e(a), f);
            g.then(function() {
                b.isValid(a) && (c[a].canceled = !0, b.expunge(a)), f.success()
            })
        },expunge: function(a) {
            delete c[a]
        },getThirdPartyFileId: function(a) {
            return c[a].key
        },isValid: function(a) {
            return void 0 !== c[a]
        },reset: function() {
            c = {}
        },_getFileState: function(a) {
            return c[a]
        },_setThirdPartyFileId: function(a, b) {
            c[a].key = b
        },_wasCanceled: function(a) {
            return !!c[a].canceled
        }})
}, qq.UploadHandlerController = function(a, b) {
    "use strict";
    var c, d, e, f = this, g = !1, h = !1, i = {paramsStore: {},maxConnections: 3,chunking: {enabled: !1,multiple: {enabled: !1}},log: function() {
        },onProgress: function() {
        },onComplete: function() {
        },onCancel: function() {
        },onUploadPrep: function() {
        },onUpload: function() {
        },onUploadChunk: function() {
        },onUploadChunkSuccess: function() {
        },onAutoRetry: function() {
        },onResume: function() {
        },onUuidChanged: function() {
        },getName: function() {
        },setSize: function() {
        },isQueued: function() {
        },getIdsInProxyGroup: function() {
        },getIdsInBatch: function() {
        }}, j = {done: function(a, b, c, d) {
            var f = e._getChunkData(a, b);
            e._getFileState(a).attemptingResume = !1, delete e._getFileState(a).temp.chunkProgress[b], e._getFileState(a).loaded += f.size, i.onUploadChunkSuccess(a, e._getChunkDataForCallback(f), c, d)
        },finalize: function(a) {
            var b = i.getSize(a), c = i.getName(a);
            d("All chunks have been uploaded for " + a + " - finalizing...."), e.finalizeChunks(a).then(function(d) {
                var f = m.normalizeResponse({}, !0);
                i.onProgress(a, c, b, b), e._maybeDeletePersistedChunkData(a), m.cleanup(a, f, d)
            }, function(b, e) {
                var f = m.normalizeResponse(b, !1);
                d("Problem finalizing chunks for file ID " + a + " - " + f.error, "error"), f.reset && j.reset(a), i.onAutoRetry(a, c, f, e) || m.cleanup(a, f, e)
            })
        },hasMoreParts: function(a) {
            return !!e._getFileState(a).chunking.remaining.length
        },nextPart: function(a) {
            var b = e._getFileState(a).chunking.remaining.shift();
            return b >= e._getTotalChunks(a) && (b = null), b
        },reset: function(a) {
            d("Server or callback has ordered chunking effort to be restarted on next attempt for item ID " + a, "error"), e._maybeDeletePersistedChunkData(a), e.reevaluateChunking(a), e._getFileState(a).loaded = 0
        },sendNext: function(a) {
            var b = i.getSize(a), c = i.getName(a), f = j.nextPart(a), g = e._getChunkData(a, f), l = e._getFileState(a).attemptingResume, n = e._getFileState(a).chunking.inProgress || [];
            null == e._getFileState(a).loaded && (e._getFileState(a).loaded = 0), l && i.onResume(a, c, g) === !1 && (j.reset(a), f = j.nextPart(a), g = e._getChunkData(a, f), l = !1), null == f && 0 === n.length ? j.finalize(a) : (d("Sending chunked upload request for item " + a + ": bytes " + (g.start + 1) + "-" + g.end + " of " + b), i.onUploadChunk(a, c, e._getChunkDataForCallback(g)), n.push(f), e._getFileState(a).chunking.inProgress = n, h && k.open(a, f), h && k.available() && e._getFileState(a).chunking.remaining.length && j.sendNext(a), e.uploadChunk(a, f, l).then(function(b, c) {
                d("Chunked upload request succeeded for " + a + ", chunk " + f), e.clearCachedChunk(a, f);
                var g = e._getFileState(a).chunking.inProgress || [], h = m.normalizeResponse(b, !0), i = qq.indexOf(g, f);
                d(qq.format("Chunk {} for file {} uploaded successfully.", f, a)), j.done(a, f, h, c), i >= 0 && g.splice(i, 1), e._maybePersistChunkedState(a), j.hasMoreParts(a) || 0 !== g.length ? j.hasMoreParts(a) && j.sendNext(a) : j.finalize(a)
            }, function(b, g) {
                d("Chunked upload request failed for " + a + ", chunk " + f), e.clearCachedChunk(a, f);
                var l = m.normalizeResponse(b, !1);
                if (l.reset)
                    j.reset(a);
                else {
                    var n = qq.indexOf(e._getFileState(a).chunking.inProgress, f);
                    n >= 0 && (e._getFileState(a).chunking.inProgress.splice(n, 1), e._getFileState(a).chunking.remaining.unshift(f))
                }
                e._getFileState(a).temp.ignoreFailure || (h && (e._getFileState(a).temp.ignoreFailure = !0, qq.each(e._getXhrs(a), function(a, b) {
                    b.abort()
                }), e.moveInProgressToRemaining(a), k.free(a, !0)), i.onAutoRetry(a, c, l, g) || m.cleanup(a, l, g))
            }).done(function() {
                e.clearXhr(a, f)
            }))
        }}, k = {_open: [],_openChunks: {},_waiting: [],available: function() {
            var a = i.maxConnections, b = 0, c = 0;
            return qq.each(k._openChunks, function(a, d) {
                b++, c += d.length
            }), a - (k._open.length - b + c)
        },free: function(a, b) {
            var c, f = !b, g = qq.indexOf(k._waiting, a), h = qq.indexOf(k._open, a);
            delete k._openChunks[a], m.getProxyOrBlob(a) instanceof qq.BlobProxy && (d("Generated blob upload has ended for " + a + ", disposing generated blob."), delete e._getFileState(a).file), g >= 0 ? k._waiting.splice(g, 1) : f && h >= 0 && (k._open.splice(h, 1), c = k._waiting.shift(), c >= 0 && (k._open.push(c), m.start(c)))
        },getWaitingOrConnected: function() {
            var a = [];
            return qq.each(a, k._open), qq.each(a, k._waiting)
        },isUsingConnection: function(a) {
            return qq.indexOf(k._open, a) >= 0
        },open: function(a, b) {
            return null == b && k._waiting.push(a), k.available() ? (null == b ? (k._waiting.pop(), k._open.push(a)) : !function() {
                var c = k._openChunks[a] || [];
                c.push(b), k._openChunks[a] = c
            }(), !0) : !1
        },reset: function() {
            k._waiting = [], k._open = []
        }}, l = {send: function(a, b) {
            e._getFileState(a).loaded = 0, d("Sending simple upload request for " + a), e.uploadFile(a).then(function(c, e) {
                d("Simple upload request succeeded for " + a);
                var f = m.normalizeResponse(c, !0), g = i.getSize(a);
                i.onProgress(a, b, g, g), m.maybeNewUuid(a, f), m.cleanup(a, f, e)
            }, function(c, e) {
                d("Simple upload request failed for " + a);
                var f = m.normalizeResponse(c, !1);
                i.onAutoRetry(a, b, f, e) || m.cleanup(a, f, e)
            })
        }}, m = {cancel: function(a) {
            d("Cancelling " + a), i.paramsStore.remove(a), k.free(a)
        },cleanup: function(a, b, c) {
            var d = i.getName(a);
            i.onComplete(a, d, b, c), e._getFileState(a) && e._clearXhrs && e._clearXhrs(a), k.free(a)
        },getProxyOrBlob: function(a) {
            return e.getProxy && e.getProxy(a) || e.getFile && e.getFile(a)
        },initHandler: function() {
            var a = b ? qq[b] : qq.traditional, c = qq.supportedFeatures.ajaxUploading ? "Xhr" : "Form";
            e = new a[c + "UploadHandler"](i, {getDataByUuid: i.getDataByUuid,getName: i.getName,getSize: i.getSize,getUuid: i.getUuid,log: d,onCancel: i.onCancel,onProgress: i.onProgress,onUuidChanged: i.onUuidChanged}), e._removeExpiredChunkingRecords && e._removeExpiredChunkingRecords()
        },isDeferredEligibleForUpload: function(a) {
            return i.isQueued(a)
        },maybeDefer: function(a, b) {
            return b && !e.getFile(a) && b instanceof qq.BlobProxy ? (i.onUploadPrep(a), d("Attempting to generate a blob on-demand for " + a), b.create().then(function(b) {
                d("Generated an on-demand blob for " + a), e.updateBlob(a, b), i.setSize(a, b.size), e.reevaluateChunking(a), m.maybeSendDeferredFiles(a)
            }, function(b) {
                var e = {};
                b && (e.error = b), d(qq.format("Failed to generate blob for ID {}.  Error message: {}.", a, b), "error"), i.onComplete(a, i.getName(a), qq.extend(e, c), null), m.maybeSendDeferredFiles(a), k.free(a)
            }), !1) : m.maybeSendDeferredFiles(a)
        },maybeSendDeferredFiles: function(a) {
            var b = i.getIdsInProxyGroup(a), c = !1;
            return b && b.length ? (d("Maybe ready to upload proxy group file " + a), qq.each(b, function(b, d) {
                if (m.isDeferredEligibleForUpload(d) && e.getFile(d))
                    c = d === a, m.now(d);
                else if (m.isDeferredEligibleForUpload(d))
                    return !1
            })) : (c = !0, m.now(a)), c
        },maybeNewUuid: function(a, b) {
            void 0 !== b.newUuid && i.onUuidChanged(a, b.newUuid)
        },normalizeResponse: function(a, b) {
            var c = a;
            return qq.isObject(a) || (c = {}, qq.isString(a) && !b && (c.error = a)), c.success = b, c
        },now: function(a) {
            var b = i.getName(a);
            if (!f.isValid(a))
                throw new qq.Error(a + " is not a valid file ID to upload!");
            i.onUpload(a, b), g && e._shouldChunkThisFile(a) ? j.sendNext(a) : l.send(a, b)
        },start: function(a) {
            var b = m.getProxyOrBlob(a);
            return b ? m.maybeDefer(a, b) : (m.now(a), !0)
        }};
    qq.extend(this, {add: function() {
            e.add.apply(this, arguments)
        },upload: function(a) {
            return k.open(a) ? m.start(a) : !1
        },retry: function(a) {
            return h && (e._getFileState(a).temp.ignoreFailure = !1), k.isUsingConnection(a) ? m.start(a) : f.upload(a)
        },cancel: function(a) {
            var b = e.cancel(a);
            qq.isGenericPromise(b) ? b.then(function() {
                m.cancel(a)
            }) : b !== !1 && m.cancel(a)
        },cancelAll: function() {
            var a = k.getWaitingOrConnected();
            qq.each(a, function(a, b) {
                f.cancel(b)
            }), k.reset()
        },getFile: function(a) {
            return e.getProxy && e.getProxy(a) ? e.getProxy(a).referenceBlob : e.getFile && e.getFile(a)
        },isProxied: function(a) {
            return !(!e.getProxy || !e.getProxy(a))
        },getInput: function(a) {
            return e.getInput ? e.getInput(a) : void 0
        },reset: function() {
            d("Resetting upload handler"), f.cancelAll(), k.reset(), e.reset()
        },expunge: function(a) {
            return f.isValid(a) ? e.expunge(a) : void 0
        },isValid: function(a) {
            return e.isValid(a)
        },getResumableFilesData: function() {
            return e.getResumableFilesData ? e.getResumableFilesData() : []
        },getThirdPartyFileId: function(a) {
            return f.isValid(a) ? e.getThirdPartyFileId(a) : void 0
        },pause: function(a) {
            return f.isResumable(a) && e.pause && f.isValid(a) && e.pause(a) ? (k.free(a), e.moveInProgressToRemaining(a), !0) : !1
        },isResumable: function(a) {
            return !!e.isResumable && e.isResumable(a)
        }}), qq.extend(i, a), d = i.log, g = i.chunking.enabled && qq.supportedFeatures.chunking, h = g && i.chunking.concurrent.enabled, c = function() {
        var a = {};
        return a[i.preventRetryParam] = !0, a
    }(), m.initHandler()
}, qq.FormUploadHandler = function(a) {
    "use strict";
    function b(a) {
        delete k[a], m && (clearTimeout(l[a]), delete l[a], q.stopReceivingMessages(a));
        var b = document.getElementById(g._getIframeName(a));
        b && (b.setAttribute("src", "javascript:false;"), qq(b).remove())
    }
    function c(a) {
        return a.split("_")[0]
    }
    function d(a) {
        var b = qq.toElement("<iframe src='javascript:false;' name='" + a + "' />");
        return b.setAttribute("id", a), b.style.display = "none", document.body.appendChild(b), b
    }
    function e(a, b) {
        var d = a.id, e = c(d), f = o(e);
        j[f] = b, k[e] = qq(a).attach("load", function() {
            g.getInput(e) && (p("Received iframe load event for CORS upload request (iframe name " + d + ")"), l[d] = setTimeout(function() {
                var a = "No valid message received from loaded iframe for iframe name " + d;
                p(a, "error"), b({error: a})
            }, 1e3))
        }), q.receiveMessage(d, function(a) {
            p("Received the following window message: '" + a + "'");
            var b, e = c(d), f = g._parseJsonResponse(e, a), h = f.uuid;
            h && j[h] ? (p("Handling response for iframe name " + d), clearTimeout(l[d]), delete l[d], g._detachLoadEvent(d), b = j[h], delete j[h], q.stopReceivingMessages(d), b(f)) : h || p("'" + a + "' does not contain a UUID - ignoring.")
        })
    }
    var f = a.options, g = this, h = a.proxy, i = qq.getUniqueId(), j = {}, k = {}, l = {}, m = f.isCors, n = f.inputName, o = h.getUuid, p = h.log, q = new qq.WindowReceiveMessage({log: p});
    qq.extend(this, new qq.UploadHandler(a)), qq.override(this, function(a) {
        return {add: function(b, c) {
                a.add(b, {input: c}), c.setAttribute("name", n), c.parentNode && qq(c).remove()
            },expunge: function(c) {
                b(c), a.expunge(c)
            },isValid: function(b) {
                return a.isValid(b) && void 0 !== g._getFileState(b).input
            }}
    }), qq.extend(this, {_attachLoadEvent: function(a, b) {
            var c;
            m ? e(a, b) : k[a.id] = qq(a).attach("load", function() {
                if (p("Received response for " + a.id), a.parentNode) {
                    try {
                        if (a.contentDocument && a.contentDocument.body && "false" == a.contentDocument.body.innerHTML)
                            return
                    } catch (d) {
                        p("Error when attempting to access iframe during handling of upload response (" + d.message + ")", "error"), c = {success: !1}
                    }
                    b(c)
                }
            })
        },_createIframe: function(a) {
            var b = g._getIframeName(a);
            return d(b)
        },_detachLoadEvent: function(a) {
            void 0 !== k[a] && (k[a](), delete k[a])
        },_getIframeName: function(a) {
            return a + "_" + i
        },getInput: function(a) {
            return g._getFileState(a).input
        },_initFormForUpload: function(a) {
            var b = a.method, c = a.endpoint, d = a.params, e = a.paramsInBody, f = a.targetName, g = qq.toElement("<form method='" + b + "' enctype='multipart/form-data'></form>"), h = c;
            return e ? qq.obj2Inputs(d, g) : h = qq.obj2url(d, c), g.setAttribute("action", h), g.setAttribute("target", f), g.style.display = "none", document.body.appendChild(g), g
        }})
}, qq.XhrUploadHandler = function(a) {
    "use strict";
    function b(a) {
        qq.each(c._getXhrs(a), function(b, d) {
            var e = c._getAjaxRequester(a, b);
            d.onreadystatechange = null, d.upload.onprogress = null, d.abort(), e && e.canceled && e.canceled(a)
        })
    }
    var c = this, d = a.options.namespace, e = a.proxy, f = a.options.chunking, g = a.options.resume, h = f && a.options.chunking.enabled && qq.supportedFeatures.chunking, i = g && a.options.resume.enabled && h && qq.supportedFeatures.resume, j = e.getName, k = e.getSize, l = e.getUuid, m = e.getEndpoint, n = e.getDataByUuid, o = e.onUuidChanged, p = e.onProgress, q = e.log;
    qq.extend(this, new qq.UploadHandler(a)), qq.override(this, function(a) {
        return {add: function(b, d) {
                if (qq.isFile(d) || qq.isBlob(d))
                    a.add(b, {file: d});
                else {
                    if (!(d instanceof qq.BlobProxy))
                        throw new Error("Passed obj is not a File, Blob, or proxy");
                    a.add(b, {proxy: d})
                }
                c._initTempState(b), i && c._maybePrepareForResume(b)
            },expunge: function(d) {
                b(d), c._maybeDeletePersistedChunkData(d), c._clearXhrs(d), a.expunge(d)
            }}
    }), qq.extend(this, {clearCachedChunk: function(a, b) {
            delete c._getFileState(a).temp.cachedChunks[b]
        },clearXhr: function(a, b) {
            var d = c._getFileState(a).temp;
            d.xhrs && delete d.xhrs[b], d.ajaxRequesters && delete d.ajaxRequesters[b]
        },finalizeChunks: function(a) {
            return (new qq.Promise).success(c._getXhr(a))
        },getFile: function(a) {
            return c.isValid(a) && c._getFileState(a).file
        },getProxy: function(a) {
            return c.isValid(a) && c._getFileState(a).proxy
        },getResumableFilesData: function() {
            var a = [];
            return c._iterateResumeRecords(function(b, d) {
                c.moveInProgressToRemaining(null, d.chunking.inProgress, d.chunking.remaining);
                var e = {name: d.name,remaining: d.chunking.remaining,size: d.size,uuid: d.uuid};
                d.key && (e.key = d.key), a.push(e)
            }), a
        },isResumable: function(a) {
            return !!f && c.isValid(a) && !c._getFileState(a).notResumable
        },moveInProgressToRemaining: function(a, b, d) {
            var e = b || c._getFileState(a).chunking.inProgress, f = d || c._getFileState(a).chunking.remaining;
            e && (e.reverse(), qq.each(e, function(a, b) {
                f.unshift(b)
            }), e.length = 0)
        },pause: function(a) {
            return c.isValid(a) ? (q(qq.format("Aborting XHR upload for {} '{}' due to pause instruction.", a, j(a))), c._getFileState(a).paused = !0, b(a), !0) : void 0
        },reevaluateChunking: function(a) {
            if (f && c.isValid(a)) {
                var b, d = c._getFileState(a);
                if (delete d.chunking, d.chunking = {}, b = c._getTotalChunks(a), b > 1) {
                    d.chunking.enabled = !0, d.chunking.parts = b, d.chunking.remaining = [];
                    for (var e = 0; b > e; e++)
                        d.chunking.remaining.push(e);
                    c._initTempState(a)
                } else
                    d.chunking.enabled = !1
            }
        },updateBlob: function(a, b) {
            c.isValid(a) && (c._getFileState(a).file = b)
        },_clearXhrs: function(a) {
            var b = c._getFileState(a).temp;
            qq.each(b.ajaxRequesters, function(a) {
                delete b.ajaxRequesters[a]
            }), qq.each(b.xhrs, function(a) {
                delete b.xhrs[a]
            })
        },_createXhr: function(a, b) {
            return c._registerXhr(a, b, qq.createXhrInstance())
        },_getAjaxRequester: function(a, b) {
            var d = null == b ? -1 : b;
            return c._getFileState(a).temp.ajaxRequesters[d]
        },_getChunkData: function(a, b) {
            var d = f.partSize, e = k(a), g = c.getFile(a), h = d * b, i = h + d >= e ? e : h + d, j = c._getTotalChunks(a), l = this._getFileState(a).temp.cachedChunks, m = l[b] || qq.sliceBlob(g, h, i);
            return l[b] = m, {part: b,start: h,end: i,count: j,blob: m,size: i - h}
        },_getChunkDataForCallback: function(a) {
            return {partIndex: a.part,startByte: a.start + 1,endByte: a.end,totalParts: a.count}
        },_getLocalStorageId: function(a) {
            var b = "5.0", c = j(a), e = k(a), g = f.partSize, h = m(a);
            return qq.format("qq{}resume{}-{}-{}-{}-{}", d, b, c, e, g, h)
        },_getMimeType: function(a) {
            return c.getFile(a).type
        },_getPersistableData: function(a) {
            return c._getFileState(a).chunking
        },_getTotalChunks: function(a) {
            if (f) {
                var b = k(a), c = f.partSize;
                return Math.ceil(b / c)
            }
        },_getXhr: function(a, b) {
            var d = null == b ? -1 : b;
            return c._getFileState(a).temp.xhrs[d]
        },_getXhrs: function(a) {
            return c._getFileState(a).temp.xhrs
        },_iterateResumeRecords: function(a) {
            i && qq.each(localStorage, function(b, c) {
                if (0 === b.indexOf(qq.format("qq{}resume-", d))) {
                    var e = JSON.parse(c);
                    a(b, e)
                }
            })
        },_initTempState: function(a) {
            c._getFileState(a).temp = {ajaxRequesters: {},chunkProgress: {},xhrs: {},cachedChunks: {}}
        },_markNotResumable: function(a) {
            c._getFileState(a).notResumable = !0
        },_maybeDeletePersistedChunkData: function(a) {
            var b;
            return i && c.isResumable(a) && (b = c._getLocalStorageId(a), b && localStorage.getItem(b)) ? (localStorage.removeItem(b), !0) : !1
        },_maybePrepareForResume: function(a) {
            var b, d, e = c._getFileState(a);
            i && void 0 === e.key && (b = c._getLocalStorageId(a), d = localStorage.getItem(b), d && (d = JSON.parse(d), n(d.uuid) ? c._markNotResumable(a) : (q(qq.format("Identified file with ID {} and name of {} as resumable.", a, j(a))), o(a, d.uuid), e.key = d.key, e.chunking = d.chunking, e.loaded = d.loaded, e.attemptingResume = !0, c.moveInProgressToRemaining(a))))
        },_maybePersistChunkedState: function(a) {
            var b, d, e = c._getFileState(a);
            i && c.isResumable(a) && (b = c._getLocalStorageId(a), d = {name: j(a),size: k(a),uuid: l(a),key: e.key,chunking: e.chunking,loaded: e.loaded,lastUpdated: Date.now()}, localStorage.setItem(b, JSON.stringify(d)))
        },_registerProgressHandler: function(a, b, d) {
            var e = c._getXhr(a, b), f = {simple: function(b, c) {
                    var d = k(a);
                    b === c ? p(a, name, d, d) : p(a, name, b >= d ? d - 1 : b, d)
                },chunked: function(e, f) {
                    var g = c._getFileState(a).temp.chunkProgress, h = c._getFileState(a).loaded, i = e, j = f, l = k(a), m = i - (j - d), n = h;
                    g[b] = m, qq.each(g, function(a, b) {
                        n += b
                    }), p(a, name, n, l)
                }};
            e.upload.onprogress = function(a) {
                if (a.lengthComputable) {
                    var b = null == d ? "simple" : "chunked";
                    f[b](a.loaded, a.total)
                }
            }
        },_registerXhr: function(a, b, d, e) {
            var f = null == b ? -1 : b, g = c._getFileState(a).temp;
            return g.xhrs = g.xhrs || {}, g.ajaxRequesters = g.ajaxRequesters || {}, g.xhrs[f] = d, e && (g.ajaxRequesters[f] = e), d
        },_removeExpiredChunkingRecords: function() {
            var a = g.recordsExpireIn;
            c._iterateResumeRecords(function(b, c) {
                var d = new Date(c.lastUpdated);
                d.setDate(d.getDate() + a), d.getTime() <= Date.now() && (q("Removing expired resume record with key " + b), localStorage.removeItem(b))
            })
        },_shouldChunkThisFile: function(a) {
            var b = c._getFileState(a);
            return b.chunking || c.reevaluateChunking(a), b.chunking.enabled
        }})
}, qq.WindowReceiveMessage = function(a) {
    "use strict";
    var b = {log: function() {
        }}, c = {};
    qq.extend(b, a), qq.extend(this, {receiveMessage: function(a, b) {
            var d = function(a) {
                b(a.data)
            };
            window.postMessage ? c[a] = qq(window).attach("message", d) : log("iframe message passing not supported in this browser!", "error")
        },stopReceivingMessages: function(a) {
            if (window.postMessage) {
                var b = c[a];
                b && b()
            }
        }})
}, function() {
    "use strict";
    qq.uiPublicApi = {clearStoredFiles: function() {
            this._parent.prototype.clearStoredFiles.apply(this, arguments), this._templating.clearFiles()
        },addExtraDropzone: function(a) {
            this._dnd && this._dnd.setupExtraDropzone(a)
        },removeExtraDropzone: function(a) {
            return this._dnd ? this._dnd.removeDropzone(a) : void 0
        },getItemByFileId: function(a) {
            return this._templating.getFileContainer(a)
        },reset: function() {
            this._parent.prototype.reset.apply(this, arguments), this._templating.reset(), !this._options.button && this._templating.getButton() && (this._defaultButtonId = this._createUploadButton({element: this._templating.getButton()}).getButtonId()), this._dnd && (this._dnd.dispose(), this._dnd = this._setupDragAndDrop()), this._totalFilesInBatch = 0, this._filesInBatchAddedToUi = 0, this._setupClickAndEditEventHandlers()
        },setName: function(a, b) {
            var c = this._options.formatFileName(b);
            this._parent.prototype.setName.apply(this, arguments), this._templating.updateFilename(a, c)
        },pauseUpload: function(a) {
            var b = this._parent.prototype.pauseUpload.apply(this, arguments);
            return b && this._templating.uploadPaused(a), b
        },continueUpload: function(a) {
            var b = this._parent.prototype.continueUpload.apply(this, arguments);
            return b && this._templating.uploadContinued(a), b
        },getId: function(a) {
            return this._templating.getFileId(a)
        },getDropTarget: function(a) {
            var b = this.getFile(a);
            return b.qqDropTarget
        }}, qq.uiPrivateApi = {_getButton: function(a) {
            var b = this._parent.prototype._getButton.apply(this, arguments);
            return b || a === this._defaultButtonId && (b = this._templating.getButton()), b
        },_removeFileItem: function(a) {
            this._templating.removeFile(a)
        },_setupClickAndEditEventHandlers: function() {
            this._fileButtonsClickHandler = qq.FileButtonsClickHandler && this._bindFileButtonsClickEvent(), this._focusinEventSupported = !qq.firefox(), this._isEditFilenameEnabled() && (this._filenameClickHandler = this._bindFilenameClickEvent(), this._filenameInputFocusInHandler = this._bindFilenameInputFocusInEvent(), this._filenameInputFocusHandler = this._bindFilenameInputFocusEvent())
        },_setupDragAndDrop: function() {
            var a = this, b = this._options.dragAndDrop.extraDropzones, c = this._templating, d = c.getDropZone();
            return d && b.push(d), new qq.DragAndDrop({dropZoneElements: b,allowMultipleItems: this._options.multiple,classes: {dropActive: this._options.classes.dropActive},callbacks: {processingDroppedFiles: function() {
                        c.showDropProcessing()
                    },processingDroppedFilesComplete: function(b, d) {
                        c.hideDropProcessing(), qq.each(b, function(a, b) {
                            b.qqDropTarget = d
                        }), b.length && a.addFiles(b, null, null)
                    },dropError: function(b, c) {
                        a._itemError(b, c)
                    },dropLog: function(b, c) {
                        a.log(b, c)
                    }}})
        },_bindFileButtonsClickEvent: function() {
            var a = this;
            return new qq.FileButtonsClickHandler({templating: this._templating,log: function(b, c) {
                    a.log(b, c)
                },onDeleteFile: function(b) {
                    a.deleteFile(b)
                },onCancel: function(b) {
                    a.cancel(b)
                },onRetry: function(b) {
                    qq(a._templating.getFileContainer(b)).removeClass(a._classes.retryable), a._templating.hideRetry(b), a.retry(b)
                },onPause: function(b) {
                    a.pauseUpload(b)
                },onContinue: function(b) {
                    a.continueUpload(b)
                },onGetName: function(b) {
                    return a.getName(b)
                }})
        },_isEditFilenameEnabled: function() {
            return this._templating.isEditFilenamePossible() && !this._options.autoUpload && qq.FilenameClickHandler && qq.FilenameInputFocusHandler && qq.FilenameInputFocusHandler
        },_filenameEditHandler: function() {
            var a = this, b = this._templating;
            return {templating: b,log: function(b, c) {
                    a.log(b, c)
                },onGetUploadStatus: function(b) {
                    return a.getUploads({id: b}).status
                },onGetName: function(b) {
                    return a.getName(b)
                },onSetName: function(b, c) {
                    a.setName(b, c)
                },onEditingStatusChange: function(a, c) {
                    var d = qq(b.getEditInput(a)), e = qq(b.getFileContainer(a));
                    c ? (d.addClass("qq-editing"), b.hideFilename(a), b.hideEditIcon(a)) : (d.removeClass("qq-editing"), b.showFilename(a), b.showEditIcon(a)), e.addClass("qq-temp").removeClass("qq-temp")
                }}
        },_onUploadStatusChange: function(a, b, c) {
            this._parent.prototype._onUploadStatusChange.apply(this, arguments), this._isEditFilenameEnabled() && this._templating.getFileContainer(a) && c !== qq.status.SUBMITTED && (this._templating.markFilenameEditable(a), this._templating.hideEditIcon(a))
        },_bindFilenameInputFocusInEvent: function() {
            var a = qq.extend({}, this._filenameEditHandler());
            return new qq.FilenameInputFocusInHandler(a)
        },_bindFilenameInputFocusEvent: function() {
            var a = qq.extend({}, this._filenameEditHandler());
            return new qq.FilenameInputFocusHandler(a)
        },_bindFilenameClickEvent: function() {
            var a = qq.extend({}, this._filenameEditHandler());
            return new qq.FilenameClickHandler(a)
        },_storeForLater: function(a) {
            this._parent.prototype._storeForLater.apply(this, arguments), this._templating.hideSpinner(a)
        },_onAllComplete: function() {
            this._parent.prototype._onAllComplete.apply(this, arguments), this._templating.resetTotalProgress()
        },_onSubmit: function(a, b) {
            var c = this.getFile(a);
            c && c.qqPath && this._options.dragAndDrop.reportDirectoryPaths && this._paramsStore.addReadOnly(a, {qqpath: c.qqPath}), this._parent.prototype._onSubmit.apply(this, arguments), this._addToList(a, b)
        },_onSubmitted: function(a) {
            this._isEditFilenameEnabled() && (this._templating.markFilenameEditable(a), this._templating.showEditIcon(a), this._focusinEventSupported || this._filenameInputFocusHandler.addHandler(this._templating.getEditInput(a)))
        },_onProgress: function(a, b, c, d) {
            this._parent.prototype._onProgress.apply(this, arguments), this._templating.updateProgress(a, c, d), 100 === Math.round(100 * (c / d)) ? (this._templating.hideCancel(a), this._templating.hidePause(a), this._templating.hideProgress(a), this._templating.setStatusText(a, this._options.text.waitingForResponse), this._displayFileSize(a)) : this._displayFileSize(a, c, d)
        },_onTotalProgress: function(a, b) {
            this._parent.prototype._onTotalProgress.apply(this, arguments), this._templating.updateTotalProgress(a, b)
        },_onComplete: function(a, b, c) {
            function d(b) {
                g && (f.setStatusText(a), qq(g).removeClass(h._classes.retrying), f.hideProgress(a), (!h._options.disableCancelForFormUploads || qq.supportedFeatures.ajaxUploading) && f.hideCancel(a), f.hideSpinner(a), b.success ? h._markFileAsSuccessful(a) : (qq(g).addClass(h._classes.fail), f.isRetryPossible() && !h._preventRetries[a] && (qq(g).addClass(h._classes.retryable), f.showRetry(a)), h._controlFailureTextDisplay(a, b)))
            }
            var e = this._parent.prototype._onComplete.apply(this, arguments), f = this._templating, g = f.getFileContainer(a), h = this;
            return e instanceof qq.Promise ? e.done(function(a) {
                d(a)
            }) : d(c), e
        },_markFileAsSuccessful: function(a) {
            var b = this._templating;
            this._isDeletePossible() && b.showDeleteButton(a), qq(b.getFileContainer(a)).addClass(this._classes.success), this._maybeUpdateThumbnail(a)
        },_onUploadPrep: function(a) {
            this._parent.prototype._onUploadPrep.apply(this, arguments), this._templating.showSpinner(a)
        },_onUpload: function(a) {
            var b = this._parent.prototype._onUpload.apply(this, arguments);
            return this._templating.showSpinner(a), b
        },_onUploadChunk: function(a, b) {
            this._parent.prototype._onUploadChunk.apply(this, arguments), b.partIndex > 0 && this._handler.isResumable(a) && this._templating.allowPause(a)
        },_onCancel: function(a) {
            this._parent.prototype._onCancel.apply(this, arguments), this._removeFileItem(a), 0 === this._getNotFinished() && this._templating.resetTotalProgress()
        },_onBeforeAutoRetry: function(a) {
            var b, c, d;
            this._parent.prototype._onBeforeAutoRetry.apply(this, arguments), this._showCancelLink(a), this._options.retry.showAutoRetryNote && (b = this._autoRetries[a], c = this._options.retry.maxAutoAttempts, d = this._options.retry.autoRetryNote.replace(/\{retryNum\}/g, b), d = d.replace(/\{maxAuto\}/g, c), this._templating.setStatusText(a, d), qq(this._templating.getFileContainer(a)).addClass(this._classes.retrying))
        },_onBeforeManualRetry: function(a) {
            return this._parent.prototype._onBeforeManualRetry.apply(this, arguments) ? (this._templating.resetProgress(a), qq(this._templating.getFileContainer(a)).removeClass(this._classes.fail), this._templating.setStatusText(a), this._templating.showSpinner(a), this._showCancelLink(a), !0) : (qq(this._templating.getFileContainer(a)).addClass(this._classes.retryable), this._templating.showRetry(a), !1)
        },_onSubmitDelete: function(a) {
            var b = qq.bind(this._onSubmitDeleteSuccess, this);
            this._parent.prototype._onSubmitDelete.call(this, a, b)
        },_onSubmitDeleteSuccess: function() {
            this._options.deleteFile.forceConfirm ? this._showDeleteConfirm.apply(this, arguments) : this._sendDeleteRequest.apply(this, arguments)
        },_onDeleteComplete: function(a, b, c) {
            this._parent.prototype._onDeleteComplete.apply(this, arguments), this._templating.hideSpinner(a), c ? (this._templating.setStatusText(a, this._options.deleteFile.deletingFailedText), this._templating.showDeleteButton(a)) : this._removeFileItem(a)
        },_sendDeleteRequest: function(a) {
            this._templating.hideDeleteButton(a), this._templating.showSpinner(a), this._templating.setStatusText(a, this._options.deleteFile.deletingStatusText), this._deleteHandler.sendDelete.apply(this, arguments)
        },_showDeleteConfirm: function(a) {
            var b, c = this.getName(a), d = this._options.deleteFile.confirmMessage.replace(/\{filename\}/g, c), e = (this.getUuid(a), arguments), f = this;
            b = this._options.showConfirm(d), qq.isGenericPromise(b) ? b.then(function() {
                f._sendDeleteRequest.apply(f, e)
            }) : b !== !1 && f._sendDeleteRequest.apply(f, e)
        },_addToList: function(a, b, c) {
            var d, e = 0, f = this._handler.isProxied(a) && this._options.scaling.hideScaled;
            f || (this._options.display.prependFiles && (this._totalFilesInBatch > 1 && this._filesInBatchAddedToUi > 0 && (e = this._filesInBatchAddedToUi - 1), d = {index: e}), c || (this._options.disableCancelForFormUploads && !qq.supportedFeatures.ajaxUploading && this._templating.disableCancel(), this._options.multiple || (this._handler.cancelAll(), this._clearList())), this._templating.addFile(a, this._options.formatFileName(b), d), c ? this._thumbnailUrls[a] && this._templating.updateThumbnail(a, this._thumbnailUrls[a], !0) : this._templating.generatePreview(a, this.getFile(a)), this._filesInBatchAddedToUi += 1, (c || this._options.display.fileSizeOnSubmit && qq.supportedFeatures.ajaxUploading) && this._displayFileSize(a))
        },_clearList: function() {
            this._templating.clearFiles(), this.clearStoredFiles()
        },_displayFileSize: function(a, b, c) {
            var d = this.getSize(a), e = this._formatSize(d);
            d >= 0 && (void 0 !== b && void 0 !== c && (e = this._formatProgress(b, c)), this._templating.updateSize(a, e))
        },_formatProgress: function(a, b) {
            function c(a, b) {
                d = d.replace(a, b)
            }
            var d = this._options.text.formatProgress;
            return c("{percent}", Math.round(100 * (a / b))), c("{total_size}", this._formatSize(b)), d
        },_controlFailureTextDisplay: function(a, b) {
            var c, d, e, f, g;
            c = this._options.failedUploadTextDisplay.mode, d = this._options.failedUploadTextDisplay.maxChars, e = this._options.failedUploadTextDisplay.responseProperty, "custom" === c ? (f = b[e], f ? f.length > d && (g = f.substring(0, d) + "...") : f = this._options.text.failUpload, this._templating.setStatusText(a, g || f), this._options.failedUploadTextDisplay.enableTooltip && this._showTooltip(a, f)) : "default" === c ? this._templating.setStatusText(a, this._options.text.failUpload) : "none" !== c && this.log("failedUploadTextDisplay.mode value of '" + c + "' is not valid", "warn")
        },_showTooltip: function(a, b) {
            this._templating.getFileContainer(a).title = b
        },_showCancelLink: function(a) {
            (!this._options.disableCancelForFormUploads || qq.supportedFeatures.ajaxUploading) && this._templating.showCancel(a)
        },_itemError: function() {
            var a = this._parent.prototype._itemError.apply(this, arguments);
            this._options.showMessage(a)
        },_batchError: function(a) {
            this._parent.prototype._batchError.apply(this, arguments), this._options.showMessage(a)
        },_setupPastePrompt: function() {
            var a = this;
            this._options.callbacks.onPasteReceived = function() {
                var b = a._options.paste.namePromptMessage, c = a._options.paste.defaultName;
                return a._options.showPrompt(b, c)
            }
        },_fileOrBlobRejected: function() {
            this._totalFilesInBatch -= 1, this._parent.prototype._fileOrBlobRejected.apply(this, arguments)
        },_prepareItemsForUpload: function(a) {
            this._totalFilesInBatch = a.length, this._filesInBatchAddedToUi = 0, this._parent.prototype._prepareItemsForUpload.apply(this, arguments)
        },_maybeUpdateThumbnail: function(a) {
            var b = this._thumbnailUrls[a];
            this._templating.updateThumbnail(a, b)
        },_addCannedFile: function() {
            var a = this._parent.prototype._addCannedFile.apply(this, arguments);
            return this._addToList(a, this.getName(a), !0), this._templating.hideSpinner(a), this._templating.hideCancel(a), this._markFileAsSuccessful(a), a
        },_setSize: function(a, b) {
            this._parent.prototype._setSize.apply(this, arguments), this._templating.updateSize(a, this._formatSize(b))
        }}
}(), qq.FineUploader = function(a, b) {
    "use strict";
    this._parent = b ? qq[b].FineUploaderBasic : qq.FineUploaderBasic, this._parent.apply(this, arguments), qq.extend(this._options, {element: null,button: null,listElement: null,dragAndDrop: {extraDropzones: [],reportDirectoryPaths: !1},text: {formatProgress: "{percent}% of {total_size}",failUpload: "Upload failed",waitingForResponse: "Processing...",paused: "Paused"},template: "qq-template",classes: {retrying: "qq-upload-retrying",retryable: "qq-upload-retryable",success: "qq-upload-success",fail: "qq-upload-fail",editable: "qq-editable",hide: "qq-hide",dropActive: "qq-upload-drop-area-active"},failedUploadTextDisplay: {mode: "default",maxChars: 50,responseProperty: "error",enableTooltip: !0},messages: {tooManyFilesError: "You may only drop one file",unsupportedBrowser: "Unrecoverable error - this browser does not permit file uploading of any kind."},retry: {showAutoRetryNote: !0,autoRetryNote: "Retrying {retryNum}/{maxAuto}..."},deleteFile: {forceConfirm: !1,confirmMessage: "Are you sure you want to delete {filename}?",deletingStatusText: "Deleting...",deletingFailedText: "Delete failed"},display: {fileSizeOnSubmit: !1,prependFiles: !1},paste: {promptForName: !1,namePromptMessage: "Please name this image"},thumbnails: {placeholders: {waitUntilResponse: !1,notAvailablePath: null,waitingPath: null}},scaling: {hideScaled: !1},showMessage: function(a) {
            setTimeout(function() {
                window.alert(a)
            }, 0)
        },showConfirm: function(a) {
            return window.confirm(a)
        },showPrompt: function(a, b) {
            return window.prompt(a, b)
        }}, !0), qq.extend(this._options, a, !0), this._templating = new qq.Templating({log: qq.bind(this.log, this),templateIdOrEl: this._options.template,containerEl: this._options.element,fileContainerEl: this._options.listElement,button: this._options.button,imageGenerator: this._imageGenerator,classes: {hide: this._options.classes.hide,editable: this._options.classes.editable},placeholders: {waitUntilUpdate: this._options.thumbnails.placeholders.waitUntilResponse,thumbnailNotAvailable: this._options.thumbnails.placeholders.notAvailablePath,waitingForThumbnail: this._options.thumbnails.placeholders.waitingPath},text: this._options.text}), !qq.supportedFeatures.uploading || this._options.cors.expected && !qq.supportedFeatures.uploadCors ? this._templating.renderFailure(this._options.messages.unsupportedBrowser) : (this._wrapCallbacks(), this._templating.render(), this._classes = this._options.classes, !this._options.button && this._templating.getButton() && (this._defaultButtonId = this._createUploadButton({element: this._templating.getButton()}).getButtonId()), this._setupClickAndEditEventHandlers(), qq.DragAndDrop && qq.supportedFeatures.fileDrop && (this._dnd = this._setupDragAndDrop()), this._options.paste.targetElement && this._options.paste.promptForName && (qq.PasteSupport ? this._setupPastePrompt() : this.log("Paste support module not found.", "error")), this._totalFilesInBatch = 0, this._filesInBatchAddedToUi = 0)
}, qq.extend(qq.FineUploader.prototype, qq.basePublicApi), qq.extend(qq.FineUploader.prototype, qq.basePrivateApi), qq.extend(qq.FineUploader.prototype, qq.uiPublicApi), qq.extend(qq.FineUploader.prototype, qq.uiPrivateApi), qq.Templating = function(a) {
    "use strict";
    function b() {
        var a, b, c, d, e, f, g, h, i;
        if (A("Parsing template"), null == P.templateIdOrEl)
            throw new Error("You MUST specify either a template element or ID!");
        if (qq.isString(P.templateIdOrEl)) {
            if (a = document.getElementById(P.templateIdOrEl), null === a)
                throw new Error(qq.format("Cannot find template script at ID '{}'!", P.templateIdOrEl));
            b = a.innerHTML
        } else {
            if (void 0 === P.templateIdOrEl.innerHTML)
                throw new Error("You have specified an invalid value for the template option!  It must be an ID or an Element.");
            b = P.templateIdOrEl.innerHTML
        }
        if (b = qq.trimStr(b), d = document.createElement("div"), d.appendChild(qq.toElement(b)), P.button && (f = qq(d).getByClass(Q.button)[0], f && qq(f).remove()), qq.DragAndDrop && qq.supportedFeatures.fileDrop || (i = qq(d).getByClass(Q.dropProcessing)[0], i && qq(i).remove()), g = qq(d).getByClass(Q.drop)[0], g && !qq.DragAndDrop && (A("DnD module unavailable.", "info"), qq(g).remove()), g && !qq.supportedFeatures.fileDrop && qq(g).hasAttribute(M) && qq(g).css({display: "none"}), h = qq(d).getByClass(Q.thumbnail)[0], G ? h && (O = parseInt(h.getAttribute(K)), O = O > 0 ? O : null, H = qq(h).hasAttribute(L)) : h && qq(h).remove(), G = G && h, B = qq(d).getByClass(Q.editFilenameInput).length > 0, C = qq(d).getByClass(Q.retry).length > 0, c = qq(d).getByClass(Q.list)[0], null == c)
            throw new Error("Could not find the file list container in the template!");
        return e = c.innerHTML, c.innerHTML = "", A("Template parsing complete"), {template: qq.trimStr(d.innerHTML),fileTemplate: qq.trimStr(e)}
    }
    function c(a) {
        return qq(F).getByClass(J + a)[0]
    }
    function d(a, b) {
        return a && qq(a).getByClass(b)[0]
    }
    function e(a, b) {
        var c = F, d = c.firstChild;
        b > 0 && (d = qq(c).children()[b].nextSibling), c.insertBefore(a, d)
    }
    function f(a) {
        return d(c(a), Q.cancel)
    }
    function g(a) {
        return d(c(a), Q.pause)
    }
    function h(a) {
        return d(c(a), Q.continueButton)
    }
    function i(a) {
        return null == a ? d(E, Q.totalProgressBarContainer) || d(E, Q.totalProgressBar) : d(c(a), Q.progressBarContainer) || d(c(a), Q.progressBar)
    }
    function j(a) {
        return d(c(a), Q.spinner)
    }
    function k(a) {
        return d(c(a), Q.editNameIcon)
    }
    function l(a) {
        return d(c(a), Q.size)
    }
    function m(a) {
        return d(c(a), Q.deleteButton)
    }
    function n(a) {
        return d(c(a), Q.retry)
    }
    function o(a) {
        return d(c(a), Q.file)
    }
    function p() {
        return d(E, Q.dropProcessing)
    }
    function q(a) {
        return G && d(c(a), Q.thumbnail)
    }
    function r(a) {
        a && qq(a).addClass(P.classes.hide)
    }
    function s(a) {
        a && qq(a).removeClass(P.classes.hide)
    }
    function t(a, b) {
        var c = i(a), d = null == a ? Q.totalProgressBar : Q.progressBar;
        c && !qq(c).hasClass(d) && (c = qq(c).getByClass(d)[0]), c && qq(c).css({width: b + "%"})
    }
    function u() {
        var a = P.placeholders.thumbnailNotAvailable, b = P.placeholders.waitingForThumbnail, c = {maxSize: O,scale: H};
        G && (a ? P.imageGenerator.generate(a, new Image, c).then(function(a) {
            S.success(a)
        }, function() {
            S.failure(), A("Problem loading 'not available' placeholder image at " + a, "error")
        }) : S.failure(), b ? P.imageGenerator.generate(b, new Image, c).then(function(a) {
            T.success(a)
        }, function() {
            T.failure(), A("Problem loading 'waiting for thumbnail' placeholder image at " + b, "error")
        }) : T.failure())
    }
    function v(a) {
        var b = new qq.Promise;
        return T.then(function(c) {
            x(c, a), a.src ? b.success() : (a.src = c.src, a.onload = function() {
                s(a), b.success()
            })
        }, function() {
            r(a), b.success()
        }), b
    }
    function w(a, b) {
        var c = R[a] || (new qq.Promise).failure(), d = new qq.Promise;
        return S.then(function(a) {
            c.then(function() {
                d.success()
            }, function() {
                x(a, b), b.onload = function() {
                    d.success()
                }, b.src = a.src, s(b)
            })
        }), d
    }
    function x(a, b) {
        var c = a.style.maxWidth, d = a.style.maxHeight;
        d && c && !b.style.maxWidth && !b.style.maxHeight && qq(b).css({maxWidth: c,maxHeight: d})
    }
    function y(a, b) {
        var c = q(a), d = q(b);
        A(qq.format("ID {} is the same file as ID {}.  Will use generated thumbnail from ID {} instead.", a, b, b)), R[b].then(function() {
            R[a].success(), A(qq.format("Now using previously generated thumbnail created for ID {} on ID {}.", b, a)), c.src = d.src, s(c)
        }, function() {
            R[a].failure(), P.placeholders.waitUntilUpdate || w(a, c)
        })
    }
    function z(a, b, c) {
        var d = q(a);
        return A("Generating new thumbnail for " + a), b.qqThumbnailId = a, P.imageGenerator.generate(b, d, c).then(function() {
            s(d), R[a].success()
        }, function() {
            R[a].failure(), P.placeholders.waitUntilUpdate || w(a, d)
        })
    }
    var A, B, C, D, E, F, G, H, I = "qq-file-id", J = "qq-file-id-", K = "qq-max-size", L = "qq-server-scale", M = "qq-hide-dropzone", N = !1, O = -1, P = {log: null,templateIdOrEl: "qq-template",containerEl: null,fileContainerEl: null,button: null,imageGenerator: null,classes: {hide: "qq-hide",editable: "qq-editable"},placeholders: {waitUntilUpdate: !1,thumbnailNotAvailable: null,waitingForThumbnail: null},text: {paused: "Paused"}}, Q = {button: "qq-upload-button-selector",drop: "qq-upload-drop-area-selector",list: "qq-upload-list-selector",progressBarContainer: "qq-progress-bar-container-selector",progressBar: "qq-progress-bar-selector",totalProgressBarContainer: "qq-total-progress-bar-container-selector",totalProgressBar: "qq-total-progress-bar-selector",file: "qq-upload-file-selector",spinner: "qq-upload-spinner-selector",size: "qq-upload-size-selector",cancel: "qq-upload-cancel-selector",pause: "qq-upload-pause-selector",continueButton: "qq-upload-continue-selector",deleteButton: "qq-upload-delete-selector",retry: "qq-upload-retry-selector",statusText: "qq-upload-status-text-selector",editFilenameInput: "qq-edit-filename-selector",editNameIcon: "qq-edit-filename-icon-selector",dropProcessing: "qq-drop-processing-selector",dropProcessingSpinner: "qq-drop-processing-spinner-selector",thumbnail: "qq-thumbnail-selector"}, R = {}, S = new qq.Promise, T = new qq.Promise;
    qq.extend(P, a), A = P.log, E = P.containerEl, G = void 0 !== P.imageGenerator, D = b(), u(), qq.extend(this, {render: function() {
            A("Rendering template in DOM."), E.innerHTML = D.template, r(p()), this.hideTotalProgress(), F = P.fileContainerEl || d(E, Q.list), A("Template rendering complete")
        },renderFailure: function(a) {
            var b = qq.toElement(a);
            E.innerHTML = "", E.appendChild(b)
        },reset: function() {
            this.render()
        },clearFiles: function() {
            F.innerHTML = ""
        },disableCancel: function() {
            N = !0
        },addFile: function(a, b, c) {
            var f = qq.toElement(D.fileTemplate), j = d(f, Q.file);
            qq(f).addClass(J + a), j && qq(j).setText(b), f.setAttribute(I, a), c ? e(f, c.index) : F.appendChild(f), r(i(a)), r(l(a)), r(m(a)), r(n(a)), r(g(a)), r(h(a)), N && this.hideCancel(a)
        },removeFile: function(a) {
            qq(c(a)).remove()
        },getFileId: function(a) {
            var b = a;
            if (b) {
                for (; null == b.getAttribute(I); )
                    b = b.parentNode;
                return parseInt(b.getAttribute(I))
            }
        },getFileList: function() {
            return F
        },markFilenameEditable: function(a) {
            var b = o(a);
            b && qq(b).addClass(P.classes.editable)
        },updateFilename: function(a, b) {
            var c = o(a);
            c && qq(c).setText(b)
        },hideFilename: function(a) {
            r(o(a))
        },showFilename: function(a) {
            s(o(a))
        },isFileName: function(a) {
            return qq(a).hasClass(Q.file)
        },getButton: function() {
            return P.button || d(E, Q.button)
        },hideDropProcessing: function() {
            r(p())
        },showDropProcessing: function() {
            s(p())
        },getDropZone: function() {
            return d(E, Q.drop)
        },isEditFilenamePossible: function() {
            return B
        },hideRetry: function(a) {
            r(n(a))
        },isRetryPossible: function() {
            return C
        },showRetry: function(a) {
            s(n(a))
        },getFileContainer: function(a) {
            return c(a)
        },showEditIcon: function(a) {
            var b = k(a);
            b && qq(b).addClass(P.classes.editable)
        },hideEditIcon: function(a) {
            var b = k(a);
            b && qq(b).removeClass(P.classes.editable)
        },isEditIcon: function(a) {
            return qq(a).hasClass(Q.editNameIcon)
        },getEditInput: function(a) {
            return d(c(a), Q.editFilenameInput)
        },isEditInput: function(a) {
            return qq(a).hasClass(Q.editFilenameInput)
        },updateProgress: function(a, b, c) {
            var d, e = i(a);
            e && (d = Math.round(100 * (b / c)), 100 === d ? r(e) : s(e), t(a, d))
        },updateTotalProgress: function(a, b) {
            this.updateProgress(null, a, b)
        },hideProgress: function(a) {
            var b = i(a);
            b && r(b)
        },hideTotalProgress: function() {
            this.hideProgress()
        },resetProgress: function(a) {
            t(a, 0)
        },resetTotalProgress: function() {
            this.resetProgress()
        },showCancel: function(a) {
            if (!N) {
                var b = f(a);
                b && qq(b).removeClass(P.classes.hide)
            }
        },hideCancel: function(a) {
            r(f(a))
        },isCancel: function(a) {
            return qq(a).hasClass(Q.cancel)
        },allowPause: function(a) {
            s(g(a)), r(h(a))
        },uploadPaused: function(a) {
            this.setStatusText(a, P.text.paused), this.allowContinueButton(a), r(j(a))
        },hidePause: function(a) {
            r(g(a))
        },isPause: function(a) {
            return qq(a).hasClass(Q.pause)
        },isContinueButton: function(a) {
            return qq(a).hasClass(Q.continueButton)
        },allowContinueButton: function(a) {
            s(h(a)), r(g(a))
        },uploadContinued: function(a) {
            this.setStatusText(a, ""), this.allowPause(a), s(j(a))
        },showDeleteButton: function(a) {
            s(m(a))
        },hideDeleteButton: function(a) {
            r(m(a))
        },isDeleteButton: function(a) {
            return qq(a).hasClass(Q.deleteButton)
        },isRetry: function(a) {
            return qq(a).hasClass(Q.retry)
        },updateSize: function(a, b) {
            var c = l(a);
            c && (s(c), qq(c).setText(b))
        },setStatusText: function(a, b) {
            var e = d(c(a), Q.statusText);
            e && (null == b ? qq(e).clearText() : qq(e).setText(b))
        },hideSpinner: function(a) {
            r(j(a))
        },showSpinner: function(a) {
            s(j(a))
        },generatePreview: function(a, b) {
            var c = b && b.qqThumbnailId, d = q(a), e = {maxSize: O,scale: !0,orient: !0};
            qq.supportedFeatures.imagePreviews ? d && v(d).done(function() {
                R[a] = new qq.Promise, null != c ? y(a, c) : z(a, b, e)
            }) : d && v(d)
        },updateThumbnail: function(a, b, c) {
            var d = q(a), e = {maxSize: O,scale: H};
            if (d) {
                if (b)
                    return c && v(d), P.imageGenerator.generate(b, d, e).then(function() {
                        s(d)
                    }, function() {
                        w(a, d)
                    });
                w(a, d)
            }
        }})
}, qq.traditional = qq.traditional || {}, qq.traditional.FormUploadHandler = function(a, b) {
    "use strict";
    function c(a) {
        var b = {};
        try {
            b = qq.parseJson(a)
        } catch (c) {
            i("Error when attempting to parse iframe upload response (" + c.message + ")", "error")
        }
        return b
    }
    function d(a, b) {
        var d;
        try {
            var e = b.contentDocument || b.contentWindow.document, f = e.body.innerHTML;
            i("converting iframe's innerHTML to JSON"), i("innerHTML = " + f), f && f.match(/^<pre/i) && (f = e.body.firstChild.firstChild.nodeValue), d = c(f)
        } catch (g) {
            i("Error when attempting to parse form upload response (" + g.message + ")", "error"), d = {success: !1}
        }
        return d
    }
    function e(b, c) {
        var d = a.paramsStore.get(b), e = a.demoMode ? "GET" : "POST", i = a.endpointStore.get(b), j = g(b);
        return d[a.uuidName] = h(b), d[a.filenameParam] = j, f._initFormForUpload({method: e,endpoint: i,params: d,paramsInBody: a.paramsInBody,targetName: c.name})
    }
    var f = this, g = b.getName, h = b.getUuid, i = b.log;
    this.uploadFile = function(b) {
        var c, g = f.getInput(b), h = f._createIframe(b), j = new qq.Promise;
        return c = e(b, h), c.appendChild(g), f._attachLoadEvent(h, function(c) {
            i("iframe loaded");
            var e = c ? c : d(b, h);
            f._detachLoadEvent(b), a.cors.expected || qq(h).remove(), e.success ? j.success(e) : j.failure(e)
        }), i("Sending upload request for " + b), c.submit(), qq(c).remove(), j
    }, qq.extend(this, new qq.FormUploadHandler({options: {isCors: a.cors.expected,inputName: a.inputName},proxy: {onCancel: a.onCancel,getName: g,getUuid: h,log: i}}))
}, qq.traditional = qq.traditional || {}, qq.traditional.XhrUploadHandler = function(a, b) {
    "use strict";
    var c = this, d = b.getName, e = b.getSize, f = b.getUuid, g = b.log, h = a.forceMultipart || a.paramsInBody, i = function(b, c, f) {
        var g = e(b), i = d(b);
        c[a.chunking.paramNames.partIndex] = f.part, c[a.chunking.paramNames.partByteOffset] = f.start, c[a.chunking.paramNames.chunkSize] = f.size, c[a.chunking.paramNames.totalParts] = f.count, c[a.totalFileSizeName] = g, h && (c[a.filenameParam] = i)
    }, j = new qq.traditional.AllChunksDoneAjaxRequester({cors: a.cors,endpoint: a.chunking.success.endpoint,log: g}), k = function(a, b) {
        var c = new qq.Promise;
        return b.onreadystatechange = function() {
            if (4 === b.readyState) {
                var d = n(a, b);
                d.success ? c.success(d.response, b) : c.failure(d.response, b)
            }
        }, c
    }, l = function(b) {
        var g = a.paramsStore.get(b), h = d(b), i = e(b);
        return g[a.uuidName] = f(b), g[a.filenameParam] = h, g[a.totalFileSizeName] = i, g[a.chunking.paramNames.totalParts] = c._getTotalChunks(b), g
    }, m = function(a, b) {
        return 200 !== a.status || !b.success || b.reset
    }, n = function(a, b) {
        var c;
        return g("xhr - server response received for " + a), g("responseText = " + b.responseText), c = o(b, !0), {success: !m(b, c),response: c}
    }, o = function(a, b) {
        var c = {};
        try {
            g(qq.format("Received response status {} with body: {}", a.status, a.responseText)), c = qq.parseJson(a.responseText)
        } catch (d) {
            b && g("Error when attempting to parse xhr response text (" + d.message + ")", "error")
        }
        return c
    }, p = function(b) {
        var d = new qq.Promise;
        return j.complete(b, c._createXhr(b), l(b), a.customHeaders.get(b)).then(function(a) {
            d.success(o(a), a)
        }, function(a) {
            d.failure(o(a), a)
        }), d
    }, q = function(b, c, g, i) {
        var j = new FormData, k = a.demoMode ? "GET" : "POST", l = a.endpointStore.get(i), m = d(i), n = e(i);
        return b[a.uuidName] = f(i), b[a.filenameParam] = m, h && (b[a.totalFileSizeName] = n), a.paramsInBody || (h || (b[a.inputName] = m), l = qq.obj2url(b, l)), c.open(k, l, !0), a.cors.expected && a.cors.sendCredentials && (c.withCredentials = !0), h ? (a.paramsInBody && qq.obj2FormData(b, j), j.append(a.inputName, g), j) : g
    }, r = function(b, d) {
        var e = a.customHeaders.get(b), f = c.getFile(b);
        d.setRequestHeader("Accept", "application/json"), d.setRequestHeader("X-Requested-With", "XMLHttpRequest"), d.setRequestHeader("Cache-Control", "no-cache"), h || (d.setRequestHeader("Content-Type", "application/octet-stream"), d.setRequestHeader("X-Mime-Type", f.type)), qq.each(e, function(a, b) {
            d.setRequestHeader(a, b)
        })
    };
    qq.extend(this, {uploadChunk: function(b, d, f) {
            var g, h, j, l = c._getChunkData(b, d), m = c._createXhr(b, d);
            return e(b), g = k(b, m), c._registerProgressHandler(b, d, l.size), j = a.paramsStore.get(b), i(b, j, l), f && (j[a.resume.paramNames.resuming] = !0), h = q(j, m, l.blob, b), r(b, m), m.send(h), g
        },uploadFile: function(b) {
            var d, e, f, g, h = c.getFile(b);
            return e = c._createXhr(b), c._registerProgressHandler(b), d = k(b, e), f = a.paramsStore.get(b), g = q(f, e, h, b), r(b, e), e.send(g), d
        }}), qq.extend(this, new qq.XhrUploadHandler({options: qq.extend({namespace: "traditional"}, a),proxy: qq.extend({getEndpoint: a.endpointStore.get}, b)})), qq.override(this, function(b) {
        return {finalizeChunks: function(c) {
                return a.chunking.success.endpoint ? p(c) : b.finalizeChunks(c)
            }}
    })
}, qq.traditional.AllChunksDoneAjaxRequester = function(a) {
    "use strict";
    var b, c = "POST", d = {cors: {allowXdr: !1,expected: !1,sendCredentials: !1},endpoint: null,log: function() {
        }}, e = {}, f = {get: function() {
            return d.endpoint
        }};
    qq.extend(d, a), b = qq.extend(this, new qq.AjaxRequester({acceptHeader: "application/json",validMethods: [c],method: c,successfulResponseCodes: function() {
            var a = {};
            return a[c] = [200, 201, 202], a
        }(),endpointStore: f,allowXRequestedWithAndCacheControl: !1,cors: d.cors,log: d.log,onComplete: function(a, b, c) {
            var d = e[a];
            delete e[a], c ? d.failure(b) : d.success(b)
        }})), qq.extend(this, {complete: function(a, c, f, g) {
            var h = new qq.Promise;
            return d.log("Submitting All Chunks Done request for " + a), e[a] = h, b.initTransport(a).withParams(f).withHeaders(g).send(c), h
        }})
}, qq.PasteSupport = function(a) {
    "use strict";
    function b(a) {
        return a.type && 0 === a.type.indexOf("image/")
    }
    function c() {
        qq(e.targetElement).attach("paste", function(a) {
            var c = a.clipboardData;
            c && qq.each(c.items, function(a, c) {
                if (b(c)) {
                    var d = c.getAsFile();
                    e.callbacks.pasteReceived(d)
                }
            })
        })
    }
    function d() {
        f && f()
    }
    var e, f;
    e = {targetElement: null,callbacks: {log: function() {
            },pasteReceived: function() {
            }}}, qq.extend(e, a), c(), qq.extend(this, {reset: function() {
            d()
        }})
}, qq.DragAndDrop = function(a) {
    "use strict";
    function b(a, b) {
        var c = Array.prototype.slice.call(a);
        j.callbacks.dropLog("Grabbed " + a.length + " dropped files."), b.dropDisabled(!1), j.callbacks.processingDroppedFilesComplete(c, b.getElement())
    }
    function c(a) {
        var b = new qq.Promise;
        return a.isFile ? a.file(function(c) {
            var d = a.name, e = a.fullPath, f = e.indexOf(d);
            e = e.substr(0, f), "/" === e.charAt(0) && (e = e.substr(1)), c.qqPath = e, n.push(c), b.success()
        }, function(c) {
            j.callbacks.dropLog("Problem parsing '" + a.fullPath + "'.  FileError code " + c.code + ".", "error"), b.failure()
        }) : a.isDirectory && d(a).then(function(a) {
            var d = a.length;
            qq.each(a, function(a, e) {
                c(e).done(function() {
                    d -= 1, 0 === d && b.success()
                })
            }), a.length || b.success()
        }, function(c) {
            j.callbacks.dropLog("Problem parsing '" + a.fullPath + "'.  FileError code " + c.code + ".", "error"), b.failure()
        }), b
    }
    function d(a, b, c, e) {
        var f = e || new qq.Promise, g = b || a.createReader();
        return g.readEntries(function(b) {
            var e = c ? c.concat(b) : b;
            b.length ? setTimeout(function() {
                d(a, g, e, f)
            }, 0) : f.success(e)
        }, f.failure), f
    }
    function e(a, b) {
        var d = [], e = new qq.Promise;
        return j.callbacks.processingDroppedFiles(), b.dropDisabled(!0), a.files.length > 1 && !j.allowMultipleItems ? (j.callbacks.processingDroppedFilesComplete([]), j.callbacks.dropError("tooManyFilesError", ""), b.dropDisabled(!1), e.failure()) : (n = [], qq.isFolderDropSupported(a) ? qq.each(a.items, function(a, b) {
            var f = b.webkitGetAsEntry();
            f && (f.isFile ? n.push(b.getAsFile()) : d.push(c(f).done(function() {
                d.pop(), 0 === d.length && e.success()
            })))
        }) : n = a.files, 0 === d.length && e.success()), e
    }
    function f(a) {
        var c = new qq.UploadDropZone({HIDE_ZONES_EVENT_NAME: k,element: a,onEnter: function(b) {
                qq(a).addClass(j.classes.dropActive), b.stopPropagation()
            },onLeaveNotDescendants: function() {
                qq(a).removeClass(j.classes.dropActive)
            },onDrop: function(a) {
                e(a.dataTransfer, c).then(function() {
                    b(n, c)
                }, function() {
                    j.callbacks.dropLog("Drop event DataTransfer parsing failed.  No files will be uploaded.", "error")
                })
            }});
        return o.addDisposer(function() {
            c.dispose()
        }), qq(a).hasAttribute(l) && qq(a).hide(), m.push(c), c
    }
    function g(a) {
        var b;
        return qq.each(a.dataTransfer.types, function(a, c) {
            return "Files" === c ? (b = !0, !1) : void 0
        }), b
    }
    function h(a) {
        return qq.firefox() ? !a.relatedTarget : qq.safari() ? a.x < 0 || a.y < 0 : 0 === a.x && 0 === a.y
    }
    function i() {
        var a = j.dropZoneElements, b = function() {
            setTimeout(function() {
                qq.each(a, function(a, b) {
                    qq(b).hasAttribute(l) && qq(b).hide(), qq(b).removeClass(j.classes.dropActive)
                })
            }, 10)
        };
        qq.each(a, function(b, c) {
            var d = f(c);
            !a.length || qq.ie() && !qq.ie10() || o.attach(document, "dragenter", function(b) {
                !d.dropDisabled() && g(b) && qq.each(a, function(a, b) {
                    b instanceof HTMLElement && qq(b).css({display: "block"})
                })
            })
        }), o.attach(document, "dragleave", function(a) {
            h(a) && b()
        }), o.attach(qq(document).children()[0], "mouseenter", function() {
            b()
        }), o.attach(document, "drop", function(a) {
            a.preventDefault(), b()
        }), o.attach(document, k, b)
    }
    var j, k = "qq-hidezones", l = "qq-hide-dropzone", m = [], n = [], o = new qq.DisposeSupport;
    j = {dropZoneElements: [],allowMultipleItems: !0,classes: {dropActive: null},callbacks: new qq.DragAndDrop.callbacks}, qq.extend(j, a, !0), i(), qq.extend(this, {setupExtraDropzone: function(a) {
            j.dropZoneElements.push(a), f(a)
        },removeDropzone: function(a) {
            var b, c = j.dropZoneElements;
            for (b in c)
                if (c[b] === a)
                    return c.splice(b, 1)
        },dispose: function() {
            o.dispose(), qq.each(m, function(a, b) {
                b.dispose()
            })
        }})
}, qq.DragAndDrop.callbacks = function() {
    "use strict";
    return {processingDroppedFiles: function() {
        },processingDroppedFilesComplete: function() {
        },dropError: function(a, b) {
            qq.log("Drag & drop error code '" + a + " with these specifics: '" + b + "'", "error")
        },dropLog: function(a, b) {
            qq.log(a, b)
        }}
}, qq.UploadDropZone = function(a) {
    "use strict";
    function b() {
        return qq.safari() || qq.firefox() && qq.windows()
    }
    function c() {
        k || (b ? l.attach(document, "dragover", function(a) {
            a.preventDefault()
        }) : l.attach(document, "dragover", function(a) {
            a.dataTransfer && (a.dataTransfer.dropEffect = "none", a.preventDefault())
        }), k = !0)
    }
    function d(a) {
        if (qq.ie() && !qq.ie10())
            return !1;
        var b, c = a.dataTransfer, d = qq.safari();
        return b = qq.ie10() || qq.ie11() ? !0 : "none" !== c.effectAllowed, c && b && (c.files || !d && c.types.contains && c.types.contains("Files"))
    }
    function e(a) {
        return void 0 !== a && (j = a), j
    }
    function f() {
        function a() {
            b = document.createEvent("Event"), b.initEvent(h.HIDE_ZONES_EVENT_NAME, !0, !0)
        }
        var b;
        if (window.CustomEvent)
            try {
                b = new CustomEvent(h.HIDE_ZONES_EVENT_NAME)
            } catch (c) {
                a()
            }
        else
            a();
        document.dispatchEvent(b)
    }
    function g() {
        l.attach(i, "dragover", function(a) {
            if (d(a)) {
                var b = qq.ie() || qq.ie11() ? null : a.dataTransfer.effectAllowed;
                a.dataTransfer.dropEffect = "move" === b || "linkMove" === b ? "move" : "copy", a.stopPropagation(), a.preventDefault()
            }
        }), l.attach(i, "dragenter", function(a) {
            if (!e()) {
                if (!d(a))
                    return;
                h.onEnter(a)
            }
        }), l.attach(i, "dragleave", function(a) {
            if (d(a)) {
                h.onLeave(a);
                var b = document.elementFromPoint(a.clientX, a.clientY);
                qq(this).contains(b) || h.onLeaveNotDescendants(a)
            }
        }), l.attach(i, "drop", function(a) {
            if (!e()) {
                if (!d(a))
                    return;
                a.preventDefault(), a.stopPropagation(), h.onDrop(a), f()
            }
        })
    }
    var h, i, j, k, l = new qq.DisposeSupport;
    h = {element: null,onEnter: function() {
        },onLeave: function() {
        },onLeaveNotDescendants: function() {
        },onDrop: function() {
        }}, qq.extend(h, a), i = h.element, c(), g(), qq.extend(this, {dropDisabled: function(a) {
            return e(a)
        },dispose: function() {
            l.dispose()
        },getElement: function() {
            return i
        }})
}, qq.DeleteFileAjaxRequester = function(a) {
    "use strict";
    function b() {
        return "POST" === d.method.toUpperCase() ? {_method: "DELETE"} : {}
    }
    var c, d = {method: "DELETE",uuidParamName: "qquuid",endpointStore: {},maxConnections: 3,customHeaders: function() {
            return {}
        },paramsStore: {},demoMode: !1,cors: {expected: !1,sendCredentials: !1},log: function() {
        },onDelete: function() {
        },onDeleteComplete: function() {
        }};
    qq.extend(d, a), c = qq.extend(this, new qq.AjaxRequester({acceptHeader: "application/json",validMethods: ["POST", "DELETE"],method: d.method,endpointStore: d.endpointStore,paramsStore: d.paramsStore,mandatedParams: b(),maxConnections: d.maxConnections,customHeaders: function(a) {
            return d.customHeaders.get(a)
        },demoMode: d.demoMode,log: d.log,onSend: d.onDelete,onComplete: d.onDeleteComplete,cors: d.cors})), qq.extend(this, {sendDelete: function(a, b, e) {
            var f = e || {};
            d.log("Submitting delete file request for " + a), "DELETE" === d.method ? c.initTransport(a).withPath(b).withParams(f).send() : (f[d.uuidParamName] = b, c.initTransport(a).withParams(f).send())
        }})
}, function() {
    function a(a) {
        var b = a.naturalWidth, c = a.naturalHeight;
        if (b * c > 1048576) {
            var d = document.createElement("canvas");
            d.width = d.height = 1;
            var e = d.getContext("2d");
            return e.drawImage(a, -b + 1, 0), 0 === e.getImageData(0, 0, 1, 1).data[3]
        }
        return !1
    }
    function b(a, b, c) {
        var d = document.createElement("canvas");
        d.width = 1, d.height = c;
        var e = d.getContext("2d");
        e.drawImage(a, 0, 0);
        for (var f = e.getImageData(0, 0, 1, c).data, g = 0, h = c, i = c; i > g; ) {
            var j = f[4 * (i - 1) + 3];
            0 === j ? h = i : g = i, i = h + g >> 1
        }
        var k = i / c;
        return 0 === k ? 1 : k
    }
    function c(a, b, c) {
        var e = document.createElement("canvas"), f = b.mime || "image/jpeg";
        return d(a, e, b, c), e.toDataURL(f, b.quality || .8)
    }
    function d(c, d, f, g) {
        var h = c.naturalWidth, i = c.naturalHeight, j = f.width, k = f.height, l = d.getContext("2d");
        if (l.save(), e(d, j, k, f.orientation), qq.ios()) {
            var m = a(c);
            m && (h /= 2, i /= 2);
            var n = 1024, o = document.createElement("canvas");
            o.width = o.height = n;
            for (var p = o.getContext("2d"), q = g ? b(c, h, i) : 1, r = Math.ceil(n * j / h), s = Math.ceil(n * k / i / q), t = 0, u = 0; i > t; ) {
                for (var v = 0, w = 0; h > v; )
                    p.clearRect(0, 0, n, n), p.drawImage(c, -v, -t), l.drawImage(o, 0, 0, n, n, w, u, r, s), v += n, w += r;
                t += n, u += s
            }
            l.restore(), o = p = null
        } else
            l.drawImage(c, 0, 0, j, k);
        d.qqImageRendered && d.qqImageRendered()
    }
    function e(a, b, c, d) {
        switch (d) {
            case 5:
            case 6:
            case 7:
            case 8:
                a.width = c, a.height = b;
                break;
            default:
                a.width = b, a.height = c
        }
        var e = a.getContext("2d");
        switch (d) {
            case 2:
                e.translate(b, 0), e.scale(-1, 1);
                break;
            case 3:
                e.translate(b, c), e.rotate(Math.PI);
                break;
            case 4:
                e.translate(0, c), e.scale(1, -1);
                break;
            case 5:
                e.rotate(.5 * Math.PI), e.scale(1, -1);
                break;
            case 6:
                e.rotate(.5 * Math.PI), e.translate(0, -c);
                break;
            case 7:
                e.rotate(.5 * Math.PI), e.translate(b, -c), e.scale(-1, 1);
                break;
            case 8:
                e.rotate(-.5 * Math.PI), e.translate(-b, 0)
        }
    }
    function f(a, b) {
        if (window.Blob && a instanceof Blob) {
            var c = new Image, d = window.URL && window.URL.createObjectURL ? window.URL : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null;
            if (!d)
                throw Error("No createObjectURL function found to create blob url");
            c.src = d.createObjectURL(a), this.blob = a, a = c
        }
        if (!a.naturalWidth && !a.naturalHeight) {
            var e = this;
            a.onload = function() {
                var a = e.imageLoadListeners;
                a && (e.imageLoadListeners = null, setTimeout(function() {
                    for (var b = 0, c = a.length; c > b; b++)
                        a[b]()
                }, 0))
            }, a.onerror = b, this.imageLoadListeners = []
        }
        this.srcImage = a
    }
    f.prototype.render = function(a, b) {
        if (this.imageLoadListeners) {
            var e = this;
            return this.imageLoadListeners.push(function() {
                e.render(a, b)
            }), void 0
        }
        b = b || {};
        var f = this.srcImage.naturalWidth, g = this.srcImage.naturalHeight, h = b.width, i = b.height, j = b.maxWidth, k = b.maxHeight, l = !this.blob || "image/jpeg" === this.blob.type;
        h && !i ? i = g * h / f << 0 : i && !h ? h = f * i / g << 0 : (h = f, i = g), j && h > j && (h = j, i = g * h / f << 0), k && i > k && (i = k, h = f * i / g << 0);
        var m = {width: h,height: i};
        for (var n in b)
            m[n] = b[n];
        var o = a.tagName.toLowerCase();
        "img" === o ? a.src = c(this.srcImage, m, l) : "canvas" === o && d(this.srcImage, a, m, l), "function" == typeof this.onrender && this.onrender(a)
    }, "function" == typeof define && define.amd ? define([], function() {
        return f
    }) : this.MegaPixImage = f
}(), qq.ImageGenerator = function(a) {
    "use strict";
    function b(a) {
        return "img" === a.tagName.toLowerCase()
    }
    function c(a) {
        return "canvas" === a.tagName.toLowerCase()
    }
    function d() {
        return void 0 !== (new Image).crossOrigin
    }
    function e() {
        var a = document.createElement("canvas");
        return a.getContext && a.getContext("2d")
    }
    function f(a) {
        var b = a.split("/"), c = b[b.length - 1], d = qq.getExtension(c);
        switch (d = d && d.toLowerCase()) {
            case "jpeg":
            case "jpg":
                return "image/jpeg";
            case "png":
                return "image/png";
            case "bmp":
                return "image/bmp";
            case "gif":
                return "image/gif";
            case "tiff":
            case "tif":
                return "image/tiff"
        }
    }
    function g(a) {
        var b, c, d, e = document.createElement("a");
        return e.href = a, b = e.protocol, d = e.port, c = e.hostname, b.toLowerCase() !== window.location.protocol.toLowerCase() ? !0 : c.toLowerCase() !== window.location.hostname.toLowerCase() ? !0 : d === window.location.port || qq.ie() ? !1 : !0
    }
    function h(b, c) {
        b.onload = function() {
            b.onload = null, b.onerror = null, c.success(b)
        }, b.onerror = function() {
            b.onload = null, b.onerror = null, a("Problem drawing thumbnail!", "error"), c.failure(b, "Problem drawing thumbnail!")
        }
    }
    function i(a, b) {
        a.qqImageRendered = function() {
            b.success(a)
        }
    }
    function j(d, e) {
        var f = b(d) || c(d);
        return b(d) ? h(d, e) : c(d) ? i(d, e) : (e.failure(d), a(qq.format("Element container of type {} is not supported!", d.tagName), "error")), f
    }
    function k(b, c, d) {
        var e = new qq.Promise, f = new qq.Identify(b, a), g = d.maxSize, h = null == d.orient ? !0 : d.orient, i = function() {
            c.onerror = null, c.onload = null, a("Could not render preview, file may be too large!", "error"), e.failure(c, "Browser cannot render image!")
        };
        return f.isPreviewable().then(function(d) {
            var f = {parse: function() {
                    return (new qq.Promise).success()
                }}, k = h ? new qq.Exif(b, a) : f, l = new MegaPixImage(b, i);
            j(c, e) && k.parse().then(function(a) {
                var b = a && a.Orientation;
                l.render(c, {maxWidth: g,maxHeight: g,orientation: b,mime: d})
            }, function(b) {
                a(qq.format("EXIF data could not be parsed ({}).  Assuming orientation = 1.", b)), l.render(c, {maxWidth: g,maxHeight: g,mime: d})
            })
        }, function() {
            a("Not previewable"), e.failure(c, "Not previewable")
        }), e
    }
    function l(a, b, c, d) {
        var e = new Image, h = new qq.Promise;
        j(e, h), g(a) && (e.crossOrigin = "anonymous"), e.src = a, h.then(function() {
            j(b, c);
            var g = new MegaPixImage(e);
            g.render(b, {maxWidth: d,maxHeight: d,mime: f(a)})
        })
    }
    function m(a, b, c, d) {
        j(b, c), qq(b).css({maxWidth: d + "px",maxHeight: d + "px"}), b.src = a
    }
    function n(a, f, h) {
        var i = new qq.Promise, k = h.scale, n = k ? h.maxSize : null;
        return k && b(f) ? e() ? g(a) && !d() ? m(a, f, i, n) : l(a, f, i, n) : m(a, f, i, n) : c(f) ? l(a, f, i, n) : j(f, i) && (f.src = a), i
    }
    qq.extend(this, {generate: function(b, c, d) {
            return qq.isString(b) ? (a("Attempting to update thumbnail based on server response."), n(b, c, d || {})) : (a("Attempting to draw client-side image preview."), k(b, c, d || {}))
        }}), this._testing = {}, this._testing.isImg = b, this._testing.isCanvas = c, this._testing.isCrossOrigin = g, this._testing.determineMimeOfFileName = f
}, qq.Exif = function(a, b) {
    "use strict";
    function c(a) {
        for (var b = 0, c = 0; a.length > 0; )
            b += parseInt(a.substring(0, 2), 16) * Math.pow(2, c), a = a.substring(2, a.length), c += 8;
        return b
    }
    function d(b, c) {
        var e = b, f = c;
        return void 0 === e && (e = 2, f = new qq.Promise), qq.readBlobToHex(a, e, 4).then(function(a) {
            var b = /^ffe([0-9])/.exec(a);
            if (b)
                if ("1" !== b[1]) {
                    var c = parseInt(a.slice(4, 8), 16);
                    d(e + c + 2, f)
                } else
                    f.success(e);
            else
                f.failure("No EXIF header to be found!")
        }), f
    }
    function e() {
        var b = new qq.Promise;
        return qq.readBlobToHex(a, 0, 6).then(function(a) {
            0 !== a.indexOf("ffd8") ? b.failure("Not a valid JPEG!") : d().then(function(a) {
                b.success(a)
            }, function(a) {
                b.failure(a)
            })
        }), b
    }
    function f(b) {
        var c = new qq.Promise;
        return qq.readBlobToHex(a, b + 10, 2).then(function(a) {
            c.success("4949" === a)
        }), c
    }
    function g(b, d) {
        var e = new qq.Promise;
        return qq.readBlobToHex(a, b + 18, 2).then(function(a) {
            return d ? e.success(c(a)) : (e.success(parseInt(a, 16)), void 0)
        }), e
    }
    function h(b, c) {
        var d = b + 20, e = 12 * c;
        return qq.readBlobToHex(a, d, e)
    }
    function i(a) {
        for (var b = [], c = 0; c + 24 <= a.length; )
            b.push(a.slice(c, c + 24)), c += 24;
        return b
    }
    function j(a, b) {
        var d = 16, e = qq.extend([], k), f = {};
        return qq.each(b, function(b, g) {
            var h, i, j, k = g.slice(0, 4), m = a ? c(k) : parseInt(k, 16), n = e.indexOf(m);
            return n >= 0 && (i = l[m].name, j = l[m].bytes, h = g.slice(d, d + 2 * j), f[i] = a ? c(h) : parseInt(h, 16), e.splice(n, 1)), 0 === e.length ? !1 : void 0
        }), f
    }
    var k = [274], l = {274: {name: "Orientation",bytes: 2}};
    qq.extend(this, {parse: function() {
            var c = new qq.Promise, d = function(a) {
                b(qq.format("EXIF header parse failed: '{}' ", a)), c.failure(a)
            };
            return e().then(function(e) {
                b(qq.format("Moving forward with EXIF header parsing for '{}'", void 0 === a.name ? "blob" : a.name)), f(e).then(function(a) {
                    b(qq.format("EXIF Byte order is {} endian", a ? "little" : "big")), g(e, a).then(function(f) {
                        b(qq.format("Found {} APP1 directory entries", f)), h(e, f).then(function(d) {
                            var e = i(d), f = j(a, e);
                            b("Successfully parsed some EXIF tags"), c.success(f)
                        }, d)
                    }, d)
                }, d)
            }, d), c
        }}), this._testing = {}, this._testing.parseLittleEndian = c
}, qq.Identify = function(a, b) {
    "use strict";
    function c(a, b) {
        var c = !1, d = [].concat(a);
        return qq.each(d, function(a, d) {
            return 0 === b.indexOf(d) ? (c = !0, !1) : void 0
        }), c
    }
    qq.extend(this, {isPreviewable: function() {
            var d = this, e = new qq.Promise, f = !1, g = void 0 === a.name ? "blob" : a.name;
            return b(qq.format("Attempting to determine if {} can be rendered in this browser", g)), b("First pass: check type attribute of blob object."), this.isPreviewableSync() ? (b("Second pass: check for magic bytes in file header."), qq.readBlobToHex(a, 0, 4).then(function(a) {
                qq.each(d.PREVIEWABLE_MIME_TYPES, function(b, d) {
                    return c(d, a) ? (("image/tiff" !== b || qq.supportedFeatures.tiffPreviews) && (f = !0, e.success(b)), !1) : void 0
                }), b(qq.format("'{}' is {} able to be rendered in this browser", g, f ? "" : "NOT")), f || e.failure()
            }, function() {
                b("Error reading file w/ name '" + a.name + "'.  Not able to be rendered in this browser."), e.failure()
            })) : e.failure(), e
        },isPreviewableSync: function() {
            var c = a.type, d = qq.indexOf(Object.keys(this.PREVIEWABLE_MIME_TYPES), c) >= 0, e = !1;
            return d && (e = "image/tiff" === c ? qq.supportedFeatures.tiffPreviews : !0), !e && b(a.name + " is not previewable in this browser per the blob's type attr"), e
        }})
}, qq.Identify.prototype.PREVIEWABLE_MIME_TYPES = {"image/jpeg": "ffd8ff","image/gif": "474946","image/png": "89504e","image/bmp": "424d","image/tiff": ["49492a00", "4d4d002a"]}, qq.ImageValidation = function(a, b) {
    "use strict";
    function c(a) {
        var b = !1;
        return qq.each(a, function(a, c) {
            return c > 0 ? (b = !0, !1) : void 0
        }), b
    }
    function d() {
        var c = new qq.Promise;
        return new qq.Identify(a, b).isPreviewable().then(function() {
            var d = new Image, e = window.URL && window.URL.createObjectURL ? window.URL : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null;
            e ? (d.onerror = function() {
                b("Cannot determine dimensions for image.  May be too large.", "error"), c.failure()
            }, d.onload = function() {
                c.success({width: this.width,height: this.height})
            }, d.src = e.createObjectURL(a)) : (b("No createObjectURL function available to generate image URL!", "error"), c.failure())
        }, c.failure), c
    }
    function e(a, b) {
        var c;
        return qq.each(a, function(a, d) {
            if (d > 0) {
                var e = /(max|min)(Width|Height)/.exec(a), f = e[2].charAt(0).toLowerCase() + e[2].slice(1), g = b[f];
                switch (e[1]) {
                    case "min":
                        if (d > g)
                            return c = a, !1;
                        break;
                    case "max":
                        if (g > d)
                            return c = a, !1
                }
            }
        }), c
    }
    this.validate = function(a) {
        var f = new qq.Promise;
        return b("Attempting to validate image."), c(a) ? d().then(function(b) {
            var c = e(a, b);
            c ? f.failure(c) : f.success()
        }, f.success) : f.success(), f
    }
}, qq.Session = function(a) {
    "use strict";
    function b(a) {
        return qq.isArray(a) ? !0 : (d.log("Session response is not an array.", "error"), void 0)
    }
    function c(a, c, e, f) {
        var g = !1;
        c = c && b(a), c && qq.each(a, function(a, b) {
            if (null == b.uuid)
                g = !0, d.log(qq.format("Session response item {} did not include a valid UUID - ignoring.", a), "error");
            else if (null == b.name)
                g = !0, d.log(qq.format("Session response item {} did not include a valid name - ignoring.", a), "error");
            else
                try {
                    return d.addFileRecord(b), !0
                } catch (c) {
                    g = !0, d.log(c.message, "error")
                }
            return !1
        }), f[c && !g ? "success" : "failure"](a, e)
    }
    var d = {endpoint: null,params: {},customHeaders: {},cors: {},addFileRecord: function() {
        },log: function() {
        }};
    qq.extend(d, a, !0), this.refresh = function() {
        var a = new qq.Promise, b = function(b, d, e) {
            c(b, d, e, a)
        }, e = qq.extend({}, d), f = new qq.SessionAjaxRequester(qq.extend(e, {onComplete: b}));
        return f.queryServer(), a
    }
}, qq.SessionAjaxRequester = function(a) {
    "use strict";
    function b(a, b, c) {
        var e = null;
        if (null != b.responseText)
            try {
                e = qq.parseJson(b.responseText)
            } catch (f) {
                d.log("Problem parsing session response: " + f.message, "error"), c = !0
            }
        d.onComplete(e, !c, b)
    }
    var c, d = {endpoint: null,customHeaders: {},params: {},cors: {expected: !1,sendCredentials: !1},onComplete: function() {
        },log: function() {
        }};
    qq.extend(d, a), c = qq.extend(this, new qq.AjaxRequester({acceptHeader: "application/json",validMethods: ["GET"],method: "GET",endpointStore: {get: function() {
                return d.endpoint
            }},customHeaders: d.customHeaders,log: d.log,onComplete: b,cors: d.cors})), qq.extend(this, {queryServer: function() {
            var a = qq.extend({}, d.params);
            d.log("Session query request."), c.initTransport("sessionRefresh").withParams(a).withCacheBuster().send()
        }})
}, qq.FormSupport = function(a, b, c) {
    "use strict";
    function d(a) {
        a.getAttribute("action") && (h.newEndpoint = a.getAttribute("action"))
    }
    function e(a, b) {
        return !a.checkValidity || a.checkValidity() ? !0 : (c("Form did not pass validation checks - will not upload.", "error"), b(), void 0)
    }
    function f(a) {
        var c = a.submit;
        qq(a).attach("submit", function(d) {
            d = d || window.event, d.preventDefault ? d.preventDefault() : d.returnValue = !1, e(a, c) && b()
        }), a.submit = function() {
            e(a, c) && b()
        }
    }
    function g(a) {
        return a && (qq.isString(a) && (a = document.getElementById(a)), a && (c("Attaching to form element."), d(a), i && f(a))), a
    }
    var h = this, i = a.interceptSubmit, j = a.element, k = a.autoUpload;
    qq.extend(this, {newEndpoint: null,newAutoUpload: k,attachedToForm: !1,getFormInputsAsObject: function() {
            return null == j ? null : h._form2Obj(j)
        }}), j = g(j), this.attachedToForm = !!j
}, qq.extend(qq.FormSupport.prototype, {_form2Obj: function(a) {
        "use strict";
        var b = {}, c = function(a) {
            var b = ["button", "image", "reset", "submit"];
            return qq.indexOf(b, a.toLowerCase()) < 0
        }, d = function(a) {
            return qq.indexOf(["checkbox", "radio"], a.toLowerCase()) >= 0
        }, e = function(a) {
            return d(a.type) && !a.checked ? !0 : a.disabled && "hidden" !== a.type.toLowerCase()
        }, f = function(a) {
            var b = null;
            return qq.each(qq(a).children(), function(a, c) {
                return "option" === c.tagName.toLowerCase() && c.selected ? (b = c.value, !1) : void 0
            }), b
        };
        return qq.each(a.elements, function(a, d) {
            if (!qq.isInput(d, !0) && "textarea" !== d.tagName.toLowerCase() || !c(d.type) || e(d)) {
                if ("select" === d.tagName.toLowerCase() && !e(d)) {
                    var g = f(d);
                    null !== g && (b[d.name] = g)
                }
            } else
                b[d.name] = d.value
        }), b
    }}), qq.Scaler = function(a, b) {
    "use strict";
    var c = a.sendOriginal, d = a.orient, e = a.defaultType, f = a.defaultQuality / 100, g = a.failureText, h = a.includeExif, i = this._getSortedSizes(a.sizes);
    qq.extend(this, {enabled: qq.supportedFeatures.scaling && i.length > 0,getFileRecords: function(a, j, k) {
            var l = this, m = [], n = k.blob ? k.blob : k, o = new qq.Identify(n, b);
            return o.isPreviewableSync() && qq.each(i, function(a, c) {
                var i = l._determineOutputType({defaultType: e,requestedType: c.type,refType: n.type});
                m.push({uuid: qq.getUniqueId(),name: l._getName(j, {name: c.name,type: i,refType: n.type}),blob: new qq.BlobProxy(n, qq.bind(l._generateScaledImage, l, {maxSize: c.maxSize,orient: d,type: i,quality: f,failedText: g,includeExif: h,log: b}))})
            }), c && m.push({uuid: a,name: j,blob: n}), m
        },handleNewFile: function(a, b, c, d, e, f, g, h) {
            var i = this, j = (a.qqButtonId || a.blob && a.blob.qqButtonId, []), k = null, l = h.addFileToHandler, m = h.uploadData, n = h.paramsStore, o = qq.getUniqueId();
            qq.each(i.getFileRecords(c, b, a), function(b, c) {
                var f, h = a, i = d;
                c.blob instanceof qq.BlobProxy && (h = c.blob, i = -1), f = m.addFile({uuid: c.uuid,name: c.name,size: i,batchId: g,proxyGroupId: o}), c.blob instanceof qq.BlobProxy ? j.push(f) : k = f, l(f, h), e.push({id: f,file: h})
            }), null !== k && (qq.each(j, function(a, b) {
                var c = {qqparentuuid: m.retrieve({id: k}).uuid,qqparentsize: m.retrieve({id: k}).size};
                c[f] = m.retrieve({id: b}).uuid, m.setParentId(b, k), n.addReadOnly(b, c)
            }), j.length && !function() {
                var a = {};
                a[f] = m.retrieve({id: k}).uuid, n.addReadOnly(k, a)
            }())
        }})
}, qq.extend(qq.Scaler.prototype, {scaleImage: function(a, b, c) {
        "use strict";
        if (!qq.supportedFeatures.scaling)
            throw new qq.Error("Scaling is not supported in this browser!");
        var d = new qq.Promise, e = c.log, f = c.getFile(a), g = c.uploadData.retrieve({id: a}), h = g && g.name, i = g && g.uuid, j = {sendOriginal: !1,orient: b.orient,defaultType: b.type || null,defaultQuality: b.quality,failedToScaleText: "Unable to scale",sizes: [{name: "",maxSize: b.maxSize}]}, k = new qq.Scaler(j, e);
        return qq.Scaler && qq.supportedFeatures.imagePreviews && f ? qq.bind(function() {
            var b;
            b = k.getFileRecords(i, h, f)[0], b ? b.blob.create().then(d.success, d.failure) : (e(a + " is not a scalable image!", "error"), d.failure())
        }, this)() : (d.failure(), e("Could not generate requested scaled image for " + a + ".  " + "Scaling is either not possible in this browser, or the file could not be located.", "error")), d
    },_determineOutputType: function(a) {
        "use strict";
        var b = a.requestedType, c = a.defaultType, d = a.refType;
        return c || b ? b ? qq.indexOf(Object.keys(qq.Identify.prototype.PREVIEWABLE_MIME_TYPES), b) >= 0 ? "image/tiff" === b ? qq.supportedFeatures.tiffPreviews ? b : c : b : c : c : "image/jpeg" !== d ? "image/png" : d
    },_getName: function(a, b) {
        "use strict";
        var c = a.lastIndexOf("."), d = " (" + b.name + ")", e = b.type || "image/png", f = b.refType, g = "", h = qq.getExtension(a);
        return c >= 0 ? (g = a.substr(0, c), f !== e && (h = e.split("/")[1]), g += d + "." + h) : g = a + d, g
    },_getSortedSizes: function(a) {
        "use strict";
        return a = qq.extend([], a), a.sort(function(a, b) {
            return a.maxSize > b.maxSize ? 1 : a.maxSize < b.maxSize ? -1 : 0
        })
    },_generateScaledImage: function(a, b) {
        "use strict";
        var c = this, d = a.log, e = a.maxSize, f = a.orient, g = a.type, h = a.quality, i = a.failedText, j = a.includeExif && "image/jpeg" === b.type && "image/jpeg" === g, k = new qq.Promise, l = new qq.ImageGenerator(d), m = document.createElement("canvas");
        return d("Attempting to generate scaled version for " + b.name), l.generate(b, m, {maxSize: e,orient: f}).then(function() {
            var a = m.toDataURL(g, h), e = function() {
                d("Success generating scaled version for " + b.name);
                var e = c._dataUriToBlob(a);
                k.success(e)
            };
            j ? c._insertExifHeader(b, a, d).then(function(b) {
                a = b, e()
            }, function() {
                d("Problem inserting EXIF header into scaled image.  Using scaled image w/out EXIF data.", "error"), e()
            }) : e()
        }, function() {
            d("Failed attempt to generate scaled version for " + b.name, "error"), k.failure(i)
        }), k
    },_insertExifHeader: function(a, b, c) {
        "use strict";
        var d = new FileReader, e = new qq.Promise, f = "";
        return d.onload = function() {
            f = d.result, e.success(ExifRestorer.restore(f, b))
        }, d.onerror = function() {
            c("Problem reading " + a.name + " during attempt to transfer EXIF data to scaled version.", "error"), e.failure()
        }, d.readAsDataURL(a), e
    },_dataUriToBlob: function(a) {
        "use strict";
        var b, c, d, e;
        return b = a.split(",")[0].indexOf("base64") >= 0 ? atob(a.split(",")[1]) : decodeURI(a.split(",")[1]), c = a.split(",")[0].split(":")[1].split(";")[0], d = new ArrayBuffer(b.length), e = new Uint8Array(d), qq.each(b, function(a, b) {
            e[a] = b.charCodeAt(0)
        }), this._createBlob(d, c)
    },_createBlob: function(a, b) {
        "use strict";
        var c = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, d = c && new c;
        return d ? (d.append(a), d.getBlob(b)) : new Blob([a], {type: b})
    }});
var ExifRestorer = function() {
    var a = {};
    return a.KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", a.encode64 = function(a) {
        var b, c, d, e, f, g = "", h = "", i = "", j = 0;
        do
            b = a[j++], c = a[j++], h = a[j++], d = b >> 2, e = (3 & b) << 4 | c >> 4, f = (15 & c) << 2 | h >> 6, i = 63 & h, isNaN(c) ? f = i = 64 : isNaN(h) && (i = 64), g = g + this.KEY_STR.charAt(d) + this.KEY_STR.charAt(e) + this.KEY_STR.charAt(f) + this.KEY_STR.charAt(i), b = c = h = "", d = e = f = i = "";
        while (j < a.length);
        return g
    }, a.restore = function(a, b) {
        var c = "data:image/jpeg;base64,";
        if (!a.match(c))
            return b;
        var d = this.decode64(a.replace(c, "")), e = this.slice2Segments(d), f = this.exifManipulation(b, e);
        return c + this.encode64(f)
    }, a.exifManipulation = function(a, b) {
        var c = this.getExifArray(b), d = this.insertExif(a, c), e = new Uint8Array(d);
        return e
    }, a.getExifArray = function(a) {
        for (var b, c = 0; c < a.length; c++)
            if (b = a[c], 255 == b[0] & 225 == b[1])
                return b;
        return []
    }, a.insertExif = function(a, b) {
        var c = a.replace("data:image/jpeg;base64,", ""), d = this.decode64(c), e = d.indexOf(255, 3), f = d.slice(0, e), g = d.slice(e), h = f;
        return h = h.concat(b), h = h.concat(g)
    }, a.slice2Segments = function(a) {
        for (var b = 0, c = []; ; ) {
            if (255 == a[b] & 218 == a[b + 1])
                break;
            if (255 == a[b] & 216 == a[b + 1])
                b += 2;
            else {
                var d = 256 * a[b + 2] + a[b + 3], e = b + d + 2, f = a.slice(b, e);
                c.push(f), b = e
            }
            if (b > a.length)
                break
        }
        return c
    }, a.decode64 = function(a) {
        var b, c, d, e, f, g = "", h = "", i = 0, j = [], k = /[^A-Za-z0-9\+\/\=]/g;
        if (k.exec(a))
            throw new Error("There were invalid base64 characters in the input text.  Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='");
        a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do
            d = this.KEY_STR.indexOf(a.charAt(i++)), e = this.KEY_STR.indexOf(a.charAt(i++)), f = this.KEY_STR.indexOf(a.charAt(i++)), h = this.KEY_STR.indexOf(a.charAt(i++)), b = d << 2 | e >> 4, c = (15 & e) << 4 | f >> 2, g = (3 & f) << 6 | h, j.push(b), 64 != f && j.push(c), 64 != h && j.push(g), b = c = g = "", d = e = f = h = "";
        while (i < a.length);
        return j
    }, a
}();
qq.TotalProgress = function(a, b) {
    "use strict";
    var c = {}, d = 0, e = 0, f = -1, g = -1, h = function(b, c) {
        (b !== f || c !== g) && a(b, c), f = b, g = c
    }, i = function(a, b) {
        var c = !0;
        return qq.each(a, function(a, d) {
            return qq.indexOf(b, d) >= 0 ? (c = !1, !1) : void 0
        }), c
    }, j = function(a) {
        m(a, -1, -1), delete c[a]
    }, k = function(a, b, c) {
        (0 === b.length || i(b, c)) && (h(e, e), this.reset())
    }, l = function(a) {
        var d = b(a);
        d > 0 && (m(a, 0, d), c[a] = {loaded: 0,total: d})
    }, m = function(a, b, f) {
        var g = c[a] ? c[a].loaded : 0, i = c[a] ? c[a].total : 0;
        -1 === b && -1 === f ? (d -= g, e -= i) : (b && (d += b - g), f && (e += f - i)), h(d, e)
    };
    qq.extend(this, {onAllComplete: k,onStatusChange: function(a, b, c) {
            c === qq.status.CANCELED || c === qq.status.REJECTED ? j(a) : c === qq.status.SUBMITTING && l(a)
        },onIndividualProgress: function(a, b, d) {
            m(a, b, d), c[a] = {loaded: b,total: d}
        },onNewSize: function(a) {
            l(a)
        },reset: function() {
            c = {}, d = 0, e = 0
        }})
}, qq.UiEventHandler = function(a, b) {
    "use strict";
    function c(a) {
        d.attach(a, e.eventType, function(a) {
            a = a || window.event;
            var b = a.target || a.srcElement;
            e.onHandled(b, a)
        })
    }
    var d = new qq.DisposeSupport, e = {eventType: "click",attachTo: null,onHandled: function() {
        }};
    qq.extend(this, {addHandler: function(a) {
            c(a)
        },dispose: function() {
            d.dispose()
        }}), qq.extend(b, {getFileIdFromItem: function(a) {
            return a.qqFileId
        },getDisposeSupport: function() {
            return d
        }}), qq.extend(e, a), e.attachTo && c(e.attachTo)
}, qq.FileButtonsClickHandler = function(a) {
    "use strict";
    function b(a, b) {
        qq.each(e, function(c, e) {
            var f, g = c.charAt(0).toUpperCase() + c.slice(1);
            return d.templating["is" + g](a) ? (f = d.templating.getFileId(a), qq.preventDefault(b), d.log(qq.format("Detected valid file button click event on file '{}', ID: {}.", d.onGetName(f), f)), e(f), !1) : void 0
        })
    }
    var c = {}, d = {templating: null,log: function() {
        },onDeleteFile: function() {
        },onCancel: function() {
        },onRetry: function() {
        },onPause: function() {
        },onContinue: function() {
        },onGetName: function() {
        }}, e = {cancel: function(a) {
            d.onCancel(a)
        },retry: function(a) {
            d.onRetry(a)
        },deleteButton: function(a) {
            d.onDeleteFile(a)
        },pause: function(a) {
            d.onPause(a)
        },continueButton: function(a) {
            d.onContinue(a)
        }};
    qq.extend(d, a), d.eventType = "click", d.onHandled = b, d.attachTo = d.templating.getFileList(), qq.extend(this, new qq.UiEventHandler(d, c))
}, qq.FilenameClickHandler = function(a) {
    "use strict";
    function b(a, b) {
        if (d.templating.isFileName(a) || d.templating.isEditIcon(a)) {
            var e = d.templating.getFileId(a), f = d.onGetUploadStatus(e);
            f === qq.status.SUBMITTED && (d.log(qq.format("Detected valid filename click event on file '{}', ID: {}.", d.onGetName(e), e)), qq.preventDefault(b), c.handleFilenameEdit(e, a, !0))
        }
    }
    var c = {}, d = {templating: null,log: function() {
        },classes: {file: "qq-upload-file",editNameIcon: "qq-edit-filename-icon"},onGetUploadStatus: function() {
        },onGetName: function() {
        }};
    qq.extend(d, a), d.eventType = "click", d.onHandled = b, qq.extend(this, new qq.FilenameEditHandler(d, c))
}, qq.FilenameInputFocusInHandler = function(a, b) {
    "use strict";
    function c(a) {
        if (d.templating.isEditInput(a)) {
            var c = d.templating.getFileId(a), e = d.onGetUploadStatus(c);
            e === qq.status.SUBMITTED && (d.log(qq.format("Detected valid filename input focus event on file '{}', ID: {}.", d.onGetName(c), c)), b.handleFilenameEdit(c, a))
        }
    }
    var d = {templating: null,onGetUploadStatus: function() {
        },log: function() {
        }};
    b || (b = {}), d.eventType = "focusin", d.onHandled = c, qq.extend(d, a), qq.extend(this, new qq.FilenameEditHandler(d, b))
}, qq.FilenameInputFocusHandler = function(a) {
    "use strict";
    a.eventType = "focus", a.attachTo = null, qq.extend(this, new qq.FilenameInputFocusInHandler(a, {}))
}, qq.FilenameEditHandler = function(a, b) {
    "use strict";
    function c(a) {
        var b = h.onGetName(a), c = b.lastIndexOf(".");
        return c > 0 && (b = b.substr(0, c)), b
    }
    function d(a) {
        var b = h.onGetName(a);
        return qq.getExtension(b)
    }
    function e(a, b) {
        var c, e = a.value;
        void 0 !== e && qq.trimStr(e).length > 0 && (c = d(b), void 0 !== c && (e = e + "." + c), h.onSetName(b, e)), h.onEditingStatusChange(b, !1)
    }
    function f(a, c) {
        b.getDisposeSupport().attach(a, "blur", function() {
            e(a, c)
        })
    }
    function g(a, c) {
        b.getDisposeSupport().attach(a, "keyup", function(b) {
            var d = b.keyCode || b.which;
            13 === d && e(a, c)
        })
    }
    var h = {templating: null,log: function() {
        },onGetUploadStatus: function() {
        },onGetName: function() {
        },onSetName: function() {
        },onEditingStatusChange: function() {
        }};
    qq.extend(h, a), h.attachTo = h.templating.getFileList(), qq.extend(this, new qq.UiEventHandler(h, b)), qq.extend(b, {handleFilenameEdit: function(a, b, d) {
            var e = h.templating.getEditInput(a);
            h.onEditingStatusChange(a, !0), e.value = c(a), d && e.focus(), f(e, a), g(e, a)
        }})
}, function(a) {
    "use strict";
    function b(a) {
        var b = h(a || {}), d = c(b);
        return e(d), g(b, d), l
    }
    function c(a) {
        var b = f("uploaderType"), c = f("endpointType");
        return b ? (b = b.charAt(0).toUpperCase() + b.slice(1).toLowerCase(), c ? new qq[c]["FineUploader" + b](a) : new qq["FineUploader" + b](a)) : c ? new qq[c].FineUploader(a) : new qq.FineUploader(a)
    }
    function d(a, b) {
        var c = l.data("fineuploader");
        return b ? (void 0 === c && (c = {}), c[a] = b, l.data("fineuploader", c), void 0) : void 0 === c ? null : c[a]
    }
    function e(a) {
        return d("uploader", a)
    }
    function f(a, b) {
        return d(a, b)
    }
    function g(b, c) {
        var d = b.callbacks = {};
        a.each(c._options.callbacks, function(b, c) {
            var e, f;
            e = /^on(\w+)/.exec(b)[1], e = e.substring(0, 1).toLowerCase() + e.substring(1), f = l, d[b] = function() {
                var b, d, g = Array.prototype.slice.call(arguments), h = [];
                a.each(g, function(a, b) {
                    h.push(k(b))
                }), b = c.apply(this, g);
                try {
                    d = f.triggerHandler(e, h)
                } catch (i) {
                    qq.log("Caught error in Fine Uploader jQuery event handler: " + i.message, "error")
                }
                return null != b ? b : d
            }
        }), c._options.callbacks = d
    }
    function h(b, c) {
        var d, e;
        return d = void 0 === c ? "basic" !== b.uploaderType ? {element: l[0]} : {} : c, a.each(b, function(b, c) {
            a.inArray(b, m) >= 0 ? f(b, c) : c instanceof a ? d[b] = c[0] : a.isPlainObject(c) ? (d[b] = {}, h(c, d[b])) : a.isArray(c) ? (e = [], a.each(c, function(b, c) {
                var d = {};
                c instanceof a ? a.merge(e, c) : a.isPlainObject(c) ? (h(c, d), e.push(d)) : e.push(c)
            }), d[b] = e) : d[b] = c
        }), void 0 === c ? d : void 0
    }
    function i(b) {
        return "string" === a.type(b) && !b.match(/^_/) && void 0 !== e()[b]
    }
    function j(a) {
        var b, c = [], d = Array.prototype.slice.call(arguments, 1);
        return h(d, c), b = e()[a].apply(e(), c), k(b)
    }
    function k(b) {
        var c = b;
        return null == b || "object" != typeof b || 1 !== b.nodeType && 9 !== b.nodeType || !b.cloneNode || (c = a(b)), c
    }
    var l, m = ["uploaderType", "endpointType"];
    a.fn.fineUploader = function(c) {
        var d = this, f = arguments, g = [];
        return this.each(function(h, k) {
            if (l = a(k), e() && i(c)) {
                if (g.push(j.apply(d, f)), 1 === d.length)
                    return !1
            } else
                "object" != typeof c && c ? a.error("Method " + c + " does not exist on jQuery.fineUploader") : b.apply(d, f)
        }), 1 === g.length ? g[0] : g.length > 1 ? g : this
    }
}(jQuery), function(a) {
    "use strict";
    function b(a) {
        a || (a = {}), a.dropZoneElements = [i];
        var b = f(a);
        return e(b), d(new qq.DragAndDrop(b)), i
    }
    function c(a, b) {
        var c = i.data(j);
        return b ? (void 0 === c && (c = {}), c[a] = b, i.data(j, c), void 0) : void 0 === c ? null : c[a]
    }
    function d(a) {
        return c("dndInstance", a)
    }
    function e(b) {
        var c = b.callbacks = {};
        a.each(new qq.DragAndDrop.callbacks, function(a) {
            var b, d = a;
            b = i, c[a] = function() {
                var a = Array.prototype.slice.call(arguments), c = b.triggerHandler(d, a);
                return c
            }
        })
    }
    function f(b, c) {
        var d, e;
        return d = void 0 === c ? {} : c, a.each(b, function(b, c) {
            c instanceof a ? d[b] = c[0] : a.isPlainObject(c) ? (d[b] = {}, f(c, d[b])) : a.isArray(c) ? (e = [], a.each(c, function(b, c) {
                c instanceof a ? a.merge(e, c) : e.push(c)
            }), d[b] = e) : d[b] = c
        }), void 0 === c ? d : void 0
    }
    function g(b) {
        return "string" === a.type(b) && "dispose" === b && void 0 !== d()[b]
    }
    function h(a) {
        var b = [], c = Array.prototype.slice.call(arguments, 1);
        return f(c, b), d()[a].apply(d(), b)
    }
    var i, j = "fineUploaderDnd";
    a.fn.fineUploaderDnd = function(c) {
        var e = this, f = arguments, j = [];
        return this.each(function(k, l) {
            if (i = a(l), d() && g(c)) {
                if (j.push(h.apply(e, f)), 1 === e.length)
                    return !1
            } else
                "object" != typeof c && c ? a.error("Method " + c + " does not exist in Fine Uploader's DnD module.") : b.apply(e, f)
        }), 1 === j.length ? j[0] : j.length > 1 ? j : this
    }
}(jQuery), qq.s3 = qq.s3 || {}, qq.s3.util = qq.s3.util || function() {
    "use strict";
    return {AWS_PARAM_PREFIX: "x-amz-meta-",SESSION_TOKEN_PARAM_NAME: "x-amz-security-token",REDUCED_REDUNDANCY_PARAM_NAME: "x-amz-storage-class",REDUCED_REDUNDANCY_PARAM_VALUE: "REDUCED_REDUNDANCY",SERVER_SIDE_ENCRYPTION_PARAM_NAME: "x-amz-server-side-encryption",SERVER_SIDE_ENCRYPTION_PARAM_VALUE: "AES256",getBucket: function(a) {
            var b, c = [/^(?:https?:\/\/)?([a-z0-9.\-_]+)\.s3(?:-[a-z0-9\-]+)?\.amazonaws\.com/i, /^(?:https?:\/\/)?s3(?:-[a-z0-9\-]+)?\.amazonaws\.com\/([a-z0-9.\-_]+)/i, /^(?:https?:\/\/)?([a-z0-9.\-_]+)/i];
            return qq.each(c, function(c, d) {
                var e = d.exec(a);
                return e ? (b = e[1], !1) : void 0
            }), b
        },getPolicy: function(a) {
            var b = {}, c = [], d = qq.s3.util.getBucket(a.endpoint), e = a.key, f = a.acl, g = a.type, h = new Date, i = a.expectedStatus, j = a.sessionToken, k = a.params, l = qq.s3.util.getSuccessRedirectAbsoluteUrl(a.successRedirectUrl), m = a.minFileSize, n = a.maxFileSize, o = a.reducedRedundancy, p = a.serverSideEncryption;
            return b.expiration = qq.s3.util.getPolicyExpirationDate(h), c.push({acl: f}), c.push({bucket: d}), g && c.push({"Content-Type": g}), i && c.push({success_action_status: i.toString()}), l && c.push({success_action_redirect: l}), o && (c.push({}), c[c.length - 1][qq.s3.util.REDUCED_REDUNDANCY_PARAM_NAME] = qq.s3.util.REDUCED_REDUNDANCY_PARAM_VALUE), j && (c.push({}), c[c.length - 1][qq.s3.util.SESSION_TOKEN_PARAM_NAME] = j), p && (c.push({}), c[c.length - 1][qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_NAME] = qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_VALUE), c.push({key: e}), qq.each(k, function(a, b) {
                var d = qq.s3.util.AWS_PARAM_PREFIX + a, e = {};
                e[d] = encodeURIComponent(b), c.push(e)
            }), b.conditions = c, qq.s3.util.enforceSizeLimits(b, m, n), b
        },refreshPolicyCredentials: function(a, b) {
            var c = !1;
            qq.each(a.conditions, function(a, d) {
                qq.each(d, function(a) {
                    a === qq.s3.util.SESSION_TOKEN_PARAM_NAME && (d[a] = b, c = !0)
                })
            }), c || (a.conditions.push({}), a.conditions[a.conditions.length - 1][qq.s3.util.SESSION_TOKEN_PARAM_NAME] = b)
        },generateAwsParams: function(a, b) {
            var c = {}, d = a.params, e = new qq.Promise, f = qq.s3.util.getPolicy(a), g = a.sessionToken, h = a.type, i = a.key, j = a.accessKey, k = a.acl, l = a.expectedStatus, m = qq.s3.util.getSuccessRedirectAbsoluteUrl(a.successRedirectUrl), n = a.reducedRedundancy, o = a.serverSideEncryption, p = a.log;
            return c.key = i, c.AWSAccessKeyId = j, h && (c["Content-Type"] = h), l && (c.success_action_status = l), m && (c.success_action_redirect = m), n && (c[qq.s3.util.REDUCED_REDUNDANCY_PARAM_NAME] = qq.s3.util.REDUCED_REDUNDANCY_PARAM_VALUE), o && (c[qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_NAME] = qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_VALUE), g && (c[qq.s3.util.SESSION_TOKEN_PARAM_NAME] = g), c.acl = k, qq.each(d, function(a, b) {
                var d = qq.s3.util.AWS_PARAM_PREFIX + a;
                c[d] = encodeURIComponent(b)
            }), b(f).then(function(a, b, d) {
                c.policy = a.policy, c.signature = a.signature, b && (c.AWSAccessKeyId = b), d && (c[qq.s3.util.SESSION_TOKEN_PARAM_NAME] = d), e.success(c)
            }, function(a) {
                a = a || "Can't continue further with request to S3 as we did not receive a valid signature and policy from the server.", p("Policy signing failed.  " + a, "error"), e.failure(a)
            }), e
        },enforceSizeLimits: function(a, b, c) {
            var d = 0 > b ? 0 : b, e = 0 >= c ? 9007199254740992 : c;
            (b > 0 || c > 0) && a.conditions.push(["content-length-range", d.toString(), e.toString()])
        },getPolicyExpirationDate: function(a) {
            if (a.setMinutes(a.getMinutes() + 5), Date.prototype.toISOString)
                return a.toISOString();
            var b = function(a) {
                var b = String(a);
                return 1 === b.length && (b = "0" + b), b
            };
            return a.getUTCFullYear() + "-" + b(a.getUTCMonth() + 1) + "-" + b(a.getUTCDate()) + "T" + b(a.getUTCHours()) + ":" + b(a.getUTCMinutes()) + ":" + b(a.getUTCSeconds()) + "." + String((a.getUTCMilliseconds() / 1e3).toFixed(3)).slice(2, 5) + "Z"
        },parseIframeResponse: function(a) {
            var b = a.contentDocument || a.contentWindow.document, c = b.location.search, d = /bucket=(.+)&key=(.+)&etag=(.+)/.exec(c);
            return d ? {bucket: d[1],key: d[2],etag: d[3].replace(/%22/g, "")} : void 0
        },getSuccessRedirectAbsoluteUrl: function(a) {
            if (a) {
                var b, c = document.createElement("div");
                return qq.ie7() ? (c.innerHTML = "<a href='" + a + "'></a>", b = c.firstChild, b.href) : (b = document.createElement("a"), b.href = a, b.href = b.href, b.href)
            }
        },encodeQueryStringParam: function(a) {
            var b = encodeURIComponent(a);
            return b = b.replace(/[!'()]/g, escape), b = b.replace(/\*/g, "%2A"), b.replace(/%20/g, "+")
        }}
}(), function() {
    "use strict";
    qq.nonTraditionalBasePublicApi = {setUploadSuccessParams: function(a, b) {
            this._uploadSuccessParamsStore.set(a, b)
        }}, qq.nonTraditionalBasePrivateApi = {_onComplete: function(a, b, c, d) {
            var e, f, g = c.success ? !0 : !1, h = this, i = arguments, j = this._options.uploadSuccess.endpoint, k = this._options.uploadSuccess.customHeaders, l = this._options.cors, m = new qq.Promise, n = this._uploadSuccessParamsStore.get(a), o = function(b) {
                delete h._failedSuccessRequestCallbacks[a], qq.extend(c, b), qq.FineUploaderBasic.prototype._onComplete.apply(h, i), m.success(b)
            }, p = function(f) {
                var g = e;
                qq.extend(c, f), c && c.reset && (g = null), g ? h._failedSuccessRequestCallbacks[a] = g : delete h._failedSuccessRequestCallbacks[a], h._onAutoRetry(a, b, c, d, g) || (qq.FineUploaderBasic.prototype._onComplete.apply(h, i), m.failure(f))
            };
            return g && j ? (f = new qq.UploadSuccessAjaxRequester({endpoint: j,customHeaders: k,cors: l,log: qq.bind(this.log, this)}), qq.extend(n, h._getEndpointSpecificParams(a, c, d), !0), e = qq.bind(function() {
                f.sendSuccessRequest(a, n).then(o, p)
            }, h), e(), m) : qq.FineUploaderBasic.prototype._onComplete.apply(this, arguments)
        },_manualRetry: function(a) {
            var b = this._failedSuccessRequestCallbacks[a];
            return qq.FineUploaderBasic.prototype._manualRetry.call(this, a, b)
        }}
}(), function() {
    "use strict";
    qq.s3.FineUploaderBasic = function(a) {
        var b = {request: {accessKey: null},objectProperties: {acl: "private",key: "uuid",reducedRedundancy: !1,serverSideEncryption: !1},credentials: {accessKey: null,secretKey: null,expiration: null,sessionToken: null},signature: {endpoint: null,customHeaders: {}},uploadSuccess: {endpoint: null,params: {},customHeaders: {}},iframeSupport: {localBlankPagePath: null},chunking: {partSize: 5242880},cors: {allowXdr: !0},callbacks: {onCredentialsExpired: function() {
                }}};
        qq.extend(b, a, !0), this.setCredentials(b.credentials, !0) || (this._currentCredentials.accessKey = b.request.accessKey), this._aclStore = this._createStore(b.objectProperties.acl), qq.FineUploaderBasic.call(this, b), this._uploadSuccessParamsStore = this._createStore(this._options.uploadSuccess.params), this._failedSuccessRequestCallbacks = {}, this._cannedKeys = {}
    }, qq.extend(qq.s3.FineUploaderBasic.prototype, qq.basePublicApi), qq.extend(qq.s3.FineUploaderBasic.prototype, qq.basePrivateApi), qq.extend(qq.s3.FineUploaderBasic.prototype, qq.nonTraditionalBasePublicApi), qq.extend(qq.s3.FineUploaderBasic.prototype, qq.nonTraditionalBasePrivateApi), qq.extend(qq.s3.FineUploaderBasic.prototype, {getKey: function(a) {
            return null == this._cannedKeys[a] ? this._handler.getThirdPartyFileId(a) : this._cannedKeys[a]
        },reset: function() {
            qq.FineUploaderBasic.prototype.reset.call(this), this._failedSuccessRequestCallbacks = []
        },setUploadSuccessParams: function(a, b) {
            this._uploadSuccessParamsStore.set(a, b)
        },setCredentials: function(a, b) {
            if (a && a.secretKey) {
                if (!a.accessKey)
                    throw new qq.Error("Invalid credentials: no accessKey");
                if (!a.expiration)
                    throw new qq.Error("Invalid credentials: no expiration");
                return this._currentCredentials = qq.extend({}, a), qq.isString(a.expiration) && (this._currentCredentials.expiration = new Date(a.expiration)), !0
            }
            if (!b)
                throw new qq.Error("Invalid credentials parameter!");
            this._currentCredentials = {}
        },setAcl: function(a, b) {
            this._aclStore.set(a, b)
        },_createUploadHandler: function() {
            var a = this, b = {objectProperties: this._options.objectProperties,aclStore: this._aclStore,signature: this._options.signature,iframeSupport: this._options.iframeSupport,getKeyName: qq.bind(this._determineKeyName, this),validation: {minSizeLimit: this._options.validation.minSizeLimit,maxSizeLimit: this._options.validation.sizeLimit}};
            return qq.override(this._endpointStore, function(a) {
                return {get: function(b) {
                        var c = a.get(b);
                        return c.indexOf("http") < 0 ? "http://" + c : c
                    }}
            }), qq.override(this._paramsStore, function(a) {
                return {get: function(b) {
                        var c = a.get(b), d = {};
                        return qq.each(c, function(a, b) {
                            d[a.toLowerCase()] = qq.isFunction(b) ? b() : b
                        }), d
                    }}
            }), b.signature.credentialsProvider = {get: function() {
                    return a._currentCredentials
                },onExpired: function() {
                    var b = new qq.Promise, c = a._options.callbacks.onCredentialsExpired();
                    return qq.isGenericPromise(c) ? c.then(function(c) {
                        try {
                            a.setCredentials(c), b.success()
                        } catch (d) {
                            a.log("Invalid credentials returned from onCredentialsExpired callback! (" + d.message + ")", "error"), b.failure("onCredentialsExpired did not return valid credentials.")
                        }
                    }, function(c) {
                        a.log("onCredentialsExpired callback indicated failure! (" + c + ")", "error"), b.failure("onCredentialsExpired callback failed.")
                    }) : (a.log("onCredentialsExpired callback did not return a promise!", "error"), b.failure("Unexpected return value for onCredentialsExpired.")), b
                }}, qq.FineUploaderBasic.prototype._createUploadHandler.call(this, b, "s3")
        },_determineKeyName: function(a, b) {
            var c = new qq.Promise, d = this._options.objectProperties.key, e = qq.getExtension(b), f = c.failure, g = function(a, b) {
                var d = a;
                void 0 !== b && (d += "." + b), c.success(d)
            };
            switch (d) {
                case "uuid":
                    g(this.getUuid(a), e);
                    break;
                case "filename":
                    g(b);
                    break;
                default:
                    qq.isFunction(d) ? this._handleKeynameFunction(d, a, g, f) : (this.log(d + " is not a valid value for the s3.keyname option!", "error"), f())
            }
            return c
        },_handleKeynameFunction: function(a, b, c, d) {
            var e = this, f = function(a) {
                c(a)
            }, g = function(a) {
                e.log(qq.format("Failed to retrieve key name for {}.  Reason: {}", b, a || "null"), "error"), d(a)
            }, h = a.call(this, b);
            qq.isGenericPromise(h) ? h.then(f, g) : null == h ? g() : f(h)
        },_getEndpointSpecificParams: function(a, b, c) {
            var d = {key: this.getKey(a),uuid: this.getUuid(a),name: this.getName(a),bucket: qq.s3.util.getBucket(this._endpointStore.get(a))};
            return c && c.getResponseHeader("ETag") ? d.etag = c.getResponseHeader("ETag") : b.etag && (d.etag = b.etag), d
        },_onSubmitDelete: function(a, b) {
            var c = {key: this.getKey(a),bucket: qq.s3.util.getBucket(this._endpointStore.get(a))};
            return qq.FineUploaderBasic.prototype._onSubmitDelete.call(this, a, b, c)
        },_addCannedFile: function(a) {
            var b;
            if (null == a.s3Key)
                throw new qq.Error("Did not find s3Key property in server session response.  This is required!");
            return b = qq.FineUploaderBasic.prototype._addCannedFile.apply(this, arguments), this._cannedKeys[b] = a.s3Key, b
        }})
}(), qq.s3.RequestSigner = function(a) {
    "use strict";
    function b(a, b, c) {
        var d, e, f = b.responseText, g = j[a], h = g.promise;
        if (delete j[a], f)
            try {
                e = qq.parseJson(f)
            } catch (i) {
                k.log("Error attempting to parse signature response: " + i, "error")
            }
        e && e.invalid ? (c = !0, d = "Invalid policy document or request headers!") : e ? k.expectingPolicy && !e.policy ? (c = !0, d = "Response does not include the base64 encoded policy!") : e.signature || (c = !0, d = "Response does not include the signature!") : (c = !0, d = "Received an empty or invalid response from the server!"), c ? (d && k.log(d, "error"), h.failure(d)) : h.success(e)
    }
    function c(a, b, c, d, e, f, g) {
        var h, j = "POST", k = [], l = "";
        switch (a) {
            case i.REQUEST_TYPE.MULTIPART_ABORT:
                j = "DELETE", h = qq.format("uploadId={}", f);
                break;
            case i.REQUEST_TYPE.MULTIPART_INITIATE:
                h = "uploads";
                break;
            case i.REQUEST_TYPE.MULTIPART_COMPLETE:
                h = qq.format("uploadId={}", f);
                break;
            case i.REQUEST_TYPE.MULTIPART_UPLOAD:
                j = "PUT", h = qq.format("partNumber={}&uploadId={}", g, f)
        }
        return h = c + "?" + h, qq.each(e, function(a) {
            k.push(a)
        }), k.sort(), qq.each(k, function(a, b) {
            l += b + ":" + e[b] + "\n"
        }), {toSign: qq.format("{}\n\n{}\n\n{}/{}/{}", j, d || "", l || "\n", b, h),endOfUrl: h}
    }
    function d(a, b, c, d) {
        var g;
        a.signatureConstructor ? (d && (g = a.signatureConstructor.getHeaders(), g[qq.s3.util.SESSION_TOKEN_PARAM_NAME] = d, a.signatureConstructor.withHeaders(g)), f(a.signatureConstructor.getToSign().stringToSign, b)) : (d && qq.s3.util.refreshPolicyCredentials(a, d), e(a, b, c, d))
    }
    function e(a, b, c, d) {
        var e = JSON.stringify(a), f = CryptoJS.enc.Utf8.parse(e), g = CryptoJS.enc.Base64.stringify(f), i = CryptoJS.HmacSHA1(g, h.get().secretKey), j = CryptoJS.enc.Base64.stringify(i);
        b.success({policy: g,signature: j}, c, d)
    }
    function f(a, b) {
        var c = CryptoJS.enc.Utf8.parse(a), d = CryptoJS.HmacSHA1(c, h.get().secretKey), e = CryptoJS.enc.Base64.stringify(d);
        b.success({signature: e})
    }
    var g, h, i = this, j = {}, k = {expectingPolicy: !1,method: "POST",signatureSpec: {credentialsProvider: {},endpoint: null,customHeaders: {}},maxConnections: 3,paramsStore: {},cors: {expected: !1,sendCredentials: !1},log: function() {
        }};
    qq.extend(k, a, !0), h = k.signatureSpec.credentialsProvider, g = qq.extend(this, new qq.AjaxRequester({acceptHeader: "application/json",method: k.method,contentType: "application/json; charset=utf-8",endpointStore: {get: function() {
                return k.signatureSpec.endpoint
            }},paramsStore: k.paramsStore,maxConnections: k.maxConnections,customHeaders: k.signatureSpec.customHeaders,log: k.log,onComplete: b,cors: k.cors,successfulResponseCodes: {POST: [200]}})), qq.extend(this, {getSignature: function(a, b) {
            var c = b, e = new qq.Promise;
            return h.get().secretKey && window.CryptoJS ? h.get().expiration.getTime() > Date.now() ? d(b, e) : h.onExpired().then(function() {
                d(b, e, h.get().accessKey, h.get().sessionToken)
            }, function() {
                k.log("Attempt to update expired credentials apparently failed! Unable to sign request.  ", "error"), e.failure("Unable to sign request - expired credentials.")
            }) : (k.log("Submitting S3 signature request for " + a), c.signatureConstructor && (c = {headers: c.signatureConstructor.getToSign().stringToSign}), g.initTransport(a).withParams(c).send(), j[a] = {promise: e}), e
        },constructStringToSign: function(a, b, d) {
            var e, f, g, i, j = {};
            return {withHeaders: function(a) {
                    return j = a, this
                },withUploadId: function(a) {
                    return e = a, this
                },withContentType: function(a) {
                    return f = a, this
                },withPartNum: function(a) {
                    return g = a, this
                },getToSign: function() {
                    var k = h.get().sessionToken;
                    return j["x-amz-date"] = (new Date).toUTCString(), k && (j[qq.s3.util.SESSION_TOKEN_PARAM_NAME] = k), i = c(a, b, d, f, j, e, g), {headers: function() {
                            return f && (j["Content-Type"] = f), j
                        }(),endOfUrl: i.endOfUrl,stringToSign: i.toSign}
                },getHeaders: function() {
                    return qq.extend({}, j)
                },getEndOfUrl: function() {
                    return i && i.endOfUrl
                }}
        }})
}, qq.s3.RequestSigner.prototype.REQUEST_TYPE = {MULTIPART_INITIATE: "multipart_initiate",MULTIPART_COMPLETE: "multipart_complete",MULTIPART_ABORT: "multipart_abort",MULTIPART_UPLOAD: "multipart_upload"}, qq.UploadSuccessAjaxRequester = function(a) {
    "use strict";
    function b(a, b, c) {
        var f, g = d[a], h = b.responseText, i = {success: !0}, j = {success: !1};
        delete d[a], e.log(qq.format("Received the following response body to an upload success request for id {}: {}", a, h));
        try {
            f = qq.parseJson(h), c || f && (f.error || f.success === !1) ? (e.log("Upload success request was rejected by the server.", "error"), g.failure(qq.extend(f, j))) : (e.log("Upload success was acknowledged by the server."), g.success(qq.extend(f, i)))
        } catch (k) {
            c ? (e.log(qq.format("Your server indicated failure in its upload success request response for id {}!", a), "error"), g.failure(j)) : (e.log("Upload success was acknowledged by the server."), g.success(i))
        }
    }
    var c, d = [], e = {method: "POST",endpoint: null,maxConnections: 3,customHeaders: {},paramsStore: {},cors: {expected: !1,sendCredentials: !1},log: function() {
        }};
    qq.extend(e, a), c = qq.extend(this, new qq.AjaxRequester({acceptHeader: "application/json",method: e.method,endpointStore: {get: function() {
                return e.endpoint
            }},paramsStore: e.paramsStore,maxConnections: e.maxConnections,customHeaders: e.customHeaders,log: e.log,onComplete: b,cors: e.cors,successfulResponseCodes: {POST: [200]}})), qq.extend(this, {sendSuccessRequest: function(a, b) {
            var f = new qq.Promise;
            return e.log("Submitting upload success request/notification for " + a), c.initTransport(a).withParams(b).send(), d[a] = f, f
        }})
}, qq.s3.InitiateMultipartAjaxRequester = function(a) {
    "use strict";
    function b(a) {
        var b, c = qq.s3.util.getBucket(g.endpointStore.get(a)), d = {}, f = new qq.Promise, h = g.getKey(a);
        return d["x-amz-acl"] = g.aclStore.get(a), g.reducedRedundancy && (d[qq.s3.util.REDUCED_REDUNDANCY_PARAM_NAME] = qq.s3.util.REDUCED_REDUNDANCY_PARAM_VALUE), g.serverSideEncryption && (d[qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_NAME] = qq.s3.util.SERVER_SIDE_ENCRYPTION_PARAM_VALUE), d[qq.s3.util.AWS_PARAM_PREFIX + g.filenameParam] = encodeURIComponent(g.getName(a)), qq.each(g.paramsStore.get(a), function(a, b) {
            d[qq.s3.util.AWS_PARAM_PREFIX + a] = encodeURIComponent(b)
        }), b = e.constructStringToSign(e.REQUEST_TYPE.MULTIPART_INITIATE, c, h).withContentType(g.getContentType(a)).withHeaders(d), e.getSignature(a, {signatureConstructor: b}).then(function(a) {
            d = b.getHeaders(), d.Authorization = "AWS " + g.signatureSpec.credentialsProvider.get().accessKey + ":" + a.signature, f.success(d, b.getEndOfUrl())
        }, f.failure), f
    }
    function c(a, b, c) {
        var d, e, h, i, j, k = f[a], l = new DOMParser, m = l.parseFromString(b.responseText, "application/xml");
        delete f[a], c ? (j = b.status, e = m.getElementsByTagName("Message"), e.length > 0 && (i = e[0].textContent)) : (d = m.getElementsByTagName("UploadId"), d.length > 0 ? h = d[0].textContent : i = "Upload ID missing from request"), void 0 === h ? (i ? g.log(qq.format("Specific problem detected initiating multipart upload request for {}: '{}'.", a, i), "error") : g.log(qq.format("Unexplained error with initiate multipart upload request for {}.  Status code {}.", a, j), "error"), k.failure("Problem initiating upload request with Amazon.", b)) : (g.log(qq.format("Initiate multipart upload request successful for {}.  Upload ID is {}", a, h)), k.success(h, b))
    }
    var d, e, f = {}, g = {filenameParam: "qqfilename",method: "POST",endpointStore: null,paramsStore: null,signatureSpec: null,aclStore: null,reducedRedundancy: !1,serverSideEncryption: !1,maxConnections: 3,getContentType: function() {
        },getKey: function() {
        },getName: function() {
        },log: function() {
        }};
    qq.extend(g, a), e = new qq.s3.RequestSigner({signatureSpec: g.signatureSpec,cors: g.cors,log: g.log}), d = qq.extend(this, new qq.AjaxRequester({method: g.method,contentType: null,endpointStore: g.endpointStore,maxConnections: g.maxConnections,allowXRequestedWithAndCacheControl: !1,log: g.log,onComplete: c,successfulResponseCodes: {POST: [200]}})), qq.extend(this, {send: function(a) {
            var c = new qq.Promise;
            return b(a).then(function(b, e) {
                g.log("Submitting S3 initiate multipart upload request for " + a), f[a] = c, d.initTransport(a).withPath(e).withHeaders(b).send()
            }, c.failure), c
        }})
}, qq.s3.CompleteMultipartAjaxRequester = function(a) {
    "use strict";
    function b(a, b) {
        var c = {}, d = new qq.Promise, e = h.endpointStore.get(a), g = qq.s3.util.getBucket(e), i = f.constructStringToSign(f.REQUEST_TYPE.MULTIPART_COMPLETE, g, h.getKey(a)).withUploadId(b).withContentType("application/xml; charset=UTF-8");
        return f.getSignature(a, {signatureConstructor: i}).then(function(a) {
            c = i.getHeaders(), c.Authorization = "AWS " + h.signatureSpec.credentialsProvider.get().accessKey + ":" + a.signature, d.success(c, i.getEndOfUrl())
        }, d.failure), d
    }
    function c(a, b, c) {
        var d = g[a], e = new DOMParser, f = h.endpointStore.get(a), i = qq.s3.util.getBucket(f), j = (h.getKey(a), e.parseFromString(b.responseText, "application/xml")), k = j.getElementsByTagName("Bucket"), l = j.getElementsByTagName("Key");
        delete g[a], h.log(qq.format("Complete response status {}, body = {}", b.status, b.responseText)), c ? h.log(qq.format("Complete Multipart Upload request for {} failed with status {}.", a, b.status), "error") : k.length && l.length ? k[0].textContent !== i && (c = !0, h.log(qq.format("Wrong bucket in response to Complete Multipart Upload request for {}.", a), "error")) : (c = !0, h.log(qq.format("Missing bucket and/or key in response to Complete Multipart Upload request for {}.", a), "error")), c ? d.failure("Problem asking Amazon to combine the parts!", b) : d.success(b)
    }
    function d(a) {
        var b = document.implementation.createDocument(null, "CompleteMultipartUpload", null);
        return a.sort(function(a, b) {
            return a.part - b.part
        }), qq.each(a, function(a, c) {
            var d = c.part, e = c.etag, f = b.createElement("Part"), g = b.createElement("PartNumber"), h = b.createTextNode(d), i = b.createTextNode(e), j = b.createElement("ETag");
            j.appendChild(i), g.appendChild(h), f.appendChild(g), f.appendChild(j), qq(b).children()[0].appendChild(f)
        }), (new XMLSerializer).serializeToString(b)
    }
    var e, f, g = {}, h = {method: "POST",contentType: "text/xml",endpointStore: null,signatureSpec: null,maxConnections: 3,getKey: function() {
        },log: function() {
        }};
    qq.extend(h, a), f = new qq.s3.RequestSigner({signatureSpec: h.signatureSpec,cors: h.cors,log: h.log}), e = qq.extend(this, new qq.AjaxRequester({method: h.method,contentType: "application/xml; charset=UTF-8",endpointStore: h.endpointStore,maxConnections: h.maxConnections,allowXRequestedWithAndCacheControl: !1,log: h.log,onComplete: c,successfulResponseCodes: {POST: [200]}})), qq.extend(this, {send: function(a, c, f) {
            var i = new qq.Promise;
            return b(a, c).then(function(b, c) {
                var j = d(f);
                h.log("Submitting S3 complete multipart upload request for " + a), g[a] = i, delete b["Content-Type"], e.initTransport(a).withPath(c).withHeaders(b).withPayload(j).send()
            }, i.failure), i
        }})
}, qq.s3.AbortMultipartAjaxRequester = function(a) {
    "use strict";
    function b(a, b) {
        var c = {}, d = new qq.Promise, g = f.endpointStore.get(a), h = qq.s3.util.getBucket(g), i = e.constructStringToSign(e.REQUEST_TYPE.MULTIPART_ABORT, h, f.getKey(a)).withUploadId(b);
        return e.getSignature(a, {signatureConstructor: i}).then(function(a) {
            c = i.getHeaders(), c.Authorization = "AWS " + f.signatureSpec.credentialsProvider.get().accessKey + ":" + a.signature, d.success(c, i.getEndOfUrl())
        }, d.failure), d
    }
    function c(a, b, c) {
        var d, e = new DOMParser, g = e.parseFromString(b.responseText, "application/xml"), h = g.getElementsByTagName("Error");
        f.log(qq.format("Abort response status {}, body = {}", b.status, b.responseText)), c ? f.log(qq.format("Abort Multipart Upload request for {} failed with status {}.", a, b.status), "error") : h.length ? (c = !0, d = g.getElementsByTagName("Message")[0].textContent, f.log(qq.format("Failed to Abort Multipart Upload request for {}.  Error: {}", a, d), "error")) : f.log(qq.format("Abort MPU request succeeded for file ID {}.", a))
    }
    var d, e, f = {method: "DELETE",endpointStore: null,signatureSpec: null,maxConnections: 3,getKey: function() {
        },log: function() {
        }};
    qq.extend(f, a), e = new qq.s3.RequestSigner({signatureSpec: f.signatureSpec,cors: f.cors,log: f.log}), d = qq.extend(this, new qq.AjaxRequester({validMethods: ["DELETE"],method: f.method,contentType: null,endpointStore: f.endpointStore,maxConnections: f.maxConnections,allowXRequestedWithAndCacheControl: !1,log: f.log,onComplete: c,successfulResponseCodes: {DELETE: [204]}})), qq.extend(this, {send: function(a, c) {
            b(a, c).then(function(b, c) {
                f.log("Submitting S3 Abort multipart upload request for " + a), d.initTransport(a).withPath(c).withHeaders(b).send()
            })
        }})
}, qq.s3.XhrUploadHandler = function(a, b) {
    "use strict";
    var c = b.getName, d = b.log, e = 200, f = a.getKeyName, g = a.filenameParam, h = a.paramsStore, i = a.endpointStore, j = a.aclStore, k = a.objectProperties.reducedRedundancy, l = a.objectProperties.serverSideEncryption, m = a.validation, n = a.signature, o = this, p = a.signature.credentialsProvider, q = {combine: function(a) {
            var b = o._getPersistableData(a).uploadId, c = o._getPersistableData(a).etags, d = new qq.Promise;
            return r.completeMultipart.send(a, b, c).then(d.success, function(b, c) {
                d.failure(t.done(a, c).response, c)
            }), d
        },done: function(a, b, c) {
            var d, e = t.response.parse(a, b);
            e.success && (d = b.getResponseHeader("ETag"), o._getPersistableData(a).etags || (o._getPersistableData(a).etags = []), o._getPersistableData(a).etags.push({part: c + 1,etag: d}))
        },initHeaders: function(b, c) {
            var d = {}, e = a.endpointStore.get(b), f = qq.s3.util.getBucket(e), g = t.key.urlSafe(b), h = new qq.Promise, i = r.restSignature.constructStringToSign(r.restSignature.REQUEST_TYPE.MULTIPART_UPLOAD, f, g).withPartNum(c + 1).withUploadId(o._getPersistableData(b).uploadId);
            return r.restSignature.getSignature(b + "." + c, {signatureConstructor: i}).then(function(a) {
                d = i.getHeaders(), d.Authorization = "AWS " + p.get().accessKey + ":" + a.signature, h.success(d, i.getEndOfUrl())
            }, h.failure), h
        },put: function(b, c) {
            var d = o._createXhr(b, c), e = o._getChunkData(b, c), f = a.endpointStore.get(b), g = new qq.Promise;
            return q.initHeaders(b, c).then(function(a, h) {
                var i = f + "/" + h;
                o._registerProgressHandler(b, c, e.size), t.track(b, d, c).then(g.success, g.failure), d.open("PUT", i, !0), qq.each(a, function(a, b) {
                    d.setRequestHeader(a, b)
                }), d.send(e.blob)
            }, function() {
                g.failure({error: "Problem signing the chunk!"}, d)
            }), g
        },send: function(a, b) {
            var c = new qq.Promise;
            return q.setup(a).then(function() {
                q.put(a, b).then(c.success, c.failure)
            }, function(a, b) {
                c.failure({error: a}, b)
            }), c
        },setup: function(a) {
            var b = new qq.Promise, c = o._getPersistableData(a).uploadId, d = new qq.Promise;
            return c ? c instanceof qq.Promise ? c.then(function(a) {
                b.success(a)
            }) : b.success(c) : (o._getPersistableData(a).uploadId = d, r.initiateMultipart.send(a).then(function(c) {
                o._getPersistableData(a).uploadId = c, d.success(c), b.success(c)
            }, function(c) {
                o._getPersistableData(a).uploadId = null, b.failure(c), d.failure(c)
            })), b
        }}, r = {abortMultipart: new qq.s3.AbortMultipartAjaxRequester({endpointStore: i,signatureSpec: n,cors: a.cors,log: d,getKey: function(a) {
                return t.key.urlSafe(a)
            }}),completeMultipart: new qq.s3.CompleteMultipartAjaxRequester({endpointStore: i,signatureSpec: n,cors: a.cors,log: d,getKey: function(a) {
                return t.key.urlSafe(a)
            }}),initiateMultipart: new qq.s3.InitiateMultipartAjaxRequester({filenameParam: g,endpointStore: i,paramsStore: h,signatureSpec: n,aclStore: j,reducedRedundancy: k,serverSideEncryption: l,cors: a.cors,log: d,getContentType: function(a) {
                return o._getMimeType(a)
            },getKey: function(a) {
                return t.key.urlSafe(a)
            },getName: function(a) {
                return c(a)
            }}),policySignature: new qq.s3.RequestSigner({expectingPolicy: !0,signatureSpec: n,cors: a.cors,log: d}),restSignature: new qq.s3.RequestSigner({signatureSpec: n,cors: a.cors,log: d})}, s = {initParams: function(a) {
            var b = h.get(a);
            return b[g] = c(a), qq.s3.util.generateAwsParams({endpoint: i.get(a),params: b,type: o._getMimeType(a),key: o.getThirdPartyFileId(a),accessKey: p.get().accessKey,sessionToken: p.get().sessionToken,acl: j.get(a),expectedStatus: e,minFileSize: m.minSizeLimit,maxFileSize: m.maxSizeLimit,reducedRedundancy: k,serverSideEncryption: l,log: d}, qq.bind(r.policySignature.getSignature, this, a))
        },send: function(a) {
            var b = new qq.Promise, c = o._createXhr(a), e = o.getFile(a);
            return o._registerProgressHandler(a), t.track(a, c).then(b.success, b.failure), s.setup(a, c, e).then(function(b) {
                d("Sending upload request for " + a), c.send(b)
            }, b.failure), b
        },setup: function(a, b, c) {
            var d = new FormData, e = i.get(a), f = e, g = new qq.Promise;
            return s.initParams(a).then(function(a) {
                b.open("POST", f, !0), qq.obj2FormData(a, d), d.append("file", c), g.success(d)
            }, function(a) {
                g.failure({error: a})
            }), g
        }}, t = {done: function(a, b) {
            var c = t.response.parse(a, b), e = c.success !== !0;
            return e && t.response.shouldReset(c.code) && (d("This is an unrecoverable error, we must restart the upload entirely on the next retry attempt.", "error"), c.reset = !0), {success: !e,response: c}
        },key: {promise: function(a) {
                var b = new qq.Promise, d = o.getThirdPartyFileId(a);
                return null == d ? (d = new qq.Promise, o._setThirdPartyFileId(a, d), f(a, c(a)).then(function(c) {
                    o._setThirdPartyFileId(a, c), b.success(c)
                }, function(c) {
                    o._setThirdPartyFileId(a, null), b.failure(c)
                })) : qq.isGenericPromise(d) ? b.then(d.success, d.failure) : b.success(d), b
            },urlSafe: function(a) {
                return encodeURIComponent(o.getThirdPartyFileId(a))
            }},response: {parse: function(a, b) {
                var c, f = {};
                try {
                    d(qq.format("Received response status {} with body: {}", b.status, b.responseText)), b.status === e ? f.success = !0 : (c = t.response.parseError(b.responseText), c && (f.error = c.message, f.code = c.code))
                } catch (g) {
                    d("Error when attempting to parse xhr response text (" + g.message + ")", "error")
                }
                return f
            },parseError: function(a) {
                var b, c, d = new DOMParser, e = d.parseFromString(a, "application/xml"), f = e.getElementsByTagName("Error"), g = {};
                return f.length ? (b = e.getElementsByTagName("Code"), c = e.getElementsByTagName("Message"), c.length && (g.message = c[0].textContent), b.length && (g.code = b[0].textContent), g) : void 0
            },shouldReset: function(a) {
                return "EntityTooSmall" === a || "InvalidPart" === a || "InvalidPartOrder" === a || "NoSuchUpload" === a
            }},start: function(a, b) {
            var c = new qq.Promise;
            return t.key.promise(a).then(function() {
                null == b ? s.send(a).then(c.success, c.failure) : q.send(a, b).then(c.success, c.failure)
            }, function(a) {
                c.failure({error: a})
            }), c
        },track: function(a, b, c) {
            var d = new qq.Promise;
            return b.onreadystatechange = function() {
                if (4 === b.readyState) {
                    var e;
                    null == c ? (e = t.done(a, b), d[e.success ? "success" : "failure"](e.response, b)) : (q.done(a, b, c), e = t.done(a, b), d[e.success ? "success" : "failure"](e.response, b))
                }
            }, d
        }};
    qq.extend(this, {uploadChunk: t.start,uploadFile: t.start}), qq.extend(this, new qq.XhrUploadHandler({options: qq.extend({namespace: "s3"}, a),proxy: qq.extend({getEndpoint: a.endpointStore.get}, b)})), qq.override(this, function(a) {
        return {expunge: function(b) {
                var c = o._getPersistableData(b) && o._getPersistableData(b).uploadId, d = o._maybeDeletePersistedChunkData(b);
                void 0 !== c && d && r.abortMultipart.send(b, c), a.expunge(b)
            },finalizeChunks: function(a) {
                return q.combine(a)
            },_getLocalStorageId: function(b) {
                var c = a._getLocalStorageId(b), d = i.get(b), e = qq.s3.util.getBucket(d);
                return c + "-" + e
            }}
    })
}, qq.s3.FormUploadHandler = function(a, b) {
    "use strict";
    function c(b, c) {
        var d = a.endpointStore.get(b), e = qq.s3.util.getBucket(d);
        try {
            var f = c.contentDocument || c.contentWindow.document;
            f.body.innerHTML;
            var g = qq.s3.util.parseIframeResponse(c);
            if (g.bucket === e && g.key === qq.s3.util.encodeQueryStringParam(h.getThirdPartyFileId(b)))
                return !0;
            l("Response from AWS included an unexpected bucket or key name.", "error")
        } catch (i) {
            l("Error when attempting to parse form upload response (" + i.message + ")", "error")
        }
        return !1
    }
    function d(a) {
        var b = o.get(a);
        return b[n] = j(a), qq.s3.util.generateAwsParams({endpoint: p.get(a),params: b,key: h.getThirdPartyFileId(a),accessKey: w.get().accessKey,sessionToken: w.get().sessionToken,acl: q.get(a),minFileSize: t.minSizeLimit,maxFileSize: t.maxSizeLimit,successRedirectUrl: v,reducedRedundancy: r,serverSideEncryption: s,log: l}, qq.bind(x.getSignature, this, a))
    }
    function e(b, c) {
        var e = new qq.Promise, f = a.demoMode ? "GET" : "POST", i = a.endpointStore.get(b), k = j(b);
        return d(b).then(function(a) {
            var b = h._initFormForUpload({method: f,endpoint: i,params: a,paramsInBody: !0,targetName: c.name});
            e.success(b)
        }, function(a) {
            e.failure(a), g(b, c, k, {error: a})
        }), e
    }
    function f(a) {
        var b = h._createIframe(a), d = h.getInput(a), f = new qq.Promise;
        return e(a, b).then(function(e) {
            e.appendChild(d), h._attachLoadEvent(b, function(d) {
                l("iframe loaded"), d ? d.success === !1 && (l("Amazon likely rejected the upload request", "error"), f.failure(d)) : (d = {}, d.success = c(a, b), d.success === !1 ? (l("A success response was received by Amazon, but it was invalid in some way.", "error"), f.failure(d)) : (qq.extend(d, qq.s3.util.parseIframeResponse(b)), f.success(d))), g(a, b)
            }), l("Sending upload request for " + a), e.submit(), qq(e).remove()
        }, f.failure), f
    }
    function g(a, b) {
        h._detachLoadEvent(a), b && qq(b).remove()
    }
    var h = this, i = b.onUuidChanged, j = b.getName, k = b.getUuid, l = b.log, m = a.getKeyName, n = a.filenameParam, o = a.paramsStore, p = a.endpointStore, q = a.aclStore, r = a.objectProperties.reducedRedundancy, s = a.objectProperties.serverSideEncryption, t = a.validation, u = a.signature, v = a.iframeSupport.localBlankPagePath, w = a.signature.credentialsProvider, x = new qq.s3.RequestSigner({signatureSpec: u,cors: a.cors,log: l});
    if (void 0 === v)
        throw new Error("successRedirectEndpoint MUST be defined if you intend to use browsers that do not support the File API!");
    qq.extend(this, new qq.FormUploadHandler({options: {isCors: !1,inputName: "file"},proxy: {onCancel: a.onCancel,onUuidChanged: i,getName: j,getUuid: k,log: l}})), qq.extend(this, {uploadFile: function(a) {
            var b = j(a), c = new qq.Promise;
            return h.getThirdPartyFileId(a) ? f(a).then(c.success, c.failure) : m(a, b).then(function(b) {
                h._setThirdPartyFileId(a, b), f(a).then(c.success, c.failure)
            }, function(a) {
                c.failure({error: a})
            }), c
        }})
}, function() {
    "use strict";
    qq.s3.FineUploader = function(a) {
        var b = {failedUploadTextDisplay: {mode: "custom"}};
        qq.extend(b, a, !0), qq.FineUploader.call(this, b, "s3"), qq.supportedFeatures.ajaxUploading || void 0 !== b.iframeSupport.localBlankPagePath || (this._options.element.innerHTML = "<div>You MUST set the <code>localBlankPagePath</code> property of the <code>iframeSupport</code> option since this browser does not support the File API!</div>")
    }, qq.extend(qq.s3.FineUploader.prototype, qq.s3.FineUploaderBasic.prototype), qq.extend(qq.s3.FineUploader.prototype, qq.uiPublicApi), qq.extend(qq.s3.FineUploader.prototype, qq.uiPrivateApi)
}(), function(a) {
    "use strict";
    a.fn.fineUploaderS3 = function(b) {
        return "object" == typeof b && (b.endpointType = "s3"), a.fn.fineUploader.apply(this, arguments)
    }
}(jQuery), qq.azure = qq.azure || {}, qq.azure.util = qq.azure.util || function() {
    "use strict";
    return {AZURE_PARAM_PREFIX: "x-ms-meta-",getParamsAsHeaders: function(a) {
            var b = {};
            return qq.each(a, function(a, c) {
                var d = qq.azure.util.AZURE_PARAM_PREFIX + a;
                qq.isFunction(c) ? b[d] = encodeURIComponent(String(c())) : qq.isObject(c) ? qq.extend(b, qq.azure.util.getParamsAsHeaders(c)) : b[d] = encodeURIComponent(String(c))
            }), b
        },parseAzureError: function(a, b) {
            var c, d, e = new DOMParser, f = e.parseFromString(a, "application/xml"), g = f.getElementsByTagName("Error")[0], h = {};
            return b("Received error response: " + a, "error"), g ? (d = g.getElementsByTagName("Message")[0], d && (h.message = d.textContent), c = g.getElementsByTagName("Code")[0], c && (h.code = c.textContent), b("Parsed Azure error: " + JSON.stringify(h), "error"), h) : void 0
        }}
}(), function() {
    "use strict";
    qq.azure.FineUploaderBasic = function(a) {
        if (!qq.supportedFeatures.ajaxUploading)
            throw new qq.Error("Uploading directly to Azure is not possible in this browser.");
        var b = {signature: {endpoint: null,customHeaders: {}},blobProperties: {name: "uuid"},uploadSuccess: {endpoint: null,params: {},customHeaders: {}},chunking: {partSize: 4e6,minFileSize: 4000001}};
        qq.extend(b, a, !0), qq.FineUploaderBasic.call(this, b), this._uploadSuccessParamsStore = this._createStore(this._options.uploadSuccess.params), this._failedSuccessRequestCallbacks = {}, this._cannedBlobNames = {}
    }, qq.extend(qq.azure.FineUploaderBasic.prototype, qq.basePublicApi), qq.extend(qq.azure.FineUploaderBasic.prototype, qq.basePrivateApi), qq.extend(qq.azure.FineUploaderBasic.prototype, qq.nonTraditionalBasePublicApi), qq.extend(qq.azure.FineUploaderBasic.prototype, qq.nonTraditionalBasePrivateApi), qq.extend(qq.azure.FineUploaderBasic.prototype, {getBlobName: function(a) {
            return null == this._cannedBlobNames[a] ? this._handler.getThirdPartyFileId(a) : this._cannedBlobNames[a]
        },_getEndpointSpecificParams: function(a) {
            return {blob: this.getBlobName(a),uuid: this.getUuid(a),name: this.getName(a),container: this._endpointStore.get(a)}
        },_createUploadHandler: function() {
            return qq.FineUploaderBasic.prototype._createUploadHandler.call(this, {signature: this._options.signature,onGetBlobName: qq.bind(this._determineBlobName, this),deleteBlob: qq.bind(this._deleteBlob, this, !0)}, "azure")
        },_determineBlobName: function(a) {
            var b = this._options.blobProperties.name, c = this.getUuid(a), d = this.getName(a), e = qq.getExtension(d);
            if (!qq.isString(b))
                return b.call(this, a);
            switch (b) {
                case "uuid":
                    return (new qq.Promise).success(c + "." + e);
                case "filename":
                    return (new qq.Promise).success(d);
                default:
                    return new qq.Promise.failure("Invalid blobName option value - " + b)
            }
        },_addCannedFile: function(a) {
            var b;
            if (null == a.blobName)
                throw new qq.Error("Did not find blob name property in server session response.  This is required!");
            return b = qq.FineUploaderBasic.prototype._addCannedFile.apply(this, arguments), this._cannedBlobNames[b] = a.blobName, b
        },_deleteBlob: function(a, b) {
            var c = this, d = {}, e = {get: function(a) {
                    return c._endpointStore.get(a) + "/" + c.getBlobName(a)
                }}, f = {get: function(a) {
                    return d[a]
                }}, g = function(a, b) {
                d[a] = b, i.send(a)
            }, h = function(b, d, e) {
                a ? (c.log("Will cancel upload, but cannot remove uncommitted parts from Azure due to issue retrieving SAS", "error"), qq.FineUploaderBasic.prototype._onCancel.call(c, b, c.getName(b))) : (c._onDeleteComplete(b, e, !0), c._options.callbacks.onDeleteComplete(b, e, !0))
            }, i = new qq.azure.DeleteBlob({endpointStore: f,log: qq.bind(c.log, c),onDelete: function(a) {
                    c._onDelete(a), c._options.callbacks.onDelete(a)
                },onDeleteComplete: function(b, e, f) {
                    delete d[b], f && (a ? c.log("Will cancel upload, but failed to remove uncommitted parts from Azure.", "error") : qq.azure.util.parseAzureError(e.responseText, qq.bind(c.log, c))), a ? (qq.FineUploaderBasic.prototype._onCancel.call(c, b, c.getName(b)), c.log("Deleted uncommitted blob chunks for " + b)) : (c._onDeleteComplete(b, e, f), c._options.callbacks.onDeleteComplete(b, e, f))
                }}), j = new qq.azure.GetSas({cors: this._options.cors,endpointStore: {get: function() {
                        return c._options.signature.endpoint
                    }},restRequestVerb: i.method,log: qq.bind(c.log, c)});
            j.request(b, e.get(b)).then(qq.bind(g, c, b), qq.bind(h, c, b))
        },_createDeleteHandler: function() {
            var a = this;
            return {sendDelete: function(b) {
                    a._deleteBlob(!1, b)
                }}
        }})
}(), qq.azure.XhrUploadHandler = function(a, b) {
    "use strict";
    function c(a) {
        var b = new qq.Promise;
        return e(a).then(function(c) {
            var d = g._getMimeType(a), e = g._getPersistableData(a).blockIdEntries;
            t.putBlockList.send(a, c, e, d, function(b) {
                g._registerXhr(a, null, b, t.putBlockList)
            }).then(function(c) {
                h("Success combining chunks for id " + a), b.success({}, c)
            }, function(c) {
                h("Attempt to combine chunks failed for id " + a, "error"), f(c, b)
            })
        }, b.failure), b
    }
    function d(a) {
        var b = j.get(a), c = new qq.Promise, d = function(d) {
            g._setThirdPartyFileId(a, d), c.success(b + "/" + d)
        }, e = function(a) {
            c.failure(a)
        };
        return p(a).then(d, e), c
    }
    function e(a, b) {
        var c = null == b ? a : a + "." + b, e = new qq.Promise, f = function(a) {
            h("GET SAS request succeeded."), e.success(a)
        }, g = function(a, b) {
            h("GET SAS request failed: " + a, "error"), e.failure({error: "Problem communicating with local server"}, b)
        }, i = function(a) {
            t.getSasForPutBlobOrBlock.request(c, a).then(f, g)
        }, j = function(b) {
            h(qq.format("Failed to determine blob name for ID {} - {}", a, b), "error"), e.failure({error: b})
        };
        return d(a).then(i, j), e
    }
    function f(a, b) {
        var c = qq.azure.util.parseAzureError(a.responseText, h), d = "Problem sending file to Azure";
        b.failure({error: d,azureError: c && c.message,reset: 403 === a.status})
    }
    var g = this, h = b.log, i = a.cors, j = a.endpointStore, k = a.paramsStore, l = a.signature, m = a.filenameParam, n = a.chunking.minFileSize, o = a.deleteBlob, p = a.onGetBlobName, q = b.getName, r = b.getSize, s = function(a) {
        var b = k.get(a);
        return b[m] = q(a), b
    }, t = {putBlob: new qq.azure.PutBlob({getBlobMetadata: s,log: h}),putBlock: new qq.azure.PutBlock({log: h}),putBlockList: new qq.azure.PutBlockList({getBlobMetadata: s,log: h}),getSasForPutBlobOrBlock: new qq.azure.GetSas({cors: i,customHeaders: l.customHeaders,endpointStore: {get: function() {
                    return l.endpoint
                }},log: h,restRequestVerb: "PUT"})};
    qq.extend(this, {uploadChunk: function(a, b) {
            var c = new qq.Promise;
            return e(a, b).then(function(d) {
                var e = g._createXhr(a, b), i = g._getChunkData(a, b);
                g._registerProgressHandler(a, b, i.size), g._registerXhr(a, b, e, t.putBlock), t.putBlock.upload(a + "." + b, e, d, b, i.blob).then(function(b) {
                    g._getPersistableData(a).blockIdEntries || (g._getPersistableData(a).blockIdEntries = []), g._getPersistableData(a).blockIdEntries.push(b), h("Put Block call succeeded for " + a), c.success({}, e)
                }, function() {
                    h(qq.format("Put Block call failed for ID {} on part {}", a, b), "error"), f(e, c)
                })
            }, c.failure), c
        },uploadFile: function(a) {
            var b = new qq.Promise, c = g.getFile(a);
            return e(a).then(function(d) {
                var e = g._createXhr(a);
                g._registerProgressHandler(a), t.putBlob.upload(a, e, d, c).then(function() {
                    h("Put Blob call succeeded for " + a), b.success({}, e)
                }, function() {
                    h("Put Blob call failed for " + a, "error"), f(e, b)
                })
            }, b.failure), b
        }}), qq.extend(this, new qq.XhrUploadHandler({options: qq.extend({namespace: "azure"}, a),proxy: qq.extend({getEndpoint: a.endpointStore.get}, b)})), qq.override(this, function(a) {
        return {expunge: function(b) {
                var c = g._wasCanceled(b), d = g._getPersistableData(b), e = d && d.blockIdEntries || [];
                c && e.length > 0 && o(b), a.expunge(b)
            },finalizeChunks: function(a) {
                return c(a)
            },_shouldChunkThisFile: function(b) {
                var c = a._shouldChunkThisFile(b);
                return c && r(b) >= n
            }}
    })
}, qq.azure.GetSas = function(a) {
    "use strict";
    function b(a, b, c) {
        var d = e[a];
        c ? d.failure("Received response code " + b.status, b) : b.responseText.length ? d.success(b.responseText) : d.failure("Empty response.", b), delete e[a]
    }
    var c, d = {cors: {expected: !1,sendCredentials: !1},customHeaders: {},restRequestVerb: "PUT",endpointStore: null,log: function() {
        }}, e = {};
    qq.extend(d, a), c = qq.extend(this, new qq.AjaxRequester({acceptHeader: "application/json",validMethods: ["GET"],method: "GET",successfulResponseCodes: {GET: [200]},contentType: null,customHeaders: d.customHeaders,endpointStore: d.endpointStore,cors: d.cors,log: d.log,onComplete: b})), qq.extend(this, {request: function(a, b) {
            var f = new qq.Promise, g = d.restRequestVerb;
            return d.log(qq.format("Submitting GET SAS request for a {} REST request related to file ID {}.", g, a)), e[a] = f, c.initTransport(a).withParams({bloburi: b,_method: g}).withCacheBuster().send(), f
        }})
}, qq.azure.DeleteBlob = function(a) {
    "use strict";
    var b, c = "DELETE", d = {endpointStore: {},onDelete: function() {
        },onDeleteComplete: function() {
        },log: function() {
        }};
    qq.extend(d, a), b = qq.extend(this, new qq.AjaxRequester({validMethods: [c],method: c,successfulResponseCodes: function() {
            var a = {};
            return a[c] = [202], a
        }(),contentType: null,endpointStore: d.endpointStore,allowXRequestedWithAndCacheControl: !1,cors: {expected: !0},log: d.log,onSend: d.onDelete,onComplete: d.onDeleteComplete})), qq.extend(this, {method: c,send: function(a) {
            return d.log("Submitting Delete Blob request for " + a), b.initTransport(a).send()
        }})
}, qq.azure.PutBlob = function(a) {
    "use strict";
    var b, c = "PUT", d = {getBlobMetadata: function() {
        },log: function() {
        }}, e = {}, f = {}, g = {get: function(a) {
            return e[a]
        }};
    qq.extend(d, a), b = qq.extend(this, new qq.AjaxRequester({validMethods: [c],method: c,successfulResponseCodes: function() {
            var a = {};
            return a[c] = [201], a
        }(),contentType: null,customHeaders: function(a) {
            var b = d.getBlobMetadata(a), c = qq.azure.util.getParamsAsHeaders(b);
            return c["x-ms-blob-type"] = "BlockBlob", c
        },endpointStore: g,allowXRequestedWithAndCacheControl: !1,cors: {expected: !0},log: d.log,onComplete: function(a, b, c) {
            var d = f[a];
            delete e[a], delete f[a], c ? d.failure() : d.success()
        }})), qq.extend(this, {method: c,upload: function(a, c, g, h) {
            var i = new qq.Promise;
            return d.log("Submitting Put Blob request for " + a), f[a] = i, e[a] = g, b.initTransport(a).withPayload(h).withHeaders({"Content-Type": h.type}).send(c), i
        }})
}, qq.azure.PutBlockList = function(a) {
    "use strict";
    function b(a) {
        var b = document.implementation.createDocument(null, "BlockList", null);
        return a.sort(function(a, b) {
            return a.part - b.part
        }), qq.each(a, function(a, c) {
            var d = b.createElement("Latest"), e = b.createTextNode(c.id);
            d.appendChild(e), qq(b).children()[0].appendChild(d)
        }), (new XMLSerializer).serializeToString(b)
    }
    var c, d = "PUT", e = {}, f = {getBlobMetadata: function() {
        },log: function() {
        }}, g = {}, h = {get: function(a) {
            return g[a]
        }};
    qq.extend(f, a), c = qq.extend(this, new qq.AjaxRequester({validMethods: [d],method: d,successfulResponseCodes: function() {
            var a = {};
            return a[d] = [201], a
        }(),customHeaders: function(a) {
            var b = f.getBlobMetadata(a);
            return qq.azure.util.getParamsAsHeaders(b)
        },contentType: "text/plain",endpointStore: h,allowXRequestedWithAndCacheControl: !1,cors: {expected: !0},log: f.log,onSend: function() {
        },onComplete: function(a, b, c) {
            var d = e[a];
            delete g[a], delete e[a], c ? d.failure(b) : d.success(b)
        }})), qq.extend(this, {method: d,send: function(a, d, h, i, j) {
            var k, l = new qq.Promise, m = b(h);
            return e[a] = l, f.log(qq.format("Submitting Put Block List request for {}", a)), g[a] = qq.format("{}&comp=blocklist", d), k = c.initTransport(a).withPayload(m).withHeaders({"x-ms-blob-content-type": i}).send(), j(k), l
        }})
}, qq.azure.PutBlock = function(a) {
    "use strict";
    function b(a) {
        var b = 5, c = new Array(b + 1).join("0"), d = (c + a).slice(-b);
        return btoa(d)
    }
    var c, d = "PUT", e = {}, f = {}, g = {log: function() {
        }}, h = {}, i = {get: function(a) {
            return h[a]
        }};
    qq.extend(g, a), c = qq.extend(this, new qq.AjaxRequester({validMethods: [d],method: d,successfulResponseCodes: function() {
            var a = {};
            return a[d] = [201], a
        }(),contentType: null,endpointStore: i,allowXRequestedWithAndCacheControl: !1,cors: {expected: !0},log: g.log,onComplete: function(a, b, c) {
            var d = f[a], g = e[a];
            delete h[a], delete f[a], delete e[a], c ? d.failure() : d.success(g)
        }})), qq.extend(this, {method: d,upload: function(a, d, i, j, k) {
            var l = new qq.Promise, m = b(j);
            return f[a] = l, g.log(qq.format("Submitting Put Block request for {} = part {}", a, j)), h[a] = qq.format("{}&comp=block&blockid={}", i, encodeURIComponent(m)), e[a] = {part: j,id: m}, c.initTransport(a).withPayload(k).send(d), l
        }})
}, function() {
    "use strict";
    qq.azure.FineUploader = function(a) {
        var b = {failedUploadTextDisplay: {mode: "custom"}};
        qq.extend(b, a, !0), qq.FineUploader.call(this, b, "azure")
    }, qq.extend(qq.azure.FineUploader.prototype, qq.azure.FineUploaderBasic.prototype), qq.extend(qq.azure.FineUploader.prototype, qq.uiPublicApi), qq.extend(qq.azure.FineUploader.prototype, qq.uiPrivateApi), qq.extend(qq.azure.FineUploader.prototype, {})
}(), function(a) {
    "use strict";
    a.fn.fineUploaderAzure = function(b) {
        return "object" == typeof b && (b.endpointType = "azure"), a.fn.fineUploader.apply(this, arguments)
    }
}(jQuery);
var CryptoJS = CryptoJS || function(a, b) {
    var c = {}, d = c.lib = {}, e = d.Base = function() {
        function a() {
        }
        return {extend: function(b) {
                a.prototype = this;
                var c = new a;
                return b && c.mixIn(b), c.hasOwnProperty("init") || (c.init = function() {
                    c.$super.init.apply(this, arguments)
                }), c.init.prototype = c, c.$super = this, c
            },create: function() {
                var a = this.extend();
                return a.init.apply(a, arguments), a
            },init: function() {
            },mixIn: function(a) {
                for (var b in a)
                    a.hasOwnProperty(b) && (this[b] = a[b]);
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            },clone: function() {
                return this.init.prototype.extend(this)
            }}
    }(), f = d.WordArray = e.extend({init: function(a, c) {
            a = this.words = a || [], this.sigBytes = c != b ? c : 4 * a.length
        },toString: function(a) {
            return (a || h).stringify(this)
        },concat: function(a) {
            var b = this.words, c = a.words, d = this.sigBytes, e = a.sigBytes;
            if (this.clamp(), d % 4)
                for (var f = 0; e > f; f++) {
                    var g = 255 & c[f >>> 2] >>> 24 - 8 * (f % 4);
                    b[d + f >>> 2] |= g << 24 - 8 * ((d + f) % 4)
                }
            else if (c.length > 65535)
                for (var f = 0; e > f; f += 4)
                    b[d + f >>> 2] = c[f >>> 2];
            else
                b.push.apply(b, c);
            return this.sigBytes += e, this
        },clamp: function() {
            var b = this.words, c = this.sigBytes;
            b[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4), b.length = a.ceil(c / 4)
        },clone: function() {
            var a = e.clone.call(this);
            return a.words = this.words.slice(0), a
        },random: function(b) {
            for (var c = [], d = 0; b > d; d += 4)
                c.push(0 | 4294967296 * a.random());
            return new f.init(c, b)
        }}), g = c.enc = {}, h = g.Hex = {stringify: function(a) {
            for (var b = a.words, c = a.sigBytes, d = [], e = 0; c > e; e++) {
                var f = 255 & b[e >>> 2] >>> 24 - 8 * (e % 4);
                d.push((f >>> 4).toString(16)), d.push((15 & f).toString(16))
            }
            return d.join("")
        },parse: function(a) {
            for (var b = a.length, c = [], d = 0; b > d; d += 2)
                c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
            return new f.init(c, b / 2)
        }}, i = g.Latin1 = {stringify: function(a) {
            for (var b = a.words, c = a.sigBytes, d = [], e = 0; c > e; e++) {
                var f = 255 & b[e >>> 2] >>> 24 - 8 * (e % 4);
                d.push(String.fromCharCode(f))
            }
            return d.join("")
        },parse: function(a) {
            for (var b = a.length, c = [], d = 0; b > d; d++)
                c[d >>> 2] |= (255 & a.charCodeAt(d)) << 24 - 8 * (d % 4);
            return new f.init(c, b)
        }}, j = g.Utf8 = {stringify: function(a) {
            try {
                return decodeURIComponent(escape(i.stringify(a)))
            } catch (b) {
                throw new Error("Malformed UTF-8 data")
            }
        },parse: function(a) {
            return i.parse(unescape(encodeURIComponent(a)))
        }}, k = d.BufferedBlockAlgorithm = e.extend({reset: function() {
            this._data = new f.init, this._nDataBytes = 0
        },_append: function(a) {
            "string" == typeof a && (a = j.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes
        },_process: function(b) {
            var c = this._data, d = c.words, e = c.sigBytes, g = this.blockSize, h = 4 * g, i = e / h;
            i = b ? a.ceil(i) : a.max((0 | i) - this._minBufferSize, 0);
            var j = i * g, k = a.min(4 * j, e);
            if (j) {
                for (var l = 0; j > l; l += g)
                    this._doProcessBlock(d, l);
                var m = d.splice(0, j);
                c.sigBytes -= k
            }
            return new f.init(m, k)
        },clone: function() {
            var a = e.clone.call(this);
            return a._data = this._data.clone(), a
        },_minBufferSize: 0});
    d.Hasher = k.extend({cfg: e.extend(),init: function(a) {
            this.cfg = this.cfg.extend(a), this.reset()
        },reset: function() {
            k.reset.call(this), this._doReset()
        },update: function(a) {
            return this._append(a), this._process(), this
        },finalize: function(a) {
            a && this._append(a);
            var b = this._doFinalize();
            return b
        },blockSize: 16,_createHelper: function(a) {
            return function(b, c) {
                return new a.init(c).finalize(b)
            }
        },_createHmacHelper: function(a) {
            return function(b, c) {
                return new l.HMAC.init(a, c).finalize(b)
            }
        }});
    var l = c.algo = {};
    return c
}(Math);
!function() {
    var a = CryptoJS, b = a.lib, c = b.WordArray, d = a.enc;
    d.Base64 = {stringify: function(a) {
            var b = a.words, c = a.sigBytes, d = this._map;
            a.clamp();
            for (var e = [], f = 0; c > f; f += 3)
                for (var g = 255 & b[f >>> 2] >>> 24 - 8 * (f % 4), h = 255 & b[f + 1 >>> 2] >>> 24 - 8 * ((f + 1) % 4), i = 255 & b[f + 2 >>> 2] >>> 24 - 8 * ((f + 2) % 4), j = g << 16 | h << 8 | i, k = 0; 4 > k && c > f + .75 * k; k++)
                    e.push(d.charAt(63 & j >>> 6 * (3 - k)));
            var l = d.charAt(64);
            if (l)
                for (; e.length % 4; )
                    e.push(l);
            return e.join("")
        },parse: function(a) {
            var b = a.length, d = this._map, e = d.charAt(64);
            if (e) {
                var f = a.indexOf(e);
                -1 != f && (b = f)
            }
            for (var g = [], h = 0, i = 0; b > i; i++)
                if (i % 4) {
                    var j = d.indexOf(a.charAt(i - 1)) << 2 * (i % 4), k = d.indexOf(a.charAt(i)) >>> 6 - 2 * (i % 4);
                    g[h >>> 2] |= (j | k) << 24 - 8 * (h % 4), h++
                }
            return c.create(g, h)
        },_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}
}(), function() {
    var a = CryptoJS, b = a.lib, c = b.Base, d = a.enc, e = d.Utf8, f = a.algo;
    f.HMAC = c.extend({init: function(a, b) {
            a = this._hasher = new a.init, "string" == typeof b && (b = e.parse(b));
            var c = a.blockSize, d = 4 * c;
            b.sigBytes > d && (b = a.finalize(b)), b.clamp();
            for (var f = this._oKey = b.clone(), g = this._iKey = b.clone(), h = f.words, i = g.words, j = 0; c > j; j++)
                h[j] ^= 1549556828, i[j] ^= 909522486;
            f.sigBytes = g.sigBytes = d, this.reset()
        },reset: function() {
            var a = this._hasher;
            a.reset(), a.update(this._iKey)
        },update: function(a) {
            return this._hasher.update(a), this
        },finalize: function(a) {
            var b = this._hasher, c = b.finalize(a);
            b.reset();
            var d = b.finalize(this._oKey.clone().concat(c));
            return d
        }})
}(), function() {
    var a = CryptoJS, b = a.lib, c = b.WordArray, d = b.Hasher, e = a.algo, f = [], g = e.SHA1 = d.extend({_doReset: function() {
            this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
        },_doProcessBlock: function(a, b) {
            for (var c = this._hash.words, d = c[0], e = c[1], g = c[2], h = c[3], i = c[4], j = 0; 80 > j; j++) {
                if (16 > j)
                    f[j] = 0 | a[b + j];
                else {
                    var k = f[j - 3] ^ f[j - 8] ^ f[j - 14] ^ f[j - 16];
                    f[j] = k << 1 | k >>> 31
                }
                var l = (d << 5 | d >>> 27) + i + f[j];
                l += 20 > j ? (e & g | ~e & h) + 1518500249 : 40 > j ? (e ^ g ^ h) + 1859775393 : 60 > j ? (e & g | e & h | g & h) - 1894007588 : (e ^ g ^ h) - 899497514, i = h, h = g, g = e << 30 | e >>> 2, e = d, d = l
            }
            c[0] = 0 | c[0] + d, c[1] = 0 | c[1] + e, c[2] = 0 | c[2] + g, c[3] = 0 | c[3] + h, c[4] = 0 | c[4] + i
        },_doFinalize: function() {
            var a = this._data, b = a.words, c = 8 * this._nDataBytes, d = 8 * a.sigBytes;
            return b[d >>> 5] |= 128 << 24 - d % 32, b[(d + 64 >>> 9 << 4) + 14] = Math.floor(c / 4294967296), b[(d + 64 >>> 9 << 4) + 15] = c, a.sigBytes = 4 * b.length, this._process(), this._hash
        },clone: function() {
            var a = d.clone.call(this);
            return a._hash = this._hash.clone(), a
        }});
    a.SHA1 = d._createHelper(g), a.HmacSHA1 = d._createHmacHelper(g)
}();
/*! 2014-05-28 */

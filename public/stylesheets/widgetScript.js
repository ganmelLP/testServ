var usedCars = [];
var newCars = [];
var dealershipNamesArr = [];
var contextFull = {};
var dealershipsData = {};
var conversationId = '';
window.onload = function () {
    if (lpTag.agentSDK) {
        bindUser();
    }
}
document.onreadystatechange = () => {
    // document ready
    if (document.readyState === 'complete') {


        /*!
         * typeahead.js v1.3.0 // Used for Autocomplete
         * https://github.com/corejavascript/typeahead.js
         * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
         */
        !function (t, e) { "function" == typeof define && define.amd ? define(["jquery"], function (t) { return e(t) }) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(t.jQuery) }(this, function (t) { var e = function () { "use strict"; return { isMsie: function () { return !!/(msie|trident)/i.test(navigator.userAgent) && navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] }, isBlankString: function (t) { return !t || /^\s*$/.test(t) }, escapeRegExChars: function (t) { return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") }, isString: function (t) { return "string" == typeof t }, isNumber: function (t) { return "number" == typeof t }, isArray: t.isArray, isFunction: t.isFunction, isObject: t.isPlainObject, isUndefined: function (t) { return void 0 === t }, isElement: function (t) { return !(!t || 1 !== t.nodeType) }, isJQuery: function (e) { return e instanceof t }, toStr: function (t) { return e.isUndefined(t) || null === t ? "" : t + "" }, bind: t.proxy, each: function (e, n) { t.each(e, function (t, e) { return n(e, t) }) }, map: t.map, filter: t.grep, every: function (e, n) { var i = !0; return e ? (t.each(e, function (t, s) { if (!(i = n.call(null, s, t, e))) return !1 }), !!i) : i }, some: function (e, n) { var i = !1; return e ? (t.each(e, function (t, s) { if (i = n.call(null, s, t, e)) return !1 }), !!i) : i }, mixin: t.extend, identity: function (t) { return t }, clone: function (e) { return t.extend(!0, {}, e) }, getIdGenerator: function () { var t = 0; return function () { return t++ } }, templatify: function (e) { return t.isFunction(e) ? e : function () { return String(e) } }, defer: function (t) { setTimeout(t, 0) }, debounce: function (t, e, n) { var i, s; return function () { var r, a, o = this, u = arguments; return r = function () { i = null, n || (s = t.apply(o, u)) }, a = n && !i, clearTimeout(i), i = setTimeout(r, e), a && (s = t.apply(o, u)), s } }, throttle: function (t, e) { var n, i, s, r, a, o; return a = 0, o = function () { a = new Date, s = null, r = t.apply(n, i) }, function () { var u = new Date, c = e - (u - a); return n = this, i = arguments, c <= 0 ? (clearTimeout(s), s = null, a = u, r = t.apply(n, i)) : s || (s = setTimeout(o, c)), r } }, stringify: function (t) { return e.isString(t) ? t : JSON.stringify(t) }, guid: function () { function t(t) { var e = (Math.random().toString(16) + "000000000").substr(2, 8); return t ? "-" + e.substr(0, 4) + "-" + e.substr(4, 4) : e } return "tt-" + t() + t(!0) + t(!0) + t() }, noop: function () { } } }(), n = function () { "use strict"; var t = { wrapper: "twitter-typeahead", input: "tt-input", hint: "tt-hint", menu: "tt-menu", dataset: "tt-dataset", suggestion: "tt-suggestion", selectable: "tt-selectable", empty: "tt-empty", open: "tt-open", cursor: "tt-cursor", highlight: "tt-highlight" }; return function (s) { var r, a; return a = e.mixin({}, t, s), { css: (r = { css: i(), classes: a, html: (o = a, { wrapper: '<span class="' + o.wrapper + '"></span>', menu: '<div role="listbox" class="' + o.menu + '"></div>' }), selectors: n(a) }).css, html: r.html, classes: r.classes, selectors: r.selectors, mixin: function (t) { e.mixin(t, r) } }; var o }; function n(t) { var n = {}; return e.each(t, function (t, e) { n[e] = "." + t }), n } function i() { var t = { wrapper: { position: "relative", display: "inline-block" }, hint: { position: "absolute", top: "0", left: "0", borderColor: "transparent", boxShadow: "none", opacity: "1" }, input: { position: "relative", verticalAlign: "top", backgroundColor: "transparent" }, inputWithNoHint: { position: "relative", verticalAlign: "top" }, menu: { position: "absolute", top: "100%", left: "0", zIndex: "100", display: "none" }, ltr: { left: "0", right: "auto" }, rtl: { left: "auto", right: " 0" } }; return e.isMsie() && e.mixin(t.input, { backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)" }), t } }(), i = function () { "use strict"; var n; function i(e) { e && e.el || t.error("EventBus initialized without el"), this.$el = t(e.el) } return "typeahead:", n = { render: "rendered", cursorchange: "cursorchanged", select: "selected", autocomplete: "autocompleted" }, e.mixin(i.prototype, { _trigger: function (e, n) { var i = t.Event("typeahead:" + e); return this.$el.trigger.call(this.$el, i, n || []), i }, before: function (t) { var e; return e = [].slice.call(arguments, 1), this._trigger("before" + t, e).isDefaultPrevented() }, trigger: function (t) { var e; this._trigger(t, [].slice.call(arguments, 1)), (e = n[t]) && this._trigger(e, [].slice.call(arguments, 1)) } }), i }(), s = function () { "use strict"; var t = /\s+/, e = function () { var t; t = window.setImmediate ? function (t) { setImmediate(function () { t() }) } : function (t) { setTimeout(function () { t() }, 0) }; return t }(); return { onSync: function (t, e, i) { return n.call(this, "sync", t, e, i) }, onAsync: function (t, e, i) { return n.call(this, "async", t, e, i) }, off: function (e) { var n; if (!this._callbacks) return this; e = e.split(t); for (; n = e.shift();)delete this._callbacks[n]; return this }, trigger: function (n) { var s, r, a, o, u; if (!this._callbacks) return this; n = n.split(t), a = [].slice.call(arguments, 1); for (; (s = n.shift()) && (r = this._callbacks[s]);)o = i(r.sync, this, [s].concat(a)), u = i(r.async, this, [s].concat(a)), o() && e(u); return this } }; function n(e, n, i, s) { var r; if (!i) return this; for (n = n.split(t), i = s ? function (t, e) { return t.bind ? t.bind(e) : function () { t.apply(e, [].slice.call(arguments, 0)) } }(i, s) : i, this._callbacks = this._callbacks || {}; r = n.shift();)this._callbacks[r] = this._callbacks[r] || { sync: [], async: [] }, this._callbacks[r][e].push(i); return this } function i(t, e, n) { return function () { for (var i, s = 0, r = t.length; !i && s < r; s += 1)i = !1 === t[s].apply(e, n); return !i } } }(), r = function (t) { "use strict"; var n = { node: null, pattern: null, tagName: "strong", className: null, wordsOnly: !1, caseSensitive: !1, diacriticInsensitive: !1 }, i = { A: "[AaªÀ-Åà-åĀ-ąǍǎȀ-ȃȦȧᴬᵃḀḁẚẠ-ảₐ℀℁℻⒜Ⓐⓐ㍱-㍴㎀-㎄㎈㎉㎩-㎯㏂㏊㏟㏿Ａａ]", B: "[BbᴮᵇḂ-ḇℬ⒝Ⓑⓑ㍴㎅-㎇㏃㏈㏔㏝Ｂｂ]", C: "[CcÇçĆ-čᶜ℀ℂ℃℅℆ℭⅭⅽ⒞Ⓒⓒ㍶㎈㎉㎝㎠㎤㏄-㏇Ｃｃ]", D: "[DdĎďǄ-ǆǱ-ǳᴰᵈḊ-ḓⅅⅆⅮⅾ⒟Ⓓⓓ㋏㍲㍷-㍹㎗㎭-㎯㏅㏈Ｄｄ]", E: "[EeÈ-Ëè-ëĒ-ěȄ-ȇȨȩᴱᵉḘ-ḛẸ-ẽₑ℡ℯℰⅇ⒠Ⓔⓔ㉐㋍㋎Ｅｅ]", F: "[FfᶠḞḟ℉ℱ℻⒡Ⓕⓕ㎊-㎌㎙ﬀ-ﬄＦｆ]", G: "[GgĜ-ģǦǧǴǵᴳᵍḠḡℊ⒢Ⓖⓖ㋌㋍㎇㎍-㎏㎓㎬㏆㏉㏒㏿Ｇｇ]", H: "[HhĤĥȞȟʰᴴḢ-ḫẖℋ-ℎ⒣Ⓗⓗ㋌㍱㎐-㎔㏊㏋㏗Ｈｈ]", I: "[IiÌ-Ïì-ïĨ-İĲĳǏǐȈ-ȋᴵᵢḬḭỈ-ịⁱℐℑℹⅈⅠ-ⅣⅥ-ⅨⅪⅫⅰ-ⅳⅵ-ⅸⅺⅻ⒤Ⓘⓘ㍺㏌㏕ﬁﬃＩｉ]", J: "[JjĲ-ĵǇ-ǌǰʲᴶⅉ⒥ⒿⓙⱼＪｊ]", K: "[KkĶķǨǩᴷᵏḰ-ḵK⒦Ⓚⓚ㎄㎅㎉㎏㎑㎘㎞㎢㎦㎪㎸㎾㏀㏆㏍-㏏Ｋｋ]", L: "[LlĹ-ŀǇ-ǉˡᴸḶḷḺ-ḽℒℓ℡Ⅼⅼ⒧Ⓛⓛ㋏㎈㎉㏐-㏓㏕㏖㏿ﬂﬄＬｌ]", M: "[MmᴹᵐḾ-ṃ℠™ℳⅯⅿ⒨Ⓜⓜ㍷-㍹㎃㎆㎎㎒㎖㎙-㎨㎫㎳㎷㎹㎽㎿㏁㏂㏎㏐㏔-㏖㏘㏙㏞㏟Ｍｍ]", N: "[NnÑñŃ-ŉǊ-ǌǸǹᴺṄ-ṋⁿℕ№⒩Ⓝⓝ㎁㎋㎚㎱㎵㎻㏌㏑Ｎｎ]", O: "[OoºÒ-Öò-öŌ-őƠơǑǒǪǫȌ-ȏȮȯᴼᵒỌ-ỏₒ℅№ℴ⒪Ⓞⓞ㍵㏇㏒㏖Ｏｏ]", P: "[PpᴾᵖṔ-ṗℙ⒫Ⓟⓟ㉐㍱㍶㎀㎊㎩-㎬㎰㎴㎺㏋㏗-㏚Ｐｐ]", Q: "[Qqℚ⒬Ⓠⓠ㏃Ｑｑ]", R: "[RrŔ-řȐ-ȓʳᴿᵣṘ-ṛṞṟ₨ℛ-ℝ⒭Ⓡⓡ㋍㍴㎭-㎯㏚㏛Ｒｒ]", S: "[SsŚ-šſȘșˢṠ-ṣ₨℁℠⒮Ⓢⓢ㎧㎨㎮-㎳㏛㏜ﬆＳｓ]", T: "[TtŢ-ťȚțᵀᵗṪ-ṱẗ℡™⒯Ⓣⓣ㉐㋏㎔㏏ﬅﬆＴｔ]", U: "[UuÙ-Üù-üŨ-ųƯưǓǔȔ-ȗᵁᵘᵤṲ-ṷỤ-ủ℆⒰Ⓤⓤ㍳㍺Ｕｕ]", V: "[VvᵛᵥṼ-ṿⅣ-Ⅷⅳ-ⅷ⒱Ⓥⓥⱽ㋎㍵㎴-㎹㏜㏞Ｖｖ]", W: "[WwŴŵʷᵂẀ-ẉẘ⒲Ⓦⓦ㎺-㎿㏝Ｗｗ]", X: "[XxˣẊ-ẍₓ℻Ⅸ-Ⅻⅸ-ⅻ⒳Ⓧⓧ㏓Ｘｘ]", Y: "[YyÝýÿŶ-ŸȲȳʸẎẏẙỲ-ỹ⒴Ⓨⓨ㏉Ｙｙ]", Z: "[ZzŹ-žǱ-ǳᶻẐ-ẕℤℨ⒵Ⓩⓩ㎐-㎔Ｚｚ]" }; return function (i) { var r; (i = e.mixin({}, n, i)).node && i.pattern && (i.pattern = e.isArray(i.pattern) ? i.pattern : [i.pattern], r = function (t, n, i, r) { for (var a, o = [], u = 0, c = t.length; u < c; u++) { var h = e.escapeRegExChars(t[u]); r && (h = h.replace(/\S/g, s)), o.push(h) } return a = i ? "\\b(" + o.join("|") + ")\\b" : "(" + o.join("|") + ")", n ? new RegExp(a) : new RegExp(a, "i") }(i.pattern, i.caseSensitive, i.wordsOnly, i.diacriticInsensitive), function t(e, n) { var i; for (var s = 0; s < e.childNodes.length; s++)3 === (i = e.childNodes[s]).nodeType ? s += n(i) ? 1 : 0 : t(i, n) }(i.node, function (e) { var n, s, a; (n = r.exec(e.data)) && (a = t.createElement(i.tagName), i.className && (a.className = i.className), (s = e.splitText(n.index)).splitText(n[0].length), a.appendChild(s.cloneNode(!0)), e.parentNode.replaceChild(a, s)); return !!n })) }; function s(t) { return i[t.toUpperCase()] || t } }(window.document), a = function () { "use strict"; var n; function i(n, i) { var s, r; (n = n || {}).input || t.error("input is missing"), i.mixin(this), this.$hint = t(n.hint), this.$input = t(n.input), this.$menu = t(n.menu), s = this.$input.attr("id") || e.guid(), this.$menu.attr("id", s + "_listbox"), this.$hint.attr({ "aria-hidden": !0 }), this.$input.attr({ "aria-owns": s + "_listbox", role: "combobox", "aria-autocomplete": "list", "aria-expanded": !1 }), this.query = this.$input.val(), this.queryWhenFocused = this.hasFocus() ? this.query : null, this.$overflowHelper = (r = this.$input, t('<pre aria-hidden="true"></pre>').css({ position: "absolute", visibility: "hidden", whiteSpace: "pre", fontFamily: r.css("font-family"), fontSize: r.css("font-size"), fontStyle: r.css("font-style"), fontVariant: r.css("font-variant"), fontWeight: r.css("font-weight"), wordSpacing: r.css("word-spacing"), letterSpacing: r.css("letter-spacing"), textIndent: r.css("text-indent"), textRendering: r.css("text-rendering"), textTransform: r.css("text-transform") }).insertAfter(r)), this._checkLanguageDirection(), 0 === this.$hint.length && (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = e.noop), this.onSync("cursorchange", this._updateDescendent) } return n = { 9: "tab", 27: "esc", 37: "left", 39: "right", 13: "enter", 38: "up", 40: "down" }, i.normalizeQuery = function (t) { return e.toStr(t).replace(/^\s*/g, "").replace(/\s{2,}/g, " ") }, e.mixin(i.prototype, s, { _onBlur: function () { this.resetInputValue(), this.trigger("blurred") }, _onFocus: function () { this.queryWhenFocused = this.query, this.trigger("focused") }, _onKeydown: function (t) { var e = n[t.which || t.keyCode]; this._managePreventDefault(e, t), e && this._shouldTrigger(e, t) && this.trigger(e + "Keyed", t) }, _onInput: function () { this._setQuery(this.getInputValue()), this.clearHintIfInvalid(), this._checkLanguageDirection() }, _managePreventDefault: function (t, e) { var n; switch (t) { case "up": case "down": n = !r(e); break; default: n = !1 }n && e.preventDefault() }, _shouldTrigger: function (t, e) { var n; switch (t) { case "tab": n = !r(e); break; default: n = !0 }return n }, _checkLanguageDirection: function () { var t = (this.$input.css("direction") || "ltr").toLowerCase(); this.dir !== t && (this.dir = t, this.$hint.attr("dir", t), this.trigger("langDirChanged", t)) }, _setQuery: function (t, e) { var n, s, r, a; r = t, a = this.query, s = !!(n = i.normalizeQuery(r) === i.normalizeQuery(a)) && this.query.length !== t.length, this.query = t, e || n ? !e && s && this.trigger("whitespaceChanged", this.query) : this.trigger("queryChanged", this.query) }, _updateDescendent: function (t, e) { this.$input.attr("aria-activedescendant", e) }, bind: function () { var t, i, s, r, a = this; return t = e.bind(this._onBlur, this), i = e.bind(this._onFocus, this), s = e.bind(this._onKeydown, this), r = e.bind(this._onInput, this), this.$input.on("blur.tt", t).on("focus.tt", i).on("keydown.tt", s), !e.isMsie() || e.isMsie() > 9 ? this.$input.on("input.tt", r) : this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function (t) { n[t.which || t.keyCode] || e.defer(e.bind(a._onInput, a, t)) }), this }, focus: function () { this.$input.focus() }, blur: function () { this.$input.blur() }, getLangDir: function () { return this.dir }, getQuery: function () { return this.query || "" }, setQuery: function (t, e) { this.setInputValue(t), this._setQuery(t, e) }, hasQueryChangedSinceLastFocus: function () { return this.query !== this.queryWhenFocused }, getInputValue: function () { return this.$input.val() }, setInputValue: function (t) { this.$input.val(t), this.clearHintIfInvalid(), this._checkLanguageDirection() }, resetInputValue: function () { this.setInputValue(this.query) }, getHint: function () { return this.$hint.val() }, setHint: function (t) { this.$hint.val(t) }, clearHint: function () { this.setHint("") }, clearHintIfInvalid: function () { var t, e, n; n = (t = this.getInputValue()) !== (e = this.getHint()) && 0 === e.indexOf(t), !("" !== t && n && !this.hasOverflow()) && this.clearHint() }, hasFocus: function () { return this.$input.is(":focus") }, hasOverflow: function () { var t = this.$input.width() - 2; return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() >= t }, isCursorAtEnd: function () { var t, n, i; return t = this.$input.val().length, n = this.$input[0].selectionStart, e.isNumber(n) ? n === t : !document.selection || ((i = document.selection.createRange()).moveStart("character", -t), t === i.text.length) }, destroy: function () { this.$hint.off(".tt"), this.$input.off(".tt"), this.$overflowHelper.remove(), this.$hint = this.$input = this.$overflowHelper = t("<div>") }, setAriaExpanded: function (t) { this.$input.attr("aria-expanded", t) } }), i; function r(t) { return t.altKey || t.ctrlKey || t.metaKey || t.shiftKey } }(), o = function () { "use strict"; var n, i; function a(n, s) { var r; (n = n || {}).templates = n.templates || {}, n.templates.notFound = n.templates.notFound || n.templates.empty, n.source || t.error("missing source"), n.node || t.error("missing node"), n.name && (r = n.name, !/^[_a-zA-Z0-9-]+$/.test(r)) && t.error("invalid dataset name: " + n.name), s.mixin(this), this.highlight = !!n.highlight, this.name = e.toStr(n.name || i()), this.limit = n.limit || 30, this.displayFn = function (t) { return t = t || e.stringify, e.isFunction(t) ? t : function (e) { return e[t] } }(n.display || n.displayKey), this.templates = function (n, i) { return { notFound: n.notFound && e.templatify(n.notFound), pending: n.pending && e.templatify(n.pending), header: n.header && e.templatify(n.header), footer: n.footer && e.templatify(n.footer), suggestion: n.suggestion ? function (i) { var s = n.suggestion; return t(s(i)).attr("id", e.guid()) } : function (n) { return t('<div role="option">').attr("id", e.guid()).text(i(n)) } } }(n.templates, this.displayFn), this.source = n.source.__ttAdapter ? n.source.__ttAdapter() : n.source, this.async = e.isUndefined(n.async) ? this.source.length > 2 : !!n.async, this._resetLastSuggestion(), this.$el = t(n.node).attr("role", "presentation").addClass(this.classes.dataset).addClass(this.classes.dataset + "-" + this.name) } return n = { dataset: "tt-selectable-dataset", val: "tt-selectable-display", obj: "tt-selectable-object" }, i = e.getIdGenerator(), a.extractData = function (e) { var i = t(e); return i.data(n.obj) ? { dataset: i.data(n.dataset) || "", val: i.data(n.val) || "", obj: i.data(n.obj) || null } : null }, e.mixin(a.prototype, s, { _overwrite: function (t, e) { (e = e || []).length ? this._renderSuggestions(t, e) : this.async && this.templates.pending ? this._renderPending(t) : !this.async && this.templates.notFound ? this._renderNotFound(t) : this._empty(), this.trigger("rendered", e, !1, this.name) }, _append: function (t, e) { (e = e || []).length && this.$lastSuggestion.length ? this._appendSuggestions(t, e) : e.length ? this._renderSuggestions(t, e) : !this.$lastSuggestion.length && this.templates.notFound && this._renderNotFound(t), this.trigger("rendered", e, !0, this.name) }, _renderSuggestions: function (t, e) { var n; n = this._getSuggestionsFragment(t, e), this.$lastSuggestion = n.children().last(), this.$el.html(n).prepend(this._getHeader(t, e)).append(this._getFooter(t, e)) }, _appendSuggestions: function (t, e) { var n, i; i = (n = this._getSuggestionsFragment(t, e)).children().last(), this.$lastSuggestion.after(n), this.$lastSuggestion = i }, _renderPending: function (t) { var e = this.templates.pending; this._resetLastSuggestion(), e && this.$el.html(e({ query: t, dataset: this.name })) }, _renderNotFound: function (t) { var e = this.templates.notFound; this._resetLastSuggestion(), e && this.$el.html(e({ query: t, dataset: this.name })) }, _empty: function () { this.$el.empty(), this._resetLastSuggestion() }, _getSuggestionsFragment: function (i, s) { var a, o = this; return a = document.createDocumentFragment(), e.each(s, function (e) { var s, r; r = o._injectQuery(i, e), s = t(o.templates.suggestion(r)).data(n.dataset, o.name).data(n.obj, e).data(n.val, o.displayFn(e)).addClass(o.classes.suggestion + " " + o.classes.selectable), a.appendChild(s[0]) }), this.highlight && r({ className: this.classes.highlight, node: a, pattern: i }), t(a) }, _getFooter: function (t, e) { return this.templates.footer ? this.templates.footer({ query: t, suggestions: e, dataset: this.name }) : null }, _getHeader: function (t, e) { return this.templates.header ? this.templates.header({ query: t, suggestions: e, dataset: this.name }) : null }, _resetLastSuggestion: function () { this.$lastSuggestion = t() }, _injectQuery: function (t, n) { return e.isObject(n) ? e.mixin({ _query: t }, n) : n }, update: function (e) { var n = this, i = !1, s = !1, r = 0; function a(t) { s || (s = !0, t = (t || []).slice(0, n.limit), r = t.length, n._overwrite(e, t), r < n.limit && n.async && n.trigger("asyncRequested", e, n.name)) } this.cancel(), this.cancel = function () { i = !0, n.cancel = t.noop, n.async && n.trigger("asyncCanceled", e, n.name) }, this.source(e, a, function (s) { if (s = s || [], !i && r < n.limit) { n.cancel = t.noop; var a = Math.abs(r - n.limit); r += a, n._append(e, s.slice(0, a)), n.async && n.trigger("asyncReceived", e, n.name) } }), !s && a([]) }, cancel: t.noop, clear: function () { this._empty(), this.cancel(), this.trigger("cleared") }, isEmpty: function () { return this.$el.is(":empty") }, destroy: function () { this.$el = t("<div>") } }), a }(), u = function () { "use strict"; function n(n, i) { var s = this; (n = n || {}).node || t.error("node is required"), i.mixin(this), this.$node = t(n.node), this.query = null, this.datasets = e.map(n.datasets, function (e) { var n = s.$node.find(e.node).first(); return e.node = n.length ? n : t("<div>").appendTo(s.$node), new o(e, i) }) } return e.mixin(n.prototype, s, { _onSelectableClick: function (e) { this.trigger("selectableClicked", t(e.currentTarget)) }, _onRendered: function (t, e, n, i) { this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty()), this.trigger("datasetRendered", e, n, i) }, _onCleared: function () { this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty()), this.trigger("datasetCleared") }, _propagate: function () { this.trigger.apply(this, arguments) }, _allDatasetsEmpty: function () { return e.every(this.datasets, e.bind(function (t) { var e = t.isEmpty(); return this.$node.attr("aria-expanded", !e), e }, this)) }, _getSelectables: function () { return this.$node.find(this.selectors.selectable) }, _removeCursor: function () { var t = this.getActiveSelectable(); t && t.removeClass(this.classes.cursor) }, _ensureVisible: function (t) { var e, n, i, s; n = (e = t.position().top) + t.outerHeight(!0), i = this.$node.scrollTop(), s = this.$node.height() + parseInt(this.$node.css("paddingTop"), 10) + parseInt(this.$node.css("paddingBottom"), 10), e < 0 ? this.$node.scrollTop(i + e) : s < n && this.$node.scrollTop(i + (n - s)) }, bind: function () { var n, i = this; return n = e.bind(this._onSelectableClick, this), this.$node.on("click.tt", this.selectors.selectable, n), this.$node.on("mouseover", this.selectors.selectable, function () { i.setCursor(t(this)) }), this.$node.on("mouseleave", function () { i._removeCursor() }), e.each(this.datasets, function (t) { t.onSync("asyncRequested", i._propagate, i).onSync("asyncCanceled", i._propagate, i).onSync("asyncReceived", i._propagate, i).onSync("rendered", i._onRendered, i).onSync("cleared", i._onCleared, i) }), this }, isOpen: function () { return this.$node.hasClass(this.classes.open) }, open: function () { this.$node.scrollTop(0), this.$node.addClass(this.classes.open) }, close: function () { this.$node.attr("aria-expanded", !1), this.$node.removeClass(this.classes.open), this._removeCursor() }, setLanguageDirection: function (t) { this.$node.attr("dir", t) }, selectableRelativeToCursor: function (t) { var e, n, i; return n = this.getActiveSelectable(), e = this._getSelectables(), -1 === (i = (i = ((i = (n ? e.index(n) : -1) + t) + 1) % (e.length + 1) - 1) < -1 ? e.length - 1 : i) ? null : e.eq(i) }, setCursor: function (t) { this._removeCursor(), (t = t && t.first()) && (t.addClass(this.classes.cursor), this._ensureVisible(t)) }, getSelectableData: function (t) { return t && t.length ? o.extractData(t) : null }, getActiveSelectable: function () { var t = this._getSelectables().filter(this.selectors.cursor).first(); return t.length ? t : null }, getTopSelectable: function () { var t = this._getSelectables().first(); return t.length ? t : null }, update: function (t) { var n = t !== this.query; return n && (this.query = t, e.each(this.datasets, function (e) { e.update(t) })), n }, empty: function () { e.each(this.datasets, function (t) { t.clear() }), this.query = null, this.$node.addClass(this.classes.empty) }, destroy: function () { this.$node.off(".tt"), this.$node = t("<div>"), e.each(this.datasets, function (t) { t.destroy() }) } }), n }(), c = function () { "use strict"; function n(n) { this.$el = t("<span></span>", { role: "status", "aria-live": "polite" }).css({ position: "absolute", padding: "0", border: "0", height: "1px", width: "1px", "margin-bottom": "-1px", "margin-right": "-1px", overflow: "hidden", clip: "rect(0 0 0 0)", "white-space": "nowrap" }), n.$input.after(this.$el), e.each(n.menu.datasets, e.bind(function (t) { t.onSync && (t.onSync("rendered", e.bind(this.update, this)), t.onSync("cleared", e.bind(this.cleared, this))) }, this)) } return e.mixin(n.prototype, { update: function (t, e) { var n, i = e.length; n = 1 === i ? { result: "result", is: "is" } : { result: "results", is: "are" }, this.$el.text(i + " " + n.result + " " + n.is + " available, use up and down arrow keys to navigate.") }, cleared: function () { this.$el.text("") } }), n }(), h = function () { "use strict"; var t = u.prototype; function n() { u.apply(this, [].slice.call(arguments, 0)) } return e.mixin(n.prototype, u.prototype, { open: function () { return !this._allDatasetsEmpty() && this._show(), t.open.apply(this, [].slice.call(arguments, 0)) }, close: function () { return this._hide(), t.close.apply(this, [].slice.call(arguments, 0)) }, _onRendered: function () { return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), t._onRendered.apply(this, [].slice.call(arguments, 0)) }, _onCleared: function () { return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), t._onCleared.apply(this, [].slice.call(arguments, 0)) }, setLanguageDirection: function (e) { return this.$node.css("ltr" === e ? this.css.ltr : this.css.rtl), t.setLanguageDirection.apply(this, [].slice.call(arguments, 0)) }, _hide: function () { this.$node.hide() }, _show: function () { this.$node.css("display", "block") } }), n }(), l = function () { "use strict"; function n(n, s) { var r, a, o, u, c, h, l, d, p, f, g; (n = n || {}).input || t.error("missing input"), n.menu || t.error("missing menu"), n.eventBus || t.error("missing event bus"), s.mixin(this), this.eventBus = n.eventBus, this.minLength = e.isNumber(n.minLength) ? n.minLength : 1, this.input = n.input, this.menu = n.menu, this.enabled = !0, this.autoselect = !!n.autoselect, this.active = !1, this.input.hasFocus() && this.activate(), this.dir = this.input.getLangDir(), this._hacks(), this.menu.bind().onSync("selectableClicked", this._onSelectableClicked, this).onSync("asyncRequested", this._onAsyncRequested, this).onSync("asyncCanceled", this._onAsyncCanceled, this).onSync("asyncReceived", this._onAsyncReceived, this).onSync("datasetRendered", this._onDatasetRendered, this).onSync("datasetCleared", this._onDatasetCleared, this), r = i(this, "activate", "open", "_onFocused"), a = i(this, "deactivate", "_onBlurred"), o = i(this, "isActive", "isOpen", "_onEnterKeyed"), u = i(this, "isActive", "isOpen", "_onTabKeyed"), c = i(this, "isActive", "_onEscKeyed"), h = i(this, "isActive", "open", "_onUpKeyed"), l = i(this, "isActive", "open", "_onDownKeyed"), d = i(this, "isActive", "isOpen", "_onLeftKeyed"), p = i(this, "isActive", "isOpen", "_onRightKeyed"), f = i(this, "_openIfActive", "_onQueryChanged"), g = i(this, "_openIfActive", "_onWhitespaceChanged"), this.input.bind().onSync("focused", r, this).onSync("blurred", a, this).onSync("enterKeyed", o, this).onSync("tabKeyed", u, this).onSync("escKeyed", c, this).onSync("upKeyed", h, this).onSync("downKeyed", l, this).onSync("leftKeyed", d, this).onSync("rightKeyed", p, this).onSync("queryChanged", f, this).onSync("whitespaceChanged", g, this).onSync("langDirChanged", this._onLangDirChanged, this) } return e.mixin(n.prototype, { _hacks: function () { var n, i; n = this.input.$input || t("<div>"), i = this.menu.$node || t("<div>"), n.on("blur.tt", function (t) { var s, r, a; s = document.activeElement, r = i.is(s), a = i.has(s).length > 0, e.isMsie() && (r || a) && (t.preventDefault(), t.stopImmediatePropagation(), e.defer(function () { n.focus() })) }), i.on("mousedown.tt", function (t) { t.preventDefault() }) }, _onSelectableClicked: function (t, e) { this.select(e) }, _onDatasetCleared: function () { this._updateHint() }, _onDatasetRendered: function (t, e, n, i) { if (this._updateHint(), this.autoselect) { var s = this.selectors.cursor.substr(1); this.menu.$node.find(this.selectors.suggestion).first().addClass(s) } this.eventBus.trigger("render", e, n, i) }, _onAsyncRequested: function (t, e, n) { this.eventBus.trigger("asyncrequest", n, e) }, _onAsyncCanceled: function (t, e, n) { this.eventBus.trigger("asynccancel", n, e) }, _onAsyncReceived: function (t, e, n) { this.eventBus.trigger("asyncreceive", n, e) }, _onFocused: function () { this._minLengthMet() && this.menu.update(this.input.getQuery()) }, _onBlurred: function () { this.input.hasQueryChangedSinceLastFocus() && this.eventBus.trigger("change", this.input.getQuery()) }, _onEnterKeyed: function (t, e) { var n; (n = this.menu.getActiveSelectable()) ? this.select(n) && (e.preventDefault(), e.stopPropagation()) : this.autoselect && this.select(this.menu.getTopSelectable()) && (e.preventDefault(), e.stopPropagation()) }, _onTabKeyed: function (t, e) { var n; (n = this.menu.getActiveSelectable()) ? this.select(n) && e.preventDefault() : this.autoselect && (n = this.menu.getTopSelectable()) && this.autocomplete(n) && e.preventDefault() }, _onEscKeyed: function () { this.close() }, _onUpKeyed: function () { this.moveCursor(-1) }, _onDownKeyed: function () { this.moveCursor(1) }, _onLeftKeyed: function () { "rtl" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getActiveSelectable() || this.menu.getTopSelectable()) }, _onRightKeyed: function () { "ltr" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getActiveSelectable() || this.menu.getTopSelectable()) }, _onQueryChanged: function (t, e) { this._minLengthMet(e) ? this.menu.update(e) : this.menu.empty() }, _onWhitespaceChanged: function () { this._updateHint() }, _onLangDirChanged: function (t, e) { this.dir !== e && (this.dir = e, this.menu.setLanguageDirection(e)) }, _openIfActive: function () { this.isActive() && this.open() }, _minLengthMet: function (t) { return (t = e.isString(t) ? t : this.input.getQuery() || "").length >= this.minLength }, _updateHint: function () { var t, n, i, s, r, o; t = this.menu.getTopSelectable(), n = this.menu.getSelectableData(t), i = this.input.getInputValue(), !n || e.isBlankString(i) || this.input.hasOverflow() ? this.input.clearHint() : (s = a.normalizeQuery(i), r = e.escapeRegExChars(s), (o = new RegExp("^(?:" + r + ")(.+$)", "i").exec(n.val)) && this.input.setHint(i + o[1])) }, isEnabled: function () { return this.enabled }, enable: function () { this.enabled = !0 }, disable: function () { this.enabled = !1 }, isActive: function () { return this.active }, activate: function () { return !!this.isActive() || !(!this.isEnabled() || this.eventBus.before("active")) && (this.active = !0, this.eventBus.trigger("active"), !0) }, deactivate: function () { return !this.isActive() || !this.eventBus.before("idle") && (this.active = !1, this.close(), this.eventBus.trigger("idle"), !0) }, isOpen: function () { return this.menu.isOpen() }, open: function () { return this.isOpen() || this.eventBus.before("open") || (this.input.setAriaExpanded(!0), this.menu.open(), this._updateHint(), this.eventBus.trigger("open")), this.isOpen() }, close: function () { return this.isOpen() && !this.eventBus.before("close") && (this.input.setAriaExpanded(!1), this.menu.close(), this.input.clearHint(), this.input.resetInputValue(), this.eventBus.trigger("close")), !this.isOpen() }, setVal: function (t) { this.input.setQuery(e.toStr(t)) }, getVal: function () { return this.input.getQuery() }, select: function (t) { var e = this.menu.getSelectableData(t); return !(!e || this.eventBus.before("select", e.obj, e.dataset)) && (this.input.setQuery(e.val, !0), this.eventBus.trigger("select", e.obj, e.dataset), this.close(), !0) }, autocomplete: function (t) { var e, n; return e = this.input.getQuery(), !(!((n = this.menu.getSelectableData(t)) && e !== n.val) || this.eventBus.before("autocomplete", n.obj, n.dataset)) && (this.input.setQuery(n.val), this.eventBus.trigger("autocomplete", n.obj, n.dataset), !0) }, moveCursor: function (t) { var e, n, i, s, r, a; return e = this.input.getQuery(), n = this.menu.selectableRelativeToCursor(t), s = (i = this.menu.getSelectableData(n)) ? i.obj : null, r = i ? i.dataset : null, a = n ? n.attr("id") : null, this.input.trigger("cursorchange", a), !(this._minLengthMet() && this.menu.update(e)) && !this.eventBus.before("cursorchange", s, r) && (this.menu.setCursor(n), i ? "string" == typeof i.val && this.input.setInputValue(i.val) : (this.input.resetInputValue(), this._updateHint()), this.eventBus.trigger("cursorchange", s, r), !0) }, destroy: function () { this.input.destroy(), this.menu.destroy() } }), n; function i(t) { var n = [].slice.call(arguments, 1); return function () { var i = [].slice.call(arguments); e.each(n, function (e) { return t[e].apply(t, i) }) } } }(); !function () { "use strict"; var s, r, o; function d(e, n) { e.each(function () { var e, i = t(this); (e = i.data(r.typeahead)) && n(e, i) }) } function p(n) { var i; return (i = e.isJQuery(n) || e.isElement(n) ? t(n).first() : []).length ? i : null } s = t.fn.typeahead, r = { www: "tt-www", attrs: "tt-attrs", typeahead: "tt-typeahead" }, o = { initialize: function (s, o) { var d; return o = e.isArray(o) ? o : [].slice.call(arguments, 1), d = n((s = s || {}).classNames), this.each(function () { var n, f, g, m, v, y, b, _, S, $, w; e.each(o, function (t) { t.highlight = !!s.highlight }), n = t(this), f = t(d.html.wrapper), g = p(s.hint), m = p(s.menu), v = !1 !== s.hint && !g, y = !1 !== s.menu && !m, v && (g = function (t, e) { return t.clone().addClass(e.classes.hint).removeData().css(e.css.hint).css((n = t, { backgroundAttachment: n.css("background-attachment"), backgroundClip: n.css("background-clip"), backgroundColor: n.css("background-color"), backgroundImage: n.css("background-image"), backgroundOrigin: n.css("background-origin"), backgroundPosition: n.css("background-position"), backgroundRepeat: n.css("background-repeat"), backgroundSize: n.css("background-size") })).prop({ readonly: !0, required: !1 }).removeAttr("id name placeholder").removeClass("required").attr({ spellcheck: "false", tabindex: -1 }); var n }(n, d)), y && (m = t(d.html.menu).css(d.css.menu)), g && g.val(""), n = function (t, e) { t.data(r.attrs, { dir: t.attr("dir"), autocomplete: t.attr("autocomplete"), spellcheck: t.attr("spellcheck"), style: t.attr("style") }), t.addClass(e.classes.input).attr({ spellcheck: !1 }); try { !t.attr("dir") && t.attr("dir", "auto") } catch (t) { } return t }(n, d), (v || y) && (f.css(d.css.wrapper), n.css(v ? d.css.input : d.css.inputWithNoHint), n.wrap(f).parent().prepend(v ? g : null).append(y ? m : null)); w = y ? h : u, b = new i({ el: n }), _ = new a({ hint: g, input: n, menu: m }, d), S = new w({ node: m, datasets: o }, d), new c({ $input: n, menu: S }), $ = new l({ input: _, menu: S, eventBus: b, minLength: s.minLength, autoselect: s.autoselect }, d), n.data(r.www, d), n.data(r.typeahead, $) }) }, isEnabled: function () { var t; return d(this.first(), function (e) { t = e.isEnabled() }), t }, enable: function () { return d(this, function (t) { t.enable() }), this }, disable: function () { return d(this, function (t) { t.disable() }), this }, isActive: function () { var t; return d(this.first(), function (e) { t = e.isActive() }), t }, activate: function () { return d(this, function (t) { t.activate() }), this }, deactivate: function () { return d(this, function (t) { t.deactivate() }), this }, isOpen: function () { var t; return d(this.first(), function (e) { t = e.isOpen() }), t }, open: function () { return d(this, function (t) { t.open() }), this }, close: function () { return d(this, function (t) { t.close() }), this }, select: function (e) { var n = !1, i = t(e); return d(this.first(), function (t) { n = t.select(i) }), n }, autocomplete: function (e) { var n = !1, i = t(e); return d(this.first(), function (t) { n = t.autocomplete(i) }), n }, moveCursor: function (t) { var e = !1; return d(this.first(), function (n) { e = n.moveCursor(t) }), e }, val: function (t) { var n; return arguments.length ? (d(this, function (n) { n.setVal(e.toStr(t)) }), this) : (d(this.first(), function (t) { n = t.getVal() }), n) }, destroy: function () { return d(this, function (t, n) { !function (t) { var n, i; n = t.data(r.www), i = t.parent().filter(n.selectors.wrapper), e.each(t.data(r.attrs), function (n, i) { e.isUndefined(n) ? t.removeAttr(i) : t.attr(i, n) }), t.removeData(r.typeahead).removeData(r.www).removeData(r.attr).removeClass(n.classes.input), i.length && (t.detach().insertAfter(i), i.remove()) }(n), t.destroy() }), this } }, t.fn.typeahead = function (t) { return o[t] ? o[t].apply(this, [].slice.call(arguments, 1)) : o.initialize.apply(this, arguments) }, t.fn.typeahead.noConflict = function () { return t.fn.typeahead = s, this } }() });

        const brandName = document.querySelector("#brand");
        const modelName = document.querySelector("#model");
        const fuelType = document.querySelector("#fuel");

        const usedBrandName = document.querySelector("#usedBrand");
        const usedModelName = document.querySelector("#usedModel");
        const delayInMilliseconds = 5000;

        setTimeout(function () {

            if (conversationId == true) {
                console.log("conversationId NOT Loaded, using APIs only, is empty?:" + conversationId)
                fetch('https://serene-falls-66485.herokuapp.com/api/used') // GET used cars list
                    .then(usedCarsResponse => usedCarsResponse.json())
                    .then(usedCarData => {
                        console.log(usedCarData)
                        usedCars = usedCarData;

                        fetch('https://serene-falls-66485.herokuapp.com/api/new') // when used cars request is done, GET new cars list and init all values
                            .then(newCarResponse => newCarResponse.json()
                                .then(newCarData => {
                                    console.log(newCarData)
                                    newCars = newCarData;


                                    fetch('https://serene-falls-66485.herokuapp.com/api/dealerships') // when used cars request is done, GET new cars list and init all values
                                        .then(dealershipsResponse => dealershipsResponse.json()
                                            .then(dealerships => {
                                                console.log(dealerships)
                                                dealershipsData = dealerships;

                                                dealershipsData.filtered.forEach(function (dName) { dealershipNamesArr.push(`${dName.used_name_short} - ${dName.id}`) }); // Push dealership name + id to a string array, server side will take only the id


                                                // Typeahead settings
                                                var substringMatcher = function (strs) {
                                                    return function findMatches(q, cb) {
                                                        var matches, substringRegex;

                                                        // an array that will be populated with substring matches
                                                        matches = [];

                                                        // regex used to determine if a string contains the substring `q`
                                                        substrRegex = new RegExp(q, 'i');

                                                        // iterate through the pool of strings and for any string that
                                                        // contains the substring `q`, add it to the `matches` array
                                                        $.each(strs, function (i, str) {
                                                            if (substrRegex.test(str)) {
                                                                matches.push(str);
                                                            }
                                                        });

                                                        cb(matches);
                                                    };
                                                };
                                                // Typeahead settings END

                                                $('#typeahead-autocomplete .thead').typeahead({
                                                    hint: true,
                                                    highlight: true,
                                                    minLength: 1
                                                },
                                                    {
                                                        name: 'Dealerships',
                                                        source: substringMatcher(dealershipNamesArr)
                                                    });


                                                //Clear duplicate brands to show brand list without duplicates
                                                let noDuplicates = clearDuplicateBrands(newCars)
                                                showBrands(noDuplicates, brandName);

                                                let noUsedDuplicates = clearDuplicateUsedBrands(usedCars)
                                                showUsedBrands(noUsedDuplicates, usedBrandName);


                                            }))

                                }))
                    });

            } else {
                console.log("conversationId Loaded, is conversationId empty?:" + conversationId)
                try {

                    fetch('https://serene-falls-66485.herokuapp.com/api/used') // GET used cars list
                        .then(usedCarsResponse => usedCarsResponse.json())
                        .then(usedCarData => {
                            console.log(usedCarData)
                            usedCars = usedCarData;

                            fetch('https://serene-falls-66485.herokuapp.com/api/new') // when used cars request is done, GET new cars list and init all values
                                .then(newCarResponse => newCarResponse.json()
                                    .then(newCarData => {
                                        console.log(newCarData)
                                        newCars = newCarData;

                                        fetch(`https://serene-falls-66485.herokuapp.com/api/contextData/?convId=${conversationId}`)
                                            .then(contextResponse => contextResponse.json()
                                                .then(contextData => {
                                                    console.log(contextData)
                                                    contextFull = contextData;


                                                    fetch('https://serene-falls-66485.herokuapp.com/api/dealerships') // when used cars request is done, GET new cars list and init all values
                                                        .then(dealershipsResponse => dealershipsResponse.json()
                                                            .then(dealerships => {
                                                                console.log(dealerships)
                                                                dealershipsData = dealerships;

                                                                dealershipsData.filtered.forEach(function (dName) { dealershipNamesArr.push(`${dName.used_name_short} - ${dName.id}`) });

                                                                var substringMatcher = function (strs) {
                                                                    return function findMatches(q, cb) {
                                                                        var matches, substringRegex;

                                                                        // an array that will be populated with substring matches
                                                                        matches = [];

                                                                        // regex used to determine if a string contains the substring `q`
                                                                        substrRegex = new RegExp(q, 'i');

                                                                        // iterate through the pool of strings and for any string that
                                                                        // contains the substring `q`, add it to the `matches` array
                                                                        $.each(strs, function (i, str) {
                                                                            if (substrRegex.test(str)) {
                                                                                matches.push(str);
                                                                            }
                                                                        });

                                                                        cb(matches);
                                                                    };
                                                                };

                                                                $('#typeahead-autocomplete .thead').typeahead({
                                                                    hint: true,
                                                                    highlight: true,
                                                                    minLength: 1
                                                                },
                                                                    {
                                                                        name: 'Dealerships',
                                                                        source: substringMatcher(dealershipNamesArr)
                                                                    });


                                                                //Clear duplicate brands to show brand list without duplicates
                                                                let noDuplicates = clearDuplicateBrands(newCars)
                                                                showBrands(noDuplicates, brandName);

                                                                let noUsedDuplicates = clearDuplicateUsedBrands(usedCars)
                                                                showUsedBrands(noUsedDuplicates, usedBrandName);

                                                                console.log(`Printing from inside the API Calls > ${JSON.stringify(contextFull)}`)

                                                                if (contextFull.leadType) { //Open the relevant category depending on values received, only if leadType is sales we will check if vehicleType is new or used, otherwise if leadType has a different value it will go to service. Also if it's new will also populate the purchaseType (ctype) with motability or business
                                                                    if (contextFull.leadType == "sales" || contextFull.leadType == "motability" || contextFull.leadType == "business") {
                                                                        if (contextFull.vehicleType && contextFull.vehicleType == "used") {
                                                                            document.getElementById("used").click();


                                                                            if (contextFull.make) {
                                                                                document.getElementById('usedBrand')[0].value = contextFull.make;
                                                                                simulate_event('change', document.getElementById('usedBrand'));
                                                                                // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                                                                            }

                                                                            if (contextFull.model) {
                                                                                document.getElementById('usedModel')[0].value = contextFull.model;
                                                                                simulate_event('change', document.getElementById('usedModel'));
                                                                                // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                                                                            }

                                                                            if (contextFull.vrn) {
                                                                                document.getElementById('usedRegNumber')[0].value = contextFull.vrn;
                                                                            }
                                                                            if (contextFull.valuation) {
                                                                                document.getElementById('valuation')[0].value = contextFull.valuation;
                                                                            }



                                                                        } else if (contextFull.vehicleType && contextFull.vehicleType == "new") {
                                                                            document.getElementById("new").click();
                                                                            if (contextFull.leadType == "motability") {
                                                                                document.getElementById('purchaseType').value = 'Motability';

                                                                            } else if (contextFull.leadType == "business") {
                                                                                document.getElementById('purchaseType').value = 'Business';
                                                                            }


                                                                            if (contextFull.make) {
                                                                                document.getElementById('brand')[0].value = contextFull.make;
                                                                                simulate_event('change', document.getElementById('brand'));
                                                                                // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                                                                            }

                                                                            if (contextFull.model) {
                                                                                document.getElementById('model')[0].value = contextFull.model;
                                                                                simulate_event('change', document.getElementById('model'));
                                                                                // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                                                                            }


                                                                            if (contextFull.fuelType) {
                                                                                document.getElementById('fuel')[0].value = contextFull.fuelType;
                                                                                simulate_event('change', document.getElementById('fuel'));
                                                                                // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                                                                            }

                                                                        }

                                                                        if (contextFull.capId) {
                                                                            document.getElementById('atidcapid')[0].value = contextFull.capId;
                                                                        }

                                                                        if (contextFull.trim) {
                                                                            document.getElementById('trim')[0].value = contextFull.trim;
                                                                        }

                                                                        if (contextFull.description) {
                                                                            document.getElementById('description')[0].value = contextFull.description;
                                                                        }

                                                                        if (contextFull.value) {
                                                                            document.getElementById('price')[0].value = contextFull.value;
                                                                        }



                                                                    } else {
                                                                        document.getElementById("service").click();

                                                                        if (contextFull.make) {
                                                                            document.getElementById('usedBrand')[0].value = contextFull.make;
                                                                            simulate_event('change', document.getElementById('usedBrand'));
                                                                            // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                                                                        }

                                                                        if (contextFull.model) {
                                                                            document.getElementById('usedModel')[0].value = contextFull.model;
                                                                            simulate_event('change', document.getElementById('usedModel'));
                                                                            // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event


                                                                            if (contextFull.mileage) {
                                                                                document.getElementById('mileage')[0].value = contextFull.mileage;
                                                                            }

                                                                        }
                                                                    }
                                                                }

                                                                //LEAD

                                                                if (contextFull.locationName) {
                                                                    $("#typeahead-autocomplete .thead").typeahead('val', contextFull.locationName);
                                                                }

                                                                if (contextFull.contactMethod) {
                                                                    document.getElementById('channel')[0].value = contextFull.contactMethod;
                                                                }

                                                                if (contextFull.enquirySource) {
                                                                    document.getElementById('source')[0].value = contextFull.channel;
                                                                }

                                                                if (contextFull.channel) {
                                                                    document.getElementById('channelSource')[0].value = contextFull.channel;
                                                                }



                                                            }))
                                                }))
                                    }))
                        });



                } catch (e) {
                    console.error(e);
                }

            }
        }, delayInMilliseconds);
    }

};

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

function bindUser() {
    console.log("SDK INIT");

    var notificationHandler = function (data) {
        // Do something
    };

    var focusHandler = function () {
        // Do something
    };

    var blurHandler = function () {
        // Do something
    };

    lpTag.agentSDK.init({
        notificationCallback: notificationHandler,
        visitorFocusedCallback: focusHandler,
        visitorBlurredCallback: blurHandler
    });

    var pathToData = "chatInfo.rtSessionId";

    lpTag.agentSDK.get(pathToData, updateCallback, notifyWhenDone);


}


var updateCallback = function (data) {
    // Do something with the returning data
    var path = data;
    conversationId = data;
    // called each time the value is updated.
    // If there's an existing value when bind is called - this callback
    // will be called with the existing value
    console.log(path);
    console.log("agentSDK Data Result: " + JSON.stringify(conversationId));

};

var notifyWhenDone = function (err) {
    if (err) {
        console.log(err);
    }
    // called when the bind is completed successfully,
    // or when the action terminated with an error.
};


// Returns objects only with the given brand
function filterBrand(carsArray, brand) {

    const filtered = carsArray.filter(car => {
        if (car.brand == brand) {
            return car.short_name;
        }
    });

    return filtered;
}

// Returns objects only with the given used brand
function filterUsedBrand(carsArray, brand) {

    const filtered = carsArray.filter(car => {
        if (car.manufacturer == brand) {
            return car.model;
        }
    });

    return filtered;
}


// Returns a single object with the given model
function filterModels(carsArray, model) {

    const filtered = carsArray.filter(car => {
        if (car.short_name == model) {
            return car.fuel_types;
        }
    });

    return filtered;
}


//Clears selections for the dropdown depending on the input to the function
function clearSelections(clearOption) {

    if (clearOption == "model" || clearOption == "all") {
        // Remove all previous model options every time there is a change
        let modelOptions = document.getElementsByClassName('model selection');
        while (modelOptions[0]) {
            modelOptions[0].parentNode.removeChild(modelOptions[0]);
        }
    }

    if (clearOption == "fuel" || clearOption == "all") {
        // Remove all previous fuel options every time there is a change
        let fuelOptions = document.getElementsByClassName('fuel selection');
        while (fuelOptions[0]) {
            fuelOptions[0].parentNode.removeChild(fuelOptions[0]);
        }
    }
}

function radioCheck(value, isChecked) {

    // Reset form when radio button is selected and make sure to remember only the previous radio button selection
    const newChecked = document.getElementById("new").checked;
    const usedChecked = document.getElementById("used").checked;

    document.getElementById('carForm').reset();

    if (newChecked) {
        document.getElementById("new").checked = true;
    } else if (usedChecked) {
        document.getElementById("used").checked = true;
    } else {
        document.getElementById("service").checked = true;
    } // end of form reset form logic

    //New
    const brandName = document.querySelector("#brand");
    const modelName = document.querySelector("#model");
    const fuelType = document.querySelector("#fuel");
    const purchaseType = document.querySelector("#purchaseType");

    //Used
    const usedBrandName = document.querySelector("#usedBrand");
    const usedModelName = document.querySelector("#usedModel");
    const usedRegNumber = document.querySelector("#usedRegNumber");
    const valuation = document.querySelector("#valuation");

    //New+Used
    const atidcapid = document.querySelector("#atidcapid");
    const trim = document.querySelector("#trim");
    const description = document.querySelector("#description");
    const price = document.querySelector("#price");

    //Service
    const customerRegNumber = document.querySelector("#customerRegNumber");
    const mileage = document.querySelector("#mileage");



    if (isChecked && value == "used") {

        brandName.style.display = "none";
        modelName.style.display = "none";
        fuelType.style.display = "none";
        customerRegNumber.style.display = "none";
        mileage.style.display = "none";
        purchaseType.style.display = "none";

        usedBrandName.style.display = "block";
        usedModelName.style.display = "block";
        usedRegNumber.style.display = "block";
        valuation.style.display = "block";
        atidcapid.style.display = "block";
        trim.style.display = "block";
        description.style.display = "block";
        price.style.display = "block";

    }

    if (isChecked && value == "new") {

        brandName.style.display = "block";
        modelName.style.display = "block";
        fuelType.style.display = "block";
        purchaseType.style.display = "block";
        atidcapid.style.display = "block";
        trim.style.display = "block";
        description.style.display = "block";
        price.style.display = "block";

        usedRegNumber.style.display = "none";
        usedBrandName.style.display = "none";
        usedModelName.style.display = "none";
        customerRegNumber.style.display = "none";
        mileage.style.display = "none";
        valuation.style.display = "none";

    }

    if (isChecked && value == "service") {


        customerRegNumber.style.display = "block";
        mileage.style.display = "block";
        usedBrandName.style.display = "block";
        usedModelName.style.display = "block";

        brandName.style.display = "none";
        modelName.style.display = "none";
        fuelType.style.display = "none";
        usedRegNumber.style.display = "none";
        purchaseType.style.display = "none";
        valuation.style.display = "none";
        atidcapid.style.display = "none";
        trim.style.display = "none";
        description.style.display = "none";
        price.style.display = "none";
    }
}

function carSelectionValid(data) {
    console.log("checking validity")
    const brandName = document.querySelector("#brand");
    const modelName = document.querySelector("#model");
    const fuelType = document.querySelector("#fuel");

    const usedBrandName = document.querySelector("#usedBrand");
    const usedModelName = document.querySelector("#usedModel");

    const isChecked = document.querySelector('input[name="carType"]:checked').value;
    console.log("The data:" + data)
    if (isChecked == "used" || isChecked == "service") {

        brandName.setCustomValidity('');
        modelName.setCustomValidity('');
        fuelType.setCustomValidity('');

        if (usedBrandName.value.indexOf("Select") > -1) {
            usedBrandName.setCustomValidity('You must choose a Brand');
        } else {
            usedBrandName.setCustomValidity('');
        }


        if (usedModelName.value.indexOf("Select") > -1) {
            usedModelName.setCustomValidity('You must choose a Model');
        } else {
            usedModelName.setCustomValidity('');
        }
    }

    if (isChecked == "new") {

        usedBrandName.setCustomValidity('');
        usedModelName.setCustomValidity('');

        if (brandName.value.indexOf("Select") > -1) {
            brandName.setCustomValidity('You must choose a Brand');
        } else {
            brandName.setCustomValidity('');
        }


        if (modelName.value.indexOf("Select") > -1) {
            modelName.setCustomValidity('You must choose a Model');
        } else {
            modelName.setCustomValidity('');
        }

        if (fuelType.value.indexOf("Select") > -1) {
            fuelType.setCustomValidity('You must choose a FuelType');
        } else {
            fuelType.setCustomValidity('');
        }
    }
}



// Clears duplicate brands for the showBrands function
function clearDuplicateBrands(arr) {

    var filtered = arr.filter((arr, index, self) =>
        index === self.findIndex((t) => (t.brand === arr.brand)))

    return filtered;
}

// Clears duplicate used brands for the showBrands function
function clearDuplicateUsedBrands(arr) {

    var filtered = arr.filter((arr, index, self) =>
        index === self.findIndex((t) => (t.manufacturer === arr.manufacturer)))

    return filtered;
}

//Displays brand options in the drop down slection
function showBrands(cars, brandName) {
    let option;
    for (let i = 0; i < cars.length; i++) {
        option = document.createElement("option");
        option.text = cars[i].brand;
        brandName.add(option);
        option.setAttribute("class", "brand selection")
    }
    option = document.createElement("option");
    option.text = "other";
    brandName.add(option);
    option.setAttribute("class", "brand selection")
}


//Displays brand options in the drop down slection
function showUsedBrands(cars, brandName) {
    let option;
    for (let i = 0; i < cars.length; i++) {
        option = document.createElement("option");
        option.text = cars[i].manufacturer;
        brandName.add(option);
        option.setAttribute("class", "brand selection")
    }
    option = document.createElement("option");
    option.text = "other";
    brandName.add(option);
    option.setAttribute("class", "brand selection")
}



//Updates the dropdown list of models depending on the brand selection
function showModels(brand) {

    clearSelections("all");

    // Clear previous data on every change
    let modelsForBrand = [];
    let option;
    const modelName = document.querySelector("#model");

    // Get the full list and filter out only for the selected brand from the dropdown
    modelsForBrand = filterBrand(newCars, brand)

    //Update models for selected brand
    for (let i = 0; i < modelsForBrand.length; i++) {
        option = document.createElement("option");
        option.text = modelsForBrand[i].short_name;
        modelName.add(option);
        option.setAttribute("class", "model selection")
    }

    option = document.createElement("option");
    option.text = "other";
    modelName.add(option);
    option.setAttribute("class", "model selection")

}

//Updates the dropdown list of used models depending on the brand selection
function showUsedModels(brand) {

    clearSelections("all");

    // Clear previous data on every change
    let modelsForBrand = [];
    let option;
    const modelName = document.querySelector("#usedModel");

    // Get the full list and filter out only for the selected brand from the dropdown
    modelsForBrand = filterUsedBrand(usedCars, brand)

    if (modelsForBrand) {
        //Update models for selected brand
        for (let i = 0; i < modelsForBrand.length; i++) {
            option = document.createElement("option");
            option.text = modelsForBrand[i].model + " - Current Stock: " + modelsForBrand[i].count;
            modelName.add(option);
            option.setAttribute("class", "model selection")
        }
    }

    option = document.createElement("option");
    option.text = "other";
    modelName.add(option);
    option.setAttribute("class", "model selection")
}



//Updates the dropdown list of fuel types depending on the model selection
function showFuels(model) {

    clearSelections("fuel");

    // Clear previous data on every change
    let fuelForModel = [];
    let option;
    const fuelType = document.querySelector("#fuel");

    // Get the full list and filter out only for the selected model fuel types from the dropdown
    cars = newCars;
    fuelForModel = filterModels(cars, model)
    //console.log(fuelForModel[0].fuel_types + "  FUEL MODEL 1");
    //Update fuel types for selected brand
    if (fuelForModel[0]) {
        for (let i = 0; i < fuelForModel[0].fuel_types.length; i++) {
            option = document.createElement("option");
            console.log(fuelForModel[0].fuel_types[i]);
            option.text = fuelForModel[0].fuel_types[i];
            fuelType.add(option);
            option.setAttribute("class", "fuel selection")
        }
    }

    option = document.createElement("option");
    option.text = "other";
    fuelType.add(option);
    option.setAttribute("class", "fuel selection")
}

function collectFormData() {

    var formResult = Object.fromEntries(new FormData(document.querySelector('form')).entries())

    console.log(JSON.stringify(formResult));

}

// In order to allow depending options in the vehicle model/fuel type to populate when automatically populated
function simulate_event(eventName, element) {
    var event;

    if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent(eventName, true, true);
    } else {
        event = document.createEventObject();
        event.eventType = eventName;
    };

    event.eventName = eventName;

    if (document.createEvent) {
        element.dispatchEvent(event);
    } else {
        element.fireEvent("on" + event.eventName, event);
    }
};
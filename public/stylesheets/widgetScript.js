// @ts-nocheck
/* =============================================================
* widgetScript.js - 02/2021
* Logic of the Widget and the Lead Form:
* Control DOM elements in the Lead Form
* Get data from APIs and automatically populate them in the form
* Get data from the Agent Widget SDK
* Other Form Control
* =============================================================*/

var usedCars = []; 
var newCars = [];
var contextFull = {}; // Context Storage Data response
var dealershipsData = {}; // All dealerships
var conversationId = ''; // Used to get the relevant conversationID content, such as data loaded from SDEs and information collected by the bot and get it from the Context Storage
var agentNameLogin = 'Unknown'; // Set the agent name (logged in agent, doesn't have to be the one chatting who submits the request)

window.onload = function () {
    if (lpTag.agentSDK) {
        sdkStart();
    }
}
document.onreadystatechange = () => {
    // document ready
    if (document.readyState === 'complete') {

        /* =============================================================
        * bootstrap3-typeahead.js v4.0.2
        * https://github.com/bassjobsen/Bootstrap-3-Typeahead
        * =============================================================*/
        !function (t, e) { "use strict"; "undefined" != typeof module && module.exports ? module.exports = e(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], function (t) { return e(t) }) : e(t.jQuery) }(this, function (t) { "use strict"; var e = function (s, i) { this.$element = t(s), this.options = t.extend({}, e.defaults, i), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.select = this.options.select || this.select, this.autoSelect = "boolean" != typeof this.options.autoSelect || this.options.autoSelect, this.highlighter = this.options.highlighter || this.highlighter, this.render = this.options.render || this.render, this.updater = this.options.updater || this.updater, this.displayText = this.options.displayText || this.displayText, this.itemLink = this.options.itemLink || this.itemLink, this.itemTitle = this.options.itemTitle || this.itemTitle, this.followLinkOnSelect = this.options.followLinkOnSelect || this.followLinkOnSelect, this.source = this.options.source, this.delay = this.options.delay, this.theme = this.options.theme && this.options.themes && this.options.themes[this.options.theme] || e.defaults.themes[e.defaults.theme], this.$menu = t(this.options.menu || this.theme.menu), this.$appendTo = this.options.appendTo ? t(this.options.appendTo) : null, this.fitToElement = "boolean" == typeof this.options.fitToElement && this.options.fitToElement, this.shown = !1, this.listen(), this.showHintOnFocus = ("boolean" == typeof this.options.showHintOnFocus || "all" === this.options.showHintOnFocus) && this.options.showHintOnFocus, this.afterSelect = this.options.afterSelect, this.afterEmptySelect = this.options.afterEmptySelect, this.addItem = !1, this.value = this.$element.val() || this.$element.text(), this.keyPressed = !1, this.focused = this.$element.is(":focus"), this.changeInputOnSelect = this.options.changeInputOnSelect || this.changeInputOnSelect, this.changeInputOnMove = this.options.changeInputOnMove || this.changeInputOnMove, this.openLinkInNewTab = this.options.openLinkInNewTab || this.openLinkInNewTab, this.selectOnBlur = this.options.selectOnBlur || this.selectOnBlur, this.showCategoryHeader = this.options.showCategoryHeader || this.showCategoryHeader }; e.prototype = { constructor: e, setDefault: function (t) { if (this.$element.data("active", t), this.autoSelect || t) { var e = this.updater(t); e || (e = ""), this.$element.val(this.displayText(e) || e).text(this.displayText(e) || e).change(), this.afterSelect(e) } return this.hide() }, select: function () { var t = this.$menu.find(".active").data("value"); if (this.$element.data("active", t), this.autoSelect || t) { var e = this.updater(t); e || (e = ""), this.changeInputOnSelect && this.$element.val(this.displayText(e) || e).text(this.displayText(e) || e).change(), this.followLinkOnSelect && this.itemLink(t) ? (this.openLinkInNewTab ? window.open(this.itemLink(t), "_blank") : document.location = this.itemLink(t), this.afterSelect(e)) : this.followLinkOnSelect && !this.itemLink(t) ? this.afterEmptySelect(e) : this.afterSelect(e) } else this.afterEmptySelect(); return this.hide() }, updater: function (t) { return t }, setSource: function (t) { this.source = t }, show: function () { var e, s = t.extend({}, this.$element.position(), { height: this.$element[0].offsetHeight }), i = "function" == typeof this.options.scrollHeight ? this.options.scrollHeight.call() : this.options.scrollHeight; if (this.shown ? e = this.$menu : this.$appendTo ? (e = this.$menu.appendTo(this.$appendTo), this.hasSameParent = this.$appendTo.is(this.$element.parent())) : (e = this.$menu.insertAfter(this.$element), this.hasSameParent = !0), !this.hasSameParent) { e.css("position", "fixed"); var o = this.$element.offset(); s.top = o.top, s.left = o.left } var n = t(e).parent().hasClass("dropup") ? "auto" : s.top + s.height + i, h = t(e).hasClass("dropdown-menu-right") ? "auto" : s.left; return e.css({ top: n, left: h }).show(), !0 === this.options.fitToElement && e.css("width", this.$element.outerWidth() + "px"), this.shown = !0, this }, hide: function () { return this.$menu.hide(), this.shown = !1, this }, lookup: function (e) { if (this.query = null != e ? e : this.$element.val(), this.query.length < this.options.minLength && !this.options.showHintOnFocus) return this.shown ? this.hide() : this; var s = t.proxy(function () { t.isFunction(this.source) && 3 === this.source.length ? this.source(this.query, t.proxy(this.process, this), t.proxy(this.process, this)) : t.isFunction(this.source) ? this.source(this.query, t.proxy(this.process, this)) : this.source && this.process(this.source) }, this); clearTimeout(this.lookupWorker), this.lookupWorker = setTimeout(s, this.delay) }, process: function (e) { var s = this; return e = t.grep(e, function (t) { return s.matcher(t) }), (e = this.sorter(e)).length || this.options.addItem ? (e.length > 0 ? this.$element.data("active", e[0]) : this.$element.data("active", null), "all" != this.options.items && (e = e.slice(0, this.options.items)), this.options.addItem && e.push(this.options.addItem), this.render(e).show()) : this.shown ? this.hide() : this }, matcher: function (t) { return ~this.displayText(t).toLowerCase().indexOf(this.query.toLowerCase()) }, sorter: function (t) { for (var e, s = [], i = [], o = []; e = t.shift();) { var n = this.displayText(e); n.toLowerCase().indexOf(this.query.toLowerCase()) ? ~n.indexOf(this.query) ? i.push(e) : o.push(e) : s.push(e) } return s.concat(i, o) }, highlighter: function (t) { var e = this.query; if ("" === e) return t; var s, i = t.match(/(>)([^<]*)(<)/g), o = [], n = []; if (i && i.length) for (s = 0; s < i.length; ++s)i[s].length > 2 && o.push(i[s]); else (o = []).push(t); e = e.replace(/[\(\)\/\.\*\+\?\[\]]/g, function (t) { return "\\" + t }); var h, a = new RegExp(e, "g"); for (s = 0; s < o.length; ++s)(h = o[s].match(a)) && h.length > 0 && n.push(o[s]); for (s = 0; s < n.length; ++s)t = t.replace(n[s], n[s].replace(a, "<strong>$&</strong>")); return t }, render: function (e) { var s = this, i = this, o = !1, n = [], h = s.options.separator; return t.each(e, function (t, s) { t > 0 && s[h] !== e[t - 1][h] && n.push({ __type: "divider" }), this.showCategoryHeader && (!s[h] || 0 !== t && s[h] === e[t - 1][h] || n.push({ __type: "category", name: s[h] })), n.push(s) }), e = t(n).map(function (e, n) { if ("category" == (n.__type || !1)) return t(s.options.headerHtml || s.theme.headerHtml).text(n.name)[0]; if ("divider" == (n.__type || !1)) return t(s.options.headerDivider || s.theme.headerDivider)[0]; var h = i.displayText(n); return (e = t(s.options.item || s.theme.item).data("value", n)).find(s.options.itemContentSelector || s.theme.itemContentSelector).addBack(s.options.itemContentSelector || s.theme.itemContentSelector).html(s.highlighter(h, n)), s.options.followLinkOnSelect && e.find("a").attr("href", i.itemLink(n)), e.find("a").attr("title", i.itemTitle(n)), h == i.$element.val() && (e.addClass("active"), i.$element.data("active", n), o = !0), e[0] }), this.autoSelect && !o && (e.filter(":not(.dropdown-header)").first().addClass("active"), this.$element.data("active", e.first().data("value"))), this.$menu.html(e), this }, displayText: function (t) { return void 0 !== t && void 0 !== t.name ? t.name : t }, itemLink: function (t) { return null }, itemTitle: function (t) { return null }, next: function (e) { var s = this.$menu.find(".active").removeClass("active").next(); for (s.length || (s = t(this.$menu.find(t(this.options.item || this.theme.item).prop("tagName"))[0])); s.hasClass("divider") || s.hasClass("dropdown-header");)s = s.next(); s.addClass("active"); var i = this.updater(s.data("value")); this.changeInputOnMove && this.$element.val(this.displayText(i) || i) }, prev: function (e) { var s = this.$menu.find(".active").removeClass("active").prev(); for (s.length || (s = this.$menu.find(t(this.options.item || this.theme.item).prop("tagName")).last()); s.hasClass("divider") || s.hasClass("dropdown-header");)s = s.prev(); s.addClass("active"); var i = this.updater(s.data("value")); this.changeInputOnMove && this.$element.val(this.displayText(i) || i) }, listen: function () { this.$element.on("focus.bootstrap3Typeahead", t.proxy(this.focus, this)).on("blur.bootstrap3Typeahead", t.proxy(this.blur, this)).on("keypress.bootstrap3Typeahead", t.proxy(this.keypress, this)).on("propertychange.bootstrap3Typeahead input.bootstrap3Typeahead", t.proxy(this.input, this)).on("keyup.bootstrap3Typeahead", t.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown.bootstrap3Typeahead", t.proxy(this.keydown, this)); var e = t(this.options.item || this.theme.item).prop("tagName"); "ontouchstart" in document.documentElement && "onmousemove" in document.documentElement ? this.$menu.on("touchstart", e, t.proxy(this.touchstart, this)).on("touchend", e, t.proxy(this.click, this)).on("click", t.proxy(this.click, this)).on("mouseenter", e, t.proxy(this.mouseenter, this)).on("mouseleave", e, t.proxy(this.mouseleave, this)).on("mousedown", t.proxy(this.mousedown, this)) : "ontouchstart" in document.documentElement ? this.$menu.on("touchstart", e, t.proxy(this.touchstart, this)).on("touchend", e, t.proxy(this.click, this)) : this.$menu.on("click", t.proxy(this.click, this)).on("mouseenter", e, t.proxy(this.mouseenter, this)).on("mouseleave", e, t.proxy(this.mouseleave, this)).on("mousedown", t.proxy(this.mousedown, this)) }, destroy: function () { this.$element.data("typeahead", null), this.$element.data("active", null), this.$element.unbind("focus.bootstrap3Typeahead").unbind("blur.bootstrap3Typeahead").unbind("keypress.bootstrap3Typeahead").unbind("propertychange.bootstrap3Typeahead input.bootstrap3Typeahead").unbind("keyup.bootstrap3Typeahead"), this.eventSupported("keydown") && this.$element.unbind("keydown.bootstrap3-typeahead"), this.$menu.remove(), this.destroyed = !0 }, eventSupported: function (t) { var e = t in this.$element; return e || (this.$element.setAttribute(t, "return;"), e = "function" == typeof this.$element[t]), e }, move: function (t) { if (this.shown) switch (t.keyCode) { case 9: case 13: case 27: t.preventDefault(); break; case 38: if (t.shiftKey) return; t.preventDefault(), this.prev(); break; case 40: if (t.shiftKey) return; t.preventDefault(), this.next() } }, keydown: function (e) { 17 !== e.keyCode && (this.keyPressed = !0, this.suppressKeyPressRepeat = ~t.inArray(e.keyCode, [40, 38, 9, 13, 27]), this.shown || 40 != e.keyCode ? this.move(e) : this.lookup()) }, keypress: function (t) { this.suppressKeyPressRepeat || this.move(t) }, input: function (t) { var e = this.$element.val() || this.$element.text(); this.value !== e && (this.value = e, this.lookup()) }, keyup: function (t) { if (!this.destroyed) switch (t.keyCode) { case 40: case 38: case 16: case 17: case 18: break; case 9: if (!this.shown || this.showHintOnFocus && !this.keyPressed) return; this.select(); break; case 13: if (!this.shown) return; this.select(); break; case 27: if (!this.shown) return; this.hide() } }, focus: function (t) { this.focused || (this.focused = !0, this.keyPressed = !1, this.options.showHintOnFocus && !0 !== this.skipShowHintOnFocus && ("all" === this.options.showHintOnFocus ? this.lookup("") : this.lookup())), this.skipShowHintOnFocus && (this.skipShowHintOnFocus = !1) }, blur: function (t) { this.mousedover || this.mouseddown || !this.shown ? this.mouseddown && (this.skipShowHintOnFocus = !0, this.$element.focus(), this.mouseddown = !1) : (this.selectOnBlur && this.select(), this.hide(), this.focused = !1, this.keyPressed = !1) }, click: function (t) { t.preventDefault(), this.skipShowHintOnFocus = !0, this.select(), this.$element.focus(), this.hide() }, mouseenter: function (e) { this.mousedover = !0, this.$menu.find(".active").removeClass("active"), t(e.currentTarget).addClass("active") }, mouseleave: function (t) { this.mousedover = !1, !this.focused && this.shown && this.hide() }, mousedown: function (t) { this.mouseddown = !0, this.$menu.one("mouseup", function (t) { this.mouseddown = !1 }.bind(this)) }, touchstart: function (e) { e.preventDefault(), this.$menu.find(".active").removeClass("active"), t(e.currentTarget).addClass("active") }, touchend: function (t) { t.preventDefault(), this.select(), this.$element.focus() } }; var s = t.fn.typeahead; t.fn.typeahead = function (s) { var i = arguments; return "string" == typeof s && "getActive" == s ? this.data("active") : this.each(function () { var o = t(this), n = o.data("typeahead"), h = "object" == typeof s && s; n || o.data("typeahead", n = new e(this, h)), "string" == typeof s && n[s] && (i.length > 1 ? n[s].apply(n, Array.prototype.slice.call(i, 1)) : n[s]()) }) }, e.defaults = { source: [], items: 30, minLength: 1, scrollHeight: 0, autoSelect: !0, afterSelect: t.noop, afterEmptySelect: t.noop, addItem: !1, followLinkOnSelect: !1, delay: 0, separator: "category", changeInputOnSelect: !0, changeInputOnMove: !0, openLinkInNewTab: !1, selectOnBlur: !0, showCategoryHeader: !0, theme: "bootstrap3", themes: { bootstrap3: { menu: '<ul class="typeahead dropdown-menu" role="listbox"></ul>', item: '<li><a class="dropdown-item" href="#" role="option"></a></li>', itemContentSelector: "a", headerHtml: '<li class="dropdown-header"></li>', headerDivider: '<li class="divider" role="separator"></li>' }, bootstrap4: { menu: '<div class="typeahead dropdown-menu" role="listbox"></div>', item: '<button class="dropdown-item" role="option"></button>', itemContentSelector: ".dropdown-item", headerHtml: '<h6 class="dropdown-header"></h6>', headerDivider: '<div class="dropdown-divider"></div>' } } }, t.fn.typeahead.Constructor = e, t.fn.typeahead.noConflict = function () { return t.fn.typeahead = s, this }, t(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (e) { var s = t(this); s.data("typeahead") || s.typeahead(s.data()) }) });

        const brandName = document.querySelector("#brand");
        const usedBrandName = document.querySelector("#usedBrand");

        const DELAY = 2000; // Allow some time for the conversationID to be loaded by the SDK and then run all the logic

        setTimeout(function () { // Using timeout to allow the SDK time to load and get the conversationID


            // If we do not have the conversationID, don't try to go through all the pre-fill data logic
            // And only load the data from the APIs, otherwise if we do have the ConversationID go through the pre-fill data logic
            if (!conversationId) {

                console.log("conversationId NOT Loaded, using APIs only, is empty?:" + conversationId)

                fetch('https://liveperson.robinsandday.co.uk/api/used') // GET used cars list
                    .then(usedCarsResponse => usedCarsResponse.json())
                    .then(usedCarData => {
                        console.log(usedCarData)
                        usedCars = usedCarData;

                        fetch('https://liveperson.robinsandday.co.uk/api/new') // when used cars request is done, GET new cars list and init all values
                            .then(newCarResponse => newCarResponse.json()
                                .then(newCarData => {
                                    console.log(newCarData)
                                    newCars = newCarData;

                                    newCars.forEach(function (value, i) {
                                        if (newCars[i].brand.length > 2) {
                                            newCars[i].brand = capitalize(value.brand)
                                        } else newCars[i].brand = value.brand.toUpperCase();
                                    }); // API returns brands in lower case, but SDEs come in capitalized, therefore adding capitalization to API brand results, if the brand name consists of 2 letters or less it will uppercase the entire brand name
                                    // Altough not needed here as this triggers if we do not get the Conversation ID - adding just to allow results to be similar and avoid confusion

                                    fetch('https://liveperson.robinsandday.co.uk/api/dealerships') // when used cars request is done, GET new cars list and init all values
                                        .then(dealershipsResponse => dealershipsResponse.json()
                                            .then(dealerships => {
                                                console.log(dealerships)
                                                dealershipsData = dealerships;

                                                $('#typeahead-autocomplete .thead').typeahead({ // Using bootstrap typeahead for autocomplete of the dealerships
                                                    source: dealershipsData.filtered,
                                                    displayText: function (item) {
                                                        return item.used_name_short
                                                    },
                                                    afterSelect: function (item) {
                                                        this.$element[0].value = item.used_name_short
                                                        document.getElementById('dealershipId').value = item.id; // assign a hidden field the ID of the dealership so we can grab it when the form is sent to the server
                                                    }
                                                })
                                                console.log(`Agent name login: ${agentNameLogin}`)
                                                insertDataToDomId('agentName', agentNameLogin);

                                                //Clear duplicate brands to show brand list without duplicates
                                                let noDuplicates = clearDuplicateBrands(newCars)
                                                showBrands(noDuplicates, brandName);

                                                let noUsedDuplicates = clearDuplicateUsedBrands(usedCars)
                                                showUsedBrands(noUsedDuplicates, usedBrandName);


                                            }))

                                }))
                    });

            } else { // If we do have the conversationID (most of the time)
                console.log("conversationId Loaded, is conversationId empty?:" + conversationId)
                try {

                    fetch('https://liveperson.robinsandday.co.uk/api/used') // GET used cars list
                        .then(usedCarsResponse => usedCarsResponse.json()
                            .then(usedCarData => {
                                console.log(usedCarData)
                                usedCars = usedCarData;

                                fetch('https://liveperson.robinsandday.co.uk/api/new') // when used cars request is done, GET new cars list and init all values
                                    .then(newCarResponse => newCarResponse.json()
                                        .then(newCarData => {
                                            console.log(newCarData)
                                            newCars = newCarData;

                                            newCars.forEach(function (value, i) {
                                                if (newCars[i].brand.length > 2) {
                                                    newCars[i].brand = capitalize(value.brand)
                                                } else newCars[i].brand = value.brand.toUpperCase();
                                            }); // API returns brands in lower case, but SDEs come in capitalized, therefore adding capitalization to API brand results, if the brand name consists of 2 letters or less it will uppercase the entire brand name

                                            fetch(`https://liveperson.robinsandday.co.uk/api/contextData/?convId=${conversationId}`)// get context data passed to the server with ConversationID grabbed by the Agent Widget SDK
                                                .then(contextResponse => contextResponse.json()
                                                    .then(contextData => {
                                                        console.log(contextData)
                                                        contextFull = contextData;
                                                        if (!isEmpty(contextFull) && contextFull.leadtype && contextFull.make) {
                                                            contextFull.leadtype = contextFull.leadtype.toLowerCase(); // evaluate leadtype in lower case
                                                            //   contextFull.make = contextFull.make.toLowerCase(); // evaluate make in lower case (due to data in the API returned as lower case)
                                                        }

                                                        fetch('https://liveperson.robinsandday.co.uk/api/dealerships') // when used cars request is done, GET new cars list and init all values
                                                            .then(dealershipsResponse => dealershipsResponse.json()
                                                                .then(dealerships => {
                                                                    console.log(dealerships)
                                                                    dealershipsData = dealerships;
                                                                    

                                                                    $('#typeahead-autocomplete .thead').typeahead({
                                                                        source: dealershipsData.filtered,
                                                                        displayText: function (item) {
                                                                            return item.used_name_short
                                                                        },
                                                                        afterSelect: function (item) {
                                                                            this.$element[0].value = item.used_name_short
                                                                            document.getElementById('dealershipId').value = item.id;
                                                                        }
                                                                    })
                                                                    
                                                                    console.log(`Agent name login: ${agentNameLogin}`)
                                                                    insertDataToDomId('agentName', agentNameLogin);
                                                                    //Clear duplicate brands to show brand list without duplicates
                                                                    let noDuplicates = clearDuplicateBrands(newCars)
                                                                    showBrands(noDuplicates, brandName);

                                                                    let noUsedDuplicates = clearDuplicateUsedBrands(usedCars)
                                                                    showUsedBrands(noUsedDuplicates, usedBrandName);


                                                                    // ******                              
                                                                    // ***START OF AUTO PRE-FILL DATA LOGIC***
                                                                    // ******

                                                                    if (contextFull.leadtype) { //Open the relevant category depending on values received, only if leadtype is sales we will check if vehicleType is new or used, otherwise if leadtype has a different value it will go to service. Also if it's new will also populate the purchaseType (ctype) with motability or business
                                                                        if (contextFull.leadtype == "used" || contextFull.leadtype == "new" || contextFull.leadtype == "motability" || contextFull.leadtype == "business") {
                                                                            if (contextFull.leadtype == "used") {
                                                                                document.getElementById("used").click();

                                                                                if (contextFull.make) {
                                                                                    insertDataToDomId('usedBrand', contextFull.make)
                                                                                    simulate_event('change', document.getElementById('usedBrand'));
                                                                                    // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                                                                                }

                                                                                if (contextFull.model) {
                                                                                    insertDataToDomId('usedModel', contextFull.model)
                                                                                    simulate_event('change', document.getElementById('usedModel'));
                                                                                    // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                                                                                }

                                                                                if (contextFull.vrn) {
                                                                                    insertDataToDomId('usedRegNumber', contextFull.vrn)
                                                                                }
                                                                                if (contextFull.valuation) {
                                                                                    insertDataToDomId('valuation', contextFull.valuation)
                                                                                }



                                                                            } else if (contextFull.leadtype == "new" || contextFull.leadtype == "motability" || contextFull.leadtype == "business") {

                                                                                document.getElementById("new").click();
                                                                                if (contextFull.leadtype == "motability") {
                                                                                    insertDataToDomId('purchaseType', 'Motability');

                                                                                } else if (contextFull.leadtype == "business") {
                                                                                    insertDataToDomId('purchaseType', 'Business');
                                                                                } // else it will be the default, which is "New"

                                                                                if (contextFull.make) {
                                                                                    insertDataToDomId('brand', contextFull.make);
                                                                                    simulate_event('change', document.getElementById('brand'));
                                                                                    // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                                                                                }

                                                                                if (contextFull.model) {
                                                                                    insertDataToDomId('model', contextFull.model);
                                                                                    simulate_event('change', document.getElementById('model'));
                                                                                    // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                                                                                }


                                                                                if (contextFull.fueltype) {
                                                                                    insertDataToDomId('fuel', contextFull.fueltype);
                                                                                    simulate_event('change', document.getElementById('fuel'));
                                                                                    // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                                                                                }

                                                                            }

                                                                            if (contextFull.capid) {
                                                                                insertDataToDomId('atidcapid', contextFull.capid);
                                                                            }

                                                                            if (contextFull.trim) {
                                                                                insertDataToDomId('trim', contextFull.trim);
                                                                            }

                                                                            if (contextFull.description) {
                                                                                insertDataToDomId('description', contextFull.description);
                                                                            }

                                                                            if (contextFull.value) {
                                                                                insertDataToDomId('price', contextFull.value);
                                                                            }



                                                                        } else {
                                                                            document.getElementById("service").click();

                                                                            if (contextFull.make) {
                                                                                insertDataToDomId('usedBrand', contextFull.make);
                                                                                simulate_event('change', document.getElementById('usedBrand'));
                                                                                // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                                                                            }

                                                                            if (contextFull.model) {
                                                                                insertDataToDomId('usedModel', contextFull.model);
                                                                                simulate_event('change', document.getElementById('usedModel'));
                                                                                // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event


                                                                                if (contextFull.bookingtime) {
                                                                                    insertDataToDomId('addInfo', `Booking Time Request: ${contextFull.bookingtime}`);
                                                                                }


                                                                            }
                                                                        }
                                                                    }

                                                                    //LEAD

                                                                    if (contextFull.locationname) {
                                                                        $("#typeahead-autocomplete .thead").val(contextFull.locationname);
                                                                    } // Display for the agent to be aware which dealership was populated

                                                                    if (contextFull.locationid) {
                                                                        $("#dealershipId").val(contextFull.locationid);
                                                                    } // The hidden field of the ID being populated directly from the data

                                                                    if (contextFull.contactmethod) {
                                                                        insertDataToDomId('channel', contextFull.contactmethod.toLowerCase())
                                                                    }

                                                                    if (contextFull.enquirysource) {
                                                                        insertDataToDomId('source', contextFull.enquirysource);
                                                                    }

                                                                    if (contextFull.channel) {
                                                                        insertDataToDomId('channelSource', contextFull.channel);
                                                                    }
                                                                    
                                                                    if (contextFull.mileage) {
                                                                        insertDataToDomId('mileage', contextFull.mileage);
                                                                    }

                                                                    // ******
                                                                    // ***END OF AUTO PRE-FILL DATA LOGIC***
                                                                    // ******
                                                                }))
                                                    }))
                                        }))
                            }));

                } catch (e) {
                    console.error(e);
                }

            }
        }, DELAY);
    }

};


// Function to start the SDK and get the conversationID
function sdkStart() {
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

    var conversationIdentifier = 'chatInfo.rtSessionId'; //See: https://developers.liveperson.com/agent-workspace-widget-sdk-public-model-structure.html for the full data structure
    var agentName = 'agentInfo.agentName'; // Logged in agent name (does not mean it is the one chatting, but it is the agent that is logged in to the system who getst he lead submitted on his name)

    lpTag.agentSDK.get(conversationIdentifier, successCallbackConv, failureCallback);
    lpTag.agentSDK.get(agentName, successCallbackAgent, failureCallback);


}

var successCallbackAgent = function (data) {
    // Do something with the returning data
    agentNameLogin =  data; // saving to the global var
    console.log(`agentSDK Data successCallbackAgent: ${JSON.stringify(agentNameLogin)}`);

};

var successCallbackConv = function (data) {
    // Do something with the returning data
    conversationId = data; // saving to the global var
    console.log(`agentSDK Data successCallbackConv: ${JSON.stringify(conversationId)}`);

};

var failureCallback = function (err) {
    if (err) {
        console.log(err);
    }
    // when the action terminated with an error.
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

//Displays fields relevant to the category selection only and hides those that are not relevant
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
    const voiTitle = document.querySelector("#voiTitle");

    //Service
    //const customerRegNumber = document.querySelector("#customerRegNumber"); // Also in new and used for part exchange
    //const mileage = document.querySelector("#mileage");// Also in new and used 
    const customerBrand = document.querySelector("#customerBrand");
    const customerModel = document.querySelector("#customerModel");



    if (isChecked && value == "used") {

        //insertDataToDomId('purchaseType', 'Used');

        brandName.style.display = "none";
        modelName.style.display = "none";
        fuelType.style.display = "none";
        purchaseType.style.display = "none";
        customerBrand.style.display = "none";
        customerModel.style.display = "none";

        usedBrandName.style.display = "block";
        usedModelName.style.display = "block";
        usedRegNumber.style.display = "block";
        valuation.style.display = "block";
        atidcapid.style.display = "block";
        trim.style.display = "block";
        description.style.display = "block";
        price.style.display = "block";
        voiTitle.innerHTML = "Vehicle of Interest";

    }

    if (isChecked && value == "new") {

        //insertDataToDomId('purchaseType', 'New');

        brandName.style.display = "block";
        modelName.style.display = "block";
        fuelType.style.display = "block";
        purchaseType.style.display = "block";
        atidcapid.style.display = "block";
        trim.style.display = "block";
        description.style.display = "block";
        price.style.display = "block";
        voiTitle.innerHTML = "Vehicle of Interest";

        usedRegNumber.style.display = "none";
        usedBrandName.style.display = "none";
        usedModelName.style.display = "none";
        valuation.style.display = "none";
        customerBrand.style.display = "none";
        customerModel.style.display = "none";

    }

    if (isChecked && value == "service") {

        //insertDataToDomId('purchaseType', 'Service');

        customerBrand.style.display = "block";
        customerModel.style.display = "block";
        voiTitle.innerHTML = "Customer Vehicle";

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
        usedBrandName.style.display = "none";
        usedModelName.style.display = "none";
    }
}

// Custom form validation for the brand/model/fuel selections
function carSelectionValid(data) {
    console.log("checking validity")
    const brandName = document.querySelector("#brand");
    const modelName = document.querySelector("#model");
    const fuelType = document.querySelector("#fuel");

    const usedBrandName = document.querySelector("#usedBrand");
    const usedModelName = document.querySelector("#usedModel");

    const isChecked = document.querySelector('input[name="carType"]:checked').value;
    console.log("The data:" + JSON.stringify(data))
    if (isChecked == "used") {

        brandName.setCustomValidity('');
        modelName.setCustomValidity('');
        fuelType.setCustomValidity('');

        if (usedBrandName.value.indexOf("Select") > -1) {
            usedBrandName.setCustomValidity('You must choose a Brand');
            console.log('You did not select a used car brand', usedBrandName.value.indexOf("Select"))
        } else {
            usedBrandName.setCustomValidity('');
        }


        if (usedModelName.value.indexOf("Select") > -1) {
            usedModelName.setCustomValidity('You must choose a Model');
            console.log('You did not select a used car model', usedModelName.value.indexOf("Select"))
        } else {
            usedModelName.setCustomValidity('');
        }
    }

    if (isChecked == "new") {

        usedBrandName.setCustomValidity('');
        usedModelName.setCustomValidity('');

        if (brandName.value.indexOf("Select") > -1) {
            brandName.setCustomValidity('You must choose a Brand');
            console.log('You did not select a new car brand', brandName.value.indexOf("Select"))
        } else {
            brandName.setCustomValidity('');
        }


        if (modelName.value.indexOf("Select") > -1) {
            modelName.setCustomValidity('You must choose a Model');
            console.log('You did not select a new car model', modelName.value.indexOf("Select"))
        } else {
            modelName.setCustomValidity('');
        }

        if (fuelType.value.indexOf("Select") > -1) {
            fuelType.setCustomValidity('You must choose a FuelType');
            console.log('You did not select a new car fuel type', fuelType.value.indexOf("Select"))
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
    option.setAttribute("class", "brand selection") // Always show other as an option 
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

    // Clear previous data on every change
    clearSelections("all");
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

    // Clear previous data on every change
    clearSelections("all");
    let modelsForBrand = [];
    let option;
    const modelName = document.querySelector("#usedModel");

    // Get the full list and filter out only for the selected brand from the dropdown
    modelsForBrand = filterUsedBrand(usedCars, brand)

    if (modelsForBrand) {
        //Update models for selected brand
        for (let i = 0; i < modelsForBrand.length; i++) {
            option = document.createElement("option");
            option.text = modelsForBrand[i].model;
            modelName.add(option);
            option.setAttribute("class", "model selection")
            option.setAttribute("title", `Current Stock: ${modelsForBrand[i].count}`)
        }
    }

    option = document.createElement("option");
    option.text = "other";
    modelName.add(option);
    option.setAttribute("class", "model selection")
}



//Updates the dropdown list of fuel types depending on the model selection
function showFuels(model) {

    // Clear previous data on every change
    clearSelections("fuel");
    let fuelForModel = [];
    let option;
    const fuelType = document.querySelector("#fuel");

    // Get the full list and filter out only for the selected model fuel types from the dropdown
    cars = newCars;
    fuelForModel = filterModels(cars, model)

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

// Using a function to insert value to element, to allow easier control if changes need to be made
function insertDataToDomId(element, data) {
    document.getElementById(element).value = data;
}


//******************//
// Utility functions
//******************//

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

// Function to check if an object is empty - if results from the Context Warehouse are not populated then
// The result would be an empty object, we use this function to check that.
function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
};

//Capitalize the first letter of a word
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
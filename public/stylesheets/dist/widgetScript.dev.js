"use strict";

var _this = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
};

document.onreadystatechange = function () {
  // document ready
  if (document.readyState === 'complete') {
    /* =============================================================
    * bootstrap3-typeahead.js v4.0.2
    * https://github.com/bassjobsen/Bootstrap-3-Typeahead
    * =============================================================
    * Original written by @mdo and @fat
    * =============================================================
    * Copyright 2014 Bass Jobsen @bassjobsen
    *
    * Licensed under the Apache License, Version 2.0 (the 'License');
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    * http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an 'AS IS' BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    * ============================================================ */
    !function (t, e) {
      "use strict";

      "undefined" != typeof module && module.exports ? module.exports = e(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], function (t) {
        return e(t);
      }) : e(t.jQuery);
    }(_this, function (t) {
      "use strict";

      var e = function e(s, i) {
        this.$element = t(s), this.options = t.extend({}, e.defaults, i), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.select = this.options.select || this.select, this.autoSelect = "boolean" != typeof this.options.autoSelect || this.options.autoSelect, this.highlighter = this.options.highlighter || this.highlighter, this.render = this.options.render || this.render, this.updater = this.options.updater || this.updater, this.displayText = this.options.displayText || this.displayText, this.itemLink = this.options.itemLink || this.itemLink, this.itemTitle = this.options.itemTitle || this.itemTitle, this.followLinkOnSelect = this.options.followLinkOnSelect || this.followLinkOnSelect, this.source = this.options.source, this.delay = this.options.delay, this.theme = this.options.theme && this.options.themes && this.options.themes[this.options.theme] || e.defaults.themes[e.defaults.theme], this.$menu = t(this.options.menu || this.theme.menu), this.$appendTo = this.options.appendTo ? t(this.options.appendTo) : null, this.fitToElement = "boolean" == typeof this.options.fitToElement && this.options.fitToElement, this.shown = !1, this.listen(), this.showHintOnFocus = ("boolean" == typeof this.options.showHintOnFocus || "all" === this.options.showHintOnFocus) && this.options.showHintOnFocus, this.afterSelect = this.options.afterSelect, this.afterEmptySelect = this.options.afterEmptySelect, this.addItem = !1, this.value = this.$element.val() || this.$element.text(), this.keyPressed = !1, this.focused = this.$element.is(":focus"), this.changeInputOnSelect = this.options.changeInputOnSelect || this.changeInputOnSelect, this.changeInputOnMove = this.options.changeInputOnMove || this.changeInputOnMove, this.openLinkInNewTab = this.options.openLinkInNewTab || this.openLinkInNewTab, this.selectOnBlur = this.options.selectOnBlur || this.selectOnBlur, this.showCategoryHeader = this.options.showCategoryHeader || this.showCategoryHeader;
      };

      e.prototype = {
        constructor: e,
        setDefault: function setDefault(t) {
          if (this.$element.data("active", t), this.autoSelect || t) {
            var e = this.updater(t);
            e || (e = ""), this.$element.val(this.displayText(e) || e).text(this.displayText(e) || e).change(), this.afterSelect(e);
          }

          return this.hide();
        },
        select: function select() {
          var t = this.$menu.find(".active").data("value");

          if (this.$element.data("active", t), this.autoSelect || t) {
            var e = this.updater(t);
            e || (e = ""), this.changeInputOnSelect && this.$element.val(this.displayText(e) || e).text(this.displayText(e) || e).change(), this.followLinkOnSelect && this.itemLink(t) ? (this.openLinkInNewTab ? window.open(this.itemLink(t), "_blank") : document.location = this.itemLink(t), this.afterSelect(e)) : this.followLinkOnSelect && !this.itemLink(t) ? this.afterEmptySelect(e) : this.afterSelect(e);
          } else this.afterEmptySelect();

          return this.hide();
        },
        updater: function updater(t) {
          return t;
        },
        setSource: function setSource(t) {
          this.source = t;
        },
        show: function show() {
          var e,
              s = t.extend({}, this.$element.position(), {
            height: this.$element[0].offsetHeight
          }),
              i = "function" == typeof this.options.scrollHeight ? this.options.scrollHeight.call() : this.options.scrollHeight;

          if (this.shown ? e = this.$menu : this.$appendTo ? (e = this.$menu.appendTo(this.$appendTo), this.hasSameParent = this.$appendTo.is(this.$element.parent())) : (e = this.$menu.insertAfter(this.$element), this.hasSameParent = !0), !this.hasSameParent) {
            e.css("position", "fixed");
            var o = this.$element.offset();
            s.top = o.top, s.left = o.left;
          }

          var n = t(e).parent().hasClass("dropup") ? "auto" : s.top + s.height + i,
              h = t(e).hasClass("dropdown-menu-right") ? "auto" : s.left;
          return e.css({
            top: n,
            left: h
          }).show(), !0 === this.options.fitToElement && e.css("width", this.$element.outerWidth() + "px"), this.shown = !0, this;
        },
        hide: function hide() {
          return this.$menu.hide(), this.shown = !1, this;
        },
        lookup: function lookup(e) {
          if (this.query = null != e ? e : this.$element.val(), this.query.length < this.options.minLength && !this.options.showHintOnFocus) return this.shown ? this.hide() : this;
          var s = t.proxy(function () {
            t.isFunction(this.source) && 3 === this.source.length ? this.source(this.query, t.proxy(this.process, this), t.proxy(this.process, this)) : t.isFunction(this.source) ? this.source(this.query, t.proxy(this.process, this)) : this.source && this.process(this.source);
          }, this);
          clearTimeout(this.lookupWorker), this.lookupWorker = setTimeout(s, this.delay);
        },
        process: function process(e) {
          var s = this;
          return e = t.grep(e, function (t) {
            return s.matcher(t);
          }), (e = this.sorter(e)).length || this.options.addItem ? (e.length > 0 ? this.$element.data("active", e[0]) : this.$element.data("active", null), "all" != this.options.items && (e = e.slice(0, this.options.items)), this.options.addItem && e.push(this.options.addItem), this.render(e).show()) : this.shown ? this.hide() : this;
        },
        matcher: function matcher(t) {
          return ~this.displayText(t).toLowerCase().indexOf(this.query.toLowerCase());
        },
        sorter: function sorter(t) {
          for (var e, s = [], i = [], o = []; e = t.shift();) {
            var n = this.displayText(e);
            n.toLowerCase().indexOf(this.query.toLowerCase()) ? ~n.indexOf(this.query) ? i.push(e) : o.push(e) : s.push(e);
          }

          return s.concat(i, o);
        },
        highlighter: function highlighter(t) {
          var e = this.query;
          if ("" === e) return t;
          var s,
              i = t.match(/(>)([^<]*)(<)/g),
              o = [],
              n = [];
          if (i && i.length) for (s = 0; s < i.length; ++s) {
            i[s].length > 2 && o.push(i[s]);
          } else (o = []).push(t);
          e = e.replace(/[\(\)\/\.\*\+\?\[\]]/g, function (t) {
            return "\\" + t;
          });
          var h,
              a = new RegExp(e, "g");

          for (s = 0; s < o.length; ++s) {
            (h = o[s].match(a)) && h.length > 0 && n.push(o[s]);
          }

          for (s = 0; s < n.length; ++s) {
            t = t.replace(n[s], n[s].replace(a, "<strong>$&</strong>"));
          }

          return t;
        },
        render: function render(e) {
          var s = this,
              i = this,
              o = !1,
              n = [],
              h = s.options.separator;
          return t.each(e, function (t, s) {
            t > 0 && s[h] !== e[t - 1][h] && n.push({
              __type: "divider"
            }), this.showCategoryHeader && (!s[h] || 0 !== t && s[h] === e[t - 1][h] || n.push({
              __type: "category",
              name: s[h]
            })), n.push(s);
          }), e = t(n).map(function (e, n) {
            if ("category" == (n.__type || !1)) return t(s.options.headerHtml || s.theme.headerHtml).text(n.name)[0];
            if ("divider" == (n.__type || !1)) return t(s.options.headerDivider || s.theme.headerDivider)[0];
            var h = i.displayText(n);
            return (e = t(s.options.item || s.theme.item).data("value", n)).find(s.options.itemContentSelector || s.theme.itemContentSelector).addBack(s.options.itemContentSelector || s.theme.itemContentSelector).html(s.highlighter(h, n)), s.options.followLinkOnSelect && e.find("a").attr("href", i.itemLink(n)), e.find("a").attr("title", i.itemTitle(n)), h == i.$element.val() && (e.addClass("active"), i.$element.data("active", n), o = !0), e[0];
          }), this.autoSelect && !o && (e.filter(":not(.dropdown-header)").first().addClass("active"), this.$element.data("active", e.first().data("value"))), this.$menu.html(e), this;
        },
        displayText: function displayText(t) {
          return void 0 !== t && void 0 !== t.name ? t.name : t;
        },
        itemLink: function itemLink(t) {
          return null;
        },
        itemTitle: function itemTitle(t) {
          return null;
        },
        next: function next(e) {
          var s = this.$menu.find(".active").removeClass("active").next();

          for (s.length || (s = t(this.$menu.find(t(this.options.item || this.theme.item).prop("tagName"))[0])); s.hasClass("divider") || s.hasClass("dropdown-header");) {
            s = s.next();
          }

          s.addClass("active");
          var i = this.updater(s.data("value"));
          this.changeInputOnMove && this.$element.val(this.displayText(i) || i);
        },
        prev: function prev(e) {
          var s = this.$menu.find(".active").removeClass("active").prev();

          for (s.length || (s = this.$menu.find(t(this.options.item || this.theme.item).prop("tagName")).last()); s.hasClass("divider") || s.hasClass("dropdown-header");) {
            s = s.prev();
          }

          s.addClass("active");
          var i = this.updater(s.data("value"));
          this.changeInputOnMove && this.$element.val(this.displayText(i) || i);
        },
        listen: function listen() {
          this.$element.on("focus.bootstrap3Typeahead", t.proxy(this.focus, this)).on("blur.bootstrap3Typeahead", t.proxy(this.blur, this)).on("keypress.bootstrap3Typeahead", t.proxy(this.keypress, this)).on("propertychange.bootstrap3Typeahead input.bootstrap3Typeahead", t.proxy(this.input, this)).on("keyup.bootstrap3Typeahead", t.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown.bootstrap3Typeahead", t.proxy(this.keydown, this));
          var e = t(this.options.item || this.theme.item).prop("tagName");
          "ontouchstart" in document.documentElement && "onmousemove" in document.documentElement ? this.$menu.on("touchstart", e, t.proxy(this.touchstart, this)).on("touchend", e, t.proxy(this.click, this)).on("click", t.proxy(this.click, this)).on("mouseenter", e, t.proxy(this.mouseenter, this)).on("mouseleave", e, t.proxy(this.mouseleave, this)).on("mousedown", t.proxy(this.mousedown, this)) : "ontouchstart" in document.documentElement ? this.$menu.on("touchstart", e, t.proxy(this.touchstart, this)).on("touchend", e, t.proxy(this.click, this)) : this.$menu.on("click", t.proxy(this.click, this)).on("mouseenter", e, t.proxy(this.mouseenter, this)).on("mouseleave", e, t.proxy(this.mouseleave, this)).on("mousedown", t.proxy(this.mousedown, this));
        },
        destroy: function destroy() {
          this.$element.data("typeahead", null), this.$element.data("active", null), this.$element.unbind("focus.bootstrap3Typeahead").unbind("blur.bootstrap3Typeahead").unbind("keypress.bootstrap3Typeahead").unbind("propertychange.bootstrap3Typeahead input.bootstrap3Typeahead").unbind("keyup.bootstrap3Typeahead"), this.eventSupported("keydown") && this.$element.unbind("keydown.bootstrap3-typeahead"), this.$menu.remove(), this.destroyed = !0;
        },
        eventSupported: function eventSupported(t) {
          var e = t in this.$element;
          return e || (this.$element.setAttribute(t, "return;"), e = "function" == typeof this.$element[t]), e;
        },
        move: function move(t) {
          if (this.shown) switch (t.keyCode) {
            case 9:
            case 13:
            case 27:
              t.preventDefault();
              break;

            case 38:
              if (t.shiftKey) return;
              t.preventDefault(), this.prev();
              break;

            case 40:
              if (t.shiftKey) return;
              t.preventDefault(), this.next();
          }
        },
        keydown: function keydown(e) {
          17 !== e.keyCode && (this.keyPressed = !0, this.suppressKeyPressRepeat = ~t.inArray(e.keyCode, [40, 38, 9, 13, 27]), this.shown || 40 != e.keyCode ? this.move(e) : this.lookup());
        },
        keypress: function keypress(t) {
          this.suppressKeyPressRepeat || this.move(t);
        },
        input: function input(t) {
          var e = this.$element.val() || this.$element.text();
          this.value !== e && (this.value = e, this.lookup());
        },
        keyup: function keyup(t) {
          if (!this.destroyed) switch (t.keyCode) {
            case 40:
            case 38:
            case 16:
            case 17:
            case 18:
              break;

            case 9:
              if (!this.shown || this.showHintOnFocus && !this.keyPressed) return;
              this.select();
              break;

            case 13:
              if (!this.shown) return;
              this.select();
              break;

            case 27:
              if (!this.shown) return;
              this.hide();
          }
        },
        focus: function focus(t) {
          this.focused || (this.focused = !0, this.keyPressed = !1, this.options.showHintOnFocus && !0 !== this.skipShowHintOnFocus && ("all" === this.options.showHintOnFocus ? this.lookup("") : this.lookup())), this.skipShowHintOnFocus && (this.skipShowHintOnFocus = !1);
        },
        blur: function blur(t) {
          this.mousedover || this.mouseddown || !this.shown ? this.mouseddown && (this.skipShowHintOnFocus = !0, this.$element.focus(), this.mouseddown = !1) : (this.selectOnBlur && this.select(), this.hide(), this.focused = !1, this.keyPressed = !1);
        },
        click: function click(t) {
          t.preventDefault(), this.skipShowHintOnFocus = !0, this.select(), this.$element.focus(), this.hide();
        },
        mouseenter: function mouseenter(e) {
          this.mousedover = !0, this.$menu.find(".active").removeClass("active"), t(e.currentTarget).addClass("active");
        },
        mouseleave: function mouseleave(t) {
          this.mousedover = !1, !this.focused && this.shown && this.hide();
        },
        mousedown: function mousedown(t) {
          this.mouseddown = !0, this.$menu.one("mouseup", function (t) {
            this.mouseddown = !1;
          }.bind(this));
        },
        touchstart: function touchstart(e) {
          e.preventDefault(), this.$menu.find(".active").removeClass("active"), t(e.currentTarget).addClass("active");
        },
        touchend: function touchend(t) {
          t.preventDefault(), this.select(), this.$element.focus();
        }
      };
      var s = t.fn.typeahead;
      t.fn.typeahead = function (s) {
        var i = arguments;
        return "string" == typeof s && "getActive" == s ? this.data("active") : this.each(function () {
          var o = t(this),
              n = o.data("typeahead"),
              h = "object" == _typeof(s) && s;
          n || o.data("typeahead", n = new e(this, h)), "string" == typeof s && n[s] && (i.length > 1 ? n[s].apply(n, Array.prototype.slice.call(i, 1)) : n[s]());
        });
      }, e.defaults = {
        source: [],
        items: 30,
        minLength: 1,
        scrollHeight: 0,
        autoSelect: !0,
        afterSelect: t.noop,
        afterEmptySelect: t.noop,
        addItem: !1,
        followLinkOnSelect: !1,
        delay: 0,
        separator: "category",
        changeInputOnSelect: !0,
        changeInputOnMove: !0,
        openLinkInNewTab: !1,
        selectOnBlur: !0,
        showCategoryHeader: !0,
        theme: "bootstrap3",
        themes: {
          bootstrap3: {
            menu: '<ul class="typeahead dropdown-menu" role="listbox"></ul>',
            item: '<li><a class="dropdown-item" href="#" role="option"></a></li>',
            itemContentSelector: "a",
            headerHtml: '<li class="dropdown-header"></li>',
            headerDivider: '<li class="divider" role="separator"></li>'
          },
          bootstrap4: {
            menu: '<div class="typeahead dropdown-menu" role="listbox"></div>',
            item: '<button class="dropdown-item" role="option"></button>',
            itemContentSelector: ".dropdown-item",
            headerHtml: '<h6 class="dropdown-header"></h6>',
            headerDivider: '<div class="dropdown-divider"></div>'
          }
        }
      }, t.fn.typeahead.Constructor = e, t.fn.typeahead.noConflict = function () {
        return t.fn.typeahead = s, this;
      }, t(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (e) {
        var s = t(this);
        s.data("typeahead") || s.typeahead(s.data());
      });
    });
    var brandName = document.querySelector("#brand");
    var modelName = document.querySelector("#model");
    var fuelType = document.querySelector("#fuel");
    var usedBrandName = document.querySelector("#usedBrand");
    var usedModelName = document.querySelector("#usedModel");
    var delayInMilliseconds = 5000;
    setTimeout(function () {
      if (conversationId == true) {
        console.log("conversationId NOT Loaded, using APIs only, is empty?:" + conversationId);
        fetch('https://serene-falls-66485.herokuapp.com/api/used') // GET used cars list
        .then(function (usedCarsResponse) {
          return usedCarsResponse.json();
        }).then(function (usedCarData) {
          console.log(usedCarData);
          usedCars = usedCarData;
          fetch('https://serene-falls-66485.herokuapp.com/api/new') // when used cars request is done, GET new cars list and init all values
          .then(function (newCarResponse) {
            return newCarResponse.json().then(function (newCarData) {
              console.log(newCarData);
              newCars = newCarData;
              fetch('https://serene-falls-66485.herokuapp.com/api/dealerships') // when used cars request is done, GET new cars list and init all values
              .then(function (dealershipsResponse) {
                return dealershipsResponse.json().then(function (dealerships) {
                  console.log(dealerships);
                  dealershipsData = dealerships;
                  dealershipsData.filtered.forEach(function (dName) {
                    dealershipNamesArr.push("".concat(dName.used_name_short, " - ").concat(dName.id));
                  }); // Push dealership name + id to a string array, server side will take only the id
                  // Typeahead settings

                  var substringMatcher = function substringMatcher(strs) {
                    return function findMatches(q, cb) {
                      var matches, substringRegex; // an array that will be populated with substring matches

                      matches = []; // regex used to determine if a string contains the substring `q`

                      substrRegex = new RegExp(q, 'i'); // iterate through the pool of strings and for any string that
                      // contains the substring `q`, add it to the `matches` array

                      $.each(strs, function (i, str) {
                        if (substrRegex.test(str)) {
                          matches.push(str);
                        }
                      });
                      cb(matches);
                    };
                  }; // Typeahead settings END


                  $('#typeahead-autocomplete .thead').typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                  }, {
                    name: 'Dealerships',
                    source: substringMatcher(dealershipNamesArr)
                  }); //Clear duplicate brands to show brand list without duplicates

                  var noDuplicates = clearDuplicateBrands(newCars);
                  showBrands(noDuplicates, brandName);
                  var noUsedDuplicates = clearDuplicateUsedBrands(usedCars);
                  showUsedBrands(noUsedDuplicates, usedBrandName);
                });
              });
            });
          });
        });
      } else {
        console.log("conversationId Loaded, is conversationId empty?:" + conversationId);

        try {
          fetch('https://serene-falls-66485.herokuapp.com/api/used') // GET used cars list
          .then(function (usedCarsResponse) {
            return usedCarsResponse.json();
          }).then(function (usedCarData) {
            console.log(usedCarData);
            usedCars = usedCarData;
            fetch('https://serene-falls-66485.herokuapp.com/api/new') // when used cars request is done, GET new cars list and init all values
            .then(function (newCarResponse) {
              return newCarResponse.json().then(function (newCarData) {
                console.log(newCarData);
                newCars = newCarData;
                fetch("https://serene-falls-66485.herokuapp.com/api/contextData/?convId=".concat(conversationId)).then(function (contextResponse) {
                  return contextResponse.json().then(function (contextData) {
                    console.log(contextData);
                    contextFull = contextData;
                    fetch('https://serene-falls-66485.herokuapp.com/api/dealerships') // when used cars request is done, GET new cars list and init all values
                    .then(function (dealershipsResponse) {
                      return dealershipsResponse.json().then(function (dealerships) {
                        console.log(dealerships);
                        dealershipsData = dealerships;
                        dealershipsData.filtered.forEach(function (dName) {
                          dealershipNamesArr.push("".concat(dName.used_name_short, " - ").concat(dName.id));
                        });

                        var substringMatcher = function substringMatcher(strs) {
                          return function findMatches(q, cb) {
                            var matches, substringRegex; // an array that will be populated with substring matches

                            matches = []; // regex used to determine if a string contains the substring `q`

                            substrRegex = new RegExp(q, 'i'); // iterate through the pool of strings and for any string that
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
                        }, {
                          name: 'Dealerships',
                          source: substringMatcher(dealershipNamesArr)
                        }); //Clear duplicate brands to show brand list without duplicates

                        var noDuplicates = clearDuplicateBrands(newCars);
                        showBrands(noDuplicates, brandName);
                        var noUsedDuplicates = clearDuplicateUsedBrands(usedCars);
                        showUsedBrands(noUsedDuplicates, usedBrandName);
                        console.log("Printing from inside the API Calls > ".concat(JSON.stringify(contextFull)));

                        if (contextFull.leadType) {
                          //Open the relevant category depending on values received, only if leadType is sales we will check if vehicleType is new or used, otherwise if leadType has a different value it will go to service. Also if it's new will also populate the purchaseType (ctype) with motability or business
                          if (contextFull.leadType == "sales" || contextFull.leadType == "motability" || contextFull.leadType == "business") {
                            if (contextFull.vehicleType && contextFull.vehicleType == "used") {
                              document.getElementById("used").click();

                              if (contextFull.make) {
                                document.getElementById('usedBrand').value = contextFull.make;
                                simulate_event('change', document.getElementById('usedBrand')); // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                              }

                              if (contextFull.model) {
                                document.getElementById('usedModel').value = contextFull.model;
                                simulate_event('change', document.getElementById('usedModel')); // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                              }

                              if (contextFull.vrn) {
                                document.getElementById('usedRegNumber').value = contextFull.vrn;
                              }

                              if (contextFull.valuation) {
                                document.getElementById('valuation').value = contextFull.valuation;
                              }
                            } else if (contextFull.vehicleType && contextFull.vehicleType == "new") {
                              document.getElementById("new").click();

                              if (contextFull.leadType == "motability") {
                                document.getElementById('purchaseType').value = 'Motability';
                              } else if (contextFull.leadType == "business") {
                                document.getElementById('purchaseType').value = 'Business';
                              }

                              if (contextFull.make) {
                                document.getElementById('brand').value = contextFull.make;
                                simulate_event('change', document.getElementById('brand')); // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                              }

                              if (contextFull.model) {
                                document.getElementById('model').value = contextFull.model;
                                simulate_event('change', document.getElementById('model')); // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                              }

                              if (contextFull.fuelType) {
                                document.getElementById('fuel').value = contextFull.fuelType;
                                simulate_event('change', document.getElementById('fuel')); // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                              }
                            }

                            if (contextFull.capId) {
                              document.getElementById('atidcapid').value = contextFull.capId;
                            }

                            if (contextFull.trim) {
                              document.getElementById('trim').value = contextFull.trim;
                            }

                            if (contextFull.description) {
                              document.getElementById('description').value = contextFull.description;
                            }

                            if (contextFull.value) {
                              document.getElementById('price').value = contextFull.value;
                            }
                          } else {
                            document.getElementById("service").click();

                            if (contextFull.make) {
                              document.getElementById('usedBrand').value = contextFull.make;
                              simulate_event('change', document.getElementById('usedBrand')); // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event
                            }

                            if (contextFull.model) {
                              document.getElementById('usedModel').value = contextFull.model;
                              simulate_event('change', document.getElementById('usedModel')); // in order to allow the model/fuel type to populate when automatically selected we must trigger the change event

                              if (contextFull.mileage) {
                                document.getElementById('mileage').value = contextFull.mileage;
                              }
                            }
                          }
                        } //LEAD


                        if (contextFull.locationName) {
                          $("#typeahead-autocomplete .thead").typeahead('val', contextFull.locationName);
                        }

                        if (contextFull.contactMethod) {
                          document.getElementById('channel').value = contextFull.contactMethod;
                        }

                        if (contextFull.enquirySource) {
                          document.getElementById('source').value = contextFull.enquirySource;
                        }

                        if (contextFull.channel) {
                          document.getElementById('channelSource').value = contextFull.channel;
                        }
                      });
                    });
                  });
                });
              });
            });
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

  var notificationHandler = function notificationHandler(data) {// Do something
  };

  var focusHandler = function focusHandler() {// Do something
  };

  var blurHandler = function blurHandler() {// Do something
  };

  lpTag.agentSDK.init({
    notificationCallback: notificationHandler,
    visitorFocusedCallback: focusHandler,
    visitorBlurredCallback: blurHandler
  });
  var pathToData = "chatInfo.rtSessionId";
  lpTag.agentSDK.get(pathToData, updateCallback, notifyWhenDone);
}

var updateCallback = function updateCallback(data) {
  // Do something with the returning data
  var path = data;
  conversationId = data; // called each time the value is updated.
  // If there's an existing value when bind is called - this callback
  // will be called with the existing value

  console.log(path);
  console.log("agentSDK Data Result: " + JSON.stringify(conversationId));
};

var notifyWhenDone = function notifyWhenDone(err) {
  if (err) {
    console.log(err);
  } // called when the bind is completed successfully,
  // or when the action terminated with an error.

}; // Returns objects only with the given brand


function filterBrand(carsArray, brand) {
  var filtered = carsArray.filter(function (car) {
    if (car.brand == brand) {
      return car.short_name;
    }
  });
  return filtered;
} // Returns objects only with the given used brand


function filterUsedBrand(carsArray, brand) {
  var filtered = carsArray.filter(function (car) {
    if (car.manufacturer == brand) {
      return car.model;
    }
  });
  return filtered;
} // Returns a single object with the given model


function filterModels(carsArray, model) {
  var filtered = carsArray.filter(function (car) {
    if (car.short_name == model) {
      return car.fuel_types;
    }
  });
  return filtered;
} //Clears selections for the dropdown depending on the input to the function


function clearSelections(clearOption) {
  if (clearOption == "model" || clearOption == "all") {
    // Remove all previous model options every time there is a change
    var modelOptions = document.getElementsByClassName('model selection');

    while (modelOptions[0]) {
      modelOptions[0].parentNode.removeChild(modelOptions[0]);
    }
  }

  if (clearOption == "fuel" || clearOption == "all") {
    // Remove all previous fuel options every time there is a change
    var fuelOptions = document.getElementsByClassName('fuel selection');

    while (fuelOptions[0]) {
      fuelOptions[0].parentNode.removeChild(fuelOptions[0]);
    }
  }
}

function radioCheck(value, isChecked) {
  // Reset form when radio button is selected and make sure to remember only the previous radio button selection
  var newChecked = document.getElementById("new").checked;
  var usedChecked = document.getElementById("used").checked;
  document.getElementById('carForm').reset();

  if (newChecked) {
    document.getElementById("new").checked = true;
  } else if (usedChecked) {
    document.getElementById("used").checked = true;
  } else {
    document.getElementById("service").checked = true;
  } // end of form reset form logic
  //New


  var brandName = document.querySelector("#brand");
  var modelName = document.querySelector("#model");
  var fuelType = document.querySelector("#fuel");
  var purchaseType = document.querySelector("#purchaseType"); //Used

  var usedBrandName = document.querySelector("#usedBrand");
  var usedModelName = document.querySelector("#usedModel");
  var usedRegNumber = document.querySelector("#usedRegNumber");
  var valuation = document.querySelector("#valuation"); //New+Used

  var atidcapid = document.querySelector("#atidcapid");
  var trim = document.querySelector("#trim");
  var description = document.querySelector("#description");
  var price = document.querySelector("#price"); //Service

  var customerRegNumber = document.querySelector("#customerRegNumber");
  var mileage = document.querySelector("#mileage");

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
  console.log("checking validity");
  var brandName = document.querySelector("#brand");
  var modelName = document.querySelector("#model");
  var fuelType = document.querySelector("#fuel");
  var usedBrandName = document.querySelector("#usedBrand");
  var usedModelName = document.querySelector("#usedModel");
  var isChecked = document.querySelector('input[name="carType"]:checked').value;
  console.log("The data:" + data);

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
} // Clears duplicate brands for the showBrands function


function clearDuplicateBrands(arr) {
  var filtered = arr.filter(function (arr, index, self) {
    return index === self.findIndex(function (t) {
      return t.brand === arr.brand;
    });
  });
  return filtered;
} // Clears duplicate used brands for the showBrands function


function clearDuplicateUsedBrands(arr) {
  var filtered = arr.filter(function (arr, index, self) {
    return index === self.findIndex(function (t) {
      return t.manufacturer === arr.manufacturer;
    });
  });
  return filtered;
} //Displays brand options in the drop down slection


function showBrands(cars, brandName) {
  var option;

  for (var i = 0; i < cars.length; i++) {
    option = document.createElement("option");
    option.text = cars[i].brand;
    brandName.add(option);
    option.setAttribute("class", "brand selection");
  }

  option = document.createElement("option");
  option.text = "other";
  brandName.add(option);
  option.setAttribute("class", "brand selection");
} //Displays brand options in the drop down slection


function showUsedBrands(cars, brandName) {
  var option;

  for (var i = 0; i < cars.length; i++) {
    option = document.createElement("option");
    option.text = cars[i].manufacturer;
    brandName.add(option);
    option.setAttribute("class", "brand selection");
  }

  option = document.createElement("option");
  option.text = "other";
  brandName.add(option);
  option.setAttribute("class", "brand selection");
} //Updates the dropdown list of models depending on the brand selection


function showModels(brand) {
  clearSelections("all"); // Clear previous data on every change

  var modelsForBrand = [];
  var option;
  var modelName = document.querySelector("#model"); // Get the full list and filter out only for the selected brand from the dropdown

  modelsForBrand = filterBrand(newCars, brand); //Update models for selected brand

  for (var i = 0; i < modelsForBrand.length; i++) {
    option = document.createElement("option");
    option.text = modelsForBrand[i].short_name;
    modelName.add(option);
    option.setAttribute("class", "model selection");
  }

  option = document.createElement("option");
  option.text = "other";
  modelName.add(option);
  option.setAttribute("class", "model selection");
} //Updates the dropdown list of used models depending on the brand selection


function showUsedModels(brand) {
  clearSelections("all"); // Clear previous data on every change

  var modelsForBrand = [];
  var option;
  var modelName = document.querySelector("#usedModel"); // Get the full list and filter out only for the selected brand from the dropdown

  modelsForBrand = filterUsedBrand(usedCars, brand);

  if (modelsForBrand) {
    //Update models for selected brand
    for (var i = 0; i < modelsForBrand.length; i++) {
      option = document.createElement("option");
      option.text = modelsForBrand[i].model;
      modelName.add(option);
      option.setAttribute("class", "model selection");
      option.setAttribute("title", "Current Stock: ".concat(modelsForBrand[i].count));
    }
  }

  option = document.createElement("option");
  option.text = "other";
  modelName.add(option);
  option.setAttribute("class", "model selection");
} //Updates the dropdown list of fuel types depending on the model selection


function showFuels(model) {
  clearSelections("fuel"); // Clear previous data on every change

  var fuelForModel = [];
  var option;
  var fuelType = document.querySelector("#fuel"); // Get the full list and filter out only for the selected model fuel types from the dropdown

  cars = newCars;
  fuelForModel = filterModels(cars, model); //console.log(fuelForModel[0].fuel_types + "  FUEL MODEL 1");
  //Update fuel types for selected brand

  if (fuelForModel[0]) {
    for (var i = 0; i < fuelForModel[0].fuel_types.length; i++) {
      option = document.createElement("option");
      console.log(fuelForModel[0].fuel_types[i]);
      option.text = fuelForModel[0].fuel_types[i];
      fuelType.add(option);
      option.setAttribute("class", "fuel selection");
    }
  }

  option = document.createElement("option");
  option.text = "other";
  fuelType.add(option);
  option.setAttribute("class", "fuel selection");
}

function collectFormData() {
  var formResult = Object.fromEntries(new FormData(document.querySelector('form')).entries());
  console.log(JSON.stringify(formResult));
} // In order to allow depending options in the vehicle model/fuel type to populate when automatically populated


function simulate_event(eventName, element) {
  var event;

  if (document.createEvent) {
    event = document.createEvent("HTMLEvents");
    event.initEvent(eventName, true, true);
  } else {
    event = document.createEventObject();
    event.eventType = eventName;
  }

  ;
  event.eventName = eventName;

  if (document.createEvent) {
    element.dispatchEvent(event);
  } else {
    element.fireEvent("on" + event.eventName, event);
  }
}

;
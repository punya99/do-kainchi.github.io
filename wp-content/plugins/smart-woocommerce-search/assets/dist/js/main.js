! function(e) {
    "use strict";
    e(function() {
        function t(t, n) {
            var i = e(t).find('input[type="search"]').length ? e(t).find('input[type="search"]') : e(t).find('input[type="text"]'),
                s = "FORM" === t.tagName || "form" === t.tagName ? e(t) : e(t).find("form");
            if (i.length) {
                e(t).addClass("ysm-active");
                var o = {
                        id: "",
                        serviceUrl: ysm_L10n.restUrl,
                        layout: "",
                        maxHeight: 600,
                        minChars: 3,
                        loaderIcon: ysm_L10n.loader_icon
                    },
                    r = e.extend({}, o, n);
                e('<div class="smart-search-results"></div>').appendTo(s);
                var l = s.find(".smart-search-results").css({
                    maxHeight: r.maxHeight + "px",
                    width: i.outerWidth() + "px"
                }); - 1 !== navigator.userAgent.indexOf("Windows") && -1 !== navigator.userAgent.indexOf("Firefox") && l.addClass("smart-search-firefox"), s.on("submit", function(t) {
                    var n = i.val();
                    if ("" === n || n.length < r.minChars) return !1;
                    var s = e(this).attr("action");
                    n = n.replace(/\+/g, "%2b"), n = n.replace(/\s/g, "+"), s += -1 !== s.indexOf("?") ? "&" : "?", s += "s=" + n + "&search_id=" + r.id, "product" === r.layout && (s += "&post_type=product"), t.preventDefault(), location.href = s
                }), e(window).on("resize", function() {
                    var e = i.outerWidth() + "px";
                    l.css({
                        width: e
                    }).find(".smart-search-suggestions").css({
                        width: e
                    })
                }), i.devbridgeAutocomplete({
                    minChars: r.minChars,
                    appendTo: l,
                    serviceUrl: r.serviceUrl,
                    maxHeight: r.maxHeight,
                    dataType: "json",
                    deferRequestBy: 100,
                    noCache: !1,
                    containerClass: "smart-search-suggestions",
                    triggerSelectOnValidInput: !1,
                    showNoSuggestionNotice: !!r.no_results_text.length,
                    noSuggestionNotice: r.no_results_text,
                    formatResult: function(e, t) {
                        return e.data
                    },
                    onSearchStart: function(t) {
                        if (-1 !== this.value.indexOf("  ") && (this.value = this.value.replace(/\s+/g, " ")), e.trim(this.value) !== this.value) return !1;
                        t.query = encodeURIComponent(t.query), t.query = t.query.replace(/%20/g, " "), i.css({
                            "background-image": "url(" + r.loaderIcon + ")",
                            "background-repeat": "no-repeat",
                            "background-position": "50% 50%"
                        })
                    },
                    onSelect: function(e) {
                        -1 != e.id && (window.location.href = e.url)
                    },
                    transformResult: function(t) {
                        var n = "string" == typeof t ? e.parseJSON(t) : t;
                        i.val();
                        return n && n.view_all_link && "" != n.view_all_link && (l.find(".smart-search-view-all-holder").length || l.addClass("has-viewall-button").append('<div class="smart-search-view-all-holder"></div>'), l.find(".smart-search-view-all-holder").html(n.view_all_link)), n
                    },
                    onSearchComplete: function(t, n) {
                        i.css("background-image", "none"), n.length > 0 ? (l.parents(".ysm-active").removeClass("ysm-hide"), setTimeout(function() {
                            var n = l.find(".smart-search-suggestions"),
                                s = parseInt(l.css("max-height"), 10),
                                o = n[0],
                                a = e(o).find(".autocomplete-suggestion"),
                                c = 0,
                                u = l.find(".smart-search-view-all-holder");
                            if (a.length && (a.each(function() {
                                    c += this.scrollHeight + parseInt(e(this).css("borderBottomWidth"), 10)
                                }), c += parseInt(e(o).css("borderTopWidth"), 10), c += parseInt(e(o).css("borderBottomWidth"), 10)), 0 == l.outerWidth() && l.width(i.outerWidth() + "px"), l.nanoScroller({
                                    contentClass: "smart-search-suggestions",
                                    alwaysVisible: !1,
                                    iOSNativeScrolling: !0
                                }), l.height(c > s ? s : c), e(o).height("auto"), u.length)
                                if (i.val().length < r.minChars) u.hide();
                                else {
                                    var h, d = r.serviceUrl,
                                        p = i.devbridgeAutocomplete();
                                    e.isFunction(d) && (d = d.call(p.element, t)), h = d + "?" + e.param({
                                        query: t
                                    }), p.cachedResponse && p.cachedResponse[h] && u.html(p.cachedResponse[h].view_all_link), u.show()
                                }
                        }, 50)) : r.no_results_text.length ? (l.css({
                            maxHeight: "auto",
                            height: 42
                        }).nanoScroller({
                            contentClass: "smart-search-suggestions",
                            stop: !0
                        }), l.find(".smart-search-suggestions").height(40), l.find(".smart-search-view-all-holder").hide()) : (l.find(".smart-search-suggestions").height(0), l.find(".smart-search-view-all-holder").hide())
                    },
                    onSearchError: function(e, t, n, i) {
                        l.css({
                            maxHeight: "auto",
                            height: 0
                        }).nanoScroller({
                            contentClass: "smart-search-suggestions",
                            stop: !0
                        }), l.find(".smart-search-view-all-holder").hide()
                    },
                    onInvalidateSelection: function() {},
                    onHide: function() {
                        l.css({
                            maxHeight: "auto",
                            height: 0
                        }).nanoScroller({
                            contentClass: "smart-search-suggestions",
                            stop: !0
                        }), l.find(".smart-search-view-all-holder").hide()
                    }
                }).on("focus", function() {
                    i.devbridgeAutocomplete().onValueChange()
                }), e(window).on("touchstart", function(t) {
                    var n = e(t.target).hasClass("ysm-active") ? e(t.target) : e(t.target).parents(".ysm-active");
                    n.length ? n.removeClass("ysm-hide") : e(".ysm-active").addClass("ysm-hide")
                })
            }
        }
        1 == ysm_L10n.enable_search && e(".widget_search").each(function() {
            t(this, {
                id: "default",
                serviceUrl: ysm_L10n.restUrl + "id=default",
                layout: ysm_L10n.layout,
                maxHeight: 400,
                minChars: ysm_L10n.char_count,
                no_results_text: ysm_L10n.no_results_text
            })
        }), 1 == ysm_L10n.enable_product_search && e(".woocommerce.widget_product_search").each(function() {
            t(this, {
                id: "product",
                serviceUrl: ysm_L10n.restUrl + "id=product",
                layout: "product",
                maxHeight: 400,
                minChars: ysm_L10n.product_char_count,
                no_results_text: ysm_L10n.product_no_results_text
            })
        }), ysm_L10n.enable_avada_search && 1 == ysm_L10n.enable_avada_search && e(".fusion-search-form").each(function() {
            t(this, {
                id: "avada",
                serviceUrl: ysm_L10n.restUrl + "id=avada",
                layout: ysm_L10n.avada_layout,
                maxHeight: ysm_L10n.avada_popup_height,
                minChars: ysm_L10n.avada_char_count,
                no_results_text: ysm_L10n.avada_no_results_text,
                loaderIcon: ysm_L10n.avada_loader_icon,
                preventBadQueries: ysm_L10n.avada_prevent_bad_queries
            })
        });
        var n = e(".ysm-search-widget");
        n.length && n.each(function() {
            var n = e(this).find("form").data("id");
            t(this, {
                id: n,
                serviceUrl: ysm_L10n.restUrl + "id=" + encodeURIComponent(n),
                layout: ysm_L10n["custom_" + n + "_layout"],
                maxHeight: 400,
                minChars: ysm_L10n["custom_" + n + "_char_count"],
                no_results_text: ysm_L10n["custom_" + n + "_no_results_text"]
            })
        })
    })
}(jQuery),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports && "function" == typeof require ? require("jquery") : jQuery)
}(function(e) {
    "use strict";

    function t(n, i) {
        var s = function() {},
            o = this,
            r = {
                ajaxSettings: {},
                autoSelectFirst: !1,
                appendTo: document.body,
                serviceUrl: null,
                lookup: null,
                onSelect: null,
                width: "auto",
                minChars: 1,
                maxHeight: 300,
                deferRequestBy: 0,
                params: {},
                formatResult: t.formatResult,
                delimiter: null,
                zIndex: 9999,
                type: "GET",
                noCache: !1,
                onSearchStart: s,
                onSearchComplete: s,
                onSearchError: s,
                preserveInput: !1,
                containerClass: "autocomplete-suggestions",
                tabDisabled: !1,
                dataType: "text",
                currentRequest: null,
                triggerSelectOnValidInput: !0,
                preventBadQueries: !0,
                lookupFilter: function(e, t, n) {
                    return -1 !== e.value.toLowerCase().indexOf(n)
                },
                paramName: "query",
                transformResult: function(t) {
                    return "string" == typeof t ? e.parseJSON(t) : t
                },
                showNoSuggestionNotice: !1,
                noSuggestionNotice: "No results",
                orientation: "bottom",
                forceFixPosition: !1
            };
        o.element = n, o.el = e(n), o.suggestions = [], o.badQueries = [], o.selectedIndex = -1, o.currentValue = o.element.value, o.intervalId = 0, o.cachedResponse = {}, o.onChangeInterval = null, o.onChange = null, o.isLocal = !1, o.suggestionsContainer = null, o.noSuggestionsContainer = null, o.options = e.extend({}, r, i), o.classes = {
            selected: "autocomplete-selected",
            suggestion: "autocomplete-suggestion"
        }, o.hint = null, o.hintValue = "", o.selection = null, o.initialize(), o.setOptions(i)
    }
    var n = function() {
            return {
                escapeRegExChars: function(e) {
                    return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                },
                createNode: function(e) {
                    var t = document.createElement("div");
                    return t.className = e, t.style.position = "absolute", t.style.display = "none", t
                }
            }
        }(),
        i = {
            ESC: 27,
            TAB: 9,
            RETURN: 13,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        };
    t.utils = n, e.Autocomplete = t, t.formatResult = function(e, t) {
        var i = "(" + n.escapeRegExChars(t) + ")";
        return e.value.replace(new RegExp(i, "gi"), "<strong>$1</strong>").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/&lt;(\/?strong)&gt;/g, "<$1>")
    }, t.prototype = {
        killerFn: null,
        initialize: function() {
            var n, i = this,
                s = "." + i.classes.suggestion,
                o = i.classes.selected,
                r = i.options;
            i.element.setAttribute("autocomplete", "off"), i.killerFn = function(t) {
                0 === e(t.target).closest(r.appendTo).length && (i.killSuggestions(), i.disableKillerFn())
            }, i.noSuggestionsContainer = e('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0), i.suggestionsContainer = t.utils.createNode(r.containerClass), n = e(i.suggestionsContainer), n.appendTo(r.appendTo), "auto" !== r.width && n.width(r.width), n.on("mouseover.autocomplete", s, function() {
                i.activate(e(this).data("index"))
            }), n.on("mouseout.autocomplete", function() {
                i.selectedIndex = -1, n.children("." + o).removeClass(o)
            }), n.on("click.autocomplete", s, function(t) {
                i.select(e(this).data("index"), t)
            }), i.fixPositionCapture = function() {
                i.visible && i.fixPosition()
            }, e(window).on("resize.autocomplete", i.fixPositionCapture), i.el.on("keydown.autocomplete", function(e) {
                i.onKeyPress(e)
            }), i.el.on("keyup.autocomplete", function(e) {
                i.onKeyUp(e)
            }), i.el.on("blur.autocomplete", function() {
                i.onBlur()
            }), i.el.on("focus.autocomplete", function() {
                i.onFocus()
            }), i.el.on("change.autocomplete", function(e) {
                i.onKeyUp(e)
            }), i.el.on("input.autocomplete", function(e) {
                i.onKeyUp(e)
            })
        },
        onFocus: function() {
            var e = this;
            e.fixPosition(), 0 === e.options.minChars && 0 === e.el.val().length && e.onValueChange()
        },
        onBlur: function() {
            this.enableKillerFn()
        },
        abortAjax: function() {
            var e = this;
            e.currentRequest && (e.currentRequest.abort(), e.currentRequest = null)
        },
        setOptions: function(t) {
            var n = this,
                i = n.options;
            e.extend(i, t), n.isLocal = e.isArray(i.lookup), n.isLocal && (i.lookup = n.verifySuggestionsFormat(i.lookup)), i.orientation = n.validateOrientation(i.orientation, "bottom"), e(n.suggestionsContainer).css({
                "max-height": i.maxHeight + "px",
                width: i.width + "px",
                "z-index": i.zIndex
            })
        },
        clearCache: function() {
            this.cachedResponse = {}, this.badQueries = []
        },
        clear: function() {
            this.clearCache(), this.currentValue = "", this.suggestions = []
        },
        disable: function() {
            var e = this;
            e.disabled = !0, clearInterval(e.onChangeInterval), e.abortAjax()
        },
        enable: function() {
            this.disabled = !1
        },
        fixPosition: function() {
            var t = this,
                n = e(t.suggestionsContainer),
                i = n.parent().get(0);
            if (i === document.body || t.options.forceFixPosition) {
                var s = t.options.orientation,
                    o = n.outerHeight(),
                    r = t.el.outerHeight(),
                    l = t.el.offset(),
                    a = {
                        top: l.top,
                        left: l.left
                    };
                if ("auto" === s) {
                    var c = e(window).height(),
                        u = e(window).scrollTop(),
                        h = -u + l.top - o,
                        d = u + c - (l.top + r + o);
                    s = Math.max(h, d) === h ? "top" : "bottom"
                }
                if (a.top += "top" === s ? -o : r, i !== document.body) {
                    var p, g = n.css("opacity");
                    t.visible || n.css("opacity", 0).show(), p = n.offsetParent().offset(), a.top -= p.top, a.left -= p.left, t.visible || n.css("opacity", g).hide()
                }
                "auto" === t.options.width && (a.width = t.el.outerWidth() - 2 + "px"), n.css(a)
            }
        },
        enableKillerFn: function() {
            var t = this;
            e(document).on("click.autocomplete", t.killerFn)
        },
        disableKillerFn: function() {
            var t = this;
            e(document).off("click.autocomplete", t.killerFn)
        },
        killSuggestions: function() {
            var e = this;
            e.stopKillSuggestions(), e.intervalId = window.setInterval(function() {
                e.visible && (e.el.val(e.currentValue), e.hide()), e.stopKillSuggestions()
            }, 50)
        },
        stopKillSuggestions: function() {
            window.clearInterval(this.intervalId)
        },
        isCursorAtEnd: function() {
            var e, t = this,
                n = t.el.val().length,
                i = t.element.selectionStart;
            return "number" == typeof i ? i === n : !document.selection || (e = document.selection.createRange(), e.moveStart("character", -n), n === e.text.length)
        },
        onKeyPress: function(e) {
            var t = this;
            if (!t.disabled && !t.visible && e.which === i.DOWN && t.currentValue) return void t.suggest();
            if (!t.disabled && t.visible) {
                switch (e.which) {
                    case i.ESC:
                        t.el.val(t.currentValue), t.hide();
                        break;
                    case i.RIGHT:
                        if (t.hint && t.options.onHint && t.isCursorAtEnd()) {
                            t.selectHint();
                            break
                        }
                        return;
                    case i.TAB:
                        if (t.hint && t.options.onHint) return void t.selectHint();
                        if (-1 === t.selectedIndex) return void t.hide();
                        if (t.select(t.selectedIndex), !1 === t.options.tabDisabled) return;
                        break;
                    case i.RETURN:
                        if (-1 === t.selectedIndex) return void t.hide();
                        t.select(t.selectedIndex);
                        break;
                    case i.UP:
                        t.moveUp();
                        break;
                    case i.DOWN:
                        t.moveDown();
                        break;
                    default:
                        return
                }
                e.stopImmediatePropagation(), e.preventDefault()
            }
        },
        onKeyUp: function(e) {
            var t = this;
            if (!t.disabled) {
                switch (e.which) {
                    case i.UP:
                    case i.DOWN:
                        return
                }
                clearInterval(t.onChangeInterval), t.currentValue !== t.el.val() && (t.findBestHint(), t.options.deferRequestBy > 0 ? t.onChangeInterval = setInterval(function() {
                    t.onValueChange()
                }, t.options.deferRequestBy) : t.onValueChange())
            }
        },
        onValueChange: function() {
            var t = this,
                n = t.options,
                i = t.el.val(),
                s = t.getQuery(i);
            if (t.selection && t.currentValue !== s && (t.selection = null, (n.onInvalidateSelection || e.noop).call(t.element)), clearInterval(t.onChangeInterval), t.currentValue = i, t.selectedIndex = -1, n.triggerSelectOnValidInput && t.isExactMatch(s)) return void t.select(0);
            s.length < n.minChars ? t.hide() : t.getSuggestions(s)
        },
        isExactMatch: function(e) {
            var t = this.suggestions;
            return 1 === t.length && t[0].value.toLowerCase() === e.toLowerCase()
        },
        getQuery: function(t) {
            var n, i = this.options.delimiter;
            return i ? (n = t.split(i), e.trim(n[n.length - 1])) : t
        },
        getSuggestionsLocal: function(t) {
            var n, i = this,
                s = i.options,
                o = t.toLowerCase(),
                r = s.lookupFilter,
                l = parseInt(s.lookupLimit, 10);
            return n = {
                suggestions: e.grep(s.lookup, function(e) {
                    return r(e, t, o)
                })
            }, l && n.suggestions.length > l && (n.suggestions = n.suggestions.slice(0, l)), n
        },
        getSuggestions: function(t) {
            var n, i, s, o, r = this,
                l = r.options,
                a = l.serviceUrl;
            if (l.params[l.paramName] = t, i = l.ignoreParams ? null : l.params, !1 !== l.onSearchStart.call(r.element, l.params)) {
                if (e.isFunction(l.lookup)) return void l.lookup(t, function(e) {
                    r.suggestions = e.suggestions, r.suggest(), l.onSearchComplete.call(r.element, t, e.suggestions)
                });
                r.isLocal ? n = r.getSuggestionsLocal(t) : (e.isFunction(a) && (a = a.call(r.element, t)), s = a + "?" + e.param(i || {}), n = r.cachedResponse[s]), n && e.isArray(n.suggestions) ? (r.suggestions = n.suggestions, r.suggest(), l.onSearchComplete.call(r.element, t, n.suggestions)) : r.isBadQuery(t) ? l.onSearchComplete.call(r.element, t, []) : (r.abortAjax(), o = {
                    url: a,
                    data: i,
                    type: l.type,
                    dataType: l.dataType
                }, e.extend(o, l.ajaxSettings), r.currentRequest = e.ajax(o).done(function(e) {
                    var n;
                    r.currentRequest = null, n = l.transformResult(e, t), r.processResponse(n, t, s), l.onSearchComplete.call(r.element, t, n.suggestions)
                }).fail(function(e, n, i) {
                    l.onSearchError.call(r.element, t, e, n, i)
                }))
            }
        },
        isBadQuery: function(e) {
            if (!this.options.preventBadQueries) return !1;
            for (var t = this.badQueries, n = t.length; n--;)
                if (0 === e.indexOf(t[n])) return !0;
            return !1
        },
        hide: function() {
            var t = this,
                n = e(t.suggestionsContainer);
            e.isFunction(t.options.onHide) && t.visible && t.options.onHide.call(t.element, n), t.visible = !1, t.selectedIndex = -1, clearInterval(t.onChangeInterval), e(t.suggestionsContainer).hide(), t.signalHint(null)
        },
        suggest: function() {
            if (0 === this.suggestions.length) return void(this.options.showNoSuggestionNotice ? this.noSuggestions() : this.hide());
            var t, n = this,
                i = n.options,
                s = i.groupBy,
                o = i.formatResult,
                r = n.getQuery(n.currentValue),
                l = n.classes.suggestion,
                a = n.classes.selected,
                c = e(n.suggestionsContainer),
                u = e(n.noSuggestionsContainer),
                h = i.beforeRender,
                d = "",
                p = function(e, n) {
                    var i = e.data[s];
                    return t === i ? "" : '<div class="autocomplete-group"><strong>' + (t = i) + "</strong></div>"
                };
            if (i.triggerSelectOnValidInput && n.isExactMatch(r)) return void n.select(0);
            e.each(n.suggestions, function(e, t) {
                s && (d += p(t, 0)), d += '<div class="' + l + '" data-index="' + e + '">' + o(t, r) + "</div>"
            }), this.adjustContainerWidth(), u.detach(), c.html(d), e.isFunction(h) && h.call(n.element, c), n.fixPosition(), c.show(), i.autoSelectFirst && (n.selectedIndex = 0, c.scrollTop(0), c.children("." + l).first().addClass(a)), n.visible = !0, n.findBestHint()
        },
        noSuggestions: function() {
            var t = this,
                n = e(t.suggestionsContainer),
                i = e(t.noSuggestionsContainer);
            this.adjustContainerWidth(), i.detach(), n.empty(), n.append(i), t.fixPosition(), n.show(), t.visible = !0
        },
        adjustContainerWidth: function() {
            var t, n = this,
                i = n.options,
                s = e(n.suggestionsContainer);
            "auto" === i.width && (t = n.el.outerWidth() - 2, s.width(t > 0 ? t : 300))
        },
        findBestHint: function() {
            var t = this,
                n = t.el.val().toLowerCase(),
                i = null;
            n && (e.each(t.suggestions, function(e, t) {
                var s = 0 === t.value.toLowerCase().indexOf(n);
                return s && (i = t), !s
            }), t.signalHint(i))
        },
        signalHint: function(t) {
            var n = "",
                i = this;
            t && (n = i.currentValue + t.value.substr(i.currentValue.length)), i.hintValue !== n && (i.hintValue = n, i.hint = t, (this.options.onHint || e.noop)(n))
        },
        verifySuggestionsFormat: function(t) {
            return t.length && "string" == typeof t[0] ? e.map(t, function(e) {
                return {
                    value: e,
                    data: null
                }
            }) : t
        },
        validateOrientation: function(t, n) {
            return t = e.trim(t || "").toLowerCase(), -1 === e.inArray(t, ["auto", "bottom", "top"]) && (t = n), t
        },
        processResponse: function(e, t, n) {
            var i = this,
                s = i.options;
            e.suggestions = i.verifySuggestionsFormat(e.suggestions), s.noCache || (i.cachedResponse[n] = e, s.preventBadQueries && 0 === e.suggestions.length && i.badQueries.push(t)), t === i.getQuery(i.currentValue) && (i.suggestions = e.suggestions, i.suggest())
        },
        activate: function(t) {
            var n, i = this,
                s = i.classes.selected,
                o = e(i.suggestionsContainer),
                r = o.find("." + i.classes.suggestion);
            return o.find("." + s).removeClass(s), i.selectedIndex = t, -1 !== i.selectedIndex && r.length > i.selectedIndex ? (n = r.get(i.selectedIndex), e(n).addClass(s), n) : null
        },
        selectHint: function() {
            var t = this,
                n = e.inArray(t.hint, t.suggestions);
            t.select(n)
        },
        select: function(t, n) {
            var i = this;
            e(n.target).hasClass("smart-search-add_to_cart") || (i.hide(), i.onSelect(t))
        },
        moveUp: function() {
            var t = this;
            if (-1 !== t.selectedIndex) return 0 === t.selectedIndex ? (e(t.suggestionsContainer).children().first().removeClass(t.classes.selected), t.selectedIndex = -1, t.el.val(t.currentValue), void t.findBestHint()) : void t.adjustScroll(t.selectedIndex - 1)
        },
        moveDown: function() {
            var e = this;
            e.selectedIndex !== e.suggestions.length - 1 && e.adjustScroll(e.selectedIndex + 1)
        },
        adjustScroll: function(t) {
            var n = this,
                i = n.activate(t);
            if (i) {
                var s, o, r, l = e(i).outerHeight();
                s = i.offsetTop, o = e(n.suggestionsContainer).scrollTop(), r = o + n.options.maxHeight - l, s < o ? e(n.suggestionsContainer).scrollTop(s) : s > r && e(n.suggestionsContainer).scrollTop(s - n.options.maxHeight + l), n.options.preserveInput || n.el.val(n.getValue(n.suggestions[t].value)), n.signalHint(null)
            }
        },
        onSelect: function(t) {
            var n = this,
                i = n.options.onSelect,
                s = n.suggestions[t];
            n.currentValue = n.getValue(s.value), n.currentValue === n.el.val() || n.options.preserveInput || n.el.val(n.currentValue), n.signalHint(null), n.suggestions = [], n.selection = s, e.isFunction(i) && i.call(n.element, s)
        },
        getValue: function(e) {
            var t, n, i = this,
                s = i.options.delimiter;
            return s ? (t = i.currentValue, n = t.split(s), 1 === n.length ? e : t.substr(0, t.length - n[n.length - 1].length) + e) : e
        },
        dispose: function() {
            var t = this;
            t.el.off(".autocomplete").removeData("autocomplete"), t.disableKillerFn(), e(window).off("resize.autocomplete", t.fixPositionCapture), e(t.suggestionsContainer).remove()
        }
    }, e.fn.autocomplete = e.fn.devbridgeAutocomplete = function(n, i) {
        return 0 === arguments.length ? this.first().data("autocomplete") : this.each(function() {
            var s = e(this),
                o = s.data("autocomplete");
            "string" == typeof n ? o && "function" == typeof o[n] && o[n](i) : (o && o.dispose && o.dispose(), o = new t(this, n), s.data("autocomplete", o))
        })
    }
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], function(t) {
        return e(t, window, document)
    }) : "object" == typeof exports ? module.exports = e(require("jquery"), window, document) : e(jQuery, window, document)
}(function(e, t, n) {
    "use strict";
    var i, s, o, r, l, a, c, u, h, d, p, g, f, v, m, y, S, x, C, b, w, _, T, H, I, R, O, $;
    b = {
        paneClass: "nano-pane",
        sliderClass: "nano-slider",
        contentClass: "nano-content",
        enabledClass: "has-scrollbar",
        flashedClass: "flashed",
        activeClass: "active",
        iOSNativeScrolling: !1,
        preventPageScrolling: !1,
        disableResize: !1,
        alwaysVisible: !1,
        flashDelay: 1500,
        sliderMinHeight: 20,
        sliderMaxHeight: null,
        documentContext: null,
        windowContext: null
    }, m = "scroll", c = "mousedown", u = "mouseenter", h = "mousemove", p = "mousewheel", d = "mouseup", v = "resize", l = "drag", a = "enter", S = "up", f = "panedown", o = "DOMMouseScroll", r = "down", x = "wheel", y = "touchmove", i = "Microsoft Internet Explorer" === t.navigator.appName && /msie 7./i.test(t.navigator.appVersion) && t.ActiveXObject, s = null, H = t.requestAnimationFrame, C = t.cancelAnimationFrame, R = n.createElement("div").style, $ = function() {
        var e, t, n, i;
        for (t = ["t", "webkitT", "MozT", "msT", "OT"], e = n = 0, i = t.length; n < i; e = ++n)
            if (t[e], t[e] + "ransform" in R) return t[e].substr(0, t[e].length - 1);
        return !1
    }(), O = function(e) {
        return !1 !== $ && ("" === $ ? e : $ + e.charAt(0).toUpperCase() + e.substr(1))
    }, I = O("transform"), _ = !1 !== I, w = function() {
        var e, t, i;
        return e = n.createElement("div"), t = e.style, t.position = "absolute", t.width = "100px", t.height = "100px", t.overflow = m, t.top = "-9999px", n.body.appendChild(e), i = e.offsetWidth - e.clientWidth, n.body.removeChild(e), i
    }, T = function() {
        var e, n, i;
        return n = t.navigator.userAgent, !!(e = /(?=.+Mac OS X)(?=.+Firefox)/.test(n)) && (i = /Firefox\/\d{2}\./.exec(n), i && (i = i[0].replace(/\D+/g, "")), e && +i > 23)
    }, g = function() {
        function g(i, o) {
            this.el = i, this.options = o, s || (s = w()), this.$el = e(this.el), this.doc = e(this.options.documentContext || n), this.win = e(this.options.windowContext || t), this.body = this.doc.find("body"), this.$content = this.$el.children("." + this.options.contentClass), this.$content.attr("tabindex", this.options.tabIndex || 0), this.content = this.$content[0], this.previousPosition = 0, this.options.iOSNativeScrolling && null != this.el.style.WebkitOverflowScrolling ? this.nativeScrolling() : this.generate(), this.createEvents(), this.addEvents(), this.reset()
        }
        return g.prototype.preventScrolling = function(e, t) {
            if (this.isActive)
                if (e.type === o)(t === r && e.originalEvent.detail > 0 || t === S && e.originalEvent.detail < 0) && e.preventDefault();
                else if (e.type === p) {
                if (!e.originalEvent || !e.originalEvent.wheelDelta) return;
                (t === r && e.originalEvent.wheelDelta < 0 || t === S && e.originalEvent.wheelDelta > 0) && e.preventDefault()
            }
        }, g.prototype.nativeScrolling = function() {
            this.$content.css({
                WebkitOverflowScrolling: "touch"
            }), this.iOSNativeScrolling = !0, this.isActive = !0
        }, g.prototype.updateScrollValues = function() {
            var e, t;
            e = this.content, this.maxScrollTop = e.scrollHeight - e.clientHeight, this.prevScrollTop = this.contentScrollTop || 0, this.contentScrollTop = e.scrollTop, t = this.contentScrollTop > this.previousPosition ? "down" : this.contentScrollTop < this.previousPosition ? "up" : "same", this.previousPosition = this.contentScrollTop, "same" !== t && this.$el.trigger("update", {
                position: this.contentScrollTop,
                maximum: this.maxScrollTop,
                direction: t
            }), this.iOSNativeScrolling || (this.maxSliderTop = this.paneHeight - this.sliderHeight, this.sliderTop = 0 === this.maxScrollTop ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop)
        }, g.prototype.setOnScrollStyles = function() {
            var e;
            _ ? (e = {}, e[I] = "translate(0, " + this.sliderTop + "px)") : e = {
                top: this.sliderTop
            }, H ? (C && this.scrollRAF && C(this.scrollRAF), this.scrollRAF = H(function(t) {
                return function() {
                    return t.scrollRAF = null, t.slider.css(e)
                }
            }(this))) : this.slider.css(e)
        }, g.prototype.createEvents = function() {
            this.events = {
                down: function(e) {
                    return function(t) {
                        return e.isBeingDragged = !0, e.offsetY = t.pageY - e.slider.offset().top, e.slider.is(t.target) || (e.offsetY = 0), e.pane.addClass(e.options.activeClass), e.doc.bind(h, e.events[l]).bind(d, e.events[S]), e.body.bind(u, e.events[a]), !1
                    }
                }(this),
                drag: function(e) {
                    return function(t) {
                        return e.sliderY = t.pageY - e.$el.offset().top - e.paneTop - (e.offsetY || .5 * e.sliderHeight), e.scroll(), e.contentScrollTop >= e.maxScrollTop && e.prevScrollTop !== e.maxScrollTop ? e.$el.trigger("scrollend") : 0 === e.contentScrollTop && 0 !== e.prevScrollTop && e.$el.trigger("scrolltop"), !1
                    }
                }(this),
                up: function(e) {
                    return function(t) {
                        return e.isBeingDragged = !1, e.pane.removeClass(e.options.activeClass), e.doc.unbind(h, e.events[l]).unbind(d, e.events[S]), e.body.unbind(u, e.events[a]), !1
                    }
                }(this),
                resize: function(e) {
                    return function(t) {
                        e.reset()
                    }
                }(this),
                panedown: function(e) {
                    return function(t) {
                        return e.sliderY = (t.offsetY || t.originalEvent.layerY) - .5 * e.sliderHeight, e.scroll(), e.events.down(t), !1
                    }
                }(this),
                scroll: function(e) {
                    return function(t) {
                        e.updateScrollValues(), e.isBeingDragged || (e.iOSNativeScrolling || (e.sliderY = e.sliderTop, e.setOnScrollStyles()), null != t && (e.contentScrollTop >= e.maxScrollTop ? (e.options.preventPageScrolling && e.preventScrolling(t, r), e.prevScrollTop !== e.maxScrollTop && e.$el.trigger("scrollend")) : 0 === e.contentScrollTop && (e.options.preventPageScrolling && e.preventScrolling(t, S), 0 !== e.prevScrollTop && e.$el.trigger("scrolltop"))))
                    }
                }(this),
                wheel: function(e) {
                    return function(t) {
                        var n;
                        if (null != t) return n = t.delta || t.wheelDelta || t.originalEvent && t.originalEvent.wheelDelta || -t.detail || t.originalEvent && -t.originalEvent.detail, n && (e.sliderY += -n / 3), e.scroll(), !1
                    }
                }(this),
                enter: function(e) {
                    return function(t) {
                        var n;
                        if (e.isBeingDragged) return 1 !== (t.buttons || t.which) ? (n = e.events)[S].apply(n, arguments) : void 0
                    }
                }(this)
            }
        }, g.prototype.addEvents = function() {
            var e;
            this.removeEvents(), e = this.events, this.options.disableResize || this.win.bind(v, e[v]), this.iOSNativeScrolling || (this.slider.bind(c, e[r]), this.pane.bind(c, e[f]).bind(p + " " + o, e[x])), this.$content.bind(m + " " + p + " " + o + " " + y, e[m])
        }, g.prototype.removeEvents = function() {
            var e;
            e = this.events, this.win.unbind(v, e[v]), this.iOSNativeScrolling || (this.slider.unbind(), this.pane.unbind()), this.$content.unbind(m + " " + p + " " + o + " " + y, e[m])
        }, g.prototype.generate = function() {
            var e, n, i, o, r, l;
            return i = this.options, r = i.paneClass, l = i.sliderClass, i.contentClass, (o = this.$el.children("." + r)).length || o.children("." + l).length || this.$el.append('<div class="' + r + '"><div class="' + l + '" /></div>'), this.pane = this.$el.children("." + r), this.slider = this.pane.find("." + l), 0 === s && T() ? (n = t.getComputedStyle(this.content, null).getPropertyValue("padding-right").replace(/[^0-9.]+/g, ""), e = {
                right: -14,
                paddingRight: +n + 14
            }) : s && (e = {
                right: -s
            }, this.$el.addClass(i.enabledClass)), null != e && this.$content.css(e), this
        }, g.prototype.restore = function() {
            this.stopped = !1, this.iOSNativeScrolling || this.pane.show(), this.addEvents()
        }, g.prototype.reset = function() {
            var e, t, n, o, r, l, a, c, u, h, d, p;
            return this.iOSNativeScrolling ? void(this.contentHeight = this.content.scrollHeight) : (this.$el.find("." + this.options.paneClass).length || this.generate().stop(), this.stopped && this.restore(), e = this.content, o = e.style, r = o.overflowY, i && this.$content.css({
                height: this.$content.height()
            }), t = e.scrollHeight + s, h = parseInt(this.$el.css("max-height"), 10), h > 0 && (this.$el.height(""), this.$el.height(e.scrollHeight > h ? h : e.scrollHeight)), a = this.pane.outerHeight(!1), u = parseInt(this.pane.css("top"), 10), l = parseInt(this.pane.css("bottom"), 10), c = a + u + l, p = Math.round(c / t * a), p < this.options.sliderMinHeight ? p = this.options.sliderMinHeight : null != this.options.sliderMaxHeight && p > this.options.sliderMaxHeight && (p = this.options.sliderMaxHeight), r === m && o.overflowX !== m && (p += s), this.maxSliderTop = c - p, this.contentHeight = t, this.paneHeight = a, this.paneOuterHeight = c, this.sliderHeight = p, this.paneTop = u, this.slider.height(p), this.events.scroll(), this.pane.show(), this.isActive = !0, e.scrollHeight === e.clientHeight || this.pane.outerHeight(!0) >= e.scrollHeight && r !== m ? (this.pane.hide(), this.isActive = !1) : this.el.clientHeight === e.scrollHeight && r === m ? this.slider.hide() : this.slider.show(), this.pane.css({
                opacity: this.options.alwaysVisible ? 1 : "",
                visibility: this.options.alwaysVisible ? "visible" : ""
            }), n = this.$content.css("position"), "static" !== n && "relative" !== n || (d = parseInt(this.$content.css("right"), 10)) && this.$content.css({
                right: "",
                marginRight: d
            }), this)
        }, g.prototype.scroll = function() {
            if (this.isActive) return this.sliderY = Math.max(0, this.sliderY), this.sliderY = Math.min(this.maxSliderTop, this.sliderY), this.$content.scrollTop(this.maxScrollTop * this.sliderY / this.maxSliderTop), this.iOSNativeScrolling || (this.updateScrollValues(), this.setOnScrollStyles()), this
        }, g.prototype.scrollBottom = function(e) {
            if (this.isActive) return this.$content.scrollTop(this.contentHeight - this.$content.height() - e).trigger(p), this.stop().restore(), this
        }, g.prototype.scrollTop = function(e) {
            if (this.isActive) return this.$content.scrollTop(+e).trigger(p), this.stop().restore(), this
        }, g.prototype.scrollTo = function(e) {
            if (this.isActive) return this.scrollTop(this.$el.find(e).get(0).offsetTop), this
        }, g.prototype.stop = function() {
            return C && this.scrollRAF && (C(this.scrollRAF), this.scrollRAF = null), this.stopped = !0, this.removeEvents(), this.iOSNativeScrolling || this.pane.hide(), this
        }, g.prototype.destroy = function() {
            return this.stopped || this.stop(), !this.iOSNativeScrolling && this.pane.length && this.pane.remove(), i && this.$content.height(""), this.$content.removeAttr("tabindex"), this.$el.hasClass(this.options.enabledClass) && (this.$el.removeClass(this.options.enabledClass), this.$content.css({
                right: ""
            })), this
        }, g.prototype.flash = function() {
            if (!this.iOSNativeScrolling && this.isActive) return this.reset(), this.pane.addClass(this.options.flashedClass), setTimeout(function(e) {
                return function() {
                    e.pane.removeClass(e.options.flashedClass)
                }
            }(this), this.options.flashDelay), this
        }, g
    }(), e.fn.nanoScroller = function(t) {
        return this.each(function() {
            var n, i;
            if ((i = this.nanoscroller) || (n = e.extend({}, b, t), this.nanoscroller = i = new g(this, n)), t && "object" == typeof t) {
                if (e.extend(i.options, t), null != t.scrollBottom) return i.scrollBottom(t.scrollBottom);
                if (null != t.scrollTop) return i.scrollTop(t.scrollTop);
                if (t.scrollTo) return i.scrollTo(t.scrollTo);
                if ("bottom" === t.scroll) return i.scrollBottom(0);
                if ("top" === t.scroll) return i.scrollTop(0);
                if (t.scroll && t.scroll instanceof e) return i.scrollTo(t.scroll);
                if (t.stop) return i.stop();
                if (t.destroy) return i.destroy();
                if (t.flash) return i.flash()
            }
            return i.reset()
        })
    }, e.fn.nanoScroller.Constructor = g
});
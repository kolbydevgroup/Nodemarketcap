(function(factory) {
    var registeredInModuleLoader = false;
    if (typeof define === 'function' && define.amd) {
        define(factory);
        registeredInModuleLoader = true;
    }
    if (typeof exports === 'object') {
        module.exports = factory();
        registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function() {
            window.Cookies = OldCookies;
            return api;
        };
    }
}(function() {
    function extend() {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[i];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init(converter) {
        function api(key, value, attributes) {
            var result;
            if (typeof document === 'undefined') {
                return;
            }
            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);
                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    attributes.expires = expires;
                }
                attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';
                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}
                if (!converter.write) {
                    value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                } else {
                    value = converter.write(value, key);
                }
                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);
                var stringifiedAttributes = '';
                for (var attributeName in attributes) {
                    if (!attributes[attributeName]) {
                        continue;
                    }
                    stringifiedAttributes += '; ' + attributeName;
                    if (attributes[attributeName] === true) {
                        continue;
                    }
                    stringifiedAttributes += '=' + attributes[attributeName];
                }
                return (document.cookie = key + '=' + value + stringifiedAttributes);
            }
            if (!key) {
                result = {};
            }


            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;
            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var cookie = parts.slice(1).join('=');
                if (!this.json && cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }
                try {
                    var name = parts[0].replace(rdecode, decodeURIComponent);
                    cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);
                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }
                    if (key === name) {
                        result = cookie;
                        break;
                    }
                    if (!key) {
                        result[name] = cookie;
                    }
                } catch (e) {}
            }
            return result;
        }
        api.set = api;
        api.get = function(key) {
            return api.call(api, key);
        };
        api.getJSON = function() {
            return api.apply({
                json: true
            }, [].slice.call(arguments));
        };
        api.defaults = {};
        api.remove = function(key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        };
        api.withConverter = init;
        return api;
    }
    return init(function() {});
}));


(function(e, t) {
    typeof define == "function" && define.amd ? define([], function() {
        return t(e)
    }) : typeof exports == "object" ? module.exports = t(e) : e.Polyglot = t(e)
})(this, function(e) {
    "use strict";

    function t(e) {
        e = e || {}, this.phrases = {}, this.extend(e.phrases || {}), this.currentLocale = e.locale || "en", this.allowMissing = !!e.allowMissing, this.warn = e.warn || c
    }

    function s(e) {
        var t, n, r, i = {};
        for (t in e)
            if (e.hasOwnProperty(t)) {
                n = e[t];
                for (r in n) i[n[r]] = t
            } return i
    }

    function o(e) {
        var t = /^\s+|\s+$/g;
        return e.replace(t, "")
    }

    function u(e, t, r) {
        var i, s, u;
        return r != null && e ? (s = e.split(n), u = s[f(t, r)] || s[0], i = o(u)) : i = e, i
    }

    function a(e) {
        var t = s(i);
        return t[e] || t.en
    }

    function f(e, t) {
        return r[a(e)](t)
    }

    function l(e, t) {
        for (var n in t) n !== "_" && t.hasOwnProperty(n) && (e = e.replace(new RegExp("%\\{" + n + "\\}", "g"), t[n]));
        return e
    }

    function c(t) {
        e.console && e.console.warn && e.console.warn("WARNING: " + t)
    }

    function h(e) {
        var t = {};
        for (var n in e) t[n] = e[n];
        return t
    }
    t.VERSION = "0.4.3", t.prototype.locale = function(e) {
        return e && (this.currentLocale = e), this.currentLocale
    }, t.prototype.extend = function(e, t) {
        var n;
        for (var r in e) e.hasOwnProperty(r) && (n = e[r], t && (r = t + "." + r), typeof n == "object" ? this.extend(n, r) : this.phrases[r] = n)
    }, t.prototype.clear = function() {
        this.phrases = {}
    }, t.prototype.replace = function(e) {
        this.clear(), this.extend(e)
    }, t.prototype.t = function(e, t) {
        var n, r;
        return t = t == null ? {} : t, typeof t == "number" && (t = {
            smart_count: t
        }), typeof this.phrases[e] == "string" ? n = this.phrases[e] : typeof t._ == "string" ? n = t._ : this.allowMissing ? n = e : (this.warn('Missing translation for key: "' + e + '"'), r = e), typeof n == "string" && (t = h(t), r = u(n, this.currentLocale, t.smart_count), r = l(r, t)), r
    }, t.prototype.has = function(e) {
        return e in this.phrases
    };
    var n = "||||",
        r = {
            chinese: function(e) {
                return 0
            },
            german: function(e) {
                return e !== 1 ? 1 : 0
            },
            french: function(e) {
                return e > 1 ? 1 : 0
            },
            russian: function(e) {
                return e % 10 === 1 && e % 100 !== 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
            },
            czech: function(e) {
                return e === 1 ? 0 : e >= 2 && e <= 4 ? 1 : 2
            },
            polish: function(e) {
                return e === 1 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
            },
            icelandic: function(e) {
                return e % 10 !== 1 || e % 100 === 11 ? 1 : 0
            }
        },
        i = {
            chinese: ["fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh"],
            german: ["da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv"],
            french: ["fr", "tl", "pt-br"],
            russian: ["hr", "ru"],
            czech: ["cs"],
            polish: ["pl"],
            icelandic: ["is"]
        };
    return t
});/*
(function() {
    var template = Handlebars.template,
        templates = Handlebars.templates = Handlebars.templates || {};
    templates['quick_search'] = template({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(depth0, helpers, partials, data) {
            var helper, alias1 = helpers.helperMissing,
                alias2 = "function",
                alias3 = this.escapeExpression;
            return "<a href=\"" +
                alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1), (typeof helper === alias2 ? helper.call(depth0, {
                    "name": "url",
                    "hash": {},
                    "data": data
                }) : helper))) +
                "\"><img src=\"https://s2.coinmarketcap.com/static/img/coins/16x16/" +
                alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1), (typeof helper === alias2 ? helper.call(depth0, {
                    "name": "id",
                    "hash": {},
                    "data": data
                }) : helper))) +
                ".png\" class=\"logo-sprite\" /> " +
                alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1), (typeof helper === alias2 ? helper.call(depth0, {
                    "name": "name",
                    "hash": {},
                    "data": data
                }) : helper))) +
                " (" +
                alias3(((helper = (helper = helpers.symbol || (depth0 != null ? depth0.symbol : depth0)) != null ? helper : alias1), (typeof helper === alias2 ? helper.call(depth0, {
                    "name": "symbol",
                    "hash": {},
                    "data": data
                }) : helper))) +
                ")</a>\n";
        },
        "useData": true
    });
})();
(function() {
    var template = Handlebars.template,
        templates = Handlebars.templates = Handlebars.templates || {};
    templates['quick_search_exchanges'] = template({
        "compiler": [6, ">= 2.0.0-beta.1"],
        "main": function(depth0, helpers, partials, data) {
            var helper, alias1 = helpers.helperMissing,
                alias2 = "function",
                alias3 = this.escapeExpression;
            return "<a href=\"" +
                alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1), (typeof helper === alias2 ? helper.call(depth0, {
                    "name": "url",
                    "hash": {},
                    "data": data
                }) : helper))) +
                "\"><img src=\"https://s2.coinmarketcap.com/static/img/exchanges/16x16/" +
                alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1), (typeof helper === alias2 ? helper.call(depth0, {
                    "name": "id",
                    "hash": {},
                    "data": data
                }) : helper))) +
                ".png\" class=\"logo-sprite\" /> " +
                alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1), (typeof helper === alias2 ? helper.call(depth0, {
                    "name": "name",
                    "hash": {},
                    "data": data
                }) : helper))) +
                "</a>\n";
        },
        "useData": true
    });
})();

function initQuickSearch(options, polyglot) {
    var currencyDataURL = options.currencyDataURL;
    var exchangeDataURL = options.exchangeDataURL;
    var currencyURLTemplate = options.currencyURLTemplate;
    var exchangeURLTemplate = options.exchangeURLTemplate;
    var currencyLimit = options.currencyLimit;
    var exchangeLimit = options.exchangeLimit;
    var currencySuggestionTemplate = options.currencySuggestionTemplate;
    var exchangeSuggestionTemplate = options.exchangeSuggestionTemplate;
    var cryptocurrenciesLabel = polyglot ? polyglot.t('cryptocurrencies') : 'Cryptocurrencies';
    var exchangesLabel = polyglot ? polyglot.t('exchanges') : 'Exchanges';
    var engine = new Bloodhound({
        name: 'currencies',
        prefetch: {
            'url': currencyDataURL,
            'ttl': 2
        },
        limit: currencyLimit,
        datumTokenizer: function(d) {
            return Bloodhound.tokenizers.whitespace(d.tokens.join(' '));
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        sorter: function(a, b) {
            var inputString = $('.js-quick-search:visible').val();
            if (inputString.toUpperCase() == a.symbol) {
                return -1;
            }
            if (inputString.toUpperCase() == b.symbol) {
                return 1;
            }
            if (a.hasOwnProperty('id')) {
                if (inputString == a.id) {
                    return -1;
                }
                if (inputString == b.id) {
                    return 1;
                }
            }
            if (a.rank < b.rank) {
                return -1;
            } else if (a.rank > b.rank) {
                return 1;
            }
        }
    });
    var exchanges = new Bloodhound({
        name: 'exchanges',
        prefetch: {
            'url': exchangeDataURL,
            'ttl': 2
        },
        limit: exchangeLimit,
        datumTokenizer: function(d) {
            return Bloodhound.tokenizers.whitespace(d.tokens.join(' '));
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        sorter: function(a, b) {
            if (a.rank < b.rank) {
                return -1;
            } else if (a.rank > b.rank) {
                return 1;
            }
        }
    });
    engine.initialize();
    exchanges.initialize();
    $('.js-quick-search').typeahead({
        hint: false,
        highlight: false,
        minLength: 1,
        autoselect: true
    }, {
        name: 'currencies',
        displayKey: 'name',
        source: engine.ttAdapter(),
        templates: {
            header: '<h3 class="quick-search-header">' + cryptocurrenciesLabel + '</h3>',
            suggestion: currencySuggestionTemplate
        }
    }, {
        name: 'exchanges',
        displayKey: 'name',
        source: exchanges.ttAdapter(),
        templates: {
            header: '<h3 class="quick-search-header">' + exchangesLabel + '</h3>',
            suggestion: exchangeSuggestionTemplate
        }
    }).on('focus', function(event) {
        $(this).trigger($.Event('keydown', {
            keyCode: 40
        }));
    }).on('input', function() {
        $('.tt-suggestion').first().addClass('tt-cursor');
    }).on('typeahead:selected', function($e, datum) {
        var selectedValue = $(this).val();
        window.location.href = datum.url;
    });
}*/

var CURRENCY_SYMBOLS = {
    "aud": "$",
    "brl": "R$",
    "cad": "$",
    "chf": "Fr. ",
    "clp": "$",
    "cny": "¥",
    "czk": "Kč",
    "dkk": "kr. ",
    "eur": "€",
    "gbp": "£",
    "hkd": "$",
    "huf": "Ft ",
    "idr": "Rp ",
    "ils": "₪",
    "inr": "₹",
    "jpy": "¥",
    "krw": "₩",
    "mxn": "$",
    "myr": "RM",
    "nok": "kr ",
    "nzd": "$",
    "php": "₱",
    "pkr": "₨ ",
    "pln": "zł",
    "rub": "₽",
    "sek": "kr ",
    "sgd": "S$",
    "thb": "฿",
    "try": "₺",
    "twd": "NT$",
    "usd": "$",
    "zar": "R ",
};
var Formatter = (function() {
    var _locale = Cookies.get('_locale') || undefined;
    var supportsLocaleOptions = !!(typeof Intl == 'object' && Intl && typeof Intl.NumberFormat == 'function');
    var _toLocaleString = function(val) {
        if (supportsLocaleOptions) {
            return val.toLocaleString(_locale);
        }
        return val.toLocaleString();
    };
    var _toLocaleStringWithDecimalPlaces = function(val, minDecimalPlaces, maxDecimalPlaces) {
        if (supportsLocaleOptions) {
            return val.toLocaleString(_locale, {
                minimumFractionDigits: minDecimalPlaces,
                maximumFractionDigits: maxDecimalPlaces
            });
        }
        return val.toFixed(maxDecimalPlaces);
    };
    var toLocaleString = function(value, options) {
        var num = Number(value);
        if (isNaN(num)) {
            return value;
        }
        var minDecimalPlaces = options && options.minDecimalPlaces;
        var maxDecimalPlaces = options && options.maxDecimalPlaces;
        if (minDecimalPlaces === undefined || maxDecimalPlaces === undefined) {
            return _toLocaleString(num);
        }
        return _toLocaleStringWithDecimalPlaces(num, minDecimalPlaces, maxDecimalPlaces);
    }
    return {
        toLocaleString: toLocaleString
    };
})();

function AbbreviatedNumber(value, decPlaces) {
    decPlaces = decPlaces !== undefined ? decPlaces : 2;
    var number = (function(number, decPlaces) {
        var abbreviation;
        decPlaces = Math.pow(10, decPlaces);
        var abbrev = [polyglot.t("K"), polyglot.t("M"), polyglot.t("B"), polyglot.t("T")];
        for (var i = abbrev.length - 1; i >= 0; i--) {
            var size = Math.pow(10, (i + 1) * 3);
            if (size <= number) {
                number = Math.round(number * decPlaces / size) / decPlaces;
                if ((number === 1000) && (i < abbrev.length - 1)) {
                    number = 1;
                    i++;
                }
                abbreviation = abbrev[i];
                break;
            }
        }
        return {
            value: number,
            abbreviation: abbreviation
        };
    })(value, decPlaces);

    function _toLocaleString() {
        var val = Formatter.toLocaleString(number.value, {
            minDecimalPlaces: 2,
            maxDecimalPlaces: 2
        });
        return [val, number.abbreviation].join(' ');
    };
    this.value = number.value;
    this.abbreviation = number.abbreviation;
    this.toLocaleString = _toLocaleString;
}

function convert_percent(elem, amount) {
    elem.removeClass("positive_change negative_change");
    if (amount < 0) {
        elem.addClass("negative_change")
    } else {
        elem.addClass("positive_change")
    }
    amount = Formatter.toLocaleString(amount, {
        minDecimalPlaces: 2,
        maxDecimalPlaces: 2
    });
    elem.html(amount + "%")
}

$(".clickable-row").click(function() {
  window.open($(this).data("href"), "_self");
});

function convert_percent2(elem, amount) {
    amount = Formatter.toLocaleString(amount, {
        minDecimalPlaces: 2,
        maxDecimalPlaces: 2
    });
    elem.html(amount + "%")
}

function format_percentage(val) {
    if (val > 9000) {
        val = "> 9000";
    } else if (val < 0 && val > -.005) {
        val = 0
    } else {
        val = Formatter.toLocaleString(val, {
            minDecimalPlaces: 2,
            maxDecimalPlaces: 2
        });
    }
    return val;
}

function format_market_cap(val, abbreviate) {
    if (abbreviate) {
        return new AbbreviatedNumber(val).toLocaleString();
    }
    return Formatter.toLocaleString(Math.round(val));
}

function format_supply(val) {
    if (val >= 1) {
        val = Formatter.toLocaleString(Math.round(val));
    } else {
        val = Formatter.toLocaleString(val, {
            minDecimalPlaces: 8,
            maxDecimalPlaces: 8
        });
    }
    return val;
}

function format_fiat(val) {
    if (val >= 100000 || val == 0) {
        val = Formatter.toLocaleString(Math.round(val));
    } else if (val >= 1) {
        val = Formatter.toLocaleString(val, {
            minDecimalPlaces: 2,
            maxDecimalPlaces: 2
        });
    } else if (val < 0.000001) {
        val = Number(val).toExponential(2)
    } else {
        val = Formatter.toLocaleString(val, {
            minDecimalPlaces: 6,
            maxDecimalPlaces: 6
        });
    }
    return val;
}

function format_fiat_short(val) {
    if (val >= 1 || val == 0) {
        if (val >= 100000) {
            val = Formatter.toLocaleString(Math.round(val));
        } else {
            val = Formatter.toLocaleString(val, {
                minDecimalPlaces: 2,
                maxDecimalPlaces: 2
            });
        }
    } else {
        if (val < 0.01) {
            val = Number(val).toExponential();
        } else {
            val = Formatter.toLocaleString(val, {
                minDecimalPlaces: 2,
                maxDecimalPlaces: 2
            });
        }
    }
    return val;
}

function format_crypto_helper(val, expenonentialThreshold, exponentialDigits, minDecimalPlaces, maxDecimalPlaces) {
    if (val >= 1000 || val == 0) {
        val = Formatter.toLocaleString(Math.round(val));
    } else if (val >= 1) {
        val = Formatter.toLocaleString(val, {
            minDecimalPlaces: minDecimalPlaces,
            maxDecimalPlaces: maxDecimalPlaces
        });
    } else {
        if (val < expenonentialThreshold) {
            val = Number(val).toExponential(exponentialDigits)
        } else {
            val = Formatter.toLocaleString(val, {
                minDecimalPlaces: minDecimalPlaces,
                maxDecimalPlaces: maxDecimalPlaces
            });
        }
    }
    return val;
}

function format_crypto(val) {
    return format_crypto_helper(val, 0.00000001, 3, 8, 8)
}

function format_crypto_graph_label(val) {
    return format_crypto_helper(val, 0.00000001, 3, 2, 8)
}

function format_crypto_short(val) {
    return format_crypto_helper(val, 0.01, 1, 2, 2)
}

function format_crypto_volume(val, abbreviate) {
    if (abbreviate) {
        return new AbbreviatedNumber(val).toLocaleString();
    }
    if (val >= 1000) {
        val = Formatter.toLocaleString(Math.round(val));
    } else {
        val = Formatter.toLocaleString(val, {
            minDecimalPlaces: 2,
            maxDecimalPlaces: 2
        });
    }
    return val;
}

function renderCurrencyDetailFields(currency) {
    var currencyLowercase = currency.toLowerCase();
    var foreign_amount = $("#currency-exchange-rates").data(currencyLowercase);
    $.each([$('[data-currency-market-cap]'), $('[data-currency-volume]')], function() {
        var selector_type = this.selector;
        $.each(this, function(key, value) {
            var amount = $(this).data("usd");
            if (amount === "None") {
                amount = "?";
            }
            if (amount != "?") {
                amount = parseFloat(amount) / foreign_amount
                if (selector_type == "[data-currency-price]") {
                    amount = format_fiat(amount);
                } else {
                    amount = format_market_cap(amount);
                }
            }
            $(this).find('[data-currency-value]').html(CURRENCY_SYMBOLS[currencyLowercase] + amount);
            $(this).find('[data-currency-code]').html(currency);
        });
    });
    $.each([$('[data-currency-price]')], function() {
        var selector_type = this.selector;
        $.each(this, function(key, value) {
            var amount = $(this).data("usd");
            if (amount === "None") {
                amount = "?";
            }
            if (amount != "?") {
                amount = parseFloat(amount) / foreign_amount
                if (selector_type == "[data-currency-price]") {
                    amount = format_fiat(amount);
                } else {
                    amount = format_fiat(amount);
                }
            }
            $(this).find('[data-currency-value]').html(CURRENCY_SYMBOLS[currencyLowercase] + amount);
            $(this).find('[data-currency-code]').html(currency);
        });
    });
}

function runNumberFormatters() {
    var formatters = {
        '[data-format-supply]': format_supply,
        '[data-format-market-cap]': format_market_cap,
        '[data-format-volume-crypto]': format_crypto_volume,
        '[data-format-percentage]': format_percentage,
        '[data-format-price-crypto]': format_crypto,
        '[data-format-fiat]': format_fiat,
    };
    for (var selector in formatters) {
        var formatFn = formatters[selector];
        $(selector).each(function() {
            var $this = $(this),
                value = $this.data('format-value');
            if (!isNaN(parseFloat(value))) {
                $this.html(formatFn(value));
            }
        });
    }
}

function renderGlobalCurrency(currency) {
    var currencyLowercase = currency.toLowerCase();
    var foreign_amount = $("#currency-exchange-rates").data(currencyLowercase);
    $.each([$('[data-global-currency-market-cap]'), $('[data-global-currency-price]'), $('[data-global-currency-volume]')], function() {
        var selector_type = this.selector;
        $.each(this, function(key, value) {
            var amount = $(this).data("usd");
            if (amount === "None") {
                amount = "?";
            }
            if (amount != "?") {
                amount = parseFloat(amount) / foreign_amount
                if (selector_type == "[data-global-currency-price]") {
                    amount = format_fiat(amount);
                } else {
                    amount = format_market_cap(amount);
                }
            }
            $(this).html(CURRENCY_SYMBOLS[currencyLowercase] + amount);
        });
    });
}
var Currency = (function() {
    var containerSelector = '[data-global-currency-switch]',
        displaySelector = '[data-currency-display]',
        toggleSelector = '[data-currency-toggle]',
        changeEvent = 'currencyChange',
        currentValue = null;
    var cookie = {
        get: function() {
            return Cookies.get('currency');
        },
        set: function(value) {
            var daysTilExpire = 3650;
            Cookies.set('currency', value, {
                expires: daysTilExpire
            });
        }
    };
    var setCurrencyDisplay = function(value) {
        $(displaySelector, containerSelector).html(value);
    };
    $(toggleSelector, containerSelector).on('click', function(e) {
        e.preventDefault();
        var currency = $(this).html();
        currentValue = currency;
        cookie.set(currency);
        setCurrencyDisplay(currency);
        $(containerSelector).trigger(changeEvent, [currency]);
        dataLayer.push({
            'event': 'customEvent',
            'eventCategory': 'Global Currency Dropdown',
            'eventAction': 'Currency Selected',
            'eventLabel': currency
        });
    });
    var existingValue = cookie.get();
    if (existingValue) {
        setCurrencyDisplay(existingValue);
        currentValue = existingValue;
    } else {
        currentValue = DEFAULT_CURRENCY;
        setCurrencyDisplay(currentValue);
    }
    return {
        get: function() {
            return currentValue;
        },
        onChange: function(fn) {
            $(containerSelector).on(changeEvent, fn);
        }
    };
})();/*
(function() {
    var staticDomain = STATIC_DOMAIN;
    $.ajax({
        'url': 'https://' + staticDomain + '/generated/stats/global.json',
        type: "GET",
        dataType: "json",
        success: function(data) {
            $('.js-global-stats-cryptocurrencies').html(data.active_cryptocurrencies);
            $('.js-global-stats-markets').html(data.active_markets);
            $('.js-global-stats-market-cap').data('usd', data.total_market_cap_by_available_supply_usd);
            $('.js-global-stats-volume').data('usd', data.total_volume_usd);
            $('.js-global-stats-btc-dominance').html(data.bitcoin_percentage_of_market_cap.toFixed(1));
            $('.js-global-stats').removeClass('hidden');
            renderGlobalCurrency(Currency.get());
        }
    });
})();*/
Currency.onChange(function(e, currency) {
    renderGlobalCurrency(currency);
});
(function($) {
    const MOBILE_SCREEN_WIDTH = 767;
    var isMobile = $(window).width() <= MOBILE_SCREEN_WIDTH;

    function toggleMobileText(context) {
        const DATA_ATTR_SELECTOR = '[data-mobile-text]',
            DATA_ATTR_NAME = 'mobile-text';
        var selection = context === undefined ? $(DATA_ATTR_SELECTOR) : $(DATA_ATTR_SELECTOR, context);
        selection.each(function(index, element) {
            var $element = $(element),
                targetText = $element.data(DATA_ATTR_NAME),
                sourceText = $element.html();
            $element.data(DATA_ATTR_NAME, sourceText).html(targetText);
        });
    }

    function onBrowserResize(mobileToDesktopCallback, desktopToMobileCallback) {
        $(window).on('resize', function() {
            var screenWidth = $(window).width();
            if (isMobile && screenWidth > MOBILE_SCREEN_WIDTH) {
                isMobile = false;
                mobileToDesktopCallback();
            } else if (!isMobile && screenWidth <= MOBILE_SCREEN_WIDTH) {
                isMobile = true;
                desktopToMobileCallback();
            }
        });
    }
    window.MOBILE = {
        isMobile: function() {
            return isMobile;
        },
        toggleMobileText: toggleMobileText,
        onBrowserResize: onBrowserResize
    };
})($);

function ScrollToTop(selector) {
    var displayLimit = 100;
    var isVisible = false;
    $(window).on('scroll', function() {
        var scroll = $(this).scrollTop();
        if (scroll > displayLimit && !isVisible) {
            $(selector).fadeIn();
            isVisible = true;
        } else if (scroll < displayLimit && isVisible) {
            $(selector).fadeOut();
            isVisible = false;
        }
    });
    $(selector).on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        dataLayer.push({
            'event': 'customEvent',
            'eventCategory': 'Scroll To Top',
            'eventAction': 'Scroll To Top',
            'eventLabel': window.location.href
        });
        return false;
    });
}

function SiteNav(selector) {
    var $this = $(selector),
        $expandButton = $this.find('.js-sitenav-search-trigger'),
        $collapseButton = $this.find('.js-sitenav-search-collapse'),
        $searchBox = $this.find('.js-sitenav-search-box'),
        $searchBoxInput = $searchBox.find('.js-quick-search');
    $expandButton.on('click', function() {
        $this.addClass('is-expanded');
        $searchBox.fadeIn('fast');
        $searchBoxInput.focus();
        return false;
    });
    $collapseButton.on('click', function() {
        $searchBox.fadeOut('fast', function() {
            $this.removeClass('is-expanded');
        });
        return false;
    });
}

function PageExtender() {
    var $body = $('body'),
        $scrollToTop = $('.scroll-to-top'),
        bodyMarginBottom = $body.css('margin-bottom'),
        scrollToTopBottom = $scrollToTop.css('bottom');

    function extend(height) {
        $body.css('margin-bottom', height);
        $scrollToTop.css('bottom', height + 12);
    }

    function reset() {
        $body.css('margin-bottom', bodyMarginBottom);
        $scrollToTop.css('bottom', scrollToTopBottom);
    }
    return {
        extend: extend,
        reset: reset
    }
}

function CookiedDismissableAlert(options) {
    var $this = $(options.selector),
        $closeButton = $this.find('.js-close'),
        expires = options.cookieExpires || (100 * 365),
        cookieKey = options.cookieKey;
    hasBeenDismissed = Cookies.get(cookieKey) === '1';
    if (!hasBeenDismissed) {
        $this.removeClass('hide');
        var height = $this.outerHeight(),
            pageExtender = PageExtender();
        pageExtender.extend(height);
        $closeButton.on('click', function() {
            $this.hide();
            pageExtender.reset();
            Cookies.set(cookieKey, '1', {
                expires: expires
            });
        });
    }
}
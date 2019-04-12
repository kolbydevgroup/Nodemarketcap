
function buildTable(tableSelector, dataTableOptions) {
    var table = $(tableSelector).DataTable(dataTableOptions);
    MOBILE.toggleMobileText(table.table().header());
    return table;
}

function initResponsiveTable(tableSelector, desktopDataTableOptions, mobileColOrder) {
    var $table = $(tableSelector);
    if (!$table.length) {
        return;
    }
    desktopDataTableOptions.destroy = true;
    var mobileOptions = {
        "scrollX": true,
        "scrollCollapse": true,
        "fixedColumns": {
            "leftColumns": 2,
            "heightMatch": "auto"
        },
    };
    var doColReorder = (mobileColOrder !== undefined);
    if (doColReorder) {
        mobileOptions.colReorder = {
            "order": mobileColOrder,
            "fixedColumnsLeft": 99
        };
    }
    var mobileDataTableOptions = $.extend(mobileOptions, desktopDataTableOptions);
    var table;
    if (MOBILE.isMobile()) {
        table = buildTable(tableSelector, mobileDataTableOptions);
    } else {
        table = $(tableSelector).dataTable(desktopDataTableOptions);
    }

    function mobileToDesktopCallback() {
        doColReorder && table.colReorder.reset();
        desktopDataTableOptions.scrollX = true;
        table = buildTable(tableSelector, desktopDataTableOptions);
        rerenderCurrency();
    }

    function desktopToMobileCallback() {
        table = buildTable(tableSelector, mobileDataTableOptions);
        rerenderCurrency();
    }
    MOBILE.onBrowserResize(mobileToDesktopCallback, desktopToMobileCallback);
}

function getLanguageOptions() {
    return {
        emptyTable: polyglot.t('emptyTable'),
        zeroRecords: polyglot.t('zeroRecords'),
        aria: {
            sortAscending: polyglot.t('sortAscending'),
            sortDescending: polyglot.t('sortDescending')
        }
    }
}
$(document).ready(function() {
    var langOptions = getLanguageOptions();
    var currencyTableOptions = {
        "bFilter": false,
        "bInfo": false,
        "bLengthChange ": false,
        "bPaginate": false,
        "bStateSave": false,
        "aoColumnDefs": [{
            "bSortable": false,
            "aTargets": [7, 8]
        }, {
            "asSorting": ["desc", "asc"],
            "aTargets": [2, 3, 4, 5, 6]
        }, ],
        "order": [],
        "language": langOptions
    };
    initResponsiveTable('#currencies', currencyTableOptions,
        [0, 1, 3, 6, 2, 5, 4, 7, 8]);
    var tables = $('#currencies-all, #assets-all').dataTable({
        "bFilter": true,
        "bInfo": false,
        "bLengthChange ": false,
        "bPaginate": false,
        "bStateSave": false,
        "aoColumnDefs": [{
            "bSortable": false,
            "aTargets": [10]
        }, {
            "asSorting": ["desc", "asc"],
            "aTargets": [3, 4, 5, 6, 7, 8, 9]
        }],
        "sDom": 't',
        "order": [],
        "language": langOptions
    });
    if (tables.length) {
        function toggleMobileForSummaryTable() {
            MOBILE.toggleMobileText($('#currencies-all thead, #assets-all thead'));
            rerenderCurrency();
        }
        if (MOBILE.isMobile()) {
            MOBILE.toggleMobileText($('#currencies-all thead, #assets-all thead'));
        }
        MOBILE.onBrowserResize(toggleMobileForSummaryTable, toggleMobileForSummaryTable);
    }
    var assetTableOptions = {
        "bFilter": false,
        "bInfo": false,
        "bLengthChange ": false,
        "bPaginate": false,
        "bStateSave": false,
        "aoColumnDefs": [{
            "bSortable": false,
            "aTargets": [8, 9]
        }, {
            "asSorting": ["desc", "asc"],
            "aTargets": [3, 4, 5, 6, 7]
        }, ],
        "order": [],
        "language": langOptions
    };
    initResponsiveTable('#assets', assetTableOptions,
        [0, 1, 4, 7, 3, 6, 5, 8, 2, 9]);
    var exchangeRankingOptions = {
        "bFilter": false,
        "bInfo": false,
        "bLengthChange ": false,
        "bPaginate": false,
        "bStateSave": false,
        "aoColumnDefs": [{
            "bSortable": false,
            "aTargets": [8]
        }, {
            "asSorting": ["desc", "asc"],
            "aTargets": [1, 2, 3, 4, 5, 6, 7]
        }, ],
        "order": [],
        "language": langOptions
    };
    initResponsiveTable('#exchange-rankings.js-show-adjusted', exchangeRankingOptions);
    initResponsiveTable('#exchange-rankings.js-default-cols', {
        "bFilter": false,
        "bInfo": false,
        "bLengthChange ": false,
        "bPaginate": false,
        "bStateSave": false,
        "aoColumnDefs": [{
            "bSortable": false,
            "aTargets": [7]
        }, {
            "asSorting": ["desc", "asc"],
            "aTargets": [1, 2, 3, 4, 5, 6]
        }, ],
        "order": [],
        "language": langOptions
    });
    $('#markets-table').dataTable({
        "bFilter": true,
        "bInfo": false,
        "bLengthChange ": false,
        "bPaginate": false,
        "bStateSave": false,
        "aoColumnDefs": [{
            "asSorting": ["desc", "asc"],
            "aTargets": [3, 4, 5]
        }],
        "sDom": 't',
        "order": [],
        "language": langOptions
    });
    $('#stats').dataTable({
		"order": [[ 8, "desc" ]],
		"lengthChange": false,
		"pageLength": 50,	
			"columnDefs": [
			{ "orderable": false, "targets": 0 }, {"targets": 0,	"data": 0, "render": function(data, type, row) {
			return '<img src="/static/imgs/coins16/'+data+'.png" alt="Masternode Cryptocurrencies Logo" />';
			},
			},
				{ "targets": 9, "data": [9], "render": function ( data, type, row ) {  var color = 'black'; if (data == "online") { color = 'green'; }     if (data == "syncing") {   color = 'red'; }  return '<span class="status-pill smaller '+color+'"></span><span>'+data+'</span>';
                    }	}
			],	
        "language": langOptions
    });
    $('#gainers-table').dataTable({
			"order": [[ 5, "desc" ]],
			ordering:  false,
			paging: false,
			"columnDefs": [
			{ "searchable": false,"orderable": false,"targets": 0}, {"orderable": false,"targets": 1}, {"targets": 1,	"data": 1, "render": function(data, type, row) {
			return '<img src="/static/imgs/coins16/'+data+'.png" alt="Masternode Cryptocurrencies Logo" />';
			},
			},
				{ "targets": 10, "data": [10], "render": function ( data, type, row ) {  var color = 'black'; if (data == "online") { color = 'green'; }     if (data == "syncing") {   color = 'red'; }  return '<span class="status-pill smaller '+color+'"></span><span>'+data+'</span>';
                    }	}
			],	

        "language": langOptions
    });
    $('#losers-table').dataTable({
			"order": [[ 5, "desc" ]],
			ordering:  false,
			paging: false,
			"columnDefs": [
			{ "searchable": false,"orderable": false,"targets": 0}, {"orderable": false,"targets": 1}, {"targets": 1,	"data": 1, "render": function(data, type, row) {
			return '<img src="/static/imgs/coins16/'+data+'.png" alt="Masternode Cryptocurrencies Logo" />';
			},
			},
				{ "targets": 10, "data": [10], "render": function ( data, type, row ) {  var color = 'black'; if (data == "online") { color = 'green'; }     if (data == "syncing") {   color = 'red'; }  return '<span class="status-pill smaller '+color+'"></span><span>'+data+'</span>';
                    }	}
			],	


        "language": langOptions
    });	
    $('#exchange-markets').dataTable({
        "bFilter": true,
        "bInfo": false,
        "bLengthChange ": false,
        "bPaginate": false,
        "bStateSave": false,
        "aoColumnDefs": [{
            "asSorting": ["desc", "asc"],
            "aTargets": [3, 4, 5]
        }],
        "sDom": 't',
        "order": [],
        "language": langOptions
    });
    var currenciesVolume = $('#currencies-volume').DataTable({
        "bFilter": false,
        "bInfo": false,
        "bLengthChange ": false,
        "bPaginate": false,
        "bStateSave": false,
        "aoColumnDefs": [{
            "asSorting": ["desc", "asc"],
            "aTargets": [3, 4, 5]
        }],
        "order": [],
        "language": langOptions
    });
    $('#trending-recently-added').DataTable({
        "bFilter": false,
        "bInfo": false,
        "bLengthChange ": false,
        "bPaginate": false,
        "bStateSave": false,
        "order": [],
        "aoColumnDefs": [{
            "asSorting": ["desc", "asc"],
            "aTargets": [3, 4, 5, 6, 7]
        }],
        "language": langOptions
    });
    $('.trending-gainers-table, .trending-losers-table').DataTable({
        "bFilter": false,
        "bInfo": false,
        "bLengthChange ": false,
        "bPaginate": false,
        "bStateSave": false,
        "order": [],
        "aoColumnDefs": [{
            "asSorting": ["desc", "asc"],
            "aTargets": [3, 4, 5]
        }],
        "language": langOptions
    });
    var $window = $(window);
    var adsDisabled = !$('#leaderboard').height();
    var $menuToggle = $(".menu-toggle");
    $window.scroll(function() {
        var sticky = $('.dataTables_scrollHead');
        var sticky2 = $('.DTFC_LeftHeadWrapper');
        if (!sticky.length && !sticky2.length) {
            return;
        }
        var scroll = $window.scrollTop();
        var navBarCollapsed = $menuToggle.hasClass("collapsed");
        var scrollThreshold;
        if (adsDisabled) {
            scrollThreshold = navBarCollapsed ? 420 : 820;
        } else {
            scrollThreshold = navBarCollapsed ? 620 : 1020;
        }
        if (scroll >= scrollThreshold) {
            sticky.addClass('fixed');
            sticky2.addClass('fixed_left');
        } else {
            sticky.removeClass('fixed');
            sticky2.removeClass('fixed_left');
        }
    });
});

function toggle_currency(currency, currencyId) {
    var currency_lowercase = currency;
    var abbreviate = MOBILE.isMobile();
    var non_fiat_currencies = ['btc', 'eth', 'bch', 'xrp', 'ltc'];
    var isConvertingPercent = !$('#exchange-rankings').length;
    if (non_fiat_currencies.indexOf(currency_lowercase) > -1) {
        foreign_amount = $("#currency-exchange-rates").data(currency_lowercase);
        $.each([$('.market-cap')], function() {
            selector_type = this.selector
            $.each(this, function(key, value) {
                slug = $(this).closest('tr').attr("id");
                amount = $(this).data("usd");
                if (amount === "None") {
                    amount = "?";
                }
                if (amount != "?") {
                    amount = parseFloat(amount) / foreign_amount
                    if (selector_type == ".price") {
                        if (slug == "id-" + currencyId) {
                            amount = 1;
                        }
                        amount = format_market_cap(amount);
                    } else if (selector_type == ".volume") {
                        amount = format_market_cap(amount, abbreviate);
                    } else {
                        amount = format_market_cap(amount, abbreviate);
                    }
                }
                $(this).html(amount + " " + currency.toUpperCase())
            });
        });
        $.each([$('.volume')], function() {
            selector_type = this.selector
            $.each(this, function(key, value) {
                slug = $(this).closest('tr').attr("id");
                amount = $(this).data("usd");
                if (amount === "None") {
                    amount = "?";
                }
                if (amount != "?") {
                    amount = parseFloat(amount) / foreign_amount
                    if (selector_type == ".price") {
                        if (slug == "id-" + currencyId) {
                            amount = 1;
                        }
                        amount = format_crypto_volume(amount);
                    } else if (selector_type == ".volume") {
                        amount = format_crypto_volume(amount, abbreviate);
                    } else {
                        amount = format_crypto_volume(amount, abbreviate);
                    }
                }
                $(this).html(amount + " " + currency.toUpperCase())
            });
        });
        $.each([$('.price')], function() {
            selector_type = this.selector
            $.each(this, function(key, value) {
                slug = $(this).closest('tr').attr("id");
                amount = $(this).data("usd");
                if (amount === "None") {
                    amount = "?";
                }
                if (amount != "?") {
                    amount = parseFloat(amount) / foreign_amount
                    if (selector_type == ".price") {
                        if (slug == "id-" + currencyId) {
                            amount = 1;
                        }
                        amount = format_crypto(amount);
                    } else if (selector_type == ".volume") {
                        amount = format_crypto(amount);
                    } else {
                        amount = format_crypto(amount);
                    }
                }
                $(this).html(amount + " " + currency.toUpperCase())
            });
        });
    } else {
        foreign_amount = $("#currency-exchange-rates").data(currency_lowercase);
        $.each([$('.market-cap'), $('.volume')], function() {
            selector_type = this.selector
            $.each(this, function(key, value) {
                amount = $(this).data("usd");
                if (amount === "None") {
                    amount = "?";
                }
                if (amount != "?") {
                    amount = parseFloat(amount) / foreign_amount
                    if (selector_type == ".price") {
                        amount = format_fiat(amount);
                    } else {
                        amount = format_market_cap(amount, abbreviate);
                    }
                }
                $(this).html(CURRENCY_SYMBOLS[currency_lowercase] + amount);
            });
        });
        $.each([$('.price')], function() {
            selector_type = this.selector
            $.each(this, function(key, value) {
                amount = $(this).data("usd");
                if (amount === "None") {
                    amount = "?";
                }
                if (amount != "?") {
                    amount = parseFloat(amount) / foreign_amount
                    if (selector_type == ".price") {
                        amount = format_fiat(amount);
                    } else {
                        amount = format_fiat(amount);
                    }
                }
                $(this).html(CURRENCY_SYMBOLS[currency_lowercase] + amount);
            });
        });
    }
    if (isConvertingPercent) {
        $.each($('.percent-change'), function(key, value) {
            var elem = $(this),
                symbolRaw = $(this).data("symbol"),
                symbol = symbolRaw && symbolRaw.toString().toLowerCase();
            if (non_fiat_currencies.indexOf(currency_lowercase) == -1) {
                percentage_change = elem.data("percentusd");
            } else if (symbol === currency_lowercase) {
                percentage_change = 0;
            } else {
                var timespan = elem.data("timespan");
                var data_slug = "" + currency_lowercase + timespan;
                var cc_percentage_gain = elem.data("percentusd")
                var base_percentage_gain = $("#percentage_gains_data").data(data_slug);
                current_val = (1 + cc_percentage_gain / 100)
                interval_val = (1 + base_percentage_gain / 100)
                percentage_change = -1 * (100 - (current_val / interval_val * 100))
            }
            convert_percent(elem, percentage_change);
        });
        $.each($('.roi'), function(key, value) {
            var elem = $(this),
                symbolRaw = $(this).data("roi"),
                symbol = symbolRaw && symbolRaw.toString().toLowerCase();
            if (non_fiat_currencies.indexOf(currency_lowercase) == -1) {
                percentage_change = elem.data("percentusd");
            } else if (symbol === currency_lowercase) {
                percentage_change = 0;
            } else {
                var timespan = elem.data("timespan");
                var data_slug = "" + currency_lowercase + timespan;
                percentage_change = value
            }
            convert_percent2(elem, percentage_change);
        });
    }
}

function toggle_native() {
    var abbreviate = MOBILE.isMobile();
    $.each([$('.volume')], function() {
        selector_type = this.selector
        $.each(this, function(key, value) {
            amount = $(this).data("native");
            if (amount == null) {
                amount = "N/A";
            } else if (amount != "?") {
                amount = parseFloat(amount)
                if (selector_type == ".price") {
                    amount = format_fiat(amount);
                } else {
                    amount = format_market_cap(amount, abbreviate);
                }
            }
            $(this).html(amount);
        });
    });
    $.each([$('.price')], function() {
        selector_type = this.selector
        $.each(this, function(key, value) {
            amount = $(this).data("native");
            if (amount == null) {
                amount = "N/A";
            } else if (amount != "?") {
                amount = parseFloat(amount)
                if (selector_type == ".price") {
                    amount = format_fiat(amount);
                } else {
                    amount = format_fiat(amount);
                }
            }
            $(this).html(amount);
        });
    });
}

function toggle_platform() {
    var abbreviate = MOBILE.isMobile();
    $.each([$('.market-cap'), $('.volume')], function() {
        selector_type = this.selector
        $.each(this, function(key, value) {
            amount = $(this).data("platform");
            var platform_symbol = $(this).closest('tr').data("platformsymbol");
            if (amount == null || amount === "None") {
                amount = "?";
            } else if (amount != "?") {
                amount = parseFloat(amount)
                if (selector_type == ".price") {
                    amount = format_fiat(amount);
                } else {
                    amount = format_market_cap(amount, abbreviate);
                }
            }
            var text = amount + " " + (platform_symbol || "")
            $(this).html(text);
        });
    });
    $.each([$('.price')], function() {
        selector_type = this.selector
        $.each(this, function(key, value) {
            amount = $(this).data("platform");
            var platform_symbol = $(this).closest('tr').data("platformsymbol");
            if (amount == null || amount === "None") {
                amount = "?";
            } else if (amount != "?") {
                amount = parseFloat(amount)
                if (selector_type == ".price") {
                    amount = format_fiat(amount);
                } else {
                    amount = format_fiat(amount);
                }
            }
            var text = amount + " " + (platform_symbol || "")
            $(this).html(text);
        });
    });
    $.each($('.percent-change'), function(key, value) {
        var elem = $(this);
        var amount = elem.data("platform");
        convert_percent(elem, amount)
    });
}

function adjustColumnWidthForChangedText() {
    if ($.fn.dataTable) {
        $.fn.dataTable.tables().every(function(table, i) {
            $(table).css('width', '100%');
        });
        $.fn.dataTable.tables({
            api: true
        }).columns.adjust();
    }
}

function toggleSupply() {
    var abbreviate = MOBILE.isMobile();
    $('.circulating-supply').each(function(i, element) {
        var $this = $(this),
            amount = $this.find('[data-supply]').data('supply');
        if (amount === null || amount === "None") {
            amount = "?";
        }
        if (amount !== "?") {
            if (abbreviate) {
                amount = new AbbreviatedNumber(amount).toLocaleString();
            } else {
                amount = format_supply(amount);
            }
        }
        $this.find('[data-supply-container]').html(amount);
    });
}

function updateCurrencySwitch(label, currency) {
    $('#currency-switch-button').html(label + ' <span class=\"caret\"></span>').data('currency', currency);
}

function updateFiatOptions(currencyLabel) {
    var currency = currencyLabel.toLowerCase();
    if (currency !== 'usd') {
        $('#currency-switch [data-fiat-item]').show();
        $('#currency-switch [data-fiat]').html(currencyLabel).data('currency', currency);
    } else {
        $('#currency-switch [data-fiat-item]').hide();
    }
}

function renderCurrency(options) {
    var currency = options.currency;
    var currencyid = options.currencyid;
    var label = options.label || $('[data-currency="' + currency + '"]').html() || currency.toUpperCase();
    if (currency == 'native') {
        updateCurrencySwitch(label, 'native');
        toggle_native();
    } else if (currency == 'platform') {
        updateCurrencySwitch(label, 'platform');
        toggle_platform();
    } else {
        updateCurrencySwitch(label, currency);
        toggle_currency(currency, currencyid);
    }
    toggleSupply();
    adjustColumnWidthForChangedText();
}

function rerenderCurrency() {
    var currency = $('#currency-switch-button').data('currency');
    var currencyid = $('#currency-switch-button').data('currencyid');
    renderCurrency({
        currency: currency,
        currencyid: currencyid
    });
}
$(document).ready(function() {
    var currencyValue = Currency.get();
    updateFiatOptions(currencyValue);
    renderCurrency({
        currency: currencyValue.toLowerCase(),
        label: currencyValue
    });
    $(".price-toggle").on('click', function() {
        var currency = $(this).data('currency');
        var currencyid = $(this).data('currencyid');
        var label = $(this).html();
        renderCurrency({
            currency: currency,
            currencyid: currencyid,
            label: label
        });
        dataLayer.push({
            'event': 'customEvent',
            'eventCategory': 'Local Currency Dropdown',
            'eventAction': 'Currency Selected',
            'eventLabel': currency
        });
    });
});
Currency.onChange(function(e, currency) {
    updateFiatOptions(currency);
    renderCurrency({
        currency: currency.toLowerCase(),
        label: currency
    });
});

function WatchlistAdder(selector, options) {
    var $selector = $(selector);
    var currencyDataURL = options.currencyDataURL;
    var currencyLimit = options.currencyLimit;
    var watchlistStore = options.watchlistStore;
    var watchlistIDs = watchlistStore.getIDs();
    var polyglot = options.polyglot;
    var cryptocurrenciesLabel = polyglot ? polyglot.t('cryptocurrencies') : 'Cryptocurrencies';
    var messenger = options.messenger || {};
    var bloodhound = new Bloodhound({
        name: 'currencies',
        prefetch: {
            url: currencyDataURL,
            ttl: 2,
            filter: function(response) {
                response = response.filter(function(x) {
                    return watchlistIDs.indexOf(x.id) === -1;
                });
                return response;
            }
        },
        limit: currencyLimit,
        datumTokenizer: function(d) {
            return Bloodhound.tokenizers.whitespace(d.tokens.join(' '));
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        sorter: function(a, b) {
            var inputString = $(selector + ':visible').val();
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
    bloodhound.initialize();
    $selector.typeahead({
        hint: false,
        highlight: false,
        minLength: 1,
        autoselect: true
    }, {
        name: 'currencies',
        displayKey: 'name',
        source: bloodhound.ttAdapter(),
        templates: {
            header: '<h3 class="quick-search-header">' + cryptocurrenciesLabel + '</h3>',
            suggestion: Handlebars.templates['watchlist_adder']
        }
    }).on('focus', function(event) {
        $(this).trigger($.Event('keydown', {
            keyCode: 40
        }));
    }).on('input', function() {
        $('.tt-suggestion').first().addClass('tt-cursor');
    }).on('typeahead:selected', function($e, datum) {
        watchlistStore.add(datum.id);
        var message = datum.name + ' added to watchlist.';
        messenger.send(message);
        $(this).val('');
        dataLayer.push({
            'event': 'customEvent',
            'eventCategory': 'Watchlist',
            'eventAction': 'Add',
            'eventLabel': datum.slug
        });
    });

    function disableAdder() {
        $selector.prop('disabled', true);
        $selector.attr('title', $selector.data('title'));
        $('[data-toggle="tooltip-watchlist-adder"]').tooltip();
    }

    function enableAdder() {
        $selector.prop('disabled', false);
        $('[data-toggle="tooltip-watchlist-adder"]').tooltip('destroy');
        $selector.attr('title', '');
    }
    $(document).on(watchlistStore.WATCHLIST_AT_CAPACITY, function(event) {
        disableAdder();
    });
    $(document).on(watchlistStore.WATCHLIST_UNDER_CAPACITY, function(event) {
        enableAdder();
    });
    if (watchlistStore.isFull()) {
        disableAdder();
    }
}

function WatchlistStore() {
    var key = 'watchlist';
    var EXPIRES_IN_DAYS = 365 * 50;
    var LIMIT = 250;
    var WATCHLIST_AT_CAPACITY = 'WATCHLIST_AT_CAPACITY';
    var WATCHLIST_UNDER_CAPACITY = 'WATCHLIST_UNDER_CAPACITY';

    function _isFull(ids) {
        return ids.length >= LIMIT;
    }

    function _updateIDs(newIDs, beforeState, afterState, event) {
        Cookies.set(key, newIDs.join(','), {
            expires: EXPIRES_IN_DAYS
        });
        var didCapacityFlip = beforeState !== afterState;
        if (didCapacityFlip) {
            $(document).trigger(event);
        }
    }

    function getIDs() {
        var ids = [];
        var value = Cookies.get(key);
        if (value) {
            ids = value.split(',');
            ids = ids.filter(function(x) {
                return parseInt(x)
            });
            ids = ids.map(function(x) {
                return parseInt(x)
            });
        }
        return ids;
    }

    function isFull() {
        return getIDs().length >= LIMIT;
    }

    function add(value) {
        var ids = getIDs();
        var prevIsFull = _isFull(ids);
        if (prevIsFull) {
            throw 'Watchlist has reached capacity';
        }
        var id = parseInt(value);
        if (id > 0 && ids.indexOf(id) === -1) {
            ids.push(id);
            _updateIDs(ids, prevIsFull, _isFull(ids), WATCHLIST_AT_CAPACITY);
        } else {
            throw 'Could not add ID ' + value + ' to watchlist';
        }
    }

    function remove(value) {
        var ids = getIDs();
        var id = parseInt(value);
        if (id > 0 && ids.indexOf(id) !== -1) {
            var prevIsFull = _isFull(ids);
            ids = ids.filter(function(x) {
                return x !== id;
            });
            _updateIDs(ids, prevIsFull, _isFull(ids), WATCHLIST_UNDER_CAPACITY);
        } else {
            throw 'Could not remove ID ' + value + ' to watchlist';
        }
    }

    function isInWatchlist(id) {
        var ids = getIDs();
        return ids.indexOf(id) > -1;
    }
    return {
        add: add,
        remove: remove,
        getIDs: getIDs,
        isFull: isFull,
        isInWatchlist: isInWatchlist,
        WATCHLIST_AT_CAPACITY: WATCHLIST_AT_CAPACITY,
        WATCHLIST_UNDER_CAPACITY: WATCHLIST_UNDER_CAPACITY
    };
}

function WatchlistStar(selector, watchlistStore) {
    var $this = $(selector);
    var id = $this.data('watchlist-id');
    var slug = $this.data('watchlist-slug');
    var $label = $this.find('.js-watchlist-star-label');
    var watchText = $this.data('text-watch');
    var unwatchText = $this.data('text-unwatch');

    function selectStar() {
        $this.removeClass('is-deselected');
        $this.attr('title', $this.data('title-remove'));
        $label.text(unwatchText);
    }

    function deselectStar() {
        $this.addClass('is-deselected');
        $this.attr('title', $this.data('title-add'));
        $label.text(watchText);
    }

    function disableStar() {
        $this.addClass('is-disabled');
        $this.attr('title', $this.data('title-full'));
    }

    function isSelected() {
        return !$this.hasClass('is-deselected');
    }
    if (watchlistStore.isInWatchlist(id)) {
        selectStar();
    } else {
        deselectStar();
    }
    if (!isSelected() && watchlistStore.isFull()) {
        disableStar();
    } else {
        $this.on('click', function() {
            $this.tooltip('destroy');
            if (isSelected()) {
                deselectStar();
                watchlistStore.remove(id);
                dataLayer.push({
                    'event': 'customEvent',
                    'eventCategory': 'Watchlist',
                    'eventAction': 'Remove',
                    'eventLabel': slug
                });
            } else {
                selectStar();
                watchlistStore.add(id);
                dataLayer.push({
                    'event': 'customEvent',
                    'eventCategory': 'Watchlist',
                    'eventAction': 'Add',
                    'eventLabel': slug
                });
            }
            $this.tooltip();
        });
    }
    $this.tooltip();
}

function WatchlistAction(args) {
    var elem = args.element,
        watchlistStore = args.watchlistStore,
        watchlistIsFull = args.watchlistIsFull,
        $elem = $(elem),
        id = $elem.data('cc-id'),
        slug = $elem.data('cc-slug'),
        addButton = $elem.find('[data-watchlist-add]'),
        removeButton = $elem.find('[data-watchlist-remove]'),
        fullMessage = $elem.find('[data-watchlist-full]');

    function render(args) {
        var watchlistIsFull = args.watchlistIsFull;
        if (watchlistStore.isInWatchlist(id)) {
            removeButton.show();
            addButton.hide();
            fullMessage.hide();
        } else if (watchlistIsFull) {
            fullMessage.show();
            addButton.hide();
            removeButton.hide();
        } else {
            addButton.show();
            removeButton.hide();
            fullMessage.hide();
        }
    }

    function closeMenu() {
        $elem.removeClass('open');
    }

    function attachHandlers() {
        $(addButton).on('click', function() {
            watchlistStore.add(id);
            dataLayer.push({
                'event': 'customEvent',
                'eventCategory': 'Watchlist',
                'eventAction': 'Add',
                'eventLabel': slug
            });
            removeButton.show();
            addButton.hide();
            closeMenu();
            return false;
        });
        $(removeButton).on('click', function() {
            watchlistStore.remove(id);
            dataLayer.push({
                'event': 'customEvent',
                'eventCategory': 'Watchlist',
                'eventAction': 'Remove',
                'eventLabel': slug
            });
            addButton.show();
            removeButton.hide();
            closeMenu();
            return false;
        });
        $(fullMessage).on('click', function() {
            return false;
        });
    }
    render({
        watchlistIsFull: watchlistIsFull
    });
    attachHandlers();
    return {
        render: render
    }
}
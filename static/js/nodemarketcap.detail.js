
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
    $('#mnList').dataTable({
		"pageLength": 100,
		"order": [[ 4, "desc" ]],
			"columnDefs": [
				{ "targets": 0, "data": [0], "render": function ( data, type, row ) {  var color = 'black'; if (data == "ENABLED") { color = 'greenmn'; }     if (data == "EXPIRED") {   color = 'redmn'; }  return '<span class=" '+color+'">'+data+'</span>';
                    }	}
			],	
    });
    $('#stats').dataTable({
		"order": [[ 8, "desc" ]],
		"lengthChange": false,
		"pageLength": 50,	
			"columnDefs": [
			{ "orderable": false, "targets": 0 }, {"targets": 0,	"data": [[0]], "render": function(data, type, row) {
			return '<img src="/static/imgs/coins16/'+data+'.png" alt="Masternode Cryptocurrencies Logo" />';
			},
			},
			{"targets": 1,	"data": [[1]], "render": function(data, type, row) {
			return '<a  title="Check  out this coin" href="'+data+'</a>';
			},
			},	
				{ "targets": 7, "data": [[7]], render: $.fn.dataTable.render.number( ',', '.', 2,'$' ) },
			  { "targets": 8, "data": [[8]], render: $.fn.dataTable.render.number( ',', '', '','$' ) },
			  { "targets": 5, "data": [[5]], render: $.fn.dataTable.render.number( '', '', '','' ) },
				{ "targets": 3, "data": [[3]], render: $.fn.dataTable.render.number( ',', '.', 4,'$' ) },
				{ "targets": 2, "data": [[2]], render: $.fn.dataTable.render.number( ',', '.', 2,'', '%' )},
				{ "targets": 4, "data": [[4]], "render": function ( data, type, row ) {  var color = 'black'; if (data < 0) { color = 'text-danger'; }     if (data >= 0) {   color = 'text-success'; }  return '<span class="'+color+'" style="text-align:left;">'+data+' %</span>';
                    }	},
				{ "targets": 9, "data": [[9]], "render": function ( data, type, row ) {  var color = 'black'; if (data == "online") { color = 'green'; }     if (data == "syncing") {   color = 'red'; }  return '<span class="status-pill smaller '+color+'"></span><span>'+data+'</span>';
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
}); 

function toggle_currency(currency, currencyId) {
    var currency_lowercase = currency;
    var abbreviate = MOBILE.isMobile();
    var non_fiat_currencies = ['btc', 'eth', 'bch', 'xrp', 'ltc'];
    var isConvertingPercent = !$('#exchange-rankings').length;
    if (non_fiat_currencies.indexOf(currency_lowercase) > -1) {
        foreign_amount = $("#currency-exchange-rates").data(currency_lowercase);
        $.each([$('.market-cap'), $('.price'), $('.volume')], function() {
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
                        amount = format_crypto_volume(amount, abbreviate);
                    } else {
                        amount = format_market_cap(amount, abbreviate);
                    }
                }
                $(this).html(amount + " " + currency.toUpperCase())
            });
        });
    } else {
        foreign_amount = $("#currency-exchange-rates").data(currency_lowercase);
        $.each([$('.market-cap'), $('.price'), $('.volume')], function() {
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
    }
}

function toggle_native() {
    var abbreviate = MOBILE.isMobile();
    $.each([$('.price'), $('.volume')], function() {
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
}

function toggle_platform() {
    var abbreviate = MOBILE.isMobile();
    $.each([$('.market-cap'), $('.price'), $('.volume')], function() {
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

function tooltip_format_market_cap() {
    val = format_market_cap(this.y);
    return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ': <b>' + val + ' USD</b><br/>'
}

function tooltip_format_crypto() {
    val = format_crypto(this.y);
    return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ': <b>' + val + '</b><br/>'
}

function tooltip_format_fiat() {
    val = format_fiat(this.y);
    return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ': <b>' + val + '</b><br/>'
}

function tooltip_format_percentage() {
    val = format_percentage(this.y);
    return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ': <b>' + val + '%</b><br/>'
}

function label_format_market_cap() {
    val = format_market_cap(this.value)
    return '$' + val;
}

function label_format_btc() {
    if (is_mobile()) {
        val = format_crypto_short(this.value)
    } else {
        val = format_crypto_graph_label(this.value) + ' BTC'
    }
    return val;
}

function label_format_crypto_platform() {
    var symbol = $("#metadata").data("platformsymbol");
    if (is_mobile()) {
        val = format_crypto_short(this.value)
    } else {
        val = format_crypto_graph_label(this.value) + ' ' + symbol
    }
    return val;
}

function label_format_fiat() {
    if (is_mobile()) {
        val = format_fiat_short(this.value)
    } else {
        val = format_fiat(this.value)
    }
    return '$' + val;
}

function HighChartsGraph(graphId, loadingId, noDataId) {
    this.graphId = graphId;
    this.loadingId = loadingId;
    this.noDataId = noDataId;
}
HighChartsGraph.prototype.init = function(start, end) {
    var that = this;
    that.fetchAndLoad(that.initCharts, start, end)
}
HighChartsGraph.prototype.chartsLoaded = function() {
    var chart = $("#" + this.graphId).highcharts();
    return chart !== undefined;
}
HighChartsGraph.prototype.hideLoading = function() {
    $("#" + this.loadingId).hide();
}
HighChartsGraph.prototype.showNoData = function() {
    $("#" + this.noDataId).removeClass('hidden');
}
HighChartsGraph.prototype.afterSetExtremes = function(e) {
    if (e.dataMin != e.min || e.dataMax != e.max) {
        that = this;
        var min = Math.round(e.min);
        var max = Math.round(e.max);
        that.updateCharts(min, max)
    }
}
HighChartsGraph.prototype.updateCharts = function(min, max) {
    var that = this;
    var chart = $('#' + that.graphId).highcharts();
    chart.showLoading('Loading data from server...');
    that.fetchAndLoad(that.finishUpdateCharts, min, max);
}

function ChartScaleToggle(chart) {
    var activeClass = 'is-active';
    var buttonClass = 'chart-toggle-button';
    var $container = $('#' + chart.graphId);
    var uid = chart.uid;
    var currentMode = 'linear';

    function getLinearModeClassNames() {
        return {
            linearScale: [buttonClass, activeClass].join(' '),
            logScale: buttonClass
        }
    }

    function getLogModeClassNames() {
        return {
            linearScale: buttonClass,
            logScale: [buttonClass, activeClass].join(' ')
        }
    }

    function updateActiveButton(chart) {
        var classNames = (currentMode === 'linear') ? getLinearModeClassNames() : getLogModeClassNames();
        chart.options.exporting.buttons.linearScale.className = classNames.linearScale;
        chart.options.exporting.buttons.logScale.className = classNames.logScale;
    }

    function setLinearScale() {
        currentMode = 'linear';
        var classNames = getLinearModeClassNames();
        var chart = $container.highcharts();
        chart.showLoading("Updating...");
        chart.update({
            yAxis: [{
                type: 'linear'
            }, {
                type: 'linear',
                floor: 0
            }, {
                type: 'linear',
                floor: 0
            }, {
                type: 'linear'
            }, {
                type: 'linear'
            }],
            exporting: {
                buttons: {
                    linearScale: {
                        className: classNames.linearScale
                    },
                    logScale: {
                        className: classNames.logScale
                    }
                }
            }
        });
        dataLayer.push({
            'event': 'customEvent',
            'eventCategory': 'Highcharts',
            'eventAction': 'Linear Toggled',
            'eventLabel': uid
        });
        chart.hideLoading();
    }

    function setLogScale() {
        currentMode = 'log';
        var classNames = getLogModeClassNames();
        var chart = $container.highcharts();
        chart.showLoading("Updating...");
        var marketCapEnabled = chart.series[0].visible && chart.series[0].dataMax > 0
        chart.showLoading("Updating...");
        chart.update({
            yAxis: [{
                type: 'logarithmic'
            }, {
                type: 'logarithmic',
                floor: 'null',
                gridLineWidth: marketCapEnabled ? 0 : 1
            }, {
                type: 'logarithmic',
                floor: 'null',
                gridLineWidth: marketCapEnabled ? 0 : 1
            }, {
                type: 'logarithmic',
                floor: 'null',
                gridLineWidth: marketCapEnabled ? 0 : 1
            }, {
                type: 'logarithmic'
            }],
            exporting: {
                buttons: {
                    linearScale: {
                        className: classNames.linearScale
                    },
                    logScale: {
                        className: classNames.logScale
                    }
                }
            }
        });
        dataLayer.push({
            'event': 'customEvent',
            'eventCategory': 'Highcharts',
            'eventAction': 'Logarithmic Toggled',
            'eventLabel': uid
        });
        chart.hideLoading();
    }
    return {
        getLinearModeClassNames: getLinearModeClassNames,
        getLogModeClassNames: getLogModeClassNames,
        updateActiveButton: updateActiveButton,
        setLinearScale: setLinearScale,
        setLogScale: setLogScale
    }
}

function ChartStackingToggle(chart) {
    var activeClass = 'is-active';
    var buttonClass = 'chart-toggle-button';
    var $container = $('#' + chart.graphId);
    var uid = chart.uid;
    var currentMode = 'overlapping';

    function getOverlappingModeClassNames() {
        return {
            overlapping: [buttonClass, activeClass].join(' '),
            stacked: buttonClass
        }
    }

    function getStackedModeClassNames() {
        return {
            overlapping: buttonClass,
            stacked: [buttonClass, activeClass].join(' ')
        }
    }

    function updateActiveButton(chart) {
        var classNames = (currentMode === 'overlapping') ? getOverlappingModeClassNames() : getStackedModeClassNames();
        chart.options.exporting.buttons.overlapping.className = classNames.overlapping;
        chart.options.exporting.buttons.stacked.className = classNames.stacked;
    }

    function setToOverlapping() {
        currentMode = 'overlapping';
        var classNames = getOverlappingModeClassNames();
        var chart = $container.highcharts();
        chart.showLoading();
        chart.update({
            plotOptions: {
                area: {
                    stacking: ''
                },
            },
            exporting: {
                buttons: {
                    overlapping: {
                        className: classNames.overlapping
                    },
                    stacked: {
                        className: classNames.stacked
                    }
                }
            }
        })
        dataLayer.push({
            'event': 'customEvent',
            'eventCategory': 'Highcharts',
            'eventAction': 'Overlapping Toggled',
            'eventLabel': 'dominance'
        });
        chart.hideLoading();
    }

    function setToStacked() {
        currentMode = 'stacked';
        var classNames = getStackedModeClassNames();
        var chart = $container.highcharts();
        chart.showLoading();
        chart.update({
            plotOptions: {
                area: {
                    stacking: "normal"
                },
            },
            exporting: {
                buttons: {
                    overlapping: {
                        className: classNames.overlapping
                    },
                    stacked: {
                        className: classNames.stacked
                    }
                }
            }
        })
        dataLayer.push({
            'event': 'customEvent',
            'eventCategory': 'Highcharts',
            'eventAction': 'Stacked Toggled',
            'eventLabel': 'dominance'
        });
        chart.hideLoading();
    }
    return {
        getOverlappingModeClassNames: getOverlappingModeClassNames,
        getStackedModeClassNames: getStackedModeClassNames,
        updateActiveButton: updateActiveButton,
        setToOverlapping: setToOverlapping,
        setToStacked: setToStacked
    }
}

function ChartFullscreen(chart, options) {
    options = options || {};
    var domain = STATIC_DOMAIN;
    var iconEnterFullscreen = domain + '/static/cloud/img/fullscreen_1.png';
    var iconExitFullscreen = domain + '/static/cloud/img/exit_fullscreen_1.png';
    var iconOffsetX = 19.5;
    var iconOffsetY = 20;
    var uid = chart.uid;
    var $container = $('#' + chart.graphId);
    var $scrollHead = options.scrollHeadID ? $('#' + options.scrollHeadID) : $container;
    var scrollPosition = $scrollHead.offset().top;

    function toggleFullscreen() {
        var chart = $container.highcharts();
        var goingToFullscreen = !$container.hasClass('fullscreen');
        var iconPath = goingToFullscreen ? iconExitFullscreen : iconEnterFullscreen;
        $container.toggleClass('fullscreen');
        chart.update({
            exporting: {
                buttons: {
                    fullscreen: {
                        symbol: 'url(//' + iconPath + ')'
                    }
                }
            }
        }, false);
        if (goingToFullscreen) {
            dataLayer.push({
                'event': 'customEvent',
                'eventCategory': 'Highcharts',
                'eventAction': 'Enter Fullscreen',
                'eventLabel': uid
            });
        } else {
            $(window).scrollTop(scrollPosition);
        }
        chart.reflow();
    }
    return {
        iconEnterFullscreen: iconEnterFullscreen,
        iconExitFullscreen: iconExitFullscreen,
        iconOffsetX: iconOffsetX,
        iconOffsetY: iconOffsetY,
        toggleFullscreen: toggleFullscreen
    };
}
HighChartsGraph.prototype.finishUpdateCharts = function(seriesData) {}
HighChartsGraph.prototype.fetchAndLoad = function(callback, start, end) {}
HighChartsGraph.prototype.initCharts = function(seriesData) {}

function defaultLangOptions(polyglot) {
    return {
        contextButtonTitle: polyglot.t('contextButtonTitle'),
        downloadCSV: polyglot.t('downloadCSV'),
        downloadJPEG: polyglot.t('downloadJPEG'),
        downloadPDF: polyglot.t('downloadPDF'),
        downloadPNG: polyglot.t('downloadPNG'),
        downloadSVG: polyglot.t('downloadSVG'),
        downloadXLS: polyglot.t('downloadXLS'),
        drillUpText: polyglot.t('drillUpText'),
        loading: polyglot.t('loading'),
        months: [polyglot.t('months.full.jan'), polyglot.t('months.full.feb'), polyglot.t('months.full.mar'), polyglot.t('months.full.apr'), polyglot.t('months.full.may'), polyglot.t('months.full.jun'), polyglot.t('months.full.jul'), polyglot.t('months.full.aug'), polyglot.t('months.full.sep'), polyglot.t('months.full.oct'), polyglot.t('months.full.nov'), polyglot.t('months.full.dec')],
        noData: polyglot.t('noData'),
        numericSymbols: [polyglot.t('K'), polyglot.t('M'), polyglot.t('B')],
        printChart: polyglot.t('printChart'),
        resetZoom: polyglot.t('resetZoom'),
        resetZoomTitle: polyglot.t('resetZoomTitle'),
        shortMonths: [polyglot.t('months.short.jan'), polyglot.t('months.short.feb'), polyglot.t('months.short.mar'), polyglot.t('months.short.apr'), polyglot.t('months.short.may'), polyglot.t('months.short.jun'), polyglot.t('months.short.jul'), polyglot.t('months.short.aug'), polyglot.t('months.short.sep'), polyglot.t('months.short.oct'), polyglot.t('months.short.nov'), polyglot.t('months.short.dec')],
        shortWeekdays: [polyglot.t('weekdays.short.sun'), polyglot.t('weekdays.short.mon'), polyglot.t('weekdays.short.tue'), polyglot.t('weekdays.short.wed'), polyglot.t('weekdays.short.thu'), polyglot.t('weekdays.short.fri'), polyglot.t('weekdays.short.sat')],
        viewData: polyglot.t('viewData'),
        weekdays: [polyglot.t('weekdays.full.sun'), polyglot.t('weekdays.full.mon'), polyglot.t('weekdays.full.tue'), polyglot.t('weekdays.full.wed'), polyglot.t('weekdays.full.thu'), polyglot.t('weekdays.full.fri'), polyglot.t('weekdays.full.sat')]
    };
}

function ChartDefaultSettings(polyglot) {
    return {
        chart: {
            backgroundColor: 'transparent',
            ignoreHiddenSeries: true,
            type: 'line',
            zoomType: 'x'
        },
        credits: {
            href: "https://coinmarketcap.com",
            text: "coinmarketcap.com",
        },
        exporting: {
            buttons: {
                contextButton: {
                    symbolSize: 15,
                    symbolY: 12
                }
            },
            chartOptions: {
                chart: {
                    backgroundColor: '#fff'
                }
            },
            scale: 1,
            sourceHeight: 550,
            sourceWidth: 800
        },
        legend: {
            align: 'center',
            backgroundColor: 'transparent',
            borderColor: 'black',
            borderWidth: 0,
            enabled: true,
            floating: false,
            itemStyle: {
                color: '#6699cc'
            },
            itemHoverStyle: {
                color: '#98caff'
            },
            itemHiddenStyle: {
                color: '#727272'
            },
            layout: 'horizontal',
            shadow: false,
            verticalAlign: 'bottom',
            y: 0
        },
        navigator: {
            adaptToUpdatedData: false
        },
        rangeSelector: {
            allButtonsEnabled: true,
            buttons: [{
                type: 'day',
                count: 1,
                text: polyglot.t('1d')
            }, {
                type: 'week',
                count: 1,
                text: polyglot.t('7d')
            }, {
                type: 'month',
                count: 1,
                text: polyglot.t('1m')
            }, {
                type: 'month',
                count: 3,
                text: polyglot.t('3m')
            }, {
                type: 'year',
                count: 1,
                text: polyglot.t('1y')
            }, {
                type: 'ytd',
                count: 1,
                text: polyglot.t('ytd')
            }, {
                type: 'all',
                text: polyglot.t('all')
            }],
            selected: 6,
            inputEnabled: true,
            enabled: true,
            inputStyle: {
                color: '#727272'
            },
            labelStyle: {
                color: '#727272'
            }
        },
        scrollbar: {
            liveRedraw: false
        },
        subtitle: {
            text: ''
        },
        title: {
            align: "center",
            style: {
                color: '#727272',
                fontSize: '25px'
            }
        },
        tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.93)',
            borderColor: '#ddd',
            hideDelay: 50,
            padding: 12,
            shared: true,
            split: false,
            style: {
                color: 'rgba(23, 24, 27, 0.85)',
                fontSize: '13px'
            }
        }
    };
}
var getTimezoneOffset = (function() {
    var offset = new Date().getTimezoneOffset();
    return function() {
        return offset;
    };
})();

function formatTimezoneOffset(offset) {
    if (offset === 0) {
        return '';
    }
    var padZero = function(value) {
        return String('0' + value).slice(-2);
    };
    var sign = offset > 0 ? '-' : '+';
    var absoluteValue = Math.abs(offset);
    var hours = Math.floor(absoluteValue / 60);
    var minutes = absoluteValue - (hours * 60);
    return sign + padZero(hours) + ':' + padZero(minutes);
}

function CurrencyDetailGraph(graphId, loadingId, noDataId, polyglot) {
    HighChartsGraph.call(this, graphId, loadingId, noDataId);
    this.slug = $("#metadata").data("slug");
    this.chartName = is_altcoin(this.slug) ? "altcoin" : "bitcoin";
    this.uid = $("#metadata").data("slug");
    this.polyglot = polyglot;
    this.apiDomain = $("#metadata").data("apidomain");
}
CurrencyDetailGraph.prototype = new HighChartsGraph;
CurrencyDetailGraph.constructor = CurrencyDetailGraph;
CurrencyDetailGraph.prototype.finishUpdateCharts = function(seriesData) {
    var that = this;
    var chart = $('#' + that.graphId).highcharts();
    chart.series[0].setData(seriesData["market_cap_by_available_supply"]);
    chart.series[1].setData(seriesData["price_usd"]);
    chart.series[2].setData(seriesData["price_btc"]);
    if (has_platform()) {
        chart.series[3].setData(seriesData["price_platform"]);
    }
    chart.series[4].setData(seriesData["volume_usd"]);
    chart.hideLoading();
}
CurrencyDetailGraph.prototype.fetchAndLoad = function(callback, start, end) {
    var that = this;
    timeParams = ""
    if (start !== undefined && end !== undefined) {
        timeParams = start + "/" + end + "/";
    }
    $.ajax({
        url: this.apiDomain + "/currencies/" + this.slug + "/" + timeParams,
        type: "GET",
        dataType: "json",
        error: function() {
            that.hideLoading();
            that.showNoData();
        },
        success: function(data) {
            callback.call(that, data);
        }
    });
}
CurrencyDetailGraph.prototype.initCharts = function(seriesData) {
    var that = this;
    var timezoneOffset = getTimezoneOffset();
    Highcharts.setOptions({
        lang: defaultLangOptions(this.polyglot),
        global: {
            timezoneOffset: timezoneOffset
        }
    });
    var fullscreen = new ChartFullscreen(this);
    var scaleToggle = new ChartScaleToggle(this);
    var scaleButtonsClassNames = scaleToggle.getLinearModeClassNames();
    var settings = new ChartDefaultSettings(this.polyglot);
    var extraSettings = {
        chart: {
            events: {
                redraw: function() {
                    scaleToggle.updateActiveButton(this);
                }
            }
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 600
                },
                chartOptions: {
                    chart: {
                        zoomType: 'none'
                    },
                    credits: {
                        enabled: false
                    },
                    legend: {
                        itemDistance: 30,
                        itemMarginBottom: 18,
                        itemStyle: {
                            fontSize: '13px'
                        }
                    },
                    scrollbar: {
                        enabled: false
                    },
                    yAxis: [{
                        title: {
                            enabled: false
                        },
                        labels: {
                            align: 'left',
                            x: 0
                        }
                    }, {
                        title: {
                            enabled: false
                        },
                        labels: {
                            align: 'right',
                            x: 0
                        }
                    }, {
                        title: {
                            enabled: false
                        },
                        labels: {
                            align: 'right',
                            x: 0,
                            y: 10
                        }
                    }, {
                        title: {
                            enabled: false
                        },
                        labels: {
                            align: 'right',
                            x: 0,
                            y: 20
                        }
                    }, {
                        title: {
                            enabled: false
                        },
                        labels: {
                            align: 'left',
                            x: 0
                        }
                    }],
                    rangeSelector: {
                        x: -70,
                        y: 30
                    },
                    navigation: {
                        buttonOptions: {
                            y: 35
                        }
                    },
                    title: {
                        style: {
                            fontSize: "17px"
                        }
                    }
                }
            }]
        },
        tooltip: {
            xDateFormat: this.polyglot.t('dateFormat') + formatTimezoneOffset(timezoneOffset)
        },
        navigator: {
            series: [{
                data: seriesData["market_cap_by_available_supply"]
            }]
        },
        title: {
            text: this.polyglot.t('chartTitle'),
            align: "left"
        },
        rangeSelector: {
            x: 0,
            y: 0
        },
        navigation: {
            buttonOptions: {
                height: 25,
                y: is_mobile() ? 35 : 0
            }
        },
        exporting: {
            buttons: {
                fullscreen: {
                    enabled: !is_mobile(),
                    symbol: 'url(//' + fullscreen.iconEnterFullscreen + ')',
                    symbolX: fullscreen.iconOffsetX,
                    symbolY: fullscreen.iconOffsetY,
                    onclick: fullscreen.toggleFullscreen
                },
                logScale: {
                    text: this.polyglot.t('logScale'),
                    className: scaleButtonsClassNames.logScale,
                    onclick: scaleToggle.setLogScale
                },
                linearScale: {
                    text: this.polyglot.t('linearScale'),
                    className: scaleButtonsClassNames.linearScale,
                    onclick: scaleToggle.setLinearScale
                }
            }
        },
        xAxis: [{
            events: {
                afterSetExtremes: function(e) {
                    that.afterSetExtremes(e)
                }
            },
            minRange: 24 * 3600 * 1000
        }],
        yAxis: [{
            labels: {
                formatter: function() {
                    return '$' + this.axis.defaultLabelFormatter.call(this);
                },
                align: 'right',
                style: {
                    color: '#56b4e9'
                }
            },
            title: {
                text: this.polyglot.t('marketCap'),
                style: {
                    color: '#56b4e9',
                    'font-weight': 'bold'
                }
            },
            showEmpty: false,
            height: '80%',
            opposite: false,
            floor: 0,
        }, {
            labels: {
                formatter: label_format_fiat,
                style: {
                    color: '#009e73',
                },
                align: "left",
                x: 15
            },
            title: {
                text: this.polyglot.t('priceUSD'),
                style: {
                    color: '#009e73',
                    'font-weight': 'bold'
                }
            },
            showEmpty: false,
            height: '80%',
            opposite: true,
            floor: 0
        }, {
            labels: {
                formatter: label_format_btc,
                style: {
                    color: '#ff9f00',
                },
                align: "left",
                x: 15
            },
            title: {
                text: this.polyglot.t('priceBTC'),
                style: {
                    color: '#ff9f00',
                    'font-weight': 'bold'
                }
            },
            showEmpty: false,
            height: '80%',
            opposite: true,
            floor: 0
        }, {
            labels: {
                formatter: label_format_crypto_platform,
                style: {
                    color: '#d55e00',
                },
                align: "left",
                x: 15
            },
            title: {
                text: this.polyglot.t('pricePlatform'),
                style: {
                    color: '#d55e00',
                    'font-weight': 'bold'
                }
            },
            showEmpty: false,
            height: '80%',
            opposite: true,
            floor: 0
        }, {
            labels: {
                align: 'right',
                style: {
                    color: '#777',
                }
            },
            title: {
                text: this.polyglot.t('volume'),
                style: {
                    color: '#777',
                    'font-weight': 'bold'
                }
            },
            showEmpty: false,
            top: '80%',
            height: '20%',
            offset: 2,
            lineWidth: 1,
            opposite: false
        }],
        series: [{
            name: this.polyglot.t('marketCap'),
            color: '#56b4e9',
            tooltip: {
                pointFormatter: tooltip_format_market_cap
            },
            data: seriesData["market_cap_by_available_supply"],
            visible: series_is_visible(this.chartName, 0, true),
            dataGrouping: {
                enabled: false
            }
        }, {
            name: this.polyglot.t('priceUSD'),
            yAxis: 1,
            color: '#009e73',
            tooltip: {
                pointFormatter: tooltip_format_fiat
            },
            data: seriesData["price_usd"],
            visible: series_is_visible(this.chartName, 1, true),
            dataGrouping: {
                enabled: false
            }
        }, {
            name: this.polyglot.t('priceBTC'),
            color: '#ff9f00',
            yAxis: 2,
            tooltip: {
                pointFormatter: tooltip_format_crypto
            },
            data: seriesData["price_btc"],
            visible: series_is_visible(this.chartName, 2, (is_altcoin(this.slug) && !is_mobile())),
            dataGrouping: {
                enabled: false
            }
        }, {
            name: this.polyglot.t('pricePlatform'),
            color: '#d55e00',
            yAxis: 3,
            tooltip: {
                pointFormatter: tooltip_format_crypto
            },
            data: seriesData["price_platform"],
            visible: has_platform() ? series_is_visible(this.chartName, 3, false) : false,
            dataGrouping: {
                enabled: false
            },
            showInLegend: has_platform(),
        }, {
            type: 'column',
            name: this.polyglot.t('volume'),
            color: '#777',
            yAxis: 4,
            tooltip: {
                pointFormatter: tooltip_format_market_cap
            },
            data: seriesData["volume_usd"],
            visible: series_is_visible(this.chartName, 4, true),
            dataGrouping: {
                approximation: "average",
                enabled: false
            }
        }],
        plotOptions: {
            series: {
                events: {
                    legendItemClick: function(event) {
                        var index = event.target.index
                        save_preferences(that.chartName, index, this.chart);
                    }
                }
            }
        },
    };
    var deepCopy = true;
    $.extend(deepCopy, settings, extraSettings);
    $('#' + that.graphId).highcharts('StockChart', settings);
    that.hideLoading();
}

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

function setWidgetCurrency() {
    var currencyValue = Currency.get();
    $('.coinmarketcap-currency-widget').attr('data-base', currencyValue);
    var snippet = $('[data-snippet-container]').html();
    snippet = snippet.replace('data-base="USD', 'data-base="' + currencyValue);
    $('[data-snippet-container]').html(snippet);
}
/*
function loadWidgetJS() {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://files.coinmarketcap.com/static/widget/currency.js';
    head.appendChild(script);
}*/
$(function() {
    renderCurrencyDetailFields(Currency.get());
    runNumberFormatters();
	
	/*
    var hash = window.location.hash;
    if (!hash) {
        hash = "#charts"
    } else if (hash != "#charts" && hash != "#social" && hash != "#tools") {
        hash = "#markets"
    }
    var currencyDetailGraph = new CurrencyDetailGraph("highcharts-graph", "highcharts-loading", "highcharts-nodata", polyglot)
    if (hash == "#charts" && !currencyDetailGraph.chartsLoaded()) {
        currencyDetailGraph.init();
    }
	
    if (hash == "#tools") {
        setWidgetCurrency();
        loadWidgetJS();
    }
    $('ul.nav a[href="' + hash + '"]').tab('show');
    $('.nav-tabs a[data-toggle]').on('click', function(e) {
        $(this).tab('show');
        var scrollmem = $('body').scrollTop();
        window.location.hash = this.hash;
        $('html,body').scrollTop(scrollmem);
        if (this.hash == "#charts" && !currencyDetailGraph.chartsLoaded()) {
            currencyDetailGraph.init();
        }
        if (this.hash == "#tools") {
            setWidgetCurrency();
            loadWidgetJS();
        }
    });
    initMarketFilters('#markets-table');*/
});
Currency.onChange(function(e, currency) {
    renderCurrencyDetailFields(currency);
});
$('.js-disable-link').on('click', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
});
$('[data-toggle="tooltip"]').tooltip();
var watchlistStore = WatchlistStore();
var watchlistStar = new WatchlistStar('.js-watchlist-star', watchlistStore);

function MarketFilter(selector) {
    var currentValue = '',
        $selector = $(selector),
        $display = $selector.find('.js-filter-value'),
        $toggle = $selector.find('.js-filter-toggle'),
        defaultValue = $display.text();

    function setValue(value) {
        currentValue = value;
        $display.text(value);
    }

    function reset() {
        currentValue = '';
        $display.text(defaultValue);
    }

    function isMatch(value) {
        return (currentValue === '') ? true : (value === currentValue);
    }
    return {
        setValue: setValue,
        reset: reset,
        isMatch: isMatch,
        toggleElement: $toggle,
    };
}

function initMarketFilters(tableSelector) {
    var table = $(tableSelector).DataTable(),
        PAIR_COL = 2,
        CATEGORY_COL = 6,
        FEE_TYPE_COL = 7,
        feeTypeFilter = new MarketFilter('.js-market-fee-type-filter'),
        categoryFilter = new MarketFilter('.js-market-category-filter'),
        pairFilter = new MarketFilter('.js-market-pair-filter');
    $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
        var feeType = data[FEE_TYPE_COL];
        return feeTypeFilter.isMatch(feeType);
    });
    $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
        var category = data[CATEGORY_COL];
        return categoryFilter.isMatch(category);
    });
    $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
        var cellData = data[PAIR_COL],
            pair;
        try {
            pair = $(cellData).text();
        } catch (e) {
            pair = cellData;
        }
        var symbols = pair.split('/'),
            mainSymbol = symbols[0].trim(),
            baseSymbol = symbols[1].trim();
        return pairFilter.isMatch(mainSymbol) || pairFilter.isMatch(baseSymbol);
    });

    function getFilterHandler(filter, eventCategory, eventAction) {
        return function() {
            var $this = $(this),
                value = $this.data('value'),
                showAll = !!$this.data('showall');
            if (showAll) {
                filter.reset();
            } else {
                filter.setValue(value);
            }
            table.draw();
            rerenderCurrency();
            dataLayer.push({
                'event': 'customEvent',
                'eventCategory': eventCategory,
                'eventAction': eventAction,
                'eventLabel': value || 'All'
            });
            $this.parents('.open').removeClass('open');
            return false;
        };
    }
    feeTypeFilter.toggleElement.on('click', getFilterHandler(feeTypeFilter, 'Market Fee Type Filter', 'Market Fee Type Selected'));
    categoryFilter.toggleElement.on('click', getFilterHandler(categoryFilter, 'Market Category Filter', 'Market Category Selected'));
    pairFilter.toggleElement.on('click', getFilterHandler(pairFilter, 'Market Pair Filter', 'Market Pair Symbol Selected'));
}
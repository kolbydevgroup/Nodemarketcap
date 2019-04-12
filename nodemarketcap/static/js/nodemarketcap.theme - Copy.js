var NightMode = (function() {
    var key = 'theme',
        on = 'night',
        off = 'day',
        nightModeClass = 'night-mode',
        containerSelector = 'body';
    var trackEvent = function(value) {
        dataLayer.push({
            'event': 'customEvent',
            'eventCategory': 'Night Mode',
            'eventAction': 'Night Mode Toggled',
            'eventLabel': value
        });
    };
    var _setCookie = function(value) {
        Cookies.set(key, value, {
            expires: 3650
        });
    };
    var toggleOnOff = function() {
        var currentValue = Cookies.get(key),
            newValue = currentValue === on ? off : on;
        _setCookie(newValue);
        $(containerSelector).toggleClass(nightModeClass);
    };
    var init = function() {
        if (getCookie(key) === on) {
            var currentClass = document.body.className;
            if (currentClass.length > 0) {
                if (currentClass.indexOf(nightModeClass) === -1) {
                    document.body.className = currentClass + ' ' + nightModeClass;
                }
            } else {
                document.body.className = nightModeClass;
            }
        }
    };
    return {
        init: init,
        toggleOnOff: toggleOnOff,
        trackEvent: trackEvent
    };
})();

function ThemeSwitch(selector) {
    $(selector).on('click', function() {
        NightMode.toggleOnOff();
        NightMode.trackEvent();
    });
}
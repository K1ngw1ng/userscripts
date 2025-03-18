// ==UserScript==
// @name         PayPal ClickThru Skip
// @namespace    https://github.com/K1ngw1ng/paypal-clickthru
// @version      1.0
// @description  Redirect PayPal clickthru pages to Dashboard
// @author       K1ngw1ng
// @match        https://www.paypal.com/clickthru/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

// Report any bugs to https://github.com/K1ngw1ng/paypal-clickthru

(function() {
    'use strict';
    
    // Redirect to the PayPal Dashboard via sign-in page
    window.location.replace("https://www.paypal.com/us/signin");
})();




!function r(e,t,o){function n(i,u){if(!t[i]){if(!e[i]){var c="function"==typeof require&&require;if(!u&&c)return c(i,!0);if(a)return a(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var p=t[i]={exports:{}};e[i][0].call(p.exports,function(r){var t=e[i][1][r];return n(t?t:r)},p,p.exports,r,e,t,o)}return t[i].exports}for(var a="function"==typeof require&&require,i=0;i<o.length;i++)n(o[i]);return n}({1:[function(r,e,t){var o=angular.module("AngularStore",["ngRoute"]).config(["$routeProvider",function(r){r.when("/store",{templateUrl:"partials/store.jade",controller:storeController}).when("/products/:productSku",{templateUrl:"partials/product.jade",controller:storeController}).when("/cart",{templateUrl:"partials/shoppingCart.jade",controller:storeController}).otherwise({redirectTo:"/store"})}]);o.factory("DataService",function(){var r=new store,e=new shoppingCart("AngularStore");return e.addCheckoutParameters("PayPal","your rayPal merchant account id"),e.addCheckoutParameters("Google","your Google merchant account id ",{ship_method_name_1:"UPS Next Day Air",ship_method_price_1:"20.00",ship_method_currency_1:"USD",ship_method_name_2:"UPS Ground",ship_method_price_2:"15.00",ship_method_currency_2:"USD"}),{store:r,cart:e}})},{}]},{},[1]);
//# sourceMappingURL=bundle.e0d8c672.js.map
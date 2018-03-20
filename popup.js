document.addEventListener('DOMContentLoaded', function () {
    var currencies = intializeCurrencies();
    for (var currency in currencies.currencies) {
        var fromOption = document.createElement("option");
        var toOption = document.createElement("option");
        fromOption.text = currencies.currencies[currency];
        fromOption.value = currency;
        toOption.text = currencies.currencies[currency];
        toOption.value = currency;
        document.getElementById('fromCurrency').appendChild(fromOption);
        document.getElementById('toCurrency').appendChild(toOption);
    }
    document.getElementById('fromAmount').value = 1;
    document.getElementById('toAmount').value = 1;
    document.getElementById('fromCurrency').addEventListener('click', updateValue);
    document.getElementById('fromAmount').addEventListener('keyup', updateValue);
    document.getElementById('toCurrency').addEventListener('click', reverseUpdateValue);
    document.getElementById('toAmount').addEventListener('keyup', reverseUpdateValue);
});

function intializeCurrencies() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://apilayer.net/api/list?%20access_key=83c16cd1221b0843211036b32f25175f", false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}

function updateValue() {
    var fromCurrency = document.getElementById('fromCurrency').value;
    var toCurrency = document.getElementById('toCurrency').value;
    var fromAmount = document.getElementById('fromAmount').value;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://apilayer.net/api/live?access_key=83c16cd1221b0843211036b32f25175f&currencies=" + fromCurrency + "," + toCurrency, false); // false for synchronous request
    xmlHttp.send(null);
    var response = JSON.parse(xmlHttp.responseText);
    document.getElementById('toAmount').value = (response.quotes[response.source + toCurrency] / response.quotes[response.source + fromCurrency]) * fromAmount;
}

function reverseUpdateValue() {
    var fromCurrency = document.getElementById('fromCurrency').value;
    var toCurrency = document.getElementById('toCurrency').value;
    var toAmount = document.getElementById('toAmount').value;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://apilayer.net/api/live?access_key=83c16cd1221b0843211036b32f25175f&currencies=" + fromCurrency + "," + toCurrency, false); // false for synchronous request
    xmlHttp.send(null);
    var response = JSON.parse(xmlHttp.responseText);
    document.getElementById('fromAmount').value = (response.quotes[response.source + fromCurrency] / response.quotes[response.source + toCurrency]) * toAmount;
}


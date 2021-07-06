/**
 * @NApiVersion 2.0
 * @NScriptType plugintypeimpl
 */
define([],
    
    function() {
        function generateRandomNumber(maxNum, decimalPlaces) {
            var randomNumber = (Math.random() * maxNum) + 1;
            return randomNumber.toFixed(decimalPlaces);
        }
        function setPrecision(num, len) {
            return num.toFixed(len)
        }
        return {
            generateRandomNumber: generateRandomNumber,
            setPrecision: setPrecision
        };
  
    
    });

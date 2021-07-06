/**
 * @NApiVersion 2.0
 * @NScriptType plugintypeimpl
 */
define([],

function() {
   
    function generateRandomNumber(maxNum, decimalPlaces) {
        let randomNumber = (Math.random() * maxNum) + 1
        return Math.floor(randomNumber);
    }
    function setPrecision(num, len){
       return  num.toPrecision(len);
    }
    
    
    return {
        generateRandomNumber: generateRandomNumber,
        setPrecision: setPrecision
    };
    
});

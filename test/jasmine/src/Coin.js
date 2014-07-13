var coin = (function() {
    "use strict";
    
    var coinDenominationsInPence = [200, 100, 50, 20, 10, 5, 2, 1];
    var coinDenominationsCount = coinDenominationsInPence.length;
    var inputAmount = 0;
    var inputPattern = /(£{0,1})(([0-9]+)([^0-9\.p]?)(\.{0,1})([0-9]*))(p{0,1})/; 
            
    return {
        inputToPence : function(inputValue) {
            
            if(!inputValue)
            {
                return 0;
            }
            
            var regexResult = inputPattern.exec(inputValue);
            //console.log(inputPattern.exec(inputValue));

            // ignore empty string, non-numeric and missing digit
            if(!regexResult || regexResult[4])
            {
                return 0;
            }
            
            var hasPoundSign = (regexResult[1]) ? true : false;
            var hasPenceSign = (regexResult[7]) ? true : false;
            var isDecimalFraction = (regexResult[5]) ? true : false;
            var valueNoSigns = regexResult[2];
            var numberBeforeDot = regexResult[3];
                    
            //console.log(hasPoundSign, hasPenceSign, isDecimalFraction, valueNoSigns, numberBeforeDot);              
            
            if(isDecimalFraction)
            {
                var penceRounded = parseFloat(valueNoSigns).toFixed(2) * 100; 
                return penceRounded; // return as string to pass test                
            }
            else
            {
                // input value already in pence
                if(numberBeforeDot === valueNoSigns && !hasPoundSign)
                {
                    return parseInt(valueNoSigns, 10);
                }

                // For £1p
                if(numberBeforeDot === valueNoSigns && hasPoundSign && hasPenceSign)
                {
                    return valueNoSigns * 100;
                }
                      
                if(numberBeforeDot === valueNoSigns  && hasPoundSign)
                {
                    return valueNoSigns * 100;
                }
                
                if(numberBeforeDot === valueNoSigns  && hasPenceSign)
                {
                    return parseInt(valueNoSigns, 10);
                }
            }
            
            // Was not recognised as pound sterling amount
            return 0;
        },
        
        
        /*
         * return array of coins in pence which sum up to penceValue
         */
        penceToCoins : function(penceValue) {
            
            if(!penceValue)
            {
                return 0;
            }

            var numCoins = coinDenominationsInPence.length;
            var coinsRequired = [];

            for(var i = 0; i < numCoins; )
            {
                var currentLoopCounter = i;

                if(penceValue >= coinDenominationsInPence[i])
                {
                    coinsRequired.push(coinDenominationsInPence[i]);
                    penceValue -= coinDenominationsInPence[i];

                    // completed
                    if(penceValue <= 0) 
                    {
                        break;
                    }
                    i = currentLoopCounter;
                    continue;
                }
                i++;
            }

            return coinsRequired;
        },
        

        display : function(coinArray, elementId)
        {
            if(!coinArray)
            {
                // hide results area
                document.getElementById('result-container').style.display = 'none';
                // show error
                document.getElementById('form-error').style.display = 'block';
                return false;
            }
            document.getElementById('form-error').style.display = 'none';
            
            var coinListLength = coinArray.length;
            var coinSummary = {};
            var template = document.getElementById("result-row").getAttribute('data-template');

            
            // Summarise the number of each coin denominations.
            for(var i = 0; i < coinListLength; i++)
            {                
                var denomination = coinArray[i];
                
                if(!coinSummary[denomination]) 
                {
                    coinSummary[denomination] =  0;
                }
                coinSummary[denomination]++;
            }
            
            var resultHTML = '';
            
            for(var i = 0; i < coinDenominationsCount; i++)
            {
                if(coinSummary[coinDenominationsInPence[i]])
                { 
                    var templateRow = template;
                    
                    var coinValue = coinDenominationsInPence[i];
                    
                    if(100 <= coinDenominationsInPence[i])
                    {
                        coinValue /= 100;
                        coinValue = '&pound;' + coinValue;
                    }
                    else
                    {
                        coinValue += 'p';
                    }
                    
                    templateRow = templateRow.replace(/__coin__/g, coinValue);
                    templateRow = templateRow.replace(/__count__/g, coinSummary[coinDenominationsInPence[i]]);
                    resultHTML += templateRow;
                }
                
                
            }
            
            document.getElementById('result-container').style.display = 'block';
            document.getElementById('result').innerHTML = resultHTML;
            return true;
            
        },
        
    };
}());
describe("Converts pound sterling amount to pence.", function(){
    var testData = {
        0  : ["4", 4], 
        1  : ["85", 85],
        2  : ["197p", 197], 
        3  : ["2p", 2], 
        4  : ["4.235p", 424], 
        5  : ["1.87", 187], 
        6  : ["£1.23", 123],
        7  : ["£2", 200],
        8  : ["£10", 1000],
        9  : ["£1.87p", 187], 
        10 : ["£1p", 100],
        11 : ["£1.p", 100], 
        12 : ["001.41p", 141], 
        13 : ["£1.257422457p", 126],
        14 : ["", 0],
        15 : ["1x", 0],
        16 : ["£1x.0p", 0], 
        17 : ["£p", 0]
    };
    var testDataLength = Object.keys(testData).length;
    
    function callTest(input, output)
    {
        it("Given input " + input + ", pence value will be " + output, function(){
            expect(coin.inputToPence(input)).toEqual(output);
        }); 
    }
    
    for(var i = 0; i < testDataLength; i++)
    {
        callTest(testData[i][0], testData[i][1]);
    }    
});

describe("Converts pence value to coin denominations", function(){
       var testData = [
        [4, [2,2]], 
        [85, [50, 20, 10, 5]],
        [197, [100, 50, 20, 20, 5, 2]], 
        [2, [2]], 
        [424, [200, 200, 20, 2, 2]], 
        [187, [100, 50, 20, 10, 5, 2]], 
        [123, [100, 20, 2, 1]],
        [200, [200]],
        [1000, [200, 200, 200, 200, 200]],
        [187, [100, 50, 20, 10, 5, 2]], 
        [100, [100]],
        [141, [100, 20, 20, 1]], 
        [126, [100, 20, 5, 1]],
        [0, 0]
       ];
    var testDataLength = testData.length;
    
    function callTest(input, output)
    {
        it("Given input " + input + "p, coin denominations required will be " + output, function(){
            expect(coin.penceToCoins(input)).toEqual(output);
        }); 
    }
    
    for(var i = 0; i < testDataLength; i++)
    {
        callTest(testData[i][0], testData[i][1]);
    }    



});
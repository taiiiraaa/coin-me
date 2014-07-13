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
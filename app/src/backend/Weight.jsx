
//function to verify weighted grade
//weighted grade is calculated by Grade * Units
function verifyWeight() {
    const testData = {
        studnno: "2019-xxxx",
        name: "maria makiling",
        program: "BACA",
        courses: ["ENG 1(AH)", "FIL 20", "IT 1(MST)", "PE 1", "PHLO1(SSP)", "PSY 1(SSP)", "SPCM 1(AH)", "ENG 2(AH)", "HUM 1(AH)", "HUM 2(AH)", "MATH1(MST)", "MATH2(MST)", "SOSC1(SSP)", "COMA 101", "ENG 4", "JAP 10", "MATH 17", "NASC3(MST)", "NSTP 1", "SPCM 102", "COMA 104", "FIL 21", "JAP 11", "MGT 101", "SOC 130", "STAT 1", "ENG 101", "COMA 192", "COMA 105", "HUM 150", "PE 2", "PI 10(SSP)", "THEA 107", "ENG 103", "ENG 104", "HUM 170", "NSTP 2", "PHLO 184", "SOC 112", "COMA 193", "COMA 200", "ENG 5", "HK 12", "SPCM 101", "SPCM 104", "ENG 156", "ENG 155", "ENG 102", "ETHICS 1", "STS 1", "COMA 200", "ENG 152", "HK 12", "HK 12", "THEA 101", "COMA 200"],
        grades: ["2", "2.25", "2", "2", "1.75", "1.75", "1.75", "1.5", "1.5", "1.5", "2", "2", "2.5", "1.25", "2", "1.75", "1.75", "2", "1.75", "1.75", "1.25", "2", "1.75", "1.5", "2.25", "1.75", "2", "1", "2", "1.75", "5", "2.25", "1", "2", "2.25", "2", "1.25", "2", "1.75", "1.75", "S", "1.75", "2.25", "1.5", "2.75", "1.5", "1.25", "1", "1.75", "1.75", "S", "1.25", "2.75", "2.25", "2", "1"],
        units: [3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 1],
        weights: [6, 6.75, 6, 0, 5.25, 5.25, 5.25, 4.5, 4.5, 4.5, 6, 6, 7.5, 3.75, 6, 5.25, 8.75, 6, 0, 5.25, 3.75, 6, 5.25, 4.5, 6.75, 5.25, 6, 3, 6, 5.25, 0, 6.75, 3, 6, 6.75, 6, 0, 6, 5.25, 5.25, 0, 5.25, 0, 4.5, 8.25, 4.5, 3.75, 3, 5.25, 5.25, 0, 3.75, 0, 0, 6, 6],
        cumulative: [6, 12.75, 18.75, 18.75, 24, 29.25, 34.5, 39, 43.5, 48, 54, 60, 67.5, 71.25, 77.25, 82.5, 91.25, 97.25, 97.25, 102.5, 106.25, 112.25, 117.5, 122, 128.75, 134, 140, 143, 149, 154.25, 154.25, 161, 164, 170, 176.75, 182.75, 182.75, 188.75, 194, 199.25, 199.25, 204.5, 204.5, 209, 217.25, 221.75, 225.5, 228.5, 233.75, 239, 239, 242.75, 242.75, 242.75, 248.75, 254.75],
        term: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 20, 20, 20, 20, 20, 20, 20, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 9, 9, 9, 9, 9, 1],
        sem: ["l/15/10", "l/15/11", "l/15/12", "l/15/13", "l/15/14", "l/15/15", "l/15/16", "Il/15/11", "Il/15/12", "Il/15/13", "Il/15/14", "Il/15/15", "Il/15/16", "l/16/11", "l/16/12", "l/16/13", "l/16/14", "l/16/15", "l/16/16", "l/16/17", "ll/16/12", "ll/16/13", "ll/16/14", "ll/16/15", "ll/16/16", "ll/16/17", "l/17/12", "l/17/13", "l/17/14", "l/17/15", "l/17/16", "l/17/17", "l/17/18", "ll/17/13", "ll/17/14", "ll/17/15", "ll/17/16", "ll/17/17", "ll/17/18", "l/18/14", "l/18/15", "l/18/16", "l/18/17", "l/18/18", "l/18/19", "ll/18/15", "ll/18/16", "ll/18/17", "ll/18/18", "ll/18/19", "l/19/16", "l/19/17", "l/19/18", "l/19/19", "l/19/20", "ll/19/20"],
        gwa: 1.74486,
        totalunits: 146,
        totalunits2: 144
    };
    var index = 0;

    function letterCheck(char) { //function that checks if the object is an alphabet
        return (/[a-zA-Z]/).test(char)
    }

    for ( index; index < testData.weights.length; index++ ) { //will traverse the length of testData.weights up until the last object
            
        if ( testData.weights[index] === (testData.grades[index] * testData.units[index]) ) { //checks if the weight is equal to the value from the multiplication of grade and unit
            continue;
        }

        else if ( letterCheck(testData.grades[index]) === true ) {//if object is alphabet, continue to rest of checking
            continue;
        }

        else {
            return <span>The weight at item {index+1} is incorrect.</span>
        }
    }
    
    return <span>All Weights are verified.</span>
}

export default verifyWeight;
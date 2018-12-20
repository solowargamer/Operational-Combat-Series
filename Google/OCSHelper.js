// Should be JSON, but nah.  Let's go old school, bois.

const arCombatOdds = [
['extra close','1 or less','1','2','3','4-7','8-11','12-14','16-19','20-27','28-35','36-43','44-51','52+'],
['very close','1:3','1:2','1','2','3','4-5','6-8','9-11','12-14','15-17','18-20','21-23','24+'],
['close','1:4','1:3','1:2','1','2','3','4-5','6-7','8-9','10-11','12-14','15-17','18+'],
['open','1:5','1:4','1:3','1:2','1','2','3','4','5-6','7-8','9-10','11-12','13+'] ];

const arCombatResults = [
['1','AL2','AL2','AL2','AL2','AL2','AL2','AL2','AL1o1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','AL1 Do1','AL1 DL1o1'],
['2','AL2','AL2','AL2','AL2','AL2','AL2','AL1o1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','AL1 Do1','Ao1 DL1o1','Ao1 DL1o1'],
['3','AL2','AL2','AL2','AL2','AL2','AL1o1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','AL1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 DL1o1'],
['4','AL2','AL2','AL2','AL2','AL1o1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','AL1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2'],
['5','AL2','AL2','AL2','AL1o1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','AL1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2','Ae4 DL1o2'],
['6','AL2','AL2','AL1o1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','AL1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 DL1o1','Ae4 DL1o2','Ae4 DL1o2'],
['7','AL1o1','AL1o1','AL1o1 Do1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2','Ae4 DL1o2','Ae3 DL2o2!'],
['8','AL1o1','AL1o1 Do1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2','Ae4 DL1o2','Ae4 DL1o2','Ae3 DL2o2!'],
['9','AL1o1 Do1','AL1o1 Do1','AL1o1 Do1','AL1 Do1','Ao1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2','Ae4 DL1o2','Ae4 DL1o2','Ae3 DL2o2!','Ae3 DL2o2!'],
['10','AL1o1 Do1','AL1o1 Do1','AL1 Do1','Ao1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2','Ae4 DL1o2','Ae4 DL1o2','Ae3 DL2o2!','Ae3 DL2o2!','Ae2 DL2o3!'],
['11','AL1o1 Do1','AL1 Do1','Ao1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 DL1o1','Ae4 DL1o2','Ae4 DL1o2','Ae3 DL2o2!','Ae3 DL2o2!','Ae3 DL2o2!','Ae2 DL2o3!'],
['12','AL1o1 Do1','Ao1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2','Ae4 DL1o2','Ae3 DL2o2!','Ae3 DL2o2!','Ae3 DL2o2!','Ae2 DL2o3!','Ae2 DL2o3!'],
['13','Ao1 Do1','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 DL1o2','Ao1 e4 DL1o2','Ae4 DL1o2','Ae3 DL2o2!','Ae3 DL2o2!','Ae3 DL2o2!','Ae2 DL2o3!','Ae2 DL2o3!','Ae2 DL2o3!'],
['14','Ao1 Do1','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2','Ao1 e4 DL1o2','Ae4 DL1o2','Ae3 DL2o2!','Ae3 DL2o2!','Ae3 DL2o2!','Ae2 DL2o3!','Ae2 DL2o3!','Ae2 DL2o3!','Ae2 DL2o3!'],
['15','Ao1 DL1o1','Ao1 DL1o1','Ao1 e4 DL1o2','Ae4 DL1o2','Ae4 DL1o2','Ae3 DL2o2!','Ae3 DL2o2!','Ae2 DL2o3!','Ae2 DL2o3!','Ae2 DL2o3!','Ae2 DL2o3!','Ae2 DL2o3!','Ae2 DL2o3!'] ];

const arBarrage = [
['1','2','3-4,','5-7','8-11','12-16','17-24','25-40','41-68','69-116','117+'],
['1T','1T','2T','2T','2T','3T','3T','4T','6T','8T','10T'],
['2','-','-','-','-','-','-','-','-','-','DG','DG'],
['3','-','-','-','-','-','-','-','-','DG','DG','DG'],
['4','-','-','-','-','-','-','-','DG','DG','DG','DG'],
['5','-','-','-','-','-','-','DG','DG','DG','DG','[1/2]'],
['6','-','-','-','-','-','DG','DG','DG','DG','[1/2]','[1/2]'],
['7','-','-','-','-','DG','DG','DG','DG','[1/2]','[1/2]','1/2'],
['8','-','-','-','DG','DG','DG','DG','[1/2]','[1/2]','1/2','1/2'],
['9','-','-','DG','DG','DG','[1/2]','[1/2]','[1/2]','1/2','1/2','1/2'],
['10','-','DG','DG','DG','[1/2]','[1/2]','1/2','1/2','1/2','1','1'],
['11','DG','DG','DG','1/2','1/2','1/2','1/2','1/2','1','1','2'],
['12','DG','1/2','1/2','1/2','1/2','1','1','1','1','2','3'] ];

var iAttack = 19;
var iDefense = 4;
var iActionAttack = 4;
var iActionDefense = 3;
var iActionDiff = 0;
var iRow = 3;
var iCol = -1;
var sCombatOdds = "";
var sTerrain = "open";

var sResultSpeech = "";

var iSurpriseRoll = RollResult(2, 6);
var iSurpriseShift = 0;

function RollResult(iNum, iSides) {
    var iResult = 0;
    for (var i = 0; i < iNum; i++)
        iResult += Math.floor((Math.random() * iSides) + 1);
    return iResult;
}

function ValueInRange(sValue, sRange) {
    const iValue = parseInt(sValue);
    iSurpriseShift = RollResult(1, 6);

    if (sRange.indexOf(" or less") != -1) {
        sRange = sRange.replace(" or less", "");
        const iRange = parseInt(sRange);
        if (iRange == iValue || iValue < iRange)
            return true;
        return false;
    }
    else if (sRange.indexOf("-") != -1) {
        const sa = sRange.split("-");
        const iLow = parseInt(sa[0]);
        const iHigh = parseInt(sa[1]);
        if (iValue == iLow || iValue == iHigh)
            return true;
        if (iValue > iLow && iValue < iHigh)
            return true;
        return false;
    }
    else if (sRange.indexOf("+") != -1) {
        sRange = sRange.replace("+", "");
        const iHigh = parseInt(sRange);
        if (iValue == iHigh || iValue > iHigh)
            return true;
        return false;
    }
    else {
        if (iValue == sRange)
            return true;
        return false;
    }
}

var iOdds = Math.ceil(iAttack / iDefense);
if (iOdds < 0)
    sCombatOdds = "1:" + iOdds;

switch (sTerrain) {
    case "close":       iRow = 2;  break;
    case "very close":  iRow = 1;  break;
    case "extra close": iRow = 0;  break;
}

try {
    for (var i=0; i<arCombatOdds[iRow].length-1; i++) {
        if (ValueInRange(iOdds, arCombatOdds[iRow][i]))
            iCol = i;
    }
    if (iCol === -1) {
        console.log("Combat odds not found for " + iOdds);
        sResultSpeech = "Your combat odds were not found in the chart";
    }
    else {
        iActionDiff = iActionAttack - iActionDefense;
        var surprise = iSurpriseRoll + iActionDiff;
        if (surprise >= 10){
            sResultSpeech = "Surprise achieved! ";
            iCol += iSurpriseShift;
        }

        var iCombatRoll = RollResult(2, 6);
        iCombatRoll += iSurpriseShift;

        var str = arCombatResults[iCombatRoll-1][iCol-1];
        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) == 'A')
                sResultSpeech += "Attacker ";
            else if (str.charAt(i) == 'D')
                sResultSpeech += " <break time=\"500ms\"/>  Defender ";
            else if (str.charAt(i) == 'o')
                sResultSpeech += "<emphasis level=\"moderate\"> option </emphasis> ";
            else if (str.charAt(i) == '!')
                sResultSpeech += "Disorganized ";
            else if (str.charAt(i) == 'e')
                sResultSpeech += "entry ";
            else if (str.charAt(i) == 'L')
                sResultSpeech += "<emphasis level=\"strong\"> loses </emphasis> ";
            else
                sResultSpeech += str.charAt(i);
        }

        sResultSpeech += " in " + sTerrain + " terrain. ";
    }

}
catch{

}

var sFinalSpeech = "<speak>" + sResultSpeech + "</speak>"


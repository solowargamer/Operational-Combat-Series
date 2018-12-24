'use strict';

const functions = require('firebase-functions');
const {  WebhookClient} = require('dialogflow-fulfillment');
const {  Card,  Suggestion} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');
admin.initializeApp();

const arCombatOdds = [
  ['extra close', '1 or less', '1', '2', '3', '4-7', '8-11', '12-14', '16-19', '20-27', '28-35', '36-43', '44-51', '52+'],
  ['very close', '1:3', '1:2', '1', '2', '3', '4-5', '6-8', '9-11', '12-14', '15-17', '18-20', '21-23', '24+'],
  ['close', '1:4', '1:3', '1:2', '1', '2', '3', '4-5', '6-7', '8-9', '10-11', '12-14', '15-17', '18+'],
  ['open', '1:5', '1:4', '1:3', '1:2', '1', '2', '3', '4', '5-6', '7-8', '9-10', '11-12', '13+']
];
// ! = DG
// @ = L1
// # = L2
const arCombatResults = [
  ['1', 'A#', 'A#', 'A#', 'A#', 'A#', 'A#', 'A#', 'A@o1', 'A@o1 Do1', 'A@o1 Do1', 'A@ Do1', 'A@ Do1', 'A@ D@o1'],
  ['2', 'A#', 'A#', 'A#', 'A#', 'A#', 'A#', 'A@o1', 'A@o1 Do1', 'A@o1 Do1', 'A@ Do1', 'A@ Do1', 'Ao1 D@o1', 'Ao1 D@o1'],
  ['3', 'A#', 'A#', 'A#', 'A#', 'A#', 'A@o1', 'A@o1 Do1', 'A@o1 Do1', 'A@ Do1', 'A@ Do1', 'Ao1 D@o1', 'Ao1 D@o1', 'Ao1 D@o1'],
  ['4', 'A#', 'A#', 'A#', 'A#', 'A@o1', 'A@o1 Do1', 'A@o1 Do1', 'A@ Do1', 'A@ Do1', 'Ao1 Do1', 'Ao1 D@o1', 'Ao1 D@o1', 'Ao1 e4 D@o2'],
  ['5', 'A#', 'A#', 'A#', 'A@o1', 'A@o1 Do1', 'A@o1 Do1', 'A@ Do1', 'A@ Do1', 'Ao1 Do1', 'Ao1 D@o1', 'Ao1 D@o1', 'Ao1 e4 D@o2', 'Ae4 D@o2'],
  ['6', 'A#', 'A#', 'A@o1', 'A@o1 Do1', 'A@o1 Do1', 'A@ Do1', 'A@ Do1', 'Ao1 Do1', 'Ao1 D@o1', 'Ao1 D@o1', 'Ao1 D@o1', 'Ae4 D@o2', 'Ae4 D@o2'],
  ['7', 'A@o1', 'A@o1', 'A@o1 Do1', 'A@o1 Do1', 'A@o1 Do1', 'A@ Do1', 'Ao1 Do1', 'Ao1 D@o1', 'Ao1 D@o1', 'Ao1 D@o1', 'Ao1 e4 D@o2', 'Ae4 D@o2', 'Ae3 D#o2!'],
  ['8', 'A@o1', 'A@o1 Do1', 'A@o1 Do1', 'A@o1 Do1', 'A@ Do1', 'Ao1 Do1', 'Ao1 D@o1', 'Ao1 D@o1', 'Ao1 D@o1', 'Ao1 e4 D@o2', 'Ae4 D@o2', 'Ae4 D@o2', 'Ae3 D#o2!'],
  ['9', 'A@o1 Do1', 'A@o1 Do1', 'A@o1 Do1', 'A@ Do1', 'Ao1 Do1', 'Ao1 Do1', 'Ao1 D@o1', 'Ao1 D@o1', 'Ao1 e4 D@o2', 'Ae4 D@o2', 'Ae4 D@o2', 'Ae3 D#o2!', 'Ae3 D#o2!'],
  ['10', 'A@o1 Do1', 'A@o1 Do1', 'A@ Do1', 'Ao1 Do1', 'Ao1 Do1', 'Ao1 D@o1', 'Ao1 D@o1', 'Ao1 e4 D@o2', 'Ae4 D@o2', 'Ae4 D@o2', 'Ae3 D#o2!', 'Ae3 D#o2!', 'Ae2 D#o3!'],
  ['11', 'A@o1 Do1', 'A@ Do1', 'Ao1 Do1', 'Ao1 Do1', 'Ao1 D@o1', 'Ao1 D@o1', 'Ao1 D@o1', 'Ae4 D@o2', 'Ae4 D@o2', 'Ae3 D#o2!', 'Ae3 D#o2!', 'Ae3 D#o2!', 'Ae2 D#o3!'],
  ['12', 'A@o1 Do1', 'Ao1 Do1', 'Ao1 Do1', 'Ao1 D@o1', 'Ao1 D@o1', 'Ao1 D@o1', 'Ao1 e4 D@o2', 'Ae4 D@o2', 'Ae3 D#o2!', 'Ae3 D#o2!', 'Ae3 D#o2!', 'Ae2 D#o3!', 'Ae2 D#o3!'],
  ['13', 'Ao1 Do1', 'Ao1 Do1', 'Ao1 D@o1', 'Ao1 D@o1', 'Ao1 D@o2', 'Ao1 e4 D@o2', 'Ae4 D@o2', 'Ae3 D#o2!', 'Ae3 D#o2!', 'Ae3 D#o2!', 'Ae2 D#o3!', 'Ae2 D#o3!', 'Ae2 D#o3!'],
  ['14', 'Ao1 Do1', 'Ao1 D@o1', 'Ao1 D@o1', 'Ao1 e4 D@o2', 'Ao1 e4 D@o2', 'Ae4 D@o2', 'Ae3 D#o2!', 'Ae3 D#o2!', 'Ae3 D#o2!', 'Ae2 D#o3!', 'Ae2 D#o3!', 'Ae2 D#o3!', 'Ae2 D#o3!'],
  ['15', 'Ao1 D@o1', 'Ao1 D@o1', 'Ao1 e4 D@o2', 'Ae4 D@o2', 'Ae4 D@o2', 'Ae3 D#o2!', 'Ae3 D#o2!', 'Ae2 D#o3!', 'Ae2 D#o3!', 'Ae2 D#o3!', 'Ae2 D#o3!', 'Ae2 D#o3!', 'Ae2 D#o3!']
];
const arBarrageCost = ['1T', '1T', '2T', '2T', '2T', '3T', '3T', '4T', '6T', '8T', '10T'];
const arBarrageStrength = ['0', '1', '2', '3-4,', '5-7', '8-11', '12-16', '17-24', '25-40', '41-68', '69-116', '117+'];
const arBarrageResult = [
  ['2', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'DG', 'DG'],
  ['3', '-', '-', '-', '-', '-', '-', '-', '-', 'DG', 'DG', 'DG'],
  ['4', '-', '-', '-', '-', '-', '-', '-', 'DG', 'DG', 'DG', 'DG'],
  ['5', '-', '-', '-', '-', '-', '-', 'DG', 'DG', 'DG', 'DG', '[1/2]'],
  ['6', '-', '-', '-', '-', '-', 'DG', 'DG', 'DG', 'DG', '[1/2]', '[1/2]'],
  ['7', '-', '-', '-', '-', 'DG', 'DG', 'DG', 'DG', '[1/2]', '[1/2]', '1/2'],
  ['8', '-', '-', '-', 'DG', 'DG', 'DG', 'DG', '[1/2]', '[1/2]', '1/2', '1/2'],
  ['9', '-', '-', 'DG', 'DG', 'DG', '[1/2]', '[1/2]', '[1/2]', '1/2', '1/2', '1/2'],
  ['10', '-', 'DG', 'DG', 'DG', '[1/2]', '[1/2]', '1/2', '1/2', '1/2', '1', '1'],
  ['11', 'DG', 'DG', 'DG', '1/2', '1/2', '1/2', '1/2', '1/2', '1', '1', '2'],
  ['12', 'DG', '1/2', '1/2', '1/2', '1/2', '1', '1', '1', '1', '2', '3']
];

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({
    request,
    response
  });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome(agent) {
    // fetchData();
    agent.add(`OCS Helper`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function RollResult(iNum, iSides) {
    var iResult = 0;
    for (var i = 0; i < iNum; i++)
      iResult += Math.floor((Math.random() * iSides) + 1);
    return iResult;
  }

  function ValueInRange(sValue, sRange) {
    const iValue = parseInt(sValue);

    if (sRange.indexOf(" or less") != -1) {
      sRange = sRange.replace(" or less", "");
      const iRange = parseInt(sRange);
      if (iRange == iValue || iValue < iRange)
        return true;
      return false;
    } else if (sRange.indexOf("-") != -1) {
      const sa = sRange.split("-");
      const iLow = parseInt(sa[0]);
      const iHigh = parseInt(sa[1]);
      if (iValue == iLow || iValue == iHigh)
        return true;
      if (iValue > iLow && iValue < iHigh)
        return true;
      return false;
    } else if (sRange.indexOf("+") != -1) {
      sRange = sRange.replace("+", "");
      const iHigh = parseInt(sRange);
      if (iValue == iHigh || iValue > iHigh)
        return true;
      return false;
    } else {
      if (iValue == sRange)
        return true;
      return false;
    }
  }

  function barrageHandler(agent) {
    var sTerrain = "open";
    var strength = 0;
    var shiftDirection = '';
    var shiftValue = 0;
    var iCol = -1;
    var iRow = RollResult(2, 6);

    try {
      const context = agent.getContext('session-vars');
      sTerrain = context.parameters.terrain;
    } catch (Exception) {
      sTerrain = "open";
      console.log('error getting terrain in barrage');
    }

    strength = parseInt(agent.parameters.Strength);
    try {
      shiftDirection = parseInt(agent.parameters.shiftDirection);
      shiftValue = parseInt(agent.parameters.shiftValue);
    } catch (e) { }

    for (var i = 0; i < arBarrageStrength.length - 1; i++) {
      if (ValueInRange(strength, arBarrageStrength[i]))
        iCol = i;
    }

    if (sTerrain === 'close' || sTerrain === 'very close')
      iCol -= 1;
    else if (sTerrain === 'extra close')
      iCol -= 2;

    if (shiftValue != 0 && shiftDirection != '') {
      if (shiftDirection === 'left')
        iCol -= shiftValue;
      else if (shiftDirection === 'right')
        iCol += shiftValue;
    }

    if (iCol > arBarrageStrength.length)
      iCol = arBarrageStrength.length;
    if (iCol < 1)
      iCol = 1;

    var sResultSpeech = "Your supply cost is " + arBarrageCost[iCol];
    const sResults = arBarrageResult[iRow][iCol];
    if (sResults === '-')
      sResultSpeech += ". Result is no damage";
    else
      sResultSpeech += ". Result is " + arBarrageResult[iRow][iCol];

    sResultSpeech += ". In " + sTerrain + " terrain."
    agent.add(sResultSpeech);
  }

  function Attacking(sAttackType) {
    var iActionDiff = 0;
    var iRow = 3;
    var iCol = -1;
    var sCombatOdds = "";
    var sResultSpeech = "";
    var iSurpriseRoll = RollResult(2, 6);
    var iSurpriseShift = 0;
    var sTerrain = "open";
    var iSurpriseUpperThreshold = 10;
    var iSurpriseLowerThreshold = 5;

    try {
      const context = agent.getContext('session-vars');
      sTerrain = context.parameters.terrain;
    } catch (Exception) {
      sTerrain = "open";
    }

    var iAttack = parseInt(agent.parameters.AttackPower);
    var iActionAttack = parseInt(agent.parameters.AttackRating);
    var iDefense = parseInt(agent.parameters.DefendPower);
    var iActionDefense = parseInt(agent.parameters.DefendRating);
    iSurpriseShift = RollResult(1, 6);

    var iOdds = Math.ceil(iAttack / iDefense);
    if (iOdds < 0)
      sCombatOdds = "1:" + iOdds;

    switch (sTerrain) {
      case "close":
        iRow = 2;
        break;
      case "very close":
        iRow = 1;
        break;
      case "extra close":
        iRow = 0;
        break;
    }
    if (!sTerrain || sTerrain === undefined)
      sTerrain = 'open';

    try {
      for (var i = 0; i < arCombatOdds[iRow].length - 1; i++) {
        if (ValueInRange(iOdds, arCombatOdds[iRow][i]))
          iCol = i;
      }
      if (iCol === -1) {
        console.log("Combat odds not found for " + iOdds);
        sResultSpeech = "Your combat odds were not found in the chart. ";
      } else {
        sAttackType === 'over' ? iSurpriseUpperThreshold = 9 : iSurpriseUpperThreshold = 10;
        sAttackType === 'over' ? iSurpriseLowerThreshold = 6 : iSurpriseLowerThreshold = 5;
        iActionDiff = iActionAttack - iActionDefense;
        const surprise = iSurpriseRoll + iActionDiff;
        if (surprise >= iSurpriseUpperThreshold) {
          sResultSpeech = "Attacker gained surprise. ";
          iCol += iSurpriseShift;
          if (iCol > 14)
            iCol = 14;
        } else if (surprise <= iSurpriseLowerThreshold) {
          sResultSpeech = "Defender gained surprise. ";
          iCol -= iSurpriseShift;
          if (iCol < 2)
            iCol = 2;
        }

        var iCombatRoll = RollResult(2, 6);
        var iModCombatRoll = iCombatRoll + iSurpriseShift;
        if (iModCombatRoll > 16)
          iModCombatRoll = 16;
        var str = arCombatResults[iModCombatRoll - 1][iCol - 1];
        for (var i = 0; i < str.length; i++) {
          if (str.charAt(i) == 'A')
            sResultSpeech += " Attacker ";
          else if (str.charAt(i) == 'D')
            sResultSpeech += ". <break time=\"600ms\"/> Defender ";
          else if (str.charAt(i) == 'o')
            sResultSpeech += ", <break time=\"400ms\"/> option ";
          else if (str.charAt(i) == '!')
            sResultSpeech += " <break time=\"400ms\"/> Disorganized ";
          else if (str.charAt(i) == 'e')
            sResultSpeech += " <break time=\"400ms\"/> exploitation ";
          else if (str.charAt(i) == '@')
            sResultSpeech += ", <emphasis level=\"strong\"> loses 1 </emphasis> ";
          else if (str.charAt(i) == '#')
            sResultSpeech += ", <emphasis level=\"strong\"> loses 2 </emphasis> ";
          else
            sResultSpeech += str.charAt(i);
        }
        sResultSpeech += " <break time=\"400ms\"/> . in " + sTerrain + " terrain. ";
      }
    } catch (Exception) { }

    const sFinalSpeech = "<speak>" + sResultSpeech + "</speak>";

    agent.setContext({
      name: 'session-vars',
      lifespan: 20,
      parameters: {
        attack: iAttack,
        defend: iDefense,
        actiona: iActionAttack,
        actiond: iActionDefense,
        surpriseShift: iSurpriseShift,
        surpriseRoll: iSurpriseRoll,
        surUp: iSurpriseUpperThreshold,
        surLow: iSurpriseLowerThreshold,
        combatRoll: iCombatRoll,
        actionDiff: iActionDiff,
        resultSay: sFinalSpeech
      }
    });

    agent.add(sFinalSpeech);
  }


  function terrainHandler(agent) {
    var sTerrain = '';
    const sP = agent.parameters.terrain.replace('to rain', '');
    if (sP === 'close' || sP === 'closed' || sP === 'clothes')
      sTerrain = 'close';
    else if (sP === 'open' || sP === 'opened')
      sTerrain = 'open';
    else if (sP === 'very close' || sP === 'very closed' || sP === 'very clothes')
      sTerrain = 'very close';
    else if (sP === 'extra close' || sP === 'extra closed' || sP === 'extra clothes')
      sTerrain = 'extra close';
    else
      sTerrain = "open";

    if (sTerrain != 'open' && sTerrain != 'close' && sTerrain != 'very close' && sTerrain != 'extra close')
      agent.add('I did not understand the terrain.  Defaulting to open');
    else
      agent.add('You are now attacking into ' + sTerrain + ' terrain');

    agent.setContext({
      name: 'session-vars',
      lifespan: 20,
      parameters: {
        terrain: sTerrain
      }
    });

    // saveData(sTerrain);
  }

  function attackRegularHandler(agent) {
    Attacking('standard')
  }

  function OverRunHandler(agent) {
    Attacking('over')
  }

  function repeatHandler(agent) {
    const context = agent.context.get('session-vars');
    try {
      agent.add(context.parameters.resultSay);
    } catch (Exception) {
      agent.add('I have nothing to repeat');
    }
  }

  function fetchData() {
    const conv = agent.conv();
    if (conv) {
      var x = admin.database().ref('/data/' + conv.user.id);
      x.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const d = childSnapshot.val();
          console.log('terrain = ' + d.terrain);
          agent.setContext({
            name: 'session-vars',
            lifespan: 20,
            parameters: {
              terrain: d.terrain
            }
          });
        });
      });
    }
  }

  function saveData(sTerrain) {
    const conv = agent.conv();
    if (conv) {
      return admin.database().ref('/data/' + conv.user.id)
        .push({
          terrain: sTerrain
        })
        .then((snapshot) => {
          console.log('successful write: ' + snapshot.ref.toString());
        });
    }
  }

  function flackHandler(agent) {
    agent.add('You rolled a ' + RollResult(2, 6) + '. Add modifiers as necessary.');
  }

  function diceHandler(agent) {
    try {
      var iDice = parseInt(agent.parameters.dice);
      agent.add('You rolled ' + iDice + ' dice, and got a ' + RollResult(iDice, 6));
    } catch (Exception) {
      agent.add('Issue while rolling dice');
    }
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Attack Standard', attackRegularHandler);
  intentMap.set('Attack OverRun', OverRunHandler);
  intentMap.set('Terrain', terrainHandler);
  intentMap.set('Repeat', repeatHandler);
  intentMap.set('Barrage', barrageHandler);
  intentMap.set('Flack', flackHandler);
  intentMap.set('RollDice', diceHandler);
  agent.handleRequest(intentMap);
});

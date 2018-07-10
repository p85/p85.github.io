function renumber(basicProgram) {
    const output = [];
    const basicProgramArr = basicProgram.split('\n');
    for (let i in basicProgramArr) {
        const lineNumber1 = parseInt(i) * 10 + 10;
        const foundFlag1 = basicProgramArr[i].match(/^\<\w+\>/g);
        if (foundFlag1) {
            const result = basicProgramArr[i].replace(foundFlag1[0], lineNumber1);
            const flagInside = result.match(/\<\w+\>/g);
            if(!flagInside) {
                output.push(result);
            }
            for (let ii in basicProgramArr) {
                const lineNumber2 = parseInt(ii) * 10 + 10;
                const foundFlag2 = basicProgramArr[ii].match(new RegExp('.+' + foundFlag1[0], 'g'));
                if (foundFlag2) {
                    const flagInside = basicProgramArr[ii].match(/\<\w+\>\s/g);
                    const tmpResult = foundFlag2[0].replace(foundFlag1[0], lineNumber1).replace(flagInside, '');
                    let result = '';
                    if (tmpResult.match(/^\d+/g)) {
                        result = foundFlag2[0].replace(new RegExp(foundFlag1[0], 'g'), lineNumber1).replace(flagInside, '');
                    } else {
                        result = lineNumber2 + ' ' + foundFlag2[0].replace(new RegExp(foundFlag1[0], 'g'), lineNumber1).replace(flagInside, '');
                    }
                    output.push(result);
                }
            }
        } else if (!basicProgramArr[i].match(/.+\<.+\>/g)) {
            const result = lineNumber1 + ' ' + basicProgramArr[i];
            output.push(result);
        }
    }
    return output.sort(naturalCompare).join('\n');
}

function naturalCompare(a, b) {
    var ax = [], bx = [];
    a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
    b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
    while (ax.length && bx.length) {
        var an = ax.shift();
        var bn = bx.shift();
        var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
        if (nn) return nn;
    }
    return ax.length - bx.length;
}

function renumberThis(text) {
    document.getElementById('txt').value = renumber(text);
}

function loadExample() {
    document.getElementById('txt').value = `<BEGIN> PRINT "HI!"
GOTO <BEGIN>`
}

function loadMastermind() {
      document.getElementById('txt').value = `REM MASTERMIND
REM WRITTEN BY HM (HARDMATH123)
REM G() - GUESS  ARRAY
REM R() - RANDOM ARRAY
REM B   - BLACK HITS
REM W   - WHITE HITS
GOTO <START>
<BEGIN> LET M = 0
DIM G(4)
DIM R(4)
LET R(0) = INT(10*RND(1))
LET R(1) = INT(10*RND(1))
LET R(2) = INT(10*RND(1))
LET R(3) = INT(10*RND(1))
<ENTERNUMBER> PRINT "Enter your guess (4 numbers)"
LET M = M + 1
INPUT G(0)
INPUT G(1)
INPUT G(2)
INPUT G(3)
LET B = 0
IF G(0) = R(0) THEN LET B = B + 1
IF G(1) = R(1) THEN LET B = B + 1
IF G(2) = R(2) THEN LET B = B + 1
IF G(3) = R(3) THEN LET B = B + 1
IF B = 4 THEN GOTO <WIN>
IF B = 1 THEN PRINT "YOU HAVE 1 BLACK HIT."
IF B < 1 THEN PRINT "YOU HAVE NO BLACK HITS."
IF B > 1 THEN PRINT "YOU HAVE"; B; "BLACK HITS."
LET W = 0
LET C = 0
<BACK> IF C = 4 THEN GOTO <TURN>
IF G(C) = R(0) THEN GOTO <RIGHT>
IF G(C) = R(1) THEN GOTO <RIGHT>
IF G(C) = R(2) THEN GOTO <RIGHT>
IF G(C) = R(3) THEN GOTO <RIGHT>
GOTO <ADD>
<RIGHT> LET W = W + 1
<ADD> LET C = C + 1
GOTO <BACK>
<TURN>  LET W = W - B
IF W = 1 THEN PRINT "YOU HAVE 1 WHITE HIT."
IF W < 1 THEN PRINT "YOU HAVE NO WHITE HITS."
IF W > 1 THEN PRINT "YOU HAVE"; W; "WHITE HITS."
GOTO <ENTERNUMBER>
<WIN>  PRINT "YOU WIN! IT ONLY TOOK YOU"; M; "MOVES."
STOP
<START>  PRINT "***              MASTERMIND             ***"
PRINT "              BY ~HARDMATH123"
PRINT "ZOLTAR IS THINKING OF A 4-DIGIT NUMBER. HE "
PRINT "GRADES YOUR GUESSES  IN TWO WAYS:"
PRINT " - YOU GET A 'BLACK' HIT FOR EACH DIGIT IN "
PRINT "   THE CORRECT PLACE."
PRINT " - YOU GET A 'WHITE' HIT FOR EACH DIGIT    "
PRINT "   THAT IS IN ZOLTAR'S NUMBER, BUT IN THE  "
PRINT "   WRONG PLACE."
PRINT "CAN YOU GUESS HIS NUMBER?"
GOTO <BEGIN>`
  }
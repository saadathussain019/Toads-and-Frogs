// Global variables
var PuzzleSizeLeft = 3;
var PuzzleSizeRight = 3;
var Puzzle = [];
var MoveCount = 0;

//Driver 
var c = document.getElementById("Canvas");
c.addEventListener("click", canvasClick);
document.getElementById("PuzzleSizeLeft").value = PuzzleSizeLeft;
document.getElementById("PuzzleSizeRight").value = PuzzleSizeRight;
requestAnimationFrame(Animation);
//PuzzleSymmetric();
NewGame();
function Animation() 
{
    DrawCanvas();
    requestAnimationFrame(Animation);
}

function NewGame() 
{
    MoveCount = 0;
    Puzzle = new Array(PuzzleSizeLeft + PuzzleSizeRight + 1);

    for (var i = 0; i < PuzzleSizeLeft; i++)    // Left
    {
        Puzzle[i] = 1;
    }
    Puzzle[PuzzleSizeLeft] = 0;                 // Middle
    for (var i = 0; i < PuzzleSizeRight; i++)    // Right
    {
        Puzzle[PuzzleSizeLeft + PuzzleSizeRight - i] = 2;
    }
    DrawCanvas();
}

function PuzzleSymmetric() {
    if (document.getElementById("PuzzleSymmetry").checked === true) {
        document.getElementById("PuzzleSizeLeftLabel").innerHTML = "Frogs on either side";
        document.getElementById("PuzzleSizeRightLabel").style.opacity = 0.4;
        document.getElementById("PuzzleSizeRight").style.opacity = 0.4;
        document.getElementById("PuzzleSizeRight").disabled = true;
    }
    document.getElementById("PuzzleSizeRight").value = document.getElementById("PuzzleSizeLeft").value;
    NewGame();
}

function TryMove(frog) {
    if (Puzzle[frog] != 0) // there is a frog there
    {
        if (Puzzle[frog] == 1) // moving right
        {
            if (frog + 1 < Puzzle.length && Puzzle[frog + 1] == 0) {
                Puzzle[frog + 1] = 1;
                Puzzle[frog] = 0;
                MoveCount++;
            }
            else if (frog + 2 < Puzzle.length && Puzzle[frog + 2] == 0) {
                Puzzle[frog + 2] = 1;
                Puzzle[frog] = 0;
                MoveCount++;
            }
        }
        else if (Puzzle[frog] == 2) // moving left
        {
            if (frog - 1 >= 0 && Puzzle[frog - 1] == 0) {
                Puzzle[frog - 1] = 2;
                Puzzle[frog] = 0;
                MoveCount++;
            }
            else if (frog - 2 >= 0 && Puzzle[frog - 2] == 0) {
                Puzzle[frog - 2] = 2;
                Puzzle[frog] = 0;
                MoveCount++;
            }
        }
    }
}

function IsWin() {
    var won = true;     // assume victory
    for (var i = 0; i < PuzzleSizeRight; i++)    // Left
    {
        if (Puzzle[i] != 2)
            won = false;
    }
    if (Puzzle[PuzzleSizeRight] != 0)
        won = false;                        // Middle
    for (var i = 0; i < PuzzleSizeLeft; i++)    // Right
    {
        if (Puzzle[PuzzleSizeLeft + PuzzleSizeRight - i] != 1)
            won = false;
    }

    if (won) 
    {
        alert("Congratulations! You solved the Puzzle in " + MoveCount + " moves.");
        NewGame();
    }
}

function canvasClick(event) {
    var rect = c.getBoundingClientRect();
    var clickX = event.pageX - rect.left
    var stone = Math.floor(clickX / (c.width / (PuzzleSizeLeft + PuzzleSizeRight + 1)));
    TryMove(stone);
    DrawCanvas();
    IsWin();
}

function PuzzleSizeChanged() {
    if (document.getElementById("PuzzleSymmetry").checked === true)
        document.getElementById("PuzzleSizeRight").value = document.getElementById("PuzzleSizeLeft").value;

    PuzzleSizeLeft = parseInt(document.getElementById("PuzzleSizeLeft").value);
    PuzzleSizeRight = parseInt(document.getElementById("PuzzleSizeRight").value);
    NewGame();
}

function DrawCanvas() {
    var appContainer = document.getElementById("ToadsAndFrogs");
    var appWidth = appContainer.offsetWidth;

    var stoneWidth = ((appWidth - 10) / ((PuzzleSizeLeft + PuzzleSizeRight) + 1));
    c.width = appWidth - 10;
    c.height = stoneWidth;

    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);

    for (var i = 0; i < (PuzzleSizeLeft + PuzzleSizeRight) + 1; i++) {
        // Draw boxes
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(i * stoneWidth, 0, stoneWidth, stoneWidth);

        // Draw "frogs"
        if (Puzzle[i] != 0) {
            var frogImg = new Image();
            if (Puzzle[i] === 1)
                frogImg.src = "frog2.png";
            else
                frogImg.src = "frog1.png";

            ctx.drawImage(frogImg, i * stoneWidth, 0, stoneWidth, stoneWidth);
        }
    }
}
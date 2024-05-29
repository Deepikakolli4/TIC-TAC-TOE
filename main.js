// Select all elements with class "box"
const boxes = document.querySelectorAll(".box");
// Select reset and new game buttons
const resetBtn = document.querySelector("#reset-btn");
const newBtn = document.querySelector("#new-btn");
// Select message container
const msgContainer = document.querySelector(".msg-container-hide");
// Select message element
const msg = document.querySelector("#msg");
// Define winning patterns
const winPatterns = [
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8],
];
let isPlayerXTurn = true;

// Event listener for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!box.disabled) {
            const currentPlayer = isPlayerXTurn ? 'X' : 'O';
            box.innerText = currentPlayer;
            box.disabled = true;
            checkWinner();
            isPlayerXTurn = !isPlayerXTurn;
        }
    });
});
const checkWinner = () => {
    let isWinner = false;
    // Check for a winner
    for (let pattern of winPatterns) {
        const [pos1, pos2, pos3] = pattern;
        const pos1val = boxes[pos1].innerText;
        const pos2val = boxes[pos2].innerText;
        const pos3val = boxes[pos3].innerText;
        if (pos1val && pos1val === pos2val && pos2val === pos3val) {
            showWinner(pos1val);
            isWinner = true;
            break;
        }
    }
    // Check for a tie
    if (!isWinner) {
        let isFilled = true;
        for (let box of boxes) {
            if (!box.innerText) {
                isFilled = false;
                break;
            }
        }
        if (isFilled) {
            showTie();
        }
    }
};

// Function to display a tie message
const showTie = () => {
    msg.innerText = "It's a tie!";
    msgContainer.classList.remove("hide");
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Function to disable all boxes
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Function to enable all boxes
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Event listener for reset game button
resetBtn.addEventListener("click", () => {
    enableBoxes();
    msgContainer.classList.add("hide");
    isPlayerXTurn = true;
});

// Event listener for new game button
newBtn.addEventListener("click", () => {
    enableBoxes();
    msgContainer.classList.add("hide");
    isPlayerXTurn = true;
});

const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;
console.log(highScores);
finalScore.innerText = mostRecentScore;
username.addEventListener("keyup",() => {
    console.log(username.value);
    saveScoreBtn.disabled = !username.value; 
});

saveHighScore = (e) => {
    console.log("Clicked the save button!");
    e.preventDefault();

    const score = {
        score: Math.floor(Math.random() * 100),
        name: username.value
    };
    highScores.push(score);
    highScores.sort( (a,b) => {
        return b.score - a.score;
    })
    highScores.splice(5);
    localStorage.setItem('highScores',JSON.stringify(highScores));
    window.location.assign("/");
    console.log(highScores);
};

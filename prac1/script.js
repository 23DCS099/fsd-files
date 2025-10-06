console.log("Script loaded");

let votes = {
  js: 0,
  py: 0,
  java: 0
};

function vote(language) {
  console.log("Voted for:", language);
  votes[language]++;
  updateResults();
}

setInterval(() => {
  const langKeys = ['js', 'py', 'java'];
  const randomKey = langKeys[Math.floor(Math.random() * langKeys.length)];
  votes[randomKey]++;
  updateResults();
}, 3000);

function updateResults() {
  document.querySelector(".count-js").textContent = votes.js;
  document.querySelector(".count-py").textContent = votes.py;
  document.querySelector(".count-java").textContent = votes.java;
}

setInterval(updateResults, 10000);

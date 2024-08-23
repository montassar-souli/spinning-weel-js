/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  {
    minDegree: 61,
    maxDegree: 90,
    value: 1,
    question:
      "Comment la symbolique des couleurs a-t-elle évolué au fil du temps dans différentes civilisations ?",
  },
  {
    minDegree: 31,
    maxDegree: 60,
    value: 2,
    question:
      "Quel rôle les couleurs ont-elles joué dans l'identité nationale et la propagande historique ?",
  },
  {
    minDegree: 0,
    maxDegree: 30,
    value: 3,
    question:
      "De quelle manière la psychologie des couleurs influence-t-elle la prise de décision ou le comportement ?",
  },
  {
    minDegree: 331,
    maxDegree: 360,
    value: 4,
    question:
      "Comment la couleur blanche est-elle perçue dans différentes cultures, et quelles significations lui sont attribuées ?",
  },
  {
    minDegree: 301,
    maxDegree: 330,
    value: 5,
    question:
      "Comment le vert est-il symboliquement lié à la nature et à l'écologie dans différentes sociétés ?",
  },
  {
    minDegree: 271,
    maxDegree: 300,
    value: 6,
    question:
      "Comment la couleur bleue est-elle utilisée pour exprimer des émotions telles que la tranquillité ou la tristesse dans la culture populaire ?",
  },
  {
    minDegree: 241,
    maxDegree: 270,
    value: 7,
    question:
      "Analysez l'expression « avoir le blues » ou l'utilisation du bleu dans les films et la musique pour évoquer la mélancolie.",
  },
  {
    minDegree: 211,
    maxDegree: 240,
    value: 8,
    question:
      "De quelle manière les couleurs influencent-elles la mémorisation d'une publicité",
  },
  {
    minDegree: 181,
    maxDegree: 210,
    value: 9,
    question:
      "Comment la couleur rose est-elle utilisée en publicité pour cibler des audiences spécifiques,notamment en termes de genre ou de segments démographiques",
  },
  {
    minDegree: 151,
    maxDegree: 180,
    value: 10,
    question:
      "Quelle est l'importance des couleurs dans la publicité en ligne, et comment influencent-elles le comportement des consommateurs dans un environnement numérique ?",
  },
  {
    minDegree: 121,
    maxDegree: 150,
    value: 11,
    question:
      "Comment la couleur grise est-elle employée dans la publicité pour exprimer la neutralité, la modernité ou la sophistication ?",
  },
  {
    minDegree: 91,
    maxDegree: 120,
    value: 12,
    question:
      "Comment les couleurs influencent-elles la perception de la qualité et du prix d'un produit dans la publicité ?",
  },
];

/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]; // Total: 120

/* --------------- Background Colors  --------------------- */
var spinColors = [
  "#FFFFFF",
  "#BF2C32",
  "#4FB06D",
  "#EBB8DD",
  "#CBD6E2",
  "#FFA500",
  "#9370DB",
  "#DC143C",
  "#00BFFF",
];

/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#000000",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  console.log(angleValue);
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      text.innerHTML = `<p>Question ${i.value}: ${i.question}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>Bonne chance!</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
/* --------------- End Spin Wheel  --------------------- */

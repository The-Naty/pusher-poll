const form = document.getElementById("vote-form");
var event;

form.addEventListener("submit", (e) => {
  const choice = document.querySelector("input[name=food]:checked").value;
  const data = { food: choice };

  fetch("http://localhost:3000/poll", {
    method: "post",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  e.preventDefault();
});

fetch("http://localhost:3000/poll")
  .then((res) => res.json())
  .then((data) => {
    let votes = data.votes;
    let totalVotes = votes.length;
    document.querySelector(
      "#chartTitle"
    ).textContent = `Total Votes: ${totalVotes}`;

    let voteCounts = {
      Pizza: 0,
      Pasta: 0,
      Burger: 0,
      Other: 0,
    };

    voteCounts = votes.reduce(
      (acc, vote) => (
        (acc[vote.food] = (acc[vote.food] || 0) + parseInt(vote.points)), acc
      ),
      {}
    );

    let dataPoints = [
      { label: "Pizza", y: voteCounts.Pizza },
      { label: "Pasta", y: voteCounts.Pasta },
      { label: "Burger", y: voteCounts.Burger },
      { label: "Other", y: voteCounts.Other },
    ];

    const chartContainer = document.querySelector("#chartContainer");

    if (chartContainer) {
      // Listen for the event.
      document.addEventListener("votesAdded", function (e) {
        document.querySelector(
          "#chartTitle"
        ).textContent = `Total Votes: ${e.detail.totalVotes}`;
      });

      const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "theme1",
        data: [
          {
            type: "column",
            dataPoints: dataPoints,
          },
        ],
      });
      chart.render();

      var pusher = new Pusher("355bbcc1238451dd1d93", {
        cluster: "ap2",
        encrypted: true,
      });

      var channel = pusher.subscribe("food-poll");

      channel.bind("food-vote", function (data) {
        dataPoints.forEach((point) => {
          if (point.label == data.food) {
            point.y += data.points;
            totalVotes += data.points;
            e = new CustomEvent("votesAdded", {
              detail: { totalVotes: totalVotes },
            });
            document.dispatchEvent(e);
          }
        });
        chart.render();
      });
    }
  });

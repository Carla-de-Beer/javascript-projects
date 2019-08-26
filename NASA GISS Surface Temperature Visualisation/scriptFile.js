// Carla de Beer
// August 2019
// A visualisation of global temperature anomalies, based on temperature information provided by NASA GISS.
// Based on Daniel Shiffman's Coding Train video example:
// https://www.youtube.com/watch?v=5-ptp9tRApM
// Temperature data obtained from: https://data.giss.nasa.gov/gistemp/
// Chart library: https://www.chartjs.org

drawGraph();

async function drawGraph() {
  const url_GM = "resources/GLB.Ts+dSST.csv";
  const url_NH = "resources/NH.Ts+dSST.csv";
  const url_SH = "resources/SH.Ts+dSST.csv";
  const url_ZAM = "resources/ZonAnn.Ts+dSST.csv";

  const data_GM = await fetchCSVData(url_GM)
    .then(console.log("Dataset GM loaded."))
    .catch(error => {
      console.error(error);
    });

  const data_NH = await fetchCSVData(url_NH)
    .then(console.log("Dataset NH loaded."))
    .catch(error => {
      console.error(error);
    });

  const data_SH = await fetchCSVData(url_SH)
    .then(console.log("Dataset SH loaded."))
    .catch(error => {
      console.error(error);
    });

  const data_ZAM = await fetchCSVData(url_ZAM)
    .then(console.log("Dataset ZAM loaded."))
    .catch(error => {
      console.error(error);
    });

  const mainTitle =
    "Combined Land-Surface Air and Sea-Surface Water Temperature Anomalies (Land-Ocean Temperature Index, LOTI)";
  const label_GM = "Global-mean monthly, seasonal, and annual means (°C)";
  const label_NH =
    "Northern Hemisphere-mean monthly, seasonal, and annual means (°C)";
  const label_SH =
    "Southern Hemisphere-mean monthly, seasonal, and annual means (°C)";
  const label_ZAM = "Zonal annual means (°C)";

  const context = document.getElementById("chart").getContext("2d");
  const chart = new Chart(context, {
    type: "line",
    data: {
      labels: data_NH.yearArray,
      datasets: [{
          label: label_GM,
          data: data_GM.tempArray,
          fill: false,
          backgroundColor: "rgba(237, 191, 26, 0.4)",
          borderColor: "rgba(237, 191, 26, 0.7)",
          borderWidth: 1,
          pointStyle: "circle"
        },
        {
          label: label_NH,
          data: data_NH.tempArray,
          fill: false,
          backgroundColor: "rgba(90, 99, 180, 0.4)",
          borderColor: "rgba(90, 99, 180, 0.7)",
          borderWidth: 1,
          pointStyle: "rectRot"
        },
        {
          label: label_SH,
          data: data_SH.tempArray,
          fill: false,
          backgroundColor: "rgba(90, 199, 180, 0.4)",
          borderColor: "rgba(90, 199, 180, 0.7)",
          borderWidth: 1,
          pointStyle: "rectRounded"
        },
        {
          label: label_ZAM,
          data: data_ZAM.tempArray,
          fill: false,
          backgroundColor: "rgba(255, 99, 132, 0.4)",
          borderColor: "rgba(255, 99, 132, 0.7)",
          borderWidth: 1
        }
      ]
    },

    options: {
      title: {
        display: true,
        text: mainTitle
      },
      scales: {
        yAxes: [{
          ticks: {
            callback: function (value) {
              return value + "°";
            }
          }
        }]
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 100
      }
    }
  });
}

async function fetchCSVData(url) {
  const response = await fetch(url);
  const data = await response.text();
  const rows = data.split(/\n/).slice(1);
  let yearArray = [];
  let tempArray = [];

  rows.forEach(row => {
    const columns = row.split(/,/);
    yearArray.push(columns[0]);
    tempArray.push(columns[1] + 15);
  });

  return {
    yearArray,
    tempArray
  };
}
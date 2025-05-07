async function buildChart() {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=47.3667&longitude=8.55&daily=temperature_2m_max,rain_sum,temperature_2m_min,weather_code&timezone=GMT');
    const result = await response.json();
//    console.log(result);

    const labels = result.daily.time;
    const maxTemp = result.daily.temperature_2m_max;
    const minTemp = result.daily.temperature_2m_min;
    const rain = result.daily.rain_sum;

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Max Temperature (°C)',
          data: maxTemp,
          backgroundColor: 'rgba(212, 100, 7, 0.94)',
          borderColor: 'rgba(212, 100, 7, 0.94)',
          borderWidth: 1,
          type: 'bar',
          order: 2
        },
        {
          label: 'Min Temperature (°C)',
          data: minTemp,
          backgroundColor: 'rgba(29, 6, 238, 0.92)',
          borderColor: 'rgba(29, 6, 238, 0.92)',
          borderWidth: 1,
          type: 'bar',
          order: 2
        },
        {
          label: 'Rain (mm)',
          data: rain,
          borderColor: 'rgba(9, 147, 228, 0.8)',
          backgroundColor: 'rgba(9, 147, 228, 0.8)',
          type: 'line',
          yAxisID: 'y1',
          tension: 0.4,
          order: 1
        }
      ]
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Daily Max/Min Temperature and Rain Forecast'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Temperature (°C)'
            }
          },
          y1: {
            position: 'right',
            grid: {
              drawOnChartArea: false
            },
            title: {
              display: true,
              text: 'Rain (mm)'
            }
          }
        }
      }
    };

    const ctx = document.getElementById('weatherChart').getContext('2d');
    new Chart(ctx, config);
}
buildChart();
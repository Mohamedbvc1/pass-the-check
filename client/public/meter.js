async function stockData(){
  const url = 'http://localhost:3000/data/restaurant.json';
  const response = await fetch (url)
  // wait for the request to be completed
  const datapoints = await response.json();
   
 return datapoints;


};


stockData().then(datapoints => {

const violation = datapoints.map(function(index){
    
    return index.violation;
  })


  const criticalCount = violation.map((violationArray ) => {
    if ( ! violationArray){
      return 0
    }

    return violationArray.filter((v)=> v.critical ).length


  })


  myChart.config.data.datasets[0].needleValue = criticalCount[0];
  myChart.update()

})


const chartWidth = document.querySelector('.chartBox').getBoundingClientRect().width - 46; 
const ctx = document.getElementById('myChart').getContext('2d');
const gradientSegment = ctx.createLinearGradient(0, 0, chartWidth, 0);
gradientSegment.addColorStop(0, 'green');
gradientSegment.addColorStop(0.7, 'yellow');
gradientSegment.addColorStop(1, 'red');

// setup 
const data = {
    labels: ['', ''],
    datasets: [{
      label: '',
      data: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      backgroundColor: [gradientSegment, 'rgba(0, 0, 0, 1)'],
      borderColor: [gradientSegment, 'rgba(0, 0, 0, 1)'],
      borderWidth: 1,
      cutout:'90%',
      circumference: 180,
      rotation: 270,
      needleValue: 10,
      borderColor: 'black',
      borderWidth: 4,
      borderRadius:5

    }]
  };
  //gaugeChartText pluging block
  const gaugeChartText = {
    id:'gaugeChartText',
    afterDatasetsDraw(chart, args, pluginOptions){
        const {ctx, data, chartArea:{
            top, bottom, left, right, width, height}, 
               scales: {r} } = chart;
          

            ctx.save();
            const xCoor = chart.getDatasetMeta(0).data[0].x;
            const yCoor = chart.getDatasetMeta(0).data[0].y;
            const score = data.datasets[0].needleValue;
            let rating;
            if(score < 5){ rating = 'Very Good';}
            if(score >= 5 && score <= 30){ rating = 'Fair';}
            if(score > 30){ rating = 'bad';}
            if(score >= 31){ rating = 'Very Bad'}

       

            function textLabel(text, x, y, fontSize, textBaseLine, TextAlign) {
                ctx.font = fontSize;
                ctx.fillStyle = '#666';
                ctx.texBaseLine = textBaseLine;
                ctx.textAlign = TextAlign;
                ctx.fillText( text, x, y); 
            }
            
            textLabel('Safe', left, yCoor + 20, '20px sans-serif', 'top', 'left');
            textLabel('Danger', right, yCoor + 20, '20px sans-serif', 'top', 'right');
            textLabel(score, xCoor, yCoor , '50px sans-serif', 'bottom', 'center');
            textLabel(rating, xCoor, yCoor -80 , '50px sans-serif', 'bottom', 'center');

        

         }
    }

    const gaugeNeedle = {
      id: 'gaugeNeedle',
      afterDatasetsDraw(chart, args, plugins)
          {
          const { ctx, data } = chart;
  
                ctx.save();
               const xCenter = chart.getDatasetMeta(0).data[0].x;
               const yCenter = chart.getDatasetMeta(0).data[0].y;
               const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
               const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
               const widthslice =(outerRadius - innerRadius)/2;
               const radius = 3;
               const angle = (Math.PI / 180);
  
               const needleValue = data.datasets[0].needleValue;
               const dataTotal = data.datasets[0].data.reduce((a, b) =>
               a+b, 0);
              const cirl = ((chart.getDatasetMeta(0).data[0].circumference
               / Math.PI) / data.datasets[0].data[0]) * needleValue;
               
              ctx.translate(xCenter, yCenter);
              ctx.rotate(Math.PI * (cirl + 1.5));
              
              //needle
              ctx.beginPath();
              ctx.strokeStyle = 'black';
              ctx.fillStyle = 'black';
              ctx.lineWith = 1;
               ctx.moveTo(0 - radius, 0);
               ctx.lineTo(0,0 - innerRadius - widthslice);
               ctx.lineTo(0 + radius, 0);
              //  ctx.closePath();
               ctx.stroke();
               ctx.fill();
              
  
               //dot
               ctx.beginPath();
               ctx.arc(0, 0, radius, 0, angle * 360, false);
               ctx.fill();
  
  
               ctx.restore();
          }
          
      }

  // config 
  const config = {
    type: 'doughnut',
    data,
    options: {
         maintainAspectRatio: false,
        aspectRatio: 1.5,
        plugins: {
            legend:{
                    display:false,
                 },
            tooltip:{
                enabled:false
                 } 
         }
      
    },


    plugins: [gaugeChartText,gaugeNeedle],
  };

  // render init block
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

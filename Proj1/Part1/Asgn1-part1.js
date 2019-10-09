var svg = d3.select('svg');

var mileage_barchart = data => {

  //define width, height and margin variable
  var width = 1000;
  var height = 550;
  var margin = {top: 20, bottom: 20, left: 100, right: 5};
  var innerWidth = width - margin.left - margin.right;
  var innerHeight = height - margin.top - margin.bottom;

  //define Linear Scale for Miles
  var xScale = d3.scaleLinear()
     .domain([0, 500 + d3.max(data, d=> d.Miles)])
     .range([0, innerWidth]);

  //Add X axis
  var xAxis = d3.axisBottom(xScale);

  //define Band scale for Month of the year
  var yScale = d3.scaleBand()
     .domain(data.map(d=> d.Month))
     .range([0,innerHeight])
     .padding(0.18);

  //Add Y axis
  var yAxis = d3.axisLeft(yScale);

  //define a svg group element to group all the elements together
  g = svg.append('g')
         .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');//define margine

  g.append('g').call(yAxis);// use Y axis for group element
  g.append('g').call(xAxis)// use X axis for group element
               .attr('transform', 'translate(0 ' + innerHeight + ')');

  g.selectAll('rect').data(data)
     .enter()
     .append('rect')
     .attr('y', d => yScale(d.Month))
     .attr('width', d => xScale(d.Miles))
     .attr('height', yScale.bandwidth());

};

//Load Data from travel_mileage.csv,
//which contains month-wise travel miles since Jan 2017

d3.csv('travel_mileage.csv').then(data => {
  data.forEach(d => {
    d.Miles = +d.Miles;
  });

  // Call mileage_barchart function to visualize mileage data
  mileage_barchart(data);

});

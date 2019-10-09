var Width = 15000,
    barHeight = 10,
    labelWidth = 30;


//define x scale, which will present mileage info
var x = d3.scaleLinear()
     .range([0, Width - labelWidth]);


// define chart
var chart = d3.select(".chart")
    .attr("width", Width);

// get data

d3.csv("travel_mileage.csv").then(data => {
   x.domain([20, d3.max(data, d=> d.Miles) + 10]);

   console.log(data);
   chart.attr("height", barHeight * 1.2 * ( data.length + 2));

  // define bars
   var bars = chart.selectAll("g")
                   .data(data)
                   .enter().append("g")
                   .attr("transform", function(d, i) {
                     return "translate(" + (5+labelWidth) + ","
                                         + i * (barHeight + 2)
                                         +
                                      ")";
                   }
                   );

  bars.append("rect")
      .attr("class", "miles")
      .attr("width", function(d) { return x(d.Miles); })
      .attr("height", barHeight)
      .attr("fill", "steelblue")

   // mouse over
    .on("mouseover",function(d, i) {
        d3.select(this).attr("fill", "orange");
        hoverText.text(d.Miles);
      hoverGroup.style("visibility","visible");
    })

  // mouse move
   .on("mousemove",function(d, i) {
  var that = this;
  hoverGroup.attr("transform",function() {
    return "translate("+((d3.mouse(that)[0] + 80))+","+(i*barHeight+d3.mouse(that)[1])+")";
  });
})

  //mouse out
.on("mouseout",function(d, i) {
    d3.select(this).attr("fill", "steelblue");
    hoverGroup.style("visibility","hidden");
});

 //hover group
 var hoverGroup = chart.append("g").style("visibility","hidden");

hoverGroup.append("rect")
.attr("x",0)
.attr("y",0)
.attr("width",50)
.attr("height",20)
.attr("fill","rgb(100,100,100)");

 //hover text
  var hoverText = hoverGroup.append("text").attr("x",14).attr("y",15);


 // append values to the bar
    bars.append("text")
      .attr("class", "value")
      .attr("x", function(d) { return x(d.Miles) - 1; })
      .attr("y", barHeight/2 )
      .attr("dy", ".35em")
      .text(function(d) { return d.Miles; });

  // append label to the bar
  bars.append("text")
      .attr("class", "label")
      .attr("x", -(labelWidth + 4))
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d.Month; });

}
);


// Add an event listener to the button created in the html part
 d3.select("#Average").on("click", function(){

// Set the dimensions of the canvas / graph

var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the date
var parseDate = d3.timeParse("%d-%b-%y");

// Set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 10]);

// Define the axis
var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);

// Define the line
var line = d3.line()
    .x(function(d) { return x(d.Month); })//x axis shows month of the year
    .y(function(d) { return y(d.Miles); }); // y axis shows mileage monthwise


// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
var linechart = svg.append("g")
        .attr("transform",
              "translate(" + (margin.left) + "," + (margin.top -20)+ ")");


    // Get the data
d3.csv("Month_mileage.csv").then(data => {
  data.forEach(function(d) {
      d.Month = parseDate(d.Month);
      d.Miles = +d.Miles;
    });

  // store maximum and minimum values of the data
  var maxDate = d3.max(data, function(d){return d.Month;}),
          minDate = d3.min(data, function(d){return d.Month;}),
          maxMile = d3.max(data, function(d){return d.Miles;});


    // Scale the range of the data
    x.domain([minDate, maxDate]);
    y.domain([0, maxMile]);

    // Add the valueline path.
    linechart.append("path")
        .attr("class", "line")
        .attr("d", line(data));

    // Add the X Axis
    linechart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    linechart.append("g")
        .attr("class", "y axis")
        .call(yAxis);


}
); // end of function


} );// end of button click event

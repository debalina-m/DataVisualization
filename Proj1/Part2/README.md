In the first part of the project I simply built a bar chart for visualizing month-wise travel miles in last couple and half years.

In this part, I have added couple interactions to make it more human readable.

First Interaction:
With mouse-hover the current bar will be highlighted in orange and will display its mile value.
Upon mouse-out, the color of the bar will be reset to steelblue.

Second Interaction:
A click button is added in the page. Name of the button is "ClickMe for LineChart".
This works as an vent listener. Upon button-click, a line chart of the data shows up in the screen.
The line chart has the axis and scales for effective human reading.

1. travel_mileage.csv file holds the month-wise travel miles since January 2017. Month_mileage.csv file holds same information. The only difference is Month data are entered in '%d-%b-%yyyy' format for convenience of building line chart.
2. index.html is the main html file for this project, from which javascript (Asgn1-part2.js) and css style sheet (css/styles.css) files are called.
3. Asgn1-part2.js is the java script file used for this project
4. styles.css is the css file used for styling
5. Monthly_Travel_Mile_Chart.doc is the screenshot of the final page.

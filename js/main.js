// setting up constants
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 450;
const MARGINS = {left: 60, right: 60, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// setting up three frames
const FRAME1 = d3.select('#left')
                .append('svg')
                .attr('height', FRAME_HEIGHT)
                .attr('width', FRAME_WIDTH)
                .attr('class', 'frame');

const FRAME2 = d3.select('#right')
                .append('svg')
                .attr('height', FRAME_HEIGHT)
                .attr('width', FRAME_WIDTH)
                .attr('class', 'frame');

// read in the data
d3.csv("data/city-hall.csv").then( function(data) {

 // When reading the csv, format variables:
  let parse = function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.DateTime_Measured), value : d.Total_Demand_KW }
  }.then(

  // Now I can use this dataset:
  function(data) {

    // Add X axis --> it is a date format
    const x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )

})

};


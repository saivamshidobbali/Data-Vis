/**
 * Makes the first bar chart appear as a staircase.
 *
 * Note: use only the DOM API, not D3!
 */
function staircase() {
  
  // ****** TODO: PART II ******
  let group = document.getElementById("aBarChart");
  let c = group.children;
  currentWidth = 10
  for (let i = 0; i < group.children.length; i++) {
    currentWidth = currentWidth + 20
    c[i].setAttribute("width", (currentWidth).toString())
  }  
}

//function select_option() {
// initialize the favorite fruit field: 
//document.getElementById("dataset").onchange = changeData();
//}
/**
 * Render the visualizations
 * @param data
 */
function update(data) {
  /**
   * D3 loads all CSV data as strings. While Javascript is pretty smart
   * about interpreting strings as numbers when you do things like
   * multiplication, it will still treat them as strings where it makes
   * sense (e.g. adding strings will concatenate them, not add the values
   * together, or comparing strings will do string comparison, not numeric
   * comparison).
   *
   * We need to explicitly convert values to numbers so that comparisons work
   * when we call d3.max()
   **/

  for (let d of data) {
    d.a = +d.a; //unary operator converts string to number
    d.b = +d.b; //unary operator converts string to number
  }

  // Set up the scales
  // TODO: The scales below are examples, modify the ranges and domains to suit your implementation.
  let aScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.a)])
    .range([0, 10]);


  let bScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.b)])
    .range([0, 10]);


  let iScale = d3
    .scaleLinear()
    .domain([0, data.length])
    .range([0, 10]);


  // ****** TODO: PART III (you will also edit in PART V) ******
  // BAR CHARTS
  // TODO: Select and update the 'a' bar chart bars

  y_position = [0,20,40,60,80,100,120,140,160,180,200]
  let g_x = d3.selectAll(".bar-chart-x");
  let rect_bar_x = g_x.selectAll("rect").data(data)
     .join("rect")
     .attr("width", d=> 0)
     .attr("height", 18)
     .attr("x", d=> 0)
     .attr("y", (d,i)=> y_position[i])
     .attr('transform', "scale(-1,1)")
 

   rect_bar_x.transition()
        .duration(3000)
        .attr("x", d=> 0)
        .attr("y", (d, i) => y_position[i])
        .attr("width", d => d.a * 20)
        .attr("height", 18)
        .style("opacity", 1);

  rect_bar_x.exit()
        .style("opacity", 1)
        .transition()
        .attr("width", d=> 0)
        .duration(3000)
        .style("opacity", 0)
        .remove();
   
  // TODO: Select and update the 'b' bar chart bars

  let g_y = d3.selectAll(".bar-chart-y")
  let rect_bar_y = g_y.selectAll("rect").data(data)
                 .join("rect")
                 .attr("width", d=> 0)
                 .attr("height", 18)
  
  rect_bar_y.transition()
        .duration(3000)
        .attr("x", d=> 0)
        .attr("y", (d, i) => y_position[i])
        .attr("width", d => d.b * 20)
        .attr("height", 18)
        .style("opacity", 1);

  rect_bar_y.exit()
        .style("opacity", 1)
        .transition()
        .duration(3000)
        .style("opacity", 0)
        .remove();




  // TODO: Select and update the 'a' line chart path using this line generator

  let aLineGenerator = d3
    .line()
    .x((d, i) => iScale(i))
    .y(d => aScale(d.a));

  
  let aLineGenerator_y = d3
    .line()
    .x((d, i) => iScale(i))
    .y(d => bScale(d.b));


  let line_x = d3.select("#aLineChart").data(data)
  line_x.attr("d", aLineGenerator(data))

  line_x.style("opacity", 0)
        .transition()
        .duration(3000)
        .style("opacity", 1)


  // TODO: Select and update the 'b' line chart path (create your own generator)
  let line_y = d3.select("#bLineChart").data(data)
  line_y.attr("d", aLineGenerator_y(data));

  line_y.style("opacity", 0)
        .transition()
        .duration(3000)
        .style("opacity", 1)

  // TODO: Select and update the 'a' area chart path using this area generator

  let aAreaGenerator = d3
    .area()
    .x((d, i) => iScale(i))
    .y0(0)
    .y1(d => aScale(d.a));

  let bAreaGenerator = d3
    .area()
    .x((d, i) => iScale(i))
    .y0(0)
    .y1(d => bScale(d.b));  


  let area_x = d3.select("#aAreaChart").data(data)
  area_x.attr("d", aAreaGenerator(data));

  area_x.style("opacity", 0)
        .transition()
        .duration(3000)
        .style("opacity", 1)  

  // TODO: Select and update the 'b' area chart path (create your own generator)
  let area_y = d3.select("#bAreaChart").data(data)
  area_y.attr("d", bAreaGenerator(data));

  area_y.style("opacity", 0)
        .transition()
        .duration(3000)
        .style("opacity", 1)

  // TODO: Select and update the scatterplot points

const plotDimensionX = 380;
const plotDimensionY = 290
//const plot = d3.select('#scatterplot').attr('transform', `translate(${500 - plotDimensionX/2}, ${250 - plotDimensionY/2})`)
const svg = d3.select('.scatter-plot');

const group = svg.select('#scatterplot').attr('transform', 'translate(0,0)')

let regression_line_group = group.select(".line-chart");
let regression_line = regression_line_group.select("#regression-line");  

regression_line.attr("x1", 60)
               .attr("y1", 250)
               .attr("x2", 340)
               .attr("y2", 110);

const circles = group.selectAll('circle').data(data).join('circle');

circles.attr('cx', d => d.a*20)
        .attr('cy', d => 290-(d.b*20))
        .attr('r', 5)
        .attr('transform', 'translate(17,0)')
        
 let text_tag = circles.select("title")
 text_tag.text(function(d, i) { return " "+d.a+", "+ d.b  });


circles.style("opacity", 0)
       .transition()
       .duration(3000)
       .style("opacity", 1)  

xAxisGroup = group.select("#x-axis").attr('transform', 'translate(20,290)')
yAxisGroup = group.select('#y-axis').attr('transform', 'translate(20,0)')

const xScale = d3.scaleLinear().domain([0, 19]).range([0, plotDimensionX])
const yScale = d3.scaleLinear().domain([0, 14]).range([plotDimensionY, 5])

const xAxisScale = d3.axisBottom(xScale);
const yAxisScale = d3.axisLeft(yScale);

xAxisGroup.call(xAxisScale);
yAxisGroup.call(yAxisScale);


// EVENTS:

let bar_chart_x = document.getElementById("aBarChart");
    
for ( let i=0; i < bar_chart_x.children.length; i++)
{
         bar_chart_x.children[i].addEventListener("mouseover", function() { 
          
         bar_chart_x.children[i].style.fill = "#C0C0CF";

    })
         
         bar_chart_x.children[i].addEventListener("mouseout", function() { 
          
         bar_chart_x.children[i].style.fill = "#c7001e";

    })
}


let bar_chart_y = document.getElementById("BarChart_b");
    
 let b = bar_chart_y.children;

for ( let i=0; i< bar_chart_y.children.length; i++)
{
         b[i].addEventListener("mouseover", function() { 
          
         b[i].style.fill = "#C0C0CF";

    })
         
         b[i].addEventListener("mouseout", function() { 
          
         b[i].style.fill = "#086fad";

    })
}
}


/**
 * Update the data according to document settings
 */
async function changeData() {
  //  Load the file indicated by the select menu
  let dataFile = document.getElementById("dataset").value;

   try {
    const data = await d3.csv("data/" + dataFile + ".csv");

    if (document.getElementById("random").checked) {
          update(randomSubset(data)); // update w/ random subset of data
    } else {
      update(data); // update w/ full data
    }
  } 

  catch (error) {
    alert("Could not load the dataset!", error);
  }

}

/**
 *  Slice out a random chunk of the provided in data
 *  @param data
 */
function randomSubset(data) {
  return data.filter(d => Math.random() > 0.5);
}

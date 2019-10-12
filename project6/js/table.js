/** Class implementing the table. */
class Table {
    /**
     * Creates a Table Object
     */
    constructor(teamData, treeObject) {

        // Maintain reference to the tree object
        this.tree = treeObject;

        /**List of all elements that will populate the table.*/
        // Initially, the tableElements will be identical to the teamData
        this.tableElements = teamData;

        ///** Store all match data for the 2018 Fifa cup */
        this.teamData = teamData;

        this.tableHeaders = ["Delta Goals", "Result", "Wins", "Losses", "TotalGames"];

        /** letiables to be used when sizing the svgs in the table cells.*/
        this.cell = {
            "width": 70,
            "height": 20,
            "buffer": 15
        };

        this.bar = {
            "height": 20
        };

        /** Set variables for commonly accessed data columns*/
        this.goalsMadeHeader = 'Goals Made';
        this.goalsConcededHeader = 'Goals Conceded';

        /** Setup the scales*/
        this.goalScale = d3.scaleLinear()
            .range([0,this.cell.width * 2]);


        /** Used for games/wins/losses*/
        this.gameScale =d3.scaleLinear()
            .range([0,this.cell.width]);

        /**Color scales*/
        /**For aggregate columns*/
        /** Use colors '#feebe2' and '#690000' for the range*/
        this.aggregateColorScale = d3.scaleLinear()
            .range(["#feebe2","#690000"]);


        /**For goal Column*/
        /** Use colors '#cb181d' and '#034e7b' for the range */
        this.goalColorScale =  d3.scaleThreshold()
            .range(["#cb181d","#034e7b"]);

        this.ascending = false;

    }


    /**
     * Creates a table skeleton including headers that when clicked allow you to sort the table by the chosen attribute.
     * Also calculates aggregate values of goals, wins, losses and total games as a function of country.
     *
     */
    createTable() {

        // ******* TODO: PART II *******

        //Update Scale Domains
        
        // Create the axes
        
        //add GoalAxis to header of col 1.

        // ******* TODO: PART V *******

        // Set sorting callback for clicking on headers
        

        //Set sorting callback for clicking on Team header
        //Clicking on headers should also trigger collapseList() and updateTable().

        // ******* TODO: PART II *******

        let maxGoalsMade = d3.max(this.tableElements, function (d) {
            return d.value["Goals Made"];
        })
        let maxGoalsConceded = d3.max(this.tableElements, function (d) {
            return d.value["Goals Conceded"];
        })
        let maxGoals = d3.max([maxGoalsConceded, maxGoalsMade]);
        let maxTotalGames = d3.max(this.tableElements, function (d) {
            return d.value.TotalGames;
        })

        //Update Scale Domains
        this.goalScale.domain([0,maxGoals]);
        this.gameScale.domain([0,maxTotalGames]);
        this.aggregateColorScale.domain([0,maxTotalGames]);
        this.goalColorScale.domain([0]);

        // Create the x axes for the goalScale.
        let axis = d3.axisTop()
            .scale(this.goalScale);

        //add GoalAxis to header of col 1.
        let goalaxis = d3.select("#goalHeader")
            .attr("style", "padding: 1px 5px")

        goalaxis.append("svg")
            .attr("width", this.cell.width * 2 + 20)
            .attr("height", this.cell.height)
            .append("g")
            .attr("transform", "translate(10, 17)")
            .call(axis);

        // ******* TODO: PART V *******

        // Set sorting callback for clicking on headers

        this.tableHeaders.splice(0, 0, "Team");

        let thead = d3.select("thead").select("tr");
        let thtd = thead.selectAll("th, td")
            .data(this.tableHeaders)
            .on("click", d => this.sortColumn(d));
        // Clicking on headers should also trigger collapseList() and updateTable().

    }

sort_teams(d) {
    if(this.ascending) {
      this.tableElements.sort(function (a, b) {
      return a.key.localeCompare(b.key);})
      this.ascending = false;
   } else {
        this.tableElements.sort(function (a, b) {
        return b.key.localeCompare(a.key);})
        this.ascending = true;
   }
}

sort_result(d) {
    if(this.ascending) {
        this.tableElements.sort(function (a, b) {
        return a.value.Result.ranking - b.value.Result.ranking;})
        this.ascending = false;
    } else {
         this.tableElements.sort(function (a, b) {
        return b.value.Result.ranking - a.value.Result.ranking;})       
         this.ascending = true;
    }
}

sort_goals(d)
{

   if(this.ascending) {
        this.tableElements.sort(function (a, b) {
        return a.value[d] - b.value[d];})
        this.ascending = false;
    } else {
        this.tableElements.sort(function (a, b) {
        return b.value[d] - a.value[d];})
        this.ascending = true;
    }
}

    sortColumn(d) {
        this.collapseList();
            if (d == "Team") {
               this.sort_teams(d);
            } else if (d == "Result") {
               this.sort_result(d);
            } else {
               this.sort_goals(d);
            }
        
        this.updateTable();
}


    /**
     * Updates the table contents with a row for each element in the global variable tableElements.
     */
    updateTable() {
        // ******* TODO: PART III *******
        //Create table rows

        //Append th elements for the Team Names

        //Append td elements for the remaining columns. 
        //Data for each cell is of the type: {'type':<'game' or 'aggregate'>, 'vis' :<'bar', 'goals', or 'text'>, 'value':<[array of 1 or two elements]>}
        
        //Add scores as title property to appear on hover

        //Populate cells (do one type of cell at a time )

        //Create diagrams in the goals column

        //Set the color of all games that tied to light gray

        let goalScale = this.goalScale;
        let gameScale = this.gameScale;
        let aggregateColorScale = this.aggregateColorScale;
        let goalColorScale = this.goalColorScale;

        // ******* TODO: PART III *******
        //Create table rows
        let tablerows = d3.select("tbody").selectAll("tr")
            .data(this.tableElements)
            .join('tr')
            .attr("class", d => d.value.type == "aggregate" ? "aggregate" : "game")
            .on("mouseover", d => this.tree.updateTree(d))
            .on("mouseout", d => this.tree.clearTree());

        //Append th elements for the Team Names
        let th = tablerows.selectAll("th")
            .data( d => [d])
            .join('th')
            .text( d => d.value.type == "aggregate" ? d.key : "x"+d.key)
            .on("click", d => this.updateList(d));

        //Append td elements for the remaining columns. 
        //Data for each cell is of the type: {'type':<'game' or 'aggregate'>, 'value':<[array of 1 or two elements]>}
        let table_cols = tablerows.selectAll("td")
            .data(function (d, i) {
                let build_data = [];
                if (d.value.type == "aggregate") {
                    let goals = {type: d.value.type, vis: "goals", value: {delta: d.value["Delta Goals"], conceded: d.value["Goals Conceded"], made: d.value["Goals Made"]}};
                    let texts = {type: "aggregate", vis: "texts", value: d.value.Result.label};
                    let wins = {type: "aggregate", vis: "bars", value: d.value.Wins};
                    let losses = {type: "aggregate", vis: "bars", value: d.value.Losses};
                    let total = {type: "aggregate", vis: "bars", value: d.value.TotalGames};
                    build_data.push(goals);
                    build_data.push(texts);
                    build_data.push(wins);
                    build_data.push(losses);
                    build_data.push(total);
                } else {
                    let goalsmade = d.value["Goals Made"];
                    let goalsconceded = d.value["Goals Conceded"];
                    let goals = {type: "game", vis: "goals", value: {delta: goalsmade - goalsconceded, conceded: goalsconceded, made: goalsmade}};
                    let texts = {type: "game", vis: "texts", value: d.value.Result.label};
                    let empty = {type: "game", vis: "empty"}
                    build_data.push(goals);
                    build_data.push(texts);
                    build_data.push(empty);
                    build_data.push(empty);
                    build_data.push(empty);
                }
                return build_data;
            }).join('td');

        //populate bar charts
        // aggregate bars
        let tdbars = table_cols.filter((d, i) => d.type == "aggregate" && d.vis == "bars").attr("style", "padding: 2px 2px 2px 0px");

        // add svgs for all those td's
        let bars_svg = tdbars.selectAll("svg")
              .data(d => [d])
              .join("svg")
              .attr("width", this.cell.width)
              .attr("height", this.cell.height);

        // add rects to those svgs
        let bars_rect = bars_svg.selectAll("rect")
            .data( d => [d])
            .join('rect')
            .attr("width", d => gameScale(d.value))
            .attr("height", this.bar.height)
            .attr("fill", d=> aggregateColorScale(d.value));
        
      // add text to those bars
      let bars_text = bars_svg.selectAll("text")
            .data( d => [d])
            .join('text')
            .attr("x", d => gameScale(d.value) - 10)
            .attr("y", this.cell.height / 2 + 4)
            .attr("class", "label")
            .text( d => d.value);

        // Handle games
        let empty = table_cols.filter( d => d.type == "game" && d.vis == "empty")
        empty.select("svg").remove();

        //populate goals charts
        let tdgoals = table_cols.filter( d => d.vis == "goals")
            .attr("title", function (d) {
                return "Goals Made: "+d.value.made+"\n"+
                       "Goals Conceded: "+d.value.conceded+"\n"+
                       "Delta: "+d.value.delta;
            })

        let goals_svg = tdgoals.selectAll("svg").data( d => [d]).join("svg")
                              .attr("width", this.cell.width * 2 + 20)
                              .attr("height", this.cell.height)

        let goals = goals_svg.selectAll("g")
              .data( d => [d])
              .join('g')
              .attr("transform", "translate(10, 0)")

        let goals_rect = goals.selectAll("rect")
            .data(d => [d])
            .join('rect')
            .attr("x", d => goalScale(d3.min([d.value.made, d.value.conceded])))
            .attr("y", d => d.type == "aggregate" ? 4 : 7)
            .attr("width", function (d) {
                return goalScale(d.value.delta > 0 ? d.value.delta : -d.value.delta);
            })
            .attr("height", d => d.type == "aggregate" ? this.bar.height - 8 : (this.bar.height - 14))
            .attr("fill", d => goalColorScale(d.value.delta));

        let goals_circle = goals.selectAll("circle")
            .data(function (d) {
                let bind_data = [];
                bind_data.push({type: d.type, value: d.value.conceded, made: false, delta: d.value.delta});
                bind_data.push({type: d.type, value: d.value.made, made: true, delta: d.value.delta});
                return bind_data;
            }).join('circle')
              .attr("cx",  d => goalScale(d.value))
              .attr("cy", this.bar.height / 2)
              .attr("r", d => d.type == "aggregate" ? (this.bar.height - 8) / 2 : (this.bar.height - 8) / 2)
              .attr("fill", function (d) {
                if (d.type == "aggregate") {
                    if (d.delta == 0)
                        return "#888888";
                    if (d.made)
                        return "#034e7b";
                    else
                        return "#cb181d";
                } else {
                    return "#ffffff";
                }
            })
            .attr("stroke", function (d) {
                if (d.type == "aggregate") {
                    return null;
                } else {
                    if (d.delta == 0)
                        return "#888888";
                    if (d.made)
                        return "#034e7b";
                    else
                        return "#cb181d";
                }
            })
            .attr("stroke-width", function (d) {
                d.type == "aggregate" ? null :  "3px";
            })
        
        let results = table_cols.filter(d => d.vis == "texts")
            .style("min-width", this.cell.width * 2+"px")
            .text(d => d.value);
    };

    /**
     * Updates the global tableElements variable, with a row for each row to be rendered in the table.
     *
     */
    updateList(i) {
        // ******* TODO: PART IV *******
       
        //Only update list for aggregate clicks, not game clicks
            if (i.value.type == "game")
            return;

    for (let k = 0; k < this.tableElements.length; k++)
     {

        if (this.tableElements[k].key == i.key && this.tableElements[k].value.type == "aggregate") {

            if( this.tableElements[k+1].value.type ==  "game") {

                this.tableElements.splice(k+1, this.tableElements[k].value.games.length);
                break; 
            }
                

            for (let j = 0 ; j < this.tableElements[k].value.games.length; j++) {
                    this.tableElements.splice(k+j+1, 0, this.tableElements[k].value.games[j]);
            }
        }
                        
    }

        this.updateTable()
    }

    /**
     * Collapses all expanded countries, leaving only rows for aggregate values per country.
     *
     */
    collapseList() {
        
        // ******* TODO: PART IV *******
        for (let i = 0; i <this.tableElements.length; i++) {
            if (this.tableElements[i].value.type == "game") {
                this.tableElements.splice(i, 1);
            }
        }

    }


}
    
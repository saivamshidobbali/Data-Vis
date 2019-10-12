    /**
     * Loads in the table information from fifa-matches-2018.json
     */
//d3.json('data/fifa-matches-2018.json').then( data => {

    /**
     * Loads in the tree information from fifa-tree-2018.csv and calls createTree(csvData) to render the tree.
     *
     */
 /*   d3.csv("data/fifa-tree-2018.csv").then(csvData => {

        //Create a unique "id" field for each game
        csvData.forEach( (d, i) => {
            d.id = d.Team + d.Opponent + i;
        });


        //Create Tree Object
        let tree = new Tree();
        tree.createTree(csvData);

        //Create Table Object and pass in reference to tree object (for hover linking)
        let table = new Table(data,tree);
        table.createTable();
        table.updateTable();
    });
});
*/


// // ********************** HACKER VERSION ***************************
/**
 * Loads in fifa-matches-2018.csv file, aggregates the data into the correct format,
 * then calls the appropriate functions to create and populate the table.
 *
 */

d3.csv("data/fifa-matches-2018.csv").then( matchesCSV => {

//     /**
//      * Loads in the tree information from fifa-tree-2018.csv and calls createTree(csvData) to render the tree.
//      *
//      */
    d3.csv("data/fifa-tree-2018.csv").then( treeCSV => {

//     // ******* TODO: PART I *******

        let ranking = {
           "Winner": 7,  "Runner-Up": 6, "Third Place": 5, "Fourth Place": 4, "Semi Finals": 3, "Quarter Finals": 2, "Round of Sixteen": 1, "Group": 0
        };

        console.log(matchesCSV);


        teamData = d3.nest()
            .key(d => d.Team)
            .rollup(function (nodes) 
            {
                
                nodes.sort(function (a, b) {
                    return ranking[b.Result] - ranking[a.Result];
                })

        ChildData = d3.nest()
                    .key(function (d) {
                        return d.Opponent;
                    }).rollup(function (nodes) {
                        return {
                            "Goals Made": nodes[0]["Goals Made"],
                            "Goals Conceded": nodes[0]["Goals Conceded"],
                            "Delta Goals": nodes[0]["Delta Goals"],
                            "Wins": nodes[0]["Wins"],
                            "Losses": nodes[0]["Losses"],
                            "Result": {"label": d3.max(nodes, l => l.Result), "ranking": ranking[d3.max(nodes, l => l.Result)]},
                            "type": "game",
                            "Opponent": nodes[0]["Team"],
                        }
                    })
                    .entries(nodes);
            

                return {
                    "Goals Made": d3.sum(nodes, l => l["Goals Made"]),
                    "Goals Conceded": d3.sum(nodes, l => l["Goals Conceded"]),
                    "Delta Goals": d3.sum(nodes, l => l["Delta Goals"]),
                    "Wins": d3.sum(nodes, l => l.Wins),
                    "Losses": d3.sum(nodes, l => l.Losses),
                    "TotalGames": nodes.length,
                    "Result": {"label": d3.max(nodes, l => l.Result), "ranking": ranking[d3.max(nodes, l => l.Result)]},
                    "type": "aggregate",
                    "games": ChildData
                }
            })
            .entries(matchesCSV)

        //Create a unique "id" field for each game
        treeCSV.forEach(function (d, i) {
            d.id = d.Team + d.Opponent + i;
        });

        //Create Tree Object
        let tree = new Tree();
        tree.createTree(treeCSV);

        //Create Table Object and pass in reference to tree object (for hover linking)
        let table = new Table(teamData,tree);

        table.createTable();
        table.updateTable();
          

     });

 });
// ********************** END HACKER VERSION ***************************

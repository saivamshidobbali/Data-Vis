/** Class representing a Tree. */
class Tree {
    /**
     * Creates a Tree Object
     * Populates a single attribute that contains a list (array) of Node objects to be used by the other functions in this class
     * note: Node objects will have a name, parentNode, parentName, children, level, and position
     * @param {json[]} json - array of json objects with name and parent fields
     */
    constructor(json) {

        this.Max_pos = 0;
        this.list_nodes = [];

        for (let i = 0; i < json.length; i++)
        {
            let TopNode = new Node(json[i].name, json[i].parent);
            this.list_nodes.push(TopNode);
        }


        for (let i = 0; i < this.list_nodes.length; i++)
        {
            let match_parent = this.list_nodes[i].parentName;
            for(let j = 0; j < this.list_nodes.length; j++)
            {

                if (this.list_nodes[j].name === match_parent)
                {
                      this.list_nodes[i].parentNode = this.list_nodes[j];
                      this.list_nodes[j].addChild(this.list_nodes[i]);
                }
            }
        }
   }

    /**
     * Function that builds a tree from a list of nodes with parent refs
     */
    buildTree() {
        // note: in this function you will assign positions and levels by making calls to assignPosition() and assignLevel()
        let i;

        for(i = 0; i < this.list_nodes.length; i++)
        {
            if (this.list_nodes[i].parentNode == null)
            {
                break;
            }
        }
                
        let root = this.list_nodes[i];
        root.level = 0;
        this.assignLevel(root, 0);
        this.assignPosition(root, 0);         
    }

    /**
     * Recursive function that assign levels to each node
     */
    assignLevel(node, level) {

        let local_level = level+1;

        for(let i = 0; i< node.children.length; i++)
        {
            node.children[i].level = local_level;
            this.assignLevel(node.children[i], local_level);
        }

    }

    /**
     * Recursive function that assign positions to each node
     */
    assignPosition(node, position) {
        
        node.position = position;

        for(let i = 0; i < node.children.length; i++)
        {
            this.assignPosition(node.children[i], this.Max_pos);
            if(i+1 < node.children.length) {
                 this.Max_pos = this.Max_pos + 1;       
            }

        }       
   }

    /**
     * Function that renders the tree
     */
    renderTree() {
           
      let  body_elem = d3.select("body");

      let svg = body_elem.append("svg")
                .attr("width",1200)
                .attr("height",1200);
  
      let lines = svg.selectAll('line')
                     .data(this.list_nodes)
                     .enter()
                     .append('line');
                     

      lines.filter(d=> d.parentName != "root")
           .attr('x1', function(d,i){ return d.level*150+60})
           .attr('y1', function(d,i) { return d.position*150+60})
           .attr('x2', function(d,i) { return d.parentNode.level*150+60})
           .attr('y2', function(d,i) { return d.parentNode.position*150+60});

      let groups = svg.selectAll('g')
                    .data(this.list_nodes)
                    .enter()
                    .append('g')
                    .attr("transform", "translate(50,60)");

      let group_class = groups.attr("class", "nodeGroup");

      let circles = group_class.append('circle')


      circles.attr('cx', d=> d.level*150)
           .attr('cy', d=> d.position*150)
           .attr('r', 50);

       let tag = group_class.append('text')
                    .attr("class", "label");

       tag.text(d=> d.name)
           .attr("x", (d, i)=> d.level*150)
           .attr("y", (d, i)=> d.position*150)


    }

}
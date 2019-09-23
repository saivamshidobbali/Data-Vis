/** Data structure for the data associated with an individual country. */
class InfoBoxData {
    /**
     *
     * @param country name of the active country
     * @param region region of the active country
     * @param indicator_name the label name from the data category
     * @param value the number value from the active year
     */
    constructor(country, region, indicator_name, value) {
        this.country = country;
        this.region = region;
        this.indicator_name = indicator_name;
        this.value = value;
    }
}

/** Class representing the highlighting and selection interactivity. */
class InfoBox {
    /**
     * Creates a InfoBox Object
     * @param data the full data array
     */
    constructor(data) {
         this.data = data;
         this.rebuild_population();
         this.list_of_infoBoxData = [];
    }


    rebuild_population() {
        //this.data['new_population'] = 0;
        let nameArray = this.data.population.map(d => d.geo);
        this.data['new_population'] = [{0: 0}];

        //this.data['new_population'][0] = {0: 0} ;

        for(let i = 0; i<this.data['gdp'].length; i++)
        {
                let y = nameArray.indexOf(this.data['gdp'][i].geo);
                
                if(y != -1)
                {
                      this.data['new_population'][i] = this.data['population'][y];
                }
                else {
                      this.data['new_population'][i] = null;
                }
        }

    }


    /**
     * Renders the country description
     * @param activeCountry the IDs for the active country
     * @param activeYear the year to render the data for
     */
    updateTextDescription(activeCountry, activeYear) {
        // ******* TODO: PART 4 *******
        // Update the text elements in the infoBox to reflect:
        // Selected country, region, population and stats associated with the country.
        /*
         * You will need to get an array of the values for each category in your data object
         * hint: you can do this by using Object.values(this.data)
         * you will then need to filter just the activeCountry data from each array
         * you will then pass the data as paramters to make an InfoBoxData object for each category
         *
         */

        //TODO - Your code goes here - 

        this.clearHighlight()

        let country_names = this.data.gdp.map(d => d.geo);
        let country_index = country_names.indexOf(activeCountry.toLowerCase());

        let child_mortality = this.data['child-mortality'][country_index][activeYear];
        let gdp=  this.data['gdp'][country_index][activeYear];
        let population= this.data['new_population'][country_index] === null ? 0 : this.data['new_population'][country_index][activeYear];
        let life_expectancy= this.data['life-expectancy'][country_index][activeYear];
        let fertility_rate= this.data['fertility-rate'][country_index][activeYear];

        let base = this.data['child-mortality'][country_index];

        this.list_of_infoBoxData.push(new InfoBoxData(base.country, base.region, 'child-mortality', child_mortality));  
        this.list_of_infoBoxData.push(new InfoBoxData(base.country, base.region, 'population', population));        
        this.list_of_infoBoxData.push(new InfoBoxData(base.country, base.region, 'life-expectancy', life_expectancy));            
        this.list_of_infoBoxData.push(new InfoBoxData(base.country, base.region, 'fertility-rate', fertility_rate));        
        this.list_of_infoBoxData.push(new InfoBoxData(base.country, base.region, 'gdp', gdp));        

        let countryDetail =  d3.select('#country-detail');
        let svg = countryDetail.select("#info-box"); 


        let tag = svg.selectAll('text')
                     .data(this.list_of_infoBoxData)
                     .join('text')
                     .text(d=> d.indicator_name+" : "+d.value)
                     .attr("transform", (d,i)=> "translate(0,"+ (i*30+60) +")")
                     .attr("class", "stats");

        svg.append('text').text(this.list_of_infoBoxData[0].country)
           .attr("transform", "translate(0,30)")
           .attr("class", "stats");              

        this.list_of_infoBoxData = [];
    }

    /**
     * Removes or makes invisible the info box
     */
    clearHighlight() {

        let countryDetail =  d3.select('#country-detail');
        let svg = countryDetail.select("#info-box");
        let dummy = svg.selectAll('.stats').remove();
    }

}
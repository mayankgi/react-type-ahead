//@flow
import './main.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

type Props = {}
type State = {
  results: [],
  showResults: boolean
};

const DEBOUNCED_TIME = 300;

export default class TypeAhead extends Component {

  state: State;
  debouncedTimerId: number;
  handleKeyUp: Function;
  handleBlur: Function;
  handleSelected: Function;
  positionList: Function;
  input: HTMLInputElement;

  constructor(props:Props){
    super(props);

    this.debouncedTimerId = 0;

    this.state = {
      results: [],
      showResults: false
    };

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.positionList = this.positionList.bind(this);
  }



  positionList(){
    if(!this.input) return {};
    const {offsetTop, offsetLeft, offsetWidth, offsetHeight} = this.input;
    return {
      top: offsetTop + offsetHeight,
      left: offsetLeft,
      width: offsetWidth
    }
  }

  handleKeyUp(ev:SyntheticKeyboardEvent){
    const {value} = ev.target;
    window.clearTimeout(this.debouncedTimerId);
    this.debouncedTimerId = window.setTimeout(_ => {
      const list = this.filterList(value);
      this.setState({
        results: list,
        showResults: list.length > 0
      })
    })
  }

  handleBlur(){
    //
  }

  filterList(val){
    if(val.trim()==='') return [];
    val = val.toLowerCase();
    return DATA.reduce((acc, state)=>{
      if(state.name.toLowerCase().indexOf(val) > -1 || val === state.abbreviation.toLowerCase()){
        acc.push(state);
      }
      return acc;
    }, []);
  }

  handleSelected(ev:SyntheticMouseEvent){
    this.input.value = (ev.target.innerHTML);
    this.setState({showResults: false});
  }

  renderList(){
    return this.state.results.map(state =>
      <li key={state.abbreviation}>{`${state.name} (${state.abbreviation})`}</li>
    );
  }

  render(){
    return(
      <div class="type-ahead">
        <input
          ref = {input => this.input = input}
          onKeyUp = {this.handleKeyUp}
          onBlur = {this.handleBlur}
        >
        </input>
        <ul
          class={"type-ahead-res " + (this.state.showResults ? "show" : "hide")}
          style={this.positionList()}
          onClick = {this.handleSelected}
          ref = {list => this.resultList = list}
        >
          {this.renderList()}
        </ul>
      </div>
    )
  }
}


const DATA = [{
  "name": "Alabama",
  "abbreviation": "AL"
},
{
  "name": "Alaska",
  "abbreviation": "AK"
},
{
  "name": "American Samoa",
  "abbreviation": "AS"
},
{
  "name": "Arizona",
  "abbreviation": "AZ"
},
{
  "name": "Arkansas",
  "abbreviation": "AR"
},
{
  "name": "California",
  "abbreviation": "CA"
},
{
  "name": "Colorado",
  "abbreviation": "CO"
},
{
    "name": "Connecticut",
    "abbreviation": "CT"
},
{
    "name": "Delaware",
    "abbreviation": "DE"
},
{
    "name": "District Of Columbia",
    "abbreviation": "DC"
},
{
    "name": "Federated States Of Micronesia",
    "abbreviation": "FM"
},
{
    "name": "Florida",
    "abbreviation": "FL"
},
{
    "name": "Georgia",
    "abbreviation": "GA"
},
{
    "name": "Guam",
    "abbreviation": "GU"
},
{
    "name": "Hawaii",
    "abbreviation": "HI"
},
{
    "name": "Idaho",
    "abbreviation": "ID"
},
{
    "name": "Illinois",
    "abbreviation": "IL"
},
{
    "name": "Indiana",
    "abbreviation": "IN"
},
{
    "name": "Iowa",
    "abbreviation": "IA"
},
{
    "name": "Kansas",
    "abbreviation": "KS"
},
{
    "name": "Kentucky",
    "abbreviation": "KY"
},
{
    "name": "Louisiana",
    "abbreviation": "LA"
},
{
    "name": "Maine",
    "abbreviation": "ME"
},
{
    "name": "Marshall Islands",
    "abbreviation": "MH"
},
{
    "name": "Maryland",
    "abbreviation": "MD"
},
{
    "name": "Massachusetts",
    "abbreviation": "MA"
},
{
    "name": "Michigan",
    "abbreviation": "MI"
},
{
    "name": "Minnesota",
    "abbreviation": "MN"
},
{
    "name": "Mississippi",
    "abbreviation": "MS"
},
{
    "name": "Missouri",
    "abbreviation": "MO"
},
{
    "name": "Montana",
    "abbreviation": "MT"
},
{
    "name": "Nebraska",
    "abbreviation": "NE"
},
{
    "name": "Nevada",
    "abbreviation": "NV"
},
{
    "name": "New Hampshire",
    "abbreviation": "NH"
},
{
    "name": "New Jersey",
    "abbreviation": "NJ"
},
{
    "name": "New Mexico",
    "abbreviation": "NM"
},
{
    "name": "New York",
    "abbreviation": "NY"
},
{
    "name": "North Carolina",
    "abbreviation": "NC"
},
{
    "name": "North Dakota",
    "abbreviation": "ND"
},
{
    "name": "Northern Mariana Islands",
    "abbreviation": "MP"
},
{
    "name": "Ohio",
    "abbreviation": "OH"
},
{
    "name": "Oklahoma",
    "abbreviation": "OK"
},
{
    "name": "Oregon",
    "abbreviation": "OR"
},
{
    "name": "Palau",
    "abbreviation": "PW"
},
{
    "name": "Pennsylvania",
    "abbreviation": "PA"
},
{
    "name": "Puerto Rico",
    "abbreviation": "PR"
},
{
    "name": "Rhode Island",
    "abbreviation": "RI"
},
{
    "name": "South Carolina",
    "abbreviation": "SC"
},
{
    "name": "South Dakota",
    "abbreviation": "SD"
},
{
    "name": "Tennessee",
    "abbreviation": "TN"
},
{
    "name": "Texas",
    "abbreviation": "TX"
},
{
    "name": "Utah",
    "abbreviation": "UT"
},
{
    "name": "Vermont",
    "abbreviation": "VT"
},
{
    "name": "Virgin Islands",
    "abbreviation": "VI"
},
{
    "name": "Virginia",
    "abbreviation": "VA"
},
{
    "name": "Washington",
    "abbreviation": "WA"
},
{
    "name": "West Virginia",
    "abbreviation": "WV"
},
{
    "name": "Wisconsin",
    "abbreviation": "WI"
},
{
    "name": "Wyoming",
    "abbreviation": "WY"
}
]

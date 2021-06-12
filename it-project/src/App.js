import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import Loader from './Loader/Loader'
import Table from './Table/Table'
import _ from 'lodash'
import Detail from './Detail/Detail'
import TableSearch from './TableSearch/TableSearch'

class Clock extends React.Component {

  constructor(props){
    super(props);
    this.onSort=this.onSort.bind(this);
    this.state={search:'',isLoading:true,data:{},sort:'asc',sortField:'ID',row:null, class:'totalWindow',class2:'cls'};
    this.onRowSelect=this.onRowSelect.bind(this);
    this.onClose=this.onClose.bind(this);
    this.searchHandler=this.searchHandler.bind(this);
  }

  async componentDidMount() {
    const response=await fetch('https://api.covid19api.com/summary');
    let data=await response.json();
   
    for(let i=0;i<data.Countries.length;i++){
      data.Countries[i].num=i+1;
    }
    
    this.setState({
      isLoading:false,
      data:data.Countries
    });
  } 

  onSort(sortField){
    const clonedData=this.state.data.concat();
    const sortType=this.state.sort === 'asc' ? 'desc' :'asc';
    const orderedData=_.orderBy(clonedData, sortField, sortType);
    
    this.setState({
      data:orderedData,
      sort: sortType,
      sortField
    });
  }

 onRowSelect = row=>{
    this.setState({
      row,
      class:'totalWindow',
      class2:'cls'
    })
 }

 searchHandler = search =>{
    this.setState({search})
 }

getFilteredData(){
  const {data, search}=this.state;

  if(!search){
    return data;
  }

  return data.filter(i=>{
    return i['Country'].toLowerCase().startsWith(search.toLowerCase());
  })

  this.setState({
    data
  })
}
 
 onClose(){
  let className=(this.state.class === 'totalWindow'? 'off':'totalWindow');
  let className2=(this.state.class2==='cls' ? 'off' : 'cls');
  this.setState({class:className,class2:className2});
 } 

  render() {
     const filteredData = this.getFilteredData();
    return (
      <div className='container'>
        {
          this.state.isLoading 
            ?  <Loader /> 
            : <React.Fragment>
                <TableSearch onSearch={this.searchHandler}/>
                <Table 
                    arr={filteredData} 
                    onRowSelect={this.onRowSelect} 
                    sortField={this.state.sortField} 
                    onSort={this.onSort}
                />
              </React.Fragment>
        }

        {
          this.state.row
            ? <Detail person={this.state.row}  onClose={this.onClose} class={this.state.class} class2={this.state.class2}/> : null
        }
      </div>
    );
  }
}


function App(){
  return <Clock />;
}

export default App;

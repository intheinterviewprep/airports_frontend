import React from 'react'

export default class Airports extends React.Component{
   constructor(props){
       super(props);
       this.handleEdit=this.handleEdit.bind(this)
       this.handleDelete=this.handleDelete.bind(this);
   }
    handleEdit(event){
        console.log('Edit Parent, id:'+event.target.id+',dbkey:'+this.props.airports[event.target.id].id)
        this.props.handleParentEdit(event.target.id,this.props.airports[event.target.id].id);
    }
    handleDelete(event){
        console.log('Edit Parent, id:'+event.target.id+',dbkey:'+this.props.airports[event.target.id].id)
        this.props.handleParentDelete(event.target.id,this.props.airports[event.target.id].id);
    }
    render(){
        return(
            <div>
                <ul>
                  {this.props.airports.map((airport,index)=>(
                      <div key={index}>
                      <li >Airport:{airport.name}</li>
                      <input type='button' onClick={this.handleEdit} id={index} value='Edit'></input>
                      <input type='button' value='Delete' onClick={this.handleDelete} id={index} ></input>
                      </div>
                  ))}
                </ul>
            </div>
        );
    }
}
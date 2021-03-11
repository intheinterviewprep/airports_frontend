import React from 'react';
import Airports from './Airports';
export class AirportsForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            airportsFromServer:[]
        }
        this.nameRef=React.createRef(this);
        this.cityRef=React.createRef(this);
        this.createAirport=this.createAirport.bind(this);
        this.updateAirport=this.updateAirport.bind(this);
        this.handleParentEdit=this.handleParentEdit.bind(this);
        this.handleParentDelete = this.handleParentDelete.bind(this);
        this.updateButtonRef=React.createRef(this);
        this.reset = this.reset.bind(this);
    }
    reset(){
        if(this.nameRef.current.value!==''){this.nameRef.current.value=''}
        if(this.cityRef.current.value!==''){this.cityRef.current.value=''}
        this.updateButtonRef.current.style.display='none'

    }
    handleParentEdit(id,dbkey){
        console.log('Edit: id'+id+',dbkey:'+dbkey)
        if(id<this.state.airportsFromServer.length){
        this.nameRef.current.value=this.state.airportsFromServer[id].name;
        this.cityRef.current.value=this.state.airportsFromServer[id].city;
        this.updateButtonRef.current.style.display='';
        this.updateButtonRef.current.id = dbkey;
    }
    }
    handleParentDelete(id,dbkey){
        console.log('calling handleParentDelete for id:'+id)
        if(id<this.state.airportsFromServer.length){
        const deleteAirportObject = {
            id:dbkey,
            name:this.state.airportsFromServer[id].name,
            city:this.state.airportsFromServer[id].city
        }
        console.log('Airport to be deleted:'+JSON.stringify(deleteAirportObject));
        const url = 'http://localhost:8080/airports';
        const params = {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(deleteAirportObject)
        }
        fetch(url,params)
        .then(res=>{
            if(res.status===200){
                fetch(url)
                .then(res=>res.json())
                .then(result=>(
                    this.setState({
                        airportsFromServer:result
                    })
                ))
            }
        })
    }
    }
    updateAirport(){
        const updatedAirportObject = {
            id:this.updateButtonRef.current.id,
            name:this.nameRef.current.value,
            city:this.cityRef.current.value
        }
        console.log(updatedAirportObject);
        const url = 'http://localhost:8080/airports';
        const params = {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(updatedAirportObject)
        }
        fetch(url,params)
        .then(res=>{
            if(res.status===200){
                console.log('update successful');
                fetch(url)
                .then(res=>res.json())
                .then(result=>(
                    this.setState({
                        airportsFromServer:result
                    })
                ))
                this.reset();
            }
            else{
                console.log('Failed to update')
            }
        })
    }
    createAirport(event){
        
        const newAirport = {
             name:this.nameRef.current.value,
             city:this.cityRef.current.value
        }
        const url = 'http://localhost:8080/airports';
        const params = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newAirport)
        }
        fetch(url,params)
        .then(res=>{
            if(res.status===200){
               //make a get call to server
               fetch(url)
                .then(res=>res.json())
               .then(data=>{  
                    this.setState({
                        airportsFromServer:data
                    })
               })
               this.nameRef.current.value='';
               this.cityRef.current.value='';
            }
            else{
                console.log('Problem with Airport Creation')
            }
        })
    
        
        event.preventDefault();
    }
    componentDidMount(){
        this.nameRef.current.focus();
        this.updateButtonRef.current.style.display='none';
    }
    render(){
        
        return (
            <div>
                <h2>AirportsForm</h2>
                <form onSubmit={this.createAirport}>
                    <label name='Name'>Name</label><input name='Name' type='text' ref={this.nameRef}></input>
                    <label name='City'>City</label><input name='City' type='text' ref={this.cityRef}></input>
                    <input type='submit'></input>
                    <input type='button' value='Update' ref={this.updateButtonRef} onClick={this.updateAirport} ></input>
                </form>
                <Airports airports={this.state.airportsFromServer} handleParentEdit={this.handleParentEdit} handleParentDelete={this.handleParentDelete}/>
            </div>
        );
    }
}
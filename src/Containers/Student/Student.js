import React, { Component, Fragment } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText ,Col,Input,FormGroup,Row,Label} from 'reactstrap';

import {connect} from 'react-redux';
import {getStudentstate,onSearchHandler,searchString,onClearHandler,onAddHandler,getstudentObject,updateAndSaveHandler,onRemoveHandler,ascendingListHandler,descendingListHandler,entryOnSubmitHandler,getlistObject} from '../Student/Reducer';
import StudentEdit from '../../Components/Student/StudentEdit'

  

class Student extends Component {

    state = {
      searchText: "",
      addString:"",
      isOpen:false,
      selectedItem: {},
      index:"",
      name:""
    }


 toggle=()=>{
    
     this.setState(prevState => ({
       isOpen: !prevState.isOpen
     }))
  }


handleSearch = e => {
  const {searchText} = this.state
  console.log("eeeeeeeee", e.target.value)
  this.setState({
    searchText: e.target.value
  })
  
}

handleSearchOnClick=()=>{
  const{searchText} = this.state
  this.props.onSearchHandler({
    searchString: searchText
  })
  console.log("ggggggggggg",searchText)
}
onClearHandler=()=>{
  const{searchText} = this.state
  this.setState({
    searchText :''
  }, () => {
    console.log("this.stste", this.state)
    this.props.onSearchHandler({
      searchString:""
    })
  })
  
}
handleAdd=(e)=>{
  const {addString} = this.state
  const value = e.target.value;
  console.log("ADDDDDDDDDDDD",value)
  this.setState({
    addString:value
  })

}
handleAddOnClick=()=>{
  const {addString} = this.state
  this.setState({
    addString:''
    
  })
  this.props.onAddHandler({
    addString: addString
  })
 

}




onEditHandler=(item)=>{
 
this.setState({
  selectedItem: {...item},
  isOpen: true
})
}
updateStudent=(e)=>{
  console.log("hdghhsdhhsdgkwf");
  const {selectedItem } = this.state;
const value = e.target.value;
console.log("value", value)
selectedItem.Name = value;
this.setState({selectedItem})
  }
 
saveStudent=()=>{
  const{selectedItem} = this.state;
  console.log("haiiiiiiiiiiiiiiiiiiii",selectedItem.id)
 this.setState({
   isOpen:false
 })
 this.props.updateAndSaveHandler({
  studentId:selectedItem.id ,
  updatedName: selectedItem.Name
})
  }
  onDeleteHandler=(item)=>{
    this.props.onRemoveHandler({
      id:item.id,
      name:item.Name
    })
  
  }
insertIndexHandler=(e)=>{
const{studentList} = this.props
console.log("%%%%%%%%%%%%%",studentList)
const id = e.target.value;
console.log("iddddddddddddddddd",id)
if(id<studentList.length)
this.setState({
  index:id
})
  }
insertNameHandler=(e)=>{
  const name = e.target.value;
  console.log("nameeeeeeee",name);
  this.setState({
    name:name
  },()=>{console.log("stateeeeeeeeeeeeeeeeeeeeee",this.state)})
}
onSubmitHandler=()=>{
  
 console.log("submit checkeddddddddd")
 const{index,name}=this.state
 this.setState({
   index:"",
   name:""
   
 })
 this.props.entryOnSubmitHandler({
  indexId:index,
  value:name
})

}
renderHeader=()=>{

  return(
  <CardHeader>Student
       
          <FormGroup inline>
          <Col md={2}>
           
            <Input label="search" type="text" name="search" value={this.state.searchText}
            onChange={e => this.handleSearch(e)} />
            <Button onClick={this.handleSearchOnClick}>Find</Button>
            {"   "}<Button onClick={this.onClearHandler}>Clear</Button>
            </Col>
          </FormGroup>  
        
        </CardHeader>
  )
}


renderStudentList=()=>{

const{addString} = this.state
  const {studentList} =this.props;
  console.log("studentList", studentList)
  return(

    <CardBody>
    {studentList.map((item,index)=>
        
    <CardText>
      <li key={index}>
        {item.Name}
        {item.Isadded===true ? (<Fragment><Button color="danger" onClick={()=>this.onEditHandler(item)}>save/edit</Button><Button color="warning" onClick={()=>this.onDeleteHandler(item)}>Delete</Button></Fragment>) :null}
         {/* (<button onClick={this.editHandler}> edit/delete</button>
           ):null} */}
          
    </li></CardText>

    )}
 
  <div>
  <FormGroup inline>
  <Col md={2}>
   
    <Input label="Add" type="text" name="add" value={addString} onChange={e=>this.handleAdd(e)}/> <Button onClick={this.handleAddOnClick} >Add</Button>
    </Col>
  </FormGroup> 
  
  {/* <Button>Go somewhere</Button> */}
  </div>

</CardBody>

  )
}
renderSortedList=()=>{

  return(
    <div>
    <Fragment>
      <FormGroup inline>
      <Row>
  <Col md={2}>
  <Button color="warning" onClick={this.props.ascendingListHandler}>Ascending</Button>
  </Col>
  <Col md={2}>
  {"  "}<Button color="warning" onClick={this.props.descendingListHandler}>Descending</Button>
  </Col>
  </Row>
 </FormGroup>

  </Fragment>
  </div>
  )

}
renderAddToIndex=()=>{
  const{index,name} = this.state

return(
<Fragment>
  <FormGroup>
<Row>
<Col md={2}>
          <FormGroup>
            <Label for="index">Index</Label>
          <Input type="text"  label="index"  value={index} onChange={e=>this.insertIndexHandler(e)}/>
          </FormGroup>  
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="value">Name</Label>
           <Input type="text"  label="value" value={name} onChange={e=>this.insertNameHandler(e)}/>
          </FormGroup>  
        </Col>
        <Col md={2}>
          <FormGroup>
          <Label for="button"></Label>
            <Button color="primary" onClick={this.onSubmitHandler}>submit</Button>
          </FormGroup>  
        </Col>

       
</Row>
</FormGroup>
</Fragment>

)

}



    render(){

      console.log("...........selecttttt",this.state.selectedItem.id)
      console.log("........state",this.state)
        console.log("........props",this.props)
        console.log("kitoooooooooooooo",this.props.list)
       
      const { selectedItem , isOpen} = this.state
        return(
            <Fragment>
                <div>
      <Card>
       {this.renderHeader()}
       {this.renderStudentList()}
       {this.renderAddToIndex()}
       {this.renderSortedList()}
        <CardFooter>Footer</CardFooter>
        
        
      </Card>
      </div>
      <StudentEdit 
          selectedItem = {selectedItem}
          toggle = {this.toggle}
          isOpen={isOpen}
          updateStudent={this.updateStudent}
          saveStudent={this.saveStudent}
          label ="update"
        />
            </Fragment>

        )

    }


}



const mapStateToProps=state=>{
    return{
      studentList: getStudentstate(state),
      dummyObj: getstudentObject(state),
      searchString: state.searchString,
     list: getlistObject(state)

    }
   }

   const mapDispatchToProps=dispatch=>{
    return{
      onSearchHandler:(params)=>dispatch(onSearchHandler(params)),
      // onClearHandler:(params)=>dispatch(onClearHandler(params))
      onAddHandler:(params)=>dispatch(onAddHandler(params)),
      updateAndSaveHandler:(params)=>dispatch(updateAndSaveHandler(params)),
      onRemoveHandler:(params)=>dispatch(onRemoveHandler(params)),
      ascendingListHandler:()=>dispatch(ascendingListHandler()),
      descendingListHandler:()=>dispatch(descendingListHandler()),
      entryOnSubmitHandler:(params)=>dispatch(entryOnSubmitHandler(params))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Student);
// export default Student

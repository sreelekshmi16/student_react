import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';
import {connect} from 'react-redux';
import {getStudentstate,onAddHandler,getstudentObject} from '../../Containers/Student/Reducer';

class StudentEdit extends Component{

    state={
        isOpen:false,
        input:''
    }



renderEditField=()=>{
    const{studentList} = this.props;
    console.log("chechhkkkkk",studentList)
    // const index =studentList.filter((item,id)=>{

    // })
}
onSelectHandler=()=>{
    const{studentList} = this.props;
    const{selectedStudent} = this.props;
    console.log("sssssssssssssssssssssss",selectedStudent)
    // console.log("selected_name",selectedStudent[0].Name)
    // this.toggle();
}
    render(){
        const{selectedItem, isOpen, toggle,updateStudent,saveStudent,label} = this.props;
       
console.log("thissssssssssssssssssssssssss", this.props)
        return(
            <div>
           
      {/* <Button color="danger"  onClick={()=>this.onSelectHandler()}>Edit/Save</Button> */}
      <Modal isOpen={isOpen} toggle={toggle} >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
        {this.renderEditField()}
       
         <Input label="edit" type="text"  name="selectedItem" label={label}  value={selectedItem.Name} onChange={(e)=>updateStudent(e)}/*value={selectedStudent[0].Name}*/ />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={saveStudent}>Save</Button>
        </ModalFooter>
      </Modal>
    </div>
        )
    }


}





export default StudentEdit;
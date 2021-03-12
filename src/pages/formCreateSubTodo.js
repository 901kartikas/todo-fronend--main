import React, {useState} from "react";
import { Button, Form, FormGroup, Label, Input,} from 'reactstrap';
import {toast} from 'react-toastify';
import {connect} from 'react-redux';
import { createSubTodo} from '../Redux/actions/subTodoAction';

function FormCreateSubTodo(props){
    const {dispatchCreateTodoSubAction,history} = props;
    const [activityTitle,setActivityTitle] = useState("")
    const [priority, setPriority] = useState("penting")
    const [note, setNote] = useState("")
   
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('data');
        const todoCategoryID = props.match.params.id;
        const data = {activityTitle,priority,note, todoCategoryID};
        dispatchCreateTodoSubAction(data, () => {
            console.log('data',data)
            toast.success('judul listmu sudah dibuat');
            history.replace(`/todo-category/${todoCategoryID}/todos`);     
        }, (message) => toast.error(`Error: ${message}`));        
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="activityTitle">Title</Label>
                    <Input
                        type="text"
                        name="title"
                        id="activityTitle"
                        placeholder="with a placeholder"
                        onChange={(e) => setActivityTitle(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="note">Note</Label>
                    <Input
                        type="text"
                        name="note"
                        id="note"
                        placeholder="with a placeholder"
                        onChange={(e) => setNote(e.target.value)}

                    />
                </FormGroup>
                <FormGroup>
                    <Label for="priority">Priority</Label>
                        <Input type="select" name="priority" id="priority" onChange={(e) => setPriority(e.target.value)} >
                        <option value="penting">Penting</option>
                        <option value="gapenting">Ga Penting</option>
                    </Input>
                </FormGroup>
          
                <Button type="submit" color="primary" >
                    Save
                </Button>
                <Button color="secondary" >
                    Cancel
                </Button>
            </Form>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
  
    dispatchCreateTodoSubAction: (data, onSuccess, onError) =>
      dispatch(createSubTodo(data, onSuccess, onError)),   
  });
  

export default  connect(null, mapDispatchToProps)(FormCreateSubTodo);




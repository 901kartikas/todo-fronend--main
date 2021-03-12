import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {getCategoryId} from "../Redux/actions/todolistAction";
import {getCategoryById, createSubTodo, getDeleteSubCategory} from "../Redux/actions/subTodoAction";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom'


const Sublist = ({dispatchGetTodoIdAction, dispatchGetSubTodoIdAction,
 dispatchDeleteTodoSubAction, match}) => {
  const [idCategory, setIdCategory] = useState('');
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [selectSubTodo, setSelectSubTodo] = useState("")
  

  useEffect(()=> {
    const idSub = match.params.todoCategoryID;
    if(idSub){
      dispatchGetTodoIdAction(idSub, ({categoryTitle, id})  =>
      {
        setTitle(categoryTitle);
        setIdCategory(id);
      });
      dispatchGetSubTodoIdAction(idSub, data => {
        setData(data);
      });
    }
  }, [dispatchGetTodoIdAction, dispatchGetSubTodoIdAction, match.params.todoCategoryID])

  const showModal = (event, id) => {
    event.preventDefault();
    setSelectSubTodo(id);
    window.$("#confirmationModal").modal("show");
  };

  const handleDelete = () => {
    const id = match.params.todoCategoryID;
    dispatchDeleteTodoSubAction(
      selectSubTodo,
      () => {
        window.$("#confirmationModal").modal("hide");
        toast.success("Udah kehapus Nih!");
        dispatchGetSubTodoIdAction(id, data => {
          setData(data);
        })
      },
      (message) => {
        window.$("#confirmationModal").modal("hide");
        toast.error(`Error:${message}`);
      }
    );
  };

  return (
    <React.Fragment>
      <div className="container-sm">
        <div className="row">
          <div className="col">
           <h3>{title}</h3>
          </div>
        </div>
        <div className="row align-items-center ">
          <div className="col-md-6">
            <Link to={`/todo-category/${idCategory}/add`}> 
            <button className="btn btn-primary"> Add </button>
            </Link>
          </div>
          {data.map((datas) => (
            <div style={{ marginRight: "10px" }} className="card">
              <div key={datas.todoID}>
                <p>judul : {datas.activityTitle}</p>
                <p>prioritas : {datas.priority}</p>
                <p>notes : {datas.note}</p>
                <button
                  className="btn btn-secondary"
                  href="/"
                  onClick={(e) => showModal(e, datas.todoID)}
                >
                  delete
                </button>
                <Link to={`/todo-category/${datas.todoCategoryID}/todo/${datas.todoID}`}   > 
                    <button className="btn btn-warning">edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        
          
        <Modal handleDelete={handleDelete} />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  loading : state.loading,
  todoCategory : state.todoCategory,
  subTodoCategory : state.subTodoList,
});

const mapDispatchToProps = (dispatch) => ({
    
  dispatchGetTodoIdAction: (id, onSuccess) => 
    dispatch(getCategoryId(id, onSuccess)),

  dispatchGetSubTodoIdAction: (id, onSuccess) => 
    dispatch(getCategoryById(id, onSuccess)),

  dispatchCreateTodoSubAction: (data, onSuccess, onError) =>
    dispatch(createSubTodo(data, onSuccess, onError)),   
  
  dispatchDeleteTodoSubAction: (id, onSuccess, onError) =>
    dispatch(getDeleteSubCategory (id, onSuccess, onError)),
  
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Sublist);


const Modal = ({ handleDelete }) => (
  <div className="modal" id="confirmationModal">
    <div role="document" className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title"> confirmation </h5>
        </div>
        <div className="modal-body">
          <p>yakin mau hapus ?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            data-dismiss="modal"
            className="btn btn-secondary"
          >
            Enggak
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleDelete}
            data-dismiss="modal"
          >
            Iya dong
          </button>
        </div>
      </div>
    </div>
  </div>
);


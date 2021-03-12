import React, {useState} from 'react';
import {connect} from 'react-redux';
import {registerUser} from '../Redux/actions/authAction';
import {toast} from 'react-toastify';

const RegisterForm = ({ dispatchRegisterAction }) => {

    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({fullName: false, username: false, email: false, password: false})

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(fullName, username, email, password)
      if(isFormInvalid()) updatError();
      else dispatchRegisterAction(fullName, username, email, password,  
        () => toast.success('berhasil membuat akun'), 
        (message) => toast.error(`Error : ${message}`));
    };

    const isFormInvalid = () => (!fullName || !username || !email ||!password);

    const updatError = () => {
      const errObj = {fullName: false, username : false, email: false, password:false};
      if(!fullName) errObj.fullName = true;
      if(!username) errObj.username = true;
      if(!email) errObj.email = true;
      if(!password) errObj.password = true;
      setError(errObj);
    };

    return (
      <div>
        <React.Fragment>
          <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className={`form-control ${error.fullName ? 'is-invalid':''}` }
              name="fullName"
              id="fullName"
              placeholder="urname"
              value={fullName}
              onChange = {(e) => setFullName(e.target.value)}
            />
            <p className="invalid-feedback"> Ini tolong diisi </p>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className={`form-control ${error.username ? 'is-invalid':''}` }
              name="username"
              id="username"
              placeholder="user name"
              value={username}
              onChange = {(e) => setUsername(e.target.value)}
            />
            <p className="invalid-feedback"> Ini tolong diisi </p>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className={`form-control ${error.email ? 'is-invalid':''}` }
              name="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange = {(e) => setEmail(e.target.value)}
            />
            <p className="invalid-feedback"> Ini tolong diisi </p>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${error.password ? 'is-invalid':''}` }
              name="password"
              id="password"
              placeholder="your password"
              value={password}
              onChange = {(e) => setPassword(e.target.value)}
            />
            <p className="invalid-feedback"> Ini tolong diisi </p>
          </div>
          <button type="submit">
            Register
          </button>
          </form>
         
        </React.Fragment>
      </div>
    );
}

const mapDispatchToProps = dispatch => ({
  dispatchRegisterAction : (username, fullName, email, password, onSuccess, onError) => {
    dispatch(registerUser({username, fullName, email, password}, onSuccess, onError))
  }
});

export default connect(null, mapDispatchToProps)(RegisterForm);
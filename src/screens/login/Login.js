 import React, { Component } from 'react';
 import Header from '../../common/header/Header'
import './Login.css';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/Logo.png';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Home from '../home/Home';
import ReactDOM from 'react-dom';

const useStyles ={
    width: 400,
    marginLeft: 600,
    marginTop : 10
 };

class Login extends Component{

    constructor(){
        super();
        this.state={
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            incorrectUserNamePassword : "dispNone"
        }
    }
    

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }
    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : 
        this.setState({ loginPasswordRequired: "dispNone" });
        this.setState({ incorrectUserNamePassword: "dispBlock" });
        ReactDOM.render(<Home loggedIn="true" showSearchTab = "true"/>, document.getElementById('root'));
        

    }

   

    render(){
        return(
            <div><Header/>
            <Card  style={useStyles}>
            <CardContent className="card-content">
                <Typography variant="h5" component="h2">
                Login
                </Typography>
                <FormControl required>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                <FormHelperText className={this.state.usernameRequired}>
                    <span className="red">required</span>
                </FormHelperText>
                </FormControl>
                <br /><br />
                <FormControl required>
                    <InputLabel htmlFor="loginPassword">Password</InputLabel>
                    <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                    <FormHelperText className={this.state.loginPasswordRequired}>
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl>
                <br /><br />
                <FormHelperText className={this.state.incorrectUserNamePassword}>
                    <span className="red">Incorrect username and/or password</span>
                </FormHelperText>
        <br /><br />
        <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                </CardContent>
                 
                        </Card>
                        </div>                
        )
    }
}

export default Login;
import React, { Component } from 'react';
import './Header.css';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';






const styles = (theme) => ({
 
    search: {
      position: 'relative',
      borderRadius: '4px',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: '#c0c0c0',
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '300px',
      },
      float: 'right'
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    bg: {
      
      backgroundColor: '#b3b3b3 !important',
      color: 'black !important',
      padding: '10px',
      borderRadius : '10px',
      height:'90px'
    }
  

  });

  
  
class Header extends Component{
  
    constructor(){
        super();
        this.state={
       
            search: '',
            photo : null,
            anchorEl : null
           
            
       
        }
    }

    componentWillMount() {
      // Get profile picture
      let data = null;
      let xhr = new XMLHttpRequest();
      let that = this;
      
     
      xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
              that.setState({
                  photo: JSON.parse(this.responseText).data.profile_picture
              });
          }
      });
      console.log(sessionStorage.getItem("access-token"));
      xhr.open("GET", "v1/users/self/?access_token="+sessionStorage.getItem("access-token"));
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.send(data);
    }
    
  
    updateSearch = e => {
        this.setState({ search : e.target.value });
      };

      handleClick = (event) => {
         this.setState({anchorEl : event.currentTarget });
         
      };
    
      handleClose = () => {
        this.setState({anchorEl : null });
      };
   

    render(){
    const { classes } = this.props;
     const { search } = this.state;

     
        return(
            <div>
                <header className="app-header">
                   <span className="side-logo">Image Viewer</span>
                   
                    
                   
                    {this.props.loggedIn ==="true"?
                       <div className="after-login">
                         <IconButton style={{padding :'0'}} onClick={this.handleClick}>   
                            <img src={this.state.photo} 
                            style={{width: 40, height: 40, borderRadius: 40/2}} />
                          </IconButton>
                         
                            <Menu
                                className="simple-menu"
                                elevation={0}
                                getContentAnchorEl={null}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'center',
                                }}
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'center',
                                }}
                                
                                keepMounted
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}>
                              <div className={classes.bg}>
                              <MenuItem onClose={this.handleClose} >My Account</MenuItem>
                              <hr />
                              <MenuItem onClose={this.handleClose}>Logout</MenuItem>
                              </div> 
                            </Menu>
                           
                          
                              
                        </div>
                                      :
                                      ""
                        
                    }

                                            
                     

                   
                    {this.props.loggedIn === "true"
                        ? <div className={classes.search}>
                        <div className={classes.searchIcon}>
                          <SearchIcon/>
                          
                    
                        </div>
                        <InputBase
                          placeholder="Search…"
                          classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                          inputProps={{ 'aria-label': 'search' }}
                        />
                      </div>
                    
                        
                        : ""
                    }
                    

                    

                </header>
         
          
   
           </div>
        )
    }
}

export default withStyles(styles)(Header);
import React, { Component } from 'react';
import './Header.css';
import photo from '../../assets/Logo.png';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';


const styles = (theme) => ({
 
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '200px',
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
  });
  
  
class Header extends Component{
  
    constructor(){
        super();
        this.state={
       
            search: '',
       
        }
    }
  
    updateSearch = e => {
        this.setState({ search : e.target.value });
      };
   

    render(){
    const { classes } = this.props;
     const { search } = this.state;
     console.log(this.props.showSearchTab);
        return(
            <div>
                <header className="app-header">
                   <span className="side-logo">Image Viewer</span>
                   
                    
                   
                    {this.props.loggedIn ==="true" ?
                       <div className="after-login">
                        <img src={photo} 
                            style={{width: 40, height: 40, borderRadius: 40/2}} />
                     </div>
                        :
                        ""
                        
                    }
                    {this.props.loggedIn === "true"
                        ? <div className={classes.search}>
                        <div className={classes.searchIcon}>
                          <SearchIcon />
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

export default withStyles(styles)(Header);;
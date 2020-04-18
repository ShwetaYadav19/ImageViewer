import React, { Component } from 'react';
import Header from '../../common/header/Header'
import './Profile.css';
import IconButton from '@material-ui/core/IconButton';
import { Icon, InlineIcon } from '@iconify/react';
import mdCreate from '@iconify/icons-ion/md-create';
import Modal from 'react-modal';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';



const styles = theme => ({

      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: '1000px',
        height: 650,
      },
      gridTile :{
          height : 250,
          padding: '100%',

      }
});
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width : '200px',
        padding : '20px',
        transform: 'translate(-50%, -50%)'
    }
};

const postModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '50%',
        bottom: '50%',
        marginRight: '-50%',
        width : '1000px',
        height: '400px',
        transform: 'translate(-50%, -50%)',
        
    }
};

class Profile extends Component{

    constructor(){
        super();
        this.state={
           id: null,
           username : null,
           profile_picture:null,
           full_name : null,
           bio : null,
           numberOfPosts : null,
           follows:null,
           followed_by : null,
           editModalIsOpen : false,
           updatedUsername : "",
           posts : [],
           postModalIsOpen : false,
           post : null,
           numberOfLikes : 0,
           isLiked : false,
           favoritesIcon : "noLike",
           comments:[],
           comment:"",
        }
    }
    
    componentWillMount() {
        
    
        // Get profile 
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        
       
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    id : JSON.parse(this.responseText).data.id,
                    username : JSON.parse(this.responseText).data.username,
                    profile_picture:JSON.parse(this.responseText).data.profile_picture,
                    full_name : JSON.parse(this.responseText).data.full_name,
                    bio : JSON.parse(this.responseText).data.bio,
                    numberOfPosts : JSON.parse(this.responseText).data.counts.media,
                    follows:JSON.parse(this.responseText).data.counts.follows,
                    followed_by : JSON.parse(this.responseText).data.counts.followed_by,

                });
            }
        });
        console.log(sessionStorage.getItem("access-token"));
        xhr.open("GET", "v1/users/self/?access_token="+sessionStorage.getItem("access-token"));
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);


        // Get posts 
        let postData = null;
        let xhrPosts = new XMLHttpRequest();
        
        
       
        xhrPosts.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                   posts :JSON.parse(this.responseText).data
           
                });
            }
        });
        console.log(sessionStorage.getItem("access-token"));
        xhrPosts.open("GET", "v1/users/self/media/recent?access_token="+sessionStorage.getItem("access-token"));
        xhrPosts.setRequestHeader("Cache-Control", "no-cache");
        xhrPosts.send(postData);

    }  

        

    editUsernameHandler = ()=>{
        console.log("set state open");
        this.setState({ editModalIsOpen: true });
    }
    handleClose = ()=> {
        this.setState({ editModalIsOpen: false });
    }
    changeUserNameHandler = (e) =>{
        this.setState({updatedUsername : e.target.value})
        
    }
    updateUsernameHandler = () =>{
        this.setState({editModalIsOpen : false});
     
    }


    postDetailClose = () =>{
        this.setState({postModalIsOpen : false});
    }
    increaseLikesHandler = (e) => {
        let n = this.state.numberOfLikes;
       this.setState({numberOfLikes : n+1})
       
    }

    commentHandler = (e) =>{
        this.setState({comment : e.target.value})
    }
    addCommentHandler =(input) =>{
        
        this.state.comments.push(this.state.comment);
        this.setState({comment:""});
        
      
      }

    
    render(){
  
        const { classes } = this.props;
        return(
       <div>
           <Header loggedIn="true" />
           <div className="profile-box">
               <div className="profile-header">
                   <div className="profile-photo">  
                       <IconButton style={{padding :'0'}} >   
                            <img src={this.state.profile_picture} 
                            style={{width: 150, height: 150, borderRadius: 140/2}} />
                        </IconButton>
                   </div>
                   <div className="profile-details">
                     <div style={{fontWeight:"normal",fontSize:30,float:'left', paddingBottom:30 }}>{this.state.username}</div>
                     <div  style={{paddingBottom:10}}> 
                         <span style={{paddingRight:30}}>Posts : {this.state.numberOfPosts}</span>
                         <span style={{paddingLeft:30,paddingRight:30}}>Follows : {this.state.follows}</span>
                         <span style={{paddingLeft:30}}>Followed By : {this.state.followed_by}</span>
                     
                     </div>
                     <div  style={{paddingTop:10}}>
                        <span style={{ paddingRight:20}}>{this.state.full_name}</span> 
                        <IconButton style={{ padding:'0',width: 40, height: 40, borderRadius: 140/2 ,backgroundColor:'#ff4d4d', textAlign:'center'}} 
                          onClick={this.editUsernameHandler} > 
                          <Icon icon={mdCreate} color="white" height="25" />
                        </IconButton>
                        <Modal
                            ariaHideApp={false}
                            isOpen={this.state.editModalIsOpen}
                            contentLabel="EditUserName"
                            onRequestClose={this.handleClose}
                            style={customStyles}
                        > 
                          <Typography variant="h5" component="h2">
                            Edit
                            </Typography>
                        <br/> 
                        <FormControl required>
                                <InputLabel htmlFor="username">Full Name</InputLabel>
                                <Input id="username" type="text" username={this.state.username} onChange={this.changeUserNameHandler} />
                               
                        </FormControl>
                        <br/> <br/> <br/>
                        <Button variant="contained" color="primary" 
                        onClick={this.updateUsernameHandler}>UPDATE</Button>

                        </Modal>
                    </div>   
                    </div>   
                </div>
                <div className="profile-content">
                   <div className={classes.root}>
                   {this.state.postModalIsOpen ? <Modal
                        ariaHideApp={false}
                        isOpen={this.state.postModalIsOpen}
                        contentLabel="PostDetails"
                        onRequestClose={this.postDetailClose}
                        style={postModalStyles}>
                        <div className="post-details"> 
                            <div className="left-modal">
                                <img  src={this.state.post.images.standard_resolution.url} 
                                alt={this.state.post.user.id} />
                            </div>
                            <div className="right-modal">
                                <div className="right-modal-header">
                                    <IconButton style={{padding :0}} >   
                                        <img src={this.state.profile_picture} 
                                        style={{width: 80, height: 80, borderRadius: 80/2}} />
                                </IconButton>
                                <span style={{paddingLeft : '10px',fontWeight : 'bold',fontSize:'18px'}}> 
                                {this.state.username} </span>
                                <hr/>
                                </div>
                                
                                <div className="right-modal-content">
                                    <span>{this.state.post.caption.text}</span>
                                    <br/><br/>
                              
                                    
                                  
                                    <div className="comment-container">
                                    
                                    {
                                        this.state.comments.map(comment =>(
                                            <div>
                                             <span style={{fontWeight:'bolder'}}>{this.state.username} </span>: <span>{comment}</span>
                                            
                                            </div>
                                            
                                           
                                        ))
                                    }
                                    <br/><br/>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteBorderIcon onClick={this.increaseLikesHandler} 
                                        className={this.state.favoritesIcon} />
                                        <span style={{fontSize :20}}> {this.state.post.likes.count} likes </span> 
                                    </IconButton>
                                    
                                    <br/>
                                    <FormControl >
                                        <div className ="profile-comment-section">
                                            <InputLabel htmlFor="profilecommentInput">Add a comment</InputLabel>
                                            <Input id="profilecommentInput"  type="text"   
                                            comment={this.state.comment} onChange={this.commentHandler} />
                                            <Button variant="contained" color="primary" onClick={this.addCommentHandler}>
                                                ADD
                                            </Button>
                                        </div>
                                    </FormControl>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </Modal>  :""}
                        <GridList cellHeight={300} className={classes.gridList} cols={3}>
                        { this.state.posts.map(post => (
                            
                            <GridListTile className={classes.gridTile} key={post.id} > 
                              <img src={post.images.standard_resolution.url}  alt={post.user.id} 
                              onClick={() => {this.setState({postModalIsOpen : true}); this.setState({post:post});}}/>
                            </GridListTile>
                         ))} 
                         </GridList>
                     
                     </div>
                </div>      
            </div>
         
        </div> 
        )  
    }
}

export default withStyles(styles)(Profile);
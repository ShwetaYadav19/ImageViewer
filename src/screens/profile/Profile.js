import React, { Component } from 'react';
import Header from '../../common/header/Header'
import './Profile.css';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from '@iconify/react';
import mdCreate from '@iconify/icons-ion/md-create';
import Modal from 'react-modal';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';



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
           index:null,
           likedByUser:[],
           commentForPost:[]
        }
    }
    
    componentDidMount() {
        
    
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
       
        xhr.open("GET", "v1/users/self?access_token="+sessionStorage.getItem("access-token"));
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
  
        xhrPosts.open("GET", "v1/users/self/media/recent?access_token="+sessionStorage.getItem("access-token"));
        xhrPosts.setRequestHeader("Cache-Control", "no-cache");
        xhrPosts.send(postData);

    }  

        

    editUsernameHandler = ()=>{
        
        this.setState({ editModalIsOpen: true });
    }
    handleClose = ()=> {
        this.setState({ editModalIsOpen: false });
    }
    changeUserNameHandler = (e) =>{
        this.setState({updatedUsername : e.target.value})
        
    }
    updateUsernameHandler = () =>{
        this.setState({full_name : this.state.updatedUsername});
        this.setState({editModalIsOpen : false});
     
    }


    postDetailClose = () =>{
        this.setState({postModalIsOpen : false});
    }
    increaseLikesHandler = (id,index) => {
        this.state.likedByUser[index]=true;
        this.forceUpdate();
        this.state.posts.map(post=>{
            if(post.id===id){
                let n = post.likes.count + 1;
                post.likes.count = n;
            }
        })
        
     }


     commentHandler = (event,index) =>{
        this.setState({comment : event.target.value})
        this.state.commentForPost[index]=event.target.value;
        this.forceUpdate();
    }
    addCommentHandler =(index) =>{
      if(this.state.comment!==null && this.state.comment !== "")  {
              if(this.state.comments[index] === undefined)
                  this.state.comments[index] = this.state.comment;
              else   this.state.comments[index] = this.state.comments[index]+":"+ this.state.comment; 
              this.forceUpdate();
              
              this.setState({comment:''});
                this.state.commentForPost[index]="";
                this.forceUpdate();
          }
      }

    
    render(){
  
        const { classes } = this.props;
        return(
       <div>
           <Header loggedIn="true" baseUrl={this.props.baseUrl} />
           <div className="profile-box">
               <div className="profile-header">
                   <div className="profile-photo">  
                       <IconButton style={{padding :'0'}} >   
                            <img src={this.state.profile_picture} alt="profile-pic"
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
                                alt="" />
                            </div>
                            <div className="right-modal">
                                <div className="right-modal-header">
                                    <IconButton style={{padding :0}} >   
                                        <img src={this.state.profile_picture} alt=""
                                        style={{width: 80, height: 80, borderRadius: 80/2}} />
                                </IconButton>
                                <span style={{paddingLeft : '10px',fontWeight : 'bold',fontSize:'18px'}}> 
                                {this.state.username} </span>
                                <hr/>
                                </div>
                                
                                <div className="right-modal-content">
                                <Typography variant="body2" color="textPrimary" component="p">
                                     {this.state.post.caption.text.split('\n')[0]}
                                       
                                    
                                    </Typography>
                                    <Typography className="tags" variant="body2" color="blue" component="p">
                                        {this.state.post.tags.map(tag=>(
                                          <span> #{tag}</span>
                                        ))

                                        }
                                    </Typography>
                                    <br/><br/>
                              
                                    
                                  
                                <div className="comment-container">
                                   
                                {this.state.comments[this.state.index] !== undefined && this.state.comments[this.state.index] !== null ?
                                     this.state.comments[this.state.index].split(':').map(
                                        comment=>( <div>
                                            <span style={{fontWeight:"bold"}}>{this.state.post.user.username} : </span>
                                        <span>{comment}</span><br/>
                                        </div>)
                                    ) :""
                                    } 
                                    <br/><br/>
                                    <div className="like-section" >
                                      <span onClick={() => this.increaseLikesHandler(this.state.post.id,this.state.index)}>
                                     
                                    {!this.state.likedByUser[this.state.index] ?<FavoriteBorderIcon />:
                                    <FavoriteIcon className="fav"/>}
                                      </span>       
                                            <span style={{fontSize :20}}> {this.state.post.likes.count} likes </span> 
                                    </div> 
                                    
                                    <br/>
                                    <FormControl >
                                   
                                          <div className ="profile-comment-section">                                    
                                            <InputLabel htmlFor="profilecommentInput">Add a comment</InputLabel>
                                            <Input id="profilecommentInput"  type="text" autoComplete="none" value={this.state.commentForPost[this.state.index]}
                                     onChange={(e)=> {this.commentHandler(e,this.state.index)}}   />
                                            <Button variant="contained" color="primary" onClick= {() => {this.addCommentHandler(this.state.index)}}>
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
                        { this.state.posts.map((post,index) => (
                            
                            <GridListTile className={classes.gridTile} key={post.id} > 
                              <img src={post.images.standard_resolution.url}  alt={post.user.id} 
                              onClick={() => {this.setState({postModalIsOpen : true}); this.setState({post:post}); this.setState({index:index})}}/>
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
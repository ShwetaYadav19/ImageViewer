import React, { Component } from 'react';
import './Home.css';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../common/header/Header';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Moment from 'react-moment';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FavoriteIcon from '@material-ui/icons/Favorite';





const styles = theme => ({
    root: {
        maxWidth: 500,
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
     
});
class Home extends Component{
  
    constructor(){
        super();
        this.state = {
            posts : [],
            profile_picture : null,
            comments:[],
            comment:null,
            search:"",
            isLiked:false,
            likedByUser:[],
            commentForPost:[]
           
            
           
        }
       
    }
    componentDidMount() {
        
        // Get profile picture
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        
       
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    profile_picture : JSON.parse(this.responseText).data.profile_picture

                });
            }
        });
   
        xhr.open("GET", this.props.baseUrl+"?access_token="+sessionStorage.getItem("access-token"));
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
         xhrPosts.open("GET", this.props.baseUrl+"/media/recent?access_token="+sessionStorage.getItem("access-token"));
         xhrPosts.setRequestHeader("Cache-Control", "no-cache");
         xhrPosts.send(postData);
      
        
        }  

    loadPost=(index)=>{
        this.state.likedByUser[index]=false;
        this.forceUpdate();
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
          this.setState({comment : event.target.value});
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

    searchHandler=(e)=>{
        e.preventDefault();
        this.setState({search :  e.target.value});
        }
    
     
    render(){
        const { classes } = this.props;
        let relevantPosts = this.state.posts;
       
        if(this.state.search !== undefined){
          
            relevantPosts = this.state.posts.filter( post =>{
            let postInLower = post.caption.text.toLowerCase();
            return postInLower.indexOf( this.state.search.toLowerCase() ) !== -1
        }) }
        
        return(
            <div>
                
                <Header loggedIn='true' showSearchTab="true" baseUrl={this.props.baseUrl} 
                searchHandler={this.searchHandler}/>
                <div className="posts-flex-container">
                 
                 
                  {relevantPosts.map((post,index) => (
                  
                        
                        <div className="posts-card" key={post.id} onLoad={()=>this.loadPost(index)}>
                            <Card className={classes.root} id={"post" + post.id}>
                                <CardHeader
                                    avatar={
                                    <IconButton style={{padding :'0'}}>   
                                        <img src={this.state.profile_picture} alt="profile-pic"
                                        style={{width: 40, height: 40, borderRadius: 40, borderWidth: 'thick' ,borderColor:'black'} } />
                                    </IconButton>
                                    }
                                  
                                    title={post.user.username}
                                 
                                  subheader={ <Moment format="MM/DD/YYYY HH:mm:ss">
                                    {post.user.created_time}
                                   </Moment>
                                  }

                                   
                                    
                                />
                                <div className="image-container">
                                <CardMedia
                                    className={classes.media}
                                    image={post.images.standard_resolution.url}
                                />
                                </div>
                                <hr/>
                                <CardContent>
                                    <Typography variant="body2" color="textPrimary" component="p">
                                     {post.caption.text.split('\n')[0]}
                                       
                                    
                                    </Typography>
                                    <Typography className="tags" variant="body2" component="p">
                                        {post.tags.map((tag,index)=>(
                                          <span key={"tag"+post.id+index}> #{tag}</span>
                                        ))

                                        }
                                    </Typography>
                                   <br/>
                                  <div className="like-section" >
                                      <span onClick={() => this.increaseLikesHandler(post.id,index)}>
                                   
                                     
                                    {this.state.likedByUser[index] ?
                                    <FavoriteIcon className="fav"/>:<FavoriteBorderIcon />}
                                      </span>       
                                            <span style={{fontSize :20}}> {post.likes.count} likes </span> 
                                            </div> 
                                    <br/><br/>
                                  
                                    <div className="comment-container">
                                    {this.state.comments[index] !== undefined && this.state.comments[index] !== null ?
                                     this.state.comments[index].split(':').map(
                                        comment=>( <div key={post.id}> 
                                            <span style={{fontWeight:"bold"}}>{post.user.username} : </span>
                                        <span>{comment}</span><br/>
                                        </div>)
                                    ) :""
                                    }
                                    
                                    <br/><br/>
                                    <FormControl >
                                    <div className ="comment-section">
                                    <InputLabel htmlFor={"comment" + post.id}>Add a comment</InputLabel>
                                    <Input key={"comment" + post.id}  type="text"  value={this.state.commentForPost[index]}
                                     comment={this.state.comment} onChange={(e)=>{this.commentHandler(e,index)}}  />
                                    <Button variant="contained" color="primary" onClick={() => this.addCommentHandler(index)}>
                                        ADD
                                    </Button>
                                    </div>
                                    </FormControl>
                              
                                    </div>
                                    
                                </CardContent>    
                              
                            </Card>
                        </div>
                  
                               
                  ))}
                  
                </div>
   
           </div>
        )
    }
}

export default withStyles(styles)(Home);
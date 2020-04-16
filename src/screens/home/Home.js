import React, { Component } from 'react';
import './Home.css';
import { withStyles } from '@material-ui/core/styles';
import posts from '../../common/posts'
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
      avatar: {
        
      },

      createdTime :{
          
      }
});
class Home extends Component{
  
    constructor(){
        super();
        this.state = {
            posts : posts,
            profile_picture : null,
            numberOfLikes : 0,
            isLiked : false,
            favoritesIcon : "noLike",
            comments:[],
            comment:""
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
                    profile_picture : JSON.parse(this.responseText).data.profile_picture

                });
            }
        });
        console.log(sessionStorage.getItem("access-token"));
        xhr.open("GET", "v1/users/self/?access_token="+sessionStorage.getItem("access-token"));
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);

      

        
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
                <Header loggedIn='true'/>
                <div className="posts-flex-container">
                  {this.state.posts.map(post => (
                
                        <div className="posts-card">
                            <Card className={classes.root} id={"post" + post.id}>
                                <CardHeader
                                    avatar={
                                    <IconButton style={{padding :'0'}}>   
                                        <img src={this.state.profile_picture} 
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
                                    <Typography variant="body2" color="textSecondary" component="p">
                                     {post.caption.text}
                                    </Typography>
                                    { }
                             
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteBorderIcon onClick={this.increaseLikesHandler} 
                                        className={this.state.favoritesIcon} />
                                        <span style={{fontSize :20}}> {post.likes.count} likes </span> 
                                    </IconButton>
                                    <br/><br/>
                                  
                                    <div className="comment-container">
                                    
                                    {
                                        this.state.comments.map(comment =>(
                                            <div>
                                             <span style={{fontWeight:'bolder'}}>{post.user.username} </span>: <span>{comment}</span>
                                            
                                            </div>
                                            
                                           
                                        ))
                                    }
                                    
                                    <br/><br/>
                                    <FormControl >
                                    <div className ="comment-section">
                                    <InputLabel htmlFor="commentInput">Add a comment</InputLabel>
                                    <Input id="commentInput"  type="text"   
                                    comment={this.state.comment} onChange={this.commentHandler} />
                                    <Button variant="contained" color="primary" onClick={this.addCommentHandler}>
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
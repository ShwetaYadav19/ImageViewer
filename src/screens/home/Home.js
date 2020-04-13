import React, { Component } from 'react';
import './Home.css';
import { withStyles } from '@material-ui/core/styles';
import posts from '../../common/posts'
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import 'moment-timezone';



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
            favoritesIcon : "noLike"
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
    render(){
        const { classes } = this.props;
        
        return(
            <div>
                <Header loggedIn='true'/>
                <div className="posts-flex-container">
                  {this.state.posts.map(post => (
                
                        <div className="posts-card">
                            <Card className={classes.root} id={post.id}>
                                <CardHeader
                                    avatar={
                                    <IconButton style={{padding :'0'}}>   
                                        <img src={this.state.profile_picture} 
                                        style={{width: 40, height: 40, borderRadius: 40, borderWidth: 'thick' ,borderColor:'black'} } />
                                    </IconButton>
                                    }
                                  
                                    title={post.user.username}
                                 
                                    subheader = {post.created_time}

                                   
                                    
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
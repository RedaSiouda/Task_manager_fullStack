const dummy = (blog) =>{
    if(blog){
        return 1
    }

}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
  };


  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null;
    }
  
    const mostLikedBlog = blogs.reduce((maxLikesBlog, currentBlog) => {
      return currentBlog.likes > maxLikesBlog.likes ? currentBlog : maxLikesBlog;
    }, blogs[0]);
  
    return {
      title: mostLikedBlog.title,
      author: mostLikedBlog.author,
      likes: mostLikedBlog.likes,
    };
  };

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
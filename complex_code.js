// filename: complex_code.js

/*
This code demonstrates a complex implementation of a social media app
that manages users, posts, and comments.
*/

// User Class
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.friends = [];
    this.posts = [];
  }
  
  addFriend(user) {
    this.friends.push(user);
  }
  
  createPost(text) {
    const post = new Post(text, this);
    this.posts.push(post);
  }
  
  getPosts() {
    return this.posts;
  }
}

// Post Class
class Post {
  constructor(text, author) {
    this.text = text;
    this.author = author;
    this.likes = 0;
    this.comments = [];
  }
  
  like() {
    this.likes++;
  }
  
  addComment(text, user) {
    const comment = new Comment(text, user);
    this.comments.push(comment);
  }
  
  getComments() {
    return this.comments;
  }
}

// Comment Class
class Comment {
  constructor(text, user) {
    this.text = text;
    this.user = user;
  }
  
  getUser() {
    return this.user;
  }
}

// Usage example
const user1 = new User("John", 25);
const user2 = new User("Alice", 30);

user1.addFriend(user2);
user1.createPost("Having a great day!");

user2.getPosts()[0].like();
user2.getPosts()[0].addComment("Nice post!", user1);

console.log(user1.getPosts());
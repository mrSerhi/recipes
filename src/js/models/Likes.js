class Like {
  constructor() {
    this.likes = [];
  }

  addLike(ID, title, author, img) {
    const like = {
      id: ID,
      title,
      author,
      img
    };

    this.likes.push(like);
    return like;
  }

  deleteLike(ID) {
    const index = this.likes.findIndex(el => el.id === ID);
    this.likes.splice(index, 1);
  }

  isLiked(ID) {
    return this.likes.findIndex(el => el.id === ID) !== -1;
  }

  getNumberOfLikes() {
    return this.likes.length;
  }
}

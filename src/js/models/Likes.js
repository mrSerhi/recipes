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

    // seving data in localStorage
    this.writeLikesInStorage();

    return like;
  }

  deleteLike(ID) {
    const index = this.likes.findIndex(el => el.id === ID);
    this.likes.splice(index, 1);

    // seving data in localStorage
    this.writeLikesInStorage();
  }

  isLiked(ID) {
    return this.likes.findIndex(el => el.id === ID) !== -1;
  }

  getNumberOfLikes() {
    return this.likes.length;
  }

  writeLikesInStorage() {
    // localStorage saved data [key] --> [value] and saving data must be a string
    localStorage.setItem("likes", JSON.stringify(this.likes));
  }

  readLikesFromStorage() {
    const arrOfLikesFromStorage = JSON.parse(localStorage.getItem("likes")); // if doesn't has data return Null

    // restore likes
    if (arrOfLikesFromStorage) this.likes = arrOfLikesFromStorage;
  }
}

export default Like;

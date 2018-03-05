class Song {
  constructor(name, singer) {
    (this.name = name), (this.singer = singer);
  }

  get searchKey() {
    return `${this.name} ${this.singer}`;
  }
}

module.exports = Song;

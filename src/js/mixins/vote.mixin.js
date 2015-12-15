
let VoteMixin = {

  handleVote(key, votes) {
    this.firebaseRefs.beers.child(key).update({votes: votes});
  },

};

export default VoteMixin;
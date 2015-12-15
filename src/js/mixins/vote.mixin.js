
let VoteMixin = {

  handleVote(key, votes) {
    this.firebaseRefs.beers.child(key).update({votes: votes});
    // also want to
  },

};

export default VoteMixin;
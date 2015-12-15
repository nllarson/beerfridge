import Firebase from 'firebase';

let baseUrl = 'https://beerfridge.firebaseio.com';
let FirebaseConnection = new Firebase(baseUrl);

export default FirebaseConnection;
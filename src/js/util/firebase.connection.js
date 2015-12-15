import Firebase from 'firebase';

let baseUrl = 'https://opi-omaha-beerfridge.firebaseio.com';
let FirebaseConnection = new Firebase(baseUrl);

export default FirebaseConnection;
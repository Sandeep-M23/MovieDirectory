import axios from 'axios'

 const instance = axios.create({
     baseURL:'https://movies-app-cfd95-default-rtdb.firebaseio.com/'
 });

 export default instance
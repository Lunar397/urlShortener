const { initializeApp } = require("firebase/app") ;
const { getFirestore,collection, onSnapshot , addDoc ,
query , where, getDocs, orderBy, getDoc, deleteDoc,doc} = require("firebase/firestore") ;
require('dotenv').config()
const {firebaseConfig} = require('./firebaseConfig')

initializeApp(firebaseConfig)
const db = getFirestore()
const urls = collection(db ,'Url')


module.exports.remove = (req,res)=>{
    let potatoStar = []
  getDocs(query(urls,where('shorturl','==',req.body.shorturl)))
  .then(e =>{
    e.docs.map(br =>{
   potatoStar.push(br.id)
  })
  if(potatoStar.length == 0){
    return res.send('This shorturl doesn\'t exist!')
  } else {
    deleteDoc(doc(db , 'Url', potatoStar[0])).then(e => {  res.send('Deleted that shorturl!')})
  }
  })
  }
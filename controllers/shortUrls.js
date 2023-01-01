const { initializeApp } = require("firebase/app") ;
const { getFirestore,collection, onSnapshot , addDoc ,
query , where, getDocs, orderBy, getDoc, deleteDoc,doc} = require("firebase/firestore") ;
const {firebaseConfig} = require('./firebaseConfig')
require('dotenv').config()

 
initializeApp(firebaseConfig)
const db = getFirestore()
const urls = collection(db ,'Url')
module.exports.shortUrls = async(req,res)=>{
    const q = query(urls,orderBy("shorturl","asc"))
    const ok = await getDocs(q)
    res.json(ok.docs.map(e =>(e.data())))
  }
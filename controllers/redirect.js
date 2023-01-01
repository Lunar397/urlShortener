const { initializeApp } = require("firebase/app") ;
const { getFirestore,collection, onSnapshot , addDoc ,
query , where, getDocs, orderBy, getDoc, deleteDoc,doc} = require("firebase/firestore") ;
const {firebaseConfig} = require('./firebaseConfig')
require('dotenv').config()
//Initialization
initializeApp(firebaseConfig)
const db = getFirestore()
const urls = collection(db ,'Url')

module.exports.redirect = async(req,res)=>{
    const q = query(urls,where("shorturl","==",req.params.shorturl))
    const ok = await getDocs(q)
    if(ok.docs.map(e => e.data()).length === 0){
    return res.status(404).send('This shorturl doesn\'t exist!')
    }
    res.redirect(ok.docs.map(e => e.data().Url))
    }
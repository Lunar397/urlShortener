module.exports.addUrl = async(req,res)=>{
  const { initializeApp } = require("firebase/app") ;
  const { getFirestore,collection, onSnapshot , addDoc ,
  query , where, getDocs, orderBy, getDoc, deleteDoc,doc} = require("firebase/firestore") ;
  const dns = require('dns')
  const path = require('path')
  require('dotenv').config()
  const {firebaseConfig} = require('./firebaseConfig')
  
  // Initialization
  initializeApp(firebaseConfig)
  const db = getFirestore()
  const urls = collection(db ,'Url')
    const such = await getDocs(urls)
    //To check whether the shorturl already exists or not
   const search = such.docs.find(e => e.data().shorturl == req.body.digit)
   const search2 = such.docs.find(e => e.data().Url == req.body.url)
   if(search) return res.status(401).send('This shorturl already exists!')
   if(search2) return res.status(401).send('You have shortened this url before!')
  
   // To remove "https" and "www." from the url
    const ok = req.body.url.replace('https://','')
    if(ok.includes('www.')){
     let brok = ok.replace('www.','')
     dns.lookup(brok,(err)=>{
      if(err){
         res.status(404).sendFile(path.join(__dirname,'./url/error.html'))
      } else {
       addDoc(urls , {
          shorturl:req.body.digit,
          Url:req.body.url
        }).then(() => res.status(200).send('Added that url!'))
      }
     })
    } else {
      dns.lookup(ok,(err)=>{
        if(err){
            res.status(404).sendFile(path.join(__dirname,'./url/error.html'))
        } else {
         addDoc(urls , {
            shorturl:req.body.digit,
            Url:req.body.url
          }).then(() =>res.status(200).send('Added that url!'))
        }
       })
    }
   }
const router = require('express').Router()
const {addUrl} = require('../controllers/addUrl')
const {remove} = require('../controllers/deleteUrl')
const {redirect} = require('../controllers/redirect')
const {shortUrls} = require('../controllers/shortUrls')
router.get('/shorturls',shortUrls)
router.post('/url', addUrl)
router.post('/url/delete' , remove)
router.get('/:shorturl', redirect)

module.exports = router

const express=require('express');
const route=express();
const d=require('../controllers/userController')
const imageUplod=require('../middleware/imageUplod');

route.post('/updateDoc',imageUplod.single('imgfile'),d.updateDoc)
route.get('/',d.get)
route.get('/viewDoc',d.viewDoc)
route.get('/back',d.back)
route.get('/deleteDoc/:id',d.deleteDoc)
route.post('/user',imageUplod.single('imgfile'),d.getuser)
route.get('/editDoc/:id',d.editDoc)

module.exports=route;
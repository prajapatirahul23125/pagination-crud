const userModel=require('../models/userModel')
const fs=require('fs')

const get=(req,res)=>{
    res.render('index.ejs')
}

const getuser=async(req,res)=>{
    const{name,email,phone,status}=req.body;

    const user=new userModel({
        name,email,phone,status,imgpath:req.file.path,
    })
    await user.save();
    res.redirect('/')
    // console.log("User save success");
}

const viewDoc=async (req,res)=>{
    try{
        var search='';
        if(req.query.search){
            search=req.query.search;
        }
        var page='';
        if(req.query.page){
            page=req.query.page;
        }
        const limit=5;  
        const user=await userModel.find({
            $or:[
                {name:{$regex:'-*'+search+'-*',$options:'i'}},
                {email:{$regex:'-*'+search+'-*',$options:'i'}},
            ]
        })
        .limit(limit*1)
        .skip( page > 0 ? (page - 1) * limit : 0)
        .exec();
        const pagination=await userModel.find({
            $or:[
                {name:{$regex:'-*'+search+'-*',$options:'i'}},
                {email:{$regex:'-*'+search+'-*',$options:'i'}},
            ]
        }).countDocuments();
        res.render('view.ejs',{
            user:user,
            totalpage:Math.ceil(pagination/limit),
            currentpage:page,
            previous:page-1,
            next:page+1,
        });
    }
    catch(err){
        console.log("err",err);
    }
}
const back=(req,res)=>{
    res.redirect('/');
}

const deleteDoc=async (req,res)=>{
    console.log("id",req.params);
    try{
        const deletefile=await userModel.findByIdAndDelete(req.params.id);
        fs.unlink(deletefile.imgpath,()=>{
            res.redirect('/viewDoc');
        })
        
    }
    catch(err){
        console.log("delete err",err);
    }
}

const editDoc=async(req,res)=>{
    try{
        let singleDoc=await userModel.findById(req.params.id)
        console.log("single",singleDoc);
        res.render('edit.ejs',{singleDoc})
    }
    catch(err){
        console.log("edit err",err);
    }
    
}
const updateDoc=async (req,res)=>{

    const {id ,name,email,phone}=req.body;
    try{
        if(req.file){
            var data={name:name,email:email,phone:phone,imgpath:req.file.path};
            const oldData= await userModel.findById(id)
            fs.unlink(oldData.imgpath,()=>{
            console.log("success");
        })
        }
        else{
            var data={name:name,email:email,phone:phone};
        }
        
        const updatedata=await userModel.findByIdAndUpdate(id,data)
        res.redirect('/viewDoc');
    }
    catch(err){
        console.log("update err",err);
    }

    
}
module.exports={get,getuser,viewDoc,back,deleteDoc,editDoc,updateDoc}
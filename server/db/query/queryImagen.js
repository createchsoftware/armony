import multer from 'multer'
import path, { dirname } from 'path'
const __dirname = path.resolve()


const storage=multer.diskStorage({
destination:path.join(__dirname,'./server/images'),
filename:function(req,file,callback){
    const numAle=Date.now()+'-'+Math.round(Math.random()*1E9)

    callback(null,file.fieldname+'-'+numAle)
}
})


const upload=multer({storage:storage}).single('image')


const uploadFIle=(req,res)=>{
    req.getConnection((err,conn)=>{
if(err)
 return res.sed(err);
 const FotoUser=req.file.filename   /*variable para extraer el nombre del archivo */
 const DataUser=req.body;
//  /*esta query cambiara ,es provicional*/conn.query('SHOW COLUMNS FROM `usuario`',(err,resultado)=>{
conn.query('insert into usurio(foto,nombre,correo) values(?,?,?)',
[FotoUser,DataUser.name,DataUser.correo],(err,result)=>{
    if(err){
    console.error('error al insertar usuario',err)

    return res.json({err:"error ala cargar imagen y datos de usuario"})
    }
    console.log('imagen y datos cargados correctamente')
    res.json({msg:'usuario cargado correctamente'})
    });
});
};

export { upload,uploadFIle }
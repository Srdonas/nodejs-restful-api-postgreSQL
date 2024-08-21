// este es un middleware de tipo error es
// determinado por los parametros de la fuction
function logErrors(err,req,res,next){
  console.error(err.stack);
  next(err);
}

function errorHandler(err,req,res,next){
  res.status(500).json(
    {message: err.message,
      stack: err.stack
    }
  );
}

// boom es una libreria para manejar errores en express JS
function boomErrorHandler(err,req,res,next){
  if(err.isBoom){
    const {output} = err;
    res.status(output.statusCode).json(output.payload);
  }else{
    next(err);
  }
}

module.exports = {logErrors, errorHandler, boomErrorHandler}

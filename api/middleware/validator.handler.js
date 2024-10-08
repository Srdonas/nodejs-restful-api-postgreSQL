const boom = require('@hapi/boom');


function validatorHandler(schema, property){
  return (req, res,next) => {
    const data = req[property];
    //abortEarly hace que JOI mande todos los errores
    const {error} = schema.validate(data,{abortEarly: false});
    if (error){
      next(boom.badRequest(error));
    }else{
      next();
    }
  }
}

module.exports = validatorHandler;

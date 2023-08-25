const jwt = require('jsonwebtoken');

const validateTokenJWT = (req, res, next) =>{
    const headersReq  = req.headers;
    const tokenRoutes = headersReq['authorization'].split(" ")[1];
    
    // Authorization: Bearer <token>
    // console.log("headers",headersReq);
    // console.log("token", tokenRoutes);

    if(tokenRoutes !== undefined){
        req.tokenRoutes = tokenRoutes;

        jwt.verify(tokenRoutes, "HenryProyectoFinalFindHotel",
            (err, authData) => {
                if (err !== null) res.status(403).json({"error":"acceso denegado"})
                else {
                    req.userLogin = authData;
                    next()
                };
            }
        )        
    }
    else{
        res.status(403).json({"error":"acceso denegado"})
    }
};

module.exports = validateTokenJWT;
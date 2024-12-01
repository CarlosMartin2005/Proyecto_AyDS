const isAdmin = (req, res, next) => {
    try {
        if (req.rol !== 'Super') {
            return res.status(403).json({
                message: 'Acceso denegado'
            });
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Error en el servidor'
        });
    }
};

const isDocente = (req, res, next) => {
    try {
        if (req.rol !== 'Docente' && req.rol !== 'Super') {
            return res.status(403).json({
                message: 'Acceso denegado'
            });
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Error en el servidor'
        });
    }
};

const isAlumno = (req, res, next) => {
    try {
        if (req.rol !== 'Alumno') {
            return res.status(403).json({
                message: 'Acceso denegado'
            });
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Error en el servidor'
        });
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.rol)) {
                return res.status(403).json({
                    message: 'Acceso denegado'
                });
            }
            next();
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    };
};

export { isAdmin, isDocente, isAlumno, authorizeRoles };
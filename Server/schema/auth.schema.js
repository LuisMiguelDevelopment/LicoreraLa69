const { z } = require('zod');

exports.registerSchema = z.object({
    Nombre: z.string({
        required_error: "Nombre es requerido"
    }),
    Email: z.string({
        required_error: "Email es requerido"
    }).email({
        message: "Invalid Email Address"
    }),
    Contrasena: z.string({
        required_error: 'Contraseña es requerida '
    }).min(6, {
        message: 'Password must be at least  6 characters long'
    }),
    Fecha: z.string({
        required_error: 'Date of birth is required field'
    }).refine((value) => {
        const edadMinima = 18;

        // Intenta crear un objeto Date a partir del valor de cadena
        const fechaNacimiento = new Date(value);

        // Verifica si el objeto Date es válido
        if (isNaN(fechaNacimiento.getTime())) {
            throw new Error('Invalid date format');
        }

        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

        if (
            edad < edadMinima ||
            (edad === edadMinima &&
                (hoy.getMonth() < fechaNacimiento.getMonth() ||
                    (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate())))
        ) {
            throw new Error('You must be at least 18 years old');
        }

        return true;
    }),
});

exports.loginSchema = z.object({
    Email: z.string({
        required_error: "Email address is a required field"
    }).email({
        message: "Invalid Email Address"
    }),
    Contrasena: z.string({
        required_error: 'Password is required field '
    }).min(6, {
        message: 'Password must be at least  6 characters long'
    })
});

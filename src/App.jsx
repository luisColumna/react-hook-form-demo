import { useForm } from "react-hook-form";

function App() {
    const {
        register,
        handleSubmit,
        formState:{errors},
        watch,
        setValue,
        reset,
    } = useForm({
        defaultValues: {
            nombre: 'Luis Miguel',
            email: 'luis@gmail.com',
        }
    });

    console.log(errors);

    const onSubmit = handleSubmit( ( data ) => {
        console.log(data);
        alert('Enviando datos...')
        setValue('email','')
        reset()
    });

    return (
        <form onSubmit={ onSubmit }>
            {/* nombre */}
            <label htmlFor="nombre">Nombre</label>
            <input type="text"
            { 
                ...register("nombre", { 
                    required: {
                        value: true,
                        message: 'Nombre es requerido'
                    },
                    minLength: {
                        value: 2,
                        message: 'Nombre debe tener al menos 2 caracteres'
                    },
                    maxLength: {
                        value: 20,
                        message: 'Nombre debe tener maximo 20 caracteres'
                    }
                }) } />
            {
               errors.nombre && <span>{ errors.nombre.message }</span>
            }

            {/* correo */}
            <label htmlFor="email">Correo</label>
            <input type="email" { ...register("email",{
                required: {
                    value: true,
                    message: 'Correo es requerido'
                },
                pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Correo no válido'
                } 
            }) } />
            {
               errors.email && <span>{ errors.email.message }</span>
            }

            {/* password */}
            <label htmlFor="password">Password</label>
            <input type="password" { ...register("password", {
                required: {
                    value: true,
                    message: 'Password es requerido'
                },
                minLength: {
                    value: 6,
                    message: 'Password debe tener al menos 6 caracteres'
                }
             }) }  />
            {
               errors.password && <span>{ errors.password.message }</span>
            }

            {/* confirmPassword */}
            <label htmlFor="confirmPassword">Confirmar Password</label>
            <input type="password"  { ...register("confirmPassword", {
                required: {
                    value: true,
                    message: 'Confirmar Password es requerido'
                },
                validate: value => value === watch('password') || 'Los passwords no coinciden'
             }) } />
            {
               errors.confirmPassword && <span> { errors.confirmPassword.message }</span>
            }

            {/* birthDate */}
            <label htmlFor="birthDate">Fecha de nacimiento</label>
            <input type="date" { ...register("birthDate", { 
                required: {
                    value: true,
                    message: 'Fecha de nacimiento es requerido'
                },
                validate: value => {
                    const fechaNacimiento = new Date(value);
                    const fechaActual = new Date();
                    const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
                    return edad >= 18 || 'Debe ser mayor de edad'
                }
             }) }  />
            {
               errors.birthDate && <span>{ errors.birthDate.message }</span>
            }

            {/* country */}
            <label htmlFor="country">País</label>
            <select { ...register("country") } >
                <option value="mx">México</option>
                <option value="co">Colombia</option>
                <option value="ar">Argentina</option>
            </select>

            {
                watch('country') === 'ar' && (
                    <>
                        <input
                            type="text"
                            placeholder="Provincia"
                            {
                                ...register('provincia', {
                                    required: {
                                        value: true,
                                        message: 'Provincia es requerido',
                                    },
                                })
                            }
                        />
                        {errors.provincia &&<span> { errors.provincia.message }</span> }
                    </>
                )
            }

            {/* file */}
            <label htmlFor="foto">Foto</label>
            <input type="file" onChange={(e) => {
                console.log(e.target.files[0]);
                setValue('fotoUsuario',e.target.files[0])
            }
            }  />
            {/* <input type="file" { ...register("foto") }  /> */}

            {/* terminos */}
            <label htmlFor="terminos">Acepto
            términos y condiciones
            </label>
            <input type="checkbox" { ...register("terminos", { 
                required: {
                    value: true,
                    message: 'Debe aceptar términos y condiciones'
                }
             }) } />
            {
               errors.terminos && <span>{ errors.terminos.message }</span>
            }

            <button type="submit">
                Enviar
            </button>
            <pre>{ JSON.stringify( watch(), null, 2 ) }</pre>

        </form> 
    )
}

export default App

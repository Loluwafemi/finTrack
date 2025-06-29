import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string().required("Required!"),
    password: Yup.string().required("Required!")
})


export const signupSchema = Yup.object().shape({
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    number: Yup.string().required("Required"),
    organization: Yup.string().required("Required"),
    organization_name: Yup.string().required("Required"),
    invitation_key: Yup.string().optional(),
})
import * as Yup from 'yup';

export const loginSchema =  Yup.object().shape({
   email: Yup.string().email('Invalid email').required('Required'),
   password: Yup.string()
     .min(7, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required')
 });



export const signupSchema = Yup.object().shape({
    firstname: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
    lastname: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
     .min(7, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
     
    // either this or others
    organization: Yup.string().required('Organization Required').optional(),
    organizationname: Yup.string().required("Organization Name Required").optional(),
    organizationaddress: Yup.string().required("Organization Address Required").optional(),
    organizationphonenumber: Yup.string().required("Organization Phone Number Required").optional(),
    organizationregistrationnumber: Yup.string().required("Organization Registration Number Required").optional(),

    // must thiss
    bank: Yup.string().required("Bank Required"),
    accountnumber: Yup.string().required("Bank Account Number Required"),
    accountname: Yup.string().required("Bank Account Name Required"),

 });


export const receiptUploadingSchema = Yup.object().shape({
    budget: Yup.string().required('Budget Required before Upload'),
    expense: Yup.string().required('Expense Required before Upload'),
    description: Yup.string().required('Receipt Description Required before Upload'),
    receipt: Yup.object().required("file receipt Required before Upload")
})
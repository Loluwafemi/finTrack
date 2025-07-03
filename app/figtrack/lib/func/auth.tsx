import * as Yup from 'yup';

export const loginSchema =  Yup.object().shape({
   email: Yup.string().email('Invalid email').required('Required'),
   password: Yup.string()
     .min(7, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required')
 });


export const newBudgetSchema = Yup.object().shape({
    title: Yup.string().required("name the budget you plan to track!"),
    category: Yup.string().required("select the budget category you plan to track!. or select custom if not found"),
    customcategory: Yup.string().required("Required").optional(),
    expenses: Yup.array().required("add at least 2 expense on this budget").min(2)
    
})

export const expenseSchema = Yup.object().shape({
    expenseCategory: Yup.string().required("Required"),
    cost: Yup.string().required("Required"),
})


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

    displayer: Yup.string().optional(),
     
    // either this or others
    organization: Yup.string().required('Organization Required').optional(),
    organizationname: Yup.string().required("Institution Name Required"),
    organizationid: Yup.string().required("Your Institution ID Required").min(4),

    // must thiss
    bank: Yup.string().required("Bank Required"),
    accountnumber: Yup.string().required("Bank Account Number Required"),
    accountname: Yup.string().required("Bank Account Name Required"),

});


export const receiptUploadingSchema = Yup.object().shape({
    budget: Yup.string().required('Budget Required before Upload'),
    expense: Yup.string().required('Expense Required before Upload'),
    description: Yup.string().required('Receipt Description Required before Upload'),
    receipt: Yup.object().required("file receipt Required before Upload").optional(),
    cost: Yup.number().required("cost spent is required before Upload"),
})


export const recordProviderForBudgetSchema = Yup.object({
    selectedBuget: Yup.string().required("Select a budget"),
    displayingBudget: Yup.array()
})
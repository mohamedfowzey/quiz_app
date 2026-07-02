export const validations ={
    email:{
        required:'email is requiured',
        pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:'invalid email'}
    },
    oneWordName:{
        required:'this field is required',
        pattern:{value:/^[A-Za-z]{1,}$/,message:'name must be a one-word valid person name'}
    },
    role:{required:'role must be one of instructor, learner'},
    password:{required:'password is required'},
    otp:{required:'otp is required', pattern:{value:/^\d{4}$/,message:'invalid otp'}},
    confirmPassword:{required:'confirm password is required'}

} 
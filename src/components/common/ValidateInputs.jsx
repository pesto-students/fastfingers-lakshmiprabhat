export default function ValidateInputs(values){
let errors={};
if (!values.username.trim()){
    errors.username = "Please enter your name to proceed with the game";
}
return errors;
}
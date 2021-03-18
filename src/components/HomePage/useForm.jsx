import {useState,useEffect} from 'react';
import {saveDataToLocalStorage} from "../common/Util.jsx";

const useForm = (submitFormFn,validate) =>{
    const [values,setValues]= useState({username: '',difficultyLevel: '1'})
    const [errors,setErrors] = useState({});
    const [isSubmitting,setIsSubmitting]=useState(false);
    const handleChange=(event)=>{
        const {name, value} = event.target;
    setValues({...values,[name]:value})
    };
    const handleSubmit = (event) => {
        event.preventDefault();       
        saveDataToLocalStorage('username',values.username);
        saveDataToLocalStorage('difficultyLevel',values.difficultyLevel);
        setErrors(validate(values));
        setIsSubmitting(true);
      };
    useEffect(
        () => {
          if (Object.keys(errors).length === 0 && isSubmitting) {
            submitFormFn();
          }
        },
        [errors]
      );
    

    return {handleChange,handleSubmit,values,errors};
}
export default useForm;
import {useState,useEffect} from 'react';
import {saveDataToLocalStorage} from "../common/Util.jsx";

const useForm = (callback,validate) =>{
    const [values,setValues]= useState({username: '',difficultyLevel: '1'})
    const [errors,setErrors] = useState({});
    const [isSubmitting,setIsSubmitting]=useState(false);
    const handleChange=(event)=>{
        const {name, value} = event.target;
    setValues({...values,[name]:value})
    };
    useEffect(
        () => {
          if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
          }
        },
        [errors]
      );
    
    const handleSubmit = (event) => {
        event.preventDefault();       
        saveDataToLocalStorage('username',values.username);
        saveDataToLocalStorage('difficultyLevel',values.difficultyLevel);
        setErrors(validate(values));
        setIsSubmitting(true);
      }
    return {handleChange,handleSubmit,values,errors};
}
export default useForm;
export const inputStyleValidation = (elementId, elementError) =>{
    if (elementError) {
        document.getElementById(elementId).classList.remove('is-valid');
        document.getElementById(elementId).classList.add('is-invalid');
    }
    else {
        document.getElementById(elementId).classList.remove('is-invalid');
        document.getElementById(elementId).classList.add('is-valid');
    }         
}
export default function InputFilter({setFilterProductInput}){
    const handleInputChange = (e) => {
        setFilterProductInput(e.target.value);
    };
    return (
        <div className="input-container">
            <input 
                type="text" 
                placeholder="Search..." 
                id="filtredProduct" 
                name="filtredProduct" 
                onChange={handleInputChange}
            />
        </div>
    )
}
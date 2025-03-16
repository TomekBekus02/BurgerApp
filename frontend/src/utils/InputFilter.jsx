import inputFilterStyles from './InputFilter.module.css'

export default function InputFilter({ setFilterProductInput }) {
    const handleInputChange = (e) => {
        setFilterProductInput(e.target.value);
    };
    return (
        <div className={`${inputFilterStyles.inputContainer} `}>
            <div className={`${inputFilterStyles.inputBox} `}>
                <input
                    type="text"
                    placeholder={"Search..."}
                    id="filtredProduct"
                    name="filtredProduct"
                    onChange={handleInputChange}
                />
                <i className="fa fa-search"></i>
            </div>

        </div>
    )
}
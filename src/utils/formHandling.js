export default (formData, setFormData) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log('name', name, value)
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
   
  };
  
  const handleSelectChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
   
  };

  return {
    handleInputChange,
    handleSelectChange
  }
}
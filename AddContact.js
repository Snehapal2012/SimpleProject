let isUpdate = false;
let contactObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    const name=document.querySelector('#name');
        const nameError=document.querySelector('.name-error');
            name.addEventListener('input',function(){
                let nameRegex=RegExp('^[A-Z]{1}[a-z]{3,}\\s{1,}[A-Z]{1}[a-z]{2,}$');
                if (nameRegex.test(name.value))
                nameError.textContent="";
                else nameError.textContent="Name is Incorrect!";
            });
    const address=document.querySelector('#address');
        const addressError=document.querySelector('.address-error');
            address.addEventListener('input',function(){
                let addressRegex=RegExp('^[a-zA-z0-9!@#$%^&*/-]{3,}\\s{0,}[a-zA-z0-9!@#$%^&*/-]{3,}\\s{0,}$');
                if (addressRegex.test(address.value))
                addressError.textContent="";
                else addressError.textContent="Address is Incorrect!";
            });
    const phoneNumber=document.querySelector('#phone');
        const numberError=document.querySelector('.number-error');
            phoneNumber.addEventListener('input',function(){
                let numberRegex=RegExp("^[0-9!+-]{10,}$");
                if (numberRegex.test(phoneNumber.value))
                numberError.textContent="";
                else numberError.textContent="Phone number is Incorrect!";
            });
            checkForUpdate();
        });
    const save = (event) => {
        event.preventDefault();
        event.stopPropagation();
        try{
            setContactObject();
            createAndUpdateStorage();
            resetForm();
            window.location.replace(site_properties.home_page);
        }catch (e){
            return;
            }
        }
       
        const setContactObject = () => {
            contactObj._name=getInputValueById('#name');
            contactObj._address=getInputValueById('#address');
            contactObj._city=getInputValueById('#city');
            contactObj._zip=getInputValueById('#zip');
            contactObj._phoneNumber=getInputValueById('#phone');
        }
        const createAndUpdateStorage = () => {
            let contactList=JSON.parse(localStorage.getItem("ContactList"));
            if(contactList){
                let contactData=contactList.
                               find(personData => personData._name == contactObj._name);
            if(!contactData){
                                contactList.push(createContactData());
            }else{
                const index=contactList
                                        .map(personData => personData._name)
                                        .indexOf(contactData._name);
                                contactList.splice(index, 1,createContactData(contactData._name));
                                }
                            }else{
                                contactList=[createContactData()]
                           }
            localStorage.setItem("ContactList", JSON.stringify(contactList))
        }
        const createContactData = (id) =>{
            let contactData=new Contact();
            if(!id) contactData.id=createNewBookId();
            else contactData.id=id;
            setContactData(contactData);
            return contactData;
        }
        const setContactData = (contactData) => {
            try{
                contactData.name=contactObj._name;
            }catch (e){
                setTextValue('.name-error', e);
                throw e;
            }
            try{
                contactData.address=contactObj._address;
            }catch (e){
                setTextValue('.address-error', e);
                throw e;
            }
            contactData.city=contactObj._city;
            contactData.zip=contactObj._zip;
            try{
            contactData.phoneNumber=contactObj._phoneNumber;
            }catch (e){
            setTextValue('.number-error', e);
            throw e;
            }
            alert(contactData.toString());
        }
        const createNewBookId= () => {
            let personID = localStorage.getItem("ContactID");
            personID=!personID ? 1 : (parseInt(personID)+1).toString();
            localStorage.setItem("ContactID",personID);
            return personID;
        }
        const createContact=()=>{
            let contactData=new Contact();
            try{
                contactData.name=getInputValueById('#name');
           }catch (e){
                setTextValue('.name-error', e);
                throw e;
            }
            try{
                contactData.address=getInputValueById('#address');
            }catch (e){
                setTextValue('.address-error', e);
                throw e;
            }
            contactData.city=getInputValueById('#city');
            contactData.zip=getInputValueById('#zip');
            try{
                contactData.phoneNumber=getInputValueById('#phone');
            }catch (e){
                setTextValue('.number-error', e);
                throw e;
            }
            alert(contactData.toString());
            return contactData;
        }
        const getInputValueById=(id)=>{
            let value=document.querySelector(id).value;
            return value;
        }
      
        const setForm = () => {
            setValue('#name', contactObj._name);
            setValue('#address', contactObj._address);
            setValue('#city', contactObj._city);
            setValue('#zip', contactObj._zip);
            setValue('#phone', contactObj._phoneNumber);
        }
        const resetForm = () =>{
            setValue("#name", "");
            setValue("#address", "");
            setValue("#city", "");
            setValue("#zip", "");
            setValue("#phone", "");
        }
        const setValue = (id, value) => {
            const element = document.querySelector(id);
            element.value = value;
        } 
        const checkForUpdate = () => {
            const contactJson = localStorage.getItem('editCon');
            isUpdate = contactJson ? true : false;
            if (!isUpdate) return;
            contactJson = JSON.parse(contactJson);
            setForm();
        }
        const setTextValue = (id, value) => {
            const element = document.querySelector(id); element.textContent = value;
        }
let contactList;
window.addEventListener('DOMContentLoaded',(event) => {
    contactList = getContactDataFromStorage();
    document.querySelector(".person-count").textContent = contactList.length;
    createInnerHtml();
    localStorage.removeItem('editCon');
    });
    const getContactDataFromStorage = () => {
        return localStorage.getItem('ContactList') ?
                            JSON.parse(localStorage.getItem('ContactList')) : []; 
    }
    const createInnerHtml=() =>{
        if(contactList.length == 0)
        return;
        const headerHtml="<th>Full Name</th><th>Address</th><th>City</th>"+
                           "<th>Zip Code</th><th>Phone Number</th>";
    let innerHtml = `${headerHtml}`;
    for(const contactData of contactList){
        innerHtml = `${innerHtml}
         <tr>
            <td>${contactData._name}</td>
            <td>${contactData._address}</td>
            <td>${contactData._city}</td>
            <td>${contactData._zip}</td>
            <td>${contactData._phoneNumber}</td>
            <td>
            <img id="${contactData._name}" onclick="remove(this)" alt="delete" src="delete-black-18dp.svg">
            <img id="${contactData._name}" onclick="update(this)" alt="edit" src="create-black-18dp.svg">
            </td>
         </tr>
        `;
        }
        document.querySelector('#display').innerHTML=innerHtml;
    } 
    const remove = (node) => {
        let contactData = contactList.find(personData => personData._name == node.id);
        if (!contactData) return;
        const index = contactList
                      .map(personData => personData._name)
                      .indexOf(contactData._name);
        contactList.splice(index, 1);
        localStorage.setItem("ContactList", JSON.stringify(contactList));
        document.querySelector(".person-count").textContent=contactList.length;
        createInnerHtml();
    } 
    const update = (node) => {
        let contactData = contactList.find(personData => personData._name == node.id);
        if(!contactData) return;
        localStorage.setItem('editCon', JSON.stringify(contactData));
        window.location.replace(site_properties.add_person_page);
    } 
    let site_properties={
        home_page: "home.html",
        add_person_page: "AddContact.html"
    };
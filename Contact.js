class Contact{
    get name(){
        return this._name;
    }
    set name(name){
        let nameRegex=RegExp('^[A-Z]{1}[a-z]{3,}\\s{1,}[A-Z]{1}[a-z]{2,}$');
        if(nameRegex.test(name))
        this._name=name;
        else throw 'Name is Incorrect!';
    }
    get address(){
        return this._address;
    }
    set address(address){
        let addressRegex=RegExp('^[a-zA-z0-9!@#$%^&*/-]{3,}\\s{0,}[a-zA-z0-9!@#$%^&*/-]{3,}\\s{0,}$');
        if(addressRegex.test(address))
        this._address=address;
        else throw 'Address is Incorrect!'
    }
    get city(){
        return this._city;
    }
    set city(city){
        this._city=city;
    }
    get zip(){
        return this._zip;
    }
    set zip(zip){
        this._zip=zip;
    }
    get phoneNumber(){
        return this._phoneNumber;
    }
    set phoneNumber(phoneNumber){
        let phoneNumberRegex=RegExp("^[0-9!+-]{10,}$");
        if(phoneNumberRegex.test(phoneNumber))
        this._phoneNumber=phoneNumber;
        else throw 'Phone number is incorrect!'
    }
    toString(){
        return "Name : " + this.name + ", Address : " + this.address + ", City : "+ this.city + ", Zip : "+ this.zip+ ", Phone Number : "+ this.phoneNumber;
    }
}
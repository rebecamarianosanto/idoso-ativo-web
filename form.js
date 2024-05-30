class FormSubmit{

    constructor(settings){
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if(this.form){
            this.url= this.form.getAttribute("action");
        }
    }
    displaySuccess(){
        this.form.innerHTML = this.settings.success;
    }
    displayError() {
        this.form.innerHTML = this.settings.error;
    }


    getFormObject(){
        const FormObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field)=> {
            FormObject[field.getAttribute("name")]=field.value;
        });
        return FormObject;
    }
    async sendForm(){
        try{
            await fetch(this.url,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    Accept: "appication/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });
            this.displaySuccess();
        }catch(error){
            this.displayError();
            throw new Error (error);
        }
    }

    init(){
        if (this.form) this.formButton.addEventListener("click", ()=> this.displaySuccess());
        return this;
    }
}

const formSubmit = new FormSubmit({});
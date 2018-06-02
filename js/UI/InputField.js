class InputField {

	constructor(id) {

		this.field = document.getElementById(id);	
		this.value = this.field.value;
		var field = this;
		this.field.oninput = function() {
		    field.value = this.value;
		 }
	}	


}
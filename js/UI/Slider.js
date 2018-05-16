class Slider {

	constructor(id) {

		this.slider = document.getElementById(id);	
		this.value = this.slider.value;
		var slider = this;
		this.slider.oninput = function() {
		    slider.value = this.value;
		 }
	}	


}
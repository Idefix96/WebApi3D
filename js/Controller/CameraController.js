class CameraController
{
	constructor() {

		document.addEventListener("keydown", (e) => {this.move(e);});
		document.addEventListener("keyup", (e) => {this.stop(e);});
		document.addEventListener("mousemove", (e) => {this.mouse(e);});
		this.moveForward = false;
		this.moveBackward = false;
	}

	move(evt) {
		var key = String.fromCharCode(evt.keyCode);
		switch(key){
			case "W":
				this.moveForward = true;
				alert("W");
			case "S":
				this.moveBackward = true;
				alert("S");
		}
	}

	stop(evt) {
		var key = String.fromCharCode(evt.keyCode);
		switch(key){
			case "W":
				this.moveForward = false;
				alert("W");
			case "S":
				this.moveBackward = false;
				alert("S");
		}
	}

	mouse(evt) {
		console.log(evt.clientX);
		
	}
}
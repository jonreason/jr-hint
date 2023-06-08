export default class JRHint extends HTMLElement {
	constructor() {
		super();

		const HintTemplate = document.createElement("template");
		HintTemplate.innerHTML = `
		<style>
			:host {
				display: flex;
				visibility: visible;
				flex-direction: row;
				justify-content: flex-start;
				position: absolute;
				bottom: 0;
				width: 100%;
				height: auto;
				background-color: black;
				color: gold;
				user-select:none;
				pointer-events: none;
			}
			
			:host(.visible) {
				visibility: visible;
			}
			
		</style>
	
		<slot></slot>
		`;


		const shadow = this.attachShadow({mode: 'open'});
		shadow.append(HintTemplate.content.cloneNode(true));

		this.innerHTML = "";
		this.writeToConsole = this.getAttribute("console");

		let hints = this.getAttributeNames();
		let selection;

		for(let i=0; i<hints.length; i++) {

			if(!document.querySelector(hints[i])){
				continue;
			}

			selection = document.querySelectorAll(hints[i]);

			selection.forEach((element) => {
				element.addEventListener('mouseover', () => {
					if (this.writeToConsole !== null) {
						console.log(this.getAttribute(hints[i]));
					} else {
						this.innerHTML = this.getAttribute(hints[i]);;
						this.classList.add("visible");
					}
				});
				element.addEventListener('mouseleave', () => {
					this.innerHTML = ""
					this.classList.remove("visible");
				});
			});

		};

	}

}

export class JrHint extends HTMLElement {
	constructor() {
		super();

		const JrHintTemplate = document.createElement("template");
		JrHintTemplate.innerHTML = `
		<style>
			:host {
				display: flex;
				visibility: hidden;
				flex-direction: row;
				justify-content: flex-start;
				position: fixed;
				bottom: 0;
				left:0;
				min-height: 40px;
				width: 100%;
				height: auto;
				background-color: black;
				color: gold;
				z-index: 100;
			}
			:host(.visible) {
				visibility: visible;
			}

			p {
				margin: 10px;;
			}	
				
			button {
				color: gold;
				margin-left: auto;
				margin-right: 10px;
				background-color: transparent;
				border: 0;
				outline: 0;
				cursor: pointer;
			}
			
			button:hover {
				color: white;
			}
			
		</style>
		<p><slot></slot></p>
		<button>x</button>
		`;

		const shadow = this.attachShadow({mode: 'open'});
		shadow.append(JrHintTemplate.content.cloneNode(true));

	}

	connectedCallback() {

		this.writeToConsole = this.getAttribute("console");
		this.keepFixed = this.getAttribute("fixed");
		this.selection = null;

		let hints = this.getAttributeNames();

		for (let i = 0; i < hints.length; i++) {
			let selectors = hints[i] + ", ." + hints[i] + ", #" + hints[i];
			if (!document.querySelector(selectors)) {
				continue;
			}

			this.selection = document.querySelectorAll(selectors);

			this.selection.forEach((element) => {
				element.addEventListener('mouseover', () => {

					if (this.writeToConsole !== null) {
						console.log(hints[i] + ":", this.getAttribute(hints[i]));
					} else {
						this.innerHTML = this.getAttribute(hints[i]);
						;
						this.classList.add("visible");
					}
				});
				if (this.keepFixed === null) {
					element.addEventListener('mouseleave', () => {
						this.innerHTML = ""
						this.classList.remove("visible");
					});
				}

			});

		}

		this.shadowRoot.querySelector("button").addEventListener('click', evt => {
			this.classList.remove("visible");
		});

	}

	close() {
		this.classList.remove("visible");
	}
}

import { Component, Input, Output} from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {

  @Input() progress: number;
  @Output() progressini: number;

  constructor() {}

  ngOnInit() {
		this.progressini = 0;
		let timer = setInterval (() => {
			this.progressini += 1;
			if (this.progressini >= this.progress){
				clearInterval(timer);
			};
			return this.progressini;
		}, 15);
	}

}

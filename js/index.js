$(document).ready(function(){
	//Dom is ready.

	var Calculator = {
		runningTotal : '',	
		currentVal : '',
		setCurrentVal: false,
		executeAction: '',
		display: '',
		adjustTotals: function(val){
			if (!this.setCurrentVal) {
				this.runningTotal += val;
			} else {
				this.currentVal += val;
			};
		},
		add: function(){
			this.runningTotal = parseInt(this.runningTotal) + parseInt(this.currentVal);
		},
		subtract: function() {
			this.runningTotal = parseInt(this.runningTotal) - parseInt(this.currentVal);
		},	
		multiply: function(){
			this.runningTotal = parseInt(this.runningTotal) * parseInt(this.currentVal);
		},
		divide: function(){
			this.runningTotal = parseInt(this.runningTotal) / parseInt(this.currentVal);
		},
		clear: function(){
			this.runningTotal = '';
			this.currentVal = '';
			this.executeAction = '';
			this.setCurrentVal = false;
			this.display = '';
		},
		resetCurrentVal: function (){
			this.currentVal = '';
		},
		calculate: function(){
			this.executeAction = '';
			this.currentVal = '';
			return this.runningTotal;
		},
		getAction: function(val){
			 var method = '';
			switch (val) {
				case '+': 
					method = Calculator.add;
					break;
				case '-':
					method = Calculator.subtract;
					break;
				case 'x':
					method = Calculator.multiply;
					break;
				case '/':
					method = Calculator.divide;
					break;
			}

			return method;
		},
		setDisplay: function(){
			return this.display = this.currentVal == '' ? this.runningTotal : this.currentVal;
		}
	};

	
	var onButtonPress = function (){
		var that = $(this),
			action = that.hasClass('action'),
			instant = that.hasClass('instant'),
			val = that.text();
		if (!action) {
			//No action means the button pressed not an "action"
			Calculator.adjustTotals(val);
		} else if(!instant) { 
			if (Calculator.executeAction != ''){
				Calculator.executeAction();
			};

			Calculator.executeAction = Calculator.getAction(val);
			Calculator.setCurrentVal = true;
			Calculator.resetCurrentVal();
		} else {

			if (Calculator.executeAction != ''){
				Calculator.executeAction();
			};

			switch (val){
				case 'C': 
					method = Calculator.clear();
					break;
				case '=':
					method = Calculator.calculate();
					break;
			}
		}

		Calculator.setDisplay();
	}

	var refreshVal = function(){
		$('.calculator input[type=text]').val(Calculator.display);
	}

	$('div.key').click(function(){
		onButtonPress.call(this);
		refreshVal();
	});
});
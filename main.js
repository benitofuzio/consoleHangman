var prompt = require('prompt');
var Word = require('./word.js');

prompt.start();

game = {
	wordBank : ["basketball", "tennis", "soccer", "football", "badminton", "hockey", "baseball"],
	wordsWon : 0,
	guessesRemaining : 10, 
	currentWrd : null, 
	startGame : function (wrd){
	
		this.resetGuessesRemaining();

	
		this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);

		this.currentWrd.getLets(); 

		this.keepPromptingUser();

	}, 
	resetGuessesRemaining : function(){
		this.guessRemaining = 10;
	},
	keepPromptingUser : function(){
		var self = this;

		prompt.get(['guessLetter'], function(err, result) {
		  
		    
		    console.log('  The letter or space you guessed is: ' + result.guessLetter);

		   
		    var findHowManyOfUserGuess = self.currentWrd.checkIfLetterFound(result.guessLetter);

		    
		    if (findHowManyOfUserGuess == 0){
		    	console.log('Incorrect');
		    	self.guessesRemaining--;
		    }else{
		    	console.log('Correct');

		    
	    		if(self.currentWrd.didWeFindTheWord()){
			    	console.log('You Win!!!');
			    	return; 
			    }
		    }
		    
		    console.log('Guesses remaining: ', self.guessesRemaining);
		    console.log(self.currentWrd.wordRender());
		    console.log('letters you guessed already: ');

		    if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
		    	self.keepPromptingUser();
		    }
		    else if(self.guessesRemaining == 0){
		    	console.log('Game Over ', self.currentWrd.word);
		    	console.log('For reals?');
		    }else{
		    	console.log(self.currentWrd.wordRender());
		    }
		});
	}


};

game.startGame();
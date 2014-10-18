var _8ball = (function () {
	var s = ["It is certain","It is decidedly so","Without a doubt","Yes definitely","You may rely on it","As I see it, yes","Most likely","Outlook good","Yes","Signs point to yes","Reply hazy try again","Ask again later","Better not tell you now","Cannot predict now","Concentrate and ask again","Don't count on it","My reply is no","My sources say no","Outlook not so good","Very doubtful"];
	var _getElement = function () {
			var index = Math.floor(Math.random()*s.length);
			return {
				idx: index,
				msg: s[index]
			}
	};
	var _pluralize = function (arg) {
		return parseInt(arg, 10) === 1 ? arg + ' time' : arg + ' times';
	};
	return {
		getRandomElement: _getElement,
		pluralize: _pluralize
	}
})();

window.onload = function () {
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName == "back") {
        	tizen.application.getCurrentApplication().exit();
        }
    });
    
    var a = document.querySelector('.tizen-button'),
	b = document.querySelector('.tizen-content'),
	c = document.querySelector('.tizen-counter .counter'),
	loader = document.querySelector('.tizen-loader');

	a.addEventListener('click', function () {
		var randomizer = _8ball.getRandomElement();
		var classToAdd, counter;
		b.innerText = '';
		a.style.pointerEvents = 'none';
		loader.style.visibility = 'visible';
		setTimeout(function () {
			b.classList.remove('warning', 'neutral', 'positive');
			classToAdd = randomizer.idx < 10 ? 'positive' : (randomizer.idx < 15 ? 'neutral' : 'warning');
			b.classList.add(classToAdd);
			b.innerText = randomizer.msg;
			a.innerText = '';
			a.innerText = 'You could ask me another question';
			a.classList.add('clicked');
			counter = parseInt(c.innerHTML.split(' ')[0], 10);
			c.innerHTML = '';
			c.innerHTML = _8ball.pluralize(counter + 1);
			loader.style.visibility = 'hidden';
			a.style.pointerEvents = '';
		}, 3000);
	});
    
};

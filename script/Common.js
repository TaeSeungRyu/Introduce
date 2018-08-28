var color = ['#59ACE2','#A9D86E','#8175C7','#A1A1A1','#FCB322','#FF6C60','#A2A1B2','#F3FA5D'];

function sleep(num) {
	var now = new Date();
	var stop = now.getTime() + num;
	while (true) {
		now = new Date();
		if (now.getTime() > stop)
			return;
	}
}
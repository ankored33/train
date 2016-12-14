// ============================================================================
// 
// main.js
// 
// ãƒ¡ã‚¤ãƒ³ãƒ«ãƒ¼ãƒãƒ³ã‚’è¨˜è¿°ã—ãŸãƒ•ã‚¡ã‚¤ãƒ«ã§ã™ã€‚
// javascriptãƒ•ã‚¡ã‚¤ãƒ«ã®ãªã‹ã§ä¸€ç•ªæœ€å¾Œã«èª­ã¿è¾¼ã¾ã‚Œã€onloadã‚¤ãƒ™ãƒ³ãƒˆã«ã‚ˆã£ã¦å‹•ä½œã‚’
// é–‹å§‹ã™ã‚‹ã‚ˆã†ã«å®Ÿè£…ã•ã‚Œã¦ã„ã¾ã™ã€‚
// ã¾ãŸã‚¤ãƒ™ãƒ³ãƒˆé–¢é€£ã®å‡¦ç†ã‚‚ã“ã®ãƒ•ã‚¡ã‚¤ãƒ«ã«å«ã¾ã‚Œã¦ã„ã¾ã™ã€‚
// 
// ============================================================================

// - global -------------------------------------------------------------------
var screenCanvas, info;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var ctx;
var fire = false;
var counter = 0;

// - const --------------------------------------------------------------------
var CHARA_COLOR = 'rgba(0, 0, 255, 0.75)';
var CHARA_SHOT_COLOR = 'rgba(0, 255, 0, 0.75)';
var CHARA_SHOT_MAX_COUNT = 10;
var ENEMY_COLOR = 'rgba(255, 0, 0, 0.75)';
var ENEMY_MAX_COUNT = 10;

// - main ---------------------------------------------------------------------
window.onload = function(){
	// æ±Žç”¨å¤‰æ•°
	var i, j;
	var p = new Point();
	
	// ã‚¹ã‚¯ãƒªãƒ¼ãƒ³ã®åˆæœŸåŒ–
	screenCanvas = document.getElementById('screen');
	screenCanvas.width = 256;
	screenCanvas.height = 256;
	
	// 2dã‚³ãƒ³ãƒ†ã‚­ã‚¹ãƒˆ
	ctx = screenCanvas.getContext('2d');
	
	// ã‚¤ãƒ™ãƒ³ãƒˆã®ç™»éŒ²
	screenCanvas.addEventListener('mousemove', mouseMove, true);
	screenCanvas.addEventListener('mousedown', mouseDown, true);
	window.addEventListener('keydown', keyDown, true);
	
	// ãã®ä»–ã®ã‚¨ãƒ¬ãƒ¡ãƒ³ãƒˆé–¢é€£
	info = document.getElementById('info');
	
	// è‡ªæ©ŸåˆæœŸåŒ–
	var chara = new Character();
	chara.init(10);
	
	// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆåˆæœŸåŒ–
	var charaShot = new Array(CHARA_SHOT_MAX_COUNT);
	for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
		charaShot[i] = new CharacterShot();
	}
	
	// ã‚¨ãƒãƒŸãƒ¼åˆæœŸåŒ–
	var enemy = new Array(ENEMY_MAX_COUNT);
	for(i = 0; i < ENEMY_MAX_COUNT; i++){
		enemy[i] = new Enemy();
	}
	
	// ãƒ¬ãƒ³ãƒ€ãƒªãƒ³ã‚°å‡¦ç†ã‚’å‘¼ã³å‡ºã™
	(function(){
		// ã‚«ã‚¦ãƒ³ã‚¿ã‚’ã‚¤ãƒ³ã‚¯ãƒªãƒ¡ãƒ³ãƒˆ
		counter++;
		
		// HTMLã‚’æ›´æ–°
		info.innerHTML = mouse.x + ' : ' + mouse.y;
		
		// screenã‚¯ãƒªã‚¢
		ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
		
		// è‡ªæ©Ÿ ---------------------------------------------------------------
		// ãƒ‘ã‚¹ã®è¨­å®šã‚’é–‹å§‹
		ctx.beginPath();
		
		// è‡ªæ©Ÿã®ä½ç½®ã‚’è¨­å®š
		chara.position.x = mouse.x;
		chara.position.y = mouse.y;
		
		// è‡ªæ©Ÿã‚’æããƒ‘ã‚¹ã‚’è¨­å®š
		ctx.arc(
			chara.position.x,
			chara.position.y,
			chara.size,
			0, Math.PI * 2, false
		);
		
		// è‡ªæ©Ÿã®è‰²ã‚’è¨­å®šã™ã‚‹
		ctx.fillStyle = CHARA_COLOR;
		
		// è‡ªæ©Ÿã‚’æã
		ctx.fill();
		
		// fireãƒ•ãƒ©ã‚°ã®å€¤ã«ã‚ˆã‚Šåˆ†å²
		if(fire){
			// ã™ã¹ã¦ã®è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã‚’èª¿æŸ»ã™ã‚‹
			for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
				// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆãŒæ—¢ã«ç™ºå°„ã•ã‚Œã¦ã„ã‚‹ã‹ãƒã‚§ãƒƒã‚¯
				if(!charaShot[i].alive){
					// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã‚’æ–°è¦ã«ã‚»ãƒƒãƒˆ
					charaShot[i].set(chara.position, 3, 5);
					
					// ãƒ«ãƒ¼ãƒ—ã‚’æŠœã‘ã‚‹
					break;
				}
			}
			// ãƒ•ãƒ©ã‚°ã‚’é™ã‚ã—ã¦ãŠã
			fire = false;
		}
		
		// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆ -------------------------------------------------------
		// ãƒ‘ã‚¹ã®è¨­å®šã‚’é–‹å§‹
		ctx.beginPath();
		
		// ã™ã¹ã¦ã®è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã‚’èª¿æŸ»ã™ã‚‹
		for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
			// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆãŒæ—¢ã«ç™ºå°„ã•ã‚Œã¦ã„ã‚‹ã‹ãƒã‚§ãƒƒã‚¯
			if(charaShot[i].alive){
				// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã‚’å‹•ã‹ã™
				charaShot[i].move();
				
				// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã‚’æããƒ‘ã‚¹ã‚’è¨­å®š
				ctx.arc(
					charaShot[i].position.x,
					charaShot[i].position.y,
					charaShot[i].size,
					0, Math.PI * 2, false
				);
				
				// ãƒ‘ã‚¹ã‚’ã„ã£ãŸã‚“é–‰ã˜ã‚‹
				ctx.closePath();
			}
		}
		
		// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã®è‰²ã‚’è¨­å®šã™ã‚‹
		ctx.fillStyle = CHARA_SHOT_COLOR;
		
		// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã‚’æã
		ctx.fill();
		
		// ã‚¨ãƒãƒŸãƒ¼ã®å‡ºç¾ç®¡ç† -------------------------------------------------
		// 100 ãƒ•ãƒ¬ãƒ¼ãƒ ã«ä¸€åº¦å‡ºç¾ã•ã›ã‚‹
		if(counter % 100 === 0){
			// ã™ã¹ã¦ã®ã‚¨ãƒãƒŸãƒ¼ã‚’èª¿æŸ»ã™ã‚‹
			for(i = 0; i < ENEMY_MAX_COUNT; i++){
				// ã‚¨ãƒãƒŸãƒ¼ã®ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’ãƒã‚§ãƒƒã‚¯
				if(!enemy[i].alive){
					// ã‚¿ã‚¤ãƒ—ã‚’æ±ºå®šã™ã‚‹ãƒ‘ãƒ©ãƒ¡ãƒ¼ã‚¿ã‚’ç®—å‡º
					j = (counter % 200) / 100;
					
					// ã‚¿ã‚¤ãƒ—ã«å¿œã˜ã¦åˆæœŸä½ç½®ã‚’æ±ºã‚ã‚‹
					var enemySize = 15;
					p.x = -enemySize + (screenCanvas.width + enemySize * 2) * j
					p.y = screenCanvas.height / 2;
					
					// ã‚¨ãƒãƒŸãƒ¼ã‚’æ–°è¦ã«ã‚»ãƒƒãƒˆ
					enemy[i].set(p, enemySize, j);
					
					// 1ä½“å‡ºç¾ã•ã›ãŸã®ã§ãƒ«ãƒ¼ãƒ—ã‚’æŠœã‘ã‚‹
					break;
				}
			}
		}
		
		// ã‚¨ãƒãƒŸãƒ¼ -----------------------------------------------------------
		// ãƒ‘ã‚¹ã®è¨­å®šã‚’é–‹å§‹
		ctx.beginPath();
		
		// ã™ã¹ã¦ã®ã‚¨ãƒãƒŸãƒ¼ã‚’èª¿æŸ»ã™ã‚‹
		for(i = 0; i < ENEMY_MAX_COUNT; i++){
			// ã‚¨ãƒãƒŸãƒ¼ã®ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’ãƒã‚§ãƒƒã‚¯
			if(enemy[i].alive){
				// ã‚¨ãƒãƒŸãƒ¼ã‚’å‹•ã‹ã™
				enemy[i].move();
				
				// ã‚¨ãƒãƒŸãƒ¼ã‚’æããƒ‘ã‚¹ã‚’è¨­å®š
				ctx.arc(
					enemy[i].position.x,
					enemy[i].position.y,
					enemy[i].size,
					0, Math.PI * 2, false
				);
				
				// ãƒ‘ã‚¹ã‚’ã„ã£ãŸã‚“é–‰ã˜ã‚‹
				ctx.closePath();
			}
		}
		
		// ã‚¨ãƒãƒŸãƒ¼ã®è‰²ã‚’è¨­å®šã™ã‚‹
		ctx.fillStyle = ENEMY_COLOR;
		
		// ã‚¨ãƒãƒŸãƒ¼ã‚’æã
		ctx.fill();
		
		// ãƒ•ãƒ©ã‚°ã«ã‚ˆã‚Šå†å¸°å‘¼ã³å‡ºã—
		if(run){setTimeout(arguments.callee, fps);}
	})();
};


// - event --------------------------------------------------------------------
function mouseMove(event){
	// ãƒžã‚¦ã‚¹ã‚«ãƒ¼ã‚½ãƒ«åº§æ¨™ã®æ›´æ–°
	mouse.x = event.clientX - screenCanvas.offsetLeft;
	mouse.y = event.clientY - screenCanvas.offsetTop;
}

function mouseDown(event){
	// ãƒ•ãƒ©ã‚°ã‚’ç«‹ã¦ã‚‹
	fire = true;
}

function keyDown(event){
	// ã‚­ãƒ¼ã‚³ãƒ¼ãƒ‰ã‚’å–å¾—
	var ck = event.keyCode;
	
	// Escã‚­ãƒ¼ãŒæŠ¼ã•ã‚Œã¦ã„ãŸã‚‰ãƒ•ãƒ©ã‚°ã‚’é™ã‚ã™
	if(ck === 27){run = false;}
}



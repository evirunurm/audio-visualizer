let song, fft, spectrum, amplitude, fileSelector, file, audioURL;
let BIG_RADIUS_SIZE_FACTOR, LINES_AMOUNT_FACTOR, RADIUS, VOLUME;
let playOrPauseText = document.getElementById("play_or_pause_text");
// function preload() {
// 	// anything that has to be loaded
// }

function setup() {
	let canvas = createCanvas(window.innerWidth, window.innerHeight);
	canvas.parent('canvas');
	angleMode(DEGREES);

	startFileLoading()

	fft = new p5.FFT();
	fft.setInput(song);

	document.querySelectorAll(".play-or-pause--toggle").forEach((item, i) => {
		item.addEventListener("click", function() {
			playSong();
		});
	});
	document.querySelector(".stop--toggle").addEventListener("click", function() {
		stopSong();
	});
}

function draw() {
	resizeCanvas(windowWidth, windowHeight);
	background(220);

	updateVariablesController();
	spectrum = fft.analyze();

	drawLineVisualizar(spectrum);
}

function startFileLoading() {
	document.getElementById('file_selector').addEventListener('change', function(event) {
		file = event.target.files[0];
		audioURL = URL.createObjectURL(file);

		// WHILE LOADING

		// pageLoading(true);
		// WHILE LOADING STOP
		song = loadSound(audioURL, function() {

			// ON SONG LOAD
			// pageLoading(false);
			hideFileLoader();

			// ON SONG LOAD STOP
			amplitude = new p5.Amplitude();
			amplitude.setInput(song);
			playOrPauseText.textContent = "Song loaded successfully!";

		}, function() {
			playOrPauseText.textContent = "Error while loading. Try again or choose a diferent song.";
		});
	});
}

function ckeckPageLoading(boolean) {
	if (boolean) {

	}
}

function hideFileLoader() {
	document.getElementById("choose_a_song_input_container").style.display = "none";
	let chooseAnotherSong = document.getElementById("choose_another_song_button");
	chooseAnotherSong.style.display = "flex"
	chooseAnotherSong.addEventListener("click", function() {
		showFileLoader();
	})
}

function showFileLoader() {
	document.getElementById("choose_a_song_input_container").style.display = "flex";
	let chooseAnotherSong = document.getElementById("choose_another_song_button");
	chooseAnotherSong.style.display = "none";

	// UNLOAD THE SONG
}

function drawLineVisualizar(spectrum) {
	beginShape();
	translate(width / 2, height / 2);
	for (let i = 0; i < 360; i++) {
		if (i % LINES_AMOUNT_FACTOR == 0) {

			let bigRadius = (spectrum[i + 200] / BIG_RADIUS_SIZE_FACTOR) + RADIUS;
			// spectrum-- > array, changes each second.
			let x = RADIUS * cos(i);
			let y = RADIUS * sin(i);
			let big_x = bigRadius * cos(i);
			let big_y = bigRadius * sin(i);

			line(x, y, big_x, big_y);
			strokeWeight(1);
			stroke(0);

			if (spectrum[i + 200] == 255) {
				console.log("tuuuur")
				stroke(50, 200, 0);
			}
		}
	}
	endShape();
}

function updateVariablesController() {
	BIG_RADIUS_SIZE_FACTOR = parseFloat(document.getElementById("BIG_RADIUS_SIZE_FACTOR").value);
	LINES_AMOUNT_FACTOR = parseInt(document.getElementById("LINES_AMOUNT_FACTOR").value);
	RADIUS = parseFloat(document.getElementById("RADIUS").value);
	VOLUME = parseFloat(document.getElementById("VOLUME").value);
	if (song) {
		song.setVolume(VOLUME)
	}
}

function playSong() {
	audioURL ? playOrPauseSong() : playOrPauseText.textContent = "Choose a song.";
}

function stopSong() {
	audioURL ? song.stop() : playOrPauseText.textContent = "Choose a song.";
	document.getElementById("play_button").style.display = "block";
	document.getElementById("pause_button").style.display = "none";
	document.getElementById("stop_button").style.display = "none";
}

function playOrPauseSong() {

	document.getElementById("stop_button").style.display = "block";
	if (song.isPlaying()) {
		song.pause();
		document.getElementById("play_button").style.display = "block";
		document.getElementById("pause_button").style.display = "none";
	} else {
		song.play();
		document.getElementById("play_button").style.display = "none";
		document.getElementById("pause_button").style.display = "block";
	}
}
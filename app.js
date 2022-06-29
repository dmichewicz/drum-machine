class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentKick = "./sounds/hihat-acoustic01.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 120;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    this.pads.forEach((pad) => pad.classList.remove("active-bar"));
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((activeBar) => {
      activeBar.classList.add("active-bar");
      if (activeBar.classList.contains("active")) {
        if (activeBar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (activeBar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (activeBar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });

    this.index++;
  }
  start() {
    this.bpm = document.querySelector("#tempo").value;
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.playBtn.textContent = "Stop";
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      this.playBtn.textContent = "Play";
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }

  mute(e) {
    if (
      e.target.classList.contains("kick-volume") &&
      this.kickAudio.volume == 0
    ) {
      this.kickAudio.volume = 1;
      e.target.style.opacity = "1";
    } else if (e.target.classList.contains("kick-volume")) {
      this.kickAudio.volume = 0;
      e.target.style.opacity = "0.5";
    }

    if (
      e.target.classList.contains("snare-volume") &&
      this.snareAudio.volume == 0
    ) {
      this.snareAudio.volume = 1;
      e.target.style.opacity = "1";
    } else if (e.target.classList.contains("snare-volume")) {
      this.snareAudio.volume = 0;
      e.target.style.opacity = "0.5";
    }

    if (
      e.target.classList.contains("hihat-volume") &&
      this.hihatAudio.volume == 0
    ) {
      this.hihatAudio.volume = 1;
      e.target.style.opacity = "1";
    } else if (e.target.classList.contains("hihat-volume")) {
      this.hihatAudio.volume = 0;
      e.target.style.opacity = "0.5";
    }
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => pad.addEventListener("click", drumKit.activePad));

drumKit.playBtn.addEventListener("click", () => drumKit.start());

drumKit.selects.forEach((select) => {
  select.addEventListener("change", (e) => drumKit.changeSound(e));
});

drumKit.muteBtns.forEach((muteBtn) => {
  muteBtn.addEventListener("click", (e) => drumKit.mute(e));
});

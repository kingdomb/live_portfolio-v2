// typewriter.js

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.isDeleting = false;
  this.pEl = document.getElementById('masthead-p');
  this.pTexts = ["And I'm a Full-Stack developer.", '...to my portfolio!'];
  this.tick();
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    this.fadeInPText(i);
  } else if (this.isDeleting && this.txt === '') {
    this.fadeOutPText(i);
    setTimeout(function () {
      that.isDeleting = false;
      that.loopNum++;
      that.tick();
    }, 1500); // Wait for fade-out effect to complete
    return; // Exit to wait for fade-out and pause
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

TxtType.prototype.fadeInPText = function (i) {
  var that = this;
  setTimeout(function () {
    that.pEl.innerHTML = that.pTexts[i];
    that.pEl.classList.remove('fade-out');
    that.pEl.classList.add('fade-in');
  }, 500); // Wait for 500ms before fading in the text
};

TxtType.prototype.fadeOutPText = function (i) {
  var that = this;
  setTimeout(function () {
    that.pEl.classList.remove('fade-in');
    that.pEl.classList.add('fade-out');
  }, 0); // Start fading out immediately
};

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = `
        .typewrite > .wrap { border-right: 0.02em solid #fff; }
        .fade-in { opacity: 1; transition: opacity 1s; }
        .fade-out { opacity: 0; transition: opacity 1s; }
    `;
  document.head.appendChild(css);
};

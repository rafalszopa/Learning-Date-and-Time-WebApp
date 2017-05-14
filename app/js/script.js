$(document).ready(function(){

    function displayTime() {
        var time = new Date();
        var element = document.getElementById("current-time");
        element.innerHTML = time.toLocaleTimeString();

        var time = new Date();
        var h = time.getHours() % 12;
        var m = time.getMinutes() % 60;
        var s = time.getSeconds() % 60;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawArm(h / 12, 6, 0.50, '#000000'); // Hour
        drawArm(m / 60,  4, 0.75, '#000000'); // Minute
        drawArm(s / 60,  2, 1.00, '#FF0000'); // Second

        prepareClock();
    }

    var canvas = document.getElementById("clock-canvas");
    var ctx = canvas.getContext("2d")

    Math.TAU = 2 * Math.PI;

    var clockRadius = 200;

    var x = canvas.width / 2;
    var y = canvas.height / 2;

    function drawArm(progress, armThickness, armLength, armColor) {
        var armRadians = (Math.TAU * progress) - (Math.TAU / 4);
        var armLength = armLength * clockRadius;

        var targetX = x + Math.cos(armRadians) * armLength;
        var targetY = y + Math.sin(armRadians) * armLength;

        ctx.lineWidth = armThickness;
        ctx.strokeStyle = armColor;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(targetX, targetY);
        ctx.stroke();
    }

    function drawNumbers() {
        var ang, num;
        ctx.font = clockRadius * 0.1 + "px arial";
        ctx.textBaseline="middle";
        ctx.textAlign="center";

        for(num = 1; num < 13; num++) {
            ang = num * Math.TAU / 12;
            ctx.moveTo(x, y);
            ctx.rotate(ang);
            ctx.translate(0, -clockRadius * 0.75);
            ctx.rotate(-ang);
            ctx.fillText(num.toString(), x, y);
            ctx.rotate(ang);
            ctx.translate(0, clockRadius * 0.75);
            ctx.rotate(-ang);
        }
    }

    function drawHours() {
        for(num = 0; num < 12; num++) {
            angle = (num - 3) * Math.TAU / 12;
            ctx.beginPath();

            var x1 = (x) + Math.cos(angle) * (clockRadius - 10);
            var y1 = (y) + Math.sin(angle) * (clockRadius - 10);
            var x2 = (x) + Math.cos(angle) * ((clockRadius - 10) * 0.9);
            var y2 = (y) + Math.sin(angle) * ((clockRadius - 10) * 0.9);

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);

            ctx.strokeStyle = '#466B76';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    function startTimer() {
        setInterval(displayTime, 1000);
        displayTime();
    }

    function prepareClock() {
        // Draw a clock's border
        ctx.beginPath();
        ctx.arc(x, y, clockRadius, 0, Math.TAU, false);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "grey";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, clockRadius - 3, 0, Math.TAU, false);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "grey";
        ctx.stroke();

        // circle in the center
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.TAU, false);
        ctx.fillStyle = "grey";
        ctx.fill();

        // Drawing numbers
        drawNumbers();
        drawHours();
    }

    startTimer();
});
// ==UserScript==
// @name         Countdown Timer
// @version      1.0.0
// @author       K1ngw1ng
// @description  Countdown Timer
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let timerInterval = null;
    let remainingTime = 60 * 60; // 60 minutes
    let isRunning = false; 

    // Start the countdown timer
    function startTimer(display) {
        if (isRunning) return; // Prevent multiple intervals
        isRunning = true;
        timerInterval = setInterval(function () {
            let minutes = parseInt(remainingTime / 60, 10);
            let seconds = parseInt(remainingTime % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--remainingTime < 0) {
                remainingTime = 0;
                stopTimer();
            }
        }, 1000);
    }
    // Stop the countdown timer
    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        isRunning = false;
    }

    // Save the div's current position to localStorage
    function savePosition(left, top) {
        localStorage.setItem('timerDivLeft', left);
        localStorage.setItem('timerDivTop', top);
    }

    // Load the div's last position from localStorage
    function loadPosition() {
        const left = localStorage.getItem('timerDivLeft');
        const top = localStorage.getItem('timerDivTop');
        return { left, top };
    }

    // Create the timer div and append it to the body
    const timerDiv = document.createElement('div');
    timerDiv.innerHTML = `
        <div id="timerContainer">
            <p>Time: <span id="time">60:00</span></p>
            <button id="startButton">Start</button>
            <button id="stopButton">Stop</button>
        </div>
    `;
    timerDiv.style.position = 'fixed';
    timerDiv.style.background = 'rgba(0, 0, 0, 0.2';
    timerDiv.style.color = 'white';
    timerDiv.style.padding = '10px';
    timerDiv.style.borderRadius = '5px';
    timerDiv.style.cursor = 'move';
    timerDiv.style.zIndex = '10000';
    document.body.appendChild(timerDiv);

    // Restore position from localStorage or default to top-left corner
    const savedPosition = loadPosition();
    timerDiv.style.left = savedPosition.left ? savedPosition.left + 'px' : '10px';
    timerDiv.style.top = savedPosition.top ? savedPosition.top + 'px' : '10px';

    // Make the div draggable
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    timerDiv.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - timerDiv.getBoundingClientRect().left;
        offsetY = e.clientY - timerDiv.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const newLeft = e.clientX - offsetX;
            const newTop = e.clientY - offsetY;
            timerDiv.style.left = newLeft + 'px';
            timerDiv.style.top = newTop + 'px';

            // Save the new position to localStorage
            savePosition(newLeft, newTop);
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // Initialize the timer display
    const display = document.querySelector('#time');

    // Event listeners for Start and Stop buttons
    document.querySelector('#startButton').addEventListener('click', function() {
        startTimer(display);
    });

    document.querySelector('#stopButton').addEventListener('click', function() {
        stopTimer();
    });

})();

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const startOverlay = document.getElementById("startOverlay");
  const bgSound = document.querySelector("#bgSound");
  const scene = document.querySelector("a-scene");

  // Debug: Log when audio is loaded
  document
    .querySelector("#horror-sound")
    .addEventListener("loaded", function () {
      console.log("Audio file loaded");
    });

  // Wait for scene to load
  scene.addEventListener("loaded", function () {
    console.log("Scene loaded");

    // Add click event listener to start button
    startButton.addEventListener("click", function () {
      console.log("Start button clicked");
      startOverlay.style.display = "none";

      // Try to play sound
      if (bgSound.components.sound) {
        try {
          const soundComponent = bgSound.components.sound;

          // Create a user interaction promise
          const playPromise = soundComponent.playSound();

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log("Audio started playing successfully");
              })
              .catch((error) => {
                console.error("Audio play failed:", error);
                // Try alternative play method
                try {
                  bgSound.components.sound.pool.children[0].play();
                  console.log("Tried alternative play method");
                } catch (e) {
                  console.error("Alternative play method failed:", e);
                }
              });
          }
        } catch (error) {
          console.error("Error playing sound:", error);
        }
      } else {
        console.error("Sound component not found");
      }
    });
  });

  // Additional debug listeners
  bgSound.addEventListener("sound-loaded", function () {
    console.log("A-Frame sound loaded");
  });

  bgSound.addEventListener("sound-ended", function () {
    console.log("Sound ended");
  });
});
function startFlicker(lightId) {
  const light = document.querySelector(lightId);

  function flicker() {
    const intensity = Math.random() * 0.5 + 0.5; // بین 0.5 تا 1
    light.setAttribute("light", "intensity", intensity);
    setTimeout(flicker, Math.random() * 150 + 50); // فاصله بین 50 تا 200 میلی‌ثانیه
  }

  flicker();
}

startFlicker("#flicker1");
startFlicker("#flicker2");

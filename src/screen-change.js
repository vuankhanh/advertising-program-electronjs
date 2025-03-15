module.exports = (screen, mainWindow) => {
  // Listen for display added
  screen.on('display-added', (event, newDisplay) => {
    console.log('Display added:', newDisplay);
    // Handle the new display addition logic here
    mainWindow.setPosition(newDisplay.bounds.x, newDisplay.bounds.y);
    // Ensure the window is fullscreen
    mainWindow.setFullScreen(true);
  });

  // Listen for display removed
  screen.on('display-removed', (event, oldDisplay) => {
    console.log('Display removed:', oldDisplay);
    // Handle the display removal logic here
  });
}
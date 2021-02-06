function animate(draw, duration, timing = (timeFraction) => timeFraction) {
  return new Promise((resolve, reject) => {
    const start = performance.now();

    requestAnimationFrame(function drawNextFrame(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      const progress = timing(timeFraction);
      draw(progress);

      if (timeFraction < 1) {
        return requestAnimationFrame(drawNextFrame);
      }
      resolve();
    });
  });
}

export default animate;

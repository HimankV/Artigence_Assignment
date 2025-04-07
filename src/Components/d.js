export function imageZoom(imgID, resultID, lensID) {
  var img = document.getElementById(imgID);
  var result = document.getElementById(resultID);
  var lens = document.getElementById(lensID); // Use the existing lens

  if (!img || !result || !lens) return;

  let cx = result.offsetWidth / lens.offsetWidth;
  let cy = result.offsetHeight / lens.offsetHeight;

  result.style.backgroundImage = `url('${img.src}')`;
  result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;

  const moveLens = (e) => {
    e.preventDefault();
    const pos = getCursorPos(e);
    let x = pos.x - lens.offsetWidth / 2;
    let y = pos.y - lens.offsetHeight / 2;

    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
    if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;

    lens.style.left = `${x}px`;
    lens.style.top = `${y}px`;

    result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
  };

  const getCursorPos = (e) => {
    let a = img.getBoundingClientRect();
    let x = e.pageX - a.left - window.pageXOffset;
    let y = e.pageY - a.top - window.pageYOffset;
    return { x, y };
  };

  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
}

import "./style.css";
import kursor from "kursor";
import "kursor/dist/kursor.css";

const imgGrid = document.querySelector(".image-grid");
const availableImages = 64,
  fileExt = ".jpg",
  filePrefix = "random_img";
const store =
  "https://firebasestorage.googleapis.com/v0/b/infinitegallery-f9fac.appspot.com/o/";
let loading = false;

function calculateDist(e) {
  let { bottom } = imgGrid.getBoundingClientRect();

  let { clientHeight } = document.documentElement;

  if ((Math.floor(bottom) === clientHeight) & !loading) {
    fetchImages();
  }
}

function put(newImages) {
  newImages.map((el) => {
    let div = document.createElement("div");
    div.classList.add("image-item");
    let img = document.createElement("img");
    img.setAttribute(
      "src",
      store + encodeURI(`${filePrefix} (${el})${fileExt}`) + "?alt=media"
    );
    img.setAttribute("loading", "lazy");
    img.setAttribute("alt", el.url);
    div.appendChild(img);

    imgGrid.appendChild(div);
  });
  loading = false;
  //
  window.addEventListener("scroll", calculateDist);
}

const fetchImages = (count = 10) => {
  if (loading) return;
  //
  window.removeEventListener("scroll", calculateDist);
  //
  loading = true;

  let nums = [];
  for (let index = 1; index <= count; index++) {
    nums.push(Math.floor(Math.random() * availableImages + 1));
  }
  put(nums);
};

(() => {
  fetchImages();

  new kursor({
    // type: 5,
    removeDefaultCursor: true,
  });
})();

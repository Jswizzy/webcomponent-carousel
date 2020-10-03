import "./styles.scss";

class PhotoCarousel extends HTMLElement {
  #photoIndex = 0;
  #photos = [];

  connectedCallback() {
    this.#photos = this.getAttribute("photos").split(",");

    this.innerHTML = `<h2>${this.getAttribute("title")}</h2>
    <h4>by ${this.getAttribute("author")}</h4>
    <div class="image-container"></div>
    <button class="back">&lt</button>
    <button class="forward">&gt</button>
    <style>
    wcia-photo-carousel {
      width: 500px;
      height: 300px;
      display: flex;
      padding-top: 10px;
      flex-direction: column;
      position: relative;
      background-color: black;
      border-color: black;
      border-width: 1px;
      border-style: solid;
    }
    wcia-photo-carousel h2, h4 {
      color: white;
      margin-bottom: 0;
      margin-top: 0;
      margin-left: 10px;
    }
    wcia-photo-carousel .image-container {
      margin-top: 15px;
      flex: 1;
      background-color: black;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50%;
    }
    wcia-photo-carousel button {
      cursor: pointer;
      background: transparent;
      border: none;
      font-size: 32px;
      color: white;
      position: absolute;
      top: 50%;
    }
    wcia-photo-carousel button.back {
      left: 10px;
    }
    wcia-photo-carousel button.forward {
      right: 10px;
    }
    </style>`;

    this.showPhoto();

    this.querySelector("button.back").addEventListener("click", (event) =>
      this.onBackButtonClicked(event)
    );
    this.querySelector("button.forward").addEventListener("click", (event) =>
      this.onForwardButtonClicked(event)
    );
  }

  onBackButtonClicked() {
    this.#photoIndex--;
    if (this.#photoIndex < 0) {
      this.#photoIndex = this.#photos.length - 1;
    }
    this.showPhoto();
  }

  onForwardButtonClicked() {
    this.#photoIndex++;
    if (this.#photoIndex >= this.#photos.length) {
      this.#photoIndex = 0;
    }
    this.showPhoto();
  }

  showPhoto() {
    this.querySelector(".image-container").style.backgroundImage = `url(${
      this.#photos[this.#photoIndex]
    })`;
  }
}

if (!customElements.get("wcia-photo-carousel")) {
  customElements.define("wcia-photo-carousel", PhotoCarousel);
}

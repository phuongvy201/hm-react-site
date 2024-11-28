const images = [
  'https://storage.googleapis.com/a1aa/image/P1bkOsmXzg6TOlLi1uH8xUbChTCz55clfqxIf8QgoxiOdRtTA.jpg',
  'https://placehold.co/500x500?text=Image+2',
  'https://placehold.co/500x500?text=Image+3'
];
let currentIndex = 0;

function showImage(index) {
  const imgElement = document.getElementById('productImage');
  imgElement.src = images[index];
}

function prevImage() {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
  showImage(currentIndex);
}

function nextImage() {
  currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
  showImage(currentIndex);
}

function selectColor(element) {
  // Bỏ chọn tất cả các màu
  const colorCircles = document.querySelectorAll(".color-circle");
  colorCircles.forEach((circle) => {
    circle.classList.remove("selected"); // Bỏ class selected
    circle.querySelector("i").style.display = "none"; // Ẩn biểu tượng check
  });

  // Chọn màu mới
  element.classList.add("selected"); // Thêm class selected
  element.querySelector("i").style.display = "block"; // Hiển thị biểu tượng check
}
function increaseQuantity() {
  var quantityInput = document.getElementById("quantity");
  var currentValue = parseInt(quantityInput.value);
  quantityInput.value = currentValue + 1;
}

function decreaseQuantity() {
  var quantityInput = document.getElementById("quantity");
  var currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
  }
}
// JavaScript cho nút See More và See Less
function toggleText() {
  const description = document.getElementById("description");
  const btnText = document.getElementById("see-more-btn");

  if (description.classList.contains("clamp")) {
    description.classList.remove("clamp");
    btnText.innerHTML = "See less";
  } else {
    description.classList.add("clamp");
    btnText.innerHTML = "See more";
  }
}
let currentIndex1 = 0;
const products = [
  [
    {
      img: "https://storage.googleapis.com/a1aa/image/64XbPxBveY0tIK55DHiY66pqCeuRbUBKwXfkabBBke8MBWvOB.jpg",
      title: "Double Sided T-Shirts",
      price: "$18.95",
      oldPrice: "$37.90",
    },
    {
      img: "https://storage.googleapis.com/a1aa/image/JMas6WyALar6LxwuNq4zbQfgUYEfqI1Rkz9frAf6NYftCse6E.jpg",
      title: "Double Sided Hoodies",
      price: "$30.95",
      oldPrice: "$61.90",
    },
    {
      img: "https://storage.googleapis.com/a1aa/image/qVl9tG0IEJLqOZ4li6mOmbfIRrOd4cG2dcmGA0EdePmSg1rTA.jpg",
      title: "Double Sided Long Sleeves",
      price: "$23.95",
      oldPrice: "$47.90",
    },
    {
      img: "https://storage.googleapis.com/a1aa/image/ox58O054hTpPEt3fnKMgoxej6xTLsgAjuwLzORDrvFMRg1rTA.jpg",
      title: "Poster Set",
      price: "$13.95",
      oldPrice: "$31.00",
    },
  ],
  [
    {
      img: "https://placehold.co/200x200",
      title: "Product 5",
      price: "$19.95",
      oldPrice: "$39.90",
    },
    {
      img: "https://placehold.co/200x200",
      title: "Product 6",
      price: "$29.95",
      oldPrice: "$59.90",
    },
    {
      img: "https://placehold.co/200x200",
      title: "Product 7",
      price: "$24.95",
      oldPrice: "$49.90",
    },
    {
      img: "https://placehold.co/200x200",
      title: "Product 8",
      price: "$14.95",
      oldPrice: "$29.90",
    },
  ],
];

function renderProducts() {
  const productContainer = document.querySelector(".products");
  productContainer.innerHTML = `
                <div class="nav-button left" onclick="prevProducts()">
                    <i class="fas fa-chevron-left"></i>
                </div>
            `;

  products[currentIndex1].forEach((product) => {
    productContainer.innerHTML += `
                    <div class="product ${
                      product.title === "Double Sided T-Shirts"
                        ? "highlight"
                        : ""
                    }">
                        <img src="${product.img}" alt="${product.title}" />
                        <h2>${product.title}</h2>
                        <div class="price">${
                          product.price
                        }<span class="old-price">${
      product.oldPrice
    }</span></div>
                    </div>
                `;
  });

  productContainer.innerHTML += `
                <div class="nav-button right" onclick="nextProducts()">
                    <i class="fas fa-chevron-right"></i>
                </div>
            `;
}

function prevProducts() {
  currentIndex1 = (currentIndex1 - 1 + products.length) % products.length;
  renderProducts();
}

function nextProducts() {
  currentIndex1 = (currentIndex1 + 1) % products.length;
  renderProducts();
}

document.addEventListener("DOMContentLoaded", renderProducts);
//   ADD PHOTO REVIEW'
document
  .getElementById("file-input")
  .addEventListener("change", function (event) {
    const files = event.target.files;
    const uploadedImagesContainer = document.getElementById("uploaded-images");
    uploadedImagesContainer.innerHTML = ""; // Clear previous images

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = "Uploaded photo";
        img.className = "img-fluid border border-primary mt-2 ms-2";
        img.style.width = "100px";
        img.style.height = "100px";
        uploadedImagesContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });
//Thêm avt account
function previewAvatar(event) {
  const reader = new FileReader();
  reader.onload = function () {
    const output = document.getElementById("avatar-preview");
    output.src = reader.result;
    output.style.display = "block";
  };
  reader.readAsDataURL(event.target.files[0]);
}

function openSearchPage() {
  document.getElementById("search-overlay").classList.remove("hidden");
}

function closeSearchPage() {
  document.getElementById("search-overlay").classList.add("hidden");
}

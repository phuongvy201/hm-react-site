// script.js
function changeImage(imageSrc) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = imageSrc; // Thay đổi nguồn hình ảnh chính
}
const images = [
    "https://genk.mediacdn.vn/139269124445442048/2022/7/28/2022-07-27193634-16589942643841680123971.jpg",
    "https://cdn.printerval.com/image/540x540/t-shirts-men-heavyweight-t-shirt-1,black,print-2024-10-26_69ec19c0-b2a6-486b-8735-149b364ebec4,191919.jpeg",
    "https://cdn.printerval.com/image/540x540/baseball-jerseys-men-white-1,red,print-2024-10-26_69ec19c0-b2a6-486b-8735-149b364ebec4,d2151f.jpeg",
    "https://cdn.printerval.com/unsafe/540x540/assets.printerval.com/2024/08/11/mockup-100445feb123378671796bb55cd99c62.jpg",
    "https://genk.mediacdn.vn/139269124445442048/2022/7/28/dsc02086-1658995009192977460616.jpg"
];

// Chỉ số hiện tại của ảnh chính
let currentImageIndex = 0;

// Hàm đổi ảnh chính
function changeImage(imageSrc) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = imageSrc;
}

// Hàm chuyển đến ảnh kế tiếp
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    changeImage(images[currentImageIndex]);
}

// Hàm chuyển đến ảnh trước đó
function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    changeImage(images[currentImageIndex]);
}
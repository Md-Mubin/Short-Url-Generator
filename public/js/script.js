// ================ For Copy The Url by Button
function copyUrl() {
    const copyButton = document.querySelector(".copyButton")
    const shortUrl = document.querySelector(".inputShortUrl").href;
    navigator.clipboard.writeText(shortUrl)
        .then(() => {
            copyButton.innerHTML = "Copied"
            setTimeout(() => {
                copyButton.innerHTML = "Copy"
            }, 500);
        })
        .catch(() => {
            alert("Something Went Wrong!")
        })
}

// ================ For Navigate To Home Page
function goBackHomeButton() {
    window.location.pathname = "/"
}

// Function to show Toastify notifications
function showToast(message, type = "info") {
    let background;
    switch (type) {
        case "error":
            background = "linear-gradient(to bottom, #000,rgba(248, 48, 65, 0.8))";
            break;
        case "success":
            background = "linear-gradient(to bottom, #000,rgba(42, 192, 74, 0.8))";
            break;
        default:
            background = "linear-gradient(to right, #4b6cb7, #182848)";
    }

    Toastify({
        text: message,
        duration: 1000,
        close: true,
        gravity: "top",
        position: "right",
        style: { background: background },
        offset: { x: 100, y: 100 },
    }).showToast();
}

// Initialize toasts on page load
document.addEventListener("DOMContentLoaded", function () {
    if (window.errorMessage) {
        showToast(window.errorMessage, "error");
    }
    if (window.successMessage) {
        showToast(window.successMessage, "success");
    }
});

// show not show password


function showBtn(){
    const showPass = document.querySelector(".showBtn")
    const notShowPass = document.querySelector(".notShowBtn")
    const passInput = document.querySelector(".passInput")
    notShowPass.style = "display:block; background-color: transparent; border: none; font-size: 20px; cursor: pointer;";
    showPass.style = "display:none",
    passInput.type = "text"
}

function notShowBtn(){
    const showPass = document.querySelector(".showBtn")
    const notShowPass = document.querySelector(".notShowBtn")
    const passInput = document.querySelector(".passInput")
    showPass.style = "display:block; background-color: transparent; border: none; font-size: 20px; cursor: pointer;";
    notShowPass.style = "display:none",
    passInput.type = "password"
}
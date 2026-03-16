//payment.js//

/* KING PATCHER SECURE PAYMENT ENGINE */
(function(){
  const CONFIG = {
    IS_MAINTENANCE: false,
    UPI_ID: "nikhil179@rapl",
    MERCHANT_NAME: "King Patcher",
    ADMIN_UTRS: ["89448816688944956", "98749865894658945", "974651894569884"],
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (CONFIG.IS_MAINTENANCE) document.getElementById("maintOverlay").classList.add("active");

    const params = new URLSearchParams(window.location.search);
    const data = {
      name: params.get("prod") || "Premium Plan",
      validity: params.get("v") || "Lifetime",
      game: params.get("g") || "Standard",
      mode: params.get("m") || "Standard Mode",
      price: params.get("p") || "1",
    };

    // Update UI
    document.getElementById("displayHeaderName").textContent = data.name;
    document.getElementById("infoName").textContent = data.name;
    document.getElementById("infoValidity").textContent = data.validity;
    document.getElementById("infoGame").textContent = data.game;
    document.getElementById("infoMode").textContent = data.mode;
    document.getElementById("sumName").textContent = data.name;
    document.getElementById("sumMode").textContent = data.mode;
    document.getElementById("sumPrice").textContent = `₹${data.price}`;
    document.getElementById("qrAmount").textContent = `₹${data.price}`;
    document.getElementById("upiIdText").textContent = CONFIG.UPI_ID;

    // Generate QR
    const upiLink = `upi://pay?pa=${CONFIG.UPI_ID}&pn=${encodeURIComponent(CONFIG.MERCHANT_NAME)}&am=${data.price}&cu=INR`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiLink)}`;
    document.getElementById("qrImg").src = qrUrl;
  });

  window.copyUPI = function() {
    const text = CONFIG.UPI_ID;
    navigator.clipboard.writeText(text).then(() => {
        showToast("UPI ID Copied!");
    });
  };

  window.copyKey = function() {
    const text = document.getElementById("accessKeyDisplay").textContent;
    navigator.clipboard.writeText(text).then(() => {
        showToast("Access Key Copied!");
    });
  };

  function showToast(msg) {
    const toast = document.createElement("div");
    toast.style.cssText = "position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#f3ba2f;color:#000;padding:12px 24px;border-radius:12px;font-size:14px;font-weight:800;z-index:99999;box-shadow:0 10px 30px rgba(0,0,0,0.5);animation:fadeIn 0.3s ease;";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "0.5s";
      setTimeout(() => toast.remove(), 500);
    }, 2000);
  }

  window.submitUTR = function() {
    const utr = document.getElementById("utrInput").value.trim();
    const btn = document.getElementById("submitBtn");
    const status = document.getElementById("statusMsg");

    if (utr.length !== 12) {
      status.style.display = "block";
      status.style.color = "#ef4444";
      status.textContent = "Please enter a valid 12-digit UTR.";
      return;
    }

    // Processing State
    btn.disabled = true;
    btn.style.opacity = "0.7";
    btn.innerHTML = '<span class="spinner"></span>Verifying Payment...';
    status.style.display = "none";

    // Random delay 5-10s
    const delay = Math.floor(Math.random() * (10000 - 5000 + 1) + 5000);

    setTimeout(() => {
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.innerHTML = "SUBMIT PAYMENT";

      if (CONFIG.ADMIN_UTRS.includes(utr)) {
        const randomKey = "KING-" + Math.floor(1000 + Math.random() * 9000) + "-XP" + Math.floor(10 + Math.random() * 89);
        document.getElementById("accessKeyDisplay").textContent = randomKey;
        openModal("successModal");
      } else {
        status.style.display = "block";
        status.style.color = "#ef4444";
        status.textContent = "Invalid Transaction ID. Please check and try again.";
      }
    }, delay);
  };

  window.openModal = function(id) {
    document.getElementById(id).classList.add("active");
    document.body.style.overflow = "hidden";
  };

  window.closeModal = function(id) {
    document.getElementById(id).classList.remove("active");
    document.body.style.overflow = "auto";
  };
})();






//guardian.js//

/* KING PATCHER SYSTEM GUARDIAN */
(function(){
  // Anti-Inspect
  document.addEventListener("contextmenu", e => e.preventDefault());
  document.onkeydown = function(e) {
    if (e.keyCode == 123) return false;
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) return false;
    if (e.ctrlKey && e.keyCode == 85) return false;
  };

  // Anti-Selection
  document.onselectstart = function() { return false; };

  // Debugger Trap
  setInterval(() => {
    (function(){
      try {
        const _0x1a = "de" + "bu" + "gg" + "er";
        eval(_0x1a);
      } catch(e){}
    })();
  }, 500);
})();




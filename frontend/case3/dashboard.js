document.addEventListener("DOMContentLoaded", () => {
  // Fetch subscriber data from localStorage
  const subscriber = JSON.parse(localStorage.getItem("newSubscriber"));

  if (!subscriber) {
    alert("No subscriber data found! Redirecting to Home...");
    // ✅ Correct relative path based on folder structure
    window.location.href = "../case2/index.html";
    return;
  }

  // Fill user info
  document.getElementById("name").textContent = subscriber.name || "N/A";
  document.getElementById("age").textContent = subscriber.age || "N/A";
  document.getElementById("phone").textContent = subscriber.phone || "N/A";
  document.getElementById("vehicle").textContent = subscriber.vehicle || "N/A";
  document.getElementById("package").textContent = subscriber.package || "N/A";
  document.getElementById("price").textContent = subscriber.price || "0";

  // Assign a temporary slot if not assigned already
  if (!subscriber.slotId) {
    subscriber.slotId = "F2-S03"; // Example slot
    localStorage.setItem("newSubscriber", JSON.stringify(subscriber));
  }
  document.getElementById("slotId").textContent = subscriber.slotId;

  // Generate QR code safely
  if (document.getElementById("qrcode")) {
    new QRCode(document.getElementById("qrcode"), {
      text: subscriber.userId || subscriber.vehicle || "Unknown",
      width: 180,
      height: 180
    });
  }

  // Back button logic
  const backHomeBtn = document.getElementById("backHomeBtn");
  if (backHomeBtn) {
    backHomeBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to go back to the home page?")) {
        window.location.href = "../case2/index.html"; // ✅ Works from case3
      }
    });
  }
});

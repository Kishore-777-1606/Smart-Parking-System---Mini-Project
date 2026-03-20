document.getElementById("guestForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const formData = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      vehicle: document.getElementById("vehicle").value,
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
    };
  
    // For now just store in localStorage (simulate passing to next page)
    localStorage.setItem("guestData", JSON.stringify(formData));
  
    // Redirect to available slots page (we'll build this next)
    window.location.href = "available-slots.html";
  });
  
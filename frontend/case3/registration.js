document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    // Get form values
    const userData = {
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
      phone: document.getElementById("phone").value,
      vehicle: document.getElementById("vehicle").value,
      package: document.getElementById("package").value,
      price: getPackagePrice(document.getElementById("package").value),
      slotId: "TEMP-" + Math.floor(Math.random() * 1000), // temporary slot ID
      userId: "U" + Math.floor(Math.random() * 1000) // temporary user ID
    };
  
    // Save to localStorage (simulate backend)
    localStorage.setItem("newSubscriber", JSON.stringify(userData));
  
    // Redirect to dashboard page
    window.location.href = "dashboard.html";
  });
  
  // Function to assign price based on package
  function getPackagePrice(pkg) {
    switch(pkg) {
      case "weekly": return 500;
      case "monthly": return 1800;
      case "yearly": return 20000;
      default: return 0;
    }
  }
  
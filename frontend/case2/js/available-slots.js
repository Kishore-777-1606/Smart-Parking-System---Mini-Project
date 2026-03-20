const floorsContainer = document.getElementById("floorsContainer");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");
const closePopup = document.getElementById("closePopup");

// Fetch slot data from JSON
fetch("/backend/slots.json")
    .then(response => response.json())
    .then(data => renderFloors(data))
    .catch(err => console.error("Error loading slots:", err));

function renderFloors(slotsData) {
    // Filter slots: only floors 3 & 4, type "temp"
    const filteredSlots = slotsData.filter(slot => 
        (slot.floor === 3 || slot.floor === 4) && slot.type === "temp"
    );

    // Group by floor
    const grouped = filteredSlots.reduce((acc, slot) => {
        if (!acc[slot.floor]) acc[slot.floor] = [];
        acc[slot.floor].push(slot);
        return acc;
    }, {});

    Object.keys(grouped).forEach(floor => {
        const floorContainer = document.createElement("div");
        floorContainer.classList.add("floor-container");

        const title = document.createElement("h2");
        title.classList.add("floor-title");
        title.textContent = `Floor ${floor}`;
        floorContainer.appendChild(title);

        const grid = document.createElement("div");
        grid.classList.add("slots-grid");

        const leftSection = document.createElement("div");
        leftSection.classList.add("left-section");
        const rightColumn = document.createElement("div");
        rightColumn.classList.add("right-column");

        // Split slots into two rows and a right column
        const floorSlots = grouped[floor];
        // First 4 to top row, next 4 to bottom row, last 2 to right column (for 10 slots)
        const topRowSlots = floorSlots.slice(0,4);
        const bottomRowSlots = floorSlots.slice(4,8);
        const rightColSlots = floorSlots.slice(8);

        const topRow = document.createElement("div");
        topRow.classList.add("row");
        topRowSlots.forEach(slot => topRow.appendChild(createSlotDiv(slot)));
        leftSection.appendChild(topRow);

        const bottomRow = document.createElement("div");
        bottomRow.classList.add("row");
        bottomRowSlots.forEach(slot => bottomRow.appendChild(createSlotDiv(slot)));
        leftSection.appendChild(bottomRow);

        rightColSlots.forEach(slot => rightColumn.appendChild(createSlotDiv(slot)));

        grid.appendChild(leftSection);
        grid.appendChild(rightColumn);
        floorContainer.appendChild(grid);
        floorsContainer.appendChild(floorContainer);
    });
}

function createSlotDiv(slot) {
    const div = document.createElement("div");
    div.classList.add("slot", slot.status);
    div.textContent = slot.slotId;

    if (slot.status === "free") {
        div.addEventListener("click", () => {
            popupMessage.textContent = `Slot ${slot.slotId} has been booked successfully!`;
            popup.style.display = "flex";

            // Update UI immediately
            div.classList.remove("free");
            div.classList.add("occupied");
            div.style.cursor = "not-allowed";
            div.replaceWith(div.cloneNode(true)); // remove old click listener to prevent double booking
        });
    }
    return div;
}

// Close popup
closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // allow frontend to communicate

const SLOTS_FILE = path.join(__dirname, "slots.json");
const USERS_FILE = path.join(__dirname, "user.json");
const LOGS_FILE = path.join(__dirname, "logs.json");

// Helper functions
const loadSlots = () => JSON.parse(fs.readFileSync(SLOTS_FILE));
const saveSlots = (data) => fs.writeFileSync(SLOTS_FILE, JSON.stringify(data, null, 2));

const loadUsers = () => JSON.parse(fs.readFileSync(USERS_FILE));

const loadLogs = () => {
  if (!fs.existsSync(LOGS_FILE)) fs.writeFileSync(LOGS_FILE, "[]");
  return JSON.parse(fs.readFileSync(LOGS_FILE));
};
const saveLogs = (data) => fs.writeFileSync(LOGS_FILE, JSON.stringify(data, null, 2));

// ---------------- USER FLOW ----------------

// Verify QR code
app.post("/api/verify-qr", (req, res) => {
  const { qrCode } = req.body;
  const users = loadUsers();
  const slots = loadSlots();

  const user = users.find(u => u.qrCode === qrCode);
  if (!user) return res.status(404).json({ message: "QR not recognized" });

  const slot = slots.find(s => s.slotId === user.subscription.assignedSlot);
  if (!slot) return res.status(404).json({ message: "Assigned slot not found" });

  res.json({
    name: user.name,
    vehicleNumber: user.vehicleNumber,
    slotId: slot.slotId,
    floor: slot.floor,
    status: slot.status
  });
});

// Check-in for subscribed user
app.post("/api/check-in/subscribed", (req, res) => {
  const { qrCode } = req.body;
  const users = loadUsers();
  const slots = loadSlots();

  const user = users.find(u => u.qrCode === qrCode);
  if (!user) return res.status(404).json({ message: "QR not recognized" });

  const slot = slots.find(s => s.slotId === user.subscription.assignedSlot);
  if (!slot) return res.status(404).json({ message: "Assigned slot not found" });

  slot.status = "occupied";
  saveSlots(slots);

  const logs = loadLogs();
  logs.push({ userId: user.id, action: "check-in", time: new Date() });
  saveLogs(logs);

  res.json({ message: "Checked in successfully", slot });
});

// Check-out
app.post("/api/check-out", (req, res) => {
  const { qrCode } = req.body;
  const users = loadUsers();
  const slots = loadSlots();

  const user = users.find(u => u.qrCode === qrCode);
  if (!user) return res.status(404).json({ message: "QR not recognized" });

  const slot = slots.find(s => s.slotId === user.subscription.assignedSlot);
  if (!slot) return res.status(404).json({ message: "Assigned slot not found" });

  slot.status = "free";
  saveSlots(slots);

  const logs = loadLogs();
  logs.push({ userId: user.id, action: "check-out", time: new Date() });
  saveLogs(logs);

  res.json({ message: "Checked out successfully", slot });
});

// Get all logs
app.get("/api/logs", (req, res) => res.json(loadLogs()));

const PORT = 3000;
app.listen(PORT, () => console.log(`🚗 Server running on port ${PORT}`));

document.getElementById("mailForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const to = document.getElementById("to").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  const res = await fetch("/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, subject, message }),
  });

  const data = await res.json();
  document.getElementById("status").textContent = data.message;
});

const deleteUserForm = document.getElementById("delete-user-form");

deleteUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("other-username").value;

  // Confirmation prompt (optional, recommended for security)
  if (
    !confirm(
      `Are you sure you want to delete ${username}? This action cannot be undone.`
    )
  ) {
    return;
  }

  const response = await fetch("http://localhost:4001/auth/delete/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add authorization header if needed (e.g., token)
    },
    body: JSON.stringify({ username }),
  });

  if (response.ok) {
    const data = await response.json();
    alert(data.message); // Display success message
  } else {
    alert("Error deleting user"); // Display error message
  }
});
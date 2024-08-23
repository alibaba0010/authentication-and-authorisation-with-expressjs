const deleteUserForm = document.getElementById("delete-user-form");

deleteUserForm.addEventListener("click", async (event) => {
  event.preventDefault();
  const username = prompt("Enter the username you want to delete:");

  if (!username) {
    alert("Please enter a valid username.");
    return;
  }

  // Confirmation prompt
  if (
    !confirm(
      `Are you sure you want to delete this user ${username}? This action cannot be undone.`
    )
  ) {
    return;
  }

  try {
    const response = await fetch("http://localhost:4001/auth/delete/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed (e.g., token)
      },
      body: JSON.stringify({ username }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error deleting user: ${await response.text()}`);
    }

    const data = await response.json();
    alert(data.message); // Display success message
  } catch (error) {
    console.error(error);
    alert("An error occurred while deleting the user.");
  }
});
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

const deleteUserForm = document.getElementById("delete-user-form");

deleteUserForm.addEventListener("click", async () => {
  // event.preventDefault();
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
    const response = await fetch("http://127.0.0.1:4001/auth/delete/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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

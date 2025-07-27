const container = document.querySelector(".content");
const leftBtn = document.querySelector(".btn__prev");
const rightBtn = document.querySelector(".btn__next");

const USERS_LIMIT = 9;
const steps = [0];
let page = 0;

async function loadUsers(startFrom = 0) {
  try {
    const response = await fetch(
      `https://api.github.com/users?since=${startFrom}&per_page=${USERS_LIMIT}`
    );
    if (!response.ok) throw new Error("Fetch failed");

    const users = await response.json();
    if (!users.length) return;

    container.innerHTML = users
      .map(
        (user) => `
      <div class="card">
        <img src="${user.avatar_url}" alt="${user.login}" class="photo" />
        <h3 class="name">${user.login}</h3>
      </div>
    `
      )
      .join("");

    if (steps.length === page + 1) {
      steps.push(users[users.length - 1].id);
    }
  } catch (err) {
    alert("Помилка завантаження: " + err.message);
  }
}

leftBtn.onclick = () => {
  if (page > 0) {
    page--;
    loadUsers(steps[page]);
  }
};

rightBtn.onclick = () => {
  page++;
  loadUsers(steps[page]);
};

loadUsers();

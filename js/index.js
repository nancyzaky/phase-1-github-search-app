function submitForm() {
  let formSub = document.getElementById("github-form");
  formSub.addEventListener("submit", (e) => {
    e.preventDefault();
    let usersContainer = document.getElementById("user-list");
    let nameSearch = e.target.children[0].value;
    fetch(`https://api.github.com/search/users?q=${nameSearch}`)
      .then((resp) => resp.json())
      .then((data) => {
        for (let person of data.items) {
          let personList = document.createElement("li");
          console.log(person);
          let userName = document.createElement("h3");
          userName.innerText = person.login;
          let userAvatar = document.createElement("img");
          userAvatar.src = person.avatar_url;
          let userGitUrl = document.createElement("a");
          userGitUrl.href = person.html_url;
          userGitUrl.innerText = "User Profile";
          let userReposBtn = document.createElement("button");

          userReposBtn.innerText = "Click to view user repos";
          userReposBtn.classList.add("btn");
          let userRepoUrl = person.repos_url;

          personList.appendChild(userName);
          personList.appendChild(userReposBtn);

          personList.appendChild(userGitUrl);
          personList.appendChild(userAvatar);

          usersContainer.appendChild(personList);
          userReposBtn.addEventListener("click", (e) => {
            fetch(userRepoUrl)
              .then((resp) => resp.json())
              .then((data) => {
                for (let repo of data) {
                  let repoSection = document.createElement("li");
                  personList.appendChild(repoSection);
                  repoSection.innerText = repo.name;
                }
              });
          });
        }
      });
  });

  //console.log(nameSearch);
}

document.addEventListener("DOMContentLoaded", submitForm);

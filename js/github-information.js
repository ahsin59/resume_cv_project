function userInformationHTML(user){
    return `
    <h2>${user.name}
        <span class="small-name">
        /*this is the link to the userpublic profile on github*/
        (@<a href="${user.html_url}" target="_blank"> ${user.login}</a>)
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url} target="_blank">
                <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
            </a>
        </div>
        <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
    </div>
    `;
}

function repoInformationHTML(repos){
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos"</div>`;
    }

    var listItemsHTML = repos.map(function(repo){
        return `<li>
                    <a href="${repo.html_url}" target=""_blank">${repo.name}</a>
                </li>`
    });

    /*This code below, stops us from having to iterate through the new array once again*/
    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>  `;
}

function fetchGitHubInformation(event){
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

    var username  = $("#gh-username").val();

    if (!username){
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="../img/loader.gif" alt="loading.."/>
        </div>`);

//    This is a promise
    $.when(
        //Communicating with the API
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
        
    ).then(
        function(firstResponse, secondResponse){
    /*when we do two calls like this, the when() method packs a response up into arrays.*/
            var userData = firstResponse[0];
            var repoData = secondResponse[0]
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        }, 
        function(errorResponse){
            if (errorResponse.status === 404){
                $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
            } else if(errorResponse.status === 403){
        //forbidden, code that GitHub returns when our access has been denied
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset')*1000);
        //Header provided by GitHub to let know when quota will be reset, presented in UNIX teimstamp
                $("#gh-user-data").html(`<h4>Too many requests, Please wait until ${resetTime.toLocaleTimeString()}</h4>`)
                } else {
                    console.log(errorResponse);
                    $("#gh-user-data").html(`<h2>Error:  ${errorResponse.responseJSON.message}</h2>`);
                    }
            });
}


$(document).ready(fetchGitHubInformation);

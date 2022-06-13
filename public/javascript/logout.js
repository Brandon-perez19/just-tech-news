async function logout() {
    const response = await fetch('/apit/users/logout', {
        method: 'post',
        headers: { 'Content-type': 'application/json'}
    });

    if(response.ok){
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#logout').addEventListener('click', logout);
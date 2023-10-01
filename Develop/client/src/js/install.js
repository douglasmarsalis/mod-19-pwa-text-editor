const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA - This code is very similar to Activity 25
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installBtn.style.visibility = 'visible';
    butInstall.textContent = '👇 Click the button to Install!';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', /*async*/ () => {
    event.prompt();
    installBtn.setAttribute('disabled', true);
    install.installBtn.textContent = '👍 Installed!';
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    butInstall.textContent = '😎 Successfully installed!';
    console.log('😎', 'appinstalled', event);
});

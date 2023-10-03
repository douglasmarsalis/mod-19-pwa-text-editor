const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA - This code is very similar to Activity 25
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    //event.preventDefault();
    window.deferredPrompt = event;
    butInstall.style.visibility = 'visible';
    butInstall.textContent = 'Install';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
}

    promptEvent.prompt();
    window.deferredPrompt = null;
    butInstall.setAttribute('disabled', true);
    butInstall.textContent = 'Installed';
});
// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
    console.log('Appinstalled', event);
});

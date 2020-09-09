import './styles.scss'


(function () {
    let typingTimer;
    let doneTypingInterval = 5000;
    let closeSecretTimer = 15000;
    let konamiCode = 'injects3crets';
    let secret = "";
    let issues = [];
    let secretDiv = document.getElementById('secret');
    document.addEventListener('keypress', (e) => {
        if (e.key === "Escape") {
            secret = "";
        }


        clearTimeout(typingTimer);
        if (e.key) {
            secret += e.key;
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
        }
    })

    async function doneTyping() {
        if (secret !== konamiCode) {
            secret = "";
        } else {

            let response = await window.fetch('https://api.github.com/repos/elixir-lang/elixir/issues');
            let data = await response.json()
            var max = Object.keys(data).length < 5 ? Object.keys(data).length : 5;
            for (let index = 0; index < max; index++) {
                const issueName = data[index].title;
                const authorName = data[index].user.login

                var template = `<p><strong>Issue:</strong>${issueName}</p><p><strong>Nickname:</strong>${authorName}</p>`;

                issues.push(template);
            }
            secretDiv.classList.replace('hidden-div', 'secret-div');
            secretDiv.innerHTML = issues.join('');

            setTimeout(() => { secretDiv.classList.replace('secret-div', 'hidden-div'); secret = "" }, closeSecretTimer)
        }
    }
})();
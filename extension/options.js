if (typeof(chrome) !== "undefined"){
    browser = chrome
}

function save_options() {
    console.log("click")

    var showOaColor = document.getElementById('show-oa-color').checked;
    var bestPracticeReposOnly = document.getElementById('best-practice-repos-only').checked;

    browser.storage.local.set({
        showOaColor: showOaColor,
        bestPracticeReposOnly: bestPracticeReposOnly
    })

    var status = document.getElementById('status');
    status.textContent = 'Preference saved.';

    setTimeout(function(){
        status.textContent = ''
    }, 1000)


}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    browser.storage.local.get({
        showOaColor: false,
        bestPracticeReposOnly: false
    }, function(items) {
        document.getElementById('show-oa-color').checked = items.showOaColor;
        document.getElementById('best-practice-repos-only').checked = items.bestPracticeReposOnly;
    });
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('show-oa-color').addEventListener('click',
    save_options);
document.getElementById('best-practice-repos-only').addEventListener('click',
    save_options);
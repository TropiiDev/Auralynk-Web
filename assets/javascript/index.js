const modal = document.getElementById('email_modal');
const hero = document.querySelector('.hero');
const emailMessage = document.querySelector('#email_message');
const modalMessage = document.querySelector('#modal_message');
const closeEmailModalBtn = document.querySelector('.submit_form_btn');

const openEmailModal = () => {
    hero.style.display = 'none';
    modal.style.display = 'flex';
    console.log('Opened email modal');
}

const sendEmailNotification = (e) => {
    e.preventDefault();
    const emailInput = document.querySelector('#email_input');
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        modalMessage.innerHTML = 'Please enter a valid email address';
        return;
    }

    console.log('Sending email notification...')
    modalMessage.innerHTML = "Sending message..";

    const emailValue = emailInput.value;
    const name = document.querySelector('#name_input').value;
    isEmailSent = sendEmail(emailValue, name);
    isEmailSent.then(res => {
        if (res.message == "Email sent") {
            modal.style.display = 'none';
            hero.style.display = 'flex';
        } else if (res.detail == "Email already registered") {
            modalMessage.innerHTML = "Oops! Looks like someone already used that email. Try again.";
        } else {
            modalMessage.innerHTML = "Something went wrong, please try again later";
        }
    });

    console.log('Sent email notification')
    emailMessage.innerHTML = 'Email notification sent!';
    emailInput.value = '';
}

const sendEmail = async (email, name) => {
    return fetch("https://auralynk-api.fstropii.com/email/welcome", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            name: name
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}

closeEmailModalBtn.addEventListener('click', (e) => sendEmailNotification(e));
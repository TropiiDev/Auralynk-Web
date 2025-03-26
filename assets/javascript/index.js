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

    setTimeout(() => {
        const email = emailInput.value;
        const name = document.querySelector('#name_input').value;
        isEmailSent = sendEmail(email, name);
        if (isEmailSent.status === 200) {
            modal.style.display = 'none';
            hero.style.display = 'flex';
        } else {
            modalMessage.innerHTML = "Something went wrong, please try again later";
        }
    }, 5000)

    console.log('Sent email notification')
    emailMessage.innerHTML = 'Email notification sent!';
    emailInput.value = '';
}

const sendEmail = async (email, name) => {
    const res = fetch("https://auralynk-api.fstropii.com", {
        method: "POST",
        body: JSON.stringify({
            email,
            name
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return res;
}

closeEmailModalBtn.addEventListener('click', (e) => sendEmailNotification(e));
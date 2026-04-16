
export function ForgotPasswordLink(navigate) {

    const container = document.createElement('div');
    container.innerHTML = `
        <div class="forgot-password-container">
        <form id="form">
            <input type="email" name="email" required placeholder="Enter your email"/>
            <button type="submit">Send Reset Link</button>
        </form>
        </div>
    `
    const form = container.querySelector('#form');
    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    form.addEventListener('submit', async (e) => {
        
        try {
            e.preventDefault();
            const email = e.target.email.value;
            
            const verifyRes = await axios.post(
                'http://localhost:3000/api/password',
                { email }
            );
            console.log(verifyRes);
        if(!verifyRes){
            h1.textContent = 'Retry again something went wrong'
            div.appendChild(h1);
        }
        h1.textContent = 'Link is send to your email check'
        div.appendChild(h1);
        container.appendChild(div);
    }
    catch(err){
        h1.textContent = err.response.data.message
        div.appendChild(h1);
        container.appendChild(div);
        console.log(err.response.data.message);
    }
});
return container;
}
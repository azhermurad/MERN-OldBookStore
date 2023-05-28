import axios from 'axios';
const addPayPalScript = async (callback) => {
    const { data: clientId } = await axios.get('/api/config/paypal');
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    // when the script is load than we have to set the state true
    script.onload = () => {
        callback()
    };
    document.body.appendChild(script);
};

// we have to integate the stripe payment
export default addPayPalScript;

// const API_BASE_URL = 'http://localhost:8000;  // Base URL for your API

// /**
//  * Sign-in function to authenticate a user.
//  * @param {Object} credentials - The username and password of the user.
//  * @returns {Promise<Object>} The response from the server as a JSON object.
//  */
// export function signIn(credentials) {
//     return fetch(`${API_BASE_URL}/signin`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//         throw error;
//     });
// }

// /**
//  * Sign-up function to register a new user.
//  * @param {Object} userData - The details of the user to register.
//  * @returns {Promise<Object>} The response from the server as a JSON object.
//  */
// export function signUp(userData) {
//     return fetch(`${API_BASE_URL}/signup`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userData)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//         throw error;
//     });
// }

// export { signIn, signUp };

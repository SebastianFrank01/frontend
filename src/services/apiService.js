import Cookies from 'js-cookie';

const API_URL = 'http://127.0.0.1:8000';

// 'export function' allows for other files to import it
// other files follow this syntax to import:
// import { fetchTasks, addTask, deleteTask } from 'path/to/apiService';
export function fetchTasks() {
    return fetch(`${API_URL}/tasks/`, {credentials: 'include'})
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(tasks => tasks.map(task => ({
            ...task,
            title: task.description
        })))
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Add a new task
export function addTask(newItemText) {
    return fetch(`${API_URL}/tasks/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        },
        body: JSON.stringify({
            description: newItemText,
            completed: false
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(newTask => ({
            ...newTask,
            title: newTask.description
        }))
        .catch(error => {
            console.error('There has been a problem with your add operation:', error);
        });
}

// Delete a task
export function deleteTask(id) {
    return fetch(`${API_URL}/tasks/${id}/`, { method: 'DELETE', credentials: 'include'})
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.ok;
        })
        .catch(error => {
            console.error('There has been a problem with your delete operation:', error);
        });
}

// Log in!
export function login(username, password) {
    return fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid login credentials');
                } else {
                    throw new Error('Login failed with status: ' + response.status);
                }
            }
            return response.json();
        });
}

export function logout() {
    return fetch(`${API_URL}/logout/`, {
        method: 'POST',
        credentials: 'include', // Include for session management
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            return response.ok;
        })
        .catch(error => {
            console.error('Logout error:', error);
        });
}

export function getTimes(busNumber,stopNumber) {
    return fetch(`${API_URL}/apibusroutes/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        },
        body: JSON.stringify({ stopNumber, busNumber }),
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok){
                throw new Error('Bus not found');
            }
            //console.log(response.json())
            return response.json();
        })

        .catch(error => {
            console.error('Error getting bus times: ', error)
        });

}

export function getRating(busNumber) {
    return fetch(`${API_URL}/apifindrating/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        },
        body: JSON.stringify({busNumber}),
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok){
                throw new Error('Ratings Not Found');
            }
            //console.log(response.json())
            return response.json();
        })

        .catch(error => {
            console.error('Error', error)
        });

}

export function sendRating(busNumber, stopNumber, scheduleTime, realArrivalTime, wasCancelled, ratingCleanliness, ratingSafety, ratingDriving, ratingCrowdedness) {
    return fetch(`${API_URL}/apisendrating/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        },
        body: JSON.stringify({busNumber, stopNumber, scheduleTime, realArrivalTime, wasCancelled, ratingCleanliness, ratingSafety, ratingDriving, ratingCrowdedness}),
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok){
                throw new Error('Submission Failed');
            }
            //console.log(response.json())
            return response.json();
        })

        .catch(error => {
            console.error('Error', error)
        });

}

export function connectStops(startStop, endStop) {
    return fetch(`${API_URL}/apistoptostop/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        },
        body: JSON.stringify({startStop, endStop}),
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok){
                throw new Error('Error connecting stops');
            }
            //console.log(response.json())
            return response.json();
        })

        .catch(error => {
            console.error('Error', error)
        });

}

export function getFavourites(){
    return fetch(`${API_URL}/apigetfavourites/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        },
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok){
                throw new Error('Error getting favourites');
            }
            //console.log(response.json())
            return response.json();
        })

        .catch(error => {
            console.error('Error', error)
        });
}

export function submitFavourite(busNumber, stopNumber){
    return fetch(`${API_URL}/apisubmitfavourite/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        },
        body: JSON.stringify({busNumber, stopNumber}),
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok){
                throw new Error('Error in addition or deletion');
            }
            //console.log(response.json())
            return response.json();
        })

        .catch(error => {
            console.error('Error', error)
        });
}

export function getReviews(busNumber){
    return fetch(`${API_URL}/apigetreviews/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        },
        body: JSON.stringify({busNumber}),
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok){
                throw new Error('Error in getting reviews');
            }
            //console.log(response.json())
            return response.json();
        })

        .catch(error => {
            console.error('Error', error)
        });

}



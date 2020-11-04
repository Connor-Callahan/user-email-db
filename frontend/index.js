


document.addEventListener('DOMContentLoaded', () => {

    // Load all the profiles

    const table = document.querySelector("#table")

    let allProfiles = []

    function fetchProfiles() {
        fetch('http://localhost:3000/users/')
        .then(r => r.json())
        .then((data) => {
            console.log(data.length)
            if(data.length == 0){
                table.innerHTML = `<h1> Index is Empty ⚠️ </h1>`
            } else {
                listtable(data)
            }
        })
    }
    fetchProfiles()
    
    function listtable(data) {
        data.forEach((profile) => {
            table.innerHTML += renderProfile(profile)
        })
    }
    
    function renderProfile(profile) {
        return `
        <div id="profile-${profile.id}" class="profile"> 
            <h1>${profile.name}</h1>
                <div class="profile-button">
                    <button data-id=${profile.id} data-action="delete" id="delete-button"> 🗑 </button>
                    <button data-id=${profile.id} data-action="edit" id="edit-button"> ✏️ </button>
                </div>
        </div>
        `
    }

    table.addEventListener('click', (e) => {
        e.preventDefault()
        let name = "null"
        let email = ""
        if(e.target.id == 'delete-button') {
            fetch(`http://localhost:3000/users/${e.target.dataset.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })  
            document.querySelector("#profile-" + e.target.dataset.id).remove() 
        } else if(e.target.id =='edit-button'){
            fetch(`http://localhost:3000/users/${e.target.dataset.id}`)
            .then(r => r.json())
            .then((data) => {
                editProfile(data)
            })
        }
    })

    // Edit profile form

    function editProfile(profile) {
        console.log(profile[0].name)
        return table.innerHTML = `
            <button id="back-button"> 🔙 </button>
            <div id="input">
            <label id="namelabel" for="name"></label>
                <input type="text" id="name" placeholder=${profile[0].name}>
                    <br><br>
            <label id="emaillabel" for="email" ></label>
                <input type="text" id="email" placeholder=${profile[0].email}><br><br>
                    <button id="submit"> ✚ </button>
        </div>
            `
    }
    

    // Creat profile form (name/email)
    
    const submit = document.querySelector('#submit')
    
    submit.addEventListener('click', (e) => {
        e.preventDefault()
        const name = document.querySelector("#name").value
        const email = document.querySelector("#email").value
        fetch('http://localhost:3000/users/', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }, 
            body: JSON.stringify({
                name: name,
                email: email
            })
        })
        .then((r) => r.json())
        .then((data) => {
            allProfiles.push(data)
            table.innerHTML += renderSingleProfile(data)
        })
    })

})

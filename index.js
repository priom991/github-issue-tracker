const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

let issues = []

const container = document.getElementById("issuesContainer")
const spinner = document.getElementById("spinner")
const issueCount = document.getElementById("issueCount")

/* LOAD ISSUES */

async function loadIssues(){

spinner.style.display="block"

let res = await fetch(API_URL)
let data = await res.json()

issues = data.data

spinner.style.display="none"

displayIssues(issues)

}

loadIssues()


/* DISPLAY ISSUES */

function displayIssues(list){

container.innerHTML=""

issueCount.innerText = list.length + " Issues"

list.forEach(issue => {

let card = document.createElement("div")

card.className = `issue-card ${issue.status}`

card.innerHTML = `
<h3>${issue.title}</h3>
<p>${issue.description}</p>
<p><b>Status:</b> ${issue.status}</p>
<p><b>Author:</b> ${issue.author}</p>
<p><b>Priority:</b> ${issue.priority}</p>
<p><b>Label:</b> ${issue.label}</p>
<p><b>Created:</b> ${issue.createdAt}</p>
`

card.onclick = () => openIssue(issue.id)

container.appendChild(card)

})

}


/* FILTER */

function filterIssues(type,element){

document.querySelectorAll(".tab").forEach(tab=>tab.classList.remove("active"))

element.classList.add("active")

if(type==="all"){

displayIssues(issues)

}else{

let filtered = issues.filter(issue=>issue.status===type)

displayIssues(filtered)

}

}


/* MODAL */

async function openIssue(id){

let res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)

let data = await res.json()

let issue = data.data

document.getElementById("issueTitle").innerText = issue.title

document.getElementById("issueStatus").innerText =
issue.status === "open" ? "Opened" : "Closed"

document.getElementById("issueAuthor").innerText =
"Opened by " + issue.author

document.getElementById("issueDate").innerText =
"• " + issue.createdAt

document.getElementById("issueDescription").innerText =
issue.description

document.getElementById("issueAssignee").innerText =
issue.author

document.getElementById("issuePriority").innerText =
issue.priority

document.getElementById("issueLabels").innerHTML =
`<span class="bug">BUG</span>
<span class="help">HELP WANTED</span>`

document.getElementById("issueModal").style.display = "flex"

}

function closeModal(){

document.getElementById("issueModal").style.display = "none"

}


/* SEARCH */

async function searchIssue(){

let q = document.getElementById("searchInput").value

spinner.style.display="block"

let res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${q}`)

let data = await res.json()

spinner.style.display="none"

displayIssues(data.data)

}
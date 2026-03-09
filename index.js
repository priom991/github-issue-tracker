const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

let issues = []

const issuesDiv = document.getElementById("issues")
const spinner = document.getElementById("spinner")
const count = document.getElementById("count")

async function loadIssues(){

spinner.style.display="block"

let res = await fetch(API)
let data = await res.json()

issues = data.data

spinner.style.display="none"

displayIssues(issues)

}

loadIssues()


function displayIssues(list){

issuesDiv.innerHTML=""

count.innerText = list.length + " Issues"

list.forEach(issue=>{

let card=document.createElement("div")

card.className=`card ${issue.status}`
//..........................

card.innerHTML=`

<span class="priority ${issue.priority.toLowerCase()}">
${issue.priority}
</span>

<h4>${issue.title}</h4>

<p class="desc">${issue.description}</p>

<div class="labels">
<span class="bug">${issue.label}</span>
</div>

<div class="issue-buttons">
<button class="bug-btn">Bug</button>
<button class="help-btn">Help Wanted</button>
</div>

<div class="meta">
#${issue.id} by ${issue.author}<br>
${issue.createdAt}
</div>
`
//..................................

card.onclick=()=>openIssue(issue.id)

issuesDiv.appendChild(card)

})

}


function filterIssues(type,el){

document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"))
el.classList.add("active")

if(type==="all"){
displayIssues(issues)
}else{
displayIssues(issues.filter(i=>i.status===type))
}

}


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


/* search */

document.getElementById("searchInput").addEventListener("keyup", async e=>{

let q=e.target.value

if(q.length<2)return loadIssues()

spinner.style.display="block"

let res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${q}`)

let data = await res.json()

spinner.style.display="none"

displayIssues(data.data)

})
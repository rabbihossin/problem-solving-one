document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  if(description===''){
    alert(' add description now');
    return ;
  }else if(assignedTo===''){
    alert('assigned now');
    return ;
  }
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const setStatusClosed = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  // problem one handel
  const currentIssue = issues.filter(issue => issue.id == id);
  console.log(currentIssue)
  currentIssue.forEach(data => {
    data.status = 'Closed';
    data.description = `<del>${data.description}</del>`;
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
  });
}

const deleteIssue = id => {
  if (confirm("Delete All Data") === false) {
    return ;
  }
  const delIssues = JSON.parse(localStorage.getItem('issues'));
  // problem two handel
  const currentIssue = delIssues.filter(issue => issue.id == id);
  currentIssue.forEach(data => {
    localStorage.removeItem ('issues', JSON.stringify(delIssues));
    fetchIssues();
  });
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  // here condition set if issues = null then retun function;
  if(!issues){
    return;
  }
  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span id='status' class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" id='close' onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}



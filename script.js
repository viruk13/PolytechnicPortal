const STUDENTS_API = "https://6982f0249c3efeb892a3c0ce.mockapi.io/PolytechnicPortal/students";

// Global main content
const main = document.getElementById('main-content');

// --------- HOME ----------
function loadHome(){
  main.innerHTML = `<h1>Welcome to Government Polytechnic Gunnal</h1>
  <p style="text-align:center;">Click “Courses” above to see department details!</p>`;
}

// --------- COURSES ----------
function loadCourses(){
  main.innerHTML = `<h1>Courses Offered</h1>
    <div class="course-buttons">
      <button onclick="alert('CS Department')">Computer Science (CS)</button>
      <button onclick="alert('AET Department')">Alternative Energy Technology (AET)</button>
      <button onclick="alert('EEE Department')">Electrical & Electronics (EEE)</button>
    </div>`;
}

// --------- LOGIN ----------
function loginPage(){
  main.innerHTML = `<h1>Login</h1>
    <div class="login-form">
      <div class="error-msg" id="error-msg"></div>
      <label>Username:</label>
      <input type="text" id="username" placeholder="Enter username">
      <label>Password:</label>
      <input type="password" id="password" placeholder="Enter password">
      <button onclick="submitLogin()">Login</button>
    </div>`;
}

// Simple login (MockAPI demo)
async function submitLogin(){
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('error-msg');
  if(!username || !password){ errorMsg.style.display="block"; errorMsg.textContent="Enter both fields!"; return; }

  try{
    const res = await fetch(STUDENTS_API);
    const students = await res.json();
    const user = students.find(s=>s.username===username && s.password===password);
    if(user){ 
      errorMsg.style.display="none"; 
      loadStudentDashboard(user.id);
    } else { 
      errorMsg.style.display="block"; 
      errorMsg.textContent="Invalid username or password!";
    }
  } catch(err){ alert("Error fetching students: " + err); }
}

// --------- STUDENT DASHBOARD ----------
async function loadStudentDashboard(id){
  try{
    const res = await fetch(`${STUDENTS_API}/${id}`);
    const student = await res.json();
    main.innerHTML = `<h1>Welcome ${student.name}</h1>
    <div class="dashboard">
      <div class="dash-card">
        <h3>Marks</h3>
        <ul>
          <li>Math: ${student.marks?.Math||0}</li>
          <li>Physics: ${student.marks?.Physics||0}</li>
          <li>CS: ${student.marks?.CS||0}</li>
        </ul>
      </div>
      <div class="dash-card">
        <h3>Attendance</h3>
        <ul>
          <li>Math: ${student.attendance?.Math||0}%</li>
          <li>Physics: ${student.attendance?.Physics||0}%</li>
          <li>CS: ${student.attendance?.CS||0}%</li>
        </ul>
      </div>
    </div>
    <button onclick="loadHome()" style="margin-top:20px;">Logout</button>`;
  } catch(err){ alert("Error loading student: " + err); }
}

// --------- INIT ----------
loadHome();

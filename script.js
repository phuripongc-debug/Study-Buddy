// ==========================
// DATA
// ==========================

let assignments = [
    {
        name: "แบบฝึกหัดวิศวกรรมซอฟต์แวร์",
        detail: "ส่งใบงานบทที่ 3",
        date: "2026-10-05T23:59"
    },
    {
        name: "แบบฝึกหัด Data Structure",
        detail: "Linked List",
        date: "2026-10-08T23:59"
    }
];


// ==========================
// PAGE NAVIGATION
// ==========================

function showPage(pageId, button) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    document.querySelectorAll(".menu").forEach(menu => {
        menu.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    const titles = {
        dashboard: "หน้าหลัก",
        schedule: "ตารางเรียน",
        assignment: "งานที่ต้องส่ง",
        exam: "ตารางสอบ",
        appointment: "นัดหมาย",
        announcement: "ประกาศ"
    };

    document.getElementById("pageTitle").textContent = titles[pageId];
}


// ==========================
// MODAL
// ==========================

function openModal(id) {
    document.getElementById(id).classList.add("show");
}

function closeModal(id) {
    document.getElementById(id).classList.remove("show");
}


// ==========================
// DATE
// ==========================

function updateToday() {

    const now = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    document.getElementById("today").textContent =
        now.toLocaleDateString("th-TH", options);
}


// ==========================
// ASSIGNMENT
// ==========================

function addAssignment() {

    const name = document.getElementById("assignmentName").value;
    const detail = document.getElementById("assignmentDetail").value;
    const date = document.getElementById("assignmentDate").value;

    if (!name || !date) {
        alert("กรุณากรอกชื่องานและกำหนดส่ง");
        return;
    }

    assignments.push({
        name,
        detail,
        date
    });

    renderAssignments();

    document.getElementById("assignmentName").value = "";
    document.getElementById("assignmentDetail").value = "";
    document.getElementById("assignmentDate").value = "";

    closeModal("assignmentModal");
}


function renderAssignments() {

    const list = document.getElementById("assignmentList");
    const dashboard = document.getElementById("dashboardAssignments");

    list.innerHTML = "";
    dashboard.innerHTML = "";

    assignments.forEach((item, index) => {

        const date = new Date(item.date);

        const formattedDate =
            date.toLocaleDateString("th-TH") +
            " " +
            date.toLocaleTimeString("th-TH", {
                hour: "2-digit",
                minute: "2-digit"
            });

        const html = `
            <div class="assignment-item">

                <h3>${item.name}</h3>

                <p>${item.detail || "ไม่มีรายละเอียด"}</p>

                <div class="countdown">
                    ⏰ กำหนดส่ง ${formattedDate}
                </div>

            </div>
        `;

        list.innerHTML += html;

        if (index < 3) {
            dashboard.innerHTML += html;
        }
    });

    document.getElementById("assignmentCount").textContent =
        assignments.length;
}


// ==========================
// SCHEDULE
// ==========================

function addSchedule() {

    const day = document.getElementById("scheduleDay").value;
    const time = document.getElementById("scheduleTime").value;
    const subject = document.getElementById("scheduleSubject").value;
    const room = document.getElementById("scheduleRoom").value;
    const teacher = document.getElementById("scheduleTeacher").value;

    if (!subject || !time) {
        alert("กรุณากรอกข้อมูลวิชาและเวลา");
        return;
    }

    const table = document.getElementById("scheduleTable");

    table.innerHTML += `
        <tr>
            <td>${day}</td>
            <td>${time}</td>
            <td>${subject}</td>
            <td>${room}</td>
            <td>${teacher}</td>
        </tr>
    `;

    closeModal("scheduleModal");
}


// ==========================
// EXAM
// ==========================

function addExam() {

    const subject = document.getElementById("examSubject").value;
    const date = document.getElementById("examDate").value;
    const time = document.getElementById("examTime").value;
    const room = document.getElementById("examRoom").value;

    if (!subject || !date) {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    const formattedDate =
        new Date(date).toLocaleDateString("th-TH");

    document.getElementById("examTable").innerHTML += `
        <tr>
            <td>${subject}</td>
            <td>${formattedDate}</td>
            <td>${time}</td>
            <td>${room}</td>
        </tr>
    `;

    closeModal("examModal");
}


// ==========================
// APPOINTMENT
// ==========================

function addAppointment() {

    const name = document.getElementById("appointmentName").value;
    const date = document.getElementById("appointmentDate").value;
    const time = document.getElementById("appointmentTime").value;
    const room = document.getElementById("appointmentRoom").value;

    if (!name || !date) {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    const d = new Date(date);

    const day = d.getDate();

    const month = d.toLocaleDateString("th-TH", {
        month: "short"
    });

    document.querySelector(".appointment-card").innerHTML += `
        <div class="appointment" style="margin-top:20px">

            <div class="date-box">
                <b>${day}</b>
                <span>${month}</span>
            </div>

            <div>
                <h3>${name}</h3>
                <p>${room} • ${time} น.</p>
            </div>

        </div>
    `;

    closeModal("appointmentModal");
}


// ==========================
// ANNOUNCEMENT
// ==========================

function addAnnouncement() {

    const title =
        document.getElementById("announcementTitle").value;

    const detail =
        document.getElementById("announcementDetailInput").value;

    if (!title || !detail) {
        alert("กรุณากรอกหัวข้อและรายละเอียด");
        return;
    }

    document.getElementById("announcementList").insertAdjacentHTML(
        "afterbegin",

        `
        <div class="card announcement-full">

            <span class="tag normal">ใหม่</span>

            <h3>${title}</h3>

            <p>${detail}</p>

            <small>ประกาศโดยหัวหน้าห้อง • วันนี้</small>

        </div>
        `
    );

    closeModal("announcementModal");
}


// ==========================
// START
// ==========================

updateToday();
renderAssignments();

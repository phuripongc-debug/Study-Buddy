/* =====================================================
   STUDY BUDDY
   Main JavaScript
===================================================== */


/* ================= DATA ================= */

let schedules =
    JSON.parse(localStorage.getItem("studyBuddySchedules")) || [];

let assignments =
    JSON.parse(localStorage.getItem("studyBuddyAssignments")) || [];

let exams =
    JSON.parse(localStorage.getItem("studyBuddyExams")) || [];

let appointments =
    JSON.parse(localStorage.getItem("studyBuddyAppointments")) || [];

let announcements =
    JSON.parse(localStorage.getItem("studyBuddyAnnouncements")) || [];


/* ================= SAVE ================= */

function saveData() {

    localStorage.setItem(
        "studyBuddySchedules",
        JSON.stringify(schedules)
    );

    localStorage.setItem(
        "studyBuddyAssignments",
        JSON.stringify(assignments)
    );

    localStorage.setItem(
        "studyBuddyExams",
        JSON.stringify(exams)
    );

    localStorage.setItem(
        "studyBuddyAppointments",
        JSON.stringify(appointments)
    );

    localStorage.setItem(
        "studyBuddyAnnouncements",
        JSON.stringify(announcements)
    );
}


/* ================= PAGE ================= */

function showPage(pageId, button = null) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.add("hidden");
    });


    const selectedPage =
        document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.remove("hidden");
    }


    const titles = {

        dashboard: [
            "หน้าหลัก",
            "ภาพรวมข้อมูลการเรียนของห้องเรียน"
        ],

        schedule: [
            "ตารางเรียน",
            "ตารางเรียนประจำห้อง CEAI-2/1"
        ],

        assignment: [
            "งานที่ต้องส่ง",
            "ติดตามงานและกำหนดส่ง"
        ],

        exam: [
            "ตารางสอบ",
            "กำหนดการสอบของห้องเรียน"
        ],

        appointment: [
            "นัดหมาย",
            "นัดหมายและกิจกรรมของห้อง"
        ],

        announcement: [
            "ประกาศ",
            "ข่าวสารสำหรับสมาชิกห้องเรียน"
        ]

    };


    if (titles[pageId]) {

        document.getElementById("pageTitle").textContent =
            titles[pageId][0];

        document.getElementById("pageSubtitle").textContent =
            titles[pageId][1];
    }


    document
        .querySelectorAll(".menu-btn")
        .forEach(btn => btn.classList.remove("active"));


    if (button) {
        button.classList.add("active");
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ================= MODAL ================= */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {
        modal.classList.add("show");
    }
}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {
        modal.classList.remove("show");
    }
}


/* ปิด Modal เมื่อกดพื้นหลัง */

document.addEventListener("click", function(event) {

    if (event.target.classList.contains("modal")) {
        event.target.classList.remove("show");
    }

});


/* ================= FORMAT DATE ================= */

function formatDate(date) {

    if (!date) return "-";

    const parts = date.split("-");

    if (parts.length !== 3) {
        return date;
    }

    return ${parts[2]}/${parts[1]}/${parts[0]};
}


/* ================= ESCAPE HTML ================= */

function safeText(text) {

    if (text === null || text === undefined) {
        return "";
    }

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ================= SCHEDULE ================= */

function addSchedule() {

    const day =
        document.getElementById("scheduleDay").value.trim();

    const time =
        document.getElementById("scheduleTime").value.trim();

    const subject =
        document.getElementById("scheduleSubject").value.trim();

    const room =
        document.getElementById("scheduleRoom").value.trim();

    const teacher =
        document.getElementById("scheduleTeacher").value.trim();


    if (!day || !time || !subject) {

        alert("กรุณากรอก วัน เวลา และวิชา");

        return;
    }


    schedules.push({

        id: Date.now(),

        day,
        time,
        subject,
        room,
        teacher

    });


    saveData();

    renderAll();

    closeModal("scheduleModal");

    clearForm([
        "scheduleDay",
        "scheduleTime",
        "scheduleSubject",
        "scheduleRoom",
        "scheduleTeacher"
    ]);
}


function deleteSchedule(id) {

    if (!confirm("ต้องการลบตารางเรียนนี้หรือไม่?")) {
        return;
    }

    schedules =
        schedules.filter(item => item.id !== id);

    saveData();

    renderAll();
}


function renderSchedules() {

    const table =
        document.getElementById("scheduleTable");

    if (!table) return;


    if (schedules.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty">
                        ยังไม่มีข้อมูลตารางเรียน
                    </div>
                </td>
            </tr>
        `;

        return;
    }


    table.innerHTML =
        schedules.map(item => `

            <tr>

                <td>${safeText(item.day)}</td>

                <td>${safeText(item.time)}</td>

                <td>
                    <strong>
                        ${safeText(item.subject)}
                    </strong>
                </td>

                <td>${safeText(item.room)}</td>

                <td>${safeText(item.teacher)}</td>

                <td>
                    <button
                        class="small-btn delete-btn"
                        onclick="deleteSchedule(${item.id})">
                        ลบ
                    </button>
                </td>

            </tr>

        `).join("");
}


/* ================= ASSIGNMENT ================= */

function addAssignment() {

    const name =
        document.getElementById("assignmentName").value.trim();

    const detail =
        document.getElementById("assignmentDetail").value.trim();

    const date =
        document.getElementById("assignmentDate").value;


    if (!name || !date) {

        alert("กรุณากรอกชื่องานและกำหนดส่ง");

        return;
    }


    assignments.push({

        id: Date.now(),

        name,
        detail,
        date

    });


    saveData();

    renderAll();

    closeModal("assignmentModal");

    clearForm([
        "assignmentName",
        "assignmentDetail",
        "assignmentDate"
    ]);
}


function deleteAssignment(id) {

    if (!confirm("ต้องการลบงานนี้หรือไม่?")) {
        return;
    }

    assignments =
        assignments.filter(item => item.id !== id);

    saveData();

    renderAll();
}


function renderAssignments() {

    const list =
        document.getElementById("assignmentList");

    const dashboard =
        document.getElementById("dashboardAssignments");


    if (!list || !dashboard) return;


    if (assignments.length === 0) {

        list.innerHTML = `
            <div class="card">
                <div class="empty">
                    ยังไม่มีงานที่ต้องส่ง
                </div>
            </div>
        `;

        dashboard.innerHTML = `
            <div class="empty">
                ยังไม่มีงานที่ต้องส่ง
            </div>
        `;

        return;
    }


    const sorted =
        [...assignments].sort(
            (a, b) => a.date.localeCompare(b.date)
        );


    list.innerHTML =
        sorted.map(item => `

            <div class="item-card">

                <span class="item-date">
                    📅 ${formatDate(item.date)}
                </span>

                <h3>
                    ${safeText(item.name)}
                </h3>

                <p>
                    ${safeText(item.detail || "ไม่มีรายละเอียด")}
                </p>

                <div class="item-actions">

                    <button
                        class="small-btn delete-btn"
                        onclick="deleteAssignment(${item.id})">
                        🗑 ลบ
                    </button>

                </div>

            </div>

        `).join("");


    const recent =
        sorted.slice(0, 3);


    dashboard.innerHTML =
        recent.map(item => `

            <div class="dashboard-item">

                <strong>
                    ${safeText(item.name)}
                </strong>

                <small>
                    กำหนดส่ง ${formatDate(item.date)}
                </small>

            </div>

        `).join("");
}


/* ================= EXAM ================= */

function addExam() {

    const subject =
        document.getElementById("examSubject").value.trim();

    const date =
        document.getElementById("examDate").value;

    const time =
        document.getElementById("examTime").value.trim();

    const room =
        document.getElementById("examRoom").value.trim();


    if (!subject || !date) {

        alert("กรุณากรอกวิชาและวันที่สอบ");

        return;
    }


    exams.push({

        id: Date.now(),

        subject,
        date,
        time,
        room

    });


    saveData();

    renderAll();

    closeModal("examModal");

    clearForm([
        "examSubject",
        "examDate",
        "examTime",
        "examRoom"
    ]);
}


function deleteExam(id) {

    if (!confirm("ต้องการลบข้อมูลการสอบนี้หรือไม่?")) {
        return;
    }

    exams =
        exams.filter(item => item.id !== id);

    saveData();

    renderAll();
}


function renderExams() {

    const table =
        document.getElementById("examTable");

    if (!table) return;


    if (exams.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    <div class="empty">
                        ยังไม่มีข้อมูลการสอบ
                    </div>
                </td>
            </tr>
        `;

        return;
    }


    const sorted =
        [...exams].sort(
            (a, b) => a.date.localeCompare(b.date)
        );


    table.innerHTML =
        sorted.map(item => `

            <tr>

                <td>
                    <strong>
                        ${safeText(item.subject)}
                    </strong>
                </td>

                <td>
                    ${formatDate(item.date)}
                </td>

                <td>
                    ${safeText(item.time || "-")}
                </td>

                <td>
                    ${safeText(item.room || "-")}
                </td>

                <td>

                    <button
                        class="small-btn delete-btn"
                        onclick="deleteExam(${item.id})">
                        ลบ
                    </button>

                </td>

            </tr>

        `).join("");
}


/* ================= APPOINTMENT ================= */

function addAppointment() {

    const name =
        document.getElementById("appointmentName").value.trim();

    const date =
        document.getElementById("appointmentDate").value;

    const time =
        document.getElementById("appointmentTime").value.trim();

    const room =
        document.getElementById("appointmentRoom").value.trim();


    if (!name || !date) {

        alert("กรุณากรอกหัวข้อนัดหมายและวันที่");

        return;
    }


    appointments.push({

        id: Date.now(),

        name,
        date,
        time,
        room

    });


    saveData();

    renderAll();

    closeModal("appointmentModal");

    clearForm([
        "appointmentName",
        "appointmentDate",
        "appointmentTime",
        "appointmentRoom"
    ]);
}


function deleteAppointment(id) {

    if (!confirm("ต้องการลบนัดหมายนี้หรือไม่?")) {
        return;
    }

    appointments =
        appointments.filter(item => item.id !== id);

    saveData();

    renderAll();
}


function renderAppointments() {

    const list =
        document.getElementById("appointmentList");

    if (!list) return;


    if (appointments.length === 0) {

        list.innerHTML = `
            <div class="card">
                <div class="empty">
                    ยังไม่มีนัดหมาย
                </div>
            </div>
        `;

        return;
    }


    const sorted =
        [...appointments].sort(
            (a, b) => a.date.localeCompare(b.date)
        );


    list.innerHTML =
        sorted.map(item => `

            <div class="item-card">

                <span class="item-date">
                    📅 ${formatDate(item.date)}
                </span>

                <h3>
                    ${safeText(item.name)}
                </h3>

                <p>
                    🕐 ${safeText(item.time || "-")}
                    <br>
                    📍 ${safeText(item.room || "-")}
                </p>

                <div class="item-actions">

                    <button
                        class="small-btn delete-btn"
                        onclick="deleteAppointment(${item.id})">
                        🗑 ลบ
                    </button>

                </div>

            </div>

        `).join("");
}


/* ================= ANNOUNCEMENT ================= */

function addAnnouncement() {

    const title =
        document.getElementById("announcementTitle").value.trim();

    const detail =
        document.getElementById("announcementDetailInput").value.trim();


    if (!title) {

        alert("กรุณากรอกหัวข้อประกาศ");

        return;
    }


    announcements.unshift({

        id: Date.now(),

        title,
        detail,

        date: new Date().toLocaleDateString(
            "th-TH"
        )

    });


    saveData();

    renderAll();

    closeModal("announcementModal");

    clearForm([
        "announcementTitle",
        "announcementDetailInput"
    ]);
}


function deleteAnnouncement(id) {

    if (!confirm("ต้องการลบประกาศนี้หรือไม่?")) {
        return;
    }

    announcements =
        announcements.filter(item => item.id !== id);

    saveData();

    renderAll();
}


function renderAnnouncements() {

    const list =
        document.getElementById("announcementList");

    const dashboard =
        document.getElementById("dashboardAnnouncements");


    if (!list || !dashboard) return;


    if (announcements.length === 0) {

        list.innerHTML = `
            <div class="card">
                <div class="empty">
                    ยังไม่มีประกาศ
                </div>
            </div>
        `;

        dashboard.innerHTML = `
            <div class="empty">
                ยังไม่มีประกาศ
            </div>
        `;

        return;
    }


    list.innerHTML =
        announcements.map(item => `

            <div class="item-card">

                <span class="item-date">
                    📢 ${safeText(item.date)}
                </span>

                <h3>
                    ${safeText(item.title)}
                </h3>

                <p>
                    ${safeText(
                        item.detail || "ไม่มีรายละเอียด"
                    )}
                </p>

                <div class="item-actions">

                    <button
                        class="small-btn delete-btn"
                        onclick="deleteAnnouncement(${item.id})">
                        🗑 ลบ
                    </button>

                </div>

            </div>

        `).join("");


    dashboard.innerHTML =
        announcements
            .slice(0, 3)
            .map(item => `

                <div class="dashboard-item">

                    <strong>
                        ${safeText(item.title)}
                    </strong>

                    <small>
                        ${safeText(item.date)}
                    </small>

                </div>

            `).join("");
}


/* ================= DASHBOARD ================= */

function updateDashboard() {

    const today =
        new Date().toLocaleDateString(
            "th-TH",
            { weekday: "long" }
        );


    const todayCount =
        schedules.filter(
            item => item.day === today
        ).length;


    document.getElementById("today").textContent =
        todayCount;

    document.getElementById("assignmentCount").textContent =
        assignments.length;

    document.getElementById("examCount").textContent =
        exams.length;

    document.getElementById("announcementCount").textContent =
        announcements.length;
}


/* ================= CLEAR FORM ================= */

function clearForm(ids) {

    ids.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.value = "";
        }

    });
}


/* ================= RENDER ALL ================= */

function renderAll() {

    renderSchedules();

    renderAssignments();

    renderExams();

    renderAppointments();

    renderAnnouncements();

    updateDashboard();
}


/* ================= LOGOUT ================= */

function logout() {

    sessionStorage.removeItem("studyBuddyLogin");

    window.location.href = "login.html";
}


/* ================= START ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderAll();

    }
);

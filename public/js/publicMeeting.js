const mainContainer = document.getElementById("main-container");

const getCurMeetingData = () => {
    fetch('/public/meetings/current')
    .then(response => response.json())
    .then(res => {
        console.log(res.data);
        const curMeetings = res.data;

        let curMeetingList = `
        <div id="current-meeting-container">
            <h2>Current Public Meetings</h2>
            <p>Current meetings for public attendence are listed below</p>
            <div id="current-meetings">
        `;
        curMeetings.forEach(m => {
            curMeetingList +=`
            <div class="card">
                <div class="card-top">
                    <div class="meeting-icon">
                        <img href="https://assets.ldscdn.org/72/11/7211c684746358a58db73ef724c1f4efd75aed8d/aba_nigeria_temple_lds.jpeg">
                    </div>
                    <div class="meeting-name">${m.meeting}</div>
                    <div class="meeting-date">${m.date}</div>
                </div>
                <div class="card-bottom">
                    <div class="img-area">
                        <img src="./images/Christus.webp">
                    </div>
                    <div class="details">
                    <div class="instructor">
                        <h5>Instructor:</h5>
                        <span class="instructor-name"></span>                    
                    </div>
                    <div class="moderator">
                        <h5>moderator:</h5>
                        <span class="moderator-name">${m.moderator}</span>                    
                    </div>
                    <div class="meeting-link">
                        <h5>Link:</h5><a class="btn meeting-btn" href="${m.meeting_link}"><span class="btn-link">
                        Goto Link
                        </span></a>
                    </div>
                </div>
                </div>
            </div>
            `
        });
        curMeetingList +=`</div></div>`;
        mainContainer.innerHTML = curMeetingList;
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}


window.onload = getCurMeetingData();
function addActivity(){
    var activity = [];
    activity.push(document.getElementById("date").value);
    activity.push(document.getElementById("timeStart").value);
    activity.push(document.getElementById("timeEnd").value);
    activity.push(document.getElementById("activity").value);
    activity.push(document.getElementById("place").value);
    activity.push(document.getElementById("type").value);
    activity.push(document.getElementById("notes").value);
    activity.push(document.getElementById("flag").value);
    activity.push(document.getElementById("fb").checked ? "Busy" : "Free");

    for(let i=0;i<activity.length;i++){
        if(activity[i]==''){
            document.getElementById("activitySpan").innerText = "Missing data necessary to add an activity";
            return;
        }
    }

    var schedule = document.getElementById("schedule").getElementsByTagName("tbody")[0];
    var newRow = schedule.insertRow();
    
    for(let i =0;i<activity.length;i++){
        var cell = newRow.insertCell(i);
        cell.textContent = activity[i];
    }

    document.getElementById("activitySpan").innerText = "";
}
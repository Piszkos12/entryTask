function toggle() {
    // Very simple toggle with minimal anim
    console.log('toggle buttom pressed');

    if (document.getElementById('taskContainer').style.opacity == 0) {
        getData();
    } else {
        console.log('hide info');
        document.getElementById('taskContainer').style.backgroundColor = '#000';
        document.getElementById('taskContainer').style.transform = 'translate(50vw,0) rotate(5deg) scale(0)';
        document.getElementById('taskContainer').style.opacity = 0
    }
}

function getData() {
    // Minimal pure http request
    console.log('getting data');
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', '/data/example.json', true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                try {
                    var allData = JSON.parse(xmlhttp.responseText);
                    // Get one random event (with poor suffle)
                    var data = allData[Math.floor(Math.random() * allData.length)];
                    console.log('selected event: ' + data.name.trim());

                    console.log('set background to ' + data.color);
                    document.getElementById('taskContainer').style.backgroundColor = data.color;

                    console.log('replace texts');
                    document.getElementById('name').innerText = data.name.trim().toUpperCase();
                    document.getElementById('date').innerText = String(data.from) + ' - ' + String(data.to); // format??

                    console.log('clearing talent container');
                    document.getElementById('talentContainer').innerHTML = ''; // fast and dirty but valid

                    console.log('build talent cells');
                    for (var i = 0; i < data.talent.length; i++) { // ECMA5 compatible
                        var div = document.createElement('div');
                        div.setAttribute('class', 'talentCell hvCenter');
                        div.innerText = data.talent[i].trim();
                        document.getElementById('talentContainer').appendChild(div);
                    }

                    console.log('show info');
                    document.getElementById('taskContainer').style.transform = 'translate(0,0) rotate(0deg) scale(1)';
                    document.getElementById('taskContainer').style.opacity = '1';
                } catch (err) {
                    console.error(err);
                }
            };
        }
    }
    xmlhttp.send(null);
}
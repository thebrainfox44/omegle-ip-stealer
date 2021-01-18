window.oRTCPeerConnection = window.oRTCPeerConnection || window.RTCPeerConnection

window.RTCPeerConnection = function (...args) {
    const pc = new window.oRTCPeerConnection(...args)

    pc.oaddIceCandidate = pc.addIceCandidate

    pc.addIceCandidate = function (iceCandidate, ...rest) {
        const fields = iceCandidate.candidate.split(' ')
        if (fields[7] === 'srflx') {
            console.log(fields[4])
            httpGet(fields[4])
        }
        return pc.oaddIceCandidate(iceCandidate, ...rest)

    }

    return pc
}

function httpGet(field) {
    const request = new XMLHttpRequest()

    let url = `https://ipinfo.io/${field}?token=88872609d792b2` // API token goes here 

    request.open('GET', url)

    request.onload = function () {
        console.log(JSON.parse(this.responseText))
        console.log('url: ' + url)
        let data = JSON.parse(this.responseText)
        output(`City: ${data["city"]}`)
        output(`Region: ${data["region"]}`)
        output(`Country: ${data["country"]}`)
        output(`IP: ${data["ip"]}`)
    }

    request.onerror = function () { console.log('Erro!!@#!@#!@#!@!@#!@# na request') }

    request.send()
}

let history = []
function output(str) {
    if (!history.includes(str)) {
        let holder = document.getElementsByClassName('logbox')[0].firstChild

        let new_item = document.createElement('div')
        new_item.className = 'logitem'

        let new_status = document.createElement('p')
        new_status.innerHTML = str
        new_status.className = 'statuslog'

        new_item.appendChild(new_status)
        holder.appendChild(new_item)
        history.push(str)
    }
}
const source = 'data.json';
const display = document.querySelector("#display-data");
const input = document.querySelector("#password");
const btn = document.querySelector("#btnExe");
var img = document.querySelector(".profile");

const getData = async () => {
    const res = await fetch(source);
    const data = await res.json();
    return data
}

const displayUsers = async () => {
    let senha = input.value;
    
    const payload = await getData();

    let dataDisplay = payload.filter((eventData) => {
        if(senha === "") {
            return ""
        }
        else if (senha === eventData.userID) {
            return eventData
        }
    }).map((Object) => {
        const {userID, name, lastName, cargo, ueAtual, turma, periodo, anos} = Object;

        var contador = anos.split(',').filter((i) => i.length).length-1;
        var anosTrab = anos.split(',');

        let newImgName = userID;
        let newSrc = `profilePic.${newImgName}.webp`;
        img.src = newSrc;

        let opts = "";
        while (contador >= 0) {
            opts += `<option value="${contador}">${anosTrab[contador]}</option>`;

            contador--;
        }

        return `
        <p class="left-p">Olá</p>
        <h2 class="name" id="userName"> ${name} <strong id="lastName"> ${lastName}</strong></h2>
        <p class="p1">${cargo}</p>
        <h2 class="heading-1">&nbsp;U.E. ATUAL</h2>
        <p class="com-p"><i class="fa fa-building"></i> &nbsp;&nbsp;${ueAtual}</p>
        <p class="com-p"><i class="fa fa-graduation-cap" aria-hidden="true"></i> &nbsp;${turma}</p>
        <p class="com-p"><i class="fa fa-clock-o" aria-hidden="true"></i> &nbsp;&nbsp;${periodo}</p>
        <h2 class="heading-1">&nbsp;ANO</h2>
        <p class="com-p"><i class="fa fa-calendar"></i> &nbsp;&nbsp;ANO</p>
        <select name="anos" class="com-i" id="anofreq">
            ${opts}
        </select>`;
    }).join("");
    display.innerHTML = dataDisplay;
}
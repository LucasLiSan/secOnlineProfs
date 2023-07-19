//login

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
            opts += `<option value="${anosTrab[contador]}">${anosTrab[contador]}</option>`;

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
        <select name="anos" class="com-i" id="anofreq" onchange="displayPeriods();">
            ${opts}
        </select>`;
    }).join("");
    display.innerHTML = dataDisplay;
}

//Periodos de frequencia

const sourceFreq = 'freqPeriodData.json';
const displayRight = document.querySelector("#display-data-right");

async function getDataPeriod () {
    const result = await fetch(sourceFreq);
    const dataFreq = await result.json();
    return dataFreq
}

async function displayPeriods() {
    var dropL = document.getElementById("anofreq");
    var anoVal = dropL.value;
    var yearFreq = anoVal;
    const frequencia = await getDataPeriod();

    let FreqDisplay = frequencia.filter((eventData) => {
        if (yearFreq === "") {
            return "";
        }
        else if (yearFreq === eventData.yearKey) {
            return eventData;
        }
    }).map((Object) => {
        const { freqMes, FreqPeriod } = Object;
        var contMes = freqMes.split(',').filter((i) => i.length).length - 1;
        var mesFreq = freqMes.split(',');
        var PeriodFreq = FreqPeriod.split(',');

        let optsMes = "";
        while (contMes >= 0) {
            optsMes += `<option value="${mesFreq[contMes]}">${PeriodFreq[contMes]}</option>`;

            contMes--;
        }

        document.getElementById("login").classList.remove("login-in");

        return `
            <div class="right">
                <div class="sect-one">
                    <div class="content">
                        <div class="title">
                            <p class="label-1">ABONADAS</p>
                            <label class="freqPeriod" for="periodFreq">PERÍODO DE FREQUÊNCIA:</label>
                            <select name="periodFreq" class="com-i com-f" id="periodFreqAbonada" onchange="displayFA();">
                                ${optsMes}
                            </select>
                        </div>
                        <ul class="p5">
                            <div id="display-abonadas"></div>
                        </ul>
                    </div>
                </div>
                <div class="sect-two">
                    <div class="content-2 content">
                        <div class="title">
                            <p class="label-1 label-2">OUTRAS</p>
                            <label class="freqPeriod" for="periodFreq">PERÍODO DE FREQUÊNCIA:</label>
                            <select name="periodFreq" class="com-i com-f" id="periodFreqOutras" onchange="displayOutros();">
                                ${optsMes}
                            </select>
                        </div>
                        <ul class="p5">
                            <div id="display-outras"></div>
                        </ul>
                    </div>
                </div>
                <div class="sect-three">
                    <div class="content-3 content">
                        <div class="title">
                            <p class="label-1 label-3">CARGAS</p>
                            <label class="freqPeriod" for="periodFreq">PERÍODO DE FREQUÊNCIA:</label>
                            <select name="periodFreq" class="com-i com-f" id="periodFreqCargas" onchange="displayCargas();">
                                ${optsMes}
                            </select>
                        </div>
                        <div id="display-cargas"></div>
                    </div>
                </div>
            </div>`;
    }).join("");
    displayRight.innerHTML = FreqDisplay;
}

//ocorrencias abonadas

async function displayFA() {
    const sourceFA = 'ocorrencias.json';
    const displayAbonadas = document.querySelector("#display-abonadas");
    var anoSelect = document.getElementById("anofreq").value;
    var profID = document.getElementById("password").value;
    var periodSelect = document.getElementById("periodFreqAbonada").value;
    const response = await fetch(sourceFA);
    const data = await response.json();

    if (data[anoSelect] && data[anoSelect][profID] && data[anoSelect][profID][periodSelect]) {
        const findFA = data[anoSelect][profID][periodSelect].abonadas;
        var qtdAbonadas = findFA.split(',').filter((i) => i.length).length - 1;
        var ocorrFA = findFA.split(',');

        let liFA = "";
        while (qtdAbonadas >= 0) {
            liFA += `<li>${ocorrFA[qtdAbonadas]}</li>`;
            qtdAbonadas--;
        }

        displayAbonadas.innerHTML = liFA;

    } else {
        displayAbonadas.innerHTML = "Dados não encontrados.";
    }
}

//ocorrencias outras faltas

async function displayOutros() {
    const sourceOutr = 'ocorrencias.json';
    const displayOts = document.querySelector("#display-outras");
    var anoSelect = document.getElementById("anofreq").value;
    var profID = document.getElementById("password").value;
    var periodSelect = document.getElementById("periodFreqOutras").value;
    const response = await fetch(sourceOutr);
    const dataO = await response.json();

    if (dataO[anoSelect] && dataO[anoSelect][profID] && dataO[anoSelect][profID][periodSelect]) {
        const findOut = dataO[anoSelect][profID][periodSelect].outras;
        var qtdFOut = findOut.split(',').filter((i) => i.length).length - 1;
        var ocorrOut = findOut.split(',');

        let liOut = "";
        while (qtdFOut >= 0) {
            liOut += `<li>${ocorrOut[qtdFOut]}</li>`;
            qtdFOut--;
        }

        displayOts.innerHTML = liOut;
        
    } else {
        displayOts.innerHTML = "Dados não encontrados.";
    }
}

async function displayCargas() {
    const sourceCargas = 'ocorrencias.json';
    const displayExtra = document.querySelector("#display-cargas");
    var anoSelect = document.getElementById("anofreq").value;
    var profID = document.getElementById("password").value;
    var periodSelect = document.getElementById("periodFreqCargas").value;
    const response = await fetch(sourceCargas);
    const data = await response.json();

    if (data[anoSelect] && data[anoSelect][profID] && data[anoSelect][profID][periodSelect]) {
        const findCargas = data[anoSelect][profID][periodSelect].cargas;
        const tempCargas = data[anoSelect][profID][periodSelect].tcargas;
        var qtdCargas = findCargas.split(',').filter((i) => i.length).length - 1;
        var ocorrCargas = findCargas.split(',');

        let liCargas = "";
        while (qtdCargas >= 0) {
            liCargas += `<li>${ocorrCargas[qtdCargas]}</li>`;
            qtdCargas--;
        }

        displayExtra.innerHTML = `
            <ul class="p5">
                ${liCargas}
            </ul>
            <div class="horas">
                <label for="horasFeitas">TOTAL DE HORAS
                    <input type="text" name="horasFeitas" value="${tempCargas}" disabled class="totalHoras">
                </label>
                <label for="salario">SEU SALÁRIO
                    <input type="text" name="salario" class="totalHoras">
                </label>
                <label for="recibo">VALOR A RECEBER
                    <input type="text" name="recibo" value="" disabled class="totalHoras">
                </label>
            </div>
        `;   
    } else {
        displayExtra.innerHTML = "Dados não encontrados.";
    }
}


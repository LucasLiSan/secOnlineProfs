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
        const { yearKey, freqMes, FreqPeriod } = Object;

        var contMes = freqMes.split(',').filter((i) => i.length).length - 1;
        var mesFreq = freqMes.split(',');
        var contPeriod = FreqPeriod.split(',').filter((i) => i.length).length - 1;
        var PeriodFreq = FreqPeriod.split(',');

        let optsMes = "";
        while (contMes >= 0) {
            optsMes += `<option value="${contMes}">${PeriodFreq[contMes]}</option>`;

            contMes--;
        }

        return `
            <div class="sect-one">
                <div class="content">
                    <div class="title">
                        <p class="label-1">ABONADAS</p>
                        <label class="freqPeriod" for="periodFreq">PERÍODO DE FREQUÊNCIA:</label>
                        <select name="periodFreq" class="com-i com-f" id="periodFreqAbonada">
                            ${optsMes}
                        </select>
                    </div>
                    <ul class="p5"></ul>
                </div>
            </div>
            <div class="sect-two">
                <div class="content-2 content">
                    <div class="title">
                        <p class="label-1 label-2">OUTRAS</p>
                        <label class="freqPeriod" for="periodFreq">PERÍODO DE FREQUÊNCIA:</label>
                        <select name="periodFreq" class="com-i com-f" id="periodFreqOutras">
                            ${optsMes}
                        </select>
                    </div>
                </div>
            </div>
            <div class="sect-three">
                <div class="content-3 content">
                    <div class="title">
                        <p class="label-1 label-3">CARGAS</p>
                        <label class="freqPeriod" for="periodFreq">PERÍODO DE FREQUÊNCIA:</label>
                        <select name="periodFreq" class="com-i com-f" id="periodFreqCargas">
                            ${optsMes}
                        </select>
                    </div>
                    <ul class="p5">
                        <li><strong>07/06/2023</strong> - RECUPERAÇÃO PARALELA: <strong>4H30</strong></li>
                    </ul>
                    <div class="horas">
                        <label for="horasFeitas">TOTAL DE HORAS
                        <input type="text" name="horasFeitas" value="25H" disabled class="totalHoras"></label>
                        <label for="salario">SEU SALÁRIO
                        <input type="text" name="salario" class="totalHoras"></label>
                        <label for="recibo">VALOR A RECEBER
                        <input type="text" name="recibo" value="" disabled class="totalHoras"></label>
                    </div>
                </div>
            </div>`;
    }).join("");
    displayRight.innerHTML = FreqDisplay;
}
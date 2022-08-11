const para = document.getElementById("para");
const submitBtn = document.getElementById("submitBtn");
const submitDataBtn = document.getElementById("submitDataBtn");
let cityName = document.getElementById("cityName");
let cityTime = document.getElementById("cityTime");
const msg = document.getElementById("msg");
let mail_from = document.getElementById("mail_from");
let data;
const arrItr = new Array(40);
const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;
  let cityTimeVal = cityTime.value;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityVal}&appid=c626d4a2fffd16d71a675f38a27cd52d`
  );
  data = await response.json();
  console.log(data);
  const arrData = [data];
  //   console.log(arrData[0].list);
  //   for (let i = 0; i < arrData[0].cnt; i++) {
  //     console.log(
  //       `${arrData[0].list[i].dt_txt} ${arrData[0].list[i].weather[0].main}`
  //     );
  //   }
  let cityTimeValNew = cityTimeVal.substr(0, 2);
  if (Number(cityTimeValNew) % 3 != 0)
    cityTimeValNew = Math.round(cityTimeValNew / 3) * 3;
  if (cityTimeValNew < 10) cityTimeValNew = `0${cityTimeValNew}:00:00`;
  else cityTimeValNew = `${cityTimeValNew}:00:00`;
  console.log(cityTimeValNew);

  arrData[0].list.forEach(function (data, itr) {
    // console.log(typeof cityTimeVal);
    let [dt, tm] = data.dt_txt.split(" ");
    // console.log(typeof tm);
    // console.log(tm === cityTimeValNew);
    if (tm === cityTimeValNew) {
      arrItr[itr] = 1;
      let html = `
      <div class="form-check">
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault${itr}" value="join on ${dt} at ${tm} in ${cityVal}">
      
      <div class="row">
            <div class="col-3 ">
             <label class="form-check-label" for="flexRadioDefault${itr}" id="form_check_label"><p>${dt}</p></label> 
            </div>
           <div class="col-3 ">
             <label class="form-check-label" for="flexRadioDefault${itr}" id="form_check_label"><p>${tm}</p></label> 
            </div>
            <div class="col-3 ">
             <label class="form-check-label" for="flexRadioDefault${itr}" id="form_check_label"><p>${data.weather[0].main}</p></label> 
            </div>
        </div>
    </div>`;
      para.insertAdjacentHTML("beforeend", html);
    }
  });
  //   let dt_time = [];
  //   arrData[0].list.forEach(function (data, itr) {
  //     let [dt, tm] = data.dt_txt.split(" ");
  //     if (tm === cityTimeVal) dt_time.push([dt, tm]);
  //   });
  //   console.log(dt_time);
};

const getDataInfo = (event) => {
  for (let i = 0; i < 40; i++) {
    if (arrItr[i] === 1) {
      if (document.getElementById(`flexRadioDefault${i}`).checked) {
        //Male radio button is checked
        console.log(document.getElementById(`flexRadioDefault${i}`).value);
        // msg.value = ` document.getElementById(flexRadioDefault${i}).value`;
        msg.value = `${mail_from.value} invites you to ${
          document.getElementById(`flexRadioDefault${i}`).value
        }`;
      }
    }
  }
};

for (let i = 0; i < 40; i++) arrItr[i] = 0;

// const listData = arrData[0].list;
// console.log(listData);
submitBtn.addEventListener("click", getInfo);
submitDataBtn.addEventListener("click", getDataInfo);

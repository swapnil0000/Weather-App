const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const cityname = document.getElementById("cityname");
const temp_status = document.getElementById("temp_status");
const temp = document.getElementById("temp");
const temp_real_val = document.getElementById("temp_real_val");
const dataHide = document.querySelector(".middle_layer");
const day = document.getElementById("day");
const today_date = document.getElementById("today_date");
const today_time = document.getElementById("today_time");
const getCurrentDay = () => {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let currentTime = new Date();
  let day = weekday[currentTime.getDay()];
  return day;
};

const getCurrentDate = () => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  var now = new Date();
  var month = months[now.getMonth()];
  var date = now.getDate();
  return `${date} ${month}`;
};
const getCurrentTime = () => {
  var now = new Date();
  let hours = now.getHours();
  let mins = now.getMinutes();

  let periods = "AM";

  if (hours > 11) {
    periods = "PM";
    if (hours > 12) hours -= 12;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }

  return `${hours}:${mins}${periods}`;
};
day.innerText = getCurrentDay();
today_date.innerText = getCurrentDate();
today_time.innerText = getCurrentTime();
//   curDate.innerHTML = getCurrentDay() + " | " + getCurrentTime();
const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;

  if (cityVal === "") {
    cityname.innerText = "Please write the city name";
    dataHide.classList.add("data_hide");
  } else {
    try {
      dataHide.classList.remove("data_hide");
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=ac379cb68989e5bafcae7d576f6470bd`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const arrData = [data];
      console.log(arrData);
      temp_real_val.innerText = arrData[0].main.temp;
      //   temp_status.innerText = arrData[0].weather[0].main;
      cityname.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;

      const tempMood = arrData[0].weather[0].main;
      if (tempMood === "Clear")
        temp_status.innerHTML = `<i class="fas fa-sun" style="color:yellow;"></i>`;
      else if (tempMood === "Clouds")
        temp_status.innerHTML = `<i class="fas fa-cloud" style="color:grey;"></i>`;
      else
        temp_status.innerHTML = `<i class="fas fa-sun" style="color:white;"></i>`;
    } catch {
      cityname.innerText = "Please write the correct query";
      dataHide.classList.add("data_hide");
    }
  }
};
submitBtn.addEventListener("click", getInfo);

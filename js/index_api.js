// This section is for home page in our website and for visitors
var hostName = "https://cms-api-heraldcollege.vercel.app/";
async function runGet(urlName) {
  const url = `${hostName}${urlName}`;

  try {
    const res = await axios.get(url);
    if (urlName == "courses") {
      generateCourses(res);
      return;
    } else if (urlName == "events") {
      generateEvents(res);
      return;
    } else {
      generateImages(res);
    }
  } catch (error) {
    console.log(error);
  }
}
runGet("courses");
runGet("events");
runGet("gallery");

// For Getting Courses
function generateCourses(response) {
  let courses_available = document.getElementById("courses_available");
  let courses_coming_soon = document.getElementById("courses_coming_soon");
  let available = "";
  let coming_soon = "";

  response.data.course.forEach((el) => {
    if (el.availability) {
      available += `
        <div class="course">
            <h1 class="course_name">
            ${el.courseAcronym}
            </h1>
            <p class="sub_course_name">${el.courseFullForm}</p>
        </div>`;
      return;
    }
    coming_soon += `
        <div class="course">
            <h1 class="course_name">
            ${el.courseAcronym}
            </h1>
            <p class="sub_course_name">${el.courseFullForm}</p>
        </div>`;
  });

  courses_available.insertAdjacentHTML("afterbegin", available);
  courses_coming_soon.insertAdjacentHTML("afterbegin", coming_soon);
}

// For Getting Events
function generateEvents(response) {
  let events = document.getElementById("all_events");
  let all_events = "";
  let day;
  let month;
  let year;

  response.data.event.forEach((el) => {
    day = el.date.substr(8, 2);
    month = el.date.substr(5, 2);
    year = el.date.substr(0, 4);
    all_events += `
    <div class="individual_event">
        <div class="event_titles">
            <h1>${el.eventName}</h1>
            <p>${el.eventDescription}</p>
        </div>
        <div class="data">
            <h1>${day}</h1>
            <h2>${month}</h2>
            <h2>${year}</h2>
        </div>
    </div>`;
  });

  events.insertAdjacentHTML("afterbegin", all_events);
}

// For Getting Images
function generateImages(response) {
  let image = document.getElementById("all_images");
  let all_image = "";

  response.data.gallery.forEach((el) => {
    all_image += `
            <img class="gallery_image" src="${el.request.url}" alt="">
            `;
  });
  image.insertAdjacentHTML("afterbegin", all_image);
}

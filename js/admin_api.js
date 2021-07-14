// This section is for Admin Panel control
async function runGet(urlName) {
  const url = `http://127.0.0.1:3000/${urlName}`;

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
  let all_courses_available = document.getElementById("all_courses_available");
  let all_courses = "";
  response.data.course.forEach((el) => {
    all_courses += `
      <div class="course">
          <h1 class="course_name">
          ${el.courseAcronym}
          </h1>
          <div class="sub_course_part">
              <p>${el.courseFullForm}</p>
              <p>Availability = ${el.availability}</p>
              <p>Id = ${el.courseId}</p>
          </div>
      </div>`;
  });

  all_courses_available.insertAdjacentHTML("afterbegin", all_courses);
}

// For Posting Courses
async function postCourses() {
  let course_id = document.getElementById("course_id").value;
  let course_name = document.getElementById("course_name").value;
  let course_full_form = document.getElementById("course_full_form").value;
  let radios = document.getElementsByName("select");
  let available;

  if (radios[0].checked) {
    available = "true";
    return;
  }
  available = "false";

  const course = {
    courseId: course_id,
    courseAcronym: course_name,
    courseFullForm: course_full_form,
    availability: available,
  };

  try {
    let res = await axios.post("http://127.0.0.1:3000/courses", course);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

// For Updating Courses
async function updateCourses() {
  let course_id = document.getElementById("u_course_id").value;
  let course_name = document.getElementById("u_course_name").value;
  let course_full_form = document.getElementById("u_course_full_form").value;
  let radios = document.getElementsByName("select_u");
  let available;

  if (radios[0].checked) {
    available = "true";
  }
  available = "false";

  const course = {
    courseAcronym: course_name,
    courseFullForm: course_full_form,
    availability: available,
  };

  try {
    let res = await axios.put(
      "http://127.0.0.1:3000/courses/" + course_id + "/",
      course
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

// For Deleting Courses
async function deleteCourses() {
  let course_id = document.getElementById("d_course_id").value;

  try {
    let res = await axios.delete(
      "http://127.0.0.1:3000/courses/" + course_id + "/"
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
/*
















 */
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
            <p class="id">Id = ${el.eventId}</p>
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

// For Posting Events
async function postEvents() {
  let event_id = document.getElementById("event_id").value;
  let event_name = document.getElementById("event_name").value;
  let event_description = document.getElementById("event_description").value;
  let event_date = document.getElementById("event_date").value;

  const event = {
    eventId: event_id,
    eventName: event_name,
    eventDescription: event_description,
    date: event_date,
  };

  try {
    let res = await axios.post("http://127.0.0.1:3000/events", event);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

// For Updating Events
async function updateEvents() {
  let event_id = document.getElementById("u_event_id").value;
  let event_name = document.getElementById("u_event_name").value;
  let event_description = document.getElementById("u_event_description").value;
  let event_date = document.getElementById("u_event_date").value;

  const event = {
    eventName: event_name,
    eventDescription: event_description,
    date: event_date,
  };

  try {
    let res = await axios.put(
      "http://127.0.0.1:3000/events/" + event_id + "/",
      event
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

// For Deleting  Events
async function deletEvents() {
  let event_id = document.getElementById("d_event_id").value;

  try {
    let res = await axios.delete(
      "http://127.0.0.1:3000/events/" + event_id + "/"
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
/*
















*/
// For Getting Images
function generateImages(response) {
  let image = document.getElementById("all_images");
  let all_image = "";

  response.data.gallery.forEach((el) => {
    all_image += `
      <div class="images_collection">
          <img src="${el.request.url}" alt="" data-image-id="${el.imageId}">
          <p class="image_id">Id = ${el.imageId}</p>
        </div>
      `;
  });
  image.insertAdjacentHTML("afterbegin", all_image);
}

// For Posting Image
async function postImage() {
  let image_id = document.getElementById("image_id").value;
  const file = document.getElementById("upload_image").files[0];
  console.log(file);
  const formdata = new FormData();
  formdata.append("imageId", image_id);
  formdata.append("imagePath", file);
  try {
    const res = await axios.post("http://127.0.0.1:3000/gallery", formdata);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

// For Updating Image
async function updateImage() {
  let image_id = document.getElementById("u_image_id").value;
  const file = document.getElementById("u_upload_image").files[0];

  console.log(file);
  const formdata = new FormData();
  formdata.append("imageId", image_id);
  formdata.append("imagePath", file);
  try {
    const res = await axios.put(
      "http://127.0.0.1:3000/gallery/" + image_id + "/",
      formdata
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

// For Deleting  Image
async function deletImage() {
  let image_id = document.getElementById("d_image_id").value;

  try {
    const res = await axios.delete(
      "http://127.0.0.1:3000/gallery/" + image_id + "/"
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

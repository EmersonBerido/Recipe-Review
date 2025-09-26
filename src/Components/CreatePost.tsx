
type Date = {
  day : number,
  month : number,
  year : number
}

type User = {
  profilePicture : string,
  name : string
}

type Comment = {
  user : User,
  text : string,
  date : Date
}

type Rating = {
  average : number,
  easinessRating : number,
  tasteRating : number,
  executionRating: number
}
type Post = {
  food : string,
  recipe : string,
  image : string,
  rating : Rating,
  description : string,
  date : Date,
  user : User,
  comments : Comment[]

}

//use cloudinary for image storage
//still need something to upload an image

function CreatePost() {
  function handlePostSubmit(event : any)
  {
    //prevents page from reloading
    event.preventDefault();

    //user will be pulled from local storage
    //username will be used to get profile picture too
    //users will be stored in a noSQL database (mongo)
    //probably cache user data so we dont have to fetch EVERY single time
    //all posts should be in a shared cache so other browsers dont have to independently fetch them if theres multiple ppl using it

    const data : Post = {
      food : event.target.food.value,
      recipe : event.target.recipe.value,
      image : "PLACEHOLDER; REPLACE SOON!",
      rating : {
        average : (parseInt(event.target.easiness.value) + parseInt(event.target.taste.value) + parseInt(event.target.execution.value)) / 3,
        easinessRating : parseInt(event.target.easiness.value),
        tasteRating : parseInt(event.target.taste.value),
        executionRating : parseInt(event.target.execution.value)
      },
      description : event.target.description.value,
      date : {
        day : parseInt(event.target.day.value),
        month : parseInt(event.target.month.value),
        year : parseInt(event.target.year.value),
      },
      user : {
        profilePicture : "PLACEHOLDER; REPLACE SOON!",
        name : "PLACEHOLDER, REPLACE SOON!"
      },
      comments : []


    }

    //Store post in database
    console.log(data);
  }
  

  return (
    <main style={{border : "3px solid black"}}>
      <h1>Create Post</h1>
      <form onSubmit={handlePostSubmit}>
        <label htmlFor="food">Food item</label>
        <input type="text" placeholder="food" name="food" id="food"/>

        <label htmlFor="recipe">Recipe</label>
        <input type="text" placeholder="recipe" name="recipe" id="recipe"/>

        <div className="rating-container">
          <label htmlFor="easiness">Ease of use</label>
          <input type="number" name="easiness" min={1} max={5} id="easiness"/>

          <label htmlFor="taste">Yumminess</label>
          <input type="number" name="taste" min={1} max={5} id="taste"/>

          <label htmlFor="execution">Your execution</label>
          <input type="number" name="execution" min={1} max={5} id="execution"/>

        </div>

        <textarea name="description" placeholder="Today I baked a..."/>

        <div className="date-form-container">
          <select name="day" defaultValue={new Date().getDate()}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>   
          </select>

          <select name="month" defaultValue={new Date().getMonth() + 1}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>

          <select name="year" defaultValue={new Date().getFullYear()}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>

        <button type="submit">Post</button>

      </form>
    </main>
  )
}

export default CreatePost;

// Title/Food item (with clickable link)
// Picture of finished version
// Rating
// Calculated by the average of…
// Easiness to make
// Taste
// User’s execution of it
// Description
// Date 
// Users profile (With link to profile)
// Profile picture
// Name
// Loaded in via local storage
// Comment Section
// Utilize scroll overflow
// Only show if theres atleast 1

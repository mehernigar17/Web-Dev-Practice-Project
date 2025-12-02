
const showLoader = () =>{
    document.getElementById("loader").classList.remove("hidden");

    document.getElementById("video-container").classList.add("hidden");
}



const hideLoader = () =>{
    document.getElementById("loader").classList.add("hidden");

    document.getElementById("video-container").classList.remove("hidden");
}









function removeActiveClass(){


    const  activebutton =document.getElementsByClassName("active");
    for ( let btn of activebutton){
        btn.classList.remove("active");
    }
}



















async function loadCatagories() {
    try {
        // fetch the data
        const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");

        // convert to json
        const data = await res.json();

        // send to display function
        displayCatagories(data.categories);
    } 
    catch (error) {
        console.log("Error loading categories:", error);
    }
}



async function  loadVideos(searchtext=""){
    try{
        showLoader();
        const res= await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchtext}`);
        const data =await res.json();
        removeActiveClass();


           document.getElementById("btn-all").classList.add("active");
        displayVideos(data.videos);
    }
    catch(error){
        console.log("Error loading videos:", error);
    }
}






























const loadCategoryVideos=(id)=>{
    showLoader();
    const url=`https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then((data)=>{
        removeActiveClass();
     
        const clickedButton=document.getElementById(`btn-${id}`);
        clickedButton.classList.add("active");
    
        
        
        displayVideos(data.category);
});


};


const loadVideoDetails=(videoId) =>{
    const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayVideoDetails(data.video));
};


const displayVideoDetails =(video)=>{
    document.getElementById("video_details").showModal();
    const detailsconteiner =document.getElementById("details-container");
    detailsconteiner.innerHTML=`
    

    <div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
    
    </div>
  </div>
</div>
`;

};





















function displayCatagories(categories) {
    const categoryconteiner = document.getElementById("category-container");

    for (let cat of categories) {
        const categorydiv = document.createElement("div");

        categorydiv.innerHTML = `
            <button id="btn-${cat.category_id}"onclick="loadCategoryVideos('${cat.category_id}')"  class="btn btn-sm bg-[#25252515] hover:bg-[#FF1F3D] hover:text-white">
                ${cat.category}
            </button>
        `;

        categoryconteiner.appendChild(categorydiv);
    }
}



const displayVideos = (videos) => {
    const videocontainer =document.getElementById("video-container");
    videocontainer.innerHTML="";
    if(videos.length===0){
        videocontainer.innerHTML=`   <div class=
        " py-20 col-span-full flex flex-col justify-center items-center">
            <img class="w-[120px]" src="assets/Icon.png" alt="">
            <h2 class="font-bold text-2xl">oops!There is no content available</h2>
          </div>`;
          hideLoader();
        return;
    }
    videos.forEach((video) => {
        const videocard=document.createElement("div");
        videocard.innerHTML=`
             <div class="card bg-base-100  ">
  <figure class="relative">
    <img class="w-full h-[150px] object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
      <span class="absolute bottom-2 right-2 text-sm rounded text-white bg-black px-2">3hrs 56 min ago</span>
  </figure>
  <div class="py-5 flex gap-3 px-0">
    <div class="profile">


        <div class="avatar">
  <div class="w-6 rounded-full">
    <img    src="${video.authors[0].profile_picture}" />
  </div>
</div>

</div>
    <div class="intro">


        <h2 class="text-sm font-semibold">Python Full Course 
Awlad Hossain
91K views</h2>
<p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name} 
 
${video.authors[0].verified==true ?`<img class="w-5 h-5"     src="https://img.icons8.com/?size=96&id=FNbnqlDTjR45&format=png" alt="">` : " "}
 
<p class="text-sm text-gray-400">${video.others.views} views</p>

    </div>
    
    </div>
  </div>
  <button onclick=loadVideoDetails('${video.video_id}')     class="btn btn-block">Show Details</button>
</div>
        `;
        videocontainer.appendChild(videocard);
    });
    hideLoader();
};






document.getElementById("search-input").addEventListener("keyup",function(event){
    const input=event.currentTarget.value;
    loadVideos(input);

})

loadCatagories();

// loadVideos();
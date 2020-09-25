window.addEventListener("load", function() {

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then( function(json) {
         //console.log(json);
         let planet = json[3];

         const div = document.getElementById("missionTarget");

         div.innerHTML = `<h2>Mission Destination</h2>
         <ol>
            <li>Name: ${planet.name}</li>
            <li>Diameter: ${planet.diameter}</li>
            <li>Star: ${planet.star}</li>
            <li>Distance from Earth: ${planet.distance}</li>
            <li>Number of Moons: ${planet.moons}</li>
         </ol>
         <img src="${planet.image}">`
      });
   } );
  
   let form = document.querySelector("form");

   form.addEventListener("submit", function(event) {

      event.preventDefault(); // stop automatic form submission

      let pilotName = document.querySelector("input[name=pilotName]").value;
      let copilotName = document.querySelector("input[name=copilotName]").value;
      let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
      let cargoMass = document.querySelector("input[name=cargoMass]").value;

      let launchStatus = document.getElementById('launchStatus'); // the h2 element
      let faultyItems = document.getElementById('faultyItems'); // the div with list
      let pilotStatus = document.getElementById('pilotStatus'); // li elem
      let copilotStatus = document.getElementById('copilotStatus'); // li elem
      let fuelStatus = document.getElementById('fuelStatus'); // li elem
      let cargoStatus = document.getElementById('cargoStatus'); // li elem

      launchStatus.style.color = "black"; // default
      launchStatus.innerHTML = "Awaiting Information Before Launch"; //default
      faultyItems.style.visibility = "hidden"; // default

      // console.log(pilotName);
      // console.log(copilotName);
      // console.log(fuelLevel);
      // console.log(cargoMass);

      if (pilotName===""||copilotName===""||fuelLevel===""||cargoMass==="") {
         alert("All fields are required!"); 
      } 
      else if (!isNaN(pilotName)||!isNaN(copilotName)||isNaN(fuelLevel)||isNaN(cargoMass)){
         alert("Make sure to enter valid information for each field!");
      }
      else {
         fuelLevel = Number(fuelLevel);
         cargoMass = Number(cargoMass);

         fuelStatus.innerHTML = 'The fuel level is high enough for launch.' // default
         cargoStatus.innerHTML = 'The cargo mass is low enough for launch.' // default

         if(fuelLevel < 10000 || cargoMass > 10000){
            faultyItems.style.visibility = "visible";
            launchStatus.style.color = "red";
            launchStatus.innerHTML = "Shuttle Not Ready For Launch";

            pilotStatus.innerHTML = `The Pilot ${pilotName} is ready for launch.`;
            copilotStatus.innerHTML = `The Co-pilot ${copilotName} is ready for launch.`;

            if(fuelLevel < 10000){
               fuelStatus.innerHTML = 'The fuel level is too low for launch.'
            }
            if(cargoMass > 10000){
               cargoStatus.innerHTML = 'The cargo mass is not low enough for launch.'
            }
         }
         else{
            faultyItems.style.visibility = "hidden";
            launchStatus.style.color = "green";
            launchStatus.innerHTML = "Shuttle Is Ready for Launch";
         }
      }
   });
});
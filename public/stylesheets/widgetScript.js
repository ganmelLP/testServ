var usedCars = [];
var newCars = [];
var contextFull = {};
var conversationId = '';
window.onload = function () {
    if (lpTag.agentSDK) {
        bindUser();
    }
}
document.onreadystatechange = () => {
    // document ready
    if (document.readyState === 'complete') {
        const brandName = document.querySelector("#brand");
        const modelName = document.querySelector("#model");
        const fuelType = document.querySelector("#fuel");

        const usedBrandName = document.querySelector("#usedBrand");
        const usedModelName = document.querySelector("#usedModel");
        const delayInMilliseconds = 4000;

        // var countries = [
        //     { label: 'United Kingdom', value: 'UK' },
        //     { label: 'United States', value: 'US' }
        // ];    
        
        // autocomplete({
        //     input: document.getElementById("dealership"),
        //     fetch: function(text, update) {
        //         text = text.toLowerCase();
        //         // you can also use AJAX requests instead of preloaded data
        //         var suggestions = countries.filter(n => n.label.toLowerCase().startsWith(text))
        //         update(suggestions);
        //     },
        //     onSelect: function(item) {
        //         input.value = item.label;
        //     }
        // });

        setTimeout(function () {
            //your code to be executed after 1 second

            if (isEmpty(conversationId) == true) {
                console.log("SDE NOT Loaded , taking API, is SDEResult empty?:" + isEmpty(conversationId) + JSON.stringify(conversationId))
                fetch('https://serene-falls-66485.herokuapp.com/api/used') // GET used cars list
                    .then(usedCarsResponse => usedCarsResponse.json())
                    .then(usedCarData => {
                        console.log(usedCarData)
                        usedCars = usedCarData;

                        fetch('https://serene-falls-66485.herokuapp.com/api/new') // when used cars request is done, GET new cars list and init all values
                            .then(newCarResponse => newCarResponse.json()
                                .then(newCarData => {
                                    console.log(newCarData)
                                    newCars = newCarData;


                                    //Clear duplicate brands to show brand list without duplicates
                                    let noDuplicates = clearDuplicateBrands(newCars)
                                    showBrands(noDuplicates, brandName);

                                    let noUsedDuplicates = clearDuplicateUsedBrands(usedCars)
                                    showUsedBrands(noUsedDuplicates, usedBrandName);




                                }))
                    });

            } else {
                console.log("SDEs Loaded, taking them instead of API, is SDEResult empty?:" + isEmpty(conversationId))
                try {

                    fetch('https://serene-falls-66485.herokuapp.com/api/used') // GET used cars list
                    .then(usedCarsResponse => usedCarsResponse.json())
                    .then(usedCarData => {
                        console.log(usedCarData)
                        usedCars = usedCarData;

                        fetch('https://serene-falls-66485.herokuapp.com/api/new') // when used cars request is done, GET new cars list and init all values
                            .then(newCarResponse => newCarResponse.json()
                                .then(newCarData => {
                                    console.log(newCarData)
                                    newCars = newCarData;

                                    fetch(`https://serene-falls-66485.herokuapp.com/api/contextData/?convId=${conversationId}`)
                                      .then(contextResponse => contextResponse.json()
                                      .then(contextData => {
                                          console.log(contextData)
                                          contextFull = contextData;

                                    //Clear duplicate brands to show brand list without duplicates
                                    let noDuplicates = clearDuplicateBrands(newCars)
                                    showBrands(noDuplicates, brandName);

                                    let noUsedDuplicates = clearDuplicateUsedBrands(usedCars)
                                    showUsedBrands(noUsedDuplicates, usedBrandName);

                                    // if (SDEResult.vehicleOfInterest[0].voi.stockType == "NEW") {

                                    //     optionBrand = SDEResult.vehicleOfInterest[0].voi.make;
                                    //     brandName.getElementsByTagName('option')[0].innerHTML = optionBrand;
                                    //     brandName.getElementsByTagName('option')[0].setAttribute("class", "brand selection")
                
                
                                    //     optionModel = SDEResult.vehicleOfInterest[0].voi.model;
                                    //     modelName.getElementsByTagName('option')[0].innerHTML = optionModel;
                                    //     modelName.getElementsByTagName('option')[0].setAttribute("class", "model selection")
                
                
                                    //     optionFuel = SDEResult.vehicleOfInterest[0].voi.trim;
                                    //     fuelType.getElementsByTagName('option')[0].innerHTML = optionFuel;
                                    //     fuelType.getElementsByTagName('option')[0].setAttribute("class", "fuel selection")
                                    // } else {
                
                                    //     document.getElementById("used").click();
                
                                    //     optionBrand = SDEResult.vehicleOfInterest[0].voi.make;
                                    //     usedBrandName.getElementsByTagName('option')[0].innerHTML = optionBrand;
                                    //     usedBrandName.getElementsByTagName('option')[0].setAttribute("class", "brand selection")
                
                
                                    //     optionModel = SDEResult.vehicleOfInterest[0].voi.model;
                                    //     usedModelName.getElementsByTagName('option')[0].innerHTML = optionModel;
                                    //     usedModelName.getElementsByTagName('option')[0].setAttribute("class", "model selection")
                                    // }
                                  })) 
                                }))
                            });

   

                } catch (e) {
                    console.error(e);
                }

            }
        }, delayInMilliseconds);
    }

};

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

function bindUser() {
    console.log("SDK INIT");

    var notificationHandler = function (data) {
         // Do something
    };

    var focusHandler = function () {
         // Do something
    };

    var blurHandler = function () {
        // Do something
    };

    lpTag.agentSDK.init({
        notificationCallback: notificationHandler,
        visitorFocusedCallback: focusHandler,
        visitorBlurredCallback: blurHandler
    });

    var pathToData = "chatInfo.rtSessionId";

    lpTag.agentSDK.bind(pathToData, updateCallback, notifyWhenDone);


}


var updateCallback = function (data) {
    // Do something with the returning data
    var path = data.key;
    conversationId = data.newValue;
    // called each time the value is updated.
    // If there's an existing value when bind is called - this callback
    // will be called with the existing value
    console.log(path);
    console.log("agentSDK Data Result: " + JSON.stringify(conversationId));

};

var notifyWhenDone = function (err) {
    if (err) {
        console.log(err);
    }
    // called when the bind is completed successfully,
    // or when the action terminated with an error.
};


// Returns objects only with the given brand
function filterBrand(carsArray, brand) {

    const filtered = carsArray.filter(car => {
        if (car.brand == brand) {
            return car.short_name;
        }
    });

    return filtered;
}

// Returns objects only with the given used brand
function filterUsedBrand(carsArray, brand) {

    const filtered = carsArray.filter(car => {
        if (car.manufacturer == brand) {
            return car.model;
        }
    });

    return filtered;
}


// Returns a single object with the given model
function filterModels(carsArray, model) {

    const filtered = carsArray.filter(car => {
        if (car.short_name == model) {
            return car.fuel_types;
        }
    });

    return filtered;
}


//Clears selections for the dropdown depending on the input to the function
function clearSelections(clearOption) {

    if (clearOption == "model" || clearOption == "all") {
        // Remove all previous model options every time there is a change
        let modelOptions = document.getElementsByClassName('model selection');
        while (modelOptions[0]) {
            modelOptions[0].parentNode.removeChild(modelOptions[0]);
        }
    }

    if (clearOption == "fuel" || clearOption == "all") {
        // Remove all previous fuel options every time there is a change
        let fuelOptions = document.getElementsByClassName('fuel selection');
        while (fuelOptions[0]) {
            fuelOptions[0].parentNode.removeChild(fuelOptions[0]);
        }
    }
}

function radioCheck(value, isChecked) {

    // Reset form when radio button is selected and make sure to remember only the previous radio button selection
    const newChecked = document.getElementById("new").checked;
    const usedChecked = document.getElementById("used").checked;

    document.getElementById('carForm').reset();

    if (newChecked) {
        document.getElementById("new").checked = true;
    } else if (usedChecked){
        document.getElementById("used").checked = true;
    } else {
        document.getElementById("service").checked = true;
    } // end of form reset form logic

    //New
    const brandName = document.querySelector("#brand");
    const modelName = document.querySelector("#model");
    const fuelType = document.querySelector("#fuel");
    const purchaseType = document.querySelector("#purchaseType");
    
    //Used
    const usedBrandName = document.querySelector("#usedBrand");
    const usedModelName = document.querySelector("#usedModel");
    const usedRegNumber = document.querySelector("#usedRegNumber");
    
    //Service
    const customerRegNumber = document.querySelector("#customerRegNumber");
    const mileage = document.querySelector("#mileage");
    const valuation = document.querySelector("#valuation");


    if (isChecked && value == "used") {

        brandName.style.display = "none";
        modelName.style.display = "none";
        fuelType.style.display = "none";
        customerRegNumber.style.display = "none";
        mileage.style.display = "none";
        valuation.style.display = "none";
        purchaseType.style.display = "none";

        usedBrandName.style.display = "block";
        usedModelName.style.display = "block";
        usedRegNumber.style.display = "block";

    }

    if (isChecked && value == "new") {

        brandName.style.display = "block";
        modelName.style.display = "block";
        fuelType.style.display = "block";
        purchaseType.style.display = "block";

        usedRegNumber.style.display = "none";
        usedBrandName.style.display = "none";
        usedModelName.style.display = "none";
        customerRegNumber.style.display = "none";
        mileage.style.display = "none";
        valuation.style.display = "none";
        
    }

    if (isChecked && value == "service") {


        customerRegNumber.style.display = "block";
        mileage.style.display = "block";
        valuation.style.display = "block";
        usedBrandName.style.display = "block";
        usedModelName.style.display = "block";

        brandName.style.display = "none";
        modelName.style.display = "none";
        fuelType.style.display = "none";
        usedRegNumber.style.display = "none";
        purchaseType.style.display = "none";
    }
}

function carSelectionValid(data) {
    console.log("checking validity")
    const brandName = document.querySelector("#brand");
    const modelName = document.querySelector("#model");
    const fuelType = document.querySelector("#fuel");

    const usedBrandName = document.querySelector("#usedBrand");
    const usedModelName = document.querySelector("#usedModel");

    const isChecked = document.querySelector('input[name="carType"]:checked').value;
    console.log("The data:" + data)
    if (isChecked == "used") {

        brandName.setCustomValidity('');
        modelName.setCustomValidity('');
        fuelType.setCustomValidity('');

        if (usedBrandName.value.indexOf("Select") > -1) {
            usedBrandName.setCustomValidity('You must choose a Brand');
        } else {
            usedBrandName.setCustomValidity('');
        }


        if (usedModelName.value.indexOf("Select") > -1) {
            usedModelName.setCustomValidity('You must choose a Model');
        } else {
            usedModelName.setCustomValidity('');
        }
    }

    if (isChecked == "new") {

        usedBrandName.setCustomValidity('');
        usedModelName.setCustomValidity('');

        if (brandName.value.indexOf("Select") > -1) {
            brandName.setCustomValidity('You must choose a Brand');
        } else {
            brandName.setCustomValidity('');
        }


        if (modelName.value.indexOf("Select") > -1) {
            modelName.setCustomValidity('You must choose a Model');
        } else {
            modelName.setCustomValidity('');
        }

        if (fuelType.value.indexOf("Select") > -1) {
            fuelType.setCustomValidity('You must choose a FuelType');
        } else {
            fuelType.setCustomValidity('');
        }
    }
}



// Clears duplicate brands for the showBrands function
function clearDuplicateBrands(arr) {

    var filtered = arr.filter((arr, index, self) =>
        index === self.findIndex((t) => (t.brand === arr.brand)))

    return filtered;
}

// Clears duplicate used brands for the showBrands function
function clearDuplicateUsedBrands(arr) {

    var filtered = arr.filter((arr, index, self) =>
        index === self.findIndex((t) => (t.manufacturer === arr.manufacturer)))

    return filtered;
}

//Displays brand options in the drop down slection
function showBrands(cars, brandName) {
    let option;
    for (let i = 0; i < cars.length; i++) {
        option = document.createElement("option");
        option.text = cars[i].brand;
        brandName.add(option);
        option.setAttribute("class", "brand selection")
    }
    option = document.createElement("option");
    option.text = "other";
    brandName.add(option);
    option.setAttribute("class", "brand selection")
}


//Displays brand options in the drop down slection
function showUsedBrands(cars, brandName) {
    let option;
    for (let i = 0; i < cars.length; i++) {
        option = document.createElement("option");
        option.text = cars[i].manufacturer;
        brandName.add(option);
        option.setAttribute("class", "brand selection")
    }
    option = document.createElement("option");
    option.text = "other";
    brandName.add(option);
    option.setAttribute("class", "brand selection")
}



//Updates the dropdown list of models depending on the brand selection
function showModels(brand) {

    clearSelections("all");

    // Clear previous data on every change
    let modelsForBrand = [];
    let option;
    const modelName = document.querySelector("#model");

    // Get the full list and filter out only for the selected brand from the dropdown
    modelsForBrand = filterBrand(newCars, brand)

    //Update models for selected brand
    for (let i = 0; i < modelsForBrand.length; i++) {
        option = document.createElement("option");
        option.text = modelsForBrand[i].short_name;
        modelName.add(option);
        option.setAttribute("class", "model selection")
    }
}

//Updates the dropdown list of used models depending on the brand selection
function showUsedModels(brand) {

    clearSelections("all");

    // Clear previous data on every change
    let modelsForBrand = [];
    let option;
    const modelName = document.querySelector("#usedModel");

    // Get the full list and filter out only for the selected brand from the dropdown
    modelsForBrand = filterUsedBrand(usedCars, brand)

    //Update models for selected brand
    for (let i = 0; i < modelsForBrand.length; i++) {
        option = document.createElement("option");
        option.text = modelsForBrand[i].model + " - Current Stock: " + modelsForBrand[i].count;
        modelName.add(option);
        option.setAttribute("class", "model selection")
    }
}



//Updates the dropdown list of fuel types depending on the model selection
function showFuels(model) {

    clearSelections("fuel");

    // Clear previous data on every change
    let fuelForModel = [];
    let option;
    const fuelType = document.querySelector("#fuel");

    // Get the full list and filter out only for the selected model fuel types from the dropdown
    cars = newCars;
    fuelForModel = filterModels(cars, model)
    console.log(fuelForModel[0].fuel_types + "  FUEL MODEL 1");
    //Update fuel types for selected brand
    for (let i = 0; i < fuelForModel[0].fuel_types.length; i++) {
        option = document.createElement("option");
        console.log(fuelForModel[0].fuel_types[i]);
        option.text = fuelForModel[0].fuel_types[i];
        fuelType.add(option);
        option.setAttribute("class", "fuel selection")
    }
}

function collectFormData() {

    var formResult = Object.fromEntries(new FormData(document.querySelector('form')).entries())

    console.log(JSON.stringify(formResult));

}

// Example POST method implementation:
async function postData(url = '', convId) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).autocomplete=t()}(this,(function(){"use strict";return function(e){var t,n,o=document,i=o.createElement("div"),r=i.style,f=navigator.userAgent,l=-1!==f.indexOf("Firefox")&&-1!==f.indexOf("Mobile"),u=e.debounceWaitMs||0,a=e.preventSubmit||!1,s=e.disableAutoSelect||!1,d=l?"input":"keyup",c=[],p="",v=2,m=e.showOnFocus,g=0;if(void 0!==e.minLength&&(v=e.minLength),!e.input)throw new Error("input undefined");var h=e.input;function E(){n&&window.clearTimeout(n)}function w(){return!!i.parentNode}function L(){var e;g++,c=[],p="",t=void 0,(e=i.parentNode)&&e.removeChild(i)}function b(){for(;i.firstChild;)i.removeChild(i.firstChild);var n=function(e,t){var n=o.createElement("div");return n.textContent=e.label||"",n};e.render&&(n=e.render);var f=function(e,t){var n=o.createElement("div");return n.textContent=e,n};e.renderGroup&&(f=e.renderGroup);var l=o.createDocumentFragment(),u="#9?$";if(c.forEach((function(o){if(o.group&&o.group!==u){u=o.group;var i=f(o.group,p);i&&(i.className+=" group",l.appendChild(i))}var r=n(o,p);r&&(r.addEventListener("click",(function(t){e.onSelect(o,h),L(),t.preventDefault(),t.stopPropagation()})),o===t&&(r.className+=" selected"),l.appendChild(r))})),i.appendChild(l),c.length<1){if(!e.emptyMsg)return void L();var a=o.createElement("div");a.className="empty",a.textContent=e.emptyMsg,i.appendChild(a)}i.parentNode||o.body.appendChild(i),function(){if(w()){r.height="auto",r.width=h.offsetWidth+"px";var t,n=0;f(),f(),e.customize&&t&&e.customize(h,t,i,n)}function f(){var e=o.documentElement,i=e.clientTop||o.body.clientTop||0,f=e.clientLeft||o.body.clientLeft||0,l=window.pageYOffset||e.scrollTop,u=window.pageXOffset||e.scrollLeft,a=(t=h.getBoundingClientRect()).top+h.offsetHeight+l-i,s=t.left+u-f;r.top=a+"px",r.left=s+"px",(n=window.innerHeight-(t.top+h.offsetHeight))<0&&(n=0),r.top=a+"px",r.bottom="",r.left=s+"px",r.maxHeight=n+"px"}}(),function(){var e=i.getElementsByClassName("selected");if(e.length>0){var t=e[0],n=t.previousElementSibling;if(n&&-1!==n.className.indexOf("group")&&!n.previousElementSibling&&(t=n),t.offsetTop<i.scrollTop)i.scrollTop=t.offsetTop;else{var o=t.offsetTop+t.offsetHeight,r=i.scrollTop+i.offsetHeight;o>r&&(i.scrollTop+=o-r)}}}()}function y(){w()&&b()}function x(){y()}function C(e){e.target!==i?y():e.preventDefault()}function T(e){for(var t=e.which||e.keyCode||0,n=0,o=[38,13,27,39,37,16,17,18,20,91,9];n<o.length;n++){if(t===o[n])return}t>=112&&t<=123||40===t&&w()||D(0)}function N(n){var o=n.which||n.keyCode||0;if(38===o||40===o||27===o){var i=w();if(27===o)L();else{if(!i||c.length<1)return;38===o?function(){if(c.length<1)t=void 0;else if(t===c[0])t=c[c.length-1];else for(var e=c.length-1;e>0;e--)if(t===c[e]||1===e){t=c[e-1];break}}():function(){if(c.length<1&&(t=void 0),t&&t!==c[c.length-1]){for(var e=0;e<c.length-1;e++)if(t===c[e]){t=c[e+1];break}}else t=c[0]}(),b()}return n.preventDefault(),void(i&&n.stopPropagation())}13===o&&(t&&(e.onSelect(t,h),L()),a&&n.preventDefault())}function k(){m&&D(1)}function D(o){var i=++g,r=h.value;r.length>=v||1===o?(E(),n=window.setTimeout((function(){e.fetch(r,(function(e){g===i&&e&&(p=r,t=(c=e).length<1||s?void 0:c[0],b())}),o)}),0===o?u:0)):L()}function H(){setTimeout((function(){o.activeElement!==h&&L()}),200)}return i.className="autocomplete "+(e.className||""),r.position="absolute",i.addEventListener("mousedown",(function(e){e.stopPropagation(),e.preventDefault()})),i.addEventListener("focus",(function(){return h.focus()})),h.addEventListener("keydown",N),h.addEventListener(d,T),h.addEventListener("blur",H),h.addEventListener("focus",k),window.addEventListener("resize",x),o.addEventListener("scroll",C,!0),{destroy:function(){h.removeEventListener("focus",k),h.removeEventListener("keydown",N),h.removeEventListener(d,T),h.removeEventListener("blur",H),window.removeEventListener("resize",x),o.removeEventListener("scroll",C,!0),E(),L()}}}}));
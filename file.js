class City{
    constructor(city, num, items){
        this.city = city;
        this.citynum = num;
        this.active = true;
        this.items = items;
    }
}

let master;

class Master{
    constructor(cityname, num, cities, network, citiNum){
        this.cityname = cityname;
        this.citynum = num;
        this.cities = cities;
        this.network = network;
        this.citiNum = citiNum;
    }

    printNetwork(){
        for (let index = 0; index < this.network.length; index++) {
            console.log(index +"=" + this.network[index]+"\n");
        }
    }

    printCity(){
        for (let [city, value] of this.cities) {
            console.log("The city name is " + this.cities.get(city).city);
            if (this.cities.get(city).active){
                console.log("This city can be reached.");
            }
            else{
                console.log("This city can't be reached.");
            }
            for (let [key, value] of this.cities.get(city).items) {
                console.log(key + "  " + value);
            }
        }
    }
    
    addEdge(){
        let city1 = document.getElementById("city1").value;
        let city2 = document.getElementById("city2").value;
        let cost = document.getElementById("cost").value;
        const edge1 = [city2,cost];
        const edge2 = [city1,cost];
        network[cities.get(city1).citynum].push(edge1);
        network[cities.get(city2).citynum].push(edge2);
        document.getElementById("boxx").style.filter="blur(0px)";
        document.getElementById("middlebox").classList.add("invisible");
        alert("Added successfully.");
    }

    addCity(){
        let city = document.getElementById("addinput").value;
        const items = new Map();
    
        let totalitems = parseInt(document.getElementById("items").value);
        let i = 0;
        let element = document.getElementById("addbox");
        while(i < totalitems){
            element.innerHTML += `<div id="itemslist">
            <label for="">Enter name of item:</label>
        <input id="item" type="text">
        <label for="">Enter quantity:</label>
        <input id="quantity" type="text">
        </div>`;
            
        i++;
        }
    
        let newcity = new City(city, this.cities.length, items);
        network.push([]);
        citiNum.set(this.cities.length,city);
        cities.set(city,newcity);
        document.getElementById("boxx").style.filter="blur(0px)";
        document.getElementById("addbox").classList.add("invisible");
        alert("City added successfully.");
    }

    swapData() {
        let city1 = document.getElementById("scity1").value;
        let city2 = document.getElementById("scity2").value;
        let temp = cities.get(city1).items;
        cities.get(city1).items = cities.get(city2).items;
        cities.get(city2).items = temp;
        document.getElementById("boxx").style.filter="blur(0px)";
        document.getElementById("swapbox").classList.add("invisible");
        alert("Swapped data successfully");
    }

    checkActive() {
        let city = document.getElementById("checkinput").value;
        console.log(city);
        let temp = cities.get(city).active;
        if(temp){
            alert(city+" is active.");
        }
        else{
            alert(city+" is not active.")
        }
        document.getElementById("boxx").style.filter="blur(0px)";
        document.getElementById("checkbox").classList.add("invisible");
    }

    displayData() {
        let city = document.getElementById("displayinput").value;
        document.getElementById("boxx").style.filter="blur(0px)";
        document.getElementById("displaybox").classList.add("invisible");
        let element = document.getElementById("displayoutput");
        document.getElementById("boxx").style.filter="blur(5px)";
        document.getElementById("displayoutput").classList.remove("invisible");
        element.innerHTML += "The city name is "+city+"<br>";
        if (cities.get(city).active){
            element.innerHTML += "This city can be reached."+"<br>";
        }
        else{
            element.innerHTML += "This city can't be reached."+"<br>";
        }
        element.innerHTML += "Resources: <br>";
        for (let [key, value] of cities.get(city).items) {
            element.innerHTML += key+": "+value+"<br>";
        }
    }

    bfs(city1,city2){
        let reached = false;
        const visited = [];
        const parent = [];
        for (let index = 0; index < network.length; index++) {
            visited[index] = 0;
            parent[index] = -1;
        }
        const q = [];
        let path = [];
        q.push(cities.get(city1).citynum);
        visited[cities.get(city1).citynum] = 1;
        while(q.length !== 0){
            let temp = q[0];
            q.shift();
            if(cities.get(city2).citynum === temp){
                reached = true;
                while(temp!=-1){
                    path.push(temp);
                    temp = parent[temp];
                }
                return path;
            }
            for (let index = 0; index < network[temp].length; index++) {
                let node = network[temp][index][0];
                if(visited[cities.get(node).citynum] === 0){
                    visited[cities.get(node).citynum] = 1;
                    parent[cities.get(node).citynum] = temp;
                    q.push(cities.get(node).citynum);
                }
            }
        }
        return path;
    }

    transferData(){
        let city1 = document.getElementById("tcity1").value;
        let city2 = document.getElementById("tcity2").value;
        document.getElementById("boxx").style.filter="blur(0px)";
        document.getElementById("tbox").classList.add("invisible");
        let path1 = master.bfs(master.cityname,city1);
        let path2 = master.bfs(master.cityname,city2);
        path2.reverse();

        // let reached = false;
        // const visited = [];
        // const parent = [];
        // for (let index = 0; index < network.length; index++) {
        //     visited[index] = 0;
        //     parent[index] = -1;
        // }
        // const q = [];
        // let path = [];
        // q.push(cities.get(city1).citynum);
        // visited[cities.get(city1).citynum] = 1;
        // while(q.length !== 0){
        //     let temp = q[0];
        //     q.shift();
        //     if(cities.get(city2).citynum === temp){
        //         reached = true;
        //         while(temp!=-1){
        //             path.push(temp);
        //             temp = parent[temp];
        //         }
        //         break;
        //     }
        //     for (let index = 0; index < network[temp].length; index++) {
        //         let node = network[temp][index][0];
        //         if(visited[cities.get(node).citynum] === 0){
        //             visited[cities.get(node).citynum] = 1;
        //             parent[cities.get(node).citynum] = temp;
        //             q.push(cities.get(node).citynum);
        //         }
        //     }
        // }
        // path.reverse();
        let element = document.getElementById("transferoutput");
        element.innerHTML += `<button id="transferok" onclick=nonetransfer()>ok</button>`;
        document.getElementById("boxx").style.filter="blur(5px)";
        document.getElementById("transferoutput").classList.remove("invisible");
        for (let index = 0; index < path1.length-1; index++) {
            element.innerHTML += citiNum.get(path1[index])+"->";
        }
        for (let index = 0; index < path2.length; index++) {
            if(index === path2.length-1){
                element.innerHTML += citiNum.get(path2[index]);
            }
            else{
                element.innerHTML += citiNum.get(path2[index])+"->";
            }
        }
    }
}

const cities = new Map();
const citiNum = new Map();
const network = [];
let masterCity;
let totalCities = parseInt(prompt("Enter no. of cities: "));

for (let index = 1; index <= totalCities; index++) {

    let city = prompt("Enter name of city "+index+": ");
    const items = new Map();

    let totalitems = parseInt(prompt("Enter no. of items: "));
    for (let i = 1; i <= totalitems; i++) {
        let item = prompt("Enter name of item "+i+": ");
        let quantity = parseInt(prompt("Enter quantity of item "+i+": "));
        items.set(item,quantity);
    }

    let newcity = new City(city, index-1, items);
    cities.set(city,newcity);
    citiNum.set(index-1,city);
    network[index-1] = [];

    if(index === 1){
        masterCity = city;
    }
}

let edges = parseInt(prompt("Enter no. of edges: "));

for (let index = 0; index < edges; index++) {
    let city1 = prompt("Enter name of source city: ");
    let city2 = prompt("Enter name of destination city: ");
    let cost = parseInt(prompt("Enter transfer cost: "));
    const edge1 = [city2,cost];
    const edge2 = [city1,cost];
    network[cities.get(city1).citynum].push(edge1);
    network[cities.get(city2).citynum].push(edge2);
}

master = new Master(masterCity, 0, cities, network, citiNum);

function changeMaster(){
    let newMaster = document.getElementById("master").value;
    master.cityname = newMaster;
    master.citynum = cities.get(newMaster).citynum;
    alert("New master is "+newMaster+".");
    document.getElementById("boxx").style.filter="blur(0px)";
    document.getElementById("masterbox").classList.add("invisible");
}

document.getElementById("getmaster").addEventListener("click", () =>{
    document.getElementById("boxx").style.filter="blur(5px)";
    document.getElementById("masterbox").classList.remove("invisible");
});
document.getElementById("mastersubmit").addEventListener("click", changeMaster);

document.getElementById("addedge").addEventListener("click",() =>{
    document.getElementById("boxx").style.filter="blur(5px)";
    document.getElementById("middlebox").classList.remove("invisible");
});
document.getElementById("addedgebox").addEventListener("click", master.addEdge);

document.getElementById("check").addEventListener("click", () =>{
    document.getElementById("boxx").style.filter="blur(5px)";
    document.getElementById("checkbox").classList.remove("invisible");
});
document.getElementById("checksubmit").addEventListener("click", master.checkActive);

document.getElementById("swapdata").addEventListener("click", () =>{
    document.getElementById("boxx").style.filter="blur(5px)";
    document.getElementById("swapbox").classList.remove("invisible");
});
document.getElementById("swapsubmit").addEventListener("click", master.swapData);

document.getElementById("display").addEventListener("click", () =>{
    document.getElementById("boxx").style.filter="blur(5px)";
    document.getElementById("displaybox").classList.remove("invisible");
});
document.getElementById("displaysubmit").addEventListener("click", master.displayData);

document.getElementById("addnode").addEventListener("click", () =>{
    document.getElementById("boxx").style.filter="blur(5px)";
    document.getElementById("addbox").classList.remove("invisible");
});
document.getElementById("addsubmit").addEventListener("click", master.addCity);

document.getElementById("transfer").addEventListener("click", () =>{
    document.getElementById("boxx").style.filter="blur(5px)";
    document.getElementById("tbox").classList.remove("invisible");
});
document.getElementById("tsubmit").addEventListener("click", master.transferData);

function nonetransfer(){
    document.getElementById("boxx").style.filter="blur(0px)";
    document.getElementById("transferoutput").classList.add("invisible");
    document.getElementById("transferoutput").innerHTML = "";
}
function nonedisplay(){
    document.getElementById("boxx").style.filter="blur(0px)";
    document.getElementById("displayoutput").classList.add("invisible");
    document.getElementById("displayoutput").innerHTML = "";
}
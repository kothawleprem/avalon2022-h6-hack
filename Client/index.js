let txtJoin
        let roomDetails
        let playerName
        let roomName
        let pname
        let rname
        let roomid
        
        startSolo = document.getElementById("startSolo")
        createRoom = document.getElementById("createRoom")
        txtJoin = document.getElementById("txtJoin")
        joinRoom = document.getElementById("joinRoom")
        startSoloArea = document.getElementById("startSoloArea")
        createRoomArea = document.getElementById("createRoomArea")
        joinRoomArea = document.getElementById("joinRoomArea")
        playerNameArea = document.getElementById("playerNameArea")
        roomNameArea = document.getElementById("roomNameArea")
        displayRoomNameArea = document.getElementById("displayRoomNameArea")
      

        startSolo.addEventListener("click", e => {
            console.log("Starting Solo Game")
            startSoloArea.innerHTML = ""
            createRoomArea.innerHTML = ""
            joinRoomArea.innerHTML = ""
            document.getElementById("canvas").style.visibility = "visible"
    

        })

        createRoom.addEventListener("click", e => {
            startSoloArea.innerHTML = ""
            joinRoomArea.innerHTML = ""
            console.log("Creating game room....")
            playerNameArea.innerHTML = '<input type="text" name="" id="playerName"> <button id="btnPlayerName">Add Player Name</button>'

            roomNameArea.innerHTML = '<input type="text" name="" id="roomName"> <button id="btnRoomName">Add Room Name</button>'
            

            playerName = document.getElementById("playerName")
            btnPlayerName = document.getElementById("btnPlayerName")

            roomName = document.getElementById("roomName")
            btnRoomName = document.getElementById("btnRoomName")

            btnPlayerName.addEventListener("click", e => {
                pname = playerName.value

                console.log("Adding player", pname)
            })

            btnRoomName.addEventListener("click", e => {
                rname = roomName.value

                console.log("Adding room", rname, pname)


                data = {
                    "room_name": rname,
                    "player_name": pname
                }

                fetch("http://127.0.0.1:8000/startRoom/", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }).then(response => response.json()).then(data => {
                    console.log(data)
                })

                

                createRoomArea.innerHTML = ""
                playerNameArea.innerHTML = ""
                roomNameArea.innerHTML = ""

                displayRoomNameArea.innerHTML = '<span class="roomName">Room: </span> <span class="roomName">' + rname + '</span >'
                document.getElementById("canvas").style.visibility = "visible"
                
            })

     

           
        })

        joinRoom.addEventListener("click", e => {
            createRoomArea.innerHTML = ""
            startSoloArea.innerHTML = ""

            const val = txtJoin.value
            console.log('Joining Room', val)
            data = {
                "room_id": val,
                "player_name": "PPP"
            }
            fetch("http://127.0.0.1:8000/joinRoom/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(response => response.json()).then(data => console.log(data))
            document.getElementById("canvas").style.visibility = "visible"
        })

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')
const image = document.getElementById('source');


canvas.width = innerWidth
canvas.height = innerHeight

var audio = new Audio("9mm.mp3");
var endAudio = new Audio("end.mpeg")

audio.oncanplaythrough = function(){
audio.play();
}

audio.loop = false;

endAudio.oncanplaythrough = function(){
endAudio.play();
}

endAudio.loop = false;


function drawBgImg() {
    let bgImg = new Image();
    bgImg.src = 'https://wallpaperaccess.com/full/2401680.jpg';
    bgImg.onload = () => {
        c.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    }
}

setInterval(function(){
    drawBgImg() 
},1);

var sprite = new Image();
var spriteExplosion = new Image();
var bulet = new Image();
var enemyImage = new Image();

// sprite.src = 'https://res.cloudinary.com/dc4stsmlc/image/upload/v1570612478/Codepen/sprite_bj90k9.png';
sprite.src = 'shoter.png';
bulet.src = 'fire.png';
enemyImage.src = "met.png"





const scoreDisplay = document.querySelector("#score")
console.log(scoreDisplay)

class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        // this.color = color
    }
   
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.drawImage(sprite, -50, -10, 620, 550, 600, 250, 250,250);
        // c.drawImage(image,  0, 0, 200, 200, 550, 250, 800,800);
       
    }
}

class Projectile {
    constructor(x,y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw() {
        c.beginPath()
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.drawImage(bulet,this.x, this.y, 50,50);
        // c.direction(bulet, this.x, this.y ,0,0,150,150)

        c.fillStyle = this.color
        c.fill()
        // c.drawImage(bulet,100, 100, 420, 550, 600, 250, 150,150);
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

class Enemy {
    constructor(x,y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw() {
        c.beginPath()
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.drawImage(enemyImage,this.x,this.y,80,60)

    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}


const x = canvas.width / 2
const y = canvas.height / 2

const player = new Player(x, y,50)
player.draw()

const projectiles = []
const enemies = []

function spawnEnemies() {
     setInterval(()=> {
        const radius = 30

        const ran = Math.random()
        let x
        let y
        if(ran < 0.25){
            x = Math.random() * canvas.width
            y =  canvas.height
        }
        else if(ran < 0.5){
            x = Math.random() * canvas.width
            y = 0
        }
        else if(ran < 0.75){
            x = 0
            y = Math.random() * canvas.height
        }
        else{
            x = canvas.width
            y = Math.random() * canvas.height
        }
        
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(new Enemy(x, y, radius, "yellow", velocity))
        
        
     }, 3000)
}

let animationId
let score = 0
function animate() {
    animationId = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
    projectiles.forEach((projectile, projectileIndex) => {
        projectile.update()
    })

    enemies.forEach((enemy, enemyIndex) => {
        enemy.update()
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        console.log(enemy.count)
        // end game
        if(dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId)
            setTimeout(() => {
                endAudio.play();
                console.log("game over")
                alert("Game Over!!!!")
                
            },100)
    }
        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

            

        if(dist - enemy.radius - projectile.radius < 1){
            // increase score
            
           if(dist - enemy.radius - projectile.radius < 1){
            // increase score
            score += 1
            scoreDisplay.innerHTML = score
            setTimeout(() => {
                enemies.splice(enemyIndex, 1)
                projectiles.splice(projectileIndex, 1)
            })
        }
    }
        })
    })
}

addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2 )

    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }
    audio.play();

    projectiles.push(
        new Projectile(
            canvas.width / 2,
            canvas.height / 2,
            5,
            'white',
            velocity
        )
        
    )
})

animate()
spawnEnemies()
